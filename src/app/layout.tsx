import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  fallback: ["serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fuckwatermarks.aashuu.tech"),
  title: "FuckWatermarks",
  description:
    "Remove invisible AI watermarks from Google Gemini-generated images using reverse alpha blending mathematics.",
  applicationName: "FuckWatermarks",
  authors: [{ name: "aashuu", url: "https://x.com/warrioraashuu/" }],
  creator: "aashuu",
  publisher: "aashuu",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/ghost.webp",
    shortcut: "/ghost.webp",
    apple: "/ghost.webp",
  },
  openGraph: {
    title: "FuckWatermarks",
    description:
      "Remove invisible AI watermarks from Google Gemini-generated images using reverse alpha blending mathematics.",
    url: "https://fuckwatermarks.aashuu.tech/",
    siteName: "FuckWatermarks",
    type: "website",
    images: ["/ghost.webp"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@warrioraashuu",
    title: "FuckWatermarks",
    description:
      "Remove invisible AI watermarks from Google Gemini-generated images using reverse alpha blending mathematics.",
    images: ["/ghost.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={instrumentSerif.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
