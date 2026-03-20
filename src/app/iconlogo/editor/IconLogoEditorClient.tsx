"use client";

import TanStackQueryProvider from "@/iconlogo/integrations/tanstack-query/root-provider";
import { AppShell } from "@/iconlogo/features/editor/AppShell";

export default function IconLogoEditorClient() {
  return (
    <TanStackQueryProvider>
      <main className="min-h-screen bg-black text-white overflow-hidden">
        <AppShell />
      </main>
    </TanStackQueryProvider>
  );
}
