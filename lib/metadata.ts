import type { Metadata } from "next";

export const OG_IMAGE_PATH = "/opengraph-image";

interface LandingMetadataInput {
  title: string;
  description: string;
}

export function buildLandingMetadata(
  item: LandingMetadataInput,
  url: string,
): Metadata {
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: item.title,
      description: item.description,
      url,
      images: [{ url: OG_IMAGE_PATH }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
    },
  };
}
