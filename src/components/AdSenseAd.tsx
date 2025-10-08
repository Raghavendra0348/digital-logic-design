import { useEffect } from "react";

interface AdSenseAdProps {
  slot?: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  responsive?: boolean;
  className?: string;
}

export const AdSenseAd = ({
  slot = "1234567890", // Replace with your actual AdSense ad slot
  format = "auto",
  responsive = true,
  className = "",
}: AdSenseAdProps) => {
  useEffect(() => {
    try {
      // @ts-expect-error - AdSense global variable
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      {/* AdSense Placeholder - Replace with actual AdSense code after approval */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />


    </div>
  );
};