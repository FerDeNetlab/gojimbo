import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET /api/me/subscription — check if user has active subscription
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ active: false });

        // Superadmin always has access
        const role = (session.user as { role?: string }).role;
        if (role === "superadmin") return NextResponse.json({ active: true });

        const [sub] = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.userId, session.user.id))
            .limit(1);

        const active = sub?.status === "active" || sub?.status === "trialing";
        return NextResponse.json({ active, subscription: sub || null });
    } catch {
        return NextResponse.json({ active: false });
    }
}
