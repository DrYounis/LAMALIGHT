/* ================================================================
   Product & Review Data
   Prices are VAT-INCLUSIVE (15% Saudi VAT)
   Photos: real LamaLight product shots
   ================================================================ */

export interface Product {
  id: number;
  name: string;
  scent: string;
  price: number; // SAR, VAT-inclusive
  image: string;
}

export interface Review {
  text: string;
  author: string;
  stars: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Rose Bouquet Candle',
    scent: 'Sculpted wax roses with a lit center — elegant centerpiece',
    price: 120,
    image: '/images/rose-bouquet-candle.jpg',
  },
  {
    id: 2,
    name: 'Bouquet Candle',
    scent: 'Dried roses, lavender & eucalyptus on a hand-poured base',
    price: 110,
    image: '/images/bouquet-candle.jpg',
  },
  {
    id: 3,
    name: 'Personalized Candle',
    scent: 'Custom brass name-tag candle — صممي شمعتك',
    price: 95,
    image: '/images/personalized-candle.jpg',
  },
  {
    id: 4,
    name: 'Fleurs d\'Ivoire',
    scent: 'Ivory floral candle beside a sunlit French window',
    price: 85,
    image: '/images/french-window-candle.jpg',
  },
  {
    id: 5,
    name: 'Luxury Gift Box',
    scent: 'The full unboxing experience — candle + dried florals',
    price: 150,
    image: '/images/luxury-gift-box.jpg',
  },
];

export const REVIEWS: Review[] = [
  {
    text: 'The Rose Bouquet Candle is absolutely stunning. It became the centerpiece of my dinner table — everyone asked where I got it.',
    author: 'Noura A.',
    stars: 5,
  },
  {
    text: 'Finally, a candle brand that understands subtlety. My personalized candle with the brass name tag was the perfect gift.',
    author: 'Khalid S.',
    stars: 5,
  },
  {
    text: 'I ordered the Luxury Gift Box for my sister\'s birthday. The unboxing was an experience in itself — beautifully packaged with dried flowers.',
    author: 'Reem M.',
    stars: 5,
  },
];
