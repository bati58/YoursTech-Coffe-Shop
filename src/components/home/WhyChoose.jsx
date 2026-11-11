import { FiCoffee, FiCheckCircle, FiSmile, FiShoppingBag } from "react-icons/fi";
import Reveal from "../ui/Reveal";
import { site } from "../../config/site";

const reasons = [
  { icon: FiCoffee, title: "Quality coffee", text: "Fresh beans, roasted and brewed daily for a cup that tastes the way it should." },
  { icon: FiCheckCircle, title: "Carefully selected ingredients", text: "From the milk to the chocolate, every ingredient is chosen with care." },
  { icon: FiSmile, title: "Comfortable experience", text: "A warm, welcoming atmosphere that makes every visit feel unhurried." },
  { icon: FiShoppingBag, title: "Convenient ordering", text: "Pick your drink, add to cart and check out in a few simple steps." },
];

export default function WhyChoose() {
  return (
    <section className="container-page py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Why {site.name}</p>
        <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Why choose {site.fullName}</h2>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 80} className="bg-cream p-8 transition hover:bg-white">
            <span className="font-serif text-sm text-accent">0{i + 1}</span>
            <Icon size={28} className="mt-6 text-accent-deep" aria-hidden="true" />
            <h3 className="mt-5 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
