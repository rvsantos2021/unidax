import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/seo/landing-page";
import { aiLandingPages } from "@/lib/seo-content";
import { site } from "@/lib/content";
import { buildLandingMetadata } from "@/lib/metadata";

export function generateStaticParams() { return aiLandingPages.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const item = aiLandingPages.find((entry) => entry.slug === slug); if (!item) return {};
  const url = `${site.url}/ia/${slug}`;
  return buildLandingMetadata(item, url);
}
export default async function IaDetailPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = aiLandingPages.find((entry) => entry.slug === slug); if (!item) notFound(); return <LandingPage item={item} kind="ia" />; }
