'use client';

import Image from 'next/image';
import Link from 'next/link';

/* ================================================================
   Hero — cream gradient + radial glow + paper texture + candle flicker
   ================================================================ */

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #EFE6D3 0%, #F2EBDC 40%, #EAE0CB 100%)',
      }}
      aria-label="Hero banner"
    >
      {/* Paper-fibre texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(184,169,146,0.3) 2px,
            rgba(184,169,146,0.3) 3px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Warm radial glow behind the logo */}
      <div
        className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none
                   motion-safe:animate-candle-flicker"
        style={{
          background: 'radial-gradient(circle, rgba(254,241,199,0.9) 0%, rgba(254,241,199,0.3) 35%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
        <Image
          src="/lamalight-logo-transparent.png"
          alt="Lamalight — Handcrafted Aromatic Blends"
          width={220}
          height={220}
          className="mx-auto mb-6 w-[180px] h-auto motion-safe:animate-candle-flicker"
          priority
        />
        <h1 className="font-script text-rust-deep text-5xl md:text-6xl font-normal mb-4 tracking-wide">
          Light Your Space
        </h1>
        <p className="text-bronze/85 text-sm md:text-base uppercase tracking-[0.32em] mb-8 max-w-sm mx-auto">
          Hand-Poured Soy Wax Candles
        </p>
        <Link
          href="#shop"
          className="inline-block bg-gold text-rust font-medium px-10 py-3.5 text-sm uppercase
                     tracking-[0.12em] no-underline transition-colors hover:bg-amber"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
