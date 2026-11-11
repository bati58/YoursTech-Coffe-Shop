import { testimonials } from "../../data/testimonials";
import Reveal from "../ui/Reveal";

export default function Testimonials() {
  return (
    <section className="bg-sand/70">
      <div className="container-page py-20 sm:py-28">
        <div className="max-w-xl">
          <p className="eyebrow">Kind words</p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">What our guests say</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-8">
                <span className="font-serif text-6xl leading-none text-accent-light" aria-hidden="true">“</span>
                <blockquote className="-mt-2 flex-1 font-serif text-xl leading-snug">{t.text}</blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-serif text-cream">{t.name[0]}</span>
                  <span className="font-medium">{t.name}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">Customer comments shown here are not independently verified reviews.</p>
      </div>
    </section>
  );
}
