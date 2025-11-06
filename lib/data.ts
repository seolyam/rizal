import timelineJson from "@/data/timeline.json";
import travelsJson from "@/data/travels.json";
import quotesJson from "@/data/quotes.json";
import quizJson from "@/data/quiz.json";
import ideasJson from "@/data/ideas.json";
import galleryJson from "@/data/gallery.json";
import worksJson from "@/data/works.json";
import {
  quoteSchema,
  timelineEventSchema,
  travelSpotSchema,
  quizQuestionSchema,
  ideaSchema,
  galleryItemSchema,
  workSchema,
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
const quizData = quizQuestionSchema.array().parse(quizJson);
const ideasData = ideaSchema.array().parse(ideasJson);
const galleryData = galleryItemSchema.array().parse(galleryJson);
const worksData = workSchema.array().parse(worksJson);

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

export async function getWorks(): Promise<WorkSummary[]> {
  return worksData.slice().sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
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
