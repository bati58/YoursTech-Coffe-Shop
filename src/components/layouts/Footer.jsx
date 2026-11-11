import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiFacebook, FiTwitter, FiGlobe } from "react-icons/fi";
import { FaTelegramPlane, FaTiktok } from "react-icons/fa";
import Logo from "../ui/Logo";
import { site } from "../../config/site";

const socialIcons = {
  instagram: { icon: FiInstagram, label: "Instagram" },
  facebook: { icon: FiFacebook, label: "Facebook" },
  telegram: { icon: FaTelegramPlane, label: "Telegram" },
  tiktok: { icon: FaTiktok, label: "TikTok" },
  x: { icon: FiTwitter, label: "X" },
};

export default function Footer() {
  const { contact, openingHours, social } = site;
  const socials = Object.entries(social).filter(([, url]) => url);
  const hasContact = contact.address || contact.phone || contact.email || contact.website;

  const linkCls = "text-cream/70 transition hover:text-accent-light";

  return (
    <footer className="bg-ink text-cream">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo light />
            <p className="mt-6 max-w-sm leading-relaxed text-cream/70">
              Carefully crafted coffee, rich flavors and memorable moments — served with warmth, one cup at a time.
            </p>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {socials.map(([key, url]) => {
                  const { icon: Icon, label } = socialIcons[key];
                  return (
                    <li key={key}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition hover:border-accent-light hover:text-accent-light"
                      >
                        <Icon size={17} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link className={linkCls} to="/menu">Menu</Link></li>
              <li><Link className={linkCls} to="/about">Our story</Link></li>
              <li><Link className={linkCls} to="/contact">Contact</Link></li>
              <li><Link className={linkCls} to="/cart">Cart</Link></li>
              <li><Link className={linkCls} to="/orders">My orders</Link></li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">Visit & contact</h4>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              {contact.address && <li className="flex gap-3"><FiMapPin className="mt-0.5 shrink-0" /> {contact.address}</li>}
              {contact.phone && <li className="flex gap-3"><FiPhone className="mt-0.5 shrink-0" /> {contact.phone}</li>}
              {contact.email && <li className="flex gap-3"><FiMail className="mt-0.5 shrink-0" /> {contact.email}</li>}
              {contact.website && <li className="flex gap-3"><FiGlobe className="mt-0.5 shrink-0" /> <a href={contact.website} target="_blank" rel="noopener noreferrer" className="hover:text-accent-light">yourstech.net</a></li>}
              {!hasContact && <li>Contact details are coming soon. In the meantime, you can order directly from our menu.</li>}
            </ul>
            {openingHours.length > 0 && (
              <dl className="mt-6 space-y-1.5 text-sm">
                {openingHours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 text-cream/70">
                    <dt>{h.days}</dt>
                    <dd className="text-cream">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-cream/15 pt-6 text-xs text-cream/55 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
          <p>Crafted with passion. Served with warmth.</p>
        </div>
      </div>
    </footer>
  );
}
