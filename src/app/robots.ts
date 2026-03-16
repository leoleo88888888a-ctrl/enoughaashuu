import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://removebanana.aashuu.tech/sitemap.xml",
    host: "https://removebanana.aashuu.tech",
  };
}
