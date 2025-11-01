"use client";

import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-full bg-gradient-to-r from-muted via-accent to-muted",
        className,
      )}
      {...props}
    />
  );
}
