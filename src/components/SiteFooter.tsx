import { Link } from "@tanstack/react-router";
import { collections } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img
                src="https://loomsville.com/cdn/shop/files/loomsville-logo_4b937f79-04dc-4607-b024-c5f45bb66f99.png?v=1759304350"
                alt="Loomsville Logo"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/loomsville_logo_1787741566422.png";
                }}
              />
            </Link>
            <p>
              Premium farm cotton bedding, woven for rest. Timeless style, sophisticated comfort,
              made to last.
            </p>
          </div>
          <div>
            <h5>Shop</h5>
            {collections.map((c) => (
              <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }}>
                {c.name}
              </Link>
            ))}
            <Link to="/shop">All bedding</Link>
          </div>
          <div>
            <h5>Company</h5>
            <Link to="/about">Our Story</Link>
            <Link to="/" hash="craft">
              Craft
            </Link>
            <Link to="/" hash="reviews">
              Reviews
            </Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h5>Support</h5>
            <Link to="/contact" hash="care">
              Shipping
            </Link>
            <Link to="/contact" hash="care">
              Returns
            </Link>
            <Link to="/contact" hash="care">
              Care Guide
            </Link>
            <Link to="/cart">Your Cart</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Loomsville. All rights reserved.</span>
          <div className="social">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2B2621" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="3.6" />
                <circle cx="17.2" cy="6.8" r="0.6" fill="#2B2621" />
              </svg>
            </a>
            <a href="#" aria-label="X">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2B2621" strokeWidth="1.6">
                <path d="M22 5.9c-.8.4-1.6.6-2.5.8.9-.6 1.6-1.4 1.9-2.5-.8.5-1.8.9-2.7 1.1A3.9 3.9 0 0016 4c-2.2 0-4 1.8-4 4 0 .3 0 .6.1.9C8.9 8.7 6.4 7.3 4.6 5.1c-.3.6-.5 1.2-.5 1.9 0 1.4.7 2.6 1.8 3.3-.7 0-1.3-.2-1.9-.5 0 1.9 1.4 3.6 3.3 4-.6.2-1.2.2-1.9.1.5 1.6 2 2.8 3.8 2.8-1.4 1.1-3.1 1.7-5 1.7-.3 0-.6 0-1-.1 1.8 1.2 4 1.8 6.3 1.8 7.5 0 11.7-6.4 11.7-12v-.5c.8-.6 1.5-1.3 2-2.1z" />
              </svg>
            </a>
            <a href="#" aria-label="Pinterest">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2B2621" strokeWidth="1.6">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                <path d="M12 6a6 6 0 016 6c0 3-3 4-3 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
