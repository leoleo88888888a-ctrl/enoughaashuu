import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RemoveBanana",
    short_name: "RemoveBanana",
    description:
      "Remove invisible AI watermarks from Google Gemini-generated images using reverse alpha blending mathematics.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      {
        src: "/Banana.webp",
        sizes: "192x192",
        type: "image/webp",
      },
      {
        src: "/Banana.webp",
        sizes: "512x512",
        type: "image/webp",
      },
      {
        src: "/Banana.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "maskable",
      },
    ],
  };
}
