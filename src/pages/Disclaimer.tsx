import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="w-10 h-10 text-accent" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-glow-purple">
              Disclaimer
            </h1>
          </div>

          <div className="glass-strong p-8 rounded-xl space-y-6 text-foreground/90">
            <p className="text-sm text-muted-foreground">
              <strong>Last Updated:</strong> January 15, 2025
            </p>

            <section>
              <h2 className="text-2xl font-bold text-accent mb-3">1. General Information</h2>
              <p className="leading-relaxed">
                The information provided on Logic Glow (logicglow.com) is for general educational and informational purposes only. All content, including but not limited to text, graphics, images, simulations, and interactive tools, is provided "as is" without any warranty of any kind, either express or implied.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-accent mb-3">2. No Professional Advice</h2>
              <p className="leading-relaxed mb-3">
                Logic Glow is an educational platform designed to teach digital logic design concepts. The content on this Site:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Is NOT a substitute for professional engineering, technical, or academic advice</li>
                <li>Should NOT be relied upon for critical decision-making, commercial projects, or real-world circuit design</li>
                <li>Does NOT constitute professional consulting or design services</li>
              </ul>
              <p className="leading-relaxed mt-3">
                If you require professional assistance, please consult a qualified electrical engineer, computer scientist, or academic advisor.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-accent mb-3">3. Accuracy and Completeness</h2>
              <p className="leading-relaxed">
                While we strive to provide accurate and up-to-date information, we make no representations or warranties regarding the accuracy, reliability, completeness, or timeliness of the content on this Site. Information may be outdated, incomplete, or contain errors. Users are responsible for independently verifying any information before relying on it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-accent mb-3">4. Educational Use Only</h2>
              <p className="leading-relaxed">
                The interactive tools, simulations, and calculators provided on Logic Glow are designed for educational demonstration purposes only. They are NOT intended for use in:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Commercial circuit design or production environments</li>
                <li>Critical systems where failure could result in injury, loss, or damage</li>
                <li>Academic assessments where academic integrity policies apply</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Users should use these tools as learning aids and verify results using professional-grade software and methodologies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-accent mb-3">5. Third-Party Content and Links</h2>
              <p className="leading-relaxed">
                Our Site may contain links to third-party websites, advertisements (via Google AdSense), and external resources. We do not endorse, control, or assume responsibility for the content, accuracy, privacy practices, or opinions expressed on these third-party sites. Accessing third-party links is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-accent mb-3">6. No Guarantee of Results</h2>
              <p className="leading-relaxed">
                While we aim to provide valuable learning resources, we make no guarantees that using our Site will result in:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Improved academic performance or grades</li>
                <li>Mastery of digital logic concepts</li>
                <li>Career advancement or professional success</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Learning outcomes depend on individual effort, prior knowledge, and external factors beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-accent mb-3">7. Technical Errors and Downtime</h2>
              <p className="leading-relaxed">
                We do not guarantee that the Site will be:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Available at all times or free from interruptions</li>
                <li>Error-free, secure, or free from viruses or harmful components</li>
                <li>Compatible with all devices, browsers, or operating systems</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Technical issues may arise, and we are not liable for any damage or loss resulting from such issues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-accent mb-3">8. User Responsibility</h2>
              <p className="leading-relaxed">
                By using Logic Glow, you acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You are solely responsible for how you use the information and tools provided</li>
                <li>You will independently verify any critical information before applying it</li>
                <li>You assume all risks associated with using the Site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-accent mb-3">9. Limitation of Liability</h2>
              <p className="leading-relaxed">
                To the fullest extent permitted by law, Logic Glow, its owners, employees, and affiliates shall NOT be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use or inability to use the Site</li>
                <li>Reliance on information or tools provided</li>
                <li>Errors, inaccuracies, or omissions in content</li>
                <li>Unauthorized access to or alteration of your data</li>
                <li>Loss of data, profits, or business opportunities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-accent mb-3">10. Changes to Disclaimer</h2>
              <p className="leading-relaxed">
                We reserve the right to update or modify this Disclaimer at any time without prior notice. Changes will be posted on this page with a revised "Last Updated" date. Your continued use of the Site after changes constitutes acceptance of the updated Disclaimer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-accent mb-3">11. Jurisdiction-Specific Disclaimers</h2>
              <p className="leading-relaxed">
                Some jurisdictions do not allow limitations on implied warranties or exclusions of liability. If these laws apply to you, some or all of the above disclaimers, exclusions, or limitations may not apply, and you may have additional rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-accent mb-3">12. Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions about this Disclaimer, please contact us:
              </p>
              <ul className="list-none space-y-2 ml-4 mt-3">
                <li><strong>Email:</strong> <a href="mailto:learnwithhraghava@gmail.com" className="text-accent underline">learnwithhraghava@gmail.com</a></li>
                <li><strong>Website:</strong> <a href="https://logicglow.com/contact" className="text-accent underline">logicglow.com/contact</a></li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Disclaimer;