import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PRODUCTS, CATEGORIES, formatPKR } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";

const searchSchema = z.object({
  category: z.enum(["apparel", "home", "beauty", "accessories"]).optional(),
  sort: z.enum(["featured", "price-asc", "price-desc", "rating"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Shop — Bazaar" },
      { name: "description", content: "Browse apparel, home, beauty and accessories from Pakistani artisans." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { category, sort = "featured" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [colorFilter, setColorFilter] = useState<Set<string>>(new Set());
  const [sizeFilter, setSizeFilter] = useState<Set<string>>(new Set());

  let filtered = PRODUCTS.filter((p) => (category ? p.category === category : true));
  filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
  if (colorFilter.size > 0) filtered = filtered.filter((p) => p.colors?.some((c) => colorFilter.has(c.name)));
  if (sizeFilter.size > 0) filtered = filtered.filter((p) => p.sizes?.some((s: string) => sizeFilter.has(s)));

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const allColors = Array.from(new Set(PRODUCTS.flatMap((p) => p.colors?.map((c) => c.name) ?? [])));
  const allSizes = Array.from(new Set(PRODUCTS.flatMap((p) => p.sizes ?? [])));

  const toggle = (set: Set<string>, val: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setter(next);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Collection</p>
          <h1 className="mt-1 font-display text-4xl md:text-5xl">
            {category ? CATEGORIES.find((c) => c.slug === category)?.label : "Shop all"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{filtered.length} products</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground">Sort by</label>
          <select
            value={sort}
            onChange={(e) => navigate({ search: (s) => ({ ...s, sort: e.target.value as never }) })}
            className="rounded-md border bg-background px-3 py-1.5 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          to="/shop"
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${!category ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to="/shop"
            search={{ category: c.slug }}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${category === c.slug ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"}`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block">
          <div className="sticky top-24 space-y-8">
            <div className="flex items-center gap-2 text-sm font-medium">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </div>

            <div>
              <h3 className="text-sm font-medium">Price</h3>
              <Slider
                value={priceRange}
                onValueChange={(v) => setPriceRange([v[0], v[1]] as [number, number])}
                min={0}
                max={15000}
                step={500}
                className="mt-4"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{formatPKR(priceRange[0])}</span>
                <span>{formatPKR(priceRange[1])}</span>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium">Color</h3>
              <div className="space-y-2">
                {allColors.map((c) => (
                  <label key={c} className="flex cursor-pointer items-center gap-2 text-sm">
                    <Checkbox
                      checked={colorFilter.has(c)}
                      onCheckedChange={() => toggle(colorFilter, c, setColorFilter)}
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium">Size</h3>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggle(sizeFilter, s, setSizeFilter)}
                    className={`min-w-9 rounded-md border px-2.5 py-1.5 text-xs transition-colors ${sizeFilter.has(s) ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setColorFilter(new Set()); setSizeFilter(new Set()); setPriceRange([0, 15000]); }}
            >
              Clear filters
            </Button>
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-lg border py-20 text-center text-sm text-muted-foreground">
              No products match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
