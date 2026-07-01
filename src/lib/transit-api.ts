const API_BASE = "https://api.transit.ls8h.com";

const WALK_SEGMENT_COLOR = "#999";

type SuggestStation = {
  id: string;
  name: string;
  nameKana: string;
  feedId: string;
  feedName: string;
  score: number;
  weight: number;
  lat: number;
  lon: number;
  kind: string;
};

type NearbyPlace = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  kind: string;
};

type StopPoint = {
  name: string;
  lat: number;
  lon: number;
};

type TransitLeg = {
  kind: "transit";
  routeName: string;
  mode: string;
  color: string;
  headsign: string;
  tripId: string;
  from: StopPoint;
  to: StopPoint;
  departureSecs: number;
  arrivalSecs: number;
  headwayBased: boolean;
};

type WalkLeg = {
  kind: "walk";
  from: StopPoint;
  to: StopPoint;
  departureSecs: number;
  arrivalSecs: number;
};

type Leg = TransitLeg | WalkLeg;

type MapPoint = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  role: string;
};

type MapSegment = {
  mode: string;
  color: string;
  coordinates: [number, number][];
};

type ApiSegment = {
  kind: string;
  color?: string;
  polyline?: Array<{ lat: number; lon: number }>;
};

type Journey = {
  legs: Leg[];
  mapPoints: MapPoint[];
  mapSegments: MapSegment[];
};

type GuidanceOption = {
  id: string;
  rank: number;
  metrics: {
    durationSecs: number;
    transitSecs: number;
    walkSecs: number;
    transfers: number;
  };
  map: {
    bounds: { minLat: number; minLon: number; maxLat: number; maxLon: number };
    points: MapPoint[];
    segments: ApiSegment[];
  };
  journey: {
    legs: Leg[];
  };
};

type GuidanceResponse = {
  date: string;
  type: string;
  timezone: string;
  options: GuidanceOption[];
};

type PlanResponse = {
  date: string;
  journeys: Journey[];
};

function parseGuidanceToJourneys(data: GuidanceResponse): Journey[] {
  return data.options.map((opt) => {
    const legs = opt.journey?.legs ?? [];
    const points = opt.map?.points ?? [];
    const apiSegments = opt.map?.segments ?? [];

    const mapSegments: MapSegment[] = apiSegments
      .filter((s) => s.polyline && s.polyline.length >= 2)
      .map((s) => ({
        mode: s.kind,
        color:
          s.kind === "transit" && s.color
            ? `#${s.color.replace(/^#/, "")}`
            : WALK_SEGMENT_COLOR,
        coordinates: (s.polyline ?? []).map((p): [number, number] => [
          p.lon,
          p.lat,
        ]),
      }));

    return { legs, mapPoints: points, mapSegments };
  });
}

async function suggestLocations(
  query: string,
  limit = 10
): Promise<SuggestStation[]> {
  const params = new URLSearchParams({ q: query, limit: String(limit) });
  const res = await fetch(`${API_BASE}/api/v1/locations/suggest?${params}`);
  if (!res.ok) throw new Error(`suggest failed: ${res.status}`);
  const data: { stations: SuggestStation[] } = await res.json();
  return data.stations;
}

async function reverseGeocode(
  lat: number,
  lon: number,
  limit = 8,
  radiusMeters = 500
): Promise<NearbyPlace[]> {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    limit: String(limit),
    radiusMeters: String(radiusMeters),
  });
  const res = await fetch(`${API_BASE}/api/v1/places/reverse?${params}`);
  if (!res.ok) throw new Error(`reverse geocode failed: ${res.status}`);
  const data: { places: NearbyPlace[] } = await res.json();
  return data.places;
}

type SearchMode = "last" | "now";

async function searchTrains(
  fromLat: number,
  fromLon: number,
  toId: string,
  mode: SearchMode
): Promise<PlanResponse> {
  const from = `geo:${fromLat},${fromLon}`;

  if (mode === "now") {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const res = await fetch(
      `${API_BASE}/api/v1/guidance/plan?${new URLSearchParams({ from, to: toId, type: "departure", date, time, numItineraries: "6" })}`
    );
    if (!res.ok) throw new Error(`plan failed: ${res.status}`);
    const data: GuidanceResponse = await res.json();
    return { date: data.date, journeys: parseGuidanceToJourneys(data) };
  }

  const lastRes = await fetch(
    `${API_BASE}/api/v1/guidance/plan?${new URLSearchParams({ from, to: toId, type: "last", numItineraries: "1" })}`
  );
  if (!lastRes.ok) throw new Error(`plan failed: ${lastRes.status}`);
  const lastData: GuidanceResponse = await lastRes.json();

  const lastJourneys = parseGuidanceToJourneys(lastData);
  const lastDeparture = lastJourneys[0]?.legs[0]?.departureSecs;
  if (lastDeparture == null)
    return { date: lastData.date, journeys: lastJourneys };

  const searchFromSecs = Math.max(0, lastDeparture - 7200);
  const h = Math.floor(searchFromSecs / 3600);
  const m = Math.floor((searchFromSecs % 3600) / 60);
  const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

  const deptRes = await fetch(
    `${API_BASE}/api/v1/guidance/plan?${new URLSearchParams({ from, to: toId, type: "departure", date: lastData.date, time, numItineraries: "6" })}`
  );
  if (!deptRes.ok) return { date: lastData.date, journeys: lastJourneys };
  const deptData: GuidanceResponse = await deptRes.json();
  return {
    date: deptData.date,
    journeys: parseGuidanceToJourneys(deptData),
  };
}

function formatServiceTime(secs: number): string {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function formatDurationMinutes(secs: number): number {
  return Math.round(secs / 60);
}

export {
  suggestLocations,
  reverseGeocode,
  searchTrains,
  formatServiceTime,
  formatDurationMinutes,
};

type UserLocation = {
  lat: number;
  lon: number;
};

export type {
  SuggestStation,
  NearbyPlace,
  Journey,
  PlanResponse,
  UserLocation,
  SearchMode,
};
