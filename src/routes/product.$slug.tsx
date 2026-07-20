import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Truck, ShieldCheck, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getProduct, PRODUCTS, formatPKR, type Product } from "@/lib/products";
import { getListing } from "@/lib/listings";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import { ProductSwatch } from "@/components/ProductSwatch";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => ({ product: getProduct(params.slug) ?? null, slug: params.slug }),
  head: ({ loaderData }) => ({
    meta: loaderData?.product
      ? [
          { title: `${loaderData.product.name} — WTS Pakistan` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.description },
        ]
      : [{ title: "Product — WTS Pakistan" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product: staticProduct, slug } = Route.useLoaderData();
  const [listingProduct, setListingProduct] = useState<Product | null>(null);
  const [checkedListing, setCheckedListing] = useState(false);

  useEffect(() => {
    if (!staticProduct) setListingProduct(getListing(slug) ?? null);
    setCheckedListing(true);
  }, [slug, staticProduct]);

  const product = staticProduct ?? listingProduct;
  const { add, setOpen } = useCart();
  const [size, setSize] = useState<string | undefined>(product?.sizes?.[0]);
  const [color, setColor] = useState<string | undefined>(product?.colors?.[0]?.name);
  const [qty, setQty] = useState(1);

  if (!product) {
    if (!checkedListing) {
      return <div className="mx-auto max-w-7xl px-4 py-24 text-center text-sm text-muted-foreground sm:px-6">Loading…</div>;
    }
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold">Product not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">This product doesn't exist or has been removed.</p>
        <Link to="/shop" className="mt-6 inline-block text-primary hover:underline">Back to shop</Link>
      </div>
    );
  }

  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" search={{ category: product.category }} className="hover:text-foreground capitalize">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="overflow-hidden rounded-2xl">
            <ProductSwatch product={product} className="aspect-square" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0,1,2,3].map((i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg border">
                <ProductSwatch product={product} className="h-full w-full opacity-90" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{product.category}</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-current text-primary" />
              {product.rating}
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl">{formatPKR(product.price)}</span>
            {product.compareAt && (
              <span className="text-muted-foreground line-through">{formatPKR(product.compareAt)}</span>
            )}
            <span className="text-xs text-muted-foreground">Inclusive of all taxes</span>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          {product.colors && (
            <div className="mt-8">
              <div className="text-sm font-medium">Color: <span className="text-muted-foreground">{color}</span></div>
              <div className="mt-3 flex gap-2">
                {product.colors.map((c: { name: string; hex: string }) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    className={`h-9 w-9 rounded-full border-2 transition-all ${color === c.name ? "border-primary" : "border-transparent ring-1 ring-border"}`}
                    style={{ background: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Size</div>
                <button className="text-xs text-muted-foreground underline">Size guide</button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-11 rounded-md border px-3 py-2 text-sm transition-colors ${size === s ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <div className="inline-flex items-center rounded-full border">
              <button className="grid h-11 w-11 place-items-center" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center">{qty}</span>
              <button className="grid h-11 w-11 place-items-center" onClick={() => setQty((q) => q + 1)} aria-label="Increase"><Plus className="h-4 w-4" /></button>
            </div>
            <Button
              size="lg"
              className="flex-1"
              onClick={() => {
                add({ productId: product.id, qty, size, color });
                setOpen(true);
                toast.success("Added to bag");
              }}
            >
              Add to bag · {formatPKR(product.price * qty)}
            </Button>
          </div>

          <div className="mt-8 grid gap-3 rounded-xl border bg-muted/40 p-4 text-sm sm:grid-cols-2">
            <div className="flex gap-3"><Truck className="h-4 w-4 text-primary" /> Free delivery over PKR 5,000</div>
            <div className="flex gap-3"><ShieldCheck className="h-4 w-4 text-primary" /> 7-day easy return</div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-20">
        <h2 className="font-display text-3xl">What customers say</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { name: "Ayesha K.", city: "Karachi", body: "Beautifully packaged and the quality is excellent. Will order again." },
            { name: "Bilal R.", city: "Lahore", body: "Fits true to size and shipping was quick. Really happy with the fabric." },
            { name: "Sana M.", city: "Islamabad", body: "Feels premium without the premium price tag. Highly recommend." },
          ].map((r) => (
            <div key={r.name} className="rounded-xl border bg-card p-5">
              <div className="flex text-primary">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-3 text-sm text-muted-foreground">"{r.body}"</p>
              <p className="mt-3 text-xs font-medium">{r.name} · {r.city}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="mt-20">
        <h2 className="font-display text-3xl">You may also like</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
