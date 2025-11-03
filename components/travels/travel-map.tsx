"use client";

import { geoMercator, geoPath } from "d3-geo";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { TravelSpot } from "@/lib/schemas";
import { worldFeatures } from "@/lib/world";
import { usePreferencesStore } from "@/stores/preferences-store";

const MAP_WIDTH = 700;
const MAP_HEIGHT = 420;

type TravelMapProps = {
  spots: TravelSpot[];
};

export function TravelMap({ spots }: TravelMapProps) {
  const [active, setActive] = useState<TravelSpot | null>(null);
  const { prefersReducedMotion } = usePreferencesStore();

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

  const handleActivate = useCallback((spot: TravelSpot) => {
    setActive(spot);
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <div className="paper-surface grain-overlay flex flex-col gap-4 rounded-3xl border border-border/60 p-4 shadow-soft">
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          role="img"
          aria-label={
            active
              ? `World map focused on ${active.place}, ${active.country}`
              : "World map for Rizal's journeys. Select a location card to reveal pins."
          }
          className="h-auto w-full rounded-[30px] border border-border/40 bg-parchment/80"
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
                  className="cursor-pointer"
                  initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.6 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => handleActivate(active)}
                  onFocus={() => handleActivate(active)}
                  onClick={() => handleActivate(active)}
                  tabIndex={0}
                  role="button"
                  aria-pressed="true"
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
              className="rounded-2xl border border-border/60 bg-background/90 p-5 text-sm leading-relaxed text-muted-foreground shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-serif text-lg text-foreground">{active.place}</p>
                <span className="text-xs uppercase tracking-[0.3em] text-primary">
                  {active.dateRange}
                </span>
              </div>
              <p className="mt-3">{active.story}</p>
              {active.notes ? (
                <p className="mt-3 text-xs uppercase tracking-[0.3em] text-secondary">{active.notes}</p>
              ) : null}
            </motion.div>
          ) : (
            <motion.div
              key="travel-instructions"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-primary/30 bg-primary/5 px-6 py-4 font-serif text-lg text-primary"
            >
              Select a journey card to illuminate Rizal&apos;s path across the map.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="space-y-4">
        {spots.map((spot) => {
          const isActive = active?.id === spot.id;
          return (
            <button
              key={spot.id}
              onMouseEnter={() => handleActivate(spot)}
              onFocus={() => handleActivate(spot)}
              onClick={() => handleActivate(spot)}
              className="w-full text-left"
            >
              <Card
                className={
                  isActive
                    ? "paper-surface border-secondary/70 bg-secondary/10 text-foreground shadow-soft supports-hover:hover:border-secondary"
                    : "paper-surface border-border/60 bg-card"
                }
              >
                <CardHeader className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-lg">{spot.place}</CardTitle>
                    <Badge variant="outline">{spot.country}</Badge>
                  </div>
                  <CardDescription className="text-xs uppercase tracking-[0.3em]">
                    {spot.dateRange}
                  </CardDescription>
                </CardHeader>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {spot.story}
                </p>
                {spot.notes ? (
                  <p className="mt-3 text-xs font-medium uppercase tracking-widest text-primary">
                    {spot.notes}
                  </p>
                ) : null}
              </Card>
            </button>
          );
        })}
        {!active ? (
          <p className="rounded-2xl border border-border/60 bg-card/70 p-4 text-sm text-muted-foreground">
            Hint: begin with Calamba or Manila to see how his first voyages shaped the journeys that
            followed.
          </p>
        ) : null}
      </div>
    </div>
  );
}
