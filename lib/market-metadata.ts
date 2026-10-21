import type { Metadata } from "next";

export function marketMetadata(path: string, title: string, description: string): Metadata {
  const image = { url: "/opengraph-image.png", alt: "Rykards — Custom software engineering and a preview of the wholesale dashboard." };
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", siteName: "Rykards", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
