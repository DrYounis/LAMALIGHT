'use client';

import { useState, useEffect, useCallback } from 'react';
import { useCartStore } from '@/lib/store';
import { formatSAR } from '@/lib/vat';

/* ================================================================
   CheckoutModal — VAT breakdown, Apple Pay, Pay by Card
   ================================================================ */

export default function CheckoutModal() {
  const checkoutOpen = useCartStore((s) => s.checkoutOpen);
  const setCheckoutOpen = useCartStore((s) => s.setCheckoutOpen);
  const cart = useCartStore((s) => s.cart);

  const [applePayAvailable, setApplePayAvailable] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const totalInclVAT = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const vat = totalInclVAT * 15 / 115;
  const subtotal = totalInclVAT - vat;

  // Detect Apple Pay availability
  useEffect(() => {
    if (typeof window !== 'undefined' && 'ApplePaySession' in window) {
      const ap = window as unknown as { ApplePaySession: { canMakePayments: () => boolean } };
      setApplePayAvailable(ap.ApplePaySession?.canMakePayments() ?? false);
    }
  }, []);

  const handleApplePay = useCallback(() => {
    if (cart.length === 0 || !applePayAvailable) return;

    const lineItems = cart.map((item) => ({
      label: item.product.name,
      amount: (item.product.price * item.qty).toFixed(2),
    }));
    lineItems.push({ label: 'VAT 15%', amount: vat.toFixed(2) });

    const paymentRequest = {
      countryCode: 'SA',
      currencyCode: 'SAR',
      supportedNetworks: ['mada', 'visa', 'masterCard', 'amex'],
      merchantCapabilities: ['supports3DS'],
      total: { label: 'Lamalight', amount: totalInclVAT.toFixed(2), type: 'final' },
      lineItems,
    };

    // ApplePaySession only exists in Safari; gate behind feature detection
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const APS = (window as any).ApplePaySession;
    const session = new APS(6, paymentRequest);

    /*
      TODO: onvalidatemerchant — Merchant Validation
      -------------------------------------------------------
      Call YOUR server endpoint which calls Apple's validation server
      with your Merchant Identifier and Payment Processing Certificate.

      Saudi gateways:
        • Moyasar  — https://moyasar.com/docs/api/apple-pay
        • Tap Payments — https://developers.tap.company/docs/apple-pay
        • HyperPay — https://hyperpay.com/documentation

      Example (Moyasar):
        fetch('https://api.moyasar.com/v1/apple_pay/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            validation_url: event.validationURL,
            domain: window.location.hostname,
            publishable_api_key: 'pk_live_xxxxxxxxx',
          }),
        })
        .then(res => res.json())
        .then(data => session.completeMerchantValidation(data));
    */
    session.onvalidatemerchant = (event: unknown) => {
      console.warn('[Apple Pay] Merchant validation triggered. Replace with real gateway call.');
    };

    /*
      TODO: onpaymentauthorized — Process the Payment
      -------------------------------------------------------
      Send event.payment.token to your server → payment gateway.
    */
    session.onpaymentauthorized = (event: unknown) => {
      console.warn('[Apple Pay] Payment authorized. Replace with real gateway call.');
    };

    session.onpaymentmethodselected = (event: unknown) => {
      session.completePaymentMethodSelection({
        newTotal: { label: 'Lamalight', amount: totalInclVAT.toFixed(2), type: 'final' },
        newLineItems: lineItems,
      });
    };

    session.onshippingcontactselected = (event: unknown) => {
      session.completeShippingContactSelection({
        newTotal: { label: 'Lamalight', amount: totalInclVAT.toFixed(2), type: 'final' },
        newLineItems: lineItems,
        newShippingMethods: [],
      });
    };

    session.begin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, applePayAvailable]);

  if (!checkoutOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={() => setCheckoutOpen(false)}
        aria-hidden="true"
      >
        {/* Modal */}
        <div
          className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Checkout"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="font-heading text-rust text-lg font-semibold tracking-[0.08em] uppercase m-0">
              Checkout
            </h2>
            <button
              onClick={() => setCheckoutOpen(false)}
              className="text-text-muted hover:text-rust bg-transparent border-0 cursor-pointer text-xl leading-none p-1"
              aria-label="Close checkout"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-4">
            {/* VAT Breakdown */}
            <div className="text-sm space-y-1">
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
            </div>

            <hr className="border-border" />

            {/* Contact fields — controlled, no <form> submit */}
            <div className="space-y-3">
              <div>
                <label htmlFor="checkout-name" className="block text-xs uppercase tracking-wider text-text-muted mb-1">
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-rust
                             transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="checkout-email" className="block text-xs uppercase tracking-wider text-text-muted mb-1">
                  Email
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-rust
                             transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="checkout-phone" className="block text-xs uppercase tracking-wider text-text-muted mb-1">
                  Phone
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-rust
                             transition-colors"
                  placeholder="+966 5X XXX XXXX"
                />
              </div>
            </div>

            {/* Apple Pay */}
            {applePayAvailable ? (
              <button
                className="apple-pay-button w-full"
                onClick={handleApplePay}
                aria-label="Pay with Apple Pay"
              />
            ) : (
              <button
                onClick={() => {
                  // TODO: integrate Saudi payment gateway (Moyasar / Tap / HyperPay)
                  alert('Pay by Card — gateway integration pending.');
                }}
                className="w-full bg-rust text-white py-3 text-sm uppercase tracking-[0.1em]
                           font-medium cursor-pointer border-0 hover:bg-rust-deep transition-colors
                           focus-visible:outline-2 focus-visible:outline-rust focus-visible:outline-offset-2"
              >
                Pay by Card
              </button>
            )}

            <p className="text-text-muted text-[11px] text-center">
              <span className="inline-block me-1">🔒</span>
              Secured by Saudi Payment Gateway
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
