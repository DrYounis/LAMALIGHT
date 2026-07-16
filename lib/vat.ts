/* ================================================================
   VAT Utilities — Saudi 15% VAT
   ================================================================ */

/**
 * Extract VAT and subtotal from a VAT-inclusive price.
 * Saudi VAT = 15%.
 *   VAT = priceInclusive × (15 / 115)
 *   Subtotal (excl. VAT) = priceInclusive × (100 / 115)
 */
export function extractVAT(priceInclusive: number): { subtotal: number; vat: number } {
  const vat = priceInclusive * 15 / 115;
  const subtotal = priceInclusive - vat;
  return { subtotal, vat };
}

/**
 * Format a number as Saudi Riyal.
 * Example: formatSAR(85.5) → "ر.س 85.50"
 */
export function formatSAR(amount: number): string {
  return `ر.س ${amount.toFixed(2)}`;
}
