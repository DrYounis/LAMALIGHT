'use client';

/* ================================================================
   About — brand story section
   ================================================================ */

export default function About() {
  return (
    <section id="about" className="py-24 md:py-28 bg-white">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2 className="font-heading text-rust text-2xl md:text-3xl font-semibold mb-4
                       tracking-[0.1em] uppercase">
          Our Story
        </h2>
        <p className="text-text-muted text-sm uppercase tracking-[0.32em] mb-10">
          The art of slow living, captured in wax
        </p>

        <div className="reveal space-y-5 text-bronze leading-relaxed text-base">
          <p>
            Lamalight was born from a simple belief: that a candle should do more than
            just burn. It should transform a room. Every Lamalight candle is hand-poured
            in small batches using 100% natural soy wax, lead-free cotton wicks, and
            premium fragrance oils. No parabens, no phthalates, no shortcuts.
          </p>
          <p>
            We believe in quality over quantity. Each scent is carefully developed over
            weeks — layered, balanced, and never overwhelming. Just pure, clean fragrance
            that fills your home with warmth.
          </p>
        </div>
      </div>
    </section>
  );
}
