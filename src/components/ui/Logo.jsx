import { Link } from "react-router-dom";
import { site } from "../../config/site";

export function CoffeeMark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none">
      <path
        d="M13 16h17v8.5A7.5 7.5 0 0 1 22.5 32h-2A7.5 7.5 0 0 1 13 24.5V16Z"
        fill="currentColor"
      />
      <path
        d="M30 19h2.5a4.5 4.5 0 0 1 0 9H29M10 34h23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 11c-2-2 2-3 0-5M24 11c-2-2 2-3 0-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M16 19h11" stroke="#F6F0E7" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ light = false, className = "" }) {
  return (
    <Link
      to="/"
      aria-label={`${site.fullName} — home`}
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className={light ? "text-accent-light" : "text-accent-deep"}>
        <CoffeeMark />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-2xl font-semibold ${light ? "text-cream" : "text-ink"}`}>{site.name}</span>
        <span
          className={`mt-1 text-[0.6rem] font-medium uppercase tracking-[0.34em] ${
            light ? "text-accent-light" : "text-muted"
          }`}
        >
          {site.businessType}
        </span>
      </span>
    </Link>
  );
}
