export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number; // PKR
  compareAt?: number;
  category:
    | "mobiles"
    | "vehicles"
    | "property-sale"
    | "property-rent"
    | "electronics"
    | "bikes"
    | "business"
    | "services"
    | "jobs"
    | "animals"
    | "furniture"
    | "fashion"
    | "books"
    | "kids";
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  rating: number;
  reviews: number;
  description: string;
  swatch: string; // gradient
  /** Real photo URL — falls back to the gradient swatch when omitted (e.g. seller listings without a photo) */
  image?: string;
  /** 1–10 = position in the manually curated Top 10 list; omitted = not in the list */
  topTenRank?: number;
  /** City the listing ships from — OLX-style classifieds detail */
  location?: string;
  /** When the listing was posted (ms epoch) — paired with timeAgo() for "posted X ago" */
  postedAt?: number;
};

export const CATEGORIES = [
  { slug: "mobiles", label: "Mobiles" },
  { slug: "vehicles", label: "Vehicles" },
  { slug: "property-sale", label: "Property For Sale" },
  { slug: "property-rent", label: "Property For Rent" },
  { slug: "electronics", label: "Electronics & Home Appliances" },
  { slug: "bikes", label: "Bikes" },
  { slug: "business", label: "Business, Industrial & Agriculture" },
  { slug: "services", label: "Services" },
  { slug: "jobs", label: "Jobs" },
  { slug: "animals", label: "Animals" },
  { slug: "furniture", label: "Furniture & Home Decor" },
  { slug: "fashion", label: "Fashion & Beauty" },
  { slug: "books", label: "Books, Sports & Hobbies" },
  { slug: "kids", label: "Kids" },
] as const;

export const CITIES = [
  "Pakistan",
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Gujranwala",
  "Sialkot",
  "Quetta",
  "Gilgit",
  "Skardu",
] as const;

const daysAgo = (n: number) => Date.now() - n * 86_400_000;

export const PRODUCTS: Product[] = [
  // ── Mobiles ──────────────────────────────────────────────
  {
    id: "p13", slug: "samsung-galaxy-a54", name: "Samsung Galaxy A54",
    price: 89999, compareAt: 99999, category: "mobiles",
    colors: [{ name: "Awesome Black", hex: "#1c1c1c" }, { name: "Awesome White", hex: "#f2f2f2" }],
    rating: 4.7, reviews: 512,
    description: "6.4\" Super AMOLED, 50MP triple camera, 5000mAh battery. PTA approved.",
    swatch: "linear-gradient(135deg,#dfe3ea,#7d8aa1)",
    image: "https://loremflickr.com/480/480/smartphone?lock=13",
    topTenRank: 1,
    location: "Karachi", postedAt: daysAgo(2),
  },
  {
    id: "p14", slug: "xiaomi-redmi-note-13", name: "Xiaomi Redmi Note 13",
    price: 54999, compareAt: 62999, category: "mobiles",
    colors: [{ name: "Midnight Black", hex: "#1c1c1c" }, { name: "Ocean Teal", hex: "#0f766e" }],
    rating: 4.6, reviews: 738,
    description: "108MP camera, 120Hz AMOLED display, 33W fast charging.",
    swatch: "linear-gradient(135deg,#cfe8e4,#5f9c93)",
    image: "https://loremflickr.com/480/480/smartphone?lock=14",
    topTenRank: 2,
    location: "Lahore", postedAt: daysAgo(1),
  },
  {
    id: "p15", slug: "iphone-13", name: "Apple iPhone 13",
    price: 189999, category: "mobiles",
    colors: [{ name: "Midnight", hex: "#1c1c1c" }, { name: "Starlight", hex: "#f2efe6" }],
    rating: 4.9, reviews: 341,
    description: "A15 Bionic chip, dual 12MP camera system, Super Retina XDR display.",
    swatch: "linear-gradient(135deg,#e9ecef,#adb5bd)",
    image: "https://loremflickr.com/480/480/iphone?lock=15",
    location: "Islamabad", postedAt: daysAgo(5),
  },
  {
    id: "p16", slug: "smart-watch-fitness", name: "Smart Watch Pro (Fitness Edition)",
    price: 6499, compareAt: 8999, category: "mobiles",
    rating: 4.4, reviews: 289,
    description: "Heart-rate & SpO2 tracking, 7-day battery, notifications sync.",
    swatch: "linear-gradient(135deg,#dce4ea,#8b98a8)",
    image: "https://loremflickr.com/480/480/smartwatch?lock=16",
    location: "Rawalpindi", postedAt: daysAgo(3),
  },

  // ── Vehicles ────────────────────────────────────────────
  {
    id: "p40", slug: "toyota-corolla-2018", name: "Toyota Corolla Altis 2018",
    price: 4200000, category: "vehicles",
    rating: 0, reviews: 0,
    description: "1.6L Automatic, 68,000 km driven, single owner, all original documents.",
    swatch: "linear-gradient(135deg,#dfe3ea,#8a97a8)",
    image: "https://loremflickr.com/480/480/corolla?lock=40",
    location: "Lahore", postedAt: daysAgo(1),
  },
  {
    id: "p41", slug: "honda-civic-2020", name: "Honda Civic 2020 Oriel",
    price: 6800000, category: "vehicles",
    rating: 0, reviews: 0,
    description: "1.8L, 42,000 km, sunroof, full option, bank leased — transferable.",
    swatch: "linear-gradient(135deg,#e6e2da,#96897a)",
    image: "https://loremflickr.com/480/480/civic?lock=41",
    location: "Karachi", postedAt: daysAgo(3),
  },

  // ── Property For Sale ───────────────────────────────────
  {
    id: "p42", slug: "house-bahria-town-rawalpindi", name: "3 Bed House — Bahria Town, Rawalpindi",
    price: 32000000, category: "property-sale",
    rating: 0, reviews: 0,
    description: "10 Marla, 3 bed 3 bath, corner plot, near main boulevard. Ready to move.",
    swatch: "linear-gradient(135deg,#eef1f2,#a9b7c2)",
    image: "https://loremflickr.com/480/480/house,exterior?lock=42",
    location: "Rawalpindi", postedAt: daysAgo(4),
  },
  {
    id: "p43", slug: "plot-johar-town-lahore", name: "5 Marla Plot — Johar Town, Lahore",
    price: 18500000, category: "property-sale",
    rating: 0, reviews: 0,
    description: "Prime location, all utilities available, clear title, immediate registry.",
    swatch: "linear-gradient(135deg,#f4efe0,#c9b98f)",
    image: "https://loremflickr.com/480/480/land,plot?lock=43",
    location: "Lahore", postedAt: daysAgo(6),
  },

  // ── Property For Rent ───────────────────────────────────
  {
    id: "p44", slug: "apartment-dha-karachi-rent", name: "2 Bed Apartment for Rent — DHA, Karachi",
    price: 65000, category: "property-rent",
    rating: 0, reviews: 0,
    description: "Furnished, 2nd floor, lift available, near Sea View. Rent per month.",
    swatch: "linear-gradient(135deg,#dbeef0,#8fb9bd)",
    image: "https://loremflickr.com/480/480/apartment,interior?lock=44",
    location: "Karachi", postedAt: daysAgo(2),
  },
  {
    id: "p45", slug: "house-f10-islamabad-rent", name: "House for Rent — F-10, Islamabad",
    price: 150000, category: "property-rent",
    rating: 0, reviews: 0,
    description: "1 Kanal, 4 bed, servant quarter, gas + electricity connected. Rent per month.",
    swatch: "linear-gradient(135deg,#e9ecef,#b6c0c7)",
    image: "https://loremflickr.com/480/480/house,modern?lock=45",
    location: "Islamabad", postedAt: daysAgo(5),
  },

  // ── Electronics & Home Appliances ───────────────────────
  {
    id: "p17", slug: "dell-inspiron-15", name: "Dell Inspiron 15 (Core i5, 8GB/512GB)",
    price: 154999, compareAt: 169999, category: "electronics",
    rating: 4.6, reviews: 178,
    description: "12th Gen Intel Core i5, 15.6\" FHD display, Windows 11.",
    swatch: "linear-gradient(135deg,#e3e7ea,#94a2ad)",
    image: "https://loremflickr.com/480/480/laptop?lock=17",
    topTenRank: 5,
    location: "Lahore", postedAt: daysAgo(7),
  },
  {
    id: "p18", slug: "hp-probook-450", name: "HP ProBook 450 G9",
    price: 189999, category: "electronics",
    rating: 4.7, reviews: 96,
    description: "Business-grade build, Core i7, 16GB RAM, backlit keyboard.",
    swatch: "linear-gradient(135deg,#d9dfe3,#6b7a86)",
    image: "https://loremflickr.com/480/480/laptop?lock=18",
    location: "Karachi", postedAt: daysAgo(10),
  },
  {
    id: "p19", slug: "lenovo-ideapad-slim3", name: "Lenovo IdeaPad Slim 3",
    price: 119999, compareAt: 134999, category: "electronics",
    rating: 4.5, reviews: 214,
    description: "AMD Ryzen 5, 8GB RAM, 512GB SSD. Lightweight everyday laptop.",
    swatch: "linear-gradient(135deg,#e6e2da,#a89f8f)",
    image: "https://loremflickr.com/480/480/laptop?lock=19",
    location: "Faisalabad", postedAt: daysAgo(4),
  },
  {
    id: "p20", slug: "samsung-led-tv-43", name: "Samsung 43\" Smart LED TV",
    price: 74999, compareAt: 89999, category: "electronics",
    rating: 4.6, reviews: 302,
    description: "Full HD, built-in Wi-Fi, multiple HDMI/USB ports.",
    swatch: "linear-gradient(135deg,#e0e0e0,#8f8f8f)",
    image: "https://loremflickr.com/480/480/television?lock=20",
    topTenRank: 7,
    location: "Multan", postedAt: daysAgo(6),
  },
  {
    id: "p21", slug: "tcl-led-tv-50", name: "TCL 50\" 4K UHD Smart TV",
    price: 99999, category: "electronics",
    rating: 4.5, reviews: 143,
    description: "4K UHD resolution, Android TV, Dolby Audio.",
    swatch: "linear-gradient(135deg,#dde3e6,#7f8f97)",
    image: "https://loremflickr.com/480/480/television?lock=21",
    location: "Karachi", postedAt: daysAgo(8),
  },
  {
    id: "p22", slug: "lg-led-tv-32", name: "LG 32\" HD LED TV",
    price: 42999, compareAt: 47999, category: "electronics",
    rating: 4.4, reviews: 267,
    description: "Compact HD display, ideal for bedrooms, 2 HDMI ports.",
    swatch: "linear-gradient(135deg,#e8e6e1,#a49d8e)",
    image: "https://loremflickr.com/480/480/television?lock=22",
    location: "Peshawar", postedAt: daysAgo(2),
  },
  {
    id: "p23", slug: "dawlance-refrigerator", name: "Dawlance Single Door Refrigerator",
    price: 84999, compareAt: 92999, category: "electronics",
    rating: 4.5, reviews: 156,
    description: "10 cu ft capacity, energy saving compressor, 3-year warranty.",
    swatch: "linear-gradient(135deg,#eef1f2,#adb8bd)",
    image: "https://loremflickr.com/480/480/refrigerator?lock=23",
    location: "Lahore", postedAt: daysAgo(12),
  },
  {
    id: "p24", slug: "haier-washing-machine", name: "Haier Fully Automatic Washing Machine",
    price: 64999, category: "electronics",
    rating: 4.6, reviews: 201,
    description: "8kg capacity, multiple wash programs, quiet operation.",
    swatch: "linear-gradient(135deg,#e6ecef,#93a3ac)",
    image: "https://loremflickr.com/480/480/washingmachine?lock=24",
    location: "Islamabad", postedAt: daysAgo(9),
  },
  {
    id: "p25", slug: "pel-microwave-oven", name: "PEL Microwave Oven (23L)",
    price: 24999, compareAt: 28999, category: "electronics",
    rating: 4.3, reviews: 118,
    description: "23L capacity, grill function, digital control panel.",
    swatch: "linear-gradient(135deg,#e9e5df,#a89d89)",
    image: "https://loremflickr.com/480/480/microwave?lock=25",
    location: "Gujranwala", postedAt: daysAgo(5),
  },
  {
    id: "p26", slug: "gree-inverter-ac-1-ton", name: "Gree Inverter AC 1 Ton",
    price: 149999, compareAt: 164999, category: "electronics",
    rating: 4.7, reviews: 224,
    description: "DC inverter technology, 4-in-1 cooling, energy efficient.",
    swatch: "linear-gradient(135deg,#dbeef0,#79b3ba)",
    image: "https://loremflickr.com/480/480/airconditioner?lock=26",
    topTenRank: 10,
    location: "Karachi", postedAt: daysAgo(3),
  },
  {
    id: "p27", slug: "haier-ac-1-5-ton", name: "Haier Inverter AC 1.5 Ton",
    price: 189999, category: "electronics",
    rating: 4.6, reviews: 167,
    description: "Self-clean function, super cooling mode, low noise.",
    swatch: "linear-gradient(135deg,#d9ecee,#6ba3aa)",
    image: "https://loremflickr.com/480/480/airconditioner?lock=27",
    location: "Lahore", postedAt: daysAgo(15),
  },
  {
    id: "p28", slug: "canon-1200d-dslr", name: "Canon EOS 1200D DSLR (Kit Lens)",
    price: 84999, compareAt: 94999, category: "electronics",
    rating: 4.5, reviews: 88,
    description: "18MP sensor, Full HD video, beginner-friendly controls.",
    swatch: "linear-gradient(135deg,#1c1c1c,#4a4a4a)",
    image: "https://loremflickr.com/480/480/dslrcamera?lock=28",
    location: "Islamabad", postedAt: daysAgo(6),
  },
  {
    id: "p29", slug: "ip-cctv-camera", name: "IP CCTV Camera (Night Vision)",
    price: 8999, category: "electronics",
    rating: 4.4, reviews: 312,
    description: "1080p night vision, motion detection, mobile app access.",
    swatch: "linear-gradient(135deg,#e2e2e2,#8a8a8a)",
    image: "https://loremflickr.com/480/480/cctv?lock=29",
    location: "Rawalpindi", postedAt: daysAgo(4),
  },

  // ── Bikes ────────────────────────────────────────────────
  {
    id: "p46", slug: "honda-cd-70-2022", name: "Honda CD 70 2022",
    price: 145000, category: "bikes",
    rating: 0, reviews: 0,
    description: "9,500 km driven, first owner, genuine condition, all documents clear.",
    swatch: "linear-gradient(135deg,#f0e6c8,#c9a24b)",
    image: "https://loremflickr.com/480/480/motorcycle?lock=46",
    location: "Faisalabad", postedAt: daysAgo(2),
  },
  {
    id: "p47", slug: "yamaha-ybr-125", name: "Yamaha YBR 125",
    price: 285000, category: "bikes",
    rating: 0, reviews: 0,
    description: "2021 model, well maintained, new tyres, self start working perfectly.",
    swatch: "linear-gradient(135deg,#dfe9d4,#8fa876)",
    image: "https://loremflickr.com/480/480/motorcycle?lock=47",
    location: "Multan", postedAt: daysAgo(5),
  },

  // ── Business, Industrial & Agriculture ──────────────────
  {
    id: "p32", slug: "basmati-rice-5kg", name: "Premium Basmati Rice (5kg)",
    price: 2199, category: "business",
    rating: 4.7, reviews: 389,
    description: "Extra-long grain aged basmati rice, aromatic and fluffy. Bulk orders welcome.",
    swatch: "linear-gradient(135deg,#f4efe0,#d9cba7)",
    image: "https://loremflickr.com/480/480/basmatirice?lock=32",
    location: "Gujranwala", postedAt: daysAgo(1),
  },
  {
    id: "p33", slug: "cooking-oil-5l", name: "Cooking Oil (5 Litre) — Wholesale",
    price: 2899, compareAt: 3199, category: "business",
    rating: 4.6, reviews: 512,
    description: "Pure, cholesterol-free cooking oil. Carton and bulk pricing available.",
    swatch: "linear-gradient(135deg,#f5eec9,#e0c765)",
    image: "https://loremflickr.com/480/480/cookingoil?lock=33",
    location: "Lahore", postedAt: daysAgo(3),
  },
  {
    id: "p34", slug: "mixed-dried-fruits", name: "Premium Mixed Dried Fruits (500g)",
    price: 1799, category: "business",
    rating: 4.8, reviews: 201,
    description: "Almonds, cashews, walnuts and raisins. Vacuum sealed for freshness.",
    swatch: "linear-gradient(135deg,#e6d3ae,#a97c4f)",
    image: "https://loremflickr.com/480/480/driedfruit,nuts?lock=34",
    location: "Gilgit", postedAt: daysAgo(5),
  },
  {
    id: "p48", slug: "used-generator-5kva", name: "Used Generator 5kVA",
    price: 185000, category: "business",
    rating: 0, reviews: 0,
    description: "Diesel generator, low hours, ideal for shop or small workshop backup power.",
    swatch: "linear-gradient(135deg,#e2e2e2,#8a8a8a)",
    image: "https://loremflickr.com/480/480/generator?lock=48",
    location: "Gujranwala", postedAt: daysAgo(7),
  },

  // ── Services ─────────────────────────────────────────────
  {
    id: "p49", slug: "home-electrician-services", name: "Home Electrician Services",
    price: 1500, category: "services",
    rating: 0, reviews: 0,
    description: "Wiring, switchboard repair, fan/light installation. Same-day visit available.",
    swatch: "linear-gradient(135deg,#fdf2d0,#f3c969)",
    image: "https://loremflickr.com/480/480/electrician?lock=49",
    location: "Lahore", postedAt: daysAgo(1),
  },
  {
    id: "p50", slug: "home-tutoring-math-science", name: "Home Tutoring — Math & Science",
    price: 5000, category: "services",
    rating: 0, reviews: 0,
    description: "Experienced tutor for O/A Level and Matric students. Per month, per subject.",
    swatch: "linear-gradient(135deg,#dde3ea,#8f9bb0)",
    image: "https://loremflickr.com/480/480/tutor,study?lock=50",
    location: "Karachi", postedAt: daysAgo(3),
  },

  // ── Jobs ─────────────────────────────────────────────────
  {
    id: "p51", slug: "sales-executive-full-time", name: "Sales Executive — Full Time",
    price: 45000, category: "jobs",
    rating: 0, reviews: 0,
    description: "2+ years experience, target-driven role, fuel allowance included. Salary per month.",
    swatch: "linear-gradient(135deg,#e9ecef,#adb5bd)",
    image: "https://loremflickr.com/480/480/office?lock=51",
    location: "Islamabad", postedAt: daysAgo(2),
  },
  {
    id: "p52", slug: "graphic-designer-remote", name: "Graphic Designer — Remote",
    price: 60000, category: "jobs",
    rating: 0, reviews: 0,
    description: "Adobe Suite proficiency required, social media & print design. Salary per month.",
    swatch: "linear-gradient(135deg,#f7d9d6,#dba4a4)",
    image: "https://loremflickr.com/480/480/designer?lock=52",
    location: "Lahore", postedAt: daysAgo(4),
  },

  // ── Animals ──────────────────────────────────────────────
  {
    id: "p53", slug: "persian-cat-kittens", name: "Persian Cat Kittens",
    price: 15000, category: "animals",
    rating: 0, reviews: 0,
    description: "8 weeks old, litter trained, vaccinated. Both parents available to see.",
    swatch: "linear-gradient(135deg,#eaf0f2,#a8bcc2)",
    image: "https://loremflickr.com/480/480/cat?lock=53",
    location: "Karachi", postedAt: daysAgo(1),
  },
  {
    id: "p54", slug: "holstein-cow-milking", name: "Holstein Cow — Healthy & Milking",
    price: 220000, category: "animals",
    rating: 0, reviews: 0,
    description: "3rd lactation, 18 litres/day, all vaccinations up to date.",
    swatch: "linear-gradient(135deg,#e6ecef,#93a3ac)",
    image: "https://loremflickr.com/480/480/cow?lock=54",
    location: "Multan", postedAt: daysAgo(6),
  },

  // ── Furniture & Home Decor ───────────────────────────────
  {
    id: "p2", slug: "ceramic-mug-set", name: "Ceramic Mug Set (2)",
    price: 2450, category: "furniture",
    colors: [{ name: "Cream", hex: "#eee2c9" }, { name: "Terracotta", hex: "#c67b56" }],
    rating: 4.9, reviews: 87,
    description: "Wheel-thrown stoneware mugs, dishwasher and microwave safe.",
    swatch: "linear-gradient(135deg,#f2e6cd,#d6a37b)",
    image: "https://loremflickr.com/480/480/mug?lock=2",
    topTenRank: 9,
    location: "Multan", postedAt: daysAgo(9),
  },
  {
    id: "p5", slug: "cotton-throw", name: "Handloom Cotton Throw",
    price: 3600, category: "furniture",
    colors: [{ name: "Ivory", hex: "#f0e8d6" }, { name: "Indigo", hex: "#2f3e5b" }],
    rating: 4.6, reviews: 54,
    description: "Woven on traditional pit looms. Soft, breathable, and generously sized.",
    swatch: "linear-gradient(135deg,#ede3cd,#9aa8b8)",
    image: "https://loremflickr.com/480/480/blanket?lock=5",
    location: "Peshawar", postedAt: daysAgo(11),
  },
  {
    id: "p10", slug: "cotton-bedsheet-set-king", name: "Cotton Bedsheet Set (King)",
    price: 4200, compareAt: 5200, category: "furniture",
    colors: [{ name: "White", hex: "#f7f5ef" }, { name: "Grey", hex: "#9aa0a6" }],
    rating: 4.6, reviews: 33,
    description: "200 thread-count cotton bedsheet set with 2 pillow covers. Machine washable.",
    swatch: "linear-gradient(135deg,#e9ecef,#adb5bd)",
    image: "https://loremflickr.com/480/480/bedsheet,bedroom?lock=10",
    location: "Karachi", postedAt: daysAgo(6),
  },

  // ── Fashion & Beauty ─────────────────────────────────────
  {
    id: "p3", slug: "rose-face-mist", name: "Damask Rose Face Mist",
    price: 1290, category: "fashion",
    rating: 4.7, reviews: 342,
    description: "Steam-distilled rose water. Cooling, hydrating, no additives.",
    swatch: "linear-gradient(135deg,#f7d9d6,#e0a1a1)",
    image: "https://loremflickr.com/480/480/rosewater?lock=3",
    topTenRank: 3,
    location: "Lahore", postedAt: daysAgo(2),
  },
  {
    id: "p7", slug: "argan-hair-oil", name: "Argan Hair Oil",
    price: 1850, category: "fashion",
    rating: 4.7, reviews: 198,
    description: "Cold-pressed argan blended with almond and vitamin E. Non-greasy finish.",
    swatch: "linear-gradient(135deg,#f4e4b9,#c69b52)",
    image: "https://loremflickr.com/480/480/hairoil?lock=7",
    topTenRank: 8,
    location: "Karachi", postedAt: daysAgo(1),
  },
  {
    id: "p11", slug: "vitamin-c-serum", name: "Vitamin C Brightening Serum",
    price: 1650, category: "fashion",
    rating: 4.5, reviews: 29,
    description: "10% vitamin C serum for brighter, more even-looking skin. Fragrance-free.",
    swatch: "linear-gradient(135deg,#fdf2d0,#f3c969)",
    image: "https://loremflickr.com/480/480/serum?lock=11",
    location: "Islamabad", postedAt: daysAgo(3),
  },
  {
    id: "p30", slug: "infrared-thermometer", name: "Infrared Forehead Thermometer",
    price: 2299, category: "fashion",
    rating: 4.6, reviews: 421,
    description: "Non-contact digital thermometer with instant readout.",
    swatch: "linear-gradient(135deg,#eaf0f2,#a8bcc2)",
    image: "https://loremflickr.com/480/480/thermometer?lock=30",
    location: "Multan", postedAt: daysAgo(7),
  },
  {
    id: "p1", slug: "linen-kurta-sand", name: "Linen Kurta — Sand",
    price: 4890, compareAt: 6200, category: "fashion",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Sand", hex: "#d9c9ae" }, { name: "Clay", hex: "#b98368" }, { name: "Slate", hex: "#5c6570" }],
    rating: 4.8, reviews: 214,
    description: "Breathable pure linen kurta cut for everyday ease.",
    swatch: "linear-gradient(135deg,#e8dcc4,#c9b291)",
    image: "https://loremflickr.com/480/480/kurta?lock=1",
    location: "Lahore", postedAt: daysAgo(4),
  },
  {
    id: "p31", slug: "sana-safinaz-lawn-suit", name: "Sana Safinaz Lawn Suit (3-Piece)",
    price: 6990, compareAt: 8990, category: "fashion",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7, reviews: 156,
    description: "Printed lawn suit with embroidered dupatta. Unstitched.",
    swatch: "linear-gradient(135deg,#f7d9d6,#dba4a4)",
    image: "https://loremflickr.com/480/480/lawnsuit,pakistani?lock=31",
    location: "Karachi", postedAt: daysAgo(2),
  },
  {
    id: "p8", slug: "cotton-shirt-white", name: "Everyday Cotton Shirt",
    price: 3990, category: "fashion",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "White", hex: "#f7f5ef" }, { name: "Sky", hex: "#b8cddb" }],
    rating: 4.6, reviews: 162,
    description: "Regular-fit cotton poplin shirt. Mother-of-pearl buttons.",
    swatch: "linear-gradient(135deg,#f2efe6,#c9d4dc)",
    image: "https://loremflickr.com/480/480/shirt?lock=8",
    topTenRank: 6,
    location: "Faisalabad", postedAt: daysAgo(5),
  },
  {
    id: "p9", slug: "everyday-sneakers-white", name: "Everyday Sneakers — White",
    price: 4590, category: "fashion",
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: [{ name: "White", hex: "#f7f5ef" }, { name: "Black", hex: "#1c1c1c" }],
    rating: 4.5, reviews: 41,
    description: "Lightweight everyday sneakers with a cushioned sole. True to size.",
    swatch: "linear-gradient(135deg,#eef0f2,#c7ccd1)",
    image: "https://loremflickr.com/480/480/sneakers?lock=9",
    location: "Lahore", postedAt: daysAgo(3),
  },
  {
    id: "p4", slug: "leather-tote-tan", name: "Handstitched Tote — Tan",
    price: 8990, compareAt: 11500, category: "fashion",
    colors: [{ name: "Tan", hex: "#b98a5a" }, { name: "Black", hex: "#1c1c1c" }],
    rating: 4.9, reviews: 128,
    description: "Vegetable-tanned leather, brass hardware, cotton canvas lining. Ages beautifully.",
    swatch: "linear-gradient(135deg,#d9b184,#8f5f36)",
    image: "https://loremflickr.com/480/480/leather,tote?lock=4",
    topTenRank: 4,
    location: "Lahore", postedAt: daysAgo(8),
  },
  {
    id: "p6", slug: "silk-scarf", name: "Silk Scarf — Botanical",
    price: 3200, category: "fashion",
    rating: 4.8, reviews: 76,
    description: "Hand-rolled edges. Digitally printed floral motifs.",
    swatch: "linear-gradient(135deg,#dfe9d4,#a6b58a)",
    image: "https://loremflickr.com/480/480/silk,scarf?lock=6",
    location: "Islamabad", postedAt: daysAgo(4),
  },
  {
    id: "p12", slug: "aviator-sunglasses", name: "Aviator Sunglasses",
    price: 2990, category: "fashion",
    colors: [{ name: "Gold", hex: "#c9a24b" }, { name: "Black", hex: "#1c1c1c" }],
    rating: 4.4, reviews: 22,
    description: "UV400 protection with polarized lenses. Includes hard case.",
    swatch: "linear-gradient(135deg,#f0e6c8,#c9a24b)",
    image: "https://loremflickr.com/480/480/sunglasses?lock=12",
    location: "Karachi", postedAt: daysAgo(2),
  },

  // ── Books, Sports & Hobbies ──────────────────────────────
  {
    id: "p35", slug: "namal-novel", name: "Namal — Complete Novel (Urdu)",
    price: 899, category: "books",
    rating: 4.9, reviews: 267,
    description: "Nimra Ahmed's bestselling Urdu novel, complete edition.",
    swatch: "linear-gradient(135deg,#dde3ea,#8f9bb0)",
    image: "https://loremflickr.com/480/480/book?lock=35",
    location: "Karachi", postedAt: daysAgo(10),
  },
  {
    id: "p36", slug: "harry-potter-boxset", name: "Harry Potter Complete Story Collection",
    price: 4499, compareAt: 5499, category: "books",
    rating: 4.9, reviews: 178,
    description: "All 7 books in a boxed paperback set.",
    swatch: "linear-gradient(135deg,#e9e2f0,#b6a3cf)",
    image: "https://loremflickr.com/480/480/harrypotter,books?lock=36",
    location: "Islamabad", postedAt: daysAgo(14),
  },

  // ── Kids ─────────────────────────────────────────────────
  {
    id: "p55", slug: "kids-bicycle-16-inch", name: "Kids Bicycle 16-inch",
    price: 8500, category: "kids",
    rating: 0, reviews: 0,
    description: "Ages 4-7, training wheels included, lightly used, good condition.",
    swatch: "linear-gradient(135deg,#f7d9d6,#e0a1a1)",
    image: "https://loremflickr.com/480/480/bicycle?lock=55",
    location: "Lahore", postedAt: daysAgo(3),
  },
  {
    id: "p56", slug: "baby-stroller-3-in-1", name: "Baby Stroller — 3-in-1",
    price: 12500, category: "kids",
    rating: 0, reviews: 0,
    description: "Convertible car seat + carrycot + stroller. Barely used, like new.",
    swatch: "linear-gradient(135deg,#dfe9d4,#a6b58a)",
    image: "https://loremflickr.com/480/480/stroller,baby?lock=56",
    location: "Islamabad", postedAt: daysAgo(2),
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const formatPKR = (n: number) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(n);

/** OLX-style relative posted time, e.g. "2 days ago". */
export function timeAgo(ts?: number): string {
  if (!ts) return "";
  const diffMs = Date.now() - ts;
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months === 1 ? "" : "s"} ago`;
}
