import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3 text-center", className)}>
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
