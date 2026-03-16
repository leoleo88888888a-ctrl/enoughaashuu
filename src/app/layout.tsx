import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import InstallAppPrompt from "../components/InstallAppPrompt";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  fallback: ["serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://removebanana.aashuu.tech"),
  title: {
    default: "RemoveBanana by aashuu | Remove AI Watermarks from Gemini Images",
    template: "%s | RemoveBanana",
  },
  description:
    "Remove invisible AI watermarks from Google Gemini, Imagen, and Sora media using reverse alpha blending mathematics. Built by aashuu.",
  keywords: [
    "remove banana",
    "removebanana",
    "aashuu",
    "gemini watermark remover",
    "synthid remover",
    "imagen watermark remover",
    "sora watermark remover",
    "ai watermark remover",
  ],
  applicationName: "RemoveBanana",
  authors: [{ name: "aashuu", url: "https://x.com/warrioraashuu/" }],
  creator: "aashuu",
  publisher: "aashuu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/Banana.webp",
    shortcut: "/Banana.webp",
    apple: "/Banana.webp",
  },
  openGraph: {
    title: "RemoveBanana by aashuu",
    description:
      "Remove invisible AI watermarks from Gemini, Imagen, and Sora media using reverse alpha blending mathematics.",
    url: "https://removebanana.aashuu.tech/",
    siteName: "RemoveBanana",
    type: "website",
    images: [
      {
        url: "/Preview.png",
        width: 1200,
        height: 630,
        alt: "RemoveBanana – Remove AI watermarks from Gemini images",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@warrioraashuu",
    site: "@warrioraashuu",
    title: "RemoveBanana by aashuu",
    description:
      "Remove invisible AI watermarks from Gemini, Imagen, and Sora media using reverse alpha blending mathematics.",
    images: ["/Preview.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "RemoveBanana",
      url: "https://removebanana.aashuu.tech",
      inLanguage: "en",
      publisher: {
        "@type": "Person",
        name: "aashuu",
        url: "https://x.com/warrioraashuu/",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "RemoveBanana",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web",
      url: "https://removebanana.aashuu.tech",
      description:
        "Remove invisible AI watermarks from Gemini, Imagen, and Sora media using reverse alpha blending mathematics.",
      author: {
        "@type": "Person",
        name: "aashuu",
        url: "https://x.com/warrioraashuu/",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <InstallAppPrompt />
        <Analytics />
      </body>
    </html>
  );
}
