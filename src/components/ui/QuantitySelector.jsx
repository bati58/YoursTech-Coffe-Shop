import { FiMinus, FiPlus } from "react-icons/fi";

export default function QuantitySelector({ value, onDecrease, onIncrease, min = 1, name = "item", size = "md" }) {
  const dim = size === "sm" ? "h-8 w-8" : "h-11 w-11";
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white">
      <button
        type="button"
        onClick={onDecrease}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${name}`}
        className={`${dim} grid place-items-center rounded-full text-ink transition hover:bg-sand disabled:opacity-35 disabled:hover:bg-transparent`}
      >
        <FiMinus size={14} />
      </button>
      <span className="min-w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        aria-label={`Increase quantity of ${name}`}
        className={`${dim} grid place-items-center rounded-full text-ink transition hover:bg-sand`}
      >
        <FiPlus size={14} />
      </button>
    </div>
  );
}
