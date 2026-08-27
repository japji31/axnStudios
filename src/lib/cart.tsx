import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product } from "./catalog";

export type CartLine = { slug: string; size: string; qty: number };

type CartValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, size: string, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
  detailed: { line: CartLine; product: Product }[];
};

const STORAGE_KEY = "loomsville-cart";
const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const value = useMemo<CartValue>(() => {
    const detailed = lines
      .map((line) => ({ line, product: getProduct(line.slug) }))
      .filter((entry): entry is { line: CartLine; product: Product } => Boolean(entry.product));

    return {
      lines,
      detailed,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: detailed.reduce((n, { line, product }) => n + product.price * line.qty, 0),
      add: (slug, size, qty = 1) =>
        setLines((prev) => {
          const found = prev.find((l) => l.slug === slug && l.size === size);
          if (found) {
            return prev.map((l) => (l === found ? { ...l, qty: l.qty + qty } : l));
          }
          return [...prev, { slug, size, qty }];
        }),
      setQty: (slug, size, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => !(l.slug === slug && l.size === size))
            : prev.map((l) => (l.slug === slug && l.size === size ? { ...l, qty } : l)),
        ),
      remove: (slug, size) =>
        setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size))),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
