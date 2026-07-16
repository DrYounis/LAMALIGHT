# Lamalight — Hand-Poured Soy Wax Candles

Single-page minimalist e-commerce website for a Saudi handmade candle brand.

## Quick Start

Open `candle-shop.html` in any browser — no build step, no server required.

## Features

- **Single file** — HTML + CSS + JavaScript, Bootstrap 5 via CDN
- **Saudi-ready** — prices in SAR (ر.س), 15% VAT included throughout
- **Apple Pay** — `ApplePaySession` v6 flow with availability detection; TODO stubs for Moyasar / Tap Payments / HyperPay
- **Working cart** — add/remove items, quantity controls, VAT breakdown (subtotal + VAT 15% + total)
- **Responsive** — mobile-first, 3-col → 2-col → 1-col grid

## Design

- Logo-sampled palette: rust `#83421A`, gold `#EAAB42`, bronze `#6F532B`, copper `#C58F6B`, paper cream `#F2EBDC`
- Three-role typography: Parisienne (script), Jost (labels), Lora (body)
- Animated candle glow in hero section

## File Structure

```
├── candle-shop.html              # Main site
├── lamalight-logo-transparent.png # Brand logo
└── README.md
```

## Deploy

Drop the folder on any static host (Netlify, Vercel, GitHub Pages) — zero configuration.

### Apple Pay — Production Setup

Replace the `TODO` stubs in `candle-shop.html` with real calls to your Saudi payment gateway:

- [Moyasar](https://moyasar.com/docs/api/apple-pay)
- [Tap Payments](https://developers.tap.company/docs/apple-pay)
- [HyperPay](https://hyperpay.com/documentation)

## License

All rights reserved — Lamalight.
