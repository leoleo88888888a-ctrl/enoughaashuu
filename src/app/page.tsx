"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Twitter } from "lucide-react";
import TopNavbar from "@/components/TopNavbar";
import GeminiRemover from "@/components/GeminiRemover";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-fuchsia-500/30 overflow-x-hidden">
      <TopNavbar />

      {/* Hero Section */}
      <section className="pt-44 md:pt-36 pb-20 px-6 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-fuchsia-500 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-4 text-center text-[clamp(2.35rem,6.8vw,5.9rem)] leading-[0.95] tracking-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Remove
            </span>
            <Image
              src="/Gemini.gif"
              alt="Gemini"
              width={420}
              height={96}
              className="h-[0.9em] w-auto shrink-0 object-contain"
              priority
            />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Watermarks
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Remove invisible AI watermarks from Google Gemini-generated images using reverse alpha blending mathematics.
            A fast, secure, and lossless workflow that runs directly in your browser.
          </motion.p>
        </div>
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm md:text-base text-gray-300 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
            </span>
            Supports: Gemini • Imagen 2 - 3 • Nano Banana
          </motion.div>
        </div>
      </section>

      {/* App Workspace */}
      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <GeminiRemover />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-sm text-gray-500">
        <p>aashuu ✦</p>
        <div className="mt-2 flex items-center justify-center gap-1 text-xs">
          <a href="https://x.com/warrioraashuu/" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-white transition-colors inline-flex items-center p-2"><Twitter className="w-4 h-4" /></a>
          <span className="w-px h-4 bg-white/20" />
          <a
            href="https://github.com/codeaashu/RemoveBanana"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className="hover:text-white transition-colors inline-flex items-center p-2"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </main>
  );
}
