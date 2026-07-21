import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu, X, ListChecks, LogOut, MapPin, ChevronDown, LayoutGrid, Plus, Heart } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { CATEGORIES, CITIES } from "@/lib/products";
import { useLocationFilter, setLocationFilter } from "@/lib/locationFilter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { count, setOpen } = useCart();
  const { user, openDialog, signOut } = useAuth();
  const [mobileNav, setMobileNav] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const city = useLocationFilter();

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
            WTS <span className="font-normal">in</span> <span className="text-primary">Pakistan</span>
          </Link>

          {/* Location picker — OLX-style regional selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden shrink-0 items-center gap-1 rounded-md px-2 py-1.5 text-sm hover:bg-white/10 lg:flex">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="max-w-[90px] truncate">{city}</span>
                <ChevronDown className="h-3 w-3 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
              {CITIES.map((c) => (
                <DropdownMenuItem key={c} onSelect={() => setLocationFilter(c)}>
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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

          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <button
              className="grid h-9 w-9 place-items-center rounded-md hover:bg-white/10 md:hidden"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <Link
              to="/sell"
              className="flex shrink-0 items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" /> <span className="hidden sm:inline">SELL</span>
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden h-9 items-center gap-1.5 rounded-md px-2 hover:bg-white/10 sm:flex" aria-label="Account menu">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.picture} alt={user.name} />
                      <AvatarFallback className="text-[10px] text-foreground">{user.name.slice(0, 1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="max-w-[100px] truncate text-sm">{user.name.split(" ")[0]}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="truncate text-sm font-medium">{user.name}</div>
                    <div className="truncate text-xs font-normal text-muted-foreground">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => navigate({ to: "/sell" })}>
                    <ListChecks className="mr-2 h-4 w-4" /> My Ads
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navigate({ to: "/saved" })}>
                    <Heart className="mr-2 h-4 w-4" /> Saved Ads
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={openDialog}
                className="hidden h-9 items-center gap-1.5 rounded-md px-2 hover:bg-white/10 sm:flex"
                aria-label="Account"
              >
                <User className="h-4 w-4" />
                <span className="text-sm">Sign in</span>
              </button>
            )}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-semibold text-foreground hover:text-primary">
                <LayoutGrid className="h-4 w-4" /> All Categories <ChevronDown className="h-3 w-3 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-96 w-64 overflow-y-auto">
              {CATEGORIES.map((c) => (
                <DropdownMenuItem key={c.slug} onSelect={() => navigate({ to: "/shop", search: { category: c.slug } })}>
                  {c.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="h-5 w-px shrink-0 bg-border" />
          <Link
            to="/shop"
            search={{ category: "vehicles" }}
            className="shrink-0 whitespace-nowrap text-sm font-bold text-primary hover:underline"
          >
            Motors
          </Link>
          <Link
            to="/shop"
            search={{ category: "property-sale" }}
            className="shrink-0 whitespace-nowrap text-sm font-bold text-primary hover:underline"
          >
            Property
          </Link>
          <span className="h-5 w-px shrink-0 bg-border" />
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
            {user ? (
              <div className="flex items-center justify-between border-b py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user.picture} alt={user.name} />
                    <AvatarFallback className="text-[10px]">{user.name.slice(0, 1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="truncate text-sm font-medium">{user.name}</span>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-xs">
                  <Link to="/sell" onClick={() => setMobileNav(false)} className="text-primary">My Ads</Link>
                  <button onClick={() => { signOut(); setMobileNav(false); }} className="text-muted-foreground">Sign out</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { openDialog(); setMobileNav(false); }}
                className="border-b py-3 text-left text-sm font-medium text-primary"
              >
                Sign in / Create account
              </button>
            )}
            <div className="flex items-center justify-between border-b py-3">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" /> Location
              </span>
              <select
                value={city}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="rounded-md border bg-background px-2 py-1 text-sm"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <Link to="/shop" search={{ category: "vehicles" }} onClick={() => setMobileNav(false)} className="border-b py-3 text-sm font-bold text-primary">Motors</Link>
            <Link to="/shop" search={{ category: "property-sale" }} onClick={() => setMobileNav(false)} className="border-b py-3 text-sm font-bold text-primary">Property</Link>
            <Link to="/saved" onClick={() => setMobileNav(false)} className="border-b py-3 text-sm text-muted-foreground">Saved Ads</Link>
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
