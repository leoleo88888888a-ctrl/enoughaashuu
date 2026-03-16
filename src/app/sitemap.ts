import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://removebanana.aashuu.tech";
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/video-remover`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
