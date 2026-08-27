import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us & Care Guide — Loomsville" },
      {
        name: "description",
        content:
          "Reach out to the Loomsville team, book a studio appointment, or read our cotton care and shipping policies.",
      },
      { property: "og:title", content: "Contact Us & Care Guide — Loomsville" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ContactPage,
});

const FAQ_ITEMS = [
  {
    q: "How should I wash my Loomsville cotton bedding?",
    a: "Machine wash on a gentle cycle in cold or warm water (up to 30°C) with a mild liquid detergent. Avoid chlorine bleach or fabric softeners, as they leave a film over natural cotton fibres. Line dry in the shade or tumble dry low.",
  },
  {
    q: "What is your 30-day trial & exchange policy?",
    a: "We want you to sleep soundly. Try your Loomsville bedding at home for up to 30 nights. If it does not meet your expectations, we offer free return pickups and full exchanges or store credit across all standard sizes.",
  },
  {
    q: "How long does shipping take across India?",
    a: "Orders placed before 2 PM IST are dispatched the same day. Express delivery takes 2–4 business days for metro cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai) and 4–6 business days for rest of India. Orders over ₹2,999 ship free.",
  },
  {
    q: "What does Thread Count (TC) really mean for sleep?",
    a: "Thread count measures threads woven into one square inch. While many brands inflate numbers using multi-ply threads, Loomsville uses single-ply long-staple cotton (300 TC to 450 TC). This balances breathable airflow with velvety softness.",
  },
  {
    q: "How do I care for hand block printed sheets vs jacquard weaves?",
    a: "For hand block prints (Cotton Muse & Artisan Prints), wash inside-out for the first 2 washes with a salt pinch to lock natural vegetable dyes. For Jacquard (Loom Elan & Royale), iron on low while slightly damp to highlight the woven texture.",
  },
];

function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Product Guidance",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="lv page">
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">Customer Care & Studio</p>
          <h1 className="page-title">We're here for your sleep.</h1>
          <p className="p-lead max-w-2xl">
            Whether you need assistance choosing the right weave, tracking an order, or learning about
            cotton care — write to our team or visit our quiet studio space.
          </p>
        </div>
      </section>

      <section id="write" className="about-section">
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-form-card">
              <p className="eyebrow">Write to Us</p>
              <h2 className="h2">Send a Message</h2>
              <p className="p-lead mb-6">
                Our care team responds within 4 business hours (Monday–Saturday, 9 AM – 6 PM IST).
              </p>

              {formSubmitted ? (
                <div className="form-success-box">
                  <div className="success-icon">✓</div>
                  <h3>Message Sent</h3>
                  <p>
                    Thank you, <strong>{formData.name}</strong>. We've received your note regarding{" "}
                    <em>{formData.subject}</em> and will reply to <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    className="btn btn-ghost sm mt-4"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", subject: "Product Guidance", message: "" });
                    }}
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Aarav Mehta"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="aarav@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="Product Guidance">Product & Weave Guidance</option>
                      <option value="Shipping & Delivery">Shipping & Delivery Status</option>
                      <option value="Returns & Exchanges">Returns & 30-Day Trial</option>
                      <option value="Press & Wholesale">Press & Hospitality Wholesale</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Your Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            <div className="contact-info-col">
              <div className="info-box">
                <div className="info-icon">✉</div>
                <h4>Email Care</h4>
                <p>care@loomsville.com</p>
                <p className="sub-text">For order updates & custom size requests</p>
              </div>

              <div className="info-box">
                <div className="info-icon">📞</div>
                <h4>Concierge Line</h4>
                <p>+91 (022) 4890 1200</p>
                <p className="sub-text">Mon–Sat, 9:30 AM – 6:30 PM IST</p>
              </div>

              <div className="info-box">
                <div className="info-icon">📍</div>
                <h4>Textile Studio</h4>
                <p>12/B Waterfield Road, Bandra West, Mumbai 400050</p>
                <p className="sub-text">By private appointment only</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="about-section alt-bg">
        <div className="wrap">
          <div className="story-grid">
            <div>
              <p className="eyebrow">Feel the Weave</p>
              <h2 className="h2">Visit the Studio</h2>
              <p className="p-lead mb-4">
                Experience Loomsville in person at our flagship studio in Bandra West, Mumbai. Touch sample fabric swatches, compare thread counts, and consult with our bedding specialists.
              </p>
              <div className="studio-hours">
                <div>
                  <strong>Hours:</strong> Tuesday – Sunday, 11:00 AM – 7:30 PM
                </div>
                <div>
                  <strong>Private Consultation:</strong> Available upon request
                </div>
              </div>
            </div>
            <div className="about-card">
              <div
                className="card-gradient-hero"
                style={{ background: "linear-gradient(135deg, #6B4E3D, #C9A876)" }}
              />
              <div className="card-inner">
                <h3>Fabric Swatch Service</h3>
                <p>
                  Can't visit in person? Request a complimentary Loomsville Swatch Card delivered to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="care" className="about-section">
        <div className="wrap max-w-3xl mx-auto">
          <div className="section-head center">
            <p className="eyebrow" style={{ justifyContent: "center" }}>Care & Guidance</p>
            <h2 className="h2">Frequently Asked Questions</h2>
            <p className="p-lead">Everything you need to know about caring for pure cotton and ordering from Loomsville.</p>
          </div>

          <div className="faq-accordion">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? "open" : ""}`}>
                <button
                  className="faq-trigger"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon">{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && (
                  <div className="faq-content">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
