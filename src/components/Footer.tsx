import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl">Bazaar<span className="text-primary">.</span></h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Thoughtfully made goods from artisans across Pakistan. Delivered nationwide.
            </p>
            <form
              className="mt-6 flex max-w-sm gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input type="email" placeholder="you@example.com" required />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="mt-2 text-xs text-muted-foreground">Get 10% off your first order.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Shop</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>New arrivals</li><li>Best sellers</li><li>Sale</li><li>Gift cards</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Help</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Shipping & returns</li><li>Track order</li><li>Contact us</li><li>FAQ</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Bazaar. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Instagram className="h-4 w-4" />
              <Facebook className="h-4 w-4" />
              <Twitter className="h-4 w-4" />
              <Youtube className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-medium">
              <span className="rounded border px-2 py-1">JazzCash</span>
              <span className="rounded border px-2 py-1">Easypaisa</span>
              <span className="rounded border px-2 py-1">COD</span>
              <span className="rounded border px-2 py-1">Card</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
