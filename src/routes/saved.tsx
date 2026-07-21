import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { useListings } from "@/lib/listings";
import { useFavorites } from "@/lib/favorites";
import { ProductCard } from "@/components/ProductCard";
import { useMemo } from "react";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [{ title: "Saved Ads — WTS in Pakistan" }, { name: "robots", content: "noindex" }],
  }),
  component: SavedAds,
});

function SavedAds() {
  const listings = useListings();
  const favorites = useFavorites();
  const allProducts = useMemo(() => [...PRODUCTS, ...listings], [listings]);
  const saved = allProducts.filter((p) => favorites.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">Your account</p>
      <h1 className="mt-1 font-display text-4xl font-bold">Saved Ads</h1>
      <p className="mt-1 text-sm text-muted-foreground">{saved.length} saved</p>

      {saved.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed py-20 text-center">
          <Heart className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            Nothing saved yet — tap the heart on any listing to save it here.
          </p>
          <Link to="/shop" className="mt-4 inline-block text-sm text-primary hover:underline">Browse listings</Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {saved.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
