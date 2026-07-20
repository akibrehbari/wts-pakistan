import { useEffect, useState } from "react";
import type { Product } from "./products";

export type Listing = Product & {
  sellerId: string;
  sellerName: string;
};

const KEY = "wts_listings_v1";
const EVENT = "wts-listings-changed";

const SWATCHES = [
  "linear-gradient(135deg,#e8dcc4,#c9b291)",
  "linear-gradient(135deg,#dfe3ea,#7d8aa1)",
  "linear-gradient(135deg,#f7d9d6,#e0a1a1)",
  "linear-gradient(135deg,#d9b184,#8f5f36)",
  "linear-gradient(135deg,#dfe9d4,#a6b58a)",
  "linear-gradient(135deg,#f4e4b9,#c69b52)",
  "linear-gradient(135deg,#e9ecef,#adb5bd)",
  "linear-gradient(135deg,#cfe8e4,#5f9c93)",
];

export function randomSwatch() {
  return SWATCHES[Math.floor(Math.random() * SWATCHES.length)];
}

export function slugify(name: string) {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "listing"
  );
}

export function getListings(): Listing[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveListings(listings: Listing[]) {
  localStorage.setItem(KEY, JSON.stringify(listings));
  window.dispatchEvent(new Event(EVENT));
}

export function addListing(listing: Listing) {
  saveListings([listing, ...getListings()]);
}

export function removeListing(id: string) {
  saveListings(getListings().filter((l) => l.id !== id));
}

export function getListing(slug: string) {
  return getListings().find((l) => l.slug === slug);
}

/** Reactive hook — re-renders when listings change in this tab or another. */
export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    setListings(getListings());
    const onChange = () => setListings(getListings());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return listings;
}
