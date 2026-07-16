/* ================================================================
   Product & Review Data
   Prices are VAT-INCLUSIVE (15% Saudi VAT)
   ================================================================ */

export interface Product {
  id: number;
  name: string;
  scent: string;
  price: number; // SAR, VAT-inclusive
  image: string; // Unsplash URL
}

export interface Review {
  text: string;
  author: string;
  stars: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Vanilla Bean',
    scent: 'Warm vanilla with soft caramel undertones',
    price: 85,
    image: 'https://images.unsplash.com/photo-1603483080228-26569b0bad94?w=600&q=80',
  },
  {
    id: 2,
    name: 'Lavender Fields',
    scent: 'French lavender with a touch of bergamot',
    price: 95,
    image: 'https://images.unsplash.com/photo-1631049305153-08df915f2e30?w=600&q=80',
  },
  {
    id: 3,
    name: 'Amber & Oud',
    scent: 'Rich amber blended with smoky Arabian oud',
    price: 120,
    image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&q=80',
  },
  {
    id: 4,
    name: 'Rose Garden',
    scent: 'Damascus rose petals with a dewy finish',
    price: 90,
    image: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?w=600&q=80',
  },
  {
    id: 5,
    name: 'Cedar & Sage',
    scent: 'Earthy cedarwood and wild sage from the mountains',
    price: 105,
    image: 'https://images.unsplash.com/photo-1603483080309-b9e8bc75c98f?w=600&q=80',
  },
  {
    id: 6,
    name: 'Cinnamon Chai',
    scent: 'Spiced cinnamon with a hint of cardamom and clove',
    price: 75,
    image: 'https://images.unsplash.com/photo-1596780280134-7a1da4df4b9e?w=600&q=80',
  },
];

export const REVIEWS: Review[] = [
  {
    text: 'The Amber & Oud candle is absolutely divine. It fills my entire living room with the most elegant, warm scent. I\'ve already ordered three more as gifts.',
    author: 'Noura A.',
    stars: 5,
  },
  {
    text: 'Finally, a candle brand that understands subtlety. Lamalight\'s Lavender Fields is not overpowering — just a gentle, calming presence. Perfect for my evening routine.',
    author: 'Khalid S.',
    stars: 5,
  },
  {
    text: 'I love that these are made locally with natural ingredients. The packaging is beautiful and the burn time is excellent. Cinnamon Chai is my forever favorite.',
    author: 'Reem M.',
    stars: 5,
  },
];
