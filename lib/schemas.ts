import { z } from "zod";

export const timelineEventSchema = z.object({
  id: z.string(),
  year: z.number(),
  date: z.string().optional(),
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
});

export type TimelineEvent = z.infer<typeof timelineEventSchema>;

export const travelSpotSchema = z.object({
  id: z.string(),
  place: z.string(),
  country: z.string(),
  lat: z.number(),
  lng: z.number(),
  dateRange: z.string(),
  story: z.string(),
  notes: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

export type TravelSpot = z.infer<typeof travelSpotSchema>;

export const quoteSchema = z.object({
  id: z.string(),
  quote: z.string(),
  source: z.string(),
  year: z.number().optional(),
});

export type Quote = z.infer<typeof quoteSchema>;

export const workFrontmatterSchema = z.object({
  title: z.string(),
  year: z.number(),
  type: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()).min(1),
  readingTime: z.number().optional(),
  summary: z.string().optional(),
  sources: z
    .array(
      z.object({
        title: z.string(),
        author: z.string().optional(),
        url: z.string().url().optional(),
      }),
    )
    .default([]),
});

export type WorkFrontmatter = z.infer<typeof workFrontmatterSchema>;

export const workSourceSchema = z.object({
  title: z.string(),
  author: z.string().optional(),
  url: z.string().url().optional(),
});

export const workDetailsSchema = z.object({
  genre: z.string().optional(),
  summary: z.string().optional(),
  majorThemes: z.array(z.string()).default([]),
  structure: z.array(z.string()).default([]),
  characters: z.array(z.string()).default([]),
  historicalImpact: z.string().optional(),
  quotes: z.array(z.string()).default([]),
  sources: z.array(workSourceSchema).default([]),
});

export const workSchema = z.object({
  slug: z.string().optional(),
  title: z.string(),
  year: z.number(),
  type: z.string(),
  readingTime: z.number().optional(),
  excerpt: z.string(),
  tags: z.array(z.string()).min(1),
  summary: z.string(),
  details: workDetailsSchema.default({}),
});

export type WorkDetails = z.infer<typeof workDetailsSchema>;

export type WorkSummary = z.infer<typeof workSchema>;

export const quizQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        explanation: z.string().optional(),
      }),
    )
    .min(2),
  answer: z.string(),
  category: z.string().optional(),
  reference: z.string().optional(),
});

export type QuizQuestion = z.infer<typeof quizQuestionSchema>;

export const ideaSchema = z.object({
  id: z.string(),
  term: z.string(),
  category: z.string(),
  definition: z.string(),
  related: z.array(z.string()).default([]),
});

export type Idea = z.infer<typeof ideaSchema>;

const rootRelativePathSchema = z
  .string()
  .regex(
    /^\/[A-Za-z0-9/_\-.]+$/,
    "Must be a valid root-relative path (e.g., /images/photo.jpg)",
  );

export const galleryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.union([z.string().url(), rootRelativePathSchema]),
  caption: z.string(),
  credit: z.string(),
});

export type GalleryItem = z.infer<typeof galleryItemSchema>;

export const pageFrontmatterSchema = z.object({
  title: z.string(),
  lead: z.string().optional(),
  updated: z.string().optional(),
  sources: z
    .array(
      z.object({
        title: z.string(),
        url: z.string().url().optional(),
      }),
    )
    .default([]),
});

export type PageFrontmatter = z.infer<typeof pageFrontmatterSchema>;
