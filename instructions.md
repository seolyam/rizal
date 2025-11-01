# 🎓 Jose Rizal Tribute Website — Full Technical Documentation

**Stack**: Next.js (App Router) • TypeScript • Tailwind CSS • shadcn/ui • Framer Motion • MDX • Zustand • (Optional) React Three Fiber • (Optional) Lottie • (Optional) FlexSearch • ESLint/Prettier/Vitest/Playwright • Vercel

> Goal: Build a **creative, performant, and accessible** website that celebrates Dr. José Rizal—his life, works, ideas, travels, and legacy—through **interactive storytelling** and **polished animations** without using a backend database.

---

## 1) Product Overview

### 1.1 Objectives

- Present Rizal’s **biography**, **major works**, **timeline**, **travels**, and **influence** via immersive sections.
- Provide **student‑friendly visualizations** (maps, timeline, quotes, glossary) and **interactive activities** (quiz, flashcards).
- Showcase **primary sources** (letters/excerpts) and **responsible citations**.
- Prioritize **speed, accessibility (WCAG 2.2 AA)**, SEO, and high design polish.

### 1.2 Audience

- College students taking **Rizal** subject.
- Teachers and history enthusiasts.

### 1.3 Experience Highlights

- **Parallax hero** with animated headline and subtle grain texture.
- **Scroll‑choreographed timeline** of Rizal’s life (birth → education → travels → works → exile → martyrdom → legacy).
- **Interactive world map** of his travels (hover/click pins to reveal dates, artifacts, anecdotes).
- **Works explorer** (Noli, Fili, essays) with filters, quotes, and rich details.
- **Quote generator** (shuffle, copy, shareable link).
- **Micro‑interactions** everywhere (hover states, entrance reveals, magnetic buttons, animated separators).
- **Optional 3D**: low‑poly monument or feather pen idle animation in hero using React Three Fiber (non‑blocking).

---

## 2) Information Architecture

### 2.1 Routes (App Router)

- `/` — **Home** (hero, quick sections, CTA to Explore)
- `/timeline` — **Interactive Timeline**
- `/travels` — **Map & Itineraries**
- `/works` — **Works Explorer** (books, essays, letters)
- `/works/[slug]` — **Work Detail** (MDX)
- `/ideas` — **Themes & Philosophy** (glossary, cards)
- `/quiz` — **Knowledge Check** (no auth, local storage)
- `/gallery` — **Media & Artifacts**
- `/about` — **About the Project**
- `/sources` — **Citations & Further Reading**

### 2.2 Content Model

- **MDX** for long‑form pages (works, essays, about) with custom components.
- **JSON** for structured data (timeline events, travels, quotes).
- **Images** optimized via `next/image`.

```
/content
  /works/*.mdx         # long-form content per work
  /pages/*.mdx         # about, ideas sections, etc.
/data
  timeline.json        # { id, year, date?, title, summary, media?, tags[] }
  travels.json         # { id, place, country, lat, lng, dateRange, story }
  quotes.json          # { id, quote, source, year? }
  works.json           # { slug, title, year, type, tags[], excerpt }
```

---

## 3) Design System

### 3.1 Visual Language

- **Palette**: Sepia sand, warm black, off‑white, muted teal, burgundy accents (evokes archival paper).
- **Typography**: Heading — _Fraunces_ or _Playfair Display_; Body — _Inter_ or _Source Sans 3_ (use `next/font/google`).
- **Texture**: Subtle grain/noise background; thin rules; delicate drop shadows.
- **Iconography**: `lucide-react` (feather, book, map, quote, timeline).

### 3.2 Components (shadcn/ui)

- Button, Card, Accordion, Dialog, Drawer, Tooltip, Separator, Tabs, Badge, Input, Textarea, Select, Sheet, ScrollArea, Skeleton.
- Extend with **custom components**: `ParallaxHero`, `MotionSection`, `Timeline`, `Map`, `WorkCard`, `QuoteCard`, `Quiz`.

### 3.3 Motion Guidelines

- **Framer Motion** variants: “fadeUp”, “stagger”, “scaleIn”, “tiltHover”.
- **Scroll‑linked effects** using `useScroll` + `useTransform` for parallax & progress.
- Keep **duration 0.4–0.7s**, **ease [0.16, 1, 0.3, 1]**, **no janky animations**.
- Respect **prefers‑reduced‑motion**; disable non‑essential motion.

---

## 4) Tech Choices & Rationale

- **Next.js App Router**: file‑based routing, metadata API, image optimization, automatic code‑splitting.
- **TypeScript**: safety for content schemas and components.
- **Tailwind**: fast styling, design tokens, dark mode with class strategy.
- **shadcn/ui**: accessible primitives, consistent design, good DX.
- **Framer Motion**: robust animations/effects.
- **MDX**: rich content with React components inside.
- **Zustand**: tiny, flexible global store (theme, quiz state, UI prefs).
- **Optional**: FlexSearch/Lunr for client‑side search index of works/quotes.

---

## 5) Project Setup

### 5.1 Initialize

```bash
pnpm create next-app rizal-tribute --ts --app --eslint --tailwind --src-dir --import-alias "@/*"
cd rizal-tribute
pnpm add framer-motion class-variance-authority clsx tailwind-merge lucide-react zustand next-mdx-remote remark-gfm
# shadcn/ui
pnpm dlx shadcn-ui@latest init
pnpm dlx shadcn-ui@latest add button card accordion dialog drawer tooltip separator tabs badge input textarea select sheet scroll-area skeleton
# optional search & maps
pnpm add flexsearch
# optional 3D & lottie (pick one or both later)
pnpm add @react-three/fiber @react-three/drei three lottie-react
```

### 5.2 Tailwind Config

- Enable **container**, **custom colors**, **typography** plugin (optional).
- Set `darkMode: 'class'`.

### 5.3 Fonts

```ts
// app/fonts.ts
import { Inter, Playfair_Display } from "next/font/google";
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
```

### 5.4 Global Layout Skeleton

```tsx
// app/layout.tsx
import "./globals.css";
import { inter, playfair } from "./fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"; // if using sonner

export const metadata = {
  title: "Jose Rizal — Interactive Tribute",
  description: "A creative, educational tribute to Dr. José Rizal.",
  metadataBase: new URL("https://rizal.example.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          {/* <Toaster /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 6) Data & Schema

### 6.1 Zod Schemas (type‑safe data ingestion)

```ts
// lib/schemas.ts
import { z } from "zod";

export const TimelineEvent = z.object({
  id: z.string(),
  year: z.number(),
  date: z.string().optional(),
  title: z.string(),
  summary: z.string(),
  media: z.string().url().optional(),
  tags: z.array(z.string()).default([]),
});
export type TimelineEvent = z.infer<typeof TimelineEvent>;

export const TravelStop = z.object({
  id: z.string(),
  place: z.string(),
  country: z.string(),
  lat: z.number(),
  lng: z.number(),
  dateRange: z.string(),
  story: z.string(),
});
export type TravelStop = z.infer<typeof TravelStop>;

export const Quote = z.object({
  id: z.string(),
  quote: z.string(),
  source: z.string(),
  year: z.number().optional(),
});
export type Quote = z.infer<typeof Quote>;

export const WorkMeta = z.object({
  slug: z.string(),
  title: z.string(),
  year: z.number().optional(),
  type: z.enum(["Novel", "Essay", "Poem", "Letter", "Speech", "Other"]),
  tags: z.array(z.string()).default([]),
  excerpt: z.string(),
});
export type WorkMeta = z.infer<typeof WorkMeta>;
```

### 6.2 Loading Data

```ts
// lib/loaders.ts
import timeline from "@/data/timeline.json";
import travels from "@/data/travels.json";
import quotes from "@/data/quotes.json";
import works from "@/data/works.json";
import { TimelineEvent, TravelStop, Quote, WorkMeta } from "./schemas";

export const getTimeline = () => TimelineEvent.array().parse(timeline);
export const getTravels = () => TravelStop.array().parse(travels);
export const getQuotes = () => Quote.array().parse(quotes);
export const getWorks = () => WorkMeta.array().parse(works);
```

---

## 7) Core UI Components

> All motion components follow Framer Motion **variants** and accept `className` for Tailwind styles.

### 7.1 `ParallaxHero`

- Animated headline/subtitle; parallax background; CTA buttons.
- Props: `title`, `subtitle`, `ctas: {label, href}[]`.

### 7.2 `Timeline`

- Vertical (mobile) → split two‑column (desktop).
- Scroll progress spine; year markers; reveal on view.

### 7.3 `Map`

- Minimal world map SVG with **interactive pins** (no API key). Use a **static SVG** path or a lightweight map lib.
- Tooltip on hover; modal on click.

### 7.4 `WorkCard` & `WorkDetail`

- Card grid with filters; MDX detail page with footnotes, callouts.

### 7.5 `QuoteCard`

- Shuffle button, copy, share (URL hash `#q=ID`).

### 7.6 `Quiz`

- 10–15 MCQs; shuffle, per‑question feedback, score summary; persisted in `localStorage`.

### 7.7 `MotionSection`

- Generic wrapper for **staggered children** & entrance animations.

---

## 8) Pages & Motion Choreography

### 8.1 Home `/`

- Hero → Quick Links (Timeline, Works, Travels, Quotes, Quiz) → Featured work → Callout for Sources.
- Entrance: hero fade/scale; staggered cards.

### 8.2 Timeline `/timeline`

- Sticky left year column; scrollable right content; progress bar at top.
- Keyboard navigation: ↑ ↓ to move between events.

### 8.3 Travels `/travels`

- Top: map; bottom: list synced to pin hover.
- Enter/exit transitions between stops.

### 8.4 Works `/works`

- Filters: type, year range, tags, search.
- Grid → click opens detail route `/works/[slug]` (MDX).

### 8.5 Ideas `/ideas`

- Card glossary of themes (e.g., nationalism, reform vs revolution, education, language).

### 8.6 Quiz `/quiz`

- Animated cards; confetti on pass.

---

## 9) State & Utilities

### 9.1 Zustand Store

```ts
// lib/store.ts
import { create } from "zustand";
interface UIState {
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
}
interface QuizState {
  score: number;
  answers: Record<string, number>;
  reset: () => void;
  answer: (id: string, idx: number) => void;
}

export const useUI = create<UIState>((set) => ({
  reducedMotion: false,
  setReducedMotion: (v) => set({ reducedMotion: v }),
}));
export const useQuiz = create<QuizState>((set) => ({
  score: 0,
  answers: {},
  reset: () => set({ score: 0, answers: {} }),
  answer: (id, idx) =>
    set((s) => ({ score: s.score + 1, answers: { ...s.answers, [id]: idx } })),
}));
```

### 9.2 Motion Helpers

```ts
// lib/motion.ts
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};
export const stagger = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};
```

---

## 10) MDX Pipeline (Works & Long‑form)

### 10.1 MDX Page Example

```tsx
// app/works/[slug]/page.tsx
import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import works from "@/data/works.json";

export async function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const filepath = path.join(
    process.cwd(),
    "content/works",
    `${params.slug}.mdx`
  );
  if (!fs.existsSync(filepath)) return notFound();
  const source = fs.readFileSync(filepath, "utf8");
  return (
    <div className="container py-12 prose prose-neutral dark:prose-invert">
      <MDXRemote source={source} components={{ Callout }} />
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border p-4 bg-muted/40">{children}</div>;
}
```

---

## 11) Accessibility & i18n

- Respect `prefers-reduced-motion`; provide **Skip to content** link.
- Sufficient color contrast; focus states; semantic landmarks.
- Alt text for all images; `aria-labels` for interactive pins.
- Content language is **English** (optionally add Filipino/Spanish later).

---

## 12) SEO & Social

- **Metadata API** per route; canonical URLs.
- **Open Graph** images (optional: dynamic OG using `/api/og`).
- **JSON‑LD** Schema: `Person` for José Rizal; `CreativeWork` for works pages.

```tsx
// app/(site)/schema.tsx
export function RizalJSONLD() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "José Rizal",
    birthDate: "1861-06-19",
    deathDate: "1896-12-30",
    jobTitle: "Writer, Ophthalmologist, National Hero of the Philippines",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

---

## 13) Search (Optional, Client‑side)

- Build a small index from `works.json` + `quotes.json` using **FlexSearch**.
- Provide instant results in a `CommandK`-style dialog.

```ts
// lib/search.ts
import FlexSearch from "flexsearch";
const index = new FlexSearch.Document({
  document: { id: "id", index: ["title", "excerpt", "quote", "source"] },
});
// hydrate index at runtime with works & quotes
```

---

## 14) Quiz Engine

```ts
// data/quiz.json
[
  {
    id: "q1",
    question: "What is the pen name Rizal used?",
    choices: ["Laong Laan", "Plaridel", "Makata", "Dimas Ilaw"],
    answer: 0,
    explain: "Rizal used Laong Laan and Dimasalang as pen names.",
  },
];
```

```tsx
// components/quiz.tsx
"use client";
import { useQuiz } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";

export function Quiz({ items }: { items: any[] }) {
  const { score, answer, answers, reset } = useQuiz();
  return (
    <div className="space-y-6">
      {items.map((q) => (
        <Card key={q.id} className="transition hover:shadow-lg">
          <CardContent className="p-6 space-y-3">
            <h3 className="font-semibold">{q.question}</h3>
            <div className="grid gap-2">
              {q.choices.map((c: string, i: number) => (
                <button
                  key={i}
                  onClick={() => answer(q.id, i)}
                  className="text-left rounded-lg border p-3 hover:bg-accent"
                >
                  {c}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

---

## 15) Performance Budget & Checklist

- **LCP < 2.0s**, **CLS < 0.1**, **TTFB < 0.5s** on mid‑range mobile.
- Avoid heavy libs; lazy‑load non‑critical components (map, 3D, lottie).
- Use **static generation** for all pages; no server calls.
- Optimize images (AVIF/WebP) and define fixed sizes.
- Split routes; dynamic import 3D viewer & map.
- Preload key fonts; use `font-display: swap`.
- Use `next/script` for any third‑party scripts with `strategy="afterInteractive"`.

---

## 16) Testing Strategy

- **Unit**: Vitest + React Testing Library for components.
- **E2E**: Playwright for route navigation, accessibility flows.
- **Accessibility**: `@axe-core/playwright` basic checks.

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom playwright @axe-core/playwright
```

---

## 17) CI & Deployment

- **GitHub Actions**: Lint, Typecheck, Test, Build.
- **Vercel**: Production deploy from `main`; Preview for PRs.
- Add `headers` for caching images and static assets.

---

## 18) Content & Academic Integrity

- Maintain `/sources` with **proper citations** and links.
- Use **neutral, educational language**; avoid mythologizing; clearly mark quotes.
- Put image attribution under each asset where required.

---

## 19) Step‑by‑Step Build Plan (Tasks for your Coding AI)

> Execute in order; each task should create a PR with a clear title and checklist.

### Task 1 — Bootstrap & Foundations

- [ ] Initialize Next.js app, Tailwind, shadcn/ui, fonts.
- [ ] Add base layout, header/footer, container utility.
- [ ] Configure eslint/prettier, path aliases, commit hooks (lint‑staged optional).

### Task 2 — Data Layer & Schemas

- [ ] Create `/data` and `/content` scaffolds.
- [ ] Implement Zod schemas & loaders.
- [ ] Seed initial timeline/travels/quotes/works JSON + 1 MDX work.

### Task 3 — Home Page & Hero

- [ ] Build `ParallaxHero` with Framer Motion.
- [ ] Add featured sections (cards linking to main routes).

### Task 4 — Timeline Page

- [ ] Create `Timeline` with sticky year rail & scroll progress.
- [ ] Keyboard navigation & accessible semantics.

### Task 5 — Travels Page

- [ ] Static SVG world map with interactive pins from `travels.json`.
- [ ] Modal/Sheet detail per stop; synced list view.

### Task 6 — Works Explorer & MDX Details

- [ ] Grid with filters and search; `WorkCard` component.
- [ ] Dynamic route `/works/[slug]` rendering MDX.

### Task 7 — Quotes & Ideas

- [ ] `QuoteCard` with shuffle/copy/share; Ideas glossary with cards.

### Task 8 — Quiz

- [ ] Implement quiz engine reading from `quiz.json`.
- [ ] Score summary, retry, and store progress in localStorage.

### Task 9 — SEO & Schema

- [ ] Add route metadata, JSON‑LD components, dynamic OG (optional `/api/og`).

### Task 10 — Polish & Performance

- [ ] Lazy load heavy sections; optimize images; check Lighthouse.
- [ ] Add `prefers-reduced-motion` support & toggles.

### Task 11 — Testing & CI

- [ ] Write unit tests for Timeline, WorkCard, QuoteCard.
- [ ] Playwright flow: home → works → work → back → quiz.
- [ ] Set up GitHub Actions; deploy to Vercel.

---

## 20) Sample Implementations

### 20.1 `ParallaxHero` (simplified)

```tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ParallaxHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -60]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.7]);

  return (
    <section className="relative h-[70vh] flex items-center overflow-clip">
      <motion.div style={{ y, opacity }} className="container space-y-4">
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight">
          José Rizal
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-prose">
          A creative, educational tribute to the life, works, and enduring
          legacy of the Philippine national hero.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <a href="/timeline">Explore Timeline</a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="/works">Read Works</a>
          </Button>
        </div>
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,.08),transparent_60%)]"
      />
    </section>
  );
}
```

### 20.2 `Timeline` (core idea)

```tsx
"use client";
import { motion } from "framer-motion";
import { getTimeline } from "@/lib/loaders";

export function TimelineView() {
  const events = getTimeline();
  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-8">
      <aside className="md:sticky md:top-20 h-fit">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {events.map((e) => (
            <li key={e.id}>{e.year}</li>
          ))}
        </ul>
      </aside>
      <div className="space-y-8">
        {events.map((e) => (
          <motion.article
            key={e.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
            className="rounded-xl border p-5 bg-card"
          >
            <h3 className="font-semibold text-xl">
              {e.year} — {e.title}
            </h3>
            <p className="text-muted-foreground mt-2">{e.summary}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
```

---

## 21) Content Guidelines (What to Include)

- **Biography**: early life, education, travels, professions.
- **Major Works**: Noli Me Tangere, El Filibusterismo, poems (e.g., Mi Último Adiós), essays/letters.
- **Timeline**: dated milestones; short readable entries.
- **Travels Map**: key cities/countries, dates, reasons, outcomes.
- **Themes/Ideas**: nationalism, reforms, role of education, civic virtue.
- **Legacy**: influence on Philippine history; commemorations; statues/places named after Rizal.
- **Citations**: textbooks, reputable museum or academic sources.

> ⚠️ Populate `/data` and `/content` with carefully curated, properly cited material from credible academic sources your team selects.

---

## 22) Accessibility Checklist

- [ ] Color contrast passes (check with Tailwind tokens).
- [ ] Focus order logical; visible focus styles.
- [ ] ARIA labels for pins, quiz options, nav.
- [ ] Reduce motion support & toggle.
- [ ] Alt text for all images/illustrations.

---

## 23) Developer Experience & Scripts

```json
// package.json (scripts excerpt)
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "e2e": "playwright test"
  }
}
```

- Use **absolute imports** `@/*`.
- Enable **ESLint** rules for `react-hooks`, `@typescript-eslint`, `unused-imports` (optional plugin).

---

## 24) Deployment Notes

- Set `images.domains` if referencing external images.
- Add `robots.txt`, `sitemap.xml` (Next.js metadata routes).
- Verify Lighthouse on Vercel Preview, fix regressions before merging.

---

## 25) Stretch Features (Nice‑to‑Have)

- **Dynamic OG**: render work title + quote on share.
- **Audio Narration**: optional TTS for key sections with a small UI toggle.
- **Keyboard‑First Shortcuts**: `g t` → timeline, `g w` → works, `?` → help.
- **Theming**: Sepia mode for reading MDX articles.
- **Print‑friendly**: style `/works/[slug]` for printing (essays/notes).

---

## 26) Review Rubric (Self‑Check Before Submission)

- ✅ Content is accurate, cited, and well‑organized.
- ✅ Animations enhance, not distract; reduced‑motion supported.
- ✅ Works & timeline are easy to navigate on mobile.
- ✅ Quiz works offline; stores progress; gives explanations.
- ✅ Lighthouse: Performance ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

---

## 27) Quick Start for Your Team

1. **Clone & Install**: `pnpm i`
2. **Run Dev**: `pnpm dev`
3. **Create Data**: Fill `/data/*.json`, `/content/works/*.mdx`
4. **Build Pages**: Implement tasks in Section 19.
5. **Polish**: performance → a11y → SEO.
6. **Deploy**: connect repo to Vercel → auto previews → final prod.
