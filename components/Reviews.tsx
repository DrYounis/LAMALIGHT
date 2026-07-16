'use client';

import { REVIEWS } from '@/lib/products';

/* ================================================================
   Reviews — 3 customer testimonials
   ================================================================ */

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-heading text-rust text-2xl md:text-3xl text-center font-semibold mb-4
                       tracking-[0.1em] uppercase">
          Kind Words
        </h2>
        <p className="text-text-muted text-sm text-center uppercase tracking-[0.32em] mb-12">
          What our customers say about Lamalight
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="reveal bg-white border border-border p-7 text-center h-full"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="text-gold text-base mb-3">
                {'★'.repeat(review.stars)}
              </div>
              <p className="text-bronze italic text-sm leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="font-heading text-rust text-sm font-semibold tracking-wide uppercase">
                — {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
