"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { WorkCard } from "@/components/works/work-card";
import type { WorkSummary } from "@/lib/schemas";

function normalize(value: string) {
  return value.toLowerCase();
}

export function WorksExplorer({ works }: { works: WorkSummary[] }) {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("all");

  const types = useMemo(() => {
    const set = new Set<string>();
    works.forEach((work) => set.add(work.type));
    return Array.from(set.values());
  }, [works]);

  const filtered = useMemo(() => {
    return works.filter((work) => {
      const matchesType = activeType === "all" || work.type === activeType;
      const matchesQuery = normalize(work.title).includes(normalize(query)) ||
        normalize(work.excerpt).includes(normalize(query));
      return matchesType && matchesQuery;
    });
  }, [works, activeType, query]);

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
          <WorkCard key={work.slug} work={work} index={index} />
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

