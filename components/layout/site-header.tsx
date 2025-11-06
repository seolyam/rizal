"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-primary/15 font-serif text-2xl font-semibold tracking-[0.3em] text-primary transition group-hover:scale-105">
            R
          </span>
          <div className="hidden flex-col sm:flex">
            <span className="font-serif text-xl font-semibold text-foreground transition group-hover:text-primary">
              Rizal
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Archive of Lives
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full border border-border/60 px-2.5 py-2"
                aria-label="Open navigation menu"
              >
                <Menu className="h-4 w-4" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[360px]">
              <VisuallyHidden>
                <SheetTitle>Main navigation menu</SheetTitle>
              </VisuallyHidden>
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/15 font-serif text-lg font-semibold tracking-[0.25em] text-primary">
                      R
                    </span>
                    <div className="flex flex-col">
                      <span className="font-serif text-lg font-semibold text-foreground">Rizal</span>
                      <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                        Study Journal
                      </span>
                    </div>
                  </Link>
                </div>

                <nav className="space-y-3">
                  {siteConfig.nav.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-base font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground",
                          pathname === item.href && "border-primary/50 bg-primary/10 text-foreground",
                        )}
                      >
                        <span>{item.label}</span>
                        <span aria-hidden className="text-xs uppercase tracking-[0.3em] text-border/80">
                          Go
                        </span>
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="rounded-2xl border border-border/60 bg-card/70 p-4 text-xs leading-relaxed text-muted-foreground">
                  Tip: Explore the timeline and travels sections to trace how Rizal’s journeys shaped his
                  reformist ideas.
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
