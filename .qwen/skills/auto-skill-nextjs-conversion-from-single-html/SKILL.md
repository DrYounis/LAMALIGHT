---
name: nextjs-conversion-from-single-html
description: Convert a single-file HTML/Bootstrap site into a Next.js 16 App Router project with Tailwind v4, TypeScript, and Zustand — preserving all business logic while replacing Bootstrap components with Tailwind utility classes
source: auto-skill
extracted_at: '2026-07-16T15:34:34.743Z'
---

# Convert Single-File HTML to Next.js 16 App Router

When a user has a working single-file HTML site (Bootstrap + vanilla JS) and wants it converted to a production Next.js project, follow this migration pattern. Do NOT invent a new design — carry over the exact brand tokens, business logic, and data.

## Step 1: Scaffold the Next.js project

```bash
npx create-next-app@latest <project-name> --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --no-turbopack --use-npm
npm install zustand
```

Next.js 16 ships with Tailwind v4, which uses **CSS-based `@theme` configuration** — there is no `tailwind.config.ts` file. Define all brand colors inside `app/globals.css` using the `@theme inline` block.

## Step 2: Configure Tailwind v4 @theme

Tailwind v4 replaces the `tailwind.config.ts` extend block with a CSS `@theme inline` directive. Each color becomes `--color-<name>`; fonts become `--font-<name>`.

```css
@import "tailwindcss";

@theme inline {
  --color-rust:       #83421A;
  --color-rust-deep:  #6B3512;
  --color-gold:       #EAAB42;
  --color-paper:      #F2EBDC;
  --color-border:     #E0CFB4;
  --font-script:  'Parisienne', cursive;
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-sans:    'Inter', ui-sans-serif, system-ui, sans-serif;
  --animate-fade-in: fade-in 0.7s ease forwards;
  --animate-candle-flicker: candle-flicker 4s ease-in-out infinite;
}
```

**Why:** Tailwind v4 dropped `tailwind.config.ts` in favor of CSS-first theming. All utility classes like `bg-rust`, `text-gold`, `border-paper`, `font-heading` are now auto-generated from the `@theme` block. Keyframes defined in the same CSS file become `animate-fade-in` and `animate-candle-flicker` utilities.

## Step 3: Set up next/font

Replace `<link>` Google Fonts tags with `next/font/google` in `app/layout.tsx`. This eliminates render-blocking CSS and enables automatic subsetting.

```tsx
import { Parisienne, Playfair_Display, Inter } from 'next/font/google';

const parisienne = Parisienne({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
});
```

Pass CSS variable names to the `<html>` className so Tailwind's `font-script` etc. resolve:

```tsx
<html className={`${parisienne.variable} ${playfairDisplay.variable} ${inter.variable} h-full antialiased`}>
```

## Step 4: Map Bootstrap components to Tailwind patterns

| Bootstrap | Tailwind equivalent |
|-----------|-------------------|
| `navbar navbar-expand-lg fixed-top` | `<nav className="fixed top-0 inset-x-0 z-50 bg-paper/90 backdrop-blur-md border-b">` |
| `col-lg-4 col-md-6` | `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">` |
| `offcanvas offcanvas-end` | Slide-in `<div>` with `translate-x-full`/`translate-x-0` + backdrop |
| `modal fade` | Positioned `<div>` with backdrop, controlled by state boolean |
| `btn btn-dark` | `<button className="bg-rust text-white py-3 uppercase tracking-[0.1em] hover:bg-rust-deep">` |
| `navbar-toggler` with `data-bs-toggle` | `useState` boolean + conditional rendering for mobile menu |
| `fade-in` scroll reveal (Bootstrap JS) | `IntersectionObserver` in a `useEffect` hook, respects `prefers-reduced-motion` |

## Step 5: Replace Bootstrap JS with React state

Every Bootstrap JS behavior gets a direct React equivalent:

- **Collapse navbar**: `const [mobileOpen, setMobileOpen] = useState(false)` — render the mobile menu conditionally.
- **Offcanvas cart**: `const cartOpen = useCartStore(s => s.cartOpen)` — render a fixed-position drawer.
- **Modal checkout**: `const checkoutOpen = useCartStore(s => s.checkoutOpen)` — render a centered overlay.
- **Scroll shadow**: `useEffect` with `scroll` event listener, setting a `scrolled` boolean.
- **Carousel**: Not used — but would be `useState` index + next/prev handlers.

Do NOT import Bootstrap JS or use `data-bs-*` attributes. Every interaction lives in React state.

## Step 6: Move vanilla JS to Zustand store

The original `cart` array and `addToCart`/`removeFromCart` functions become a Zustand store with `create`. Add localStorage persistence manually since Zustand v5 dropped the built-in middleware:

```ts
export const useCartStore = create<CartState>((set, get) => ({
  cart: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lamalight-cart') || '[]') : [],
  addToCart: (product) => set((state) => {
    const next = /* ... mutate cart ... */;
    localStorage.setItem('lamalight-cart', JSON.stringify(next));
    return { cart: next };
  }),
  // ...
}));
```

**Why manual persistence:** Zustand v5 removed `persist` middleware. The pattern above hydrates from localStorage on store creation (guarding against SSR with `typeof window` check) and writes back on every mutation.

## Step 7: Handle browser-only APIs in TypeScript

Apple Pay (`ApplePaySession`, `ApplePayPaymentRequest`) and other browser-specific globals don't exist in the TypeScript DOM types used by Next.js builds. Three fixes:

1. **Feature detection**: Check `'ApplePaySession' in window` before using it.
2. **Cast through `any`** when constructing the session:
   ```ts
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const APS = (window as any).ApplePaySession;
   const session = new APS(6, paymentRequest);
   ```
3. **Type callback parameters explicitly** to avoid implicit-any errors:
   ```ts
   session.onvalidatemerchant = (event: unknown) => { /* ... */ };
   ```

Do NOT attempt to import Apple Pay types or use `ApplePayJS` namespace — they are not available in the standard TypeScript DOM lib.

## Step 8: Vercel deployment

For single-file HTML sites: rename to `index.html` (Vercel requires the default document name).

For Next.js projects: the build output is auto-detected — no special config needed. Set `metadataBase` in layout.tsx to the production URL:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://lamalight.vercel.app'),
  // ...
};
```

## Step 9: Final checklist

- [ ] `npm run build` passes with zero errors (warnings only for non-critical things)
- [ ] All Bootstrap classes replaced with Tailwind utilities
- [ ] No `data-bs-*` attributes remain
- [ ] All Google Fonts moved to `next/font/google`
- [ ] All `<img>` tags replaced with `next/image` (with `width`/`height` or `fill` + `sizes`)
- [ ] VAT calculation preserved exactly (extract, never add)
- [ ] Apple Pay gated behind feature detection, stubbed with clear TODOs
- [ ] RTL-ready: `dir` on `<html>` configurable, logical Tailwind utilities used
- [ ] `prefers-reduced-motion` respected in all animations and `IntersectionObserver` hooks
