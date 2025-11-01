"use client";

import { geoMercator, geoPath } from "d3-geo";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
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
  const [active, setActive] = useState<TravelSpot | null>(spots[0] ?? null);
  const { prefersReducedMotion } = usePreferencesStore();

  const projection = useMemo(() => {
    return geoMercator().scale(110).translate([MAP_WIDTH / 2, MAP_HEIGHT / 1.6]);
  }, []);

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft">
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          role="img"
          aria-label={"World map showing the travels of Jos\u00e9 Rizal"}
          className="w-full"
        >
          <defs>
            <radialGradient id="pinGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7a2e3b" />
              <stop offset="100%" stopColor="#7a2e3b" stopOpacity="0.3" />
            </radialGradient>
          </defs>
          <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#pinGradient)" opacity="0.05" />
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
          <g>
            {spots.map((spot) => {
              const coordinates = projection([spot.lng, spot.lat]);
              if (!coordinates) return null;
              const [x, y] = coordinates;
              const isActive = active?.id === spot.id;
              return (
                <g key={spot.id}>
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={isActive ? 7 : 5}
                    fill={isActive ? "#3b8070" : "#7a2e3b"}
                    className="cursor-pointer"
                    initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.8 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setActive(spot)}
                    onFocus={() => setActive(spot)}
                    onClick={() => setActive(spot)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isActive}
                    aria-label={`${spot.place}, ${spot.country}`}
                  />
                  <text
                    x={x + 10}
                    y={y - 10}
                    className="text-xs font-medium text-foreground drop-shadow-sm"
                  >
                    {spot.place}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div className="space-y-4">
        {spots.map((spot) => {
          const isActive = active?.id === spot.id;
          return (
            <button
              key={spot.id}
              onMouseEnter={() => setActive(spot)}
              onFocus={() => setActive(spot)}
              onClick={() => setActive(spot)}
              className="w-full text-left"
            >
              <Card
                className={
                  isActive
                    ? "border-secondary/60 bg-secondary/10 text-foreground"
                    : "bg-card"
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
      </div>
    </div>
  );
}

