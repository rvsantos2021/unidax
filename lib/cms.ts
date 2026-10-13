import "server-only";
import { cases as localCases, insights as localInsights, type Case, type Insight } from "@/lib/content";

type SanityResponse<T> = { result?: T };

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_API_TOKEN;

function enabled() { return Boolean(projectId && dataset); }

async function query<T>(groq: string): Promise<T | null> {
  if (!enabled()) return null;
  const url = `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(groq)}`;
  const response = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    next: { revalidate: 300, tags: ["unidax-content"] },
  });
  if (!response.ok) return null;
  const body = (await response.json()) as SanityResponse<T>;
  return body.result ?? null;
}

export async function getPublishedInsightsCMS(): Promise<Insight[]> {
  const remote = await query<Insight[]>(`*[_type == "insight" && status == "published"] | order(publishedAt desc){slug,tag,title,meta,excerpt,publishedAt,status,"content":content[].children[].text}`);
  return remote?.length ? remote : localInsights.filter((item) => item.status === "published");
}

export async function getInsightCMS(slug: string): Promise<Insight | undefined> {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "");
  const item = await query<Insight>(`*[_type == "insight" && status == "published" && slug.current == "${safeSlug}"][0]{"slug":slug.current,tag,title,meta,excerpt,publishedAt,status,"content":content[].children[].text}`);
  return item || localInsights.find((entry) => entry.slug === slug && entry.status === "published");
}

export async function getCasesCMS(): Promise<Case[]> {
  const remote = await query<Case[]>(`*[_type == "caseStudy"] | order(_createdAt desc){"slug":slug.current,client,title,category,summary,status}`);
  return remote?.length ? remote : localCases;
}

export async function getCaseCMS(slug: string): Promise<Case | undefined> {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "");
  const item = await query<Case>(`*[_type == "caseStudy" && slug.current == "${safeSlug}"][0]{"slug":slug.current,client,title,category,summary,status}`);
  return item || localCases.find((entry) => entry.slug === slug);
}
