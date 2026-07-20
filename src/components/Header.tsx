import { Link, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import { CATEGORIES } from "@/lib/products";

export function Header() {
  const { count, setOpen } = useCart();
  const [mobileNav, setMobileNav] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <button
          className="grid h-9 w-9 shrink-0 place-items-center rounded-md md:hidden"
          onClick={() => setMobileNav((v) => !v)}
          aria-label="Menu"
        >
          {mobileNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link to="/" className="font-display text-2xl font-medium tracking-tight">
          Bazaar<span className="text-primary">.</span>
        </Link>

        <nav className="ml-8 hidden items-center gap-6 md:flex">
          <Link
            to="/shop"
            className={`text-sm transition-colors hover:text-primary ${path === "/shop" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Shop all
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/shop"
              search={{ category: c.slug }}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {c.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            className="grid h-9 w-9 place-items-center rounded-md hover:bg-muted"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button className="hidden h-9 w-9 place-items-center rounded-md hover:bg-muted sm:grid" aria-label="Account">
            <User className="h-4 w-4" />
          </button>
          <button
            className="relative grid h-9 w-9 place-items-center rounded-md hover:bg-muted"
            onClick={() => setOpen(true)}
            aria-label="Bag"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t bg-background px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-3xl items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus
              placeholder="Search products, categories, brands..."
              className="border-0 shadow-none focus-visible:ring-0"
            />
            <Button variant="ghost" size="sm" onClick={() => setSearchOpen(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {mobileNav && (
        <div className="border-t bg-background md:hidden">
          <nav className="flex flex-col px-4 py-2">
            <Link to="/shop" onClick={() => setMobileNav(false)} className="py-3 text-sm">Shop all</Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/shop"
                search={{ category: c.slug }}
                onClick={() => setMobileNav(false)}
                className="py-3 text-sm text-muted-foreground"
              >
                {c.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
