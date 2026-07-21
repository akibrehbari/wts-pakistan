import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { useAuth } from "@/lib/auth";

export function AuthDialog() {
  const { dialogOpen, closeDialog } = useAuth();

  return (
    <Dialog open={dialogOpen} onOpenChange={(v) => !v && closeDialog()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in to WTS in Pakistan</DialogTitle>
          <DialogDescription>Sign in with Google to buy, sell, or save your favorite ads.</DialogDescription>
        </DialogHeader>
        <GoogleSignInButton />
      </DialogContent>
    </Dialog>
  );
}
