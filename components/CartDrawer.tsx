'use client';

import { useCartStore } from '@/lib/store';
import { formatSAR } from '@/lib/vat';

/* ================================================================
   CartDrawer — slide-in from right, offcanvas-style cart
   ================================================================ */

export default function CartDrawer() {
  const cart = useCartStore((s) => s.cart);
  const cartOpen = useCartStore((s) => s.cartOpen);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const setCheckoutOpen = useCartStore((s) => s.setCheckoutOpen);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const decreaseQty = useCartStore((s) => s.decreaseQty);

  const totalInclVAT = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const vat = totalInclVAT * 15 / 115;
  const subtotal = totalInclVAT - vat;

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 end-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl
                    transform transition-transform duration-300 ease-in-out
                    ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-heading text-rust text-lg font-semibold tracking-[0.08em] uppercase m-0">
            Your Cart
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-text-muted hover:text-rust bg-transparent border-0 cursor-pointer text-xl leading-none p-1"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col h-[calc(100%-56px)]">
          <div className="flex-1 overflow-y-auto px-5">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-text-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} className="mx-auto mb-3 opacity-40">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <p className="text-sm">Your cart is empty.</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-3 text-xs uppercase tracking-wider text-rust hover:text-gold
                             bg-transparent border-0 cursor-pointer underline"
                >
                  Browse Candles
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-border list-none m-0 p-0">
                {cart.map((item) => (
                  <li key={item.product.id} className="flex items-center gap-3 py-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-bronze truncate">{item.product.name}</p>
                      <p className="text-xs text-text-muted">{formatSAR(item.product.price)} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.product.id)}
                        className="w-7 h-7 border border-border bg-white text-sm flex items-center
                                   justify-center cursor-pointer hover:border-rust transition-colors"
                        aria-label={`Decrease ${item.product.name} quantity`}
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                      <button
                        onClick={() => addToCart(item.product)}
                        className="w-7 h-7 border border-border bg-white text-sm flex items-center
                                   justify-center cursor-pointer hover:border-rust transition-colors"
                        aria-label={`Increase ${item.product.name} quantity`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-600 bg-transparent border-0 cursor-pointer p-1
                                 hover:text-red-800 transition-colors"
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Summary */}
          {cart.length > 0 && (
            <div className="border-t border-border px-5 py-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal (excl. VAT)</span>
                <span>{formatSAR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT 15%</span>
                <span>{formatSAR(vat)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-border pt-2 mt-1">
                <span>Total (VAT included)</span>
                <span>{formatSAR(totalInclVAT)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-3 bg-rust text-white py-3 text-sm uppercase
                           tracking-[0.1em] font-medium cursor-pointer border-0
                           hover:bg-rust-deep transition-colors
                           focus-visible:outline-2 focus-visible:outline-rust focus-visible:outline-offset-2"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
