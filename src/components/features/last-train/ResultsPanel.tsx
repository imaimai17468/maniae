import { useCallback, useRef } from "react";
import { TrainFront, Clock } from "lucide-react";
import type { SuggestStation, Journey, SearchMode } from "@/lib/transit-api";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { JourneyCard } from "./JourneyCard";

type ResultsPanelProps = {
  destination: SuggestStation | null;
  searchMode: SearchMode;
  journeys: Journey[];
  selectedIndex: number | null;
  panelOpen: boolean;
  onToggle: () => void;
  onModeChange: (checked: boolean) => void;
  onSelectJourney: (index: number) => void;
};

export const ResultsPanel = ({
  destination,
  searchMode,
  journeys,
  selectedIndex,
  panelOpen,
  onToggle,
  onModeChange,
  onSelectJourney,
}: ResultsPanelProps) => {
  const dragStartY = useRef<number | null>(null);
  const dragStartTime = useRef<number>(0);
  const isDragging = useRef(false);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      dragStartY.current = e.clientY;
      dragStartTime.current = performance.now();
      isDragging.current = false;
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (dragStartY.current == null) return;
      if (Math.abs(e.clientY - dragStartY.current) > 8) {
        isDragging.current = true;
      }
    },
    []
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (dragStartY.current == null) return;
      const delta = e.clientY - dragStartY.current;
      const elapsed = performance.now() - dragStartTime.current;
      const velocity = Math.abs(delta) / elapsed;
      dragStartY.current = null;

      if (isDragging.current) {
        const isSwipe = velocity > 0.3 || Math.abs(delta) > 30;
        if (isSwipe) {
          if (delta > 0 && panelOpen) onToggle();
          if (delta < 0 && !panelOpen) onToggle();
        }
        isDragging.current = false;
        return;
      }

      onToggle();
    },
    [panelOpen, onToggle]
  );

  const label = `${destination?.name ?? ""} への${searchMode === "last" ? "終電" : "経路"}`;

  return (
    <div className="pointer-events-none absolute bottom-0 right-0 left-0 z-10 flex flex-col items-center">
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="scoop-tab bg-card pointer-events-auto px-5 py-1.5 touch-none"
      >
        <div className="scoop-tab-hover-overlay" />
        <div className="mx-auto mb-1 h-1 w-8 rounded-full bg-muted-foreground" />
        <span className="text-xs font-medium">{label}</span>
      </button>

      <div
        className="bg-card pointer-events-auto w-full overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: panelOpen ? "50dvh" : "0px",
          opacity: panelOpen ? 1 : 0,
        }}
      >
        <div className="flex flex-col gap-2 overflow-y-auto p-3">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex items-center gap-1 text-sm font-bold",
                searchMode === "last"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <TrainFront className="size-4" />
              終電
            </span>
            <Switch
              checked={searchMode === "now"}
              onCheckedChange={onModeChange}
            />
            <span
              className={cn(
                "flex items-center gap-1 text-sm font-bold",
                searchMode === "now"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Clock className="size-4" />
              現在
            </span>
          </div>
          {journeys.map((journey, i) => (
            <JourneyCard
              key={`journey-${journey.legs[0]?.departureSecs ?? i}`}
              journey={journey}
              selected={selectedIndex === i}
              onSelect={() => onSelectJourney(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
