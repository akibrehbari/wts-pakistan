import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { formatPKR, type Product } from "@/lib/products";
import { ProductSwatch } from "./ProductSwatch";

export function ProductCard({ product, rank, flash }: { product: Product; rank?: number; flash?: boolean }) {
  const discountPct = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : null;

  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className={`group block overflow-hidden bg-card transition-shadow duration-200 hover:shadow-soft ${flash ? "" : "rounded-lg border"}`}
    >
      <div className={`relative overflow-hidden ${flash ? "bg-white p-4 ring-1 ring-black/5" : "bg-muted"}`}>
        <ProductSwatch product={product} className={`aspect-square ${flash ? "rounded-md" : ""}`} />
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
          <span className={`text-base font-bold ${flash ? "text-primary" : "text-foreground"}`}>{formatPKR(product.price)}</span>
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
