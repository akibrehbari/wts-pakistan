import { ShoppingBag, Store, Sparkles } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { useAuth, type UserRole } from "@/lib/auth";

export function AuthDialog() {
  const { user, dialogOpen, closeDialog, setRole } = useAuth();
  const navigate = useNavigate();

  const choose = (role: UserRole) => {
    setRole(role);
    closeDialog();
    if (role !== "buyer") navigate({ to: "/sell" });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={(v) => !v && closeDialog()}>
      <DialogContent className="sm:max-w-md">
        {!user ? (
          <>
            <DialogHeader>
              <DialogTitle>Sign in to WTS Pakistan</DialogTitle>
              <DialogDescription>Sign in with Google to buy or start selling.</DialogDescription>
            </DialogHeader>
            <GoogleSignInButton />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Welcome, {user.name.split(" ")[0]}</DialogTitle>
              <DialogDescription>How do you want to use WTS Pakistan?</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                onClick={() => choose("buyer")}
                className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors hover:border-primary hover:bg-muted"
              >
                <ShoppingBag className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Buy</span>
              </button>
              <button
                onClick={() => choose("seller")}
                className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors hover:border-primary hover:bg-muted"
              >
                <Store className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Sell</span>
              </button>
              <button
                onClick={() => choose("both")}
                className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors hover:border-primary hover:bg-muted"
              >
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Both</span>
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
