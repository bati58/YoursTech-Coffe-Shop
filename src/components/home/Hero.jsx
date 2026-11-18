import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowDown } from "react-icons/fi";
import splash from "../../assets/hero.png";
import { site } from "../../config/site";

function Hero() {
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

        <div className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none">
          <div className="absolute right-0 top-1/2 aspect-square w-[82%] -translate-y-1/2 rounded-full bg-sand/80" aria-hidden="true" />
          <img
            src={splash}
            alt="A white coffee cup with a splash of coffee and coffee beans"
            className="relative z-10 mx-auto w-full max-w-[32rem] animate-scale-in object-contain [animation-delay:200ms]"
            fetchPriority="high"
          />
        </div>
      </div>

      <a href="#featured" className="mx-auto mb-6 hidden w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted transition hover:text-ink lg:flex">
        Scroll <FiArrowDown />
      </a>
    </section>
  );
}
export default Hero;
