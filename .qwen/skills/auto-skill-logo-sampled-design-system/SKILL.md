---
name: logo-sampled-design-system
description: Build a CSS design system by pixel-sampling exact colors from a logo image, then assign semantic roles (primary, hover, accent, background, etc.) and pair with a three-role font system that echoes the logo's typography
source: auto-skill
extracted_at: '2026-07-16T15:04:17.772Z'
---

# Logo-Sampled Design System

Build a complete CSS color palette and font hierarchy by sampling the user's logo image pixel-by-pixel. When a user hands you a logo but no brand guide, derive the design system directly from the logo artwork.

## Step 1: Sample colors from the logo

Extract the dominant colors from the logo by pixel-sampling key areas:

- **Primary color** from the boldest element (e.g., the rust wreath/stamp)
- **Deep variant** of primary for hover/active states (darken primary by ~10-15%)
- **Body text color** from the logo's darker tones (if logo has dark elements)
- **Accent/CTA color** from the brightest/warmest element (e.g., flame gold)
- **Accent hover** variant (slightly desaturated or darkened accent)
- **Highlight color** from the lightest element (e.g., flame glow)
- **Border/divider color** from a mid-tone element (e.g., copper tones)
- **Page background** from the logo's paper/background tone
- **Dark section color** a deeper variant of the background for footers

Name each with a project-prefix: `--ll-rust`, `--ll-gold`, `--ll-paper`, etc.

## Step 2: Build CSS custom properties

```css
:root {
  /* Raw logo-sampled colors */
  --ll-rust:       #83421A;   /* primary — buttons, headings */
  --ll-rust-deep:  #6B3512;   /* hover states */
  --ll-bronze:     #6F532B;   /* body text */
  --ll-gold:       #EAAB42;   /* accent / CTA */
  --ll-amber:      #CE9B40;   /* accent hover */
  --ll-glow:       #FEF1C7;   /* light highlights */
  --ll-copper:     #C58F6B;   /* borders, dividers */
  --ll-paper:      #F2EBDC;   /* page background */
  --ll-paper-deep: #B8A992;   /* footer / dark sections */

  /* Semantic aliases so existing code works without full rewrite */
  --color-bg:        var(--ll-paper);
  --color-text:      var(--ll-bronze);
  --color-accent:    var(--ll-gold);
  --color-border:    var(--ll-copper);
}
```

**Why semantic aliases:** Old code references `--color-bg` — remap it to `--ll-paper` instead of hunting down every usage. This lets you swap the palette without refactoring all selectors.

## Step 3: Three-role font system

Match the logo's typography with three font roles. The logo itself reveals what to use:

| Role | Font | Use for |
|------|------|---------|
| **Script** | Parisienne, Great Vibes, Tangerine | Brand name, hero tagline |
| **Label** | Jost, Futura, Montserrat | Section titles, nav links, product names, buttons — wide letter-spacing, uppercase |
| **Body** | Lora, Georgia, Garamond | Body text, descriptions, prices |

```css
:root {
  --font-script: 'Parisienne', 'Great Vibes', cursive;
  --font-label:  'Jost', 'Futura', sans-serif;
  --font-body:   'Lora', Georgia, serif;
}

/* Label-style text class */
.label-wide, .nav-link, .btn, .section-title {
  font-family: var(--font-label);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

The label font is the workhorse — it carries the brand's structured, premium feel through all UI elements. The script font is used sparingly (one or two places max) to echo the logo's signature. The body font is neutral and readable.

## Step 4: Handle logo transparency

- **If the logo has a baked-in paper background**, place it only on sections whose background matches, or replace it with a transparent PNG. A logo with a background rectangle looks broken on mismatched backgrounds.
- **If the logo is transparent**, size it to fit the navbar (`height: 44-56px` for a 72px navbar) and add a subtle hover opacity transition.
- **Prefer a transparent PNG or SVG.** Pixel-keying a JPG works but leaves edge halos at high zoom.

## Step 5: Echo the logo in the hero

Create a signature element that references the logo without copying it:

- An animated radial glow using the logo's flame/gold color
- A gradient overlay sampled from the logo's tones instead of generic black
- A keyframe animation (`candleFlicker`, `pulse`, etc.) that feels organic

```css
.hero-glow {
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(circle,
    rgba(234, 171, 66, 0.35) 0%,    /* accent color from logo */
    rgba(254, 241, 199, 0.12) 40%,  /* highlight color */
    transparent 70%);
  border-radius: 50%;
  animation: candleFlicker 4s ease-in-out infinite;
}

@keyframes candleFlicker {
  0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
  25%      { opacity: 0.85; transform: translateX(-50%) scale(1.08); }
  50%      { opacity: 0.55; transform: translateX(-50%) scale(0.94); }
  75%      { opacity: 0.9; transform: translateX(-50%) scale(1.05); }
}
```

## Common mistakes

- **Using generic black/white overlays** on the hero when the logo has rich warm tones — sample the overlay from the logo's own colors instead.
- **Mixing font systems.** If the logo uses a script face, the site should have at most one script usage — the rest should be label + body.
- **Forgetting to alias old variable names.** When retrofitting an existing site, always create semantic aliases so you don't break existing selectors.
