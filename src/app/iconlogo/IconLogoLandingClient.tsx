"use client";

import TopNavbar from "@/components/TopNavbar";
import TanStackQueryProvider from "@/iconlogo/integrations/tanstack-query/root-provider";
import { LandingPage } from "@/iconlogo/features/landing/LandingPage";

export default function IconLogoLandingClient() {
  return (
    <TanStackQueryProvider>
      <main className="min-h-screen bg-black text-white overflow-x-hidden">
        <TopNavbar />
        <LandingPage />
      </main>
    </TanStackQueryProvider>
  );
}
