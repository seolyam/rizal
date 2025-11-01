import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background/80">
      <div className="container flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-serif text-xl font-semibold text-foreground">
            {siteConfig.name}
          </p>
          <p className="max-w-xl text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-secondary">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
