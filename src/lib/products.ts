export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number; // PKR
  compareAt?: number;
  category:
    | "mobiles"
    | "laptops"
    | "tvs"
    | "appliances"
    | "ac"
    | "cameras"
    | "beauty"
    | "womens-fashion"
    | "mens-fashion"
    | "home-living"
    | "accessories"
    | "grocery"
    | "books";
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  rating: number;
  reviews: number;
  description: string;
  swatch: string; // gradient
  /** 1–10 = position in the manually curated Top 10 list; omitted = not in the list */
  topTenRank?: number;
};

export const CATEGORIES = [
  { slug: "mobiles", label: "Mobiles & Tablets" },
  { slug: "laptops", label: "Laptops & Computers" },
  { slug: "tvs", label: "TVs & Electronics" },
  { slug: "appliances", label: "Home Appliances" },
  { slug: "ac", label: "Air Conditioners" },
  { slug: "cameras", label: "Cameras" },
  { slug: "beauty", label: "Health & Beauty" },
  { slug: "womens-fashion", label: "Women's Fashion" },
  { slug: "mens-fashion", label: "Men's Fashion" },
  { slug: "home-living", label: "Home & Living" },
  { slug: "accessories", label: "Accessories" },
  { slug: "grocery", label: "Grocery" },
  { slug: "books", label: "Books" },
] as const;

export const PRODUCTS: Product[] = [
  // ── Mobiles & Tablets ──────────────────────────────────────────────
  {
    id: "p13", slug: "samsung-galaxy-a54", name: "Samsung Galaxy A54",
    price: 89999, compareAt: 99999, category: "mobiles",
    colors: [{ name: "Awesome Black", hex: "#1c1c1c" }, { name: "Awesome White", hex: "#f2f2f2" }],
    rating: 4.7, reviews: 512,
    description: "6.4\" Super AMOLED, 50MP triple camera, 5000mAh battery. PTA approved.",
    swatch: "linear-gradient(135deg,#dfe3ea,#7d8aa1)",
    topTenRank: 1,
  },
  {
    id: "p14", slug: "xiaomi-redmi-note-13", name: "Xiaomi Redmi Note 13",
    price: 54999, compareAt: 62999, category: "mobiles",
    colors: [{ name: "Midnight Black", hex: "#1c1c1c" }, { name: "Ocean Teal", hex: "#0f766e" }],
    rating: 4.6, reviews: 738,
    description: "108MP camera, 120Hz AMOLED display, 33W fast charging.",
    swatch: "linear-gradient(135deg,#cfe8e4,#5f9c93)",
    topTenRank: 2,
  },
  {
    id: "p15", slug: "iphone-13", name: "Apple iPhone 13",
    price: 189999, category: "mobiles",
    colors: [{ name: "Midnight", hex: "#1c1c1c" }, { name: "Starlight", hex: "#f2efe6" }],
    rating: 4.9, reviews: 341,
    description: "A15 Bionic chip, dual 12MP camera system, Super Retina XDR display.",
    swatch: "linear-gradient(135deg,#e9ecef,#adb5bd)",
  },
  {
    id: "p16", slug: "smart-watch-fitness", name: "Smart Watch Pro (Fitness Edition)",
    price: 6499, compareAt: 8999, category: "mobiles",
    rating: 4.4, reviews: 289,
    description: "Heart-rate & SpO2 tracking, 7-day battery, notifications sync.",
    swatch: "linear-gradient(135deg,#dce4ea,#8b98a8)",
  },

  // ── Laptops & Computers ────────────────────────────────────────────
  {
    id: "p17", slug: "dell-inspiron-15", name: "Dell Inspiron 15 (Core i5, 8GB/512GB)",
    price: 154999, compareAt: 169999, category: "laptops",
    rating: 4.6, reviews: 178,
    description: "12th Gen Intel Core i5, 15.6\" FHD display, Windows 11.",
    swatch: "linear-gradient(135deg,#e3e7ea,#94a2ad)",
    topTenRank: 5,
  },
  {
    id: "p18", slug: "hp-probook-450", name: "HP ProBook 450 G9",
    price: 189999, category: "laptops",
    rating: 4.7, reviews: 96,
    description: "Business-grade build, Core i7, 16GB RAM, backlit keyboard.",
    swatch: "linear-gradient(135deg,#d9dfe3,#6b7a86)",
  },
  {
    id: "p19", slug: "lenovo-ideapad-slim3", name: "Lenovo IdeaPad Slim 3",
    price: 119999, compareAt: 134999, category: "laptops",
    rating: 4.5, reviews: 214,
    description: "AMD Ryzen 5, 8GB RAM, 512GB SSD. Lightweight everyday laptop.",
    swatch: "linear-gradient(135deg,#e6e2da,#a89f8f)",
  },

  // ── TVs & Electronics ───────────────────────────────────────────────
  {
    id: "p20", slug: "samsung-led-tv-43", name: "Samsung 43\" Smart LED TV",
    price: 74999, compareAt: 89999, category: "tvs",
    rating: 4.6, reviews: 302,
    description: "Full HD, built-in Wi-Fi, multiple HDMI/USB ports.",
    swatch: "linear-gradient(135deg,#e0e0e0,#8f8f8f)",
    topTenRank: 7,
  },
  {
    id: "p21", slug: "tcl-led-tv-50", name: "TCL 50\" 4K UHD Smart TV",
    price: 99999, category: "tvs",
    rating: 4.5, reviews: 143,
    description: "4K UHD resolution, Android TV, Dolby Audio.",
    swatch: "linear-gradient(135deg,#dde3e6,#7f8f97)",
  },
  {
    id: "p22", slug: "lg-led-tv-32", name: "LG 32\" HD LED TV",
    price: 42999, compareAt: 47999, category: "tvs",
    rating: 4.4, reviews: 267,
    description: "Compact HD display, ideal for bedrooms, 2 HDMI ports.",
    swatch: "linear-gradient(135deg,#e8e6e1,#a49d8e)",
  },

  // ── Home Appliances ─────────────────────────────────────────────────
  {
    id: "p23", slug: "dawlance-refrigerator", name: "Dawlance Single Door Refrigerator",
    price: 84999, compareAt: 92999, category: "appliances",
    rating: 4.5, reviews: 156,
    description: "10 cu ft capacity, energy saving compressor, 3-year warranty.",
    swatch: "linear-gradient(135deg,#eef1f2,#adb8bd)",
  },
  {
    id: "p24", slug: "haier-washing-machine", name: "Haier Fully Automatic Washing Machine",
    price: 64999, category: "appliances",
    rating: 4.6, reviews: 201,
    description: "8kg capacity, multiple wash programs, quiet operation.",
    swatch: "linear-gradient(135deg,#e6ecef,#93a3ac)",
  },
  {
    id: "p25", slug: "pel-microwave-oven", name: "PEL Microwave Oven (23L)",
    price: 24999, compareAt: 28999, category: "appliances",
    rating: 4.3, reviews: 118,
    description: "23L capacity, grill function, digital control panel.",
    swatch: "linear-gradient(135deg,#e9e5df,#a89d89)",
  },

  // ── Air Conditioners ────────────────────────────────────────────────
  {
    id: "p26", slug: "gree-inverter-ac-1-ton", name: "Gree Inverter AC 1 Ton",
    price: 149999, compareAt: 164999, category: "ac",
    rating: 4.7, reviews: 224,
    description: "DC inverter technology, 4-in-1 cooling, energy efficient.",
    swatch: "linear-gradient(135deg,#dbeef0,#79b3ba)",
    topTenRank: 10,
  },
  {
    id: "p27", slug: "haier-ac-1-5-ton", name: "Haier Inverter AC 1.5 Ton",
    price: 189999, category: "ac",
    rating: 4.6, reviews: 167,
    description: "Self-clean function, super cooling mode, low noise.",
    swatch: "linear-gradient(135deg,#d9ecee,#6ba3aa)",
  },

  // ── Cameras ─────────────────────────────────────────────────────────
  {
    id: "p28", slug: "canon-1200d-dslr", name: "Canon EOS 1200D DSLR (Kit Lens)",
    price: 84999, compareAt: 94999, category: "cameras",
    rating: 4.5, reviews: 88,
    description: "18MP sensor, Full HD video, beginner-friendly controls.",
    swatch: "linear-gradient(135deg,#1c1c1c,#4a4a4a)",
  },
  {
    id: "p29", slug: "ip-cctv-camera", name: "IP CCTV Camera (Night Vision)",
    price: 8999, category: "cameras",
    rating: 4.4, reviews: 312,
    description: "1080p night vision, motion detection, mobile app access.",
    swatch: "linear-gradient(135deg,#e2e2e2,#8a8a8a)",
  },

  // ── Health & Beauty (existing + new) ─────────────────────────────────
  {
    id: "p3", slug: "rose-face-mist", name: "Damask Rose Face Mist",
    price: 1290, category: "beauty",
    rating: 4.7, reviews: 342,
    description: "Steam-distilled rose water. Cooling, hydrating, no additives.",
    swatch: "linear-gradient(135deg,#f7d9d6,#e0a1a1)",
    topTenRank: 3,
  },
  {
    id: "p7", slug: "argan-hair-oil", name: "Argan Hair Oil",
    price: 1850, category: "beauty",
    rating: 4.7, reviews: 198,
    description: "Cold-pressed argan blended with almond and vitamin E. Non-greasy finish.",
    swatch: "linear-gradient(135deg,#f4e4b9,#c69b52)",
    topTenRank: 8,
  },
  {
    id: "p11", slug: "vitamin-c-serum", name: "Vitamin C Brightening Serum",
    price: 1650, category: "beauty",
    rating: 4.5, reviews: 29,
    description: "10% vitamin C serum for brighter, more even-looking skin. Fragrance-free.",
    swatch: "linear-gradient(135deg,#fdf2d0,#f3c969)",
  },
  {
    id: "p30", slug: "infrared-thermometer", name: "Infrared Forehead Thermometer",
    price: 2299, category: "beauty",
    rating: 4.6, reviews: 421,
    description: "Non-contact digital thermometer with instant readout.",
    swatch: "linear-gradient(135deg,#eaf0f2,#a8bcc2)",
  },

  // ── Women's Fashion ─────────────────────────────────────────────────
  {
    id: "p1", slug: "linen-kurta-sand", name: "Linen Kurta — Sand",
    price: 4890, compareAt: 6200, category: "womens-fashion",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Sand", hex: "#d9c9ae" }, { name: "Clay", hex: "#b98368" }, { name: "Slate", hex: "#5c6570" }],
    rating: 4.8, reviews: 214,
    description: "Breathable pure linen kurta cut for everyday ease.",
    swatch: "linear-gradient(135deg,#e8dcc4,#c9b291)",
  },
  {
    id: "p31", slug: "sana-safinaz-lawn-suit", name: "Sana Safinaz Lawn Suit (3-Piece)",
    price: 6990, compareAt: 8990, category: "womens-fashion",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7, reviews: 156,
    description: "Printed lawn suit with embroidered dupatta. Unstitched.",
    swatch: "linear-gradient(135deg,#f7d9d6,#dba4a4)",
  },

  // ── Men's Fashion ───────────────────────────────────────────────────
  {
    id: "p8", slug: "cotton-shirt-white", name: "Everyday Cotton Shirt",
    price: 3990, category: "mens-fashion",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "White", hex: "#f7f5ef" }, { name: "Sky", hex: "#b8cddb" }],
    rating: 4.6, reviews: 162,
    description: "Regular-fit cotton poplin shirt. Mother-of-pearl buttons.",
    swatch: "linear-gradient(135deg,#f2efe6,#c9d4dc)",
    topTenRank: 6,
  },
  {
    id: "p9", slug: "everyday-sneakers-white", name: "Everyday Sneakers — White",
    price: 4590, category: "mens-fashion",
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: [{ name: "White", hex: "#f7f5ef" }, { name: "Black", hex: "#1c1c1c" }],
    rating: 4.5, reviews: 41,
    description: "Lightweight everyday sneakers with a cushioned sole. True to size.",
    swatch: "linear-gradient(135deg,#eef0f2,#c7ccd1)",
  },

  // ── Home & Living ───────────────────────────────────────────────────
  {
    id: "p2", slug: "ceramic-mug-set", name: "Ceramic Mug Set (2)",
    price: 2450, category: "home-living",
    colors: [{ name: "Cream", hex: "#eee2c9" }, { name: "Terracotta", hex: "#c67b56" }],
    rating: 4.9, reviews: 87,
    description: "Wheel-thrown stoneware mugs, dishwasher and microwave safe.",
    swatch: "linear-gradient(135deg,#f2e6cd,#d6a37b)",
    topTenRank: 9,
  },
  {
    id: "p5", slug: "cotton-throw", name: "Handloom Cotton Throw",
    price: 3600, category: "home-living",
    colors: [{ name: "Ivory", hex: "#f0e8d6" }, { name: "Indigo", hex: "#2f3e5b" }],
    rating: 4.6, reviews: 54,
    description: "Woven on traditional pit looms. Soft, breathable, and generously sized.",
    swatch: "linear-gradient(135deg,#ede3cd,#9aa8b8)",
  },
  {
    id: "p10", slug: "cotton-bedsheet-set-king", name: "Cotton Bedsheet Set (King)",
    price: 4200, compareAt: 5200, category: "home-living",
    colors: [{ name: "White", hex: "#f7f5ef" }, { name: "Grey", hex: "#9aa0a6" }],
    rating: 4.6, reviews: 33,
    description: "200 thread-count cotton bedsheet set with 2 pillow covers. Machine washable.",
    swatch: "linear-gradient(135deg,#e9ecef,#adb5bd)",
  },

  // ── Accessories ─────────────────────────────────────────────────────
  {
    id: "p4", slug: "leather-tote-tan", name: "Handstitched Tote — Tan",
    price: 8990, compareAt: 11500, category: "accessories",
    colors: [{ name: "Tan", hex: "#b98a5a" }, { name: "Black", hex: "#1c1c1c" }],
    rating: 4.9, reviews: 128,
    description: "Vegetable-tanned leather, brass hardware, cotton canvas lining. Ages beautifully.",
    swatch: "linear-gradient(135deg,#d9b184,#8f5f36)",
    topTenRank: 4,
  },
  {
    id: "p6", slug: "silk-scarf", name: "Silk Scarf — Botanical",
    price: 3200, category: "accessories",
    rating: 4.8, reviews: 76,
    description: "Hand-rolled edges. Digitally printed floral motifs.",
    swatch: "linear-gradient(135deg,#dfe9d4,#a6b58a)",
  },
  {
    id: "p12", slug: "aviator-sunglasses", name: "Aviator Sunglasses",
    price: 2990, category: "accessories",
    colors: [{ name: "Gold", hex: "#c9a24b" }, { name: "Black", hex: "#1c1c1c" }],
    rating: 4.4, reviews: 22,
    description: "UV400 protection with polarized lenses. Includes hard case.",
    swatch: "linear-gradient(135deg,#f0e6c8,#c9a24b)",
  },

  // ── Grocery ─────────────────────────────────────────────────────────
  {
    id: "p32", slug: "basmati-rice-5kg", name: "Premium Basmati Rice (5kg)",
    price: 2199, category: "grocery",
    rating: 4.7, reviews: 389,
    description: "Extra-long grain aged basmati rice, aromatic and fluffy.",
    swatch: "linear-gradient(135deg,#f4efe0,#d9cba7)",
  },
  {
    id: "p33", slug: "cooking-oil-5l", name: "Cooking Oil (5 Litre)",
    price: 2899, compareAt: 3199, category: "grocery",
    rating: 4.6, reviews: 512,
    description: "Pure, cholesterol-free cooking oil for everyday use.",
    swatch: "linear-gradient(135deg,#f5eec9,#e0c765)",
  },
  {
    id: "p34", slug: "mixed-dried-fruits", name: "Premium Mixed Dried Fruits (500g)",
    price: 1799, category: "grocery",
    rating: 4.8, reviews: 201,
    description: "Almonds, cashews, walnuts and raisins. Vacuum sealed for freshness.",
    swatch: "linear-gradient(135deg,#e6d3ae,#a97c4f)",
  },

  // ── Books ───────────────────────────────────────────────────────────
  {
    id: "p35", slug: "namal-novel", name: "Namal — Complete Novel (Urdu)",
    price: 899, category: "books",
    rating: 4.9, reviews: 267,
    description: "Nimra Ahmed's bestselling Urdu novel, complete edition.",
    swatch: "linear-gradient(135deg,#dde3ea,#8f9bb0)",
  },
  {
    id: "p36", slug: "harry-potter-boxset", name: "Harry Potter Complete Story Collection",
    price: 4499, compareAt: 5499, category: "books",
    rating: 4.9, reviews: 178,
    description: "All 7 books in a boxed paperback set.",
    swatch: "linear-gradient(135deg,#e9e2f0,#b6a3cf)",
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const formatPKR = (n: number) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(n);
