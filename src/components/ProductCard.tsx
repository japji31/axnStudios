import { Link } from "@tanstack/react-router";
import { formatINR, stockLabel, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/shop/$slug"
      params={{ slug: product.slug }}
      className="c-card reveal is-visible product-card"
    >
      <div className="c-thumb">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="fill object-cover w-full h-full"
          />
        ) : (
          <div className="fill" style={{ background: product.fill }} />
        )}
        <span className={`stock-badge${product.stock <= 5 ? " low" : ""}`}>
          {stockLabel(product.stock)}
        </span>
      </div>
      <div className="c-body">
        <p className="c-tc">
          {product.threadCount} · {product.collection}
        </p>
        <h3>{product.name}</h3>
        <p className="desc">{product.desc}</p>
        <div className="c-foot">
          <div className="c-price">
            {product.was ? <span className="was">{formatINR(product.was)}</span> : null}
            {formatINR(product.price)}
          </div>
          <div className="c-dots">
            {product.colours.map((c) => (
              <span key={c.name} style={{ background: c.hex }} title={c.name} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
