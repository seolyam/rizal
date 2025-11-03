import { feature } from "topojson-client";
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldData from "world-atlas/countries-110m.json" assert { type: "json" };

type WorldAtlas = Topology<{ countries: GeometryCollection }>;

const worldTopology = worldData as unknown as WorldAtlas;

const worldFeatureCollection = feature(
  worldTopology,
  worldTopology.objects.countries,
) as FeatureCollection<Polygon | MultiPolygon>;

export const worldFeatures = worldFeatureCollection.features as Feature<
  Polygon | MultiPolygon
>[];
