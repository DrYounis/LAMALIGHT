---
name: saudi-vat-ecommerce
description: Saudi VAT-inclusive pricing: display VAT-inclusive prices, extract VAT backwards (× 15/115), show bilingual Arabic/English VAT notes, and cart breakdown with subtotal/VAT/total
source: auto-skill
extracted_at: '2026-07-16T14:54:07.514Z'
---

# Saudi VAT-Inclusive E-Commerce Pricing

## The rule

In Saudi e-commerce, prices must be displayed VAT-inclusive (15%). The VAT is *extracted* backwards from the displayed price — you never add it on top. Every price shown to the customer already includes the 15%.

## VAT calculation

```
VAT = total_inclusive × (15 / 115)
Subtotal (excl. VAT) = total_inclusive × (100 / 115)
```

Verify: `subtotal + vat === total_inclusive` (within floating-point tolerance).

## Display conventions

1. **Under every product price**, show a small bilingual note:
   ```
   شامل ضريبة القيمة المضافة 15٪ / VAT included
   ```
   Use `<span lang="ar">` for the Arabic portion.

2. **Cart / checkout breakdown** must show three lines:
   - Subtotal (excl. VAT)
   - VAT 15%
   - **Total (VAT included)** — this matches the displayed prices

3. **Currency format**: `ر.س 85.00` (Riyal symbol then amount to 2 decimals).

## Code pattern

```javascript
function getCartBreakdown(cartItems) {
  // Each item.price is VAT-inclusive
  const totalInclVAT = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vat = totalInclVAT * 15 / 115;
  const subtotal = totalInclVAT - vat;
  return { subtotal, vat, total: totalInclVAT };
}

function formatSAR(amount) {
  return 'ر.س ' + amount.toFixed(2);
}
```

## Common mistake to avoid

Do NOT add 15% to a subtotal. That gives the wrong total. The customer-facing price IS the VAT-inclusive price. VAT is always extracted, never added.

## RTL / Arabic readiness

Keep `dir="ltr"` on `<html>` but use `lang="ar"` on Arabic text spans. Structure CSS with logical properties or RTL override blocks so switching to `dir="rtl"` later requires minimal changes.
