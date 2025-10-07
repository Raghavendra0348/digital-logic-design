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
      // @ts-ignore
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
      
      {/* Development placeholder - Remove this in production */}
      {process.env.NODE_ENV === "development" && (
        <div className="glass p-8 rounded-lg border-2 border-dashed border-primary/30 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            📢 AdSense Ad Placeholder
          </p>
          <p className="text-xs text-muted-foreground">
            Format: {format} | Slot: {slot}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Replace with actual AdSense code after approval
          </p>
        </div>
      )}
    </div>
  );
};