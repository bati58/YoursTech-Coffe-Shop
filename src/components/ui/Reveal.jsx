import { useEffect, useRef, useState } from "react";

// Fades children in once they scroll into view.
export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => !("IntersectionObserver" in window));

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`${visible ? "animate-fade-up" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}
