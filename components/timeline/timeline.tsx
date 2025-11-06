"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TimelineEvent } from "@/lib/schemas";
import { inkReveal, pageTurn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { usePreferencesStore } from "@/stores/preferences-store";

type TimelineProps = {
  events: TimelineEvent[];
};

export function Timeline({ events }: TimelineProps) {
  const { prefersReducedMotion } = usePreferencesStore();

  const grouped = useMemo(() => {
    const map = new Map<number, TimelineEvent[]>();
    events
      .slice()
      .sort((a, b) => a.year - b.year)
      .forEach((event) => {
        const collection = map.get(event.year) ?? [];
        collection.push(event);
        map.set(event.year, collection);
      });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [events]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const clampIndex = useCallback(
    (value: number) => {
      if (!grouped.length) return 0;
      if (value < 0) return 0;
      if (value >= grouped.length) return grouped.length - 1;
      return value;
    },
    [grouped.length]
  );

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => clampIndex(prev + 1));
  }, [clampIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => clampIndex(prev - 1));
  }, [clampIndex]);

  useEffect(() => {
    if (!grouped.length) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, grouped.length]);

  const safeIndex = useMemo(
    () => clampIndex(currentIndex),
    [clampIndex, currentIndex]
  );

  const activeTuple = grouped[safeIndex];
  const progress = grouped.length
    ? ((safeIndex + 1) / grouped.length) * 100
    : 0;

  return (
    <div className="relative grid gap-10 md:grid-cols-[220px_1fr]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-16 hidden w-px bg-gradient-to-b from-transparent via-border/60 to-transparent md:block"
      />
      <aside className="md:sticky md:top-24">
        <ScrollArea className="paper-surface ink-outline rounded-3xl border border-border/60 p-4 md:max-h-none">
          <ol className="space-y-3 text-sm font-medium text-muted-foreground">
            {grouped.map(([year], index) => {
              const isActive = index === safeIndex;
              return (
                <li key={year}>
                  <button
                    type="button"
                    onClick={() => setCurrentIndex(() => clampIndex(index))}
                    aria-current={isActive ? "true" : "false"}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2",
                      isActive
                        ? "bg-secondary/15 text-foreground"
                        : "hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full transition",
                        isActive ? "bg-secondary" : "bg-border/70"
                      )}
                    />
                    {year}
                  </button>
                </li>
              );
            })}
          </ol>
        </ScrollArea>
      </aside>
      <div className="relative space-y-8">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <motion.div
              variants={prefersReducedMotion ? undefined : inkReveal}
              initial={prefersReducedMotion ? undefined : "hidden"}
              animate={prefersReducedMotion ? undefined : "show"}
              className="inline-flex items-baseline gap-3 rounded-full border border-border/60 bg-background/95 px-6 py-2 font-serif text-2xl font-semibold shadow-sm"
            >
              <span className="text-secondary">
                {activeTuple ? activeTuple[0] : "—"}
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Milestones
              </span>
            </motion.div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                disabled={safeIndex === 0}
                className={cn(
                  "rounded-full border border-border/60 px-4 py-2 text-xs uppercase tracking-[0.3em] transition",
                  safeIndex === 0
                    ? "cursor-not-allowed opacity-40"
                    : "hover:bg-accent hover:text-foreground"
                )}
                aria-label="Previous era"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={safeIndex === grouped.length - 1}
                className={cn(
                  "rounded-full border border-border/60 px-4 py-2 text-xs uppercase tracking-[0.3em] transition",
                  safeIndex === grouped.length - 1
                    ? "cursor-not-allowed opacity-40"
                    : "hover:bg-accent hover:text-foreground"
                )}
                aria-label="Next era"
              >
                Next
              </button>
            </div>
          </div>
          <div className="h-1 w-full rounded-full bg-border/40">
            <div
              className="h-full rounded-full bg-secondary transition-[width]"
              style={{ width: `${progress}%` }}
              aria-hidden
            />
          </div>
        </div>
        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait">
            {activeTuple ? (
              <motion.section
                key={activeTuple[0]}
                variants={prefersReducedMotion ? undefined : pageTurn}
                initial={prefersReducedMotion ? "show" : "hidden"}
                animate="show"
                exit={
                  prefersReducedMotion
                    ? "show"
                    : { opacity: 0, rotateX: -8, y: 12 }
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[36px] border border-border/60 bg-card/95 p-8 shadow-soft paper-surface ink-outline"
                aria-live="polite"
              >
                <div className="pointer-events-none absolute -right-28 top-10 hidden h-56 w-56 rounded-full bg-secondary/10 blur-3xl lg:block" />
                <div className="space-y-6">
                  {activeTuple[1].map((event) => (
                    <div
                      key={event.id}
                      className="rounded-3xl border border-border/50 bg-background/80 p-6 shadow-sm transition supports-hover:group-hover:border-secondary/50"
                    >
                      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        {event.date ? (
                          <span>
                            {new Date(event.date).toLocaleDateString("en-PH", {
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        ) : null}
                        {event.tags.length ? (
                          <span className="hidden text-border/80 md:block">
                            ·
                          </span>
                        ) : null}
                        <span>{event.tags.join(" · ")}</span>
                      </div>
                      <h3 className="mt-3 font-serif text-2xl font-semibold text-foreground">
                        {event.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {event.summary}
                      </p>
                      {event.tags.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {event.tags.map((tag) => (
                            <Badge variant="outline" key={`${event.id}-${tag}`}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <span>
                    Era {safeIndex + 1} of {grouped.length}
                  </span>
                  <span>{activeTuple[1].length} entries</span>
                </div>
              </motion.section>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
