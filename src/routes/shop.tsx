import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { PRODUCTS, CATEGORIES, formatPKR } from "@/lib/products";
import { useListings } from "@/lib/listings";
import { useLocationFilter } from "@/lib/locationFilter";
import { ProductCard } from "@/components/ProductCard";
import { useMemo, useState } from "react";

const searchSchema = z.object({
  category: z.enum([
    "top10",
    "mobiles",
    "vehicles",
    "property-sale",
    "property-rent",
    "electronics",
    "bikes",
    "business",
    "services",
    "jobs",
    "animals",
    "furniture",
    "fashion",
    "books",
    "kids",
  ]).optional(),
  sort: z.enum(["featured", "price-asc", "price-desc", "rating"]).optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Shop — WTS in Pakistan" },
      { name: "description", content: "Browse mobiles, laptops, electronics, appliances, fashion, groceries and more." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { category, sort = "featured", q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const listings = useListings();
  const allProducts = useMemo(() => [...PRODUCTS, ...listings], [listings]);
  const city = useLocationFilter();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 40000000]);
  const [colorFilter, setColorFilter] = useState<Set<string>>(new Set());
  const [sizeFilter, setSizeFilter] = useState<Set<string>>(new Set());

  const isTopTen = category === "top10";

  let filtered = allProducts.filter((p) =>
    isTopTen ? p.topTenRank !== undefined : category ? p.category === category : true
  );
  if (city !== "Pakistan") filtered = filtered.filter((p) => p.location === city);
  if (q) {
    const needle = q.trim().toLowerCase();
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(needle) || p.description.toLowerCase().includes(needle)
    );
  }
  filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
  if (colorFilter.size > 0) filtered = filtered.filter((p) => p.colors?.some((c) => colorFilter.has(c.name)));
  if (sizeFilter.size > 0) filtered = filtered.filter((p) => p.sizes?.some((s: string) => sizeFilter.has(s)));

  if (isTopTen && sort === "featured") filtered = [...filtered].sort((a, b) => (a.topTenRank ?? 0) - (b.topTenRank ?? 0));
  else if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const allColors = Array.from(new Set(allProducts.flatMap((p) => p.colors?.map((c) => c.name) ?? [])));
  const allSizes = Array.from(new Set(allProducts.flatMap((p) => p.sizes ?? [])));

  const toggle = (set: Set<string>, val: string, setter: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setter(next);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{q ? "Search results" : "Collection"}</p>
          <h1 className="mt-1 font-display text-4xl font-bold md:text-5xl">
            {q ? `“${q}”` : isTopTen ? "Top 10" : category ? CATEGORIES.find((c) => c.slug === category)?.label : "Shop all"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} products{city !== "Pakistan" && <> in {city}</>}
            {q && (
              <>
                {" · "}
                <Link to="/shop" className="text-primary hover:underline">Clear search</Link>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground">Sort by</label>
          <select
            value={sort}
            onChange={(e) => navigate({ search: (s: Record<string, unknown>) => ({ ...s, sort: e.target.value as never }) })}
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
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
        <Link
          to="/shop"
          className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-colors ${!category ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          All
        </Link>
        <Link
          to="/shop"
          search={{ category: "top10" }}
          className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-colors ${isTopTen ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          Top 10
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to="/shop"
            search={{ category: c.slug }}
            className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-colors ${category === c.slug ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"}`}
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
                max={40000000}
                step={5000}
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
              onClick={() => { setColorFilter(new Set()); setSizeFilter(new Set()); setPriceRange([0, 40000000]); }}
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
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} rank={isTopTen ? p.topTenRank : undefined} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
