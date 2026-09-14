import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { formatINR, getProduct, productsInCollection, stockLabel } from "@/lib/catalog";
import { useRazorpayCheckout } from "@/lib/useRazorpayCheckout";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Piece not found — Loomsville" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${product.threadCount} | Loomsville`;
    return {
      meta: [
        { title },
        { name: "description", content: product.desc },
        { property: "og:title", content: title },
        { property: "og:description", content: product.desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <div className="lv page">
      <section className="page-head">
        <div className="wrap">
          <h1 className="page-title">We can't find that piece.</h1>
          <p className="p-lead">It may have sold through, or the link may be old.</p>
          <Link className="btn btn-primary" to="/shop">
            Back to the shop
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { pay, status, error } = useRazorpayCheckout();
  const [paidId, setPaidId] = useState<string | null>(null);

  const related = productsInCollection(product.collectionSlug).filter(
    (p) => p.slug !== product.slug,
  );

  const onAdd = () => {
    add(product.slug, size, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2600);
  };

  const onBuyNow = () => {
    pay({
      amountInRupees: product.price * qty,
      receipt: `pdp-${product.slug}-${Date.now()}`,
      description: `${product.name} · ${size} × ${qty}`,
      notes: { product: product.name, size, qty: String(qty) },
      onSuccess: (paymentId) => setPaidId(paymentId),
    });
  };

  if (paidId) {
    return (
      <div className="lv page">
        <section className="page-body">
          <div className="wrap text-center py-16 max-w-xl mx-auto">
            <div className="order-success-card">
              <div className="success-icon">✓</div>
              <p className="eyebrow" style={{ justifyContent: "center" }}>
                Payment Successful
              </p>
              <h1 className="h2">Thank you for your order.</h1>
              <p className="p-lead my-4">
                Your {product.name} ({size} × {qty}) is confirmed. Payment reference:{" "}
                <strong>{paidId}</strong>.
              </p>
              <p className="order-note">
                A confirmation email is on its way. Your woven set will be dispatched within
                2 business days.
              </p>
              <div className="mt-8">
                <Link to="/shop" className="btn btn-primary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="lv page">
      <section className="page-body pdp">
        <div className="wrap">
          <p className="crumbs">
            <Link to="/shop">Shop</Link>
            <span>/</span>
            <Link to="/collections/$slug" params={{ slug: product.collectionSlug }}>
              {product.collection}
            </Link>
            <span>/</span>
            <span className="current">{product.name}</span>
          </p>

          <div className="pdp-grid">
            <div className="pdp-media">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="pdp-hero object-cover w-full h-[420px] rounded-2xl"
                />
              ) : (
                <div className="pdp-hero" style={{ background: product.fill }} />
              )}
              <div className="pdp-thumbs">
                {product.colours.map((c) => (
                  <span key={c.name} style={{ background: c.hex }} title={c.name} />
                ))}
              </div>
            </div>

            <div className="pdp-info">
              <p className="eyebrow">{product.collection}</p>
              <h1 className="pdp-title">{product.name}</h1>
              <div className="pdp-price">
                {product.was ? <span className="was">{formatINR(product.was)}</span> : null}
                {formatINR(product.price)}
              </div>
              <p className="p-lead">{product.detail}</p>

              <dl className="spec-list">
                <div>
                  <dt>Thread count</dt>
                  <dd>{product.threadCount}</dd>
                </div>
                <div>
                  <dt>Weave</dt>
                  <dd>{product.weave}</dd>
                </div>
                <div>
                  <dt>Colourways</dt>
                  <dd>{product.colours.map((c) => c.name).join(", ")}</dd>
                </div>
                <div>
                  <dt>Availability</dt>
                  <dd className={product.stock <= 5 ? "low" : ""}>{stockLabel(product.stock)}</dd>
                </div>
              </dl>

              <div className="option-block">
                <p className="option-label">Size</p>
                <div className="chip-row">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`chip${size === s ? " active" : ""}`}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-block">
                <p className="option-label">Quantity</p>
                <div className="qty">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                    −
                  </button>
                  <span>{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))}
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pdp-actions">
                <button
                  className="btn btn-buynow"
                  onClick={onBuyNow}
                  disabled={product.stock === 0 || status === "loading"}
                >
                  {status === "loading" ? "Starting checkout…" : "Buy Now"}
                </button>
                <button className="btn btn-primary" onClick={onAdd} disabled={product.stock === 0}>
                  {product.stock === 0 ? "Out of stock" : "Add to cart"}
                </button>
                <Link className="btn btn-ghost" to="/cart">
                  View cart
                </Link>
              </div>
              {added ? <p className="added-note">Added to your cart.</p> : null}
              {error ? <p className="pay-error">{error}</p> : null}
              <p className="rzp-secured">🔒 Payments secured by Razorpay</p>
            </div>
          </div>

          {related.length ? (
            <div className="related">
              <h2 className="h2">More from {product.collection}</h2>
              <div className="collection-grid">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
