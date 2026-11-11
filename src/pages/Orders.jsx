import { FiPackage } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
import { formatDate, formatTime, formatPrice, orderRef } from "../utils/format";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import { site } from "../config/site";

const statusStyles = {
  Placed: "bg-accent-light/25 text-accent-deep",
  Preparing: "bg-amber-100 text-amber-800",
  Ready: "bg-success/10 text-success",
  Completed: "bg-success/10 text-success",
  Cancelled: "bg-danger/10 text-danger",
};

export default function Orders() {
  const { user } = useAuth();
  const { getOrdersByEmail } = useOrders();
  const orders = getOrdersByEmail(user.email);

  return (
    <>
      <PageHeader eyebrow="Your account" title="My orders">
        A record of everything you've ordered from {site.fullName}.
      </PageHeader>

      <div className="container-page py-12 sm:py-16">
        {orders.length === 0 ? (
          <EmptyState
            icon={FiPackage}
            title="No orders yet"
            text="When you place an order it will appear here. Your first cup is waiting."
            ctaTo="/menu"
            ctaLabel="Start ordering"
          />
        ) : (
          <ul className="mx-auto max-w-3xl space-y-6">
            {orders.map((order) => (
              <li key={order.id} className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-sand/50 px-6 py-5 sm:px-8">
                  <div>
                    <p className="font-serif text-xl font-semibold">{orderRef(order.id)}</p>
                    <p className="text-sm text-muted">
                      {formatDate(order.createdAt)} · {formatTime(order.createdAt)}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ${statusStyles[order.status] ?? statusStyles.Placed}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                    {order.status}
                  </span>
                </div>
                <ul className="divide-y divide-line px-6 sm:px-8">
                  {order.items.map((item) => (
                    <li key={`${order.id}-${item.id}`} className="flex justify-between gap-4 py-4 text-sm">
                      <span>
                        {item.name} <span className="text-muted">× {item.quantity}</span>
                      </span>
                      <span className="text-muted">{formatPrice(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline justify-between border-t border-line px-6 py-5 sm:px-8">
                  <span className="text-sm text-muted">Total</span>
                  <span className="font-serif text-2xl font-semibold">{formatPrice(order.total)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
