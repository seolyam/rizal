import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Idea, WorkSummary } from "@/lib/schemas";
import Link from "next/link";

export function IdeasGrid({ ideas, works }: { ideas: Idea[]; works: WorkSummary[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {ideas.map((idea) => {
        const related = works.filter((work) => idea.related.includes(work.slug));
        return (
          <Card key={idea.id} className="space-y-4 border-border/60 bg-card/80">
            <div className="flex items-center justify-between">
              <Badge variant="outline">{idea.category}</Badge>
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground">
              {idea.term}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {idea.definition}
            </p>
            {related.length ? (
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Related readings
                </p>
                <ul className="space-y-1 text-sm text-secondary">
                  {related.map((work) => (
                    <li key={work.slug}>
                      <Link href={`/works/${work.slug}`} className="hover:underline">
                        {work.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}
