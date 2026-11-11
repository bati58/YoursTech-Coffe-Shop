import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }) {
  return (
    <article className="group flex flex-col">
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-square overflow-hidden rounded-2xl border border-line bg-sand shadow-soft transition-shadow hover:shadow-lift"
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />
        {product.popular && (
          <span className="absolute left-3 top-3 rounded-md bg-cream/95 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-accent-deep shadow-soft">
            Bestseller
          </span>
        )}
      </Link>

      <div className="mt-5 flex flex-1 flex-col px-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-xl font-semibold">
            <Link to={`/product/${product.id}`} className="transition hover:text-accent-deep">
              {product.name}
            </Link>
          </h3>
          <p className="font-serif text-lg font-semibold text-accent-deep">{formatPrice(product.price)}</p>
        </div>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{product.description}</p>

        <div className="mt-5 flex items-center gap-2">
          <AddToCartButton product={product} className="flex-1" />
          <Link to={`/product/${product.id}`} className="btn-outline">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
