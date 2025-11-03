"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { usePreferencesStore } from "@/stores/preferences-store";
import { inkReveal, staggerChildren } from "@/lib/motion";

type HeroCTA = {
  label: string;
  href: Route;
};

type ParallaxHeroProps = {
  eyebrow?: string;
  title: string;
  highlightedText?: string;
  description: string;
  primaryCta?: HeroCTA;
  secondaryCta?: HeroCTA;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export function ParallaxHero({
  eyebrow,
  title,
  highlightedText,
  description,
  primaryCta,
  secondaryCta,
  image,
}: ParallaxHeroProps) {
  const { prefersReducedMotion } = usePreferencesStore();
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -180],
  );

  const gradients = useMemo(
    () => [
      "radial-gradient(circle at 20% 20%, rgba(122, 46, 59, 0.28), transparent 55%)",
      "radial-gradient(circle at 80% 10%, rgba(59, 128, 112, 0.25), transparent 55%)",
      "radial-gradient(circle at 50% 80%, rgba(239, 211, 162, 0.35), transparent 55%)",
    ],
    [],
  );

  return (
    <section className="relative overflow-hidden rounded-[48px] border border-border/60 paper-surface ink-outline candle-glow shadow-soft">
      <div className="absolute inset-0 -z-10 opacity-80">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: gradients.join(", "),
          }}
        />
        <div className="absolute inset-0 bg-grain-light opacity-50 mix-blend-soft-light" />
      </div>

      {!prefersReducedMotion ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/4 hidden h-72 w-72 rounded-full bg-secondary/15 blur-3xl lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      ) : null}

      <div className="grid gap-16 px-8 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:px-14 md:py-20 lg:px-20 lg:py-24">
        <motion.div
          className="space-y-8"
          variants={prefersReducedMotion ? undefined : staggerChildren}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "show"}
        >
          {eyebrow ? (
            <motion.span
              variants={prefersReducedMotion ? undefined : inkReveal}
              className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-primary"
            >
              {eyebrow}
            </motion.span>
          ) : null}
          <motion.h1
            variants={prefersReducedMotion ? undefined : inkReveal}
            className="text-balance font-serif text-4xl leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            {title}
            {highlightedText ? (
              <>
                <br />
                <span className="text-primary">{highlightedText}</span>
              </>
            ) : null}
          </motion.h1>
          <motion.p
            variants={prefersReducedMotion ? undefined : inkReveal}
            className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {description}
          </motion.p>

          <motion.div
            variants={prefersReducedMotion ? undefined : inkReveal}
            className="flex flex-wrap items-center gap-4"
          >
            {primaryCta ? (
              <Button asChild size="default" className="shadow-lg shadow-primary/20">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button variant="secondary" asChild className="border-primary/40 bg-primary/10">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </motion.div>
        </motion.div>

        <div className="relative flex items-center justify-center">
          {!prefersReducedMotion ? (
            <motion.span
              aria-hidden
              className="absolute -top-12 right-8 h-28 w-28 rounded-full border border-primary/20"
              animate={{ rotate: [0, 6, -4, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : null}

          {image ? (
            <motion.div
              style={{ y: parallaxY }}
              className="relative max-w-[420px]"
              variants={prefersReducedMotion ? undefined : inkReveal}
              initial={prefersReducedMotion ? undefined : "hidden"}
              animate={prefersReducedMotion ? undefined : "show"}
            >
              <div className="grain-overlay vignette-soft relative rounded-[40px] border border-primary/30 bg-parchment shadow-soft">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full rounded-[36px] border border-primary/40 object-cover"
                  priority
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              style={{ y: parallaxY }}
              className="grain-overlay relative flex h-[340px] w-full max-w-[420px] items-center justify-center rounded-[40px] border border-primary/30 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent shadow-soft"
            >
              <svg
                className="h-32 w-32 text-primary/60"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M48 32h160l-16 32H64L48 32zm40 48h80l24 96H64l24-96zm-16 112h112v32H72v-32z"
                  fill="currentColor"
                  opacity="0.5"
                />
                <path
                  d="M128 80c53.02 0 96 26.86 96 60s-42.98 60-96 60-96-26.86-96-60 42.98-60 96-60zm0 16c-44.18 0-80 19.94-80 44s35.82 44 80 44 80-19.94 80-44-35.82-44-80-44z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
          )}
        </div>
      </div>

      {!prefersReducedMotion ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/60 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
        />
      ) : null}
    </section>
  );
}
