import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { formatPKR, type Product } from "@/lib/products";
import { ProductSwatch } from "./ProductSwatch";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl bg-muted shadow-soft transition-transform duration-300 group-hover:-translate-y-1">
        <ProductSwatch product={product} className="aspect-[4/5]" />
        {product.compareAt && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
            Sale
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium">{product.name}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-current text-primary" />
            <span>{product.rating}</span>
            <span>· {product.reviews} reviews</span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-sm font-semibold">{formatPKR(product.price)}</div>
          {product.compareAt && (
            <div className="text-xs text-muted-foreground line-through">
              {formatPKR(product.compareAt)}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
