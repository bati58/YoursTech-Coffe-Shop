import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import mocha from "../../assets/caramel-white-mocha.jpg";

export default function CTA() {
  return (
    <section className="container-page py-20 sm:py-28">
      <div className="relative grid overflow-hidden rounded-[2rem] bg-ink text-cream lg:grid-cols-2">
        <div className="p-10 sm:p-14 lg:p-20">
          <p className="eyebrow !text-accent-light">Your next cup awaits</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Pick a favourite. <em className="font-medium text-accent-light">We'll take care of the rest.</em>
          </h2>
          <p className="mt-5 max-w-md text-cream/70">
            Browse the menu, add your drinks to the cart and place your order in a few simple steps.
          </p>
          <Link to="/menu" className="btn-light mt-9 px-7 py-3.5">
            Order from the menu <FiArrowRight />
          </Link>
        </div>
        <div className="relative min-h-[280px] lg:min-h-full">
          <img src={mocha} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent max-lg:bg-gradient-to-b" />
        </div>
      </div>
    </section>
  );
}
