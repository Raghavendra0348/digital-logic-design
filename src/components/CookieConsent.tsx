import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show banner after 1 second delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="glass-strong border-2 border-primary/30 rounded-xl p-6 shadow-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-bold text-lg mb-2">
                      We Use Cookies 🍪
                    </h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      We use cookies to improve your experience, analyze site traffic, and serve personalized ads via Google AdSense. 
                      By clicking "Accept", you consent to our use of cookies. Learn more in our{" "}
                      <a href="/privacy-policy" className="text-primary underline hover:text-primary/80">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                  <Button
                    onClick={handleAccept}
                    variant="default"
                    size="sm"
                    className="flex-1 md:flex-none"
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    size="sm"
                    className="flex-1 md:flex-none"
                  >
                    Decline
                  </Button>
                </div>

                <button
                  onClick={handleDecline}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close cookie banner"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};