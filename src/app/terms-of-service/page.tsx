"use client";

import { motion } from "framer-motion";
import TopNavbar from "@/components/TopNavbar";

export default function TermsOfService() {
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
              Terms of Service
            </h1>
            <p className="text-gray-400 mb-8">Last updated: March 2025</p>

            <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using RemoveBanana ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Service Description</h2>
                <p>
                  RemoveBanana is a free tool that helps remove watermarks from AI-generated images and videos. The Service is provided "as-is" without warranties of any kind.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
                <p>You agree that you will:</p>
                <ul className="list-disc list-inside space-y-2 ml-2 mt-4">
                  <li>Use the Service only for lawful purposes</li>
                  <li>Not violate copyright or intellectual property rights of others</li>
                  <li>Not use the Service to create counterfeit, fraudulent, or harmful content</li>
                  <li>Respect the rights and dignity of others</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Permitted Use</h2>
                <p>
                  You may use RemoveBanana to remove watermarks from:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2 mt-4">
                  <li>Content you personally created</li>
                  <li>Content you have explicit permission to modify</li>
                  <li>Publicly shared content for personal use</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Prohibited Uses</h2>
                <p>You may NOT use RemoveBanana to:</p>
                <ul className="list-disc list-inside space-y-2 ml-2 mt-4">
                  <li>Remove watermarks from copyrighted content you don't own</li>
                  <li>Create misleading or fraudulent content</li>
                  <li>Violate third-party rights or platform Terms of Service</li>
                  <li>Engage in harassment, defamation, or illegal activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Disclaimer of Warranties</h2>
                <p>
                  The Service is provided "AS IS" without warranties of any kind, express or implied. We do not guarantee that the Service will be error-free, uninterrupted, or meet your expectations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, RemoveBanana and its creators shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to Terms</h2>
                <p>
                  We may update these Terms at any time. Continued use of the Service after changes indicates your acceptance of the new Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Contact</h2>
                <p>
                  For questions about these Terms, visit our contact page or reach out on X @warrioraashuu.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 text-center text-sm text-gray-500 px-6">
        <p>© 2025 RemoveBanana by aashuu ✦</p>
      </footer>
    </main>
  );
}
