import { NextResponse } from 'next/server';

/* ================================================================
   POST /api/checkout — placeholder for Saudi payment gateway
   ================================================================

   TODO: Replace this with a real integration.
   Supported Saudi gateways:
     • Moyasar  — https://moyasar.com/docs/api
     • Tap Payments — https://developers.tap.company/docs
     • HyperPay — https://hyperpay.com/documentation

   Expected request body:
   {
     name: string;
     email: string;
     phone: string;
     cart: { productId: number; qty: number }[];
     // Apple Pay token if Apple Pay was used
     applePayToken?: object;
   }
*/
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // TODO: Validate input, calculate total, call payment gateway
    console.log('[Checkout] Received order:', body);

    return NextResponse.json(
      { status: 'pending', message: 'Payment gateway integration pending — see route.ts TODO' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
