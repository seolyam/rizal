"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { WorkCard } from "@/components/works/work-card";
import type { WorkSummary } from "@/lib/schemas";

function normalize(value: string) {
  return value.toLowerCase();
}

function matchesQuery(value: string | undefined | null, query: string) {
  if (!value) return false;
  return normalize(value).includes(query);
}

export function WorksExplorer({ works }: { works: WorkSummary[] }) {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("all");

  const normalizedQuery = normalize(query.trim());

  const types = useMemo(() => {
    const set = new Set<string>();
    works.forEach((work) => set.add(work.type));
    return Array.from(set.values()).sort();
  }, [works]);

  const filtered = useMemo(() => {
    return works.filter((work) => {
      const matchesType = activeType === "all" || work.type === activeType;
      if (!matchesType) return false;

      if (normalizedQuery.length === 0) {
        return true;
      }

      const haystack: (string | undefined)[] = [
        work.title,
        work.excerpt,
        work.summary,
        work.details?.summary,
        work.details?.historicalImpact,
        work.details?.genre,
        ...work.tags,
        ...(work.details?.majorThemes ?? []),
        ...(work.details?.structure ?? []),
        ...(work.details?.characters ?? []),
        ...(work.details?.quotes ?? []),
      ];

      return haystack.some((value) => matchesQuery(value, normalizedQuery));
    });
  }, [works, activeType, normalizedQuery]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Tabs value={activeType} onValueChange={setActiveType} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {types.map((type) => (
              <TabsTrigger key={type} value={type}>
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="md:w-64">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search works"
            aria-label="Search works"
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((work, index) => (
          <WorkCard key={`${work.title}-${work.year}`} work={work} index={index} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="rounded-3xl border border-border/60 bg-background/70 p-6 text-sm text-muted-foreground">
          No works matched your filters. Try adjusting the type or search keywords.
        </p>
      ) : null}
    </div>
  );
}
