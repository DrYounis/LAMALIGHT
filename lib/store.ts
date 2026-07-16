'use client';

import { create } from 'zustand';
import type { Product } from '@/lib/products';

/* ================================================================
   Zustand Cart Store — persisted to localStorage
   ================================================================ */

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartState {
  cart: CartItem[];
  /** Whether the cart offcanvas is open */
  cartOpen: boolean;
  /** Whether the checkout modal is open */
  checkoutOpen: boolean;

  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  decreaseQty: (productId: number) => void;
  setCartOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  getTotalQty: () => number;
  getCartBreakdown: () => { subtotal: number; vat: number; total: number };
}

/** Persist cart to localStorage (not the UI state) */
function persistCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('lamalight-cart', JSON.stringify(items));
  } catch {
    // quota exceeded or private browsing — silently ignore
  }
}

/** Hydrate cart from localStorage */
function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('lamalight-cart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: loadCart(),

  cartOpen: false,
  checkoutOpen: false,

  addToCart: (product: Product) => {
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === product.id);
      let next: CartItem[];
      if (existing) {
        next = state.cart.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        next = [...state.cart, { product, qty: 1 }];
      }
      persistCart(next);
      return { cart: next };
    });
  },

  removeFromCart: (productId: number) => {
    set((state) => {
      const next = state.cart.filter((item) => item.product.id !== productId);
      persistCart(next);
      return { cart: next };
    });
  },

  decreaseQty: (productId: number) => {
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === productId);
      if (!existing) return state;
      let next: CartItem[];
      if (existing.qty > 1) {
        next = state.cart.map((item) =>
          item.product.id === productId ? { ...item, qty: item.qty - 1 } : item
        );
      } else {
        next = state.cart.filter((item) => item.product.id !== productId);
      }
      persistCart(next);
      return { cart: next };
    });
  },

  setCartOpen: (open: boolean) => set({ cartOpen: open }),
  setCheckoutOpen: (open: boolean) => set({ checkoutOpen: open }),

  getTotalQty: () => get().cart.reduce((sum, item) => sum + item.qty, 0),

  getCartBreakdown: () => {
    const totalInclVAT = get().cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    const vat = totalInclVAT * 15 / 115;
    const subtotal = totalInclVAT - vat;
    return { subtotal, vat, total: totalInclVAT };
  },
}));
