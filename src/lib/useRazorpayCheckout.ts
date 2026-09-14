import { useCallback, useState } from "react";
import { createRazorpayOrder, verifyRazorpayPayment } from "./payments.server";
import { loadRazorpayScript } from "./razorpay-client";

const BRAND_LOGO =
  "https://loomsville.com/cdn/shop/files/loomsville-logo_4b937f79-04dc-4607-b024-c5f45bb66f99.png?v=1759304350";

type CheckoutInput = {
  amountInRupees: number;
  receipt: string;
  description: string;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  onSuccess: (paymentId: string) => void;
};

export function useRazorpayCheckout() {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const pay = useCallback(async (input: CheckoutInput) => {
    setStatus("loading");
    setError(null);
    try {
      await loadRazorpayScript();
      if (!window.Razorpay) throw new Error("Razorpay checkout could not be loaded.");

      const order = await createRazorpayOrder({
        data: {
          amountInPaise: Math.round(input.amountInRupees * 100),
          receipt: input.receipt,
          notes: input.notes,
        },
      });

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Loomsville",
        description: input.description,
        image: BRAND_LOGO,
        prefill: input.prefill,
        theme: { color: "#2B2621" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verify = await verifyRazorpayPayment({
              data: {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              },
            });
            if (verify.verified) {
              setStatus("idle");
              input.onSuccess(response.razorpay_payment_id);
            } else {
              setStatus("error");
              setError("We couldn't verify that payment. Please contact support before retrying.");
            }
          } catch {
            setStatus("error");
            setError("We couldn't verify that payment. Please contact support before retrying.");
          }
        },
        modal: {
          ondismiss: () => setStatus("idle"),
        },
      });
      rzp.open();
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong starting checkout.");
    }
  }, []);

  return { pay, status, error };
}
