import { Link, useNavigate } from "react-router-dom";
import { FiPackage, FiShoppingBag, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
import PageHeader from "../components/ui/PageHeader";
import { site } from "../config/site";

export default function Profile() {
  const { user, signOut } = useAuth();
  const { getOrdersByEmail } = useOrders();
  const navigate = useNavigate();
  const orderCount = getOrdersByEmail(user.email).length;
  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <>
      <PageHeader eyebrow="Your account" title="My profile" />
      <div className="container-page py-12 sm:py-16">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          <section className="rounded-3xl border border-line bg-white p-8 text-center shadow-soft md:col-span-1">
            <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-ink font-serif text-3xl text-cream">{initials}</span>
            <h2 className="mt-5 text-2xl font-semibold">{user.firstName} {user.lastName}</h2>
            <p className="mt-1 break-all text-sm text-muted">{user.email}</p>
            <button
              onClick={() => { signOut(); navigate("/"); }}
              className="btn mt-8 w-full border border-danger/40 text-danger hover:bg-danger/5"
            >
              <FiLogOut /> Sign out
            </button>
          </section>

          <div className="space-y-8 md:col-span-2">
            <section className="rounded-3xl border border-line bg-white p-8">
              <h2 className="text-2xl font-semibold">Account details</h2>
              <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                <Detail label="First name" value={user.firstName} />
                <Detail label="Last name" value={user.lastName} />
                <Detail label="Email" value={user.email} wide />
              </dl>
            </section>

            <div className="grid gap-5 sm:grid-cols-2">
              <Link to="/orders" className="group rounded-3xl border border-line bg-white p-7 transition hover:border-accent hover:shadow-soft">
                <FiPackage size={26} className="text-accent-deep" />
                <h3 className="mt-4 text-xl font-semibold">My orders</h3>
                <p className="mt-1 text-sm text-muted">{orderCount} {orderCount === 1 ? "order" : "orders"} placed</p>
              </Link>
              <Link to="/menu" className="group rounded-3xl border border-line bg-white p-7 transition hover:border-accent hover:shadow-soft">
                <FiShoppingBag size={26} className="text-accent-deep" />
                <h3 className="mt-4 text-xl font-semibold">Order a drink</h3>
                <p className="mt-1 text-sm text-muted">Browse the {site.name} menu</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Detail({ label, value, wide }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <dt className="text-xs uppercase tracking-widest text-muted">{label}</dt>
      <dd className="mt-1 break-all text-lg font-medium">{value}</dd>
    </div>
  );
}
