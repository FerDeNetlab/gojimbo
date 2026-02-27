import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { gyms } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET /api/me/gym — get the authenticated user's gym
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ gym: null });

        const [gym] = await db.select().from(gyms).where(eq(gyms.ownerId, session.user.id)).limit(1);
        return NextResponse.json({ gym: gym || null });
    } catch {
        return NextResponse.json({ gym: null });
    }
}
