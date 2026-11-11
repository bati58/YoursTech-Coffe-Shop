import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import products from "../data/products";
import { formatPrice } from "../utils/format";
import AddToCartButton from "../components/AddToCartButton";
import QuantitySelector from "../components/ui/QuantitySelector";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container-page py-28 text-center">
        <h1 className="text-4xl font-semibold">Product not found</h1>
        <p className="mt-3 text-muted">We couldn't find the drink you were looking for.</p>
        <Link to="/menu" className="btn-primary mt-8">Back to menu</Link>
      </div>
    );
  }

  const related = [
    ...products.filter((p) => p.id !== product.id && p.category === product.category),
    ...products.filter((p) => p.id !== product.id && p.category !== product.category),
  ].slice(0, 3);

  return (
    <>
      <div className="container-page py-8 sm:py-12">
        <Link to="/menu" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-ink">
          <FiArrowLeft /> Back to menu
        </Link>

        {/* key resets the quantity when navigating between products */}
        <div key={product.id} className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="animate-fade-in overflow-hidden rounded-2xl border border-line bg-sand shadow-soft">
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          </div>

          <div className="animate-fade-up lg:pt-6">
            <p className="eyebrow">{product.category}</p>
            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl lg:text-6xl">{product.name}</h1>
            <p className="mt-5 font-serif text-3xl font-semibold text-accent-deep">{formatPrice(product.price)}</p>

            <p className="mt-6 text-lg leading-relaxed text-muted">{product.details}</p>

            <div className="mt-10 border-t border-line pt-8">
              <p className="mb-3 text-sm font-medium">Quantity</p>
              <div className="flex flex-wrap items-center gap-4">
                <QuantitySelector
                  value={qty}
                  name={product.name}
                  onDecrease={() => setQty((q) => Math.max(1, q - 1))}
                  onIncrease={() => setQty((q) => Math.min(20, q + 1))}
                />
                <AddToCartButton product={product} quantity={qty} className="px-8 py-3.5" />
              </div>
              <p className="mt-4 text-sm text-muted">
                Total: <span className="font-semibold text-ink">{formatPrice(product.price * qty)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="border-t border-line bg-sand/50">
        <div className="container-page py-16 sm:py-20">
          <h2 className="text-3xl font-semibold sm:text-4xl">You may also like</h2>
          <div className="mt-10 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
