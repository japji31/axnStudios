import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story & Craft — Loomsville" },
      {
        name: "description",
        content:
          "Learn about Loomsville's commitment to farm-cotton purity, handloom craft, and artisan partnerships.",
      },
      { property: "og:title", content: "Our Story & Craft — Loomsville" },
      {
        property: "og:description",
        content: "The elegance of comfort, woven for life. Farm cotton, crafted with intention.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const CDN = "https://loomsville.com/cdn/shop/files";

function AboutPage() {
  const heroMediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax on hero image
    const onScroll = () => {
      if (heroMediaRef.current) {
        const y = window.scrollY;
        heroMediaRef.current.style.transform = `translateY(${y * 0.38}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll reveal — observe [data-reveal], animate [data-stagger] children
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const children = Array.from(entry.target.querySelectorAll<HTMLElement>("[data-stagger]"));
          if (children.length > 0) {
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add("in-view"), i * 130);
            });
          } else {
            (entry.target as HTMLElement).classList.add("in-view");
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="lv ab-page">
      {/* ── HERO ── */}
      <section className="ab-hero">
        <div className="ab-hero-media" ref={heroMediaRef}>
          <img
            src={`${CDN}/STYLIS_1.jpg?v=1759217960&width=2400`}
            alt="Loomsville bedroom lifestyle"
          />
        </div>
        <div className="ab-hero-overlay" />
        <div className="wrap ab-hero-content">
          <span className="ab-hero-eyebrow">Crafted for Comfort</span>
          <h1 className="ab-hero-title">
            The Elegance of Comfort,
            <br />
            <em>Woven for Life</em>
          </h1>
          <p className="ab-hero-sub">
            Every thread tells a story of artisan hands, sun-dried cotton, and the
            timeless pursuit of a perfect night's rest.
          </p>
        </div>
        <div className="ab-scroll-cue">
          <span>Scroll</span>
          <div className="ab-scroll-line" />
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section className="ab-section" data-reveal>
        <div className="wrap">
          <div className="ab-story-grid">
            <div data-stagger className="slide-left ab-story-text">
              <p className="eyebrow">About Loomsville</p>
              <h2 className="h2">
                A Sanctuary,
                <br />
                <em>Reimagined</em>
              </h2>
              <p className="p-lead">
                Your bedroom is your most intimate space — a sanctuary for rest, renewal, and
                dreams. Loomsville was born from a desire to make that space extraordinary, with
                bed linen crafted from ethically sourced cotton, woven by skilled artisans who
                pour their hearts into every thread.
              </p>
              <p className="p-lead" style={{ marginTop: "18px" }}>
                We believe comfort should never compromise conscience. Every piece is thoughtfully
                made to last, designed to age beautifully, and created to transform the way you
                sleep — night after night, year after year.
              </p>
            </div>
            <div data-stagger className="slide-right ab-img-frame">
              <img
                src={`${CDN}/APpurpleleaves2.jpg?v=1759216586&width=1200`}
                alt="Artisan botanical textile print"
                loading="lazy"
              />
              <div className="ab-img-caption">
                <span>Ethically Sourced · Artisan Made</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="ab-section ab-alt" data-reveal>
        <div className="wrap">
          <div data-stagger className="ab-section-head">
            <p className="eyebrow" style={{ justifyContent: "center" }}>Our Core Values</p>
            <h2 className="h2">What We Stand For</h2>
          </div>
          <div className="ab-values-grid">
            <div data-stagger className="ab-value-card">
              <div className="ab-value-img">
                <img
                  src={`${CDN}/value1.png?v=1759229761&width=800`}
                  alt="Quality woven in"
                  loading="lazy"
                />
              </div>
              <div className="ab-value-body">
                <h3>Quality, Woven In</h3>
                <p>
                  Premium cotton that strengthens with every wash. No shortcuts, no synthetics —
                  just pure textile craftsmanship built to outlast trends.
                </p>
              </div>
            </div>
            <div data-stagger className="ab-value-card">
              <div className="ab-value-img">
                <img
                  src={`${CDN}/value2.png?v=1759229757&width=800`}
                  alt="Timeless style"
                  loading="lazy"
                />
              </div>
              <div className="ab-value-body">
                <h3>Timeless Style</h3>
                <p>
                  Sophisticated aesthetics that transcend seasons. Our designs draw from India's
                  rich weaving heritage, refined for the modern home.
                </p>
              </div>
            </div>
            <div data-stagger className="ab-value-card">
              <div className="ab-value-img">
                <img
                  src={`${CDN}/value3.png?v=1759229802&width=800`}
                  alt="Enduring comfort"
                  loading="lazy"
                />
              </div>
              <div className="ab-value-body">
                <h3>Enduring Comfort</h3>
                <p>
                  Cool, breathable cotton that adapts to your body's rhythm — keeping you
                  comfortable through every season, every night.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION — full bleed ── */}
      <section className="ab-vision" data-reveal>
        <div className="ab-vision-media">
          <img
            src={`${CDN}/img2.jpg?v=1759225205&width=2400`}
            alt="Loomsville bedroom vision"
            loading="lazy"
          />
        </div>
        <div className="ab-vision-overlay" />
        <div className="wrap">
          <div data-stagger className="slide-left ab-vision-content">
            <p className="ab-vision-eyebrow">Our Vision</p>
            <h2 className="ab-vision-title">
              Beyond Bedding.
              <br />
              <em>A Way of Living.</em>
            </h2>
            <p className="ab-vision-body">
              We're expanding our vision beyond sheets — creating a curated world of home
              essentials that reflect the same commitment to comfort, craft, and conscious design.
              Because every room in your home deserves the same intention we pour into the bedroom.
            </p>
          </div>
        </div>
      </section>

      {/* ── MISSION + CTA ── */}
      <section className="ab-section ab-mission" data-reveal>
        <div className="wrap">
          <div data-stagger className="ab-mission-inner">
            <p className="eyebrow" style={{ justifyContent: "center" }}>Our Mission</p>
            <h2 className="h2">
              Thoughtful Essentials,
              <br />
              <em>Timeless Comfort</em>
            </h2>
            <p className="p-lead">
              To craft home essentials that blend natural fabrics with modern sensibility — pieces
              that become more beautiful with time and more meaningful with use.
            </p>
            <div className="ab-cta">
              <Link to="/shop" className="btn btn-primary">
                Explore Our Collections
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
