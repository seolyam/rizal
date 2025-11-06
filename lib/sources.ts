import { getWorks } from "@/lib/data";

export type Citation = {
  title: string;
  author?: string;
  url?: string;
  context: string;
};

export async function getCitations(): Promise<Citation[]> {
  const works = await getWorks();
  const citations: Citation[] = [];

  for (const work of works) {
    work.details.sources.forEach((source) => {
      citations.push({
        title: source.title,
        author: source.author,
        url: source.url,
        context: work.title,
      });
    });
  }

  citations.push(
    {
      title: "Jose Rizal National Centennial Commission Archives",
      url: "https://www.nationalmuseum.gov.ph/",
      context: "Timeline & Gallery",
    },
    {
      title: "Republic Act No. 1425 (Rizal Law)",
      url: "https://lawphil.net/statutes/repacts/ra1956/ra_1425_1956.html",
      context: "About & Curriculum",
    },
  );

  const seen = new Set<string>();
  return citations.filter((citation) => {
    const key = `${citation.title}-${citation.url ?? "nourl"}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
