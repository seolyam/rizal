import type { ReactNode } from "react";

type CiteProps = {
  children: ReactNode;
  source?: string;
};

export function Cite({ children, source }: CiteProps) {
  return (
    <figure className="my-6 border-l-4 border-primary/60 pl-6">
      <blockquote className="font-serif text-lg italic leading-relaxed text-primary">
        {children}
      </blockquote>
      {source ? (
        <figcaption className="mt-2 text-sm uppercase tracking-wide text-muted-foreground">
          {source}
        </figcaption>
      ) : null}
    </figure>
  );
}
