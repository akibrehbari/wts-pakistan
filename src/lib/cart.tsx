import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

export type CartItem = {
  productId: string;
  qty: number;
  size?: string;
  color?: string;
};

type CartCtx = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string, size?: string, color?: string) => void;
  setQty: (productId: string, qty: number, size?: string, color?: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  detailed: { item: CartItem; product: Product }[];
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "bazaar_cart_v1";

const sameLine = (a: CartItem, b: CartItem) =>
  a.productId === b.productId && a.size === b.size && a.color === b.color;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    const detailed = items
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        return product ? { item, product } : null;
      })
      .filter(Boolean) as { item: CartItem; product: Product }[];
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = detailed.reduce((s, { item, product }) => s + item.qty * product.price, 0);
    return {
      items, open, setOpen, count, subtotal, detailed,
      add: (item) =>
        setItems((cur) => {
          const idx = cur.findIndex((c) => sameLine(c, item));
          if (idx >= 0) {
            const next = [...cur];
            next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
            return next;
          }
          return [...cur, item];
        }),
      remove: (productId, size, color) =>
        setItems((cur) => cur.filter((c) => !sameLine(c, { productId, size, color, qty: 0 }))),
      setQty: (productId, qty, size, color) =>
        setItems((cur) =>
          cur
            .map((c) => (sameLine(c, { productId, size, color, qty: 0 }) ? { ...c, qty } : c))
            .filter((c) => c.qty > 0),
        ),
      clear: () => setItems([]),
    };
  }, [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
