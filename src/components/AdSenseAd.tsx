import { useEffect } from "react";

interface AdSenseAdProps {
  slot?: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const AdSenseAd = ({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  style = { display: "block" },
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
    <div className={`adsense-container my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-7812693991042173"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};
