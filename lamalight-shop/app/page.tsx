import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import About from '@/components/About';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';

/* ================================================================
   Home Page — assembles all sections
   ================================================================ */

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductGrid />
        <About />
        <Reviews />
      </main>
      <Footer />
      <CartDrawer />
      <CheckoutModal />
    </>
  );
}
