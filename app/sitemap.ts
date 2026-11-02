import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { getCasesCMS, getPublishedInsightsCMS } from "@/lib/cms";
import { aiLandingPages, enterpriseLandingPages } from "@/lib/seo-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [insights, cases] = await Promise.all([getPublishedInsightsCMS(), getCasesCMS()]);
  const base: MetadataRoute.Sitemap = [
    "", "/ia", "/servicos", "/cases", "/insights", "/empresa", "/contato", "/privacidade",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/insights" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/contato" ? 0.9 : 0.7,
  }));
  const articleUrls: MetadataRoute.Sitemap = insights.map((item) => ({
    url: `${site.url}/insights/${item.slug}`,
    lastModified: new Date(item.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  const caseUrls: MetadataRoute.Sitemap = cases.map((item) => ({
    url: `${site.url}/cases/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));
  const landingUrls: MetadataRoute.Sitemap = [
    ...aiLandingPages.map((item) => ({ url: `${site.url}/ia/${item.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...enterpriseLandingPages.map((item) => ({ url: `${site.url}/servicos/${item.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
  return [...base, ...landingUrls, ...articleUrls, ...caseUrls];
}
