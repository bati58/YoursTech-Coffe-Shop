import { Link } from "react-router-dom";
import { FiShoppingBag, FiTrash2, FiArrowRight } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { charges } from "../config/site";
import { calcTotals, formatPrice } from "../utils/format";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import QuantitySelector from "../components/ui/QuantitySelector";
import OrderTotals from "../components/OrderTotals";

export default function Cart() {
  const { cartItems, cartCount, increaseQty, decreaseQty, removeFromCart } = useCart();
  const totals = calcTotals(cartItems, charges);

  if (cartItems.length === 0) {
    return (
      <div className="container-page py-16 sm:py-24">
        <EmptyState
          icon={FiShoppingBag}
          title="Your cart is empty"
          text="Looks like you haven't picked a drink yet. Explore the menu and find your new favourite."
          ctaTo="/menu"
          ctaLabel="Explore our menu"
        />
      </div>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Your order" title="Shopping cart">
        {cartCount} {cartCount === 1 ? "item" : "items"} ready for checkout.
      </PageHeader>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
        <ul className="divide-y divide-line border-y border-line lg:col-span-8">
          {cartItems.map((item) => (
            <li key={item.id} className="flex gap-4 py-6 sm:gap-6">
              <Link to={`/product/${item.id}`} className="shrink-0">
                <img src={item.image} alt={item.name} className="h-24 w-24 rounded-2xl object-cover sm:h-32 sm:w-32" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-semibold">
                    <Link to={`/product/${item.id}`} className="hover:text-accent-deep">{item.name}</Link>
                  </h2>
                  <p className="mt-0.5 text-sm text-muted">{formatPrice(item.price)} each</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-danger transition hover:underline"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <FiTrash2 size={14} /> Remove
                  </button>
                </div>
                <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end sm:gap-3">
                  <QuantitySelector
                    size="sm"
                    name={item.name}
                    value={item.quantity}
                    onDecrease={() => decreaseQty(item.id)}
                    onIncrease={() => increaseQty(item.id)}
                  />
                  <p className="font-serif text-xl font-semibold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="lg:col-span-4">
          <div className="rounded-3xl border border-line bg-white p-7 shadow-soft lg:sticky lg:top-28">
            <h2 className="text-2xl font-semibold">Order summary</h2>
            <div className="mt-6">
              <OrderTotals totals={totals} />
            </div>
            <Link to="/checkout" className="btn-primary mt-7 w-full py-3.5">
              Proceed to checkout <FiArrowRight />
            </Link>
            <Link to="/menu" className="btn-outline mt-3 w-full">
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
