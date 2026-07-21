import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Trash2, ListChecks } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import { useListings, addListing, removeListing, randomSwatch, slugify, type Listing } from "@/lib/listings";
import { CATEGORIES, CITIES, formatPKR, timeAgo, type Product } from "@/lib/products";
import { ProductSwatch } from "@/components/ProductSwatch";

const AD_CITIES = CITIES.filter((c) => c !== "Pakistan");

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "My Ads — WTS in Pakistan" },
      { name: "description", content: "Post an ad and manage your listings on WTS in Pakistan." },
    ],
  }),
  component: MyAds,
});

function MyAds() {
  const { user, openDialog } = useAuth();
  const allListings = useListings();
  const myListings = user ? allListings.filter((l) => l.sellerId === user.id) : [];

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [compareAt, setCompareAt] = useState("");
  const [category, setCategory] = useState<Product["category"]>("fashion");
  const [location, setLocation] = useState<string>(AD_CITIES[0]);
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setName(""); setPrice(""); setCompareAt(""); setDescription("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const priceNum = Number(price);
    if (!name.trim() || !priceNum || priceNum <= 0) {
      toast.error("Enter a title and a valid price");
      return;
    }
    const listing: Listing = {
      id: `seller-${Date.now()}`,
      slug: `${slugify(name)}-${Date.now().toString(36)}`,
      name: name.trim(),
      price: priceNum,
      compareAt: compareAt ? Number(compareAt) : undefined,
      category,
      rating: 0,
      reviews: 0,
      description: description.trim() || "No description provided.",
      swatch: randomSwatch(),
      sellerId: user.id,
      sellerName: user.name,
      location,
      postedAt: Date.now(),
    };
    addListing(listing);
    resetForm();
    toast.success("Ad posted");
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
        <ListChecks className="mx-auto h-10 w-10 text-primary" />
        <h1 className="mt-4 font-display text-3xl font-bold">Post an ad</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in with Google to post an ad and manage your listings.
        </p>
        <Button size="lg" className="mt-6" onClick={openDialog}>Sign in to continue</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">Your account</p>
      <h1 className="mt-1 font-display text-4xl font-bold">My Ads</h1>
      <p className="mt-1 text-sm text-muted-foreground">{myListings.length} active ad{myListings.length === 1 ? "" : "s"}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <h2 className="font-display text-2xl font-bold">My Listings</h2>
          {myListings.length === 0 ? (
            <div className="mt-4 rounded-lg border border-dashed py-16 text-center text-sm text-muted-foreground">
              You haven't posted anything yet — use the form to post your first ad.
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {myListings.map((l) => (
                <div key={l.id} className="overflow-hidden rounded-lg border bg-card">
                  <Link to="/product/$slug" params={{ slug: l.slug }} className="block">
                    <ProductSwatch product={l} className="aspect-square" />
                  </Link>
                  <div className="p-2.5">
                    <h3 className="line-clamp-2 text-sm">{l.name}</h3>
                    <div className="mt-1 text-sm font-semibold">{formatPKR(l.price)}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{l.location} · {timeAgo(l.postedAt)}</div>
                    <button
                      onClick={() => { removeListing(l.id); toast.success("Ad removed"); }}
                      className="mt-2 flex items-center gap-1 text-xs text-destructive hover:underline"
                    >
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-display text-xl font-bold">Post an ad</h2>
          <p className="mt-1 text-xs text-muted-foreground">List a single item — no shop setup needed.</p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Handmade Leather Wallet" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Price (PKR)</label>
                <Input type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="2500" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Compare-at (optional)</label>
                <Input type="number" min="1" value={compareAt} onChange={(e) => setCompareAt(e.target.value)} placeholder="3000" className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Product["category"])}
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">City</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                >
                  {AD_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your item..." className="mt-1" rows={4} />
            </div>
            <Button type="submit" className="w-full">Post ad</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
