import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const featured = PRODUCTS.slice(0, 4);
  const trending = PRODUCTS.slice(4, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              New season, softer things
            </span>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
              Everyday goods,<br />
              <span className="italic text-primary">made with care.</span>
            </h1>
            <p className="mt-5 max-w-lg text-muted-foreground">
              A quietly considered collection of apparel, home and beauty
              essentials — sourced from artisans across Pakistan and delivered to
              your doorstep.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/shop">Shop the collection <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/shop" search={{ category: "home" }}>Explore home</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-xs">
              <div><dt className="text-muted-foreground">Free shipping</dt><dd className="font-medium">Orders over PKR 5,000</dd></div>
              <div><dt className="text-muted-foreground">Easy returns</dt><dd className="font-medium">7-day, no questions</dd></div>
              <div><dt className="text-muted-foreground">Cash on delivery</dt><dd className="font-medium">Nationwide</dd></div>
            </dl>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-soft">
              <img
                src={heroImg}
                alt="Curated lifestyle goods on a warm cream background"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border bg-card p-4 shadow-soft md:block">
              <div className="text-xs text-muted-foreground">Featured</div>
              <div className="mt-1 font-display text-xl">Linen essentials</div>
              <div className="mt-1 text-xs text-primary">Now 20% off</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/shop"
              search={{ category: c.slug }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
            >
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{ background: `linear-gradient(135deg, oklch(0.92 0.03 ${40 + CATEGORIES.indexOf(c) * 40}), oklch(0.82 0.06 ${40 + CATEGORIES.indexOf(c) * 40}))` }}
              />
              <div className="absolute inset-0 flex items-end p-4 md:p-5">
                <div>
                  <div className="text-xs text-foreground/60">Shop</div>
                  <div className="font-display text-xl md:text-2xl">{c.label}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl md:text-4xl">This week's picks</h2>
            <p className="mt-1 text-sm text-muted-foreground">Selected by our editors.</p>
          </div>
          <Link to="/shop" className="hidden text-sm text-primary hover:underline sm:inline">View all →</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Promo band */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 rounded-3xl bg-primary px-8 py-12 text-primary-foreground md:grid-cols-2 md:items-center md:p-14">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-80">Limited edition</p>
            <h3 className="mt-2 font-display text-3xl md:text-4xl">The Ramadan Collection</h3>
            <p className="mt-3 max-w-md text-sm opacity-90">
              Soft, breathable pieces for long evenings — hand-finished in Lahore.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-6">
              <Link to="/shop">Shop the edit</Link>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {PRODUCTS.slice(0, 3).map((p) => (
              <div key={p.id} className="aspect-square overflow-hidden rounded-xl" style={{ background: p.swatch }} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl md:text-4xl">Trending now</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

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
