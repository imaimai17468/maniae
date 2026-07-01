import { Footprints, ArrowRight } from "lucide-react";
import {
  formatServiceTime,
  formatDurationMinutes,
  stripEnglish,
} from "@/lib/transit-api";
import type { Journey } from "@/lib/transit-api";
import { cn } from "@/lib/utils";

type JourneyCardProps = {
  journey: Journey;
  selected: boolean;
  onSelect: () => void;
};

export const JourneyCard = ({
  journey,
  selected,
  onSelect,
}: JourneyCardProps) => {
  const firstLeg = journey.legs[0];
  const lastLeg = journey.legs[journey.legs.length - 1];

  if (!firstLeg || !lastLeg) return null;

  const departureTime = formatServiceTime(firstLeg.departureSecs);
  const arrivalTime = formatServiceTime(lastLeg.arrivalSecs);
  const durationMin = formatDurationMinutes(
    lastLeg.arrivalSecs - firstLeg.departureSecs
  );
  const transfers = journey.legs.filter((l) => l.kind === "transit").length - 1;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full flex-col gap-2 rounded-lg border p-3 text-left transition-colors",
        selected
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-secondary text-card-foreground hover:bg-muted"
      )}
    >
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1">
          <span className="font-bold text-xl tabular-nums">
            {departureTime}
          </span>
          <span
            className={cn(
              "text-sm",
              selected
                ? "text-accent-foreground-muted"
                : "text-muted-foreground"
            )}
          >
            →
          </span>
          <span className="font-bold text-xl tabular-nums">{arrivalTime}</span>
        </div>
        <span
          className={cn(
            "text-sm",
            selected ? "text-accent-foreground-muted" : "text-muted-foreground"
          )}
        >
          {durationMin}分{transfers > 0 ? ` / 乗換${transfers}回` : " / 直通"}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-sm font-medium">
          {stripEnglish(firstLeg.from.name)}
        </span>
        <ArrowRight
          className={cn(
            "size-3",
            selected ? "text-accent-foreground-muted" : "text-muted-foreground"
          )}
        />
        <span className="text-sm font-medium">
          {stripEnglish(lastLeg.to.name)}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        {journey.legs.map((leg, i) => (
          <span key={`leg-${i}`} className="flex items-center gap-1">
            {i > 0 && (
              <ArrowRight
                className={cn(
                  "size-3 shrink-0",
                  selected
                    ? "text-accent-foreground-muted"
                    : "text-muted-foreground"
                )}
              />
            )}
            {leg.kind === "walk" ? (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs",
                  selected
                    ? "text-accent-foreground-muted"
                    : "text-muted-foreground"
                )}
              >
                <Footprints className="size-3" />
                徒歩
                {formatDurationMinutes(leg.arrivalSecs - leg.departureSecs)}分
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-medium">
                {leg.color && (
                  <span
                    className="inline-block size-2.5 shrink-0 rounded-full border border-foreground"
                    style={{
                      backgroundColor: `#${leg.color.replace(/^#/, "")}`,
                    }}
                  />
                )}
                {stripEnglish(leg.from.name)}
              </span>
            )}
          </span>
        ))}
        <ArrowRight
          className={cn(
            "size-3 shrink-0",
            selected ? "text-accent-foreground-muted" : "text-muted-foreground"
          )}
        />
        <span className="text-xs font-medium">
          {stripEnglish(lastLeg.to.name)}
        </span>
      </div>
    </button>
  );
};
