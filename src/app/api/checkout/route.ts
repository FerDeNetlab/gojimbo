import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe, JIMBO_SUBSCRIPTION_PRICE, JIMBO_SUBSCRIPTION_CURRENCY } from "@/lib/stripe";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const body = await req.json();
        const mode = body.mode || body.type;
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        if (mode === "subscription") {
            // Jimbo monthly subscription checkout
            const checkoutSession = await stripe.checkout.sessions.create({
                mode: "subscription",
                customer_email: session.user.email!,
                metadata: { userId: session.user.id! },
                line_items: [
                    {
                        price_data: {
                            currency: JIMBO_SUBSCRIPTION_CURRENCY,
                            product_data: {
                                name: "Jimbo — Suscripción Mensual",
                                description: "Administra tu gimnasio con Jimbo. Control de acceso, miembros, pagos y más.",
                            },
                            unit_amount: JIMBO_SUBSCRIPTION_PRICE,
                            recurring: { interval: "month" },
                        },
                        quantity: 1,
                    },
                ],
                success_url: `${appUrl}/login?paid=true`,
                cancel_url: `${appUrl}/#precios`,
            });

            return NextResponse.json({ url: checkoutSession.url });
        }

        if (mode === "jimbokit") {
            // JimboKit one-time purchase
            const checkoutSession = await stripe.checkout.sessions.create({
                mode: "payment",
                customer_email: session.user.email!,
                metadata: { userId: session.user.id!, product: "jimbo_kit" },
                line_items: [
                    {
                        price_data: {
                            currency: "mxn",
                            product_data: {
                                name: "JimboKit — Puertas de Cortesía",
                                description: "Kit de puertas de cortesía con lector biométrico integrado.",
                            },
                            unit_amount: 1200000, // $12,000 MXN
                        },
                        quantity: 1,
                    },
                ],
                success_url: `${appUrl}/admin?jimbokit=success`,
                cancel_url: `${appUrl}/#jimbokit`,
            });

            return NextResponse.json({ url: checkoutSession.url });
        }

        return NextResponse.json({ error: "Modo inválido" }, { status: 400 });
    } catch {
        return NextResponse.json({ error: "Error al crear sesión de pago" }, { status: 500 });
    }
}
