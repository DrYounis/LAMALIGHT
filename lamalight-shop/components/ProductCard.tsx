'use client';

import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import { extractVAT, formatSAR } from '@/lib/vat';
import type { Product } from '@/lib/products';

/* ================================================================
   ProductCard — image, name, scent, price + VAT note, add-to-cart
   ================================================================ */

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <div
      className="group bg-paper-mid overflow-hidden transition-shadow hover:shadow-xl
                 hover:-translate-y-1 duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.scent}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="p-5 text-center">
        <h3 className="font-heading text-rust text-lg font-semibold mb-1">
          {product.name}
        </h3>
        <p className="text-text-muted text-sm italic mb-3">
          {product.scent}
        </p>
        <p className="font-heading text-rust text-xl font-semibold mb-1">
          {formatSAR(product.price)}
        </p>
        <p className="text-text-muted text-[11px] mb-4" lang="ar">
          شامل ضريبة القيمة المضافة 15٪ / VAT included
        </p>
        <button
          onClick={() => addToCart(product)}
          className="bg-transparent text-rust border border-rust px-6 py-2 text-xs
                     uppercase tracking-[0.1em] font-medium cursor-pointer
                     transition-colors hover:bg-rust hover:text-white
                     focus-visible:outline-2 focus-visible:outline-rust focus-visible:outline-offset-2"
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
