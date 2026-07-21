import { useState } from "react";
import type { Product } from "@/lib/products";

export function ProductSwatch({ product, className = "" }: { product: Product; className?: string }) {
  const [errored, setErrored] = useState(false);
  const showImage = product.image && !errored;

  return (
    <div
      className={`relative flex items-end justify-start overflow-hidden ${className}`}
      style={{ background: product.swatch }}
      aria-hidden
    >
      {showImage ? (
        <img
          src={product.image}
          alt=""
          loading="lazy"
          onError={() => setErrored(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_60%)]" />
          <span className="relative z-10 m-4 font-display text-2xl leading-none text-foreground/70">
            {product.name.split(" ")[0]}
          </span>
        </>
      )}
    </div>
  );
}
