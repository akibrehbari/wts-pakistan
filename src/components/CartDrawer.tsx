import { Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPKR } from "@/lib/products";
import { ProductSwatch } from "./ProductSwatch";

export function CartDrawer() {
  const { open, setOpen, detailed, setQty, remove, subtotal, count } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle className="font-display text-2xl">Your bag ({count})</SheetTitle>
        </SheetHeader>

        {detailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            <Button onClick={() => setOpen(false)} variant="outline">Continue shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y">
                {detailed.map(({ item, product }) => (
                  <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 py-4">
                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg">
                      <ProductSwatch product={product} className="h-full w-full" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{product.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {[item.size, item.color].filter(Boolean).join(" · ") || "One size"}
                          </p>
                        </div>
                        <button
                          onClick={() => remove(item.productId, item.size, item.color)}
                          className="text-muted-foreground hover:text-foreground"
                          aria-label="Remove"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="inline-flex items-center rounded-full border">
                          <button
                            className="grid h-8 w-8 place-items-center"
                            onClick={() => setQty(item.productId, item.qty - 1, item.size, item.color)}
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.qty}</span>
                          <button
                            className="grid h-8 w-8 place-items-center"
                            onClick={() => setQty(item.productId, item.qty + 1, item.size, item.color)}
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-sm font-semibold">{formatPKR(product.price * item.qty)}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t bg-muted/40 px-6 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatPKR(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <Button asChild className="mt-4 w-full" size="lg" onClick={() => setOpen(false)}>
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
