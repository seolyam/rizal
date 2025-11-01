"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default:
    "inline-flex items-center rounded-full border border-border/60 bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wide text-accent-foreground",
  outline:
    "inline-flex items-center rounded-full border border-border/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants[variant], className)}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";
