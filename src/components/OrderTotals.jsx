import { formatPrice } from "../utils/format";

export default function OrderTotals({ totals }) {
  const row = "flex justify-between text-sm text-muted";
  return (
    <dl className="space-y-3">
      <div className={row}>
        <dt>Subtotal</dt>
        <dd className="text-ink">{formatPrice(totals.subtotal)}</dd>
      </div>
      {totals.tax > 0 && (
        <div className={row}>
          <dt>Tax</dt>
          <dd className="text-ink">{formatPrice(totals.tax)}</dd>
        </div>
      )}
      {totals.fee > 0 && (
        <div className={row}>
          <dt>Service fee</dt>
          <dd className="text-ink">{formatPrice(totals.fee)}</dd>
        </div>
      )}
      <div className="flex items-baseline justify-between border-t border-line pt-4">
        <dt className="font-medium">Total</dt>
        <dd className="font-serif text-2xl font-semibold">{formatPrice(totals.total)}</dd>
      </div>
    </dl>
  );
}
