import { useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import products, { categories } from "../data/products";
import ProductCard from "../components/ProductCard";
import PageHeader from "../components/ui/PageHeader";
import { site } from "../config/site";

const sorts = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price: high to low", fn: (a, b) => b.price - a.price },
  name: { label: "Name: A–Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

export default function Menu() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Products");
  const [sort, setSort] = useState("featured");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => category === "All Products" || p.category === category)
      .filter((p) => !q || `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q))
      .sort(sorts[sort].fn);
  }, [query, category, sort]);

  const reset = () => {
    setQuery("");
    setCategory("All Products");
    setSort("featured");
  };

  return (
    <>
      <PageHeader eyebrow={`The ${site.name} menu`} title="Our coffee menu">
        From a bold espresso shot to an indulgent iced white mocha — every drink is crafted to order.
      </PageHeader>

      <div className="container-page py-10 sm:py-14">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {["All Products", ...categories].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                  category === c
                    ? "border-ink bg-ink text-cream"
                    : "border-line bg-white text-ink hover:border-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative sm:w-64">
              <label htmlFor="menu-search" className="sr-only">Search the menu</label>
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search drinks…"
                className="input !rounded-full pl-11"
              />
            </div>
            <div>
              <label htmlFor="menu-sort" className="sr-only">Sort products</label>
              <select
                id="menu-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="input !rounded-full sm:w-52"
              >
                {Object.entries(sorts).map(([k, s]) => (
                  <option key={k} value={k}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "drink" : "drinks"}
        </p>

        {visible.length > 0 ? (
          <div className="mt-8 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md py-20 text-center">
            <h2 className="text-3xl font-semibold">No drinks found</h2>
            <p className="mt-3 text-muted">Nothing matches your search. Try a different word or clear the filters.</p>
            <button onClick={reset} className="btn-outline mt-6">
              <FiX /> Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
