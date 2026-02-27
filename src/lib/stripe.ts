import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
    typescript: true,
});

// Jimbo subscription product - $400 MXN/month
export const JIMBO_SUBSCRIPTION_PRICE = 40000; // in centavos
export const JIMBO_SUBSCRIPTION_CURRENCY = "mxn";

// JimboKit hardware - $12,000 MXN one-time
export const JIMBOKIT_PRICE = 1200000; // in centavos
export const JIMBOKIT_CURRENCY = "mxn";
