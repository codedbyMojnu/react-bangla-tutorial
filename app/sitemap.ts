import { siteUrl } from "@/lib/shared";
import { source } from "@/lib/source";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/docs`,
      lastModified: new Date("2025-01-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const docPages: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    lastModified: new Date("2025-01-01"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...docPages];
}
