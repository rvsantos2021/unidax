import "server-only";
import { cases as localCases, insights as localInsights, type Case, type Insight } from "@/lib/content";

type SanityResponse<T> = { result?: T };
type QueryResult<T> = { configured: false } | { configured: true; ok: true; result: T } | { configured: true; ok: false };

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_API_TOKEN;
const enabled = () => Boolean(projectId && dataset);

async function query<T>(groq: string): Promise<QueryResult<T>> {
  if (!enabled()) return { configured: false };
  try {
    const url = `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(groq)}`;
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      next: { revalidate: 300, tags: ["unidax-content"] },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return { configured: true, ok: false };
    const body = (await response.json()) as SanityResponse<T>;
    return { configured: true, ok: true, result: (body.result ?? null) as T };
  } catch {
    return { configured: true, ok: false };
  }
}

export async function getPublishedInsightsCMS(): Promise<Insight[]> {
  const remote = await query<Insight[]>(`*[_type == "insight" && status == "published"] | order(publishedAt desc){slug,tag,title,meta,excerpt,publishedAt,status,"content":content[]{_type,_key,style,listItem,markDefs,children[]{_type,_key,text,marks}}}`);
  if (!remote.configured) return localInsights.filter((item) => item.status === "published");
  if (!remote.ok) return localInsights.filter((item) => item.status === "published"); // Fallback temporário em indisponibilidade do CMS.
  return remote.result ?? [];
}

export async function getInsightCMS(slug: string): Promise<Insight | undefined> {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "");
  const remote = await query<Insight | null>(`*[_type == "insight" && status == "published" && slug.current == "${safeSlug}"][0]{"slug":slug.current,tag,title,meta,excerpt,publishedAt,status,"content":content[]{_type,_key,style,listItem,markDefs,children[]{_type,_key,text,marks}}}`);
  if (!remote.configured) return localInsights.find((entry) => entry.slug === slug && entry.status === "published");
  if (!remote.ok) return localInsights.find((entry) => entry.slug === slug && entry.status === "published");
  return remote.result ?? undefined;
}

export async function getCasesCMS(): Promise<Case[]> {
  const remote = await query<Case[]>(`*[_type == "caseStudy" && status == "published"] | order(_createdAt desc){"slug":slug.current,client,title,category,summary,status}`);
  if (!remote.configured) return localCases.filter((item) => item.status === "published");
  if (!remote.ok) return localCases.filter((item) => item.status === "published");
  return remote.result ?? [];
}

export async function getCaseCMS(slug: string): Promise<Case | undefined> {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "");
  const remote = await query<Case | null>(`*[_type == "caseStudy" && status == "published" && slug.current == "${safeSlug}"][0]{"slug":slug.current,client,title,category,summary,status}`);
  if (!remote.configured) return localCases.find((entry) => entry.slug === slug && entry.status === "published");
  if (!remote.ok) return localCases.find((entry) => entry.slug === slug && entry.status === "published");
  return remote.result ?? undefined;
}
