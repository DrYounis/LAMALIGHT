/* ================================================================
   Footer — rust background, contact info, socials
   ================================================================ */

export default function Footer() {
  return (
    <footer id="contact" className="bg-rust text-white/80 py-12 text-sm">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h5 className="font-heading text-white text-base font-semibold tracking-[0.1em] uppercase mb-3">
            Lamalight
          </h5>
          <p>
            Hand-poured in Hail, Saudi Arabia.
            <br />
            Natural soy wax. Minimalist scents.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h5 className="font-heading text-white text-base font-semibold tracking-[0.1em] uppercase mb-3">
            Contact
          </h5>
          <p className="space-y-1.5">
            <span className="block">
              <span className="inline-block w-5">✉</span> hello@lamalight.sa
            </span>
            <span className="block">
              <span className="inline-block w-5">☏</span> +966 59 041 4349
            </span>
            <span className="block">
              <span className="inline-block w-5">⌂</span> Hail, Saudi Arabia
            </span>
          </p>
        </div>

        {/* Social */}
        <div>
          <h5 className="font-heading text-white text-base font-semibold tracking-[0.1em] uppercase mb-3">
            Follow Us
          </h5>
          <div className="flex gap-4 text-xl">
            <a href="https://www.tiktok.com/@lamalight" aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <hr className="border-white/15 my-8 max-w-6xl mx-4 md:mx-auto" />
      <p className="text-center text-white/50 text-xs">
        &copy; {new Date().getFullYear()} Lamalight. All rights reserved.
      </p>
    </footer>
  );
}
