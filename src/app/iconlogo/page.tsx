import type { Metadata } from "next";
import IconLogoLandingClient from "./IconLogoLandingClient";
import "@/iconlogo/styles.css";

export const metadata: Metadata = {
  title: "IconLogo Studio | Enough Aashuu",
  description:
    "Create icon-based logos with the integrated IconLogo studio inside Enough Aashuu.",
};

export default function IconLogoPage() {
  return <IconLogoLandingClient />;
}
