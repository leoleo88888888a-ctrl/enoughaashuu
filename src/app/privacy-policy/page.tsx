"use client";

import { motion } from "framer-motion";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";

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
                  Enough Aashuu ("we", "us", or "our") operates the enough.aashuu.tech website and service. We are committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Data We Do NOT Collect</h2>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Your uploaded media files and generated outputs</li>
                  <li>Your prompts, links, or QR payload content</li>
                  <li>Personal information (name, email, location, IP address)</li>
                  <li>Cookies or tracking pixels</li>
                  <li>Any identifying information</li>
                </ul>
                <p className="mt-4">
                  <strong>For browser-side tools, processing happens entirely in your browser using client-side JavaScript.</strong> Your private content is not stored by us.
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
                  If you have privacy concerns, reach out to us via our contact page or on X @enoughaashuu.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
