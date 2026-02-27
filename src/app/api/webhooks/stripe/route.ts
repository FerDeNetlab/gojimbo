import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { subscriptions, orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch {
        return NextResponse.json({ error: "Webhook inválido" }, { status: 400 });
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            const userId = session.metadata?.userId;
            if (!userId) break;

            if (session.mode === "subscription") {
                await db.insert(subscriptions).values({
                    userId,
                    stripeCustomerId: session.customer as string,
                    stripeSubscriptionId: session.subscription as string,
                    status: "active",
                    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                });
            }

            if (session.mode === "payment" && session.metadata?.product === "jimbo_kit") {
                await db.insert(orders).values({
                    userId,
                    stripePaymentId: session.payment_intent as string,
                    product: "jimbo_kit",
                    status: "paid",
                    amount: 1200000,
                });
            }
            break;
        }

        case "customer.subscription.updated": {
            const sub = event.data.object as unknown as Record<string, unknown>;
            const stripeSubId = sub.id as string;

            await db
                .update(subscriptions)
                .set({
                    status: sub.status as "active" | "canceled" | "past_due",
                    currentPeriodEnd: new Date((sub.current_period_end as number) * 1000),
                })
                .where(eq(subscriptions.stripeSubscriptionId, stripeSubId));
            break;
        }

        case "customer.subscription.deleted": {
            const sub = event.data.object;
            await db
                .update(subscriptions)
                .set({ status: "canceled" })
                .where(eq(subscriptions.stripeSubscriptionId, sub.id));
            break;
        }
    }

    return NextResponse.json({ received: true });
}
