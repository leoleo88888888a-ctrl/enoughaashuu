"use client";

import { motion } from "framer-motion";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";
import { Github, Twitter } from "lucide-react";
import { BRAND_DESCRIPTION, BRAND_TAGLINE } from "@/lib/brand";

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <TopNavbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              About Enough Aashuu
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              {BRAND_TAGLINE}
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mt-4">
              {BRAND_DESCRIPTION}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                Enough Aashuu exists to give creators full control over modern AI and media workflows. From cleaning Gemini/Imagen images and Sora videos, to removing backgrounds, detecting AI-generated visuals, and generating styled QR codes, we build practical tools that save time.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                We built Enough Aashuu to restore agency and speed, so artists, marketers, builders, and teams can create faster without unnecessary friction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">How It Works</h2>
              <p className="text-gray-400 leading-relaxed">
                <strong>For Image Cleanup:</strong> Enough Aashuu uses reverse alpha blending mathematics to detect and remove SynthID watermarks embedded in pixel data. All processing happens in your browser for image cleanup flows.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                <strong>For Video Cleanup:</strong> Sora watermarks are frontend overlays, not embedded in the file. We extract the direct URL to the clean MP4 from OpenAI's CDN and serve it to you with no re-encoding.
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                <strong>For Detection & Generation:</strong> We provide an AI image detector to identify generated/manipulated visuals and a flexible QR generator for links, Wi-Fi, vCards, events, SMS, and geo sharing.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Privacy First</h2>
              <p className="text-gray-400 leading-relaxed">
                Privacy is a core default. For browser-side tools, your files and input stay on your device. We do not require accounts, and we do not store personal content from image, video, detector, or QR creation workflows.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Built by aashuu</h2>
              <p className="text-gray-400 leading-relaxed">
                Enough Aashuu is developed and maintained by aashuu, a builder focused on open-source tools that respect user privacy and autonomy. The full source code is available on GitHub.
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://x.com/enoughaashuu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  Follow on X
                </a>
                <a
                  href="https://github.com/codeaashu/enoughaashuu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">License</h2>
              <p className="text-gray-400 leading-relaxed">
                Enough Aashuu is released under the MIT License. You're free to use, modify, and distribute it for any purpose.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
