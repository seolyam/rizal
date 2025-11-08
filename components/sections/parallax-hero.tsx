"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePreferencesStore } from "@/stores/preferences-store";
import { inkReveal, staggerChildren } from "@/lib/motion";
import type { TourStep } from "@/lib/tour";

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
  tourSteps?: TourStep[];
  heroImage?: {
    src: string;
    alt: string;
    caption?: string;
    credit?: string;
    width?: number;
    height?: number;
  };
};

export function ParallaxHero({
  eyebrow,
  title,
  highlightedText,
  description,
  primaryCta,
  secondaryCta,
  tourSteps,
  heroImage,
}: ParallaxHeroProps) {
  const { prefersReducedMotion } = usePreferencesStore();
  const hasTour = Array.isArray(tourSteps) && tourSteps.length > 0;
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = hasTour ? tourSteps[stepIndex] : null;
  const progress = hasTour ? ((stepIndex + 1) / tourSteps.length) * 100 : 0;

  const gradients = useMemo(
    () => [
      "radial-gradient(circle at 20% 20%, rgba(122, 46, 59, 0.28), transparent 55%)",
      "radial-gradient(circle at 80% 10%, rgba(59, 128, 112, 0.25), transparent 55%)",
      "radial-gradient(circle at 50% 80%, rgba(239, 211, 162, 0.35), transparent 55%)",
    ],
    []
  );

  const handleNext = () => {
    if (!tourSteps) return;
    setStepIndex((prev) => (prev + 1) % tourSteps.length);
  };

  const handlePrev = () => {
    if (!tourSteps) return;
    setStepIndex((prev) => {
      if (prev === 0) {
        return tourSteps.length - 1;
      }
      return prev - 1;
    });
  };

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

      <div className="px-8 py-16 md:px-14 md:py-20 lg:px-20 lg:py-24">
        <motion.div
          className={`mx-auto flex max-w-6xl flex-col gap-10 ${heroImage ? "lg:grid lg:grid-cols-[1.05fr,0.95fr] lg:items-center lg:gap-16" : ""}`}
          variants={prefersReducedMotion ? undefined : staggerChildren}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "show"}
        >
          {hasTour && currentStep ? (
            <motion.div
              variants={prefersReducedMotion ? undefined : inkReveal}
              className="space-y-8 text-center"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-primary">
                  Tour {stepIndex + 1} of {tourSteps?.length}
                </span>
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-4 text-xs uppercase tracking-[0.3em]"
                    onClick={handlePrev}
                    type="button"
                  >
                    Prev
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 px-4 text-xs uppercase tracking-[0.3em]"
                    onClick={handleNext}
                    type="button"
                  >
                    Next
                  </Button>
                </div>
              </div>
              <div className="mt-5 flex w-full flex-col gap-5 text-center">
                <motion.h1
                  variants={prefersReducedMotion ? undefined : inkReveal}
                  className="text-balance font-serif text-4xl leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
                >
                  {title}
                  {highlightedText ? (
                    <>
                      <span className="block text-primary">
                        {highlightedText}
                      </span>
                    </>
                  ) : null}
                </motion.h1>
                <motion.p
                  variants={prefersReducedMotion ? undefined : inkReveal}
                  className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
                >
                  {description}
                </motion.p>
                <div className="flex flex-wrap justify-center gap-4">
                  {primaryCta ? (
                    <Button
                      asChild
                      size="default"
                      className="shadow-lg shadow-primary/20"
                    >
                      <Link href={primaryCta.href}>{primaryCta.label}</Link>
                    </Button>
                  ) : null}
                  {secondaryCta ? (
                    <Button
                      variant="secondary"
                      asChild
                      className="border-primary/40 bg-primary/10"
                    >
                      <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                    </Button>
                  ) : null}
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary px-8 py-6 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
                  >
                    <Link href={`${currentStep.href}?tour=1`}>
                      Explore {currentStep.label}
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-border/60">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-6 space-y-3 text-center">
                <h3 className="font-serif text-2xl font-semibold text-foreground">
                  {currentStep.label}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {currentStep.description}
                </p>
              </div>
            </motion.div>
          ) : (
            <>
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
            </>
          )}

          {heroImage ? (
            <motion.div
              variants={prefersReducedMotion ? undefined : inkReveal}
              className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
            >
              <div className="relative overflow-hidden rounded-[36px] border border-border/60 bg-card shadow-2xl shadow-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/10 mix-blend-soft-light" />
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  width={heroImage.width ?? 768}
                  height={heroImage.height ?? 960}
                  priority
                  className="relative z-10 h-full w-full object-cover object-top"
                />
                {heroImage.caption || heroImage.credit ? (
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-background/90 via-background/30 to-transparent p-6 text-sm text-muted-foreground">
                    {heroImage.caption ? (
                      <p className="font-medium text-foreground">{heroImage.caption}</p>
                    ) : null}
                    {heroImage.credit ? (
                      <p className="mt-1 text-xs uppercase tracking-[0.3em]">{heroImage.credit}</p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </motion.div>
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
