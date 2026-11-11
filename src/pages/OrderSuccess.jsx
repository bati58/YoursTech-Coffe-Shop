import { Link, Navigate, useLocation } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { useOrders } from "../context/OrderContext";
import { formatDate, formatPrice, orderRef } from "../utils/format";
import OrderTotals from "../components/OrderTotals";
import { site } from "../config/site";

export default function OrderSuccess() {
  const { state } = useLocation();
  const { orders } = useOrders();
  const order = orders.find((o) => o.id === state?.orderId);

  if (!order) return <Navigate to="/orders" replace />;

  const totals = { subtotal: order.subtotal ?? order.total, tax: order.tax ?? 0, fee: order.fee ?? 0, total: order.total };

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto grid h-24 w-24 animate-scale-in place-items-center rounded-full bg-success/10">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-success text-white">
            <FiCheck size={32} strokeWidth={3} />
          </span>
        </div>
        <p className="eyebrow mt-8">Order confirmed</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Thank you, {order.customerName.split(" ")[0]}!</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Your order has been placed with {site.fullName}. We're preparing something delicious.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-line bg-white p-7 shadow-soft sm:p-10">
        <div className="flex flex-wrap justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">Order reference</p>
            <p className="mt-1 font-serif text-2xl font-semibold">{orderRef(order.id)}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-xs uppercase tracking-widest text-muted">Date</p>
            <p className="mt-1 font-medium">{formatDate(order.createdAt)}</p>
          </div>
        </div>

        <ul className="divide-y divide-line">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4 py-4">
              <span>
                {item.name} <span className="text-muted">× {item.quantity}</span>
              </span>
              <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-line pt-5">
          <OrderTotals totals={totals} />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/orders" className="btn-primary px-7 py-3.5">View order history</Link>
        <Link to="/menu" className="btn-outline px-7 py-3.5">Return to menu</Link>
      </div>
    </div>
  );
}
