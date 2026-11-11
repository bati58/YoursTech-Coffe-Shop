import { Link } from "react-router-dom";
import beans from "../../assets/blackcoffee.jpg";
import latte from "../../assets/latte.jpg";
import Reveal from "../ui/Reveal";
import { site } from "../../config/site";

export default function About() {
  return (
    <section className="bg-sand/70">
      <div className="container-page grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <img
            src={beans}
            alt="A cup of black coffee surrounded by coffee beans on a wooden table"
            loading="lazy"
            className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-soft"
          />
          <img
            src={latte}
            alt="A layered latte with latte art"
            loading="lazy"
            className="absolute -bottom-8 right-4 hidden aspect-square w-40 rounded-2xl border-[6px] border-sand object-cover shadow-lift sm:block lg:-right-6 lg:w-48"
          />
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            Coffee made with care, <em className="font-medium text-accent-deep">shared with warmth.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {site.fullName} serves fresh coffee made with quality ingredients. We believe a good cup is more than a
            drink — it is a small pause in the day, a conversation, a moment worth remembering.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Our mission is simple: make great coffee, and make ordering it easy and enjoyable for everyone.
          </p>
          <Link to="/about" className="btn-dark mt-8">
            Read our story
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
