"use client";

import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type MotionSectionProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  once?: boolean;
};

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function MotionSection({
  children,
  className,
  variants = defaultVariants,
  once = true,
}: MotionSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.2, once });

  return (
    <motion.section
      ref={(node) => {
        ref.current = node;
      }}
      className={cn("relative", className)}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.section>
  );
}
