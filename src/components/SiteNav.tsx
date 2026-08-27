import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { collections } from "@/lib/catalog";

const Logo = () => (
  <Link to="/" className="logo">
    <img
      src="https://loomsville.com/cdn/shop/files/loomsville-logo_4b937f79-04dc-4607-b024-c5f45bb66f99.png?v=1759304350"
      alt="Loomsville Logo"
      onError={(e) => {
        // Fallback to local generated logo asset if offline
        (e.target as HTMLImageElement).src = "/images/loomsville_logo_1787741566422.png";
      }}
    />
  </Link>
);

const homeSections = [
  { label: "Our Story", hash: "story" },
  { label: "The Craft", hash: "craft" },
  { label: "Reviews", hash: "reviews" },
];

const aboutSections = [
  { label: "The Standard", hash: "standard" },
  { label: "The Loom", hash: "loom" },
  { label: "The People", hash: "people" },
];

const contactSections = [
  { label: "Write to Us", hash: "write" },
  { label: "Visit the Studio", hash: "studio" },
  { label: "Care & Returns", hash: "care" },
];

export function SiteNav() {
  const navRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => navRef.current?.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="site" ref={navRef} onMouseLeave={() => setOpen(null)}>
      <div className="announce-bar">
        <span>
          Enjoy <strong>10% OFF</strong> on every product — use code <strong>LOOM10</strong>
        </span>
        <span className="announce-sep">·</span>
        <span>
          Add 3 to cart &amp; save <strong>20%</strong> automatically
        </span>
        <span className="announce-sep">·</span>
        <span>Free shipping on all orders</span>
      </div>
      <div className="wrap nav-inner">
        <Logo />

        <div className="nav-links">
          <NavDrop
            label="Home"
            to="/"
            id="home"
            open={open}
            setOpen={setOpen}
            items={homeSections.map((s) => ({ label: s.label, to: "/", hash: s.hash }))}
          />
          <NavDrop
            label="About us"
            to="/about"
            id="about"
            open={open}
            setOpen={setOpen}
            items={aboutSections.map((s) => ({ label: s.label, to: "/about", hash: s.hash }))}
          />
          <Link to="/shop" activeProps={{ className: "is-active" }}>
            Shop
          </Link>
          <NavDrop
            label="Collections"
            to="/collections"
            id="collections"
            open={open}
            setOpen={setOpen}
            items={collections.map((c) => ({
              label: c.name,
              to: "/collections/$slug",
              params: { slug: c.slug },
            }))}
          />
          <NavDrop
            label="Contact us"
            to="/contact"
            id="contact"
            open={open}
            setOpen={setOpen}
            items={contactSections.map((s) => ({ label: s.label, to: "/contact", hash: s.hash }))}
          />
        </div>

        <div className="nav-actions">
          <Link to="/shop" aria-label="Search the shop">
            <svg className="icon-btn" viewBox="0 0 24 24" fill="none" stroke="#2B2621" strokeWidth="1.6">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </Link>
          <Link to="/cart" aria-label="Cart" className="cart-link">
            <svg className="icon-btn" viewBox="0 0 24 24" fill="none" stroke="#2B2621" strokeWidth="1.6">
              <path d="M6 8h12l-1 12H7L6 8z" />
              <path d="M9 8V6a3 3 0 016 0v2" />
            </svg>
            {count > 0 ? <span className="cart-count">{count}</span> : null}
          </Link>
          <button
            className="nav-burger"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#2B2621" strokeWidth="1.6">
              <path d={mobileOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="mobile-menu">
          <div className="wrap">
            {[
              { label: "Home", to: "/" },
              { label: "About us", to: "/about" },
              { label: "Shop", to: "/shop" },
              { label: "Collections", to: "/collections" },
              { label: "Contact us", to: "/contact" },
              { label: "Cart", to: "/cart" },
            ].map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}

type DropItem = { label: string; to: string; hash?: string; params?: Record<string, string> };

function NavDrop({
  label,
  to,
  id,
  items,
  open,
  setOpen,
}: {
  label: string;
  to: string;
  id: string;
  items: DropItem[];
  open: string | null;
  setOpen: (v: string | null) => void;
}) {
  const isOpen = open === id;
  return (
    <div className="nav-drop" onMouseEnter={() => setOpen(id)}>
      <Link to={to} activeProps={{ className: "is-active" }} onClick={() => setOpen(null)}>
        {label}
      </Link>
      <div className={`drop-panel${isOpen ? " open" : ""}`}>
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            params={item.params}
            hash={item.hash}
            onClick={() => setOpen(null)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
