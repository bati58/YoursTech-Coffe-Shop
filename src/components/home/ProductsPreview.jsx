import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import products from "../../data/products";
import ProductCard from "../ProductCard";
import Reveal from "../ui/Reveal";

export default function ProductsPreview() {
  const featured = products.filter((p) => p.popular).slice(0, 4);

  return (
    <section id="featured" className="container-page scroll-mt-24 py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Customer favourites</p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Popular picks</h2>
          <p className="mt-3 max-w-md text-muted">A few of the cups our guests come back for again and again.</p>
        </div>
        <Link to="/menu" className="group inline-flex items-center gap-2 text-sm font-medium text-accent-deep">
          View full menu
          <FiArrowRight className="transition group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-14 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={i * 90}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
