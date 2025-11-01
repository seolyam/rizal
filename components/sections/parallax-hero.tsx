"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { usePreferencesStore } from "@/stores/preferences-store";

type HeroCTA = {
  label: string;
  href: string;
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
    <section className="relative overflow-hidden rounded-[44px] border border-border/50 bg-gradient-to-br from-sepia via-background to-sand shadow-soft">
      <div className="absolute inset-0 -z-10">
        <div
          className="h-full w-full opacity-90"
          style={{
            backgroundImage: gradients.join(", "),
          }}
        />
        <div className="absolute inset-0 bg-grain-light opacity-40 mix-blend-soft-light" />
      </div>

      <div className="grid gap-12 px-8 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:px-12 md:py-20 lg:px-16 lg:py-24">
        <div className="space-y-6">
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="text-balance font-serif text-4xl leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
            {highlightedText ? (
              <>
                <br />
                <span className="text-primary">{highlightedText}</span>
              </>
            ) : null}
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {primaryCta ? (
              <Button asChild size="default">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button variant="secondary" asChild>
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          {image ? (
            <motion.div style={{ y: parallaxY }} className="relative">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full max-w-[420px] rounded-[36px] border border-primary/30 object-cover shadow-soft"
                priority
              />
            </motion.div>
          ) : (
            <motion.div
              style={{ y: parallaxY }}
              className="relative flex h-[320px] w-full max-w-[420px] items-center justify-center rounded-[36px] border border-primary/30 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent shadow-soft"
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
    </section>
  );
}
