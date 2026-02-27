import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { gyms, users, subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET /api/admin/clients — list all gyms with owner info (admin only)
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const [user] = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);
        if (!user || user.role !== "admin") return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });

        const allGyms = await db
            .select({
                id: gyms.id,
                name: gyms.name,
                slug: gyms.slug,
                approxMembers: gyms.approxMembers,
                hasJimboKit: gyms.hasJimboKit,
                createdAt: gyms.createdAt,
                ownerName: users.name,
                ownerEmail: users.email,
            })
            .from(gyms)
            .innerJoin(users, eq(gyms.ownerId, users.id))
            .orderBy(gyms.createdAt);

        // Get subscription status for each owner
        const gymsWithSubs = await Promise.all(
            allGyms.map(async (gym) => {
                const [sub] = await db
                    .select()
                    .from(subscriptions)
                    .innerJoin(users, eq(subscriptions.userId, users.id))
                    .innerJoin(gyms, eq(gyms.ownerId, users.id))
                    .where(eq(gyms.id, gym.id))
                    .limit(1);

                return {
                    ...gym,
                    subscriptionStatus: sub?.subscriptions?.status || "none",
                };
            })
        );

        return NextResponse.json({ clients: gymsWithSubs });
    } catch {
        return NextResponse.json({ error: "Error" }, { status: 500 });
    }
}
