import Logo from "./ui/Logo";
import image from "../assets/latte.jpg";
import { site } from "../config/site";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="relative flex h-full flex-col justify-between p-12 text-cream xl:p-16">
          <Logo light />
          <div>
            <p className="eyebrow !text-accent-light">{site.fullName}</p>
            <p className="mt-4 max-w-md font-serif text-4xl font-medium leading-tight xl:text-5xl">
              Crafted with passion. <em className="text-accent-light">Served with warmth.</em>
            </p>
            <p className="mt-5 max-w-sm text-cream/70">
              Create an account to order faster and keep track of every cup.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-12 sm:px-10 sm:py-16">
        <div className="w-full max-w-md animate-fade-up">
          <h1 className="text-4xl font-semibold sm:text-5xl">{title}</h1>
          <p className="mt-3 text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-center text-sm text-muted">{footer}</p>
        </div>
      </div>
    </div>
  );
}
