import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Loomsville — Luxury & Comfort for Your Home" },
      {
        name: "description",
        content:
          "Premium farm-cotton bedsheets woven for rest. Breathable, refined, and soft wash after wash — the elegance of comfort, in its purest form.",
      },
      { property: "og:title", content: "Loomsville — Woven for Rest" },
      {
        property: "og:description",
        content:
          "Premium farm-cotton bedding. Breathable weaves, fade-resistant colour, softness that lasts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CDN = "https://loomsville.com/cdn/shop/files";

const ThreadDivider = () => (
  <svg className="thread-divider" viewBox="0 0 1200 34" preserveAspectRatio="none" aria-hidden="true">
    <g fill="none" strokeWidth="1.4">
      <path d="M0 17 C 150 0, 300 34, 450 17 S 750 0, 900 17 S 1150 30, 1200 17" stroke="#7E8A6B" />
      <path d="M0 17 C 150 34, 300 0, 450 17 S 750 34, 900 17 S 1150 4, 1200 17" stroke="#C9A876" />
    </g>
  </svg>
);

const homeCollections = [
  {
    tc: "300 TC · Block Print",
    name: "Cotton Muse",
    desc: "Pure farm cotton in hand block prints — soft, breathable, understated.",
    was: "₹3,999",
    price: "₹1,999",
    image: `${CDN}/CMbeige1.jpg?v=1759325188&width=800`,
    slug: "cotton-muse",
    dots: ["#7E8A6B", "#C9A876"],
  },
  {
    tc: "400 TC · Jacquard",
    name: "Loom Elan",
    desc: "Woven jacquard texture with a refined hand — quietly luxurious.",
    was: "₹4,999",
    price: "₹3,899",
    image: `${CDN}/JCdarkgrey1.jpg?v=1759153481&width=800`,
    slug: "loom-elan",
    dots: ["#3A3A38", "#C6A199", "#F2EEE3"],
  },
  {
    tc: "380 TC · Artisan Print",
    name: "Artisan Prints",
    desc: "Botanical motifs printed by hand — for rooms with real character.",
    was: "₹4,999",
    price: "₹2,799",
    image: `${CDN}/APpearlmaze1.jpg?v=1759326274&width=800`,
    slug: "artisan-prints",
    dots: ["#C9A876", "#B8B8B2"],
  },
  {
    tc: "450 TC · Signature Hybrid",
    name: "Loomsville Royale",
    desc: "Jacquard + plain weave hybrid — the flagship, made to be an heirloom.",
    price: "₹12,999",
    image: `${CDN}/RWdustyrose1.jpg?v=1759154548&width=800`,
    slug: "loomsville-royale",
    dots: ["#6B4E3D", "#B8B8B2", "#6E7C87"],
  },
];

const tickerItems = [
  "300 TC Pure Farm Cotton",
  "Free Shipping on All Orders",
  "Artisan Block Print",
  "10% Off Sitewide",
  "Breathable Weave",
  "Build a Bundle · Save 20%",
  "Made for Sleep",
];

function Index() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>(".reveal") ?? [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.transitionDelay = `${(i % 4) * 90}ms`;
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const threads = rootRef.current?.querySelectorAll<SVGPathElement>(".hero-weave .thread") ?? [];
    const timers: ReturnType<typeof setTimeout>[] = [];
    threads.forEach((t, i) => {
      if (reduce) { t.style.strokeDashoffset = "0"; return; }
      t.style.transition = "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)";
      t.style.transitionDelay = `${i * 140}ms`;
      timers.push(setTimeout(() => (t.style.strokeDashoffset = "0"), 60));
    });

    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return (
    <div className="lv" ref={rootRef}>

      {/* ── HERO ── */}
      <header className="hero">
        <div className="hero-blob blob-a" />
        <div className="hero-blob blob-b" />
        <svg className="hero-weave" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g strokeWidth="1.4" fill="none">
            <path className="thread" d="M-50 120 C 300 60, 700 180, 1250 100" stroke="#7E8A6B" strokeDasharray="1400" strokeDashoffset="1400" />
            <path className="thread" d="M-50 260 C 350 320, 650 200, 1250 280" stroke="#C9A876" strokeDasharray="1400" strokeDashoffset="1400" />
            <path className="thread" d="M-50 420 C 300 380, 750 460, 1250 400" stroke="#C6A199" strokeDasharray="1400" strokeDashoffset="1400" />
            <path className="thread" d="M-50 560 C 380 620, 700 520, 1250 580" stroke="#7E8A6B" strokeDasharray="1400" strokeDashoffset="1400" />
            <path className="thread" d="M-50 700 C 300 660, 800 740, 1250 690" stroke="#C9A876" strokeDasharray="1400" strokeDashoffset="1400" />
          </g>
        </svg>

        <div className="wrap hero-split">
          <div className="hero-inner">
            <p className="eyebrow">Pure Farm Cotton</p>
            <h1 className="hero-title">
              Luxury &amp; Comfort
              <br />
              for Your <em>Home.</em>
            </h1>
            <p className="hero-sub">
              Premium cotton bedsheets, thread by thread — the elegance of comfort in its purest
              form, made for those who don't compromise on sleep.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-primary" to="/shop">
                Shop Now
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link className="btn btn-ghost" to="/collections">
                All Collections
              </Link>
            </div>
            <div className="hero-badges">
              <span>🛡 2-Year Warranty</span>
              <span>↩ 90-Day Returns</span>
              <span>🚚 Free Shipping</span>
            </div>
          </div>

          <div className="hero-lifestyle">
            <div className="hero-lifestyle-frame">
              <img
                src={`${CDN}/Slide1.jpg?v=1759223415&width=1200`}
                alt="Loomsville bedroom lifestyle"
                loading="eager"
              />
              <div className="hero-lifestyle-badge">
                <span className="hlb-label">Starting at</span>
                <span className="hlb-price">₹1,999</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MARQUEE ── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── LIFESTYLE / BRAND SECTION ── */}
      <section id="brand" className="home-brand-section">
        <div className="wrap">
          <div className="home-brand-grid">
            <div className="home-brand-imgs reveal">
              <div className="hbi-main">
                <img src={`${CDN}/img1.jpg?v=1759225188&width=1248`} alt="Loomsville lifestyle" loading="lazy" />
              </div>
              <div className="hbi-secondary">
                <img src={`${CDN}/img2.jpg?v=1759225205&width=1248`} alt="Loomsville bedroom" loading="lazy" />
              </div>
            </div>
            <div className="home-brand-text reveal">
              <p className="eyebrow">The Art of Restful Living</p>
              <h2 className="h2">
                More than bedding.
                <br />
                <em>A celebration</em> of rest.
              </h2>
              <p className="p-lead">
                Loomsville is more than a premium cotton brand — it's a celebration of restful living.
                We believe your bedroom should feel like a sanctuary. Every weave, every thread, every
                colour is chosen with that single purpose.
              </p>
              <blockquote className="pull">
                "The elegance of comfort, in its purest form."
              </blockquote>
              <Link to="/about" className="btn btn-ghost" style={{ marginTop: "28px", display: "inline-flex" }}>
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap"><ThreadDivider /></div>

      {/* ── COLLECTIONS WITH REAL IMAGES ── */}
      <section id="collections" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow" style={{ justifyContent: "center" }}>Collections</p>
            <h2 className="h2">Find your weave.</h2>
            <p className="p-lead" style={{ margin: "0 auto" }}>
              From everyday plain weaves to jacquard heirlooms — four collections, each with its own
              texture and temperament.
            </p>
          </div>
          <div className="collection-grid">
            {homeCollections.map((c) => (
              <Link
                to="/collections/$slug"
                params={{ slug: c.slug }}
                className="c-card reveal"
                key={c.name}
              >
                <div className="c-thumb">
                  <img className="fill" src={c.image} alt={c.name} loading="lazy" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                </div>
                <div className="c-body">
                  <p className="c-tc">{c.tc}</p>
                  <h3>{c.name}</h3>
                  <p className="desc">{c.desc}</p>
                  <div className="c-foot">
                    <div className="c-price">
                      {c.was ? <span className="was">{c.was}</span> : null}
                      {c.price}
                    </div>
                    <div className="c-dots">
                      {c.dots.map((d) => (
                        <span key={d} style={{ background: d }} />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link to="/collections" className="btn btn-primary">
              View All Products
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BUNDLE PROMO ── */}
      <section className="bundle-promo">
        <div className="wrap">
          <div className="bp-inner reveal">
            <div className="bp-text">
              <p className="eyebrow" style={{ color: "var(--sand)" }}>Limited Offer</p>
              <h2 className="h2" style={{ color: "var(--ivory)" }}>
                Build Your Bundle
                <br />
                <em style={{ color: "var(--sand)" }}>Save 20%</em>
              </h2>
              <p className="p-lead" style={{ color: "rgba(245,239,226,0.72)", maxWidth: "420px" }}>
                Add any 3 Loomsville products to your cart and the 20% discount applies automatically.
                Mix and match across collections.
              </p>
              <Link to="/shop" className="btn btn-primary" style={{ marginTop: "28px", background: "var(--sand)", color: "var(--charcoal)", border: "none" }}>
                Build Your Bundle
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="bp-imgs">
              <img src={`${CDN}/CSslateblue1.jpg?v=1759213402&width=600`} alt="Cotton Sole" loading="lazy" />
              <img src={`${CDN}/emplvory1.jpg?v=1759745696&width=600`} alt="Empress Edit" loading="lazy" />
              <img src={`${CDN}/comforter1.jpg?v=1759324552&width=600`} alt="Loomsville Suite" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES / BENEFITS ── */}
      <section id="craft">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Why Loomsville</p>
            <h2 className="h2">Built for the long night's sleep.</h2>
          </div>
          <div className="feature-strip">
            <div className="feature reveal">
              <div className="ficon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h4>Always Here for You</h4>
              <p>Friendly support whenever you need it — we're always here to help.</p>
            </div>
            <div className="feature reveal">
              <div className="ficon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
              <h4>Free Shipping</h4>
              <p>Enjoy free shipping and returns on all orders, no minimum required.</p>
            </div>
            <div className="feature reveal">
              <div className="ficon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M4 6h16M4 12h10M4 18h13" />
                </svg>
              </div>
              <h4>Fresh Arrivals</h4>
              <p>Stay ahead of trends with our latest collections and new colourways.</p>
            </div>
            <div className="feature reveal">
              <div className="ficon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h4>Secure Payment</h4>
              <p>Your payment details are encrypted and handled with complete care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow" style={{ justifyContent: "center" }}>Reviews</p>
            <h2 className="h2">Sleep, according to Loomsville.</h2>
          </div>
          <div className="test-grid">
            <figure className="test-card reveal">
              <div className="stars">★★★★★</div>
              <p className="quote">
                "A year in and the weave still feels new — no pilling, no fading. This is the first
                bedsheet set that's actually held up."
              </p>
              <figcaption className="test-who">
                <div className="avatar" />
                <div>
                  <div className="name">Rajesh K.</div>
                  <div className="role">Verified customer</div>
                </div>
              </figcaption>
            </figure>
            <figure className="test-card reveal">
              <div className="stars">★★★★★</div>
              <p className="quote">
                "Rich colour, refined finish — my bedroom feels calmer just from changing the
                sheets. Timeless in a way that's hard to find."
              </p>
              <figcaption className="test-who">
                <div className="avatar" />
                <div>
                  <div className="name">Ananya S.</div>
                  <div className="role">Verified customer</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section>
        <div className="wrap">
          <div className="cta-band reveal">
            <h2 className="h2">
              Sleep should feel
              <br />
              like <em>this.</em>
            </h2>
            <p className="p-lead">
              Join the list for early access to new colourways, quiet offers, and the occasional
              story from the loom.
            </p>
            <form className="input-row" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Your email address" type="email" aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
