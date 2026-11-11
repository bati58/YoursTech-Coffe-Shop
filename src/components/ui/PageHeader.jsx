export default function PageHeader({ eyebrow, title, children }) {
  return (
    <header className="border-b border-line bg-sand/60">
      <div className="container-page py-14 sm:py-20">
        {eyebrow && <p className="eyebrow animate-fade-up">{eyebrow}</p>}
        <h1 className="mt-3 animate-fade-up text-4xl font-semibold text-ink [animation-delay:80ms] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {children && (
          <p className="mt-4 max-w-2xl animate-fade-up text-base leading-relaxed text-muted [animation-delay:160ms] sm:text-lg">
            {children}
          </p>
        )}
      </div>
    </header>
  );
}
