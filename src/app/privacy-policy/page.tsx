"use client";

import { motion } from "framer-motion";
import TopNavbar from "@/components/TopNavbar";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <TopNavbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400 mb-8">Last updated: March 2026</p>

            <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Overview</h2>
                <p>
                  RemoveBanana ("we", "us", or "our") operates the removebanana.aashuu.tech website and service. We are committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Data We Do NOT Collect</h2>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Your images or videos</li>
                  <li>Personal information (name, email, location, IP address)</li>
                  <li>Usage data or analytics</li>
                  <li>Cookies or tracking pixels</li>
                  <li>Any identifying information</li>
                </ul>
                <p className="mt-4">
                  <strong>All processing happens entirely in your browser using client-side JavaScript.</strong> Your data never leaves your device.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. What We Do Collect</h2>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><strong>Server Logs:</strong> Basic web server logs (timestamp, status code) for infrastructure monitoring only</li>
                  <li><strong>Analytics:</strong> We use Vercel Analytics to track page views and errors (no personal data collected)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Services</h2>
                <p>
                  We use the following services, each with their own privacy policies:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2 mt-4">
                  <li><strong>Vercel:</strong> Hosting and analytics (see Vercel Privacy Policy)</li>
                  <li><strong>Google AdSense:</strong> Advertising (see Google Privacy Policy)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
                <p>Since we don't collect personal data, there's nothing to request, modify, or delete. Your privacy is protected by design.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
                <p>
                  If you have privacy concerns, reach out to us via our contact page or on X @warrioraashuu.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 text-center text-sm text-gray-500 px-6">
        <p>© 2026 RemoveBanana by aashuu ✦</p>
      </footer>
    </main>
  );
}
