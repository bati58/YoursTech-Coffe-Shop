import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail, FiClock, FiGlobe, FiFacebook } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import PageHeader from "../components/ui/PageHeader";
import { site } from "../config/site";

export default function Contact() {
  const { contact, openingHours, social } = site;
  const items = [
    contact.address && { icon: FiMapPin, label: "Visit us", value: contact.address },
    contact.phone && { icon: FiPhone, label: "Call us", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    contact.email && { icon: FiMail, label: "Email us", value: contact.email, href: `mailto:${contact.email}` },
    contact.website && { icon: FiGlobe, label: "Website", value: "yourstech.net", href: contact.website, external: true },
    social.facebook && { icon: FiFacebook, label: "Facebook", value: "YoursTech on Facebook", href: social.facebook, external: true },
    social.telegram && { icon: FaTelegramPlane, label: "Telegram", value: "@yourstechacademy", href: social.telegram, external: true },
  ].filter(Boolean);

  return (
    <>
      <PageHeader eyebrow="Get in touch" title={`Contact ${site.fullName}`}>
        We'd love to hear from you.
      </PageHeader>

      <div className="container-page py-14 sm:py-20">
        {items.length > 0 || openingHours.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map(({ icon: Icon, label, value, href, external }) => (
              <div key={label} className="rounded-3xl border border-line bg-white p-8">
                <Icon size={26} className="text-accent-deep" />
                <h2 className="mt-5 text-xl font-semibold">{label}</h2>
                {href ? (
                  <a
                    href={href}
                    className="mt-2 block break-words text-muted hover:text-accent-deep"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    {value}
                  </a>
                ) : <p className="mt-2 text-muted">{value}</p>}
              </div>
            ))}
            {openingHours.length > 0 && (
              <div className="rounded-3xl border border-line bg-white p-8">
                <FiClock size={26} className="text-accent-deep" />
                <h2 className="mt-5 text-xl font-semibold">Opening hours</h2>
                <dl className="mt-3 space-y-1.5 text-muted">
                  {openingHours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4"><dt>{h.days}</dt><dd className="text-ink">{h.hours}</dd></div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-3xl border border-line bg-white p-10 text-center shadow-soft">
            <FiMail size={30} className="mx-auto text-accent-deep" />
            <h2 className="mt-5 text-3xl font-semibold">Contact details coming soon</h2>
            <p className="mt-3 leading-relaxed text-muted">
              We're getting our address, phone number and opening hours ready. Until then, you can order your favourite
              drinks straight from our menu.
            </p>
            <Link to="/menu" className="btn-primary mt-7">Explore the menu</Link>
          </div>
        )}
      </div>
    </>
  );
}
