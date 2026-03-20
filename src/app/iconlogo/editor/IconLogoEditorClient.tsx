"use client";

import TopNavbar from "@/components/TopNavbar";
import TanStackQueryProvider from "@/iconlogo/integrations/tanstack-query/root-provider";
import { AppShell } from "@/iconlogo/features/editor/AppShell";

export default function IconLogoEditorClient() {
  return (
    <TanStackQueryProvider>
      <main className="min-h-screen bg-black text-white overflow-hidden">
        <TopNavbar />
        <div className="pt-16">
          <AppShell />
        </div>
      </main>
    </TanStackQueryProvider>
  );
}
