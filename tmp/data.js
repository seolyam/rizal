"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeline = getTimeline;
exports.getTimelineByYear = getTimelineByYear;
exports.getTravels = getTravels;
exports.getQuotes = getQuotes;
exports.getWorks = getWorks;
exports.getWorkBySlug = getWorkBySlug;
exports.getQuizQuestions = getQuizQuestions;
exports.getIdeas = getIdeas;
exports.getGallery = getGallery;
const timeline_json_1 = require("@/data/timeline.json");
const travels_json_1 = require("@/data/travels.json");
const quotes_json_1 = require("@/data/quotes.json");
const quiz_json_1 = require("@/data/quiz.json");
const ideas_json_1 = require("@/data/ideas.json");
const gallery_json_1 = require("@/data/gallery.json");
const mdx_1 = require("@/lib/mdx");
const schemas_1 = require("@/lib/schemas");
const timelineData = schemas_1.timelineEventSchema.array().parse(timeline_json_1.default);
const travelsData = schemas_1.travelSpotSchema.array().parse(travels_json_1.default);
const quotesData = schemas_1.quoteSchema.array().parse(quotes_json_1.default);
const quizData = schemas_1.quizQuestionSchema.array().parse(quiz_json_1.default);
const ideasData = schemas_1.ideaSchema.array().parse(ideas_json_1.default);
const galleryData = schemas_1.galleryItemSchema.array().parse(gallery_json_1.default);
function getTimeline() {
    return timelineData;
}
function getTimelineByYear(year) {
    return timelineData.filter((event) => event.year === year);
}
function getTravels() {
    return travelsData;
}
function getQuotes() {
    return quotesData;
}
async function getWorks() {
    const works = await (0, mdx_1.getAllWorkSummaries)();
    return works.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
}
function normalizeSlug(slug) {
    if (!slug)
        return '';
    return String(slug)
        .toLowerCase()
        .normalize('NFD') // Normalize accented characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}
// Map of common URL slugs to actual filenames
const slugToFilenameMap = {
    'noli-me-tangere': 'noli-me-tangere',
    'el-filibusterismo': 'el-filibusterismo',
    'filipinas-dentro-de-cien-anos': 'filipinas-dentro-de-cien-anos',
    'letter-to-the-young-women-of-malolos': 'letter-to-the-young-women-of-malolos',
    'annotations-to-antonio-de-morgas-sucedos-de-las-islas-filipinas': 'annotation-morga',
    'la-indolencia-de-los-filipinos': 'la-indolencia',
    'prologue-to-morgas-sucedos': 'jose-rizal-annotation-morga',
    'sobre-la-indolencia-de-los-filipinos': 'sobre-la-indolencia',
    'mi-ultimo-adios': 'mi-ultimo-adios'
};
async function getWorkBySlug(slug) {
    // First try to get the exact match from the map
    const filename = slugToFilenameMap[slug] || slug;
    // Try to get the work by the mapped filename
    const works = await (0, mdx_1.getAllWorkSummaries)();
    const normalizedSlug = normalizeSlug(filename);
    // First try exact match with the mapped filename
    let match = works.find(work => work.slug === filename);
    if (match)
        return match;
    // Then try normalized match with the mapped filename
    match = works.find(work => normalizeSlug(work.slug) === normalizedSlug);
    if (match)
        return match;
    // Try direct match with the original slug
    match = works.find(work => work.slug === slug);
    if (match)
        return match;
    // Try normalized match with the original slug
    const originalNormalizedSlug = normalizeSlug(slug);
    match = works.find(work => normalizeSlug(work.slug) === originalNormalizedSlug);
    if (match)
        return match;
    // As a last resort, try to load the work directly by slug
    return (0, mdx_1.getWorkSummary)(filename);
}
function getQuizQuestions() {
    return quizData;
}
function getIdeas() {
    return ideasData;
}
function getGallery() {
    return galleryData;
}
