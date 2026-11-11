import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiMenu, FiX, FiUser, FiLogOut, FiPackage } from "react-icons/fi";
import Logo from "../ui/Logo";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);
  const { cartCount } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const initials = user ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || "U" : "";

  // Close menus on navigation.
  const [lastPath, setLastPath] = useState(location.pathname);
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    setOpen(false);
    setProfileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!profileOpen) return;
    const onDown = (e) => profileRef.current && !profileRef.current.contains(e.target) && setProfileOpen(false);
    const onKey = (e) => e.key === "Escape" && setProfileOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [profileOpen]);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `relative py-1 text-sm font-medium transition after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent-deep after:transition-transform ${
      isActive
        ? "text-ink after:scale-x-100"
        : "text-muted hover:text-ink after:scale-x-0 hover:after:scale-x-100"
    }`;

  function handleSignOut() {
    signOut();
    setProfileOpen(false);
    setOpen(false);
    navigate("/");
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition duration-300 ${
        scrolled ? "border-line bg-cream/90 shadow-soft backdrop-blur-md" : "border-transparent bg-cream"
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/cart"
            aria-label={`Shopping cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
            className="relative grid h-11 w-11 place-items-center rounded-full text-ink transition hover:bg-sand"
          >
            <FiShoppingBag size={21} />
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent-deep px-1 text-[0.65rem] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="hidden md:block">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  aria-label="Account menu"
                  className="grid h-11 w-11 place-items-center rounded-full bg-ink text-xs font-semibold tracking-wider text-cream transition hover:bg-accent-deep"
                >
                  {initials}
                </button>
                {profileOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-3 w-64 animate-scale-in rounded-2xl border border-line bg-white p-2 shadow-lift [animation-duration:.2s]"
                  >
                    <div className="px-3 py-3">
                      <p className="font-serif text-lg font-semibold">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="break-all text-xs text-muted">{user.email}</p>
                    </div>
                    <div className="border-t border-line pt-1">
                      <MenuLink to="/profile" icon={FiUser}>My profile</MenuLink>
                      <MenuLink to="/orders" icon={FiPackage}>My orders</MenuLink>
                      <button
                        role="menuitem"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-danger transition hover:bg-danger/5"
                      >
                        <FiLogOut size={16} /> Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin" className="btn-dark px-5 py-2.5">
                Sign in
              </Link>
            )}
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center rounded-full text-ink transition hover:bg-sand md:hidden"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full h-[calc(100dvh-72px)] animate-fade-in overflow-y-auto border-t border-line bg-cream md:hidden"
        >
          <nav className="container-page flex flex-col py-6" aria-label="Mobile">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `border-b border-line py-4 font-serif text-3xl ${isActive ? "text-accent-deep" : "text-ink"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              {user ? (
                <>
                  <p className="text-sm text-muted">
                    Signed in as <span className="font-medium text-ink">{user.email}</span>
                  </p>
                  <Link to="/profile" className="btn-outline">My profile</Link>
                  <Link to="/orders" className="btn-outline">My orders</Link>
                  <button onClick={handleSignOut} className="btn border border-danger/40 text-danger hover:bg-danger/5">
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="btn-dark">Sign in</Link>
                  <Link to="/signup" className="btn-outline">Create account</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function MenuLink({ to, icon: Icon, children }) {
  return (
    <Link
      to={to}
      role="menuitem"
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition hover:bg-sand"
    >
      <Icon size={16} className="text-muted" /> {children}
    </Link>
  );
}
