import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Callout } from "@/components/mdx/callout";
import { Cite } from "@/components/mdx/cite";
import { cn } from "@/lib/utils";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-12 font-serif text-3xl font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-10 font-serif text-2xl font-semibold tracking-tight text-foreground/90"
      {...props}
    />
  ),
  p: (props) => <p className="mt-4 leading-relaxed text-muted-foreground" {...props} />,
  ul: (props) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground" {...props} />
  ),
  ol: (props) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: ({ className, ...props }) => (
    <Link
      className={cn(
        "font-medium text-secondary underline-offset-4 transition hover:text-secondary/80 hover:underline",
        className,
      )}
      {...props}
    />
  ),
  Callout,
  Cite,
};
