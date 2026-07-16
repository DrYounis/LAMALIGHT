import type { Metadata } from 'next';
import { Parisienne, Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

/* ================================================================
   Fonts — Parisienne (script), Playfair Display (headings), Inter (body)
   ================================================================ */
const parisienne = Parisienne({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

/* ================================================================
   Metadata
   ================================================================ */
export const metadata: Metadata = {
  metadataBase: new URL('https://lamalight.vercel.app'),
  title: 'LamaLight — Handcrafted Aromatic Blends',
  description:
    'Hand-poured soy wax candles, crafted with care for a warm home. Minimalist scents, natural ingredients. شحن لجميع مناطق السعودية.',
  openGraph: {
    title: 'LamaLight — Handcrafted Aromatic Blends',
    description:
      'Hand-poured soy wax candles. Natural soy wax, minimal scents, Saudi shipping.',
    images: ['/lamalight-logo-transparent.png'],
  },
};

/* ================================================================
   Root Layout — RTL-ready, fonts injected via CSS variables
   ================================================================ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${parisienne.variable} ${playfairDisplay.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-paper text-bronze font-sans">
        {children}
      </body>
    </html>
  );
}
