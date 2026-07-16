'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';

/* ================================================================
   Navbar — sticky, logo + nav links + cart icon with badge
   ================================================================ */

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#shop', label: 'Shop' },
  { href: '#about', label: 'About' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalQty = useCartStore((s) => s.cart.reduce((sum, i) => sum + i.qty, 0));
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-shadow
        bg-paper/90 backdrop-blur-md border-b border-border
        ${scrolled ? 'shadow-md' : ''}`}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-6xl px-4 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#home"
          className="flex items-center gap-0 text-rust font-script text-3xl no-underline hover:opacity-85 transition-opacity"
          aria-label="Lamalight — Home"
        >
          <Image
            src="/lamalight-logo-transparent.png"
            alt="Lamalight — Hand-Poured Soy Wax Candles"
            width={88}
            height={88}
            className="h-[44px] w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-bronze hover:text-rust no-underline
                           tracking-[0.08em] uppercase transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="ms-2">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-rust hover:text-gold transition-colors bg-transparent border-0 cursor-pointer"
              aria-label={`Open cart — ${totalQty} items`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-rust text-[10px] font-bold
                                 w-[18px] h-[18px] rounded-full flex items-center justify-center
                                 leading-none">
                  {totalQty}
                </span>
              )}
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 bg-transparent border-0 cursor-pointer text-rust"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-paper border-t border-border px-4 pb-4">
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 px-2 text-sm font-medium text-bronze hover:text-rust no-underline
                             tracking-[0.08em] uppercase transition-colors"
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => { setCartOpen(true); closeMobile(); }}
                className="flex items-center gap-2 py-3 px-2 text-sm font-medium text-rust hover:text-gold
                           tracking-[0.08em] uppercase bg-transparent border-0 cursor-pointer w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                Cart{totalQty > 0 ? ` (${totalQty})` : ''}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
