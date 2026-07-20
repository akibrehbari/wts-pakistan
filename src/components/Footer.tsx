import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="mt-24 bg-[#002f34] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-6">
          <div className="sm:col-span-2 md:col-span-2">
            <h3 className="font-display text-2xl font-bold">WTS <span className="text-primary">Pakistan</span></h3>
            <p className="mt-2 max-w-sm text-sm text-white/70">
              Everyday essentials at great prices. Delivered nationwide.
            </p>
            <form
              className="mt-6 flex max-w-sm gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input type="email" placeholder="you@example.com" required className="border-white/20 bg-white/10 text-white placeholder:text-white/50" />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="mt-2 text-xs text-white/70">Get 10% off your first order.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Shop</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>New arrivals</li><li>Best sellers</li><li>Flash Sale</li><li>Top 10</li><li>Gift cards</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Customer Care</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>Shipping & returns</li><li>Track order</li><li>Contact us</li><li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">About</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-white">About us</Link></li>
              <li>Careers</li><li>Blog</li><li>Terms & Privacy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Payment Methods</h4>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-medium">
              <span className="rounded border border-white/25 px-2 py-1 text-center">JazzCash</span>
              <span className="rounded border border-white/25 px-2 py-1 text-center">Easypaisa</span>
              <span className="rounded border border-white/25 px-2 py-1 text-center">COD</span>
              <span className="rounded border border-white/25 px-2 py-1 text-center">Card</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/15 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-white/70">© {new Date().getFullYear()} WTS Pakistan. All rights reserved.</p>

          <div className="flex items-center gap-3 text-white/70">
            <Instagram className="h-4 w-4" />
            <Facebook className="h-4 w-4" />
            <Twitter className="h-4 w-4" />
            <Youtube className="h-4 w-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}
