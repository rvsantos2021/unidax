import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/seo/landing-page";
import { enterpriseLandingPages } from "@/lib/seo-content";
import { site } from "@/lib/content";
import { buildLandingMetadata } from "@/lib/metadata";

export function generateStaticParams() { return enterpriseLandingPages.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const item = enterpriseLandingPages.find((entry) => entry.slug === slug); if (!item) return {};
  const url = `${site.url}/servicos/${slug}`;
  return buildLandingMetadata(item, url);
}
export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = enterpriseLandingPages.find((entry) => entry.slug === slug); if (!item) notFound(); return <LandingPage item={item} kind="servicos" />; }
