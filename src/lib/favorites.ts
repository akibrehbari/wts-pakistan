import { useEffect, useState } from "react";

const KEY = "wts_favorites_v1";
const EVENT = "wts-favorites-changed";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(ids: string[]) {
  localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(EVENT));
}

export function toggleFavorite(id: string) {
  const current = getFavorites();
  saveFavorites(current.includes(id) ? current.filter((f) => f !== id) : [id, ...current]);
}

/** Reactive hook — returns the current favorited product ids, updates on change. */
export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getFavorites());
    const onChange = () => setIds(getFavorites());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return ids;
}
