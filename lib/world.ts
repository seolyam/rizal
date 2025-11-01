import { feature } from "topojson-client";
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";
import worldData from "world-atlas/countries-110m.json" assert { type: "json" };

const worldFeatureCollection = feature(
  worldData as any,
  (worldData as any).objects.countries,
) as unknown as FeatureCollection<Polygon | MultiPolygon>;

export const worldFeatures = worldFeatureCollection
  .features as Feature<Polygon | MultiPolygon>[];

