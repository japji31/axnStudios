import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { products, formatINR } from "@/lib/catalog";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "All Collections — Loomsville" },
      {
        name: "description",
        content:
          "Explore all Loomsville bedsheets and comforters — pure farm cotton, artisan-woven for lasting comfort.",
      },
      { property: "og:title", content: "All Collections — Loomsville" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionsPage,
});

const ITEMS_PER_PAGE = 4;

function CollectionsPage() {
  const [filter, setFilter] = useState<"all" | "bedsheet" | "comforter">("all");
  const [page, setPage] = useState(1);

  const filtered =
    filter === "all" ? products : products.filter((p) => p.type === filter);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const visible = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const goToPage = (p: number) => {
    setPage(p);
    document.getElementById("col-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const counts = {
    all: products.length,
    bedsheet: products.filter((p) => p.type === "bedsheet").length,
    comforter: products.filter((p) => p.type === "comforter").length,
  };

  return (
    <div className="lv page">
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">Pure Farm Cotton</p>
          <h1 className="page-title">Our Collections</h1>
          <p className="p-lead" style={{ maxWidth: "520px" }}>
            {counts.all} thoughtfully crafted pieces — from everyday block prints to signature
            comforters.
          </p>
        </div>
      </section>

      <section className="page-body col-page-section" id="col-grid">
        <div className="wrap">
          <div className="col-filter-row">
            {(["all", "bedsheet", "comforter"] as const).map((f) => (
              <button
                key={f}
                className={`col-filter-chip${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "all"
                  ? `All  ·  ${counts.all}`
                  : f === "bedsheet"
                    ? `Bedsheet  ·  ${counts.bedsheet}`
                    : `Comforter  ·  ${counts.comforter}`}
              </button>
            ))}
          </div>

          <div className="col-product-grid">
            {visible.map((product) => (
              <Link
                key={product.slug}
                to="/shop/$slug"
                params={{ slug: product.slug }}
                className="col-product-card"
              >
                <div className="col-card-media">
                  {product.image ? (
                    <img src={product.image} alt={product.name} loading="lazy" />
                  ) : (
                    <div className="col-card-fill" style={{ background: product.fill }} />
                  )}
                  <div className="col-card-hover-layer">
                    <span className="col-card-view-btn">View Product</span>
                  </div>
                  {product.type === "comforter" && (
                    <span className="col-card-badge">Comforter</span>
                  )}
                </div>
                <div className="col-card-body">
                  <span className="col-card-tc">
                    {product.threadCount} · {product.weave}
                  </span>
                  <h3 className="col-card-name">{product.name}</h3>
                  <div className="col-card-foot">
                    <span className="col-card-price">{formatINR(product.price)}</span>
                    <div className="col-card-colors">
                      {product.colours.slice(0, 5).map((c) => (
                        <span
                          key={c.name}
                          className="col-color-dot"
                          title={c.name}
                          style={{ background: c.hex }}
                        />
                      ))}
                      {product.colours.length > 5 && (
                        <span className="col-color-more">+{product.colours.length - 5}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="col-pagination">
              <button
                className="col-page-arrow"
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
                aria-label="Previous page"
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`col-page-btn${page === p ? " active" : ""}`}
                  onClick={() => goToPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                className="col-page-arrow"
                disabled={page === totalPages}
                onClick={() => goToPage(page + 1)}
                aria-label="Next page"
              >
                →
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
