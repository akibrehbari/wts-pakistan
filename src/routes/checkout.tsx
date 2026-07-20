import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronRight, Lock, Truck, Wallet, Banknote, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/lib/cart";
import { formatPKR } from "@/lib/products";
import { ProductSwatch } from "@/components/ProductSwatch";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Bazaar" }, { name: "robots", content: "noindex" }] }),
  component: Checkout,
});

const STEPS = ["Contact", "Shipping", "Payment", "Review"] as const;

function Checkout() {
  const { detailed, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState("cod");

  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 250;
  const total = subtotal + shipping;

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const placeOrder = () => {
    toast.success("Order placed! Confirmation sent to your email.");
    clear();
    navigate({ to: "/" });
  };

  if (detailed.length === 0 && step < 3) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl">Your bag is empty</h1>
        <p className="mt-3 text-muted-foreground">Add something you love to get started.</p>
        <Button asChild className="mt-6"><Link to="/shop">Shop now</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl md:text-5xl">Checkout</h1>

      {/* Stepper */}
      <ol className="mt-6 flex flex-wrap items-center gap-2 text-sm">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <div className={`grid h-6 w-6 place-items-center rounded-full text-xs ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {i < step ? <Check className="h-3 w-3" /> : i + 1}
            </div>
            <span className={i === step ? "font-medium" : "text-muted-foreground"}>{label}</span>
            {i < STEPS.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          {step === 0 && (
            <section className="space-y-5">
              <h2 className="font-display text-2xl">Contact</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email"><Input type="email" placeholder="you@example.com" /></Field>
                <Field label="Phone"><Input type="tel" placeholder="03XX XXXXXXX" /></Field>
              </div>
            </section>
          )}

          {step === 1 && (
            <section className="space-y-5">
              <h2 className="font-display text-2xl">Shipping address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name"><Input /></Field>
                <Field label="Last name"><Input /></Field>
                <Field label="Address" className="sm:col-span-2"><Input placeholder="House, street" /></Field>
                <Field label="City"><Input placeholder="Karachi" /></Field>
                <Field label="Province">
                  <select className="h-10 w-full rounded-md border bg-background px-3 text-sm">
                    <option>Sindh</option><option>Punjab</option><option>KPK</option>
                    <option>Balochistan</option><option>Islamabad Capital Territory</option>
                    <option>Gilgit-Baltistan</option><option>Azad Kashmir</option>
                  </select>
                </Field>
                <Field label="Postal code"><Input /></Field>
                <Field label="Country"><Input defaultValue="Pakistan" readOnly /></Field>
              </div>
              <div className="rounded-xl bg-muted/40 p-4 text-sm">
                <Truck className="mr-2 inline h-4 w-4 text-primary" />
                Standard delivery in 3–5 business days. Free above PKR 5,000.
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-5">
              <h2 className="font-display text-2xl">Payment method</h2>
              <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3">
                <PayOption id="cod" value="cod" active={payment === "cod"} title="Cash on Delivery" desc="Pay in cash when your order arrives." icon={<Banknote className="h-5 w-5" />} />
                <PayOption id="jazzcash" value="jazzcash" active={payment === "jazzcash"} title="JazzCash" desc="Pay from your JazzCash mobile wallet." icon={<Wallet className="h-5 w-5" />} />
                <PayOption id="easypaisa" value="easypaisa" active={payment === "easypaisa"} title="Easypaisa" desc="Pay from your Easypaisa mobile wallet." icon={<Wallet className="h-5 w-5" />} />
                <PayOption id="card" value="card" active={payment === "card"} title="Debit / Credit card" desc="Visa, Mastercard, UnionPay." icon={<CreditCard className="h-5 w-5" />} />
              </RadioGroup>

              {payment === "card" && (
                <div className="grid gap-4 rounded-xl border p-4 sm:grid-cols-2">
                  <Field label="Card number" className="sm:col-span-2"><Input placeholder="1234 5678 9012 3456" /></Field>
                  <Field label="Expiry"><Input placeholder="MM / YY" /></Field>
                  <Field label="CVC"><Input placeholder="123" /></Field>
                </div>
              )}
              {(payment === "jazzcash" || payment === "easypaisa") && (
                <Field label="Mobile wallet number"><Input placeholder="03XX XXXXXXX" /></Field>
              )}
            </section>
          )}

          {step === 3 && (
            <section className="space-y-5">
              <h2 className="font-display text-2xl">Review order</h2>
              <p className="text-sm text-muted-foreground">
                By placing this order you agree to our terms of service and privacy policy.
              </p>
              <div className="rounded-xl border p-5 text-sm">
                <div className="flex items-center gap-2 font-medium"><Lock className="h-4 w-4 text-primary" /> Secure checkout</div>
                <p className="mt-2 text-muted-foreground">
                  Your details are encrypted end-to-end.
                </p>
              </div>
            </section>
          )}

          <div className="flex flex-wrap justify-between gap-3 pt-4">
            <Button variant="outline" onClick={back} disabled={step === 0}>Back</Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={next}>Continue</Button>
            ) : (
              <Button onClick={placeOrder} size="lg">Place order · {formatPKR(total)}</Button>
            )}
          </div>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border bg-card p-6 lg:sticky lg:top-24">
          <h3 className="font-display text-xl">Order summary</h3>
          <ul className="mt-4 divide-y">
            {detailed.map(({ item, product }) => (
              <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3 py-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md">
                  <ProductSwatch product={product} className="h-full w-full" />
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                    {item.qty}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {[item.size, item.color].filter(Boolean).join(" · ") || "One size"}
                  </p>
                </div>
                <div className="text-sm font-medium">{formatPKR(product.price * item.qty)}</div>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t pt-4 text-sm">
            <Row label="Subtotal" value={formatPKR(subtotal)} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : formatPKR(shipping)} />
            <div className="flex items-center justify-between border-t pt-3 font-semibold">
              <span>Total</span>
              <span className="font-display text-lg">{formatPKR(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block text-xs font-medium">{label}</Label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span><span className="text-foreground">{value}</span>
    </div>
  );
}

function PayOption({ id, value, active, title, desc, icon }: {
  id: string; value: string; active: boolean; title: string; desc: string; icon: React.ReactNode;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${active ? "border-primary bg-primary/5" : "hover:bg-muted"}`}
    >
      <RadioGroupItem id={id} value={value} />
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted text-primary">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </label>
  );
}
