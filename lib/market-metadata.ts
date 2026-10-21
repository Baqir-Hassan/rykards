import type { Metadata } from "next";

export function marketMetadata(path: string, title: string, description: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", siteName: "Rykards" },
    twitter: { card: "summary_large_image", title, description },
  };
}
