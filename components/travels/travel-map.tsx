"use client";

import { geoMercator, geoPath } from "d3-geo";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { TravelSpot } from "@/lib/schemas";
import { worldFeatures } from "@/lib/world";
import { usePreferencesStore } from "@/stores/preferences-store";
import { cn } from "@/lib/utils";

const MAP_WIDTH = 700;
const MAP_HEIGHT = 420;

type TravelMapProps = {
  spots: TravelSpot[];
};

export function TravelMap({ spots }: TravelMapProps) {
  const [index, setIndex] = useState(0);
  const { prefersReducedMotion } = usePreferencesStore();
  const active = spots[index] ?? null;

  const projection = useMemo(() => {
    return geoMercator().scale(110).translate([MAP_WIDTH / 2, MAP_HEIGHT / 1.6]);
  }, []);

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  const viewTarget = useMemo(() => {
    if (prefersReducedMotion || !active) {
      return { x: 0, y: 0, scale: 1 };
    }
    const coordinates = projection([active.lng, active.lat]);
    if (!coordinates) {
      return { x: 0, y: 0, scale: 1 };
    }
    const [x, y] = coordinates;
    const offsetX = MAP_WIDTH / 2 - x;
    const offsetY = MAP_HEIGHT / 2 - y;
    return { x: offsetX, y: offsetY, scale: 1.22 };
  }, [active, prefersReducedMotion, projection]);

  const activeCoordinates = useMemo(() => {
    if (!active) return null;
    const coords = projection([active.lng, active.lat]);
    if (!coords) return null;
    return { x: coords[0], y: coords[1] };
  }, [active, projection]);

  const goNext = useCallback(() => {
    setIndex((prev) => {
      const next = prev + 1;
      if (!spots.length) return 0;
      if (next >= spots.length) {
        return spots.length - 1;
      }
      return next;
    });
  }, [spots.length]);

  const goPrev = useCallback(() => {
    setIndex((prev) => {
      const next = prev - 1;
      if (next < 0) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName.toLowerCase();
        if (tag === "input" || tag === "textarea" || target.isContentEditable) {
          return;
        }
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [goNext, goPrev]);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="w-full max-w-6xl">
        <div className="paper-surface grain-overlay flex flex-col gap-6 rounded-[48px] border border-border/60 p-8 shadow-soft">
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          role="img"
          aria-label={
            active
              ? `World map focused on ${active.place}, ${active.country}`
              : "World map for Rizal's journeys. Select a location card to reveal pins."
          }
          className="h-auto w-full rounded-[40px] border border-border/40 bg-parchment/80 shadow-soft"
        >
          <defs>
            <radialGradient id="pinGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7a2e3b" />
              <stop offset="100%" stopColor="#7a2e3b" stopOpacity="0.3" />
            </radialGradient>
            <radialGradient id="haloGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59, 128, 112, 0.45)" />
              <stop offset="100%" stopColor="rgba(59, 128, 112, 0)" />
            </radialGradient>
          </defs>
          <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#pinGradient)" opacity="0.08" />
          <motion.g
            animate={
              prefersReducedMotion
                ? { x: 0, y: 0, scale: 1 }
                : {
                    x: viewTarget.x,
                    y: viewTarget.y,
                    scale: viewTarget.scale,
                  }
            }
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <g className="fill-border/40 stroke-border/80">
              {worldFeatures.map((feature, index) => (
                <path
                  key={index}
                  d={pathGenerator(feature) ?? ""}
                  fill="rgba(35,31,32,0.06)"
                  stroke="rgba(35,31,32,0.18)"
                  strokeWidth={0.5}
                />
              ))}
            </g>
            {active && activeCoordinates ? (
              <g key={active.id}>
                {!prefersReducedMotion ? (
                  <motion.circle
                    cx={activeCoordinates.x}
                    cy={activeCoordinates.y}
                    r={0}
                    fill="url(#haloGradient)"
                    initial={{ r: 0, opacity: 0.18 }}
                    animate={{ r: 28, opacity: 0 }}
                    transition={{ duration: 1.6, ease: "easeOut", repeat: Infinity }}
                    aria-hidden
                  />
                ) : null}
                <motion.circle
                  cx={activeCoordinates.x}
                  cy={activeCoordinates.y}
                  r={7}
                  fill="#3b8070"
                  className="cursor-default"
                  initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.6 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  aria-label={`${active.place}, ${active.country}`}
                />
                <motion.text
                  x={activeCoordinates.x + 12}
                  y={activeCoordinates.y - 12}
                  className="text-xs font-medium text-foreground drop-shadow-sm"
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 6 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: -2 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {active.place}
                </motion.text>
              </g>
            ) : null}
          </motion.g>
        </svg>
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[30px] border border-border/60 bg-background/95 p-6 text-base leading-relaxed text-foreground/80 shadow-sm md:p-10 md:text-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-3xl font-semibold text-foreground">{active.place}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.25em] text-secondary">
                    {active.country}
                  </p>
                </div>
                <span className="rounded-full border border-border/50 px-4 py-2 text-sm uppercase tracking-[0.2em] text-primary">
                  {active.dateRange}
                </span>
              </div>
              <p className="mt-4 text-foreground/80 md:text-[1.05rem] md:leading-relaxed">{active.story}</p>
              {active.highlights && active.highlights.length > 0 ? (
                <ul className="mt-4 space-y-2 text-left text-sm leading-relaxed text-muted-foreground">
                  {active.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-secondary/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {active.notes ? (
                <p className="mt-4 text-sm uppercase tracking-[0.25em] text-secondary">{active.notes}</p>
              ) : null}
              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={index === 0}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border border-border/60 text-lg transition",
                    index === 0
                      ? "cursor-not-allowed opacity-40"
                      : "hover:bg-accent hover:text-foreground",
                  )}
                  aria-label="Previous location"
                >
                  ←
                </button>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Stop {index + 1} of {spots.length}
                </p>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={index === spots.length - 1}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border border-border/60 text-lg transition",
                    index === spots.length - 1
                      ? "cursor-not-allowed opacity-40"
                      : "hover:bg-accent hover:text-foreground",
                  )}
                  aria-label="Next location"
                >
                  →
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="travel-instructions"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[30px] border border-primary/30 bg-primary/10 px-6 py-6 text-center font-serif text-xl text-primary shadow-sm"
            >
              Select a journey card to illuminate Rizal&apos;s path across the map.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  </div>
  );
}
