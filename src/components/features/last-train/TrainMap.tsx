import { Fragment, useEffect } from "react";
import {
  Map,
  useMap,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapRoute,
  MapControls,
} from "@/components/ui/map";
import { stripEnglish } from "@/lib/transit-api";
import type { Journey, NearbyPlace, UserLocation } from "@/lib/transit-api";

const ROUTE_MUTED_COLOR = "#888";

type TrainMapProps = {
  userLocation: UserLocation | null;
  nearbyStations: NearbyPlace[];
  journeys: Journey[];
  selectedIndex: number | null;
};

const FlyToLocation = ({ location }: { location: UserLocation }) => {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;
    map.flyTo({
      center: [location.lon, location.lat],
      zoom: 14,
      duration: 1500,
    });
  }, [map, isLoaded, location.lat, location.lon]);

  return null;
};

const FitToRoutes = ({ journeys }: { journeys: Journey[] }) => {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded || journeys.length === 0) return;

    const allCoords = journeys.flatMap((j) =>
      j.mapSegments.flatMap((s) => s.coordinates)
    );
    if (allCoords.length === 0) return;

    const lons = allCoords.map(([lon]) => lon);
    const lats = allCoords.map(([, lat]) => lat);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    map.fitBounds(
      [
        [minLon, minLat],
        [maxLon, maxLat],
      ],
      { padding: 60, duration: 1000 }
    );
  }, [map, isLoaded, journeys]);

  return null;
};

export const TrainMap = ({
  userLocation,
  nearbyStations,
  journeys,
  selectedIndex,
}: TrainMapProps) => {
  return (
    <Map center={[139.7671, 35.6812]} zoom={12} className="h-full w-full">
      <MapControls
        position="bottom-right"
        showZoom
        showLocate
        showCompass={false}
      />

      {userLocation && <FlyToLocation location={userLocation} />}
      {journeys.length > 0 && <FitToRoutes journeys={journeys} />}

      {userLocation && (
        <MapMarker longitude={userLocation.lon} latitude={userLocation.lat}>
          <MarkerContent>
            <div
              className="size-4 rounded-full border-2 border-foreground"
              style={{ backgroundColor: "#e0b400" }}
            />
          </MarkerContent>
          <MarkerPopup className="border-none bg-foreground p-1 px-2 shadow-none text-background text-xs font-medium">
            現在地
          </MarkerPopup>
        </MapMarker>
      )}

      {nearbyStations.map((station) => (
        <MapMarker
          key={station.id}
          longitude={station.lon}
          latitude={station.lat}
        >
          <MarkerContent>
            <div className="flex size-6 items-center justify-center rounded-full border-2 border-accent bg-foreground text-xs font-bold text-background">
              駅
            </div>
          </MarkerContent>
          <MarkerPopup className="border-none bg-foreground p-1 px-2 shadow-none text-background text-xs font-medium">
            {stripEnglish(station.name)}
          </MarkerPopup>
        </MapMarker>
      ))}

      {journeys.map((journey, journeyIdx) => {
        const isSelected = journeyIdx === selectedIndex;

        return (
          <Fragment key={`journey-${journeyIdx}`}>
            {journey.mapSegments.map((seg, segIdx) => (
              <MapRoute
                key={`j${journeyIdx}-s${segIdx}`}
                coordinates={seg.coordinates}
                color={isSelected ? seg.color : ROUTE_MUTED_COLOR}
                opacity={isSelected ? 0.95 : 0.35}
                dashArray={seg.mode === "walk" ? [4, 4] : undefined}
                interactive={false}
              />
            ))}
            {isSelected &&
              journey.mapPoints
                .filter((p) => p.role === "stop" || p.role === "transfer")
                .map((p) => (
                  <MapMarker
                    key={`pt-${p.id}`}
                    longitude={p.lon}
                    latitude={p.lat}
                  >
                    <MarkerContent>
                      <div className="size-3 rounded-full border-2 border-background bg-foreground" />
                    </MarkerContent>
                    <MarkerPopup className="border-none bg-foreground p-1 px-2 shadow-none text-background text-xs font-medium">
                      {stripEnglish(p.name)}
                    </MarkerPopup>
                  </MapMarker>
                ))}
          </Fragment>
        );
      })}
    </Map>
  );
};
