import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/catalog";
import { useRazorpayCheckout } from "@/lib/useRazorpayCheckout";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Loomsville" },
      {
        name: "description",
        content: "Review your selected Loomsville farm-cotton bedding sets and proceed to checkout.",
      },
      { property: "og:title", content: "Your Cart — Loomsville" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CartPage,
});

const FREE_SHIPPING_THRESHOLD = 2999;

function CartPage() {
  const { detailed, subtotal, count, setQty, remove, clear } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    payment: "upi",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { pay, status: payStatus, error: payError } = useRazorpayCheckout();

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shippingCost = amountNeededForFreeShipping === 0 ? 0 : 199;
  const payTotal = subtotal + shippingCost;

  const completeOrder = (reference: string) => {
    clear();
    setIsSubmitting(false);
    setIsCheckoutOpen(false);
    setOrderPlaced(reference);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.payment === "cod") {
      setIsSubmitting(true);
      setTimeout(() => {
        completeOrder(`LV-${Math.floor(100000 + Math.random() * 900000)}`);
      }, 1200);
      return;
    }

    pay({
      amountInRupees: payTotal,
      receipt: `cart-${Date.now()}`,
      description: `Loomsville order · ${count} item${count === 1 ? "" : "s"}`,
      prefill: { name: formData.name, email: formData.email },
      notes: { city: formData.city, pincode: formData.pincode },
      onSuccess: (paymentId) => completeOrder(paymentId),
    });
  };

  if (orderPlaced) {
    return (
      <div className="lv page">
        <section className="page-body">
          <div className="wrap text-center py-16 max-w-xl mx-auto">
            <div className="order-success-card">
              <div className="success-icon">✓</div>
              <p className="eyebrow">Order Confirmed</p>
              <h1 className="h2">Thank you for your order.</h1>
              <p className="p-lead my-4">
                We've received your request for Loomsville handloom bedding. Order reference:{" "}
                <strong>{orderPlaced}</strong>.
              </p>
              <p className="order-note">
                A confirmation has been sent to <em>{formData.email || "your email"}</em>. Your woven sets
                will be dispatched within 2 business days.
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

  if (detailed.length === 0) {
    return (
      <div className="lv page">
        <section className="page-head">
          <div className="wrap text-center">
            <p className="eyebrow">Your Selection</p>
            <h1 className="page-title">Your cart is empty.</h1>
            <p className="p-lead max-w-md mx-auto">
              You haven't added any Loomsville bedding sets yet. Discover our farm-cotton weaves.
            </p>
            <div className="mt-8">
              <Link to="/shop" className="btn btn-primary">
                Explore the Shop
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="lv page">
      <section className="page-head">
        <div className="wrap">
          <p className="eyebrow">Your Selection</p>
          <h1 className="page-title">Shopping Cart ({count})</h1>
        </div>
      </section>

      <section className="page-body">
        <div className="wrap">
          <div className="free-shipping-box">
            {amountNeededForFreeShipping > 0 ? (
              <p className="ship-msg">
                Add <strong>{formatINR(amountNeededForFreeShipping)}</strong> more to qualify for{" "}
                <strong>Free Express Shipping</strong>.
              </p>
            ) : (
              <p className="ship-msg success">✨ You qualify for <strong>Free Express Shipping</strong> across India!</p>
            )}
            <div className="ship-progress-bar">
              <div className="ship-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="cart-grid">
            <div className="cart-items-list">
              <div className="cart-header-row">
                <span>Product</span>
                <span>Size</span>
                <span>Quantity</span>
                <span className="text-right">Total</span>
              </div>

              {detailed.map(({ line, product }) => {
                const lineTotal = product.price * line.qty;
                return (
                  <div key={`${line.slug}-${line.size}`} className="cart-item-row">
                    <div className="item-info">
                      <div className="item-thumb" style={{ background: product.fill }} />
                      <div>
                        <Link
                          to="/shop/$slug"
                          params={{ slug: product.slug }}
                          className="item-name"
                        >
                          {product.name}
                        </Link>
                        <p className="item-meta">{product.weave}</p>
                        <p className="item-price-unit">{formatINR(product.price)} each</p>
                      </div>
                    </div>

                    <div className="item-size">
                      <span className="chip active sm">{line.size}</span>
                    </div>

                    <div className="item-qty">
                      <div className="qty mini">
                        <button
                          onClick={() => setQty(line.slug, line.size, line.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{line.qty}</span>
                        <button
                          onClick={() =>
                            setQty(
                              line.slug,
                              line.size,
                              Math.min(product.stock || 10, line.qty + 1),
                            )
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => remove(line.slug, line.size)}
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="item-total text-right">
                      <span>{formatINR(lineTotal)}</span>
                    </div>
                  </div>
                );
              })}

              <div className="cart-actions-bottom">
                <button className="btn btn-ghost sm" onClick={() => clear()}>
                  Clear Cart
                </button>
                <Link to="/shop" className="btn btn-ghost sm">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-line">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "FREE" : formatINR(shippingCost)}</span>
              </div>
              <div className="summary-line">
                <span>Taxes & Duties</span>
                <span>Included (12% GST)</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-line total">
                <span>Total</span>
                <span>{formatINR(payTotal)}</span>
              </div>

              <button
                className="btn btn-buynow full-width"
                onClick={() => setIsCheckoutOpen(true)}
              >
                Proceed to Checkout
              </button>

              <div className="trust-notes">
                <p>🔒 Secure 256-bit SSL encrypted transaction</p>
                <p>🌿 100% Farm Cotton Guaranteed</p>
                <p>🔄 30-Day Hassle-Free Exchange</p>
                <p>💳 Payments secured by Razorpay</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isCheckoutOpen && (
        <div className="modal-backdrop" onClick={() => setIsCheckoutOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Checkout — Order Details</h2>
              <button className="modal-close" onClick={() => setIsCheckoutOpen(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleCheckoutSubmit} className="checkout-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Priyanika Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="priyanika@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Shipping Address</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Flat/House No., Street, Landmark"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    required
                    type="text"
                    placeholder="Mumbai / Bengaluru"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    required
                    type="text"
                    placeholder="400001"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <div className="radio-options">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={formData.payment === "upi"}
                      onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                    />
                    <span>UPI (Google Pay / PhonePe / Paytm)</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={formData.payment === "card"}
                      onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                    />
                    <span>Credit / Debit Card</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.payment === "cod"}
                      onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {payError ? <p className="pay-error">{payError}</p> : null}

              <div className="modal-footer">
                <div className="modal-total">
                  <span>Pay Total:</span>
                  <strong>{formatINR(payTotal)}</strong>
                </div>
                <button
                  type="submit"
                  className="btn btn-buynow"
                  disabled={isSubmitting || payStatus === "loading"}
                >
                  {isSubmitting || payStatus === "loading"
                    ? "Processing…"
                    : formData.payment === "cod"
                      ? "Place Order"
                      : "Pay & Place Order"}
                </button>
              </div>
              <p className="rzp-secured center">🔒 Payments secured by Razorpay</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
