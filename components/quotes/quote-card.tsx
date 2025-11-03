"use client";

import { motion } from "framer-motion";
import { Shuffle, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Quote } from "@/lib/schemas";

type QuoteCardProps = {
  quotes: Quote[];
};

export function QuoteCard({ quotes }: QuoteCardProps) {
  const [index, setIndex] = useState(0);

  if (!quotes.length) {
    return null;
  }

  const active = quotes[index];

  const shuffleQuote = () => {
    const next = Math.floor(Math.random() * quotes.length);
    setIndex(next);
  };

  const copyQuote = async () => {
    try {
      await navigator.clipboard.writeText(
        `"${active.quote}" — ${active.source}${active.year ? ` (${active.year})` : ""}`,
      );
    } catch (error) {
      console.error("Failed to copy quote", error);
    }
  };

  return (
    <Card className="relative overflow-hidden border-border/60 bg-card/80 p-8">
      <motion.blockquote
        key={active.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif text-2xl leading-relaxed text-foreground md:text-3xl"
      >
        “{active.quote}”
      </motion.blockquote>
      <p className="mt-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">
        {active.source}
        {active.year ? ` • ${active.year}` : ""}
      </p>
      <div className="mt-6 flex gap-3">
        <Button variant="secondary" size="sm" onClick={shuffleQuote}>
          <Shuffle className="mr-2 h-4 w-4" aria-hidden />
          Shuffle
        </Button>
        <Button variant="ghost" size="sm" onClick={copyQuote}>
          <Copy className="mr-2 h-4 w-4" aria-hidden />
          Copy
        </Button>
      </div>
    </Card>
  );
}
