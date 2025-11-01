import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const toneStyles: Record<string, string> = {
  sand: "bg-sand/80 text-foreground border border-border/70",
  teal: "bg-info/20 text-info-foreground border border-info/50",
  burgundy: "bg-highlight/15 text-highlight border border-highlight/40",
};

type CalloutProps = {
  tone?: "sand" | "teal" | "burgundy";
  title?: string;
  children: ReactNode;
};

export function Callout({ tone = "sand", title, children }: CalloutProps) {
  return (
    <div
      className={cn(
        "rounded-3xl px-6 py-4 text-sm leading-relaxed shadow-soft/20",
        toneStyles[tone] ?? toneStyles.sand,
      )}
    >
      {title ? (
        <p className="mb-2 font-serif text-lg font-semibold">{title}</p>
      ) : null}
      <div className="[&>p:not(:last-child)]:mb-3">{children}</div>
    </div>
  );
}
