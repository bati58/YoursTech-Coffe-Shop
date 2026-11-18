import { Link } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import WhyChoose from "../components/home/WhyChoose";
import Reveal from "../components/ui/Reveal";
import beans from "../assets/blackcoffee.jpg";
import { site } from "../config/site";

function About() {
  return (
    <>
      <PageHeader eyebrow="Our story" title="Coffee, made with care">
        {site.fullName} is built on a simple belief: great coffee deserves great care — in the cup and in the service.
      </PageHeader>

      <section className="container-page grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20">
        <Reveal className="overflow-hidden rounded-[2rem] border border-line bg-sand shadow-soft">
          <img
            src={beans}
            alt="Black coffee with coffee beans on a wooden table"
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-3xl font-semibold sm:text-4xl">Our mission</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {site.fullName} serves fresh coffee made with quality ingredients. Our mission is to make ordering easy and
            enjoyable for everyone — from the first sip to the last.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Our menu is deliberately focused: espresso classics, milk-based favourites and a few specialty drinks, each
            prepared with attention to detail. We would rather make a handful of drinks very well than many drinks
            ordinarily.
          </p>
          <Link to="/menu" className="btn-primary mt-8">Explore the menu</Link>
        </Reveal>
      </section>

      <div className="border-t border-line bg-sand/40">
        <WhyChoose />
      </div>
    </>
  );
}
export default About;
