import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type UserRole = "buyer" | "seller" | "both";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  picture?: string;
  /** null until the user completes the buy/sell onboarding step */
  role: UserRole | null;
};

type AuthCtx = {
  user: AuthUser | null;
  isSeller: boolean;
  dialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  signInWithGoogle: (credential: string) => void;
  signOut: () => void;
  setRole: (role: UserRole) => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "wts_auth_user_v1";

/**
 * Decodes a Google ID token client-side without verifying its signature.
 * Fine for this demo (no backend exists yet), but NOT a substitute for
 * server-side verification before handling real orders or seller payouts —
 * anyone could hand-craft a token and impersonate a user.
 */
function decodeGoogleCredential(jwt: string): Omit<AuthUser, "role"> | null {
  try {
    const payload = jwt.split(".")[1];
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    if (!json.sub || !json.email) return null;
    return { id: json.sub, email: json.email, name: json.name ?? json.email, picture: json.picture };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (user) localStorage.setItem(KEY, JSON.stringify(user));
    else localStorage.removeItem(KEY);
  }, [user, hydrated]);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      isSeller: user?.role === "seller" || user?.role === "both",
      dialogOpen,
      openDialog: () => setDialogOpen(true),
      closeDialog: () => setDialogOpen(false),
      signInWithGoogle: (credential) => {
        const decoded = decodeGoogleCredential(credential);
        if (!decoded) return;
        setUser((prev) => (prev && prev.id === decoded.id ? prev : { ...decoded, role: null }));
      },
      signOut: () => setUser(null),
      setRole: (role) => setUser((prev) => (prev ? { ...prev, role } : prev)),
    }),
    [user, dialogOpen]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
