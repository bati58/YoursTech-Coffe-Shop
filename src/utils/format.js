import { site } from "../config/site";

export const formatPrice = (value) => `${site.currency} ${Number(value).toFixed(2)}`;

export const orderRef = (id) =>
  `${site.name.replace(/[^a-z0-9]/gi, "").slice(0, 3).toUpperCase()}-${String(id).replace(/-/g, "").slice(0, 8).toUpperCase()}`;

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

export function calcTotals(items, { taxRate = 0, serviceFee = 0 } = {}) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = +(subtotal * taxRate).toFixed(2);
  const fee = items.length ? serviceFee : 0;
  return { subtotal, tax, fee, total: subtotal + tax + fee };
}

export function safeParse(raw, fallback) {
  try {
    const v = JSON.parse(raw);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}
