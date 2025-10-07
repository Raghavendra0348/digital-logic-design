import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-slate-950 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-glow-cyan">
              Privacy Policy
            </h1>
          </div>

          <div className="glass-strong p-8 rounded-xl space-y-6 text-foreground/90">
            <p className="text-sm text-muted-foreground">
              <strong>Last Updated:</strong> January 15, 2025
            </p>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">1. Introduction</h2>
              <p className="leading-relaxed">
                Welcome to Logic Glow ("we," "our," or "us"). We are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your personal information. This Privacy Policy explains our practices regarding data collection and usage when you visit our website at logicglow.lovable.app (the "Site").
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mt-4 mb-2">2.1 Information You Provide</h3>
              <p className="leading-relaxed mb-3">
                When you use our contact form or interact with our Site, we may collect:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name and email address (when you contact us)</li>
                <li>Any information you voluntarily provide in messages or feedback</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">2.2 Automatically Collected Information</h3>
              <p className="leading-relaxed mb-3">
                When you visit our Site, we automatically collect certain information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Operating system and device identifiers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">3. Cookies and Tracking Technologies</h2>
              <p className="leading-relaxed mb-3">
                We use cookies and similar tracking technologies to enhance your experience. Cookies are small data files stored on your device. We use:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our Site (Google Analytics)</li>
                <li><strong>Advertising Cookies:</strong> Used by Google AdSense to display relevant advertisements</li>
              </ul>
              <p className="leading-relaxed mt-3">
                You can control cookie preferences through your browser settings, but disabling cookies may affect site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">4. Third-Party Services</h2>
              <h3 className="text-xl font-semibold mt-4 mb-2">4.1 Google AdSense</h3>
              <p className="leading-relaxed mb-3">
                We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our Site or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-primary underline" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>.
              </p>

              <h3 className="text-xl font-semibold mt-4 mb-2">4.2 Google Analytics</h3>
              <p className="leading-relaxed">
                We use Google Analytics to analyze Site usage and improve our services. Google Analytics collects information anonymously and reports website trends without identifying individual visitors. Learn more about <a href="https://policies.google.com/privacy" className="text-primary underline" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">5. How We Use Your Information</h2>
              <p className="leading-relaxed mb-3">We use collected information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our Site and services</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Analyze Site usage and optimize user experience</li>
                <li>Display relevant advertisements through Google AdSense</li>
                <li>Comply with legal obligations and enforce our Terms & Conditions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">6. Data Sharing and Disclosure</h2>
              <p className="leading-relaxed mb-3">
                We do not sell or rent your personal information. We may share data with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Third-Party Service Providers:</strong> Google (AdSense, Analytics) for advertising and analytics</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">7. Data Security</h2>
              <p className="leading-relaxed">
                We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">8. Your Rights (GDPR & CCPA Compliance)</h2>
              <p className="leading-relaxed mb-3">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request access to your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Opt-Out:</strong> Opt out of data collection for advertising purposes</li>
              </ul>
              <p className="leading-relaxed mt-3">
                To exercise these rights, contact us at <a href="mailto:contact@logicglow.com" className="text-primary underline">contact@logicglow.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">9. Children's Privacy</h2>
              <p className="leading-relaxed">
                Our Site is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">10. International Data Transfers</h2>
              <p className="leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in compliance with applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">11. Changes to This Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy periodically. Changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy regularly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">12. Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions or concerns about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none space-y-2 ml-4 mt-3">
                <li><strong>Email:</strong> <a href="mailto:contact@logicglow.com" className="text-primary underline">contact@logicglow.com</a></li>
                <li><strong>Website:</strong> <a href="https://logicglow.lovable.app/contact" className="text-primary underline">logicglow.lovable.app/contact</a></li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;