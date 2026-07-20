import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart";
import { CATEGORIES } from "@/lib/products";

export function Header() {
  const { count, setOpen } = useCart();
  const [mobileNav, setMobileNav] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    navigate({ to: "/shop", search: trimmed ? { q: trimmed } : {} });
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40">
      {/* Top bar */}
      <div className="bg-[#002f34] text-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 md:h-20">
          <button
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md hover:bg-white/10 md:hidden"
            onClick={() => setMobileNav((v) => !v)}
            aria-label="Menu"
          >
            {mobileNav ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link to="/" className="shrink-0 font-display text-2xl font-bold tracking-tight text-white">
            WTS <span className="text-primary">Pakistan</span>
          </Link>

          {/* Search bar — the dominant element in the header, marketplace-style */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <form
              onSubmit={submitSearch}
              className="flex w-full max-w-[640px] items-center overflow-hidden rounded-md bg-white shadow-lg ring-2 ring-primary/40 focus-within:ring-primary"
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands and categories..."
                className="h-12 flex-1 bg-transparent px-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button type="submit" className="grid h-12 w-14 shrink-0 place-items-center bg-primary text-primary-foreground hover:bg-primary/90" aria-label="Search">
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1">
            <button
              className="grid h-9 w-9 place-items-center rounded-md hover:bg-white/10 md:hidden"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <button className="hidden h-9 items-center gap-1.5 rounded-md px-2 hover:bg-white/10 sm:flex" aria-label="Account">
              <User className="h-4 w-4" />
              <span className="text-sm">Account</span>
            </button>
            <button
              className="relative grid h-9 w-9 place-items-center rounded-md hover:bg-white/10"
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
          <div className="border-t border-white/10 px-4 py-3 md:hidden">
            <form onSubmit={submitSearch} className="flex items-center overflow-hidden rounded-md bg-white">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands and categories..."
                className="h-10 flex-1 bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button type="submit" className="grid h-10 w-11 shrink-0 place-items-center bg-primary text-primary-foreground" aria-label="Search">
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Category bar */}
      <div className="hidden border-b border-border bg-background md:block">
        <nav className="mx-auto flex h-11 max-w-7xl items-center gap-6 overflow-x-auto px-4 sm:px-6 [scrollbar-width:thin]">
          <Link
            to="/shop"
            className={`shrink-0 whitespace-nowrap text-sm font-medium transition-colors hover:text-primary ${path === "/shop" ? "text-foreground" : "text-muted-foreground"}`}
          >
            Shop all
          </Link>
          <Link
            to="/shop"
            search={{ category: "top10" }}
            className="shrink-0 whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Top 10
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/shop"
              search={{ category: c.slug }}
              className="shrink-0 whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {c.label}
            </Link>
          ))}
        </nav>
      </div>

      {mobileNav && (
        <div className="max-h-[70vh] overflow-y-auto border-b bg-background md:hidden">
          <nav className="flex flex-col px-4 py-2">
            <Link to="/shop" onClick={() => setMobileNav(false)} className="border-b py-3 text-sm font-medium">Shop all</Link>
            <Link to="/shop" search={{ category: "top10" }} onClick={() => setMobileNav(false)} className="border-b py-3 text-sm text-muted-foreground">Top 10</Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/shop"
                search={{ category: c.slug }}
                onClick={() => setMobileNav(false)}
                className="border-b py-3 text-sm text-muted-foreground last:border-b-0"
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
