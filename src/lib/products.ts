export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number; // PKR
  compareAt?: number;
  category: "apparel" | "home" | "beauty" | "accessories";
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  rating: number;
  reviews: number;
  description: string;
  swatch: string; // gradient
};

export const CATEGORIES = [
  { slug: "apparel", label: "Apparel" },
  { slug: "home", label: "Home & Living" },
  { slug: "beauty", label: "Beauty" },
  { slug: "accessories", label: "Accessories" },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "p1", slug: "linen-kurta-sand", name: "Linen Kurta — Sand",
    price: 4890, compareAt: 6200, category: "apparel",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Sand", hex: "#d9c9ae" }, { name: "Clay", hex: "#b98368" }, { name: "Slate", hex: "#5c6570" }],
    rating: 4.8, reviews: 214,
    description: "Breathable pure linen kurta cut for everyday ease. Hand-finished seams in Lahore.",
    swatch: "linear-gradient(135deg,#e8dcc4,#c9b291)",
  },
  {
    id: "p2", slug: "ceramic-mug-set", name: "Ceramic Mug Set (2)",
    price: 2450, category: "home",
    colors: [{ name: "Cream", hex: "#eee2c9" }, { name: "Terracotta", hex: "#c67b56" }],
    rating: 4.9, reviews: 87,
    description: "Wheel-thrown stoneware mugs, dishwasher and microwave safe. Made in Multan.",
    swatch: "linear-gradient(135deg,#f2e6cd,#d6a37b)",
  },
  {
    id: "p3", slug: "rose-face-mist", name: "Damask Rose Face Mist",
    price: 1290, category: "beauty",
    rating: 4.7, reviews: 342,
    description: "Steam-distilled rose water from Kasur. Cooling, hydrating, no additives.",
    swatch: "linear-gradient(135deg,#f7d9d6,#e0a1a1)",
  },
  {
    id: "p4", slug: "leather-tote-tan", name: "Handstitched Tote — Tan",
    price: 8990, compareAt: 11500, category: "accessories",
    colors: [{ name: "Tan", hex: "#b98a5a" }, { name: "Black", hex: "#1c1c1c" }],
    rating: 4.9, reviews: 128,
    description: "Vegetable-tanned leather, brass hardware, cotton canvas lining. Ages beautifully.",
    swatch: "linear-gradient(135deg,#d9b184,#8f5f36)",
  },
  {
    id: "p5", slug: "cotton-throw", name: "Handloom Cotton Throw",
    price: 3600, category: "home",
    colors: [{ name: "Ivory", hex: "#f0e8d6" }, { name: "Indigo", hex: "#2f3e5b" }],
    rating: 4.6, reviews: 54,
    description: "Woven on traditional pit looms. Soft, breathable, and generously sized.",
    swatch: "linear-gradient(135deg,#ede3cd,#9aa8b8)",
  },
  {
    id: "p6", slug: "silk-scarf", name: "Silk Scarf — Botanical",
    price: 3200, category: "accessories",
    rating: 4.8, reviews: 76,
    description: "Hand-rolled edges. Digitally printed floral motifs inspired by Mughal gardens.",
    swatch: "linear-gradient(135deg,#dfe9d4,#a6b58a)",
  },
  {
    id: "p7", slug: "argan-hair-oil", name: "Argan Hair Oil",
    price: 1850, category: "beauty",
    rating: 4.7, reviews: 198,
    description: "Cold-pressed argan blended with almond and vitamin E. Non-greasy finish.",
    swatch: "linear-gradient(135deg,#f4e4b9,#c69b52)",
  },
  {
    id: "p8", slug: "cotton-shirt-white", name: "Everyday Cotton Shirt",
    price: 3990, category: "apparel",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "White", hex: "#f7f5ef" }, { name: "Sky", hex: "#b8cddb" }],
    rating: 4.6, reviews: 162,
    description: "Regular-fit cotton poplin shirt. Mother-of-pearl buttons.",
    swatch: "linear-gradient(135deg,#f2efe6,#c9d4dc)",
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const formatPKR = (n: number) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(n);
