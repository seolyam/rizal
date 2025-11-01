import timelineJson from "@/data/timeline.json";
import travelsJson from "@/data/travels.json";
import quotesJson from "@/data/quotes.json";
import worksJson from "@/data/works.json";
import quizJson from "@/data/quiz.json";
import ideasJson from "@/data/ideas.json";
import galleryJson from "@/data/gallery.json";
import {
  quoteSchema,
  timelineEventSchema,
  travelSpotSchema,
  quizQuestionSchema,
  workSummarySchema,
  ideaSchema,
  galleryItemSchema,
  type Quote,
  type TimelineEvent,
  type TravelSpot,
  type QuizQuestion,
  type WorkSummary,
  type Idea,
  type GalleryItem,
} from "@/lib/schemas";

const timelineData = timelineEventSchema.array().parse(timelineJson);
const travelsData = travelSpotSchema.array().parse(travelsJson);
const quotesData = quoteSchema.array().parse(quotesJson);
const worksData = workSummarySchema.array().parse(worksJson);
const quizData = quizQuestionSchema.array().parse(quizJson);
const ideasData = ideaSchema.array().parse(ideasJson);
const galleryData = galleryItemSchema.array().parse(galleryJson);

export function getTimeline(): TimelineEvent[] {
  return timelineData;
}

export function getTimelineByYear(year: number): TimelineEvent[] {
  return timelineData.filter((event) => event.year === year);
}

export function getTravels(): TravelSpot[] {
  return travelsData;
}

export function getQuotes(): Quote[] {
  return quotesData;
}

export function getWorks(): WorkSummary[] {
  return worksData;
}

export function getWorkBySlug(slug: string): WorkSummary | undefined {
  return worksData.find((work) => work.slug === slug);
}

export function getQuizQuestions(): QuizQuestion[] {
  return quizData;
}

export function getIdeas(): Idea[] {
  return ideasData;
}

export function getGallery(): GalleryItem[] {
  return galleryData;
}
