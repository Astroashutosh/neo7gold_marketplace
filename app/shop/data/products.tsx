export type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  availability: string;
  rating: number;
  reviews: number;
  seller: string;
  images: string[];
  source?: "api" | "static";
  apiSlug?: string;
  apiImage?: string;

  description?: string;

  specifications?: {
    brand?: string;
    condition?: string;
    purity?: string;
    weight?: string;
    color?: string;
    gemstone?: string;
    carat?: string;
    size?: string;
    certification?: string;
    location?: string;
  };

  ratingDistribution?: {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
  };

  customerReviews?: {
    id: string;
    name: string;
    rating: number;
    date: string;
    productName?: string;
    text: string;
    verifiedPurchase?: boolean;
    image?: string;
  }[];
};

export const products: Product[] = [

  /* =====================================================
      BRACELETS
  ===================================================== */

  {
    id: "1",
    name: "Classic Gold Tennis Bracelet",
    sku: "NG-TB-001",
    price: 6500,
    category: "Bracelets",
    availability: "In Stock",
    rating: 4.9,
    reviews: 128,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "Exceptional craftsmanship with a refined silhouette created for timeless elegance.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "8.7 g",
      color: "Rose Gold",
      gemstone: "Diamond",
      carat: "0.35 ct",
      size: "18 cm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "2",
    name: "Elegant Gold Chain Bracelet",
    sku: "NG-CB-002",
    price: 8200,
    category: "Bracelets",
    availability: "In Stock",
    rating: 4.8,
    reviews: 96,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "A sophisticated gold bracelet designed with timeless proportions.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "9.2 g",
      color: "Yellow Gold",
      gemstone: "None",
      size: "19 cm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "3",
    name: "Luxury Gold Bangle",
    sku: "NG-BG-003",
    price: 9500,
    category: "Bracelets",
    availability: "In Stock",
    rating: 4.9,
    reviews: 74,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "A bold and elegant gold bangle crafted for a luxurious statement.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "12.4 g",
      color: "Yellow Gold",
      gemstone: "None",
      size: "18 cm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "4",
    name: "Diamond Gold Bracelet",
    sku: "NG-DB-004",
    price: 12500,
    category: "Bracelets",
    availability: "Limited",
    rating: 5.0,
    reviews: 52,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "A premium gold bracelet enhanced with brilliant diamond detailing.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "10.8 g",
      color: "Yellow Gold",
      gemstone: "Diamond",
      carat: "0.75 ct",
      size: "19 cm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "5",
    name: "Minimal Gold Bracelet",
    sku: "NG-MB-005",
    price: 4800,
    category: "Bracelets",
    availability: "In Stock",
    rating: 4.7,
    reviews: 83,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "A clean and minimal gold bracelet for everyday elegance.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "6.5 g",
      color: "Yellow Gold",
      gemstone: "None",
      size: "18 cm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "6",
    name: "Rose Gold Charm Bracelet",
    sku: "NG-RC-006",
    price: 7200,
    category: "Bracelets",
    availability: "In Stock",
    rating: 4.8,
    reviews: 61,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "A charming rose gold bracelet created with refined details.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "8.1 g",
      color: "Rose Gold",
      gemstone: "None",
      size: "18 cm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "7",
    name: "Premium Gold Link Bracelet",
    sku: "NG-PL-007",
    price: 10800,
    category: "Bracelets",
    availability: "Limited",
    rating: 4.9,
    reviews: 47,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "A bold link bracelet designed with exceptional craftsmanship.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "14.2 g",
      color: "Yellow Gold",
      gemstone: "None",
      size: "20 cm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "8",
    name: "Gold Pearl Bracelet",
    sku: "NG-GP-008",
    price: 8900,
    category: "Bracelets",
    availability: "In Stock",
    rating: 4.8,
    reviews: 39,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "Elegant pearls and gold combined into a timeless bracelet.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "9.5 g",
      color: "Yellow Gold",
      gemstone: "Pearl",
      size: "18 cm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },


  /* =====================================================
      RINGS
  ===================================================== */

  {
    id: "9",
    name: "Classic Diamond Gold Ring",
    sku: "NG-RG-001",
    price: 6500,
    category: "Rings",
    availability: "In Stock",
    rating: 4.9,
    reviews: 128,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "A classic diamond gold ring created for timeless elegance.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "5.4 g",
      color: "Yellow Gold",
      gemstone: "Diamond",
      carat: "0.50 ct",
      size: "Size 7",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "10",
    name: "Luxury Rose Gold Ring",
    sku: "NG-RG-002",
    price: 8200,
    category: "Rings",
    availability: "In Stock",
    rating: 4.8,
    reviews: 96,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "A luxurious rose gold ring with a modern elegant silhouette.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "6.2 g",
      color: "Rose Gold",
      gemstone: "Diamond",
      carat: "0.30 ct",
      size: "Size 7",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "11",
    name: "Elegant Solitaire Ring",
    sku: "NG-RG-003",
    price: 9500,
    category: "Rings",
    availability: "Limited",
    rating: 4.9,
    reviews: 74,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "An elegant solitaire ring featuring a timeless diamond setting.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "5.8 g",
      color: "White Gold",
      gemstone: "Diamond",
      carat: "0.80 ct",
      size: "Size 6",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },


  /* =====================================================
      NECKLACES
  ===================================================== */

  {
    id: "12",
    name: "Royal Gold Necklace",
    sku: "NG-NC-004",
    price: 12500,
    category: "Necklaces",
    availability: "Limited",
    rating: 5,
    reviews: 52,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "A royal gold necklace designed to make an unforgettable statement.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "22.5 g",
      color: "Yellow Gold",
      gemstone: "None",
      size: "45 cm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "13",
    name: "Elegant Gold Chain",
    sku: "NG-NC-005",
    price: 7800,
    category: "Necklaces",
    availability: "In Stock",
    rating: 4.8,
    reviews: 83,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "A refined gold chain designed for everyday luxury.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "15.4 g",
      color: "Yellow Gold",
      gemstone: "None",
      size: "50 cm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "14",
    name: "Diamond Pendant Necklace",
    sku: "NG-NC-006",
    price: 10200,
    category: "Necklaces",
    availability: "In Stock",
    rating: 4.9,
    reviews: 61,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "A sophisticated necklace featuring an elegant diamond pendant.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "12.8 g",
      color: "Yellow Gold",
      gemstone: "Diamond",
      carat: "0.60 ct",
      size: "45 cm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },


  /* =====================================================
      MORE BRACELETS
  ===================================================== */

  {
    id: "15",
    name: "Classic Gold Tennis Bracelet",
    sku: "NG-BR-007",
    price: 10800,
    category: "Bracelets",
    availability: "In Stock",
    rating: 4.9,
    reviews: 47,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "A premium tennis bracelet with timeless gold craftsmanship.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "13.5 g",
      color: "Yellow Gold",
      gemstone: "Diamond",
      carat: "0.40 ct",
      size: "19 cm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "16",
    name: "Elegant Gold Chain Bracelet",
    sku: "NG-BR-008",
    price: 8900,
    category: "Bracelets",
    availability: "In Stock",
    rating: 4.8,
    reviews: 39,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "An elegant gold chain bracelet with refined luxury details.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "11.2 g",
      color: "Yellow Gold",
      gemstone: "None",
      size: "20 cm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "17",
    name: "Luxury Gold Bangle",
    sku: "NG-BR-009",
    price: 9500,
    category: "Bracelets",
    availability: "In Stock",
    rating: 4.9,
    reviews: 74,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "A luxurious gold bangle crafted for a bold elegant appearance.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "14.8 g",
      color: "Yellow Gold",
      gemstone: "None",
      size: "18 cm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },


  /* =====================================================
      EARRINGS
  ===================================================== */

  {
    id: "18",
    name: "Diamond Gold Earrings",
    sku: "NG-ER-010",
    price: 7200,
    category: "Earrings",
    availability: "In Stock",
    rating: 4.8,
    reviews: 61,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "Elegant diamond gold earrings designed for timeless sophistication.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "6.8 g",
      color: "Yellow Gold",
      gemstone: "Diamond",
      carat: "0.45 ct",
      size: "25 mm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "19",
    name: "Luxury Pearl Earrings",
    sku: "NG-ER-011",
    price: 6800,
    category: "Earrings",
    availability: "In Stock",
    rating: 4.7,
    reviews: 52,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "Luxury pearl earrings crafted with elegant gold details.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "5.9 g",
      color: "Yellow Gold",
      gemstone: "Pearl",
      size: "22 mm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },

  {
    id: "20",
    name: "Rose Gold Drop Earrings",
    sku: "NG-ER-012",
    price: 8300,
    category: "Earrings",
    availability: "Limited",
    rating: 4.9,
    reviews: 45,
    seller: "Neos7 Gold Joaillerie",

    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1400&auto=format&fit=crop",
    ],

    description:
      "Elegant rose gold drop earrings designed for special occasions.",

    specifications: {
      brand: "Neos7 Gold",
      condition: "New",
      purity: "750 Gold",
      weight: "7.2 g",
      color: "Rose Gold",
      gemstone: "Diamond",
      carat: "0.25 ct",
      size: "35 mm",
      certification: "IGI Certified",
      location: "Milan, Italy",
    },
  },
];