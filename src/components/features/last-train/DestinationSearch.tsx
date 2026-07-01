import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { suggestLocations } from "@/lib/transit-api";
import type { SuggestStation } from "@/lib/transit-api";
import { cn } from "@/lib/utils";

type DestinationSearchProps = {
  onSelect: (station: SuggestStation) => void;
};

export const DestinationSearch = ({ onSelect }: DestinationSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SuggestStation[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.length === 0) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const stations = await suggestLocations(q, 8);
      setResults(stations);
      setOpen(stations.length > 0);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        void search(value);
      }, 300);
    },
    [search]
  );

  const handleSelect = useCallback(
    (station: SuggestStation) => {
      setQuery(station.name);
      setOpen(false);
      setResults([]);
      onSelect(station);
    },
    [onSelect]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        e.target instanceof Node &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="目的地を入力..."
          className={cn(
            "search-input bg-card border-border text-foreground placeholder:text-muted-foreground w-full rounded-lg border py-2.5 pr-4 pl-10 text-base backdrop-blur-md",
            "focus:outline-none focus:ring-2"
          )}
        />
        {loading && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <div className="border-accent size-4 animate-spin rounded-full border-2 border-t-transparent" />
          </div>
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="bg-card border-border absolute top-full right-0 left-0 z-50 mt-1 max-h-64 overflow-y-auto rounded-lg border backdrop-blur-md">
          {results.map((station) => (
            <li key={station.id}>
              <button
                type="button"
                onClick={() => handleSelect(station)}
                className="hover:bg-accent hover:text-accent-foreground flex w-full flex-col gap-0.5 px-4 py-2.5 text-left transition-colors"
              >
                <span className="text-sm font-medium">{station.name}</span>
                <span className="text-muted-foreground text-xs">
                  {station.feedName}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
