'use client';

/* ================================================================
   BrandDivider — copper gradient line + gold accent dot
   ================================================================ */

export default function BrandDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-hidden="true">
      <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-copper" />
      <span className="text-gold text-xs tracking-widest select-none">✦</span>
      <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-copper" />
    </div>
  );
}
