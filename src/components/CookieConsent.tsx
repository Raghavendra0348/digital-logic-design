import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Extend window interface for gtag
declare global {
        interface Window {
                gtag?: (command: string, action: string, params: Record<string, string>) => void;
        }
}

export const CookieConsent = () => {
        const [isVisible, setIsVisible] = useState(false);
        const [isLoaded, setIsLoaded] = useState(false);

        useEffect(() => {
                // Check if user has already consented
                const hasConsented = localStorage.getItem("cookieConsent");
                if (!hasConsented) {
                        // Show after a delay to avoid immediate popup
                        const timer = setTimeout(() => {
                                setIsVisible(true);
                        }, 2000);
                        return () => clearTimeout(timer);
                }
                setIsLoaded(true);
        }, []);

        const handleAccept = () => {
                localStorage.setItem("cookieConsent", "accepted");
                localStorage.setItem("cookieConsentDate", new Date().toISOString());
                setIsVisible(false);
                setIsLoaded(true);

                // Initialize analytics or other services here if needed
                if (typeof window !== "undefined" && window.gtag) {
                        window.gtag("consent", "update", {
                                analytics_storage: "granted",
                                ad_storage: "granted",
                                ad_user_data: "granted",
                                ad_personalization: "granted"
                        });
                }
        };

        const handleDecline = () => {
                localStorage.setItem("cookieConsent", "declined");
                localStorage.setItem("cookieConsentDate", new Date().toISOString());
                setIsVisible(false);
                setIsLoaded(true);

                // Ensure analytics is disabled
                if (typeof window !== "undefined" && window.gtag) {
                        window.gtag("consent", "update", {
                                analytics_storage: "denied",
                                ad_storage: "denied",
                                ad_user_data: "denied",
                                ad_personalization: "denied"
                        });
                }
        };

        if (isLoaded && !isVisible) return null;

        return (
                <AnimatePresence>
                        {isVisible && (
                                <motion.div
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 100, opacity: 0 }}
                                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                        className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 z-50 max-w-4xl mx-auto"
                                >
                                        <div className="glass-strong p-4 md:p-6 rounded-xl border border-primary/20 shadow-2xl backdrop-blur-xl">
                                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                                        <div className="flex items-center gap-3 flex-shrink-0">
                                                                <Cookie className="w-6 h-6 text-primary flex-shrink-0" />
                                                                <h3 className="font-semibold text-white text-sm md:text-base">
                                                                        Cookie Consent
                                                                </h3>
                                                        </div>

                                                        <div className="flex-1 text-sm text-slate-300 leading-relaxed">
                                                                <p className="mb-2">
                                                                        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
                                                                        By clicking "Accept All", you consent to our use of cookies.
                                                                </p>
                                                                <p className="text-xs">
                                                                        Read our{" "}
                                                                        <Link
                                                                                to="/privacy-policy"
                                                                                className="text-primary hover:text-primary/80 underline transition-colors"
                                                                        >
                                                                                Privacy Policy
                                                                        </Link>
                                                                        {" "}and{" "}
                                                                        <Link
                                                                                to="/terms"
                                                                                className="text-primary hover:text-primary/80 underline transition-colors"
                                                                        >
                                                                                Terms & Conditions
                                                                        </Link>
                                                                        {" "}for more information.
                                                                </p>
                                                        </div>

                                                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                                                                <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={handleDecline}
                                                                        className="text-xs px-3 py-2 border-slate-600 text-slate-300 hover:bg-slate-700/50"
                                                                >
                                                                        Decline
                                                                </Button>
                                                                <Button
                                                                        size="sm"
                                                                        onClick={handleAccept}
                                                                        className="bg-primary hover:bg-primary/90 text-white text-xs px-4 py-2"
                                                                >
                                                                        Accept All
                                                                </Button>
                                                        </div>
                                                </div>
                                        </div>
                                </motion.div>
                        )}
                </AnimatePresence>
        );
};
