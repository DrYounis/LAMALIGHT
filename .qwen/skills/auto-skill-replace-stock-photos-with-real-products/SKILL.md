---
name: replace-stock-photos-with-real-products
description: Swap placeholder/stock product images for real photography in a Next.js e-commerce project — copy files to public/, update product data, adjust card aspect ratios to match actual photo dimensions, and replace hero backgrounds with real shots
source: auto-skill
extracted_at: '2026-07-16T15:48:30.320Z'
---

# Replace Stock Photos with Real Product Images

When a user has real product photography to swap in for Unsplash/placeholder images in a Next.js e-commerce project, follow this workflow. The goal is to integrate the actual photos without breaking the design, while adapting card dimensions and hero backgrounds to match the real images.

## Step 1: Collect and copy the real images

Identify the product photo files (they're often uploaded as `.jpeg` or `.jpg` with long descriptive filenames). Copy them to `public/images/` with clean, machine-friendly names:

```bash
mkdir -p public/images
cp Rose_candle_bouquet_on_oak_202607082138.jpeg public/images/rose-bouquet-candle.jpg
cp Candle_personalized_with_name_tag.jpeg          public/images/personalized-candle.jpg
# ... etc.
```

**Why rename:** Long filenames with timestamps cause issues in URLs and are hard to read in product data. Keep names short, descriptive, lowercase, hyphenated — no spaces, no dates.

## Step 2: Update the product data array

Replace every entry in `lib/products.ts` (or equivalent) — names, descriptions, prices, and image paths. Drop any products the user doesn't sell. The data should be the single source of truth; the UI renders from it.

```ts
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Rose Bouquet Candle',
    scent: 'Sculpted wax roses with a lit center — elegant centerpiece',
    price: 120,
    image: '/images/rose-bouquet-candle.jpg',
  },
  // ... only products the user actually sells
];
```

If the user gives you a pricing table, use their numbers exactly. If they say "adjust the prices if mine are wrong," flag it — don't silently change prices.

## Step 3: Adjust card aspect ratios to match the photos

Stock photos from Unsplash are usually portrait (3:4 or 4:5). Real product shots are often landscape or square (4:3, 16:9). Check the actual image dimensions and update the card's aspect ratio so images aren't brutally cropped.

```tsx
// Before: portrait stock photos
<div className="relative aspect-[4/5] overflow-hidden">

// After: landscape product shots
<div className="relative aspect-[4/3] overflow-hidden">
```

Use `next/image` with `fill` and `object-cover` — the aspect-ratio container handles cropping, and `object-cover` fills the space without distortion.

## Step 4: Replace the hero background

If the hero used a stock photo or a gradient, swap it for a real product shot. The key pattern: a full-bleed `next/image` with `fill` + a semi-transparent overlay so text remains readable.

```tsx
<section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
  {/* Full-bleed background image */}
  <Image
    src="/images/french-window-candle.jpg"
    alt=""
    fill
    className="object-cover"
    priority
    aria-hidden="true"
  />

  {/* Cream overlay — sampled from brand palette, keeps text readable */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: 'linear-gradient(180deg, rgba(239,230,211,0.55) 0%, rgba(242,235,220,0.65) 50%, rgba(234,224,203,0.7) 100%)',
    }}
    aria-hidden="true"
  />

  {/* Existing hero content (logo, glow, text, button) goes here — sits above the overlay */}
</section>
```

**Why an overlay instead of opacity:** Setting `opacity` on the image would dim the entire element including any children. The overlay is an independent `<div>` that sits between the image and the content, so the text and logo render at full opacity.

## Step 5: Keep existing design elements

Don't strip away the brand design when swapping photos. The cream overlay, candle-glow animation, paper texture, and other branded visual elements should sit on top of the new image. The photo is now the *background* — everything else layers over it.

## Step 6: Build and verify

```bash
npm run build     # must pass with zero errors
npm run dev       # spot-check product cards, hero, image loading
```

Check:
- [ ] All product images load (no broken `src` paths)
- [ ] Card aspect ratios match the actual photo dimensions — no awkward crops
- [ ] Hero text is readable over the new background
- [ ] Logo and brand elements still visible on top of the hero photo
- [ ] `npm run build` passes cleanly
