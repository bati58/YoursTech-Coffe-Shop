import { Link } from "react-router-dom";

export default function EmptyState({ icon: Icon, title, text, ctaTo, ctaLabel }) {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-sand text-accent-deep">
        <Icon size={32} />
      </div>
      <h2 className="mt-6 text-3xl font-semibold">{title}</h2>
      <p className="mt-3 leading-relaxed text-muted">{text}</p>
      {ctaTo && (
        <Link to={ctaTo} className="btn-primary mt-8">
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
