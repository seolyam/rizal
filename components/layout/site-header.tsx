"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { MotionToggle } from "@/components/theme/motion-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-serif text-lg font-semibold text-primary">
            dYZ
          </span>
          <div className="hidden flex-col lg:flex">
            <span className="font-serif text-lg font-semibold text-foreground">
              Rizal Interactive
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Stories · Scholarship · Civic Action
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 transition hover:bg-accent/70 hover:text-foreground",
                pathname === item.href && "bg-secondary/20 text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <MotionToggle />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-4 flex flex-col gap-4">
                {siteConfig.nav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-2xl px-4 py-3 text-lg font-semibold text-muted-foreground transition hover:bg-accent/80 hover:text-foreground",
                        pathname === item.href && "bg-secondary/20 text-secondary-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
