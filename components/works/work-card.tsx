"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { WorkSummary } from "@/lib/schemas";
import { fadeUp } from "@/lib/motion";

type WorkCardProps = {
  work: WorkSummary;
  index: number;
};

export function WorkCard({ work, index }: WorkCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay: index * 0.08 }}
      className="h-full"
    >
      <Card className="h-full border-border/70 bg-card/90">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <Badge variant="outline">{work.type}</Badge>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {work.year}
            </span>
          </div>
          <CardTitle className="text-2xl leading-snug">{work.title}</CardTitle>
          <CardDescription>{work.excerpt}</CardDescription>
        </CardHeader>
        <CardContent className="mt-6 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {work.tags.map((tag) => (
              <Badge variant="default" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
          <Link
            href={`/works/${work.slug}`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-secondary/80"
          >
            Read
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
