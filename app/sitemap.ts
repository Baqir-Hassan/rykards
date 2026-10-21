import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const routes = ["", "/work", "/about", "/contact", "/privacy", "/uk-software-agency-partnerships", "/uae-wholesale-software", "/overseas-clients"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    // Omit lastModified until actual content update dates are tracked.
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route === "/privacy" ? 0.3 : 0.8,
    ...(route === "/work" ? {
      videos: [
        {
          title: "Rykards Restaurant IMS overview",
          description: "An overview of Rykards Restaurant IMS, connecting restaurant inventory, point of sale, and food and beverage operations.",
          thumbnail_loc: `${siteUrl}/restaurant-video-poster.jpg`,
          content_loc: `${siteUrl}/IMS-explainer.mp4`,
        },
        {
          title: "Rykards wholesale software overview",
          description: "An overview of Rykards wholesale software for connected stock, orders, dispatch, invoices, and payments.",
          thumbnail_loc: `${siteUrl}/wholesale-video-poster.jpg`,
          content_loc: `${siteUrl}/rykards-explainer-spoken-contact.mp4`,
        },
      ],
    } : {}),
  }));
}
