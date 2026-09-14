import { createServerFn } from "@tanstack/react-start";
import crypto from "node:crypto";
import Razorpay from "razorpay";

function getCredentials() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error(
      "Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to a .env file (see .env.example) and restart the dev server.",
    );
  }
  return { key_id, key_secret };
}

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .validator(
    (data: { amountInPaise: number; receipt: string; notes?: Record<string, string> }) => data,
  )
  .handler(async ({ data }) => {
    const { key_id, key_secret } = getCredentials();
    const client = new Razorpay({ key_id, key_secret });
    const order = await client.orders.create({
      amount: data.amountInPaise,
      currency: "INR",
      receipt: data.receipt,
      notes: data.notes,
    });
    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: key_id,
    };
  });

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .validator((data: { orderId: string; paymentId: string; signature: string }) => data)
  .handler(async ({ data }) => {
    const { key_secret } = getCredentials();
    const expected = crypto
      .createHmac("sha256", key_secret)
      .update(`${data.orderId}|${data.paymentId}`)
      .digest("hex");
    return { verified: expected === data.signature };
  });
