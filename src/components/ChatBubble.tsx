import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-64 rounded-lg border bg-card p-4 shadow-soft">
          <p className="text-sm font-medium">Need help?</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Our support team typically replies within a few minutes. Reach us via the Help links in the footer, or start a chat.
          </p>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close help chat" : "Open help chat"}
        className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
