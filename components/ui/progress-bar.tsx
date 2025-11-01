"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  progress: number;
  label?: string;
  className?: string;
};

export function ProgressBar({ progress, label, className }: ProgressBarProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);
  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </p>
      ) : null}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${safeProgress}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-secondary"
        />
      </div>
    </div>
  );
}
