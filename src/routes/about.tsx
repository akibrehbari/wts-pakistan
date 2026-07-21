import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, Wallet, Tag, PackageCheck, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — WTS in Pakistan" },
      { name: "description", content: "Learn what WTS in Pakistan is, how delivery and payments work, and what makes us different." },
    ],
  }),
  component: About,
});

const FEATURES = [
  {
    icon: Tag,
    title: "One Store, Every Category",
    body: "From mobiles and laptops to fashion, home appliances and groceries — we bring everything you shop for online into a single, easy-to-browse store instead of a dozen different apps.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery You Can Track",
    body: "We dispatch from Lahore and Karachi to cities and towns across Pakistan. Every order comes with tracking, so you always know where your package is.",
  },
  {
    icon: Wallet,
    title: "Pay However Suits You",
    body: "Card, JazzCash, Easypaisa, or good old cash on delivery — choose whichever payment method you're comfortable with at checkout.",
  },
  {
    icon: ShieldCheck,
    title: "Straightforward Returns",
    body: "Changed your mind or received the wrong item? Our 7-day return and exchange policy is simple by design — no runaround.",
  },
  {
    icon: PackageCheck,
    title: "Deals Worth Checking Daily",
    body: "Our Flash Sale and Top 10 pages are updated regularly with real markdowns on popular products, not inflated 'was' prices.",
  },
  {
    icon: Headset,
    title: "Support When You Need It",
    body: "Questions about an order, a product, or a return? Our support team is reachable through the Help links in the footer.",
  },
];

function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">About us</p>
      <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
        Everyday shopping, made simple.
      </h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        WTS in Pakistan is an online marketplace built around a simple idea: shopping
        online shouldn't mean juggling a different app or website for every kind
        of product. Whether you're picking up a new phone, restocking the
        kitchen, or shopping for an outfit, you can find it here — priced fairly,
        delivered reliably, and backed by a return policy that doesn't hide in
        the fine print.
      </p>

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-lg border bg-card p-8 text-center">
        <h2 className="font-display text-2xl font-bold">Ready to shop?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Browse the full catalog or jump straight to what's trending.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/shop">Shop all</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/shop" search={{ category: "top10" }}>See Top 10</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
