import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiInfo } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useToast } from "../context/ToastContext";
import { charges } from "../config/site";
import { calcTotals, formatPrice } from "../utils/format";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import Field from "../components/ui/Field";
import OrderTotals from "../components/OrderTotals";

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Please enter a valid email address.";
  if (!/^[+\d][\d\s()-]{6,19}$/.test(f.phone.trim())) e.phone = "Please enter a valid phone number.";
  return e;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { notify } = useToast();
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    phone: "",
    note: "",
  });

  const totals = calcTotals(cartItems, charges);

  if (cartItems.length === 0 && !placing) {
    return (
      <div className="container-page py-16 sm:py-24">
        <EmptyState
          icon={FiShoppingBag}
          title="Nothing to check out"
          text="Add a few drinks to your cart before placing an order."
          ctaTo="/menu"
          ctaLabel="Browse the menu"
        />
      </div>
    );
  }

  const change = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((x) => ({ ...x, [e.target.name]: undefined }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (placing) return;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      notify("Please check the highlighted fields.", "error");
      return;
    }
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 700)); // simulated processing
    const order = createOrder({ user, items: cartItems, customer: form, totals });
    clearCart();
    navigate("/order-success", { state: { orderId: order.id }, replace: true });
  }

  return (
    <>
      <PageHeader eyebrow="Almost there" title="Checkout" />

      <form onSubmit={handleSubmit} noValidate className="container-page grid gap-12 py-12 lg:grid-cols-12 lg:py-16">
        <div className="space-y-8 lg:col-span-7">
          <section className="rounded-3xl border border-line bg-white p-7 sm:p-9">
            <h2 className="text-2xl font-semibold">Customer information</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" autoComplete="name" value={form.name} onChange={change} error={errors.name} className="sm:col-span-2" />
              <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={change} error={errors.email} />
              <Field label="Phone number" name="phone" type="tel" autoComplete="tel" placeholder="e.g. +251 91 234 5678" value={form.phone} onChange={change} error={errors.phone} />
              <Field label="Order notes (optional)" name="note" multiline value={form.note} onChange={change} placeholder="Anything we should know about your order?" className="sm:col-span-2" />
            </div>
          </section>

          <div className="flex gap-3 rounded-2xl bg-sand p-5 text-sm leading-relaxed text-muted">
            <FiInfo className="mt-0.5 shrink-0 text-accent-deep" size={18} />
            <p>
              <span className="font-medium text-ink">Demo checkout.</span> No payment is taken. Placing an order saves it
              to this browser so you can see it in your order history.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-3xl border border-line bg-white p-7 shadow-soft lg:sticky lg:top-28">
            <h2 className="text-2xl font-semibold">Order summary</h2>
            <ul className="mt-6 divide-y divide-line">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <img src={item.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted">Qty {item.quantity}</p>
                  </div>
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <OrderTotals totals={totals} />
            </div>
            <button type="submit" disabled={placing} className="btn-primary mt-7 w-full py-3.5">
              {placing ? "Placing your order…" : `Place order · ${formatPrice(totals.total)}`}
            </button>
            <Link to="/cart" className="mt-4 block text-center text-sm text-muted hover:text-ink">
              ← Edit cart
            </Link>
          </div>
        </aside>
      </form>
    </>
  );
}

