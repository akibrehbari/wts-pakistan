import { Link } from "@tanstack/react-router";
import { Star, MapPin, Heart } from "lucide-react";
import { formatPKR, timeAgo, type Product } from "@/lib/products";
import { useFavorites, toggleFavorite } from "@/lib/favorites";
import { ProductSwatch } from "./ProductSwatch";

export function ProductCard({ product, rank, flash }: { product: Product; rank?: number; flash?: boolean }) {
  const discountPct = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : null;
  const favorites = useFavorites();
  const isFavorited = favorites.includes(product.id);

  if (!flash) {
    // OLX-style classifieds card: price-first, location + posted time, no discount badge.
    return (
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="group block overflow-hidden rounded-lg border bg-card transition-shadow duration-200 hover:shadow-soft"
      >
        <div className="relative overflow-hidden bg-muted">
          <ProductSwatch product={product} className="aspect-square" />
          {rank && (
            <span className="absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-foreground text-xs font-bold text-background">
              {rank}
            </span>
          )}
          <button
            type="button"
            aria-label={isFavorited ? "Remove from saved" : "Save this ad"}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product.id); }}
            className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
          >
            <Heart className={`h-3.5 w-3.5 ${isFavorited ? "fill-destructive text-destructive" : "text-foreground"}`} />
          </button>
        </div>
        <div className="p-2.5">
          <div className="text-base font-bold text-foreground">{formatPKR(product.price)}</div>
          <h3 className="mt-0.5 line-clamp-2 min-h-[2.5em] text-sm text-muted-foreground">{product.name}</h3>
          {(product.location || product.rating > 0) && (
            <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
              {product.location ? (
                <>
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{product.location}</span>
                </>
              ) : (
                <>
                  <Star className="h-3 w-3 fill-current text-primary" />
                  <span>{product.rating} ({product.reviews})</span>
                </>
              )}
            </div>
          )}
          {product.postedAt && (
            <div className="mt-0.5 text-[11px] text-muted-foreground">{timeAgo(product.postedAt)}</div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block overflow-hidden bg-card transition-shadow duration-200 hover:shadow-soft"
    >
      <div className="relative overflow-hidden bg-white p-4 ring-1 ring-black/5">
        <ProductSwatch product={product} className="aspect-square rounded-md" />
        {rank && (
          <span className="absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-foreground text-xs font-bold text-background">
            {rank}
          </span>
        )}
        {discountPct !== null && (
          <span className="absolute right-2 top-2 rounded bg-destructive px-1.5 py-0.5 text-[11px] font-bold text-destructive-foreground">
            -{discountPct}%
          </span>
        )}
      </div>
      <div className="p-2.5">
        <h3 className="line-clamp-2 min-h-[2.5em] text-sm text-foreground">{product.name}</h3>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-base font-bold text-primary">{formatPKR(product.price)}</span>
          {product.compareAt && (
            <span className="text-xs text-muted-foreground line-through">{formatPKR(product.compareAt)}</span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-current text-primary" />
          <span>{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        {product.price >= 5000 && (
          <div className="mt-1 text-[11px] font-medium text-primary">Free Delivery</div>
        )}
      </div>
    </Link>
  );
}
