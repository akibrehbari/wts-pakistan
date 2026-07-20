import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Truck, ShieldCheck, RefreshCw, Sparkles, Trophy, Zap,
  Shirt, Home as HomeIcon, Watch, Smartphone, Laptop, Tv, Refrigerator,
  Snowflake, Camera, ShoppingBasket, BookOpen, ChevronLeft, ChevronRight, Download,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  component: Home,
});

const SLIDES = [
  {
    title: "Mobiles & Electronics",
    subtitle: "Up to 30% off the latest phones, laptops and TVs",
    cta: "Shop Electronics",
    search: { category: "mobiles" } as const,
    gradient: "linear-gradient(135deg,#0f4c4f,#1a7a7e)",
  },
  {
    title: "New Season Fashion",
    subtitle: "Fresh arrivals in women's & men's fashion, every week",
    cta: "Shop Fashion",
    search: { category: "womens-fashion" } as const,
    gradient: "linear-gradient(135deg,#7a3b1a,#c67b56)",
  },
  {
    title: "Free Delivery Nationwide",
    subtitle: "On all orders over PKR 5,000 — cash on delivery available",
    cta: "Start Shopping",
    search: undefined,
    gradient: "linear-gradient(135deg,#1c1c1c,#4a4a4a)",
  },
];

const CATEGORY_ICONS: Record<string, typeof Shirt> = {
  mobiles: Smartphone,
  laptops: Laptop,
  tvs: Tv,
  appliances: Refrigerator,
  ac: Snowflake,
  cameras: Camera,
  beauty: Sparkles,
  "womens-fashion": Shirt,
  "mens-fashion": Shirt,
  "home-living": HomeIcon,
  accessories: Watch,
  grocery: ShoppingBasket,
  books: BookOpen,
};

function Home() {
  const flashSale = PRODUCTS.filter((p) => p.compareAt).slice(0, 5);
  const trending = PRODUCTS.slice(4, 8);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* Hero: 75/25 split — rotating promo slider + app download widget */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="grid gap-3 md:grid-cols-4">
          {/* Slider — 75% */}
          <div className="relative overflow-hidden rounded-lg md:col-span-3">
            <div
              className="relative flex h-[320px] flex-col justify-center px-8 text-white transition-[background] duration-700 sm:h-[380px] md:px-14"
              style={{ background: SLIDES[slide].gradient }}
            >
              <p className="text-xs font-medium uppercase tracking-widest opacity-80">Limited time</p>
              <h1 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                {SLIDES[slide].title}
              </h1>
              <p className="mt-3 max-w-sm text-sm opacity-90 sm:text-base">{SLIDES[slide].subtitle}</p>
              <div className="mt-6">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/shop" search={SLIDES[slide].search}>
                    {SLIDES[slide].cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Prev/next controls */}
            <button
              aria-label="Previous slide"
              onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)}
              className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next slide"
              onClick={() => setSlide((s) => (s + 1) % SLIDES.length)}
              className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
              {SLIDES.map((s, i) => (
                <button
                  key={s.title}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${i === slide ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                />
              ))}
            </div>
          </div>

          {/* App download widget — 25%, fixed */}
          <div className="hidden flex-col justify-between rounded-lg bg-[#002f34] p-6 text-white md:flex">
            <div>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10">
                <Smartphone className="h-5 w-5 text-primary" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">Get the WTS App</h3>
              <p className="mt-2 text-sm text-white/70">
                App-only deals, faster checkout, and live order tracking on the go.
              </p>
            </div>
            <div className="mt-6 space-y-2">
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-white/25 py-2 text-sm font-medium hover:bg-white/10">
                <Download className="h-4 w-4" /> App Store
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-md border border-white/25 py-2 text-sm font-medium hover:bg-white/10">
                <Download className="h-4 w-4" /> Google Play
              </button>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <dl className="mt-4 grid grid-cols-3 gap-4 text-xs sm:text-sm">
          <div><dt className="text-muted-foreground">Free shipping</dt><dd className="font-medium">Orders over PKR 5,000</dd></div>
          <div><dt className="text-muted-foreground">Easy returns</dt><dd className="font-medium">7-day, no questions</dd></div>
          <div><dt className="text-muted-foreground">Cash on delivery</dt><dd className="font-medium">Nationwide</dd></div>
        </dl>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-8">
          <Link
            to="/shop"
            className="group flex flex-col items-center gap-2 rounded-lg p-3 text-center transition-colors hover:bg-muted"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-destructive/10 text-destructive">
              <Zap className="h-6 w-6" />
            </span>
            <span className="text-xs font-medium">Flash Sale</span>
          </Link>
          <Link
            to="/shop"
            search={{ category: "top10" }}
            className="group flex flex-col items-center gap-2 rounded-lg p-3 text-center transition-colors hover:bg-muted"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
              <Trophy className="h-6 w-6" />
            </span>
            <span className="text-xs font-medium">Top 10</span>
          </Link>
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICONS[c.slug] ?? Shirt;
            return (
              <Link
                key={c.slug}
                to="/shop"
                search={{ category: c.slug }}
                className="group flex flex-col items-center gap-2 rounded-lg p-3 text-center transition-colors hover:bg-muted"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-muted text-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-xs font-medium">{c.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Flash Sale — urgency-driven grid of discounted items */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex items-center justify-between rounded-t-lg bg-destructive px-5 py-3 text-destructive-foreground">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 fill-current" />
            <h2 className="font-display text-xl font-bold sm:text-2xl">Flash Sale</h2>
            <span className="hidden text-xs opacity-90 sm:inline">— ends in a few hours, while stocks last</span>
          </div>
          <Link to="/shop" className="text-sm font-medium underline-offset-2 hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-px border border-t-0 bg-border sm:grid-cols-3 md:grid-cols-5">
          {flashSale.map((p) => <ProductCard key={p.id} product={p} flash />)}
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Trending now</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Just For You — infinite-loading algorithmic grid */}
      <JustForYou />

      {/* Reassurance */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 rounded-2xl border bg-card p-6 md:grid-cols-3 md:p-10">
          {[
            { icon: Truck, title: "Nationwide delivery", body: "Free above PKR 5,000. Fast dispatch from Lahore & Karachi." },
            { icon: ShieldCheck, title: "Secure payments", body: "JazzCash, Easypaisa, cards, and cash on delivery." },
            { icon: RefreshCw, title: "Easy returns", body: "7-day return window on unworn items — no questions." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-muted">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">{title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const JUST_FOR_YOU_POOL = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS];

function JustForYou() {
  const [count, setCount] = useState(8);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCount((c) => Math.min(c + 8, JUST_FOR_YOU_POOL.length));
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visible = JUST_FOR_YOU_POOL.slice(0, count);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <h2 className="font-display text-3xl font-bold md:text-4xl">Just For You</h2>
      <p className="mt-1 text-sm text-muted-foreground">Recommended based on what shoppers like you are browsing.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {visible.map((p, i) => <ProductCard key={`${p.id}-${i}`} product={p} />)}
      </div>
      {count < JUST_FOR_YOU_POOL.length && (
        <div ref={sentinelRef} className="mt-8 flex justify-center py-4 text-sm text-muted-foreground">
          Loading more…
        </div>
      )}
    </section>
  );
}
