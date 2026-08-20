export type ProductCategory =
  | 'T-Shirts'
  | 'Hoodies'
  | 'Jeans'
  | 'Shirts'
  | 'Cargo Pants'
  | 'Jackets'
  | 'Oversized Tees'
  | 'Streetwear';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  isNew?: boolean;
  isFeatured?: boolean;
  tag?: string;
}

export const categories: {
  name: ProductCategory;
  image: string;
  description: string;
}[] = [
  {
    name: 'T-Shirts',
    image:
      'https://images.pexels.com/photos/20772232/pexels-photo-20772232.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Essential everyday tees',
  },
  {
    name: 'Hoodies',
    image:
      'https://images.pexels.com/photos/18078030/pexels-photo-18078030.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Layered warmth & style',
  },
  {
    name: 'Jeans',
    image:
      'https://images.pexels.com/photos/15265297/pexels-photo-15265297.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Denim for every fit',
  },
  {
    name: 'Shirts',
    image:
      'https://images.pexels.com/photos/14325697/pexels-photo-14325697.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Sharp & refined',
  },
  {
    name: 'Cargo Pants',
    image:
      'https://images.pexels.com/photos/17977206/pexels-photo-17977206.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Utility meets street',
  },
  {
    name: 'Jackets',
    image:
      'https://images.pexels.com/photos/18326063/pexels-photo-18326063.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Outerwear that defines',
  },
  {
    name: 'Oversized Tees',
    image:
      'https://images.pexels.com/photos/32490938/pexels-photo-32490938.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Relaxed contemporary fits',
  },
  {
    name: 'Streetwear',
    image:
      'https://images.pexels.com/photos/11917075/pexels-photo-11917075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Urban culture essentials',
  },
];

const baseColors = [
  { name: 'Black', hex: '#0a0a0a' },
  { name: 'White', hex: '#f5f5f0' },
  { name: 'Cream', hex: '#e8e0d0' },
  { name: 'Gray', hex: '#6b6b6b' },
  { name: 'Olive', hex: '#5a5a2a' },
  { name: 'Navy', hex: '#1a1a3a' },
];

const standardSizes = ['S', 'M', 'L', 'XL', 'XXL'];
const pantSizes = ['28', '30', '32', '34', '36', '38'];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Essential Black Tee',
    category: 'T-Shirts',
    price: 1299,
    originalPrice: 1799,
    rating: 4.7,
    reviews: 214,
    image:
      'https://images.pexels.com/photos/20772232/pexels-photo-20772232.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    images: [
      'https://images.pexels.com/photos/20772232/pexels-photo-20772232.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/18403112/pexels-photo-18403112.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    colors: [baseColors[0], baseColors[1], baseColors[3]],
    sizes: standardSizes,
    description:
      'A wardrobe staple crafted from 100% premium combed cotton. The Essential Black Tee features a tailored fit, ribbed crew neckline, and a soft hand-feel that only gets better with wear.',
    isFeatured: true,
    tag: 'Bestseller',
  },
  {
    id: 'p2',
    name: 'Urban Hoodie — Olive',
    category: 'Hoodies',
    price: 2499,
    originalPrice: 3299,
    rating: 4.8,
    reviews: 156,
    image:
      'https://images.pexels.com/photos/18078030/pexels-photo-18078030.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    images: [
      'https://images.pexels.com/photos/18078030/pexels-photo-18078030.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/19225018/pexels-photo-19225018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    colors: [baseColors[4], baseColors[0], baseColors[3]],
    sizes: standardSizes,
    description:
      'Heavyweight 400 GSM fleece hoodie with a relaxed fit, kangaroo pocket, and double-lined hood. Built for layering and everyday comfort.',
    isFeatured: true,
    isNew: true,
    tag: 'New',
  },
  {
    id: 'p3',
    name: 'Slim Fit Denim Jeans',
    category: 'Jeans',
    price: 2999,
    originalPrice: 3999,
    rating: 4.6,
    reviews: 189,
    image:
      'https://images.pexels.com/photos/15265297/pexels-photo-15265297.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    images: [
      'https://images.pexels.com/photos/15265297/pexels-photo-15265297.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/17340233/pexels-photo-17340233.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    colors: [baseColors[5], baseColors[0], baseColors[3]],
    sizes: pantSizes,
    description:
      'Premium 12oz stretch denim with a slim tapered fit. Reinforced stitching, five-pocket design, and a dark indigo wash that pairs with everything.',
    isFeatured: true,
  },
  {
    id: 'p4',
    name: 'Striped Formal Shirt',
    category: 'Shirts',
    price: 2199,
    rating: 4.5,
    reviews: 98,
    image:
      'https://images.pexels.com/photos/14325697/pexels-photo-14325697.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    images: [
      'https://images.pexels.com/photos/14325697/pexels-photo-14325697.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/7905889/pexels-photo-7905889.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    colors: [baseColors[1], baseColors[5], baseColors[2]],
    sizes: standardSizes,
    description:
      'A crisp cotton-blend shirt with a modern slim cut, semi-spread collar, and mother-of-pearl buttons. Equally sharp under a blazer or worn open.',
    isFeatured: true,
  },
  {
    id: 'p5',
    name: 'Utility Cargo Pants',
    category: 'Cargo Pants',
    price: 2799,
    originalPrice: 3499,
    rating: 4.7,
    reviews: 142,
    image:
      'https://images.pexels.com/photos/17977206/pexels-photo-17977206.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    images: [
      'https://images.pexels.com/photos/17977206/pexels-photo-17977206.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/18393526/pexels-photo-18393526.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    colors: [baseColors[4], baseColors[3], baseColors[0]],
    sizes: pantSizes,
    description:
      'Ripstop cotton cargo pants with six functional pockets, tapered leg, and adjustable cuff tabs. Engineered for movement and utility.',
    isNew: true,
    tag: 'New',
  },
  {
    id: 'p6',
    name: 'Leather Biker Jacket',
    category: 'Jackets',
    price: 7999,
    originalPrice: 10999,
    rating: 4.9,
    reviews: 76,
    image:
      'https://images.pexels.com/photos/18326063/pexels-photo-18326063.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    images: [
      'https://images.pexels.com/photos/18326063/pexels-photo-18326063.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/35055811/pexels-photo-35055811.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    colors: [baseColors[0], baseColors[5]],
    sizes: standardSizes,
    description:
      'Genuine lambskin leather jacket with asymmetric zip, quilted shoulders, and a satin lining. A timeless investment piece that ages beautifully.',
    isFeatured: true,
    tag: 'Premium',
  },
  {
    id: 'p7',
    name: 'Oversized Drop-Shoulder Tee',
    category: 'Oversized Tees',
    price: 1599,
    originalPrice: 2199,
    rating: 4.6,
    reviews: 167,
    image:
      'https://images.pexels.com/photos/32490938/pexels-photo-32490938.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    images: [
      'https://images.pexels.com/photos/32490938/pexels-photo-32490938.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/32490940/pexels-photo-32490940.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    colors: [baseColors[0], baseColors[2], baseColors[3]],
    sizes: standardSizes,
    description:
      'Boxy oversized fit with dropped shoulders and a heavyweight 240 GSM construction. A modern streetwear silhouette with structured drape.',
    isNew: true,
    tag: 'New',
  },
  {
    id: 'p8',
    name: 'Streetwear Graphic Hoodie',
    category: 'Streetwear',
    price: 2899,
    rating: 4.8,
    reviews: 203,
    image:
      'https://images.pexels.com/photos/11917075/pexels-photo-11917075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    images: [
      'https://images.pexels.com/photos/11917075/pexels-photo-11917075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/14417529/pexels-photo-14417529.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    colors: [baseColors[0], baseColors[4], baseColors[3]],
    sizes: standardSizes,
    description:
      'Oversized streetwear hoodie with bold chest graphic, raw-cut hem, and a heavyweight French terry build. Designed for the urban landscape.',
    isFeatured: true,
  },
  {
    id: 'p9',
    name: 'Classic White Shirt',
    category: 'Shirts',
    price: 1899,
    originalPrice: 2499,
    rating: 4.5,
    reviews: 112,
    image:
      'https://images.pexels.com/photos/7905889/pexels-photo-7905889.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    images: [
      'https://images.pexels.com/photos/7905889/pexels-photo-7905889.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/13339846/pexels-photo-13339846.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    colors: [baseColors[1], baseColors[2]],
    sizes: standardSizes,
    description:
      'A versatile poplin shirt in optic white with a button-down collar and a clean, tailored fit. An essential foundation for any wardrobe.',
  },
  {
    id: 'p10',
    name: 'Distressed Denim Jacket',
    category: 'Jackets',
    price: 4499,
    originalPrice: 5999,
    rating: 4.7,
    reviews: 89,
    image:
      'https://images.pexels.com/photos/22744179/pexels-photo-22744179.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    images: [
      'https://images.pexels.com/photos/22744179/pexels-photo-22744179.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/16319997/pexels-photo-16319997.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    colors: [baseColors[5], baseColors[3]],
    sizes: standardSizes,
    description:
      'A trucker-style denim jacket with strategic distressing, copper hardware, and a medium indigo wash. Layer it over anything.',
    isNew: true,
    tag: 'New',
  },
  {
    id: 'p11',
    name: 'Heavy Cotton Crewneck',
    category: 'T-Shirts',
    price: 1099,
    rating: 4.4,
    reviews: 256,
    image:
      'https://images.pexels.com/photos/20209737/pexels-photo-20209737.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    images: [
      'https://images.pexels.com/photos/20209737/pexels-photo-20209737.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    colors: [baseColors[1], baseColors[3], baseColors[0]],
    sizes: standardSizes,
    description:
      'A 220 GSM crewneck tee with a structured silhouette and a garment-dyed finish. Pre-shrunk and built to hold its shape.',
  },
  {
    id: 'p12',
    name: 'Tech Fleece Joggers',
    category: 'Streetwear',
    price: 2299,
    originalPrice: 2999,
    rating: 4.6,
    reviews: 134,
    image:
      'https://images.pexels.com/photos/32091724/pexels-photo-32091724.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    images: [
      'https://images.pexels.com/photos/32091724/pexels-photo-32091724.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    colors: [baseColors[0], baseColors[3], baseColors[5]],
    sizes: pantSizes,
    description:
      'Fleece-lined joggers with a tapered fit, zip pockets, and ribbed cuffs. Technical comfort that transitions from street to studio.',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(
  product: Product,
  limit = 4
): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}
