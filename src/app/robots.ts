import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://enough.aashuu.tech/sitemap.xml",
    host: "https://enough.aashuu.tech",
  };
}
