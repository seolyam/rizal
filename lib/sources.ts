import { getWorkMdx, getWorkSlugs } from "@/lib/mdx";

export type Citation = {
  title: string;
  author?: string;
  url?: string;
  context: string;
};

export async function getCitations(): Promise<Citation[]> {
  const slugs = await getWorkSlugs();
  const citations: Citation[] = [];

  for (const slug of slugs) {
    const { frontmatter } = await getWorkMdx(slug);
    frontmatter.sources.forEach((source) => {
      citations.push({
        title: source.title,
        author: source.author,
        url: source.url,
        context: frontmatter.title,
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
