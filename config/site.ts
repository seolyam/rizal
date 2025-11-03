export const siteConfig = {
  name: "dYZ · Jose Rizal Interactive Tribute",
  description:
    "An immersive, research-informed exploration of José Rizal’s life, works, travels, and enduring legacy.",
  nav: [
    { href: "/timeline", label: "Timeline" },
    { href: "/travels", label: "Travels" },
    { href: "/works", label: "Works" },
    { href: "/ideas", label: "Ideas" },
    { href: "/quiz", label: "Quiz" },
    { href: "/gallery", label: "Gallery" },
    { href: "/legacy", label: "Legacy" },
    { href: "/sources", label: "Sources" },
  ],
  social: {
    email: "hello@rizaltribute.ph",
  },
} as const;

export type SiteConfig = typeof siteConfig;
