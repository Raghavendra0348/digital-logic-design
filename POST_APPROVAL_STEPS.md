# 🔧 Post-AdSense Approval Setup

## After you receive AdSense approval, follow these steps:

### 1. Update ads.txt file
Replace content in `/public/ads.txt` with:
```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```
(Replace XXXXXXXXXXXXXXXX with your actual publisher ID)

### 2. Activate AdSense code in index.html
Uncomment and update this section:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```

### 3. Update AdSenseAd component
In `/src/components/AdSenseAd.tsx`, replace:
```tsx
slot = "XXXXXXXXXXXXXXXX"
```
with your actual ad slot IDs.

### 4. Add ads to your pages
Use the AdSenseAd component:
```tsx
import { AdSenseAd } from "@/components/AdSenseAd";

<AdSenseAd 
  slot="YOUR_AD_SLOT_ID"
  format="auto"
  responsive={true}
/>
```

### 5. Recommended ad placements:
- Header/footer areas
- Between content sections
- After tutorials
- In blog articles

### 6. Redeploy your site
After making changes, rebuild and redeploy:
```bash
npm run build
```

That's it! Your ads should start showing after deployment. 🎉
