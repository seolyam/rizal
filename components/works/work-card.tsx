"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { WorkSummary } from "@/lib/schemas";

type WorkCardProps = {
  work: WorkSummary;
  index?: number;
};

function renderParagraphs(text: string) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, idx) => (
      <p key={idx} className="leading-relaxed text-muted-foreground">
        {paragraph}
      </p>
    ));
}

function renderList(items: string[], id: string) {
  if (!items.length) return null;
  return (
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li
          key={`${id}-${idx}`}
          className="flex items-start gap-3 text-sm text-muted-foreground"
        >
          <Sparkles className="mt-1 h-4 w-4 text-secondary" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function WorkCard({ work, index = 0 }: WorkCardProps) {
  const details = work.details ?? {};
  const primarySummary = details.summary ?? work.summary ?? work.excerpt;
  const description = work.excerpt || work.summary || details.summary || "";
  const majorThemes = details.majorThemes ?? [];
  const structure = details.structure ?? [];
  const characters = details.characters ?? [];
  const quotes = details.quotes ?? [];
  const historicalImpact = details.historicalImpact;
  const sources = details.sources ?? [];
  const tags = work.tags ?? [];

  return (
    <Dialog>
      <motion.div
        variants={fadeUp}
        transition={{ delay: index * 0.06 }}
        className="h-full"
      >
        <Card className="group flex h-full flex-col overflow-hidden border-border/70 bg-card/90 transition hover:border-secondary/50 hover:shadow-soft">
          <DialogTrigger asChild>
            <button
              type="button"
              className="flex flex-1 flex-col gap-6 px-6 pb-6 pt-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={`Open details for ${work.title}`}
            >
              <CardHeader className="space-y-4 p-0">
                <div className="flex justify-end">
                  <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                    {work.year}
                  </span>
                </div>
                <CardTitle className="text-2xl leading-tight text-foreground transition group-hover:text-secondary">
                  {work.title}
                </CardTitle>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </CardHeader>

              <CardContent className="mt-auto flex flex-wrap items-center gap-2 p-0">
                {tags.map((tag) => (
                  <Badge key={`${work.title}-tag-${tag}`} variant="secondary" className="rounded-full px-3 py-1 text-xs">
                    {tag}
                  </Badge>
                ))}
              </CardContent>

              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-secondary">
                <BookOpen className="h-4 w-4" aria-hidden />
                Open details
              </div>
            </button>
          </DialogTrigger>
        </Card>
      </motion.div>

      <DialogContent className="max-h-[90vh] md:[&>div:first-child]:max-w-[80vw] md:[&>div:first-child]:w-[80vw] [&>div:first-child]:max-h-[85vh]">
        <DialogHeader className="mb-0 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="gap-2 px-3 py-1 text-sm">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back
              </Button>
            </DialogClose>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {work.year}
            </span>
          </div>
          <DialogTitle className="font-serif text-3xl font-semibold text-foreground">
            {work.title}
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4 lg:pr-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)]">
            <div className="space-y-8">
              <section className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80">
                  Overview
                </h3>
                {primarySummary ? (
                  <div className="space-y-3 text-sm">{renderParagraphs(primarySummary)}</div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    A detailed summary for this work will be added soon.
                  </p>
                )}
              </section>

              {majorThemes.length > 0 && (
                <section className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80">
                    Major Themes
                  </h3>
                  {renderList(majorThemes, "themes")}
                </section>
              )}

              {structure.length > 0 && (
                <section className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80">
                    Structure
                  </h3>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    {structure.map((item, idx) => (
                      <li key={`structure-${idx}`} className="flex gap-3">
                        <span className="font-mono text-xs font-semibold text-secondary">{idx + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {characters.length > 0 && (
                <section className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80">
                    Key Characters
                  </h3>
                  {renderList(characters, "characters")}
                </section>
              )}

              {historicalImpact && (
                <section className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80">
                    Historical Impact
                  </h3>
                  <div className="space-y-3 text-sm">
                    {renderParagraphs(historicalImpact)}
                  </div>
                </section>
              )}

              {quotes.length > 0 && (
                <section className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80">
                    Notable Quotes
                  </h3>
                  <ul className="space-y-4">
                    {quotes.map((quote, idx) => (
                      <li
                        key={`quote-${idx}`}
                        className="rounded-2xl border border-border/60 bg-muted/30 p-4"
                      >
                        <p className="font-serif text-base text-foreground">
                          &ldquo;{quote}&rdquo;
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-border/60 bg-card/70 p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  Work Details
                </h3>
                <dl className="mt-4 space-y-4 text-sm">
                  {(details.genre || work.type) && (
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Genre
                      </dt>
                      <dd className="mt-1 text-foreground">{details.genre ?? work.type}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      Published
                    </dt>
                    <dd className="mt-1 text-foreground">{work.year}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      Type
                    </dt>
                    <dd className="mt-1 text-foreground">{work.type}</dd>
                  </div>
                  {work.readingTime ? (
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Reading time
                      </dt>
                      <dd className="mt-1 text-foreground">{work.readingTime} minutes</dd>
                    </div>
                  ) : null}
                  {tags.length > 0 && (
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Tags
                      </dt>
                      <dd className="mt-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {tags.map((tag) => (
                            <Badge key={`${work.title}-aside-tag-${tag}`} variant="secondary" className="rounded-full px-3 py-1 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {sources.length > 0 && (
                <div className="rounded-2xl border border-border/60 bg-card/70 p-6">
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    Sources & References
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm">
                    {sources.map((source, idx) => (
                      <li key={`${work.title}-source-${idx}`} className="leading-tight">
                        <p className="font-medium text-foreground">
                          {source.title}
                          {source.author ? (
                            <span className="font-normal text-muted-foreground">
                              {", "}
                              {source.author}
                            </span>
                          ) : null}
                        </p>
                        {source.url ? (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-secondary underline-offset-4 hover:underline"
                          >
                            View source
                          </a>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
