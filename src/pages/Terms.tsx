import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-10 h-10 text-secondary" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-glow-blue">
              Terms & Conditions
            </h1>
          </div>

          <div className="glass-strong p-8 rounded-xl space-y-6 text-foreground/90">
            <p className="text-sm text-muted-foreground">
              <strong>Last Updated:</strong> January 15, 2025
            </p>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-3">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using Logic Glow (the "Site"), you accept and agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Site. We reserve the right to modify these Terms at any time, and your continued use constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-3">2. Use of the Site</h2>
              <h3 className="text-xl font-semibold mt-4 mb-2">2.1 Permitted Use</h3>
              <p className="leading-relaxed mb-3">
                You may use the Site for lawful, educational, and personal purposes only. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the Site in compliance with all applicable laws and regulations</li>
                <li>Not misuse or interfere with the Site's functionality</li>
                <li>Not attempt to gain unauthorized access to any part of the Site</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">2.2 Prohibited Use</h3>
              <p className="leading-relaxed mb-3">You agree NOT to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the Site for any illegal, harmful, or fraudulent purposes</li>
                <li>Upload viruses, malware, or malicious code</li>
                <li>Scrape, copy, or reproduce content without permission</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-3">3. Intellectual Property</h2>
              <h3 className="text-xl font-semibold mt-4 mb-2">3.1 Ownership</h3>
              <p className="leading-relaxed mb-3">
                All content on the Site, including text, graphics, logos, images, code, and interactive tools, is the property of Logic Glow or its licensors and is protected by copyright, trademark, and intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold mt-4 mb-2">3.2 Limited License</h3>
              <p className="leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable license to access and use the Site for personal, educational purposes. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-3">4. User-Generated Content</h2>
              <p className="leading-relaxed mb-3">
                If you submit content (e.g., feedback, comments), you grant us a worldwide, royalty-free license to use, reproduce, and display such content. You represent that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You own or have rights to the content submitted</li>
                <li>Your content does not violate any third-party rights</li>
                <li>Your content is not defamatory, obscene, or illegal</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-3">5. Third-Party Links and Services</h2>
              <p className="leading-relaxed">
                Our Site may contain links to third-party websites or services (e.g., Google AdSense). We are not responsible for the content, privacy practices, or terms of these third parties. Use of third-party services is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-3">6. Disclaimers</h2>
              <h3 className="text-xl font-semibold mt-4 mb-2">6.1 Educational Purpose</h3>
              <p className="leading-relaxed mb-3">
                The Site provides educational tools and information for learning digital logic design. Content is provided "as is" without warranties of any kind, express or implied.
              </p>

              <h3 className="text-xl font-semibold mt-4 mb-2">6.2 No Warranty</h3>
              <p className="leading-relaxed">
                We do not guarantee that the Site will be error-free, uninterrupted, or free from viruses or harmful components. We disclaim all warranties, including implied warranties of merchantability and fitness for a particular purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-3">7. Limitation of Liability</h2>
              <p className="leading-relaxed">
                To the fullest extent permitted by law, Logic Glow and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site, including but not limited to loss of data, profits, or business opportunities. Our total liability shall not exceed $100 USD.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-3">8. Indemnification</h2>
              <p className="leading-relaxed">
                You agree to indemnify and hold harmless Logic Glow, its owners, employees, and affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Site or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-3">9. Termination</h2>
              <p className="leading-relaxed">
                We reserve the right to suspend or terminate your access to the Site at any time, without notice, for any reason, including violation of these Terms. Upon termination, all licenses granted to you will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-3">10. Governing Law and Dispute Resolution</h2>
              <p className="leading-relaxed mb-3">
                These Terms are governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles. Any disputes arising from these Terms shall be resolved through:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Informal Negotiation:</strong> Good-faith attempt to resolve disputes amicably</li>
                <li><strong>Binding Arbitration:</strong> If negotiation fails, disputes will be resolved through binding arbitration</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-3">11. Changes to Terms</h2>
              <p className="leading-relaxed">
                We may update these Terms periodically. Changes will be posted on this page with a revised "Last Updated" date. Your continued use of the Site after changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-3">12. Contact Information</h2>
              <p className="leading-relaxed">
                If you have questions about these Terms, please contact us:
              </p>
              <ul className="list-none space-y-2 ml-4 mt-3">
                <li><strong>Email:</strong> <a href="mailto:contact@logicglow.com" className="text-secondary underline">contact@logicglow.com</a></li>
                <li><strong>Website:</strong> <a href="https://logicglow.lovable.app/contact" className="text-secondary underline">logicglow.lovable.app/contact</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-secondary mb-3">13. Severability</h2>
              <p className="leading-relaxed">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;