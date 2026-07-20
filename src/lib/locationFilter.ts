import { useEffect, useState } from "react";

const KEY = "wts_location_filter_v1";
const EVENT = "wts-location-filter-changed";

export function getLocationFilter(): string {
  if (typeof window === "undefined") return "Pakistan";
  return localStorage.getItem(KEY) || "Pakistan";
}

export function setLocationFilter(city: string) {
  localStorage.setItem(KEY, city);
  window.dispatchEvent(new Event(EVENT));
}

/** Reactive hook for the OLX-style regional location picker in the header. */
export function useLocationFilter() {
  const [city, setCity] = useState("Pakistan");

  useEffect(() => {
    setCity(getLocationFilter());
    const onChange = () => setCity(getLocationFilter());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return city;
}
