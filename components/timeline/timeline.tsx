"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
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

  return (
    <div className="relative grid gap-10 md:grid-cols-[220px_1fr]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-16 hidden w-px bg-gradient-to-b from-transparent via-border/60 to-transparent md:block"
      />
      <aside className="md:sticky md:top-24">
        <ScrollArea className="paper-surface ink-outline max-h-[70vh] rounded-3xl border border-border/60 p-4">
          <ol className="space-y-3 text-sm font-medium text-muted-foreground">
            {grouped.map(([year]) => (
              <li key={year}>
                <a
                  href={`#year-${year}`}
                  className="flex items-center gap-3 rounded-full px-3 py-2 transition hover:bg-accent hover:text-foreground"
                >
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  {year}
                </a>
              </li>
            ))}
          </ol>
        </ScrollArea>
      </aside>
      <div className="relative space-y-12 border-l border-border/30 pl-10">
        <span className="absolute -left-[9px] top-0 h-full w-[3px] bg-gradient-to-b from-secondary via-border/60 to-transparent" />
        {grouped.map(([year, items]) => (
          <motion.section
            key={year}
            id={`year-${year}`}
            variants={
              prefersReducedMotion
                ? undefined
                : {
                    hidden: {},
                    show: {
                      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
                    },
                  }
            }
            initial={prefersReducedMotion ? undefined : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "show"}
            viewport={
              prefersReducedMotion
                ? undefined
                : { once: true, margin: "-20% 0px -20% 0px" }
            }
            className="scroll-mt-24 space-y-6"
          >
            <motion.div
              variants={prefersReducedMotion ? undefined : inkReveal}
              className="inline-flex items-baseline gap-3 rounded-full border border-border/60 bg-background/95 px-6 py-2 font-serif text-2xl font-semibold shadow-sm"
            >
              <span className="text-secondary">{year}</span>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Milestones
              </span>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((event) => (
                <motion.article
                  key={event.id}
                  variants={prefersReducedMotion ? undefined : pageTurn}
                  className={cn(
                    "relative overflow-hidden rounded-[30px] border border-border/60 bg-card p-6 shadow-sm transition",
                    "paper-surface ink-outline",
                    "supports-hover:hover:-translate-y-1 supports-hover:hover:shadow-soft",
                  )}
                >
                  <div className="pointer-events-none absolute -right-20 top-1/2 hidden h-40 w-40 -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl lg:block" />
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {event.date ? (
                      <span>
                        {new Date(event.date).toLocaleDateString("en-PH", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    ) : null}
                    {event.tags.length ? <span className="hidden text-border/80 md:block">·</span> : null}
                    <span>{event.tags.join(" · ")}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-xl font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {event.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge variant="outline" key={`${event.id}-${tag}`}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
