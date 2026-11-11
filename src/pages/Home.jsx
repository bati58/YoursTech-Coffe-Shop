import Hero from "../components/home/Hero";
import ProductsPreview from "../components/home/ProductsPreview";
import About from "../components/home/About";
import WhyChoose from "../components/home/WhyChoose";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsPreview />
      <About />
      <WhyChoose />
      <Testimonials />
      <CTA />
    </>
  );
}
