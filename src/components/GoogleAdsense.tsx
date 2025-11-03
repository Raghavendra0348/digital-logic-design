import { useEffect } from 'react';

interface AdSenseAdProps {
        adSlot: string;
        adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
        fullWidthResponsive?: boolean;
        className?: string;
}

declare global {
        interface Window {
                adsbygoogle: any[];
        }
}

/**
 * Google AdSense Ad Component
 * 
 * Usage:
 * <AdSenseAd adSlot="1234567890" adFormat="auto" fullWidthResponsive={true} />
 * 
 * Make sure to:
 * 1. Add your AdSense script to index.html
 * 2. Replace adSlot with your actual ad slot ID
 * 3. Update ads.txt with your publisher ID
 */
export const AdSenseAd = ({
        adSlot,
        adFormat = 'auto',
        fullWidthResponsive = true,
        className = '',
}: AdSenseAdProps) => {
        useEffect(() => {
                try {
                        // Push ad to AdSense queue
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (error) {
                        console.error('AdSense error:', error);
                }
        }, []);

        return (
                <div className={`adsense-container ${className}`}>
                        <ins
                                className="adsbygoogle"
                                style={{ display: 'block' }}
                                data-ad-client="ca-pub-0000000000000000" // Replace with your AdSense ID
                                data-ad-slot={adSlot}
                                data-ad-format={adFormat}
                                data-full-width-responsive={fullWidthResponsive.toString()}
                        />
                </div>
        );
};

/**
 * In-Article Ad Component
 * Best placed within article content
 */
export const InArticleAd = ({ className = '' }: { className?: string }) => {
        useEffect(() => {
                try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (error) {
                        console.error('AdSense error:', error);
                }
        }, []);

        return (
                <div className={`my-8 flex justify-center ${className}`}>
                        <ins
                                className="adsbygoogle"
                                style={{ display: 'block', textAlign: 'center' }}
                                data-ad-layout="in-article"
                                data-ad-format="fluid"
                                data-ad-client="ca-pub-0000000000000000" // Replace with your AdSense ID
                                data-ad-slot="0000000000" // Replace with your ad slot
                        />
                </div>
        );
};

/**
 * Multiplex Ad Component
 * Shows multiple ads in a grid
 */
export const MultiplexAd = ({ className = '' }: { className?: string }) => {
        useEffect(() => {
                try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (error) {
                        console.error('AdSense error:', error);
                }
        }, []);

        return (
                <div className={`my-8 ${className}`}>
                        <ins
                                className="adsbygoogle"
                                style={{ display: 'block' }}
                                data-ad-format="autorelaxed"
                                data-ad-client="ca-pub-0000000000000000" // Replace with your AdSense ID
                                data-ad-slot="0000000000" // Replace with your ad slot
                        />
                </div>
        );
};

/**
 * Display Ad Component
 * Standard display ad
 */
export const DisplayAd = ({
        width = 728,
        height = 90,
        className = '',
}: {
        width?: number;
        height?: number;
        className?: string;
}) => {
        useEffect(() => {
                try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (error) {
                        console.error('AdSense error:', error);
                }
        }, []);

        return (
                <div className={`flex justify-center my-6 ${className}`}>
                        <ins
                                className="adsbygoogle"
                                style={{ display: 'inline-block', width: `${width}px`, height: `${height}px` }}
                                data-ad-client="ca-pub-0000000000000000" // Replace with your AdSense ID
                                data-ad-slot="0000000000" // Replace with your ad slot
                        />
                </div>
        );
};

/**
 * Responsive Ad Component
 * Automatically adjusts to container size
 */
export const ResponsiveAd = ({ className = '' }: { className?: string }) => {
        useEffect(() => {
                try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (error) {
                        console.error('AdSense error:', error);
                }
        }, []);

        return (
                <div className={`my-6 ${className}`}>
                        <ins
                                className="adsbygoogle"
                                style={{ display: 'block' }}
                                data-ad-client="ca-pub-0000000000000000" // Replace with your AdSense ID
                                data-ad-slot="0000000000" // Replace with your ad slot
                                data-ad-format="auto"
                                data-full-width-responsive="true"
                        />
                </div>
        );
};
