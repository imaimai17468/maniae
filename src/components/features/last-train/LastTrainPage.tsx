import { useCallback, useEffect, useState } from "react";
import { MapPin, AlertTriangle, Moon, Sun } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import logoBlack from "@/assets/logo-square-black.png";
import logoWhite from "@/assets/logo-square-white.png";
import { reverseGeocode, searchTrains } from "@/lib/transit-api";
import type {
  SuggestStation,
  NearbyPlace,
  Journey,
  PlanResponse,
  UserLocation,
} from "@/lib/transit-api";
import { DestinationSearch } from "./DestinationSearch";
import { ResultsPanel } from "./ResultsPanel";
import { TrainMap } from "./TrainMap";

import type { SearchMode } from "@/lib/transit-api";

type AppState = "locating" | "ready" | "searching" | "results" | "error";

function journeyDuration(j: Journey): number {
  const first = j.legs[0];
  const last = j.legs[j.legs.length - 1];
  if (!first || !last) return Infinity;
  return last.arrivalSecs - first.departureSecs;
}

function filterAndSort(journeys: Journey[]): Journey[] {
  const withTransit = journeys.filter((j) =>
    j.legs.some((l) => l.kind === "transit")
  );
  if (withTransit.length === 0) return journeys;

  const shortest = Math.min(...withTransit.map(journeyDuration));
  const reasonable = withTransit.filter(
    (j) => journeyDuration(j) <= shortest * 3
  );

  return reasonable
    .toSorted((a, b) => {
      const aDepart = a.legs[0]?.departureSecs ?? 0;
      const bDepart = b.legs[0]?.departureSecs ?? 0;
      return bDepart - aDepart;
    })
    .slice(0, 3);
}

export const LastTrainPage = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearbyStations, setNearbyStations] = useState<NearbyPlace[]>([]);
  const [allJourneys, setAllJourneys] = useState<Journey[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [appState, setAppState] = useState<AppState>("locating");
  const [errorMessage, setErrorMessage] = useState("");
  const [destination, setDestination] = useState<SuggestStation | null>(null);
  const [searchMode, setSearchMode] = useState<SearchMode>("last");
  const [panelOpen, setPanelOpen] = useState(true);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const fallbackToReady = () => {
      setAppState("ready");
    };

    if (!("geolocation" in navigator) || !window.isSecureContext) {
      fallbackToReady();
      return;
    }

    const timeoutId = setTimeout(fallbackToReady, 15000);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(timeoutId);
        const loc = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setUserLocation(loc);
        setAppState("ready");
        void reverseGeocode(loc.lat, loc.lon, 8, 1000).then(setNearbyStations);
      },
      () => {
        clearTimeout(timeoutId);
        fallbackToReady();
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
    );

    return () => clearTimeout(timeoutId);
  }, []);

  const doSearch = useCallback(
    (station: SuggestStation, mode: SearchMode) => {
      if (!userLocation) return;

      setDestination(station);
      setAppState("searching");
      setAllJourneys([]);
      setSelectedIndex(null);

      searchTrains(userLocation.lat, userLocation.lon, station.id, mode)
        .then((res: PlanResponse) => {
          const sorted = filterAndSort(res.journeys);
          setAllJourneys(sorted);
          setAppState("results");
          setPanelOpen(true);
          if (sorted.length > 0) {
            setSelectedIndex(0);
          }
        })
        .catch(() => {
          setAppState("error");
          setErrorMessage("検索に失敗しました。もう一度お試しください");
        });
    },
    [userLocation]
  );

  const handleSelectDestination = useCallback(
    (station: SuggestStation) => {
      doSearch(station, searchMode);
    },
    [doSearch, searchMode]
  );

  const handleModeChange = useCallback(
    (checked: boolean) => {
      const newMode: SearchMode = checked ? "now" : "last";
      setSearchMode(newMode);
      if (destination && userLocation) {
        doSearch(destination, newMode);
      }
    },
    [destination, userLocation, doSearch]
  );

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <div className="relative h-dvh">
      <TrainMap
        userLocation={userLocation}
        nearbyStations={nearbyStations}
        journeys={allJourneys}
        selectedIndex={selectedIndex}
      />

      <div className="absolute top-4 right-4 left-4 z-10 flex items-center gap-2">
        <Link to="/about">
          <img
            src={resolvedTheme === "dark" ? logoWhite : logoBlack}
            alt="MANIAE!"
            className="size-11 shrink-0 rounded-lg border border-border"
          />
        </Link>
        <div className="flex-1">
          <DestinationSearch onSelect={handleSelectDestination} />
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="bg-card border-border flex size-11 shrink-0 items-center justify-center rounded-lg border transition-colors hover:bg-secondary"
          aria-label="テーマを切り替え"
        >
          <Sun className="dark:-rotate-90 size-4 rotate-0 scale-100 transition-all dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
      </div>

      {appState === "locating" && (
        <div className="bg-card absolute inset-0 z-20 flex flex-col items-center justify-center gap-3">
          <div className="border-accent size-8 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-muted-foreground text-sm">現在地を取得中...</p>
        </div>
      )}

      {appState === "error" && (
        <div className="bg-card absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 p-6">
          <AlertTriangle className="text-destructive size-8" />
          <p className="text-center text-sm">{errorMessage}</p>
        </div>
      )}

      {appState === "searching" && (
        <div className="absolute bottom-4 right-4 left-4 z-10">
          <div className="bg-card flex items-center justify-center gap-2 rounded-lg border p-4">
            <div className="border-accent size-4 animate-spin rounded-full border-2 border-t-transparent" />
            <span className="text-sm">{destination?.name} を検索中...</span>
          </div>
        </div>
      )}

      {appState === "ready" &&
        nearbyStations.length > 0 &&
        allJourneys.length === 0 && (
          <div className="absolute bottom-4 right-4 left-4 z-10">
            <div className="bg-card flex items-center gap-2 rounded-lg border p-3">
              <MapPin className="text-accent size-4 shrink-0" />
              <p className="text-muted-foreground text-xs">
                周辺に{nearbyStations.length}
                件の駅・停留所が見つかりました。目的地を入力して検索できます
              </p>
            </div>
          </div>
        )}

      {appState === "results" && allJourneys.length > 0 && (
        <ResultsPanel
          destination={destination}
          searchMode={searchMode}
          journeys={allJourneys}
          selectedIndex={selectedIndex}
          panelOpen={panelOpen}
          onToggle={() => setPanelOpen((prev) => !prev)}
          onModeChange={handleModeChange}
          onSelectJourney={setSelectedIndex}
        />
      )}

      {appState === "results" && allJourneys.length === 0 && (
        <div className="absolute bottom-4 right-4 left-4 z-10">
          <div className="bg-card rounded-lg border p-6 text-center">
            <p className="text-muted-foreground text-sm">
              見つかりませんでした。別の目的地をお試しください
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
