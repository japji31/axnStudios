import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { collections, products } from "@/lib/catalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Bedding — Loomsville" },
      {
        name: "description",
        content:
          "Browse every Loomsville bedding set in stock: thread counts, weaves, colourways and prices in ₹, from Cotton Muse to Loomsville Royale.",
      },
      { property: "og:title", content: "Shop All Bedding — Loomsville" },
      {
        property: "og:description",
        content: "Every Loomsville weave, in stock and priced — farm cotton, woven for rest.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

type Sort = "featured" | "low" | "high";

function ShopPage() {
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    let list = products.filter((p) => filter === "all" || p.collectionSlug === filter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.weave.toLowerCase().includes(q),
      );
    }
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [filter, sort, query]);

  return (
    <div className="lv page">
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">The Shop</p>
          <h1 className="page-title">Everything in stock.</h1>
          <p className="p-lead">
            Ten weaves across four collections — thread counts, colourways and prices, all in one
            place. Sets include one flat sheet, one fitted sheet and matched pillow covers.
          </p>
        </div>
      </section>

      <section className="page-body">
        <div className="wrap">
          <div className="shop-toolbar">
            <div className="chip-row">
              <button
                className={`chip${filter === "all" ? " active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              {collections.map((c) => (
                <button
                  key={c.slug}
                  className={`chip${filter === c.slug ? " active" : ""}`}
                  onClick={() => setFilter(c.slug)}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <div className="toolbar-right">
              <input
                className="field"
                placeholder="Search weaves"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search products"
              />
              <select
                className="field"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </div>
          </div>

          <p className="result-count">
            {shown.length} {shown.length === 1 ? "piece" : "pieces"}
          </p>

          {shown.length ? (
            <div className="collection-grid">
              {shown.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="p-lead">Nothing matches that search yet.</p>
              <Link className="btn btn-ghost" to="/shop" onClick={() => setQuery("")}>
                Clear filters
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
