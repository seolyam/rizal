import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PreferenceProvider } from "@/components/providers/preference-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { fraunces, inter, mono } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const siteName = "dYZ · Jose Rizal Interactive Tribute";
const siteDescription =
  "A creative, accessible, and research-backed celebration of Dr. José Rizal—his life, works, travels, and legacy—through interactive storytelling.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rizal-tribute.local"),
  title: {
    default: siteName,
    template: "%s · Rizal Interactive Tribute",
  },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: "https://rizal-tribute.local",
    siteName,
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rizaltribute",
    title: siteName,
    description: siteDescription,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7e8d4" },
    { media: "(prefers-color-scheme: dark)", color: "#1f1914" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(fraunces.variable, inter.variable, mono.variable)}
    >
      <body className={cn("min-h-screen bg-background font-sans text-base")}>
        <ThemeProvider>
          <PreferenceProvider>
            <div className="grain">
              <div className="pointer-events-none fixed inset-0 -z-10 bg-grain-light opacity-60 mix-blend-soft-light" />
            </div>
            <div className="relative flex min-h-screen flex-col">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-secondary focus:px-4 focus:py-2 focus:text-secondary-foreground"
              >
                Skip to main content
              </a>
              <SiteHeader />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <SiteFooter />
            </div>
          </PreferenceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
