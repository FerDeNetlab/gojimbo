import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { gyms } from "@/lib/db/schema";
import { z } from "zod";

const onboardingSchema = z.object({
    gymName: z.string().min(2),
    slug: z.string().min(2),
    approxMembers: z.string().optional(),
    wantsJimboKit: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const body = await req.json();
        const parsed = onboardingSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
        }

        const { gymName, slug, approxMembers, wantsJimboKit } = parsed.data;

        const membersMap: Record<string, number> = { "1-50": 50, "51-150": 150, "151-300": 300, "300+": 500 };

        const [gym] = await db.insert(gyms).values({
            ownerId: session.user.id,
            name: gymName,
            slug,
            approxMembers: approxMembers ? membersMap[approxMembers] || 50 : null,
            hasJimboKit: wantsJimboKit,
        }).returning();

        return NextResponse.json({ gym }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Error al crear gym" }, { status: 500 });
    }
}
