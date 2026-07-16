'use client';

import { useRef, useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import BrandDivider from '@/components/BrandDivider';
import { PRODUCTS } from '@/lib/products';

/* ================================================================
   ProductGrid — 3-col grid with scroll-reveal via IntersectionObserver
   ================================================================ */

export default function ProductGrid() {
  return (
    <section id="shop" className="py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-heading text-rust text-2xl md:text-3xl text-center font-semibold mb-4
                       tracking-[0.1em] uppercase">
          Our Collection
        </h2>
        <p className="text-text-muted text-sm text-center uppercase tracking-[0.32em] mb-10">
          Small-batch candles, made with natural ingredients
        </p>
        <BrandDivider />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <RevealItem key={product.id} delay={i * 120}>
              <ProductCard product={product} />
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Wraps children in a scroll-reveal container using IntersectionObserver */
function RevealItem({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        transitionDelay: visible ? `${delay}ms` : '0ms',
        ...(visible ? { opacity: 1, transform: 'translateY(0)' } : {}),
      }}
    >
      {children}
    </div>
  );
}
