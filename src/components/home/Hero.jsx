import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";
import cappuccino from "../../assets/cappuccino.jpg";
import splash from "../../assets/hero.png";
import espresso from "../../assets/espresso.jpg";
import { site } from "../../config/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-sand" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-6">
          <p className="eyebrow animate-fade-up">Specialty coffee · {site.fullName}</p>
          <h1 className="mt-5 animate-fade-up text-[2.75rem] font-semibold leading-[1.05] text-ink [animation-delay:100ms] sm:text-6xl lg:text-[4.25rem]">
            Crafted with Passion.{" "}
            <em className="font-medium text-accent-deep">Served with Warmth.</em>
          </h1>
          <p className="mt-6 max-w-lg animate-fade-up text-lg leading-relaxed text-muted [animation-delay:220ms]">
            Discover carefully crafted coffee, rich flavors, and memorable moments at {site.fullName}.
          </p>
          <div className="mt-9 flex animate-fade-up flex-wrap gap-3 [animation-delay:340ms]">
            <Link to="/menu" className="btn-primary px-7 py-3.5">
              Explore Our Menu <FiArrowRight />
            </Link>
            <Link to="/about" className="btn-outline px-7 py-3.5">
              Discover Our Story
            </Link>
          </div>
          <dl className="mt-12 flex animate-fade-up gap-10 border-t border-line pt-6 [animation-delay:460ms]">
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted">Signature drinks</dt>
              <dd className="mt-1 font-serif text-3xl font-semibold">8</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted">Ordering</dt>
              <dd className="mt-1 font-serif text-3xl font-semibold">Online</dd>
            </div>
          </dl>
        </div>

        {/* Image composition */}
        <div className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none">
          <div className="relative mx-auto aspect-[4/3] w-full animate-scale-in overflow-hidden rounded-2xl border border-line bg-sand shadow-lift [animation-delay:200ms]">
            <img src={cappuccino} alt="A cappuccino with leaf latte art on a saucer" className="h-full w-full object-cover" fetchPriority="high" />
          </div>

          <div className="absolute -left-1 bottom-6 w-[30%] animate-scale-in overflow-hidden rounded-2xl border-[6px] border-cream bg-black shadow-lift [animation-delay:450ms] sm:left-4 lg:left-0">
            <img src={splash} alt="Coffee splashing from a white cup" className="aspect-square w-full object-cover" />
          </div>

          <div className="absolute right-0 top-8 hidden w-[22%] animate-scale-in overflow-hidden rounded-2xl border-[6px] border-cream shadow-lift [animation-delay:650ms] sm:block lg:-right-2">
            <img src={espresso} alt="" aria-hidden="true" className="aspect-square w-full object-cover" />
          </div>

          <div className="absolute bottom-0 right-2 animate-fade-up rounded-2xl bg-ink px-5 py-4 text-cream shadow-lift [animation-delay:800ms] lg:right-10">
            <p className="font-serif text-lg font-medium leading-tight">Freshly brewed</p>
            <p className="mt-0.5 text-xs text-accent-light">Every single cup</p>
          </div>
        </div>
      </div>

      <a href="#featured" className="mx-auto mb-6 hidden w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition hover:text-ink lg:flex">
        Scroll <FiArrowDown />
      </a>
    </section>
  );
}
