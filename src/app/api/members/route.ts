import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { members, gyms } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const memberSchema = z.object({
    name: z.string().min(2),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional().or(z.literal("")),
    membershipType: z.string().optional(),
    membershipPrice: z.number().optional(),
    membershipStart: z.string().optional(),
    membershipEnd: z.string().optional(),
    autoRenew: z.boolean().default(true),
});

async function getUserGym(userId: string) {
    const [gym] = await db.select().from(gyms).where(eq(gyms.ownerId, userId)).limit(1);
    return gym;
}

// GET /api/members — list all members for the user's gym
export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const gym = await getUserGym(session.user.id);
        if (!gym) return NextResponse.json({ error: "No se encontró tu gimnasio" }, { status: 404 });

        const memberList = await db
            .select()
            .from(members)
            .where(eq(members.gymId, gym.id))
            .orderBy(members.createdAt);

        return NextResponse.json({ members: memberList });
    } catch {
        return NextResponse.json({ error: "Error al obtener miembros" }, { status: 500 });
    }
}

// POST /api/members — create a new member
export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const gym = await getUserGym(session.user.id);
        if (!gym) return NextResponse.json({ error: "No se encontró tu gimnasio" }, { status: 404 });

        const body = await req.json();
        const parsed = memberSchema.safeParse(body);
        if (!parsed.success) return NextResponse.json({ error: "Datos inválidos", details: parsed.error.flatten() }, { status: 400 });

        const data = parsed.data;

        const [member] = await db.insert(members).values({
            gymId: gym.id,
            name: data.name,
            email: data.email || null,
            phone: data.phone || null,
            membershipType: data.membershipType || null,
            membershipPrice: data.membershipPrice || null,
            membershipStart: data.membershipStart ? new Date(data.membershipStart) : null,
            membershipEnd: data.membershipEnd ? new Date(data.membershipEnd) : null,
            autoRenew: data.autoRenew,
        }).returning();

        return NextResponse.json({ member }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Error al crear miembro" }, { status: 500 });
    }
}

// PUT /api/members — update a member
export async function PUT(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const gym = await getUserGym(session.user.id);
        if (!gym) return NextResponse.json({ error: "No se encontró tu gimnasio" }, { status: 404 });

        const body = await req.json();
        const { id, ...rest } = body;
        if (!id) return NextResponse.json({ error: "Falta el ID" }, { status: 400 });

        const parsed = memberSchema.safeParse(rest);
        if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

        const data = parsed.data;

        const [updated] = await db.update(members).set({
            name: data.name,
            email: data.email || null,
            phone: data.phone || null,
            membershipType: data.membershipType || null,
            membershipPrice: data.membershipPrice || null,
            membershipStart: data.membershipStart ? new Date(data.membershipStart) : null,
            membershipEnd: data.membershipEnd ? new Date(data.membershipEnd) : null,
            autoRenew: data.autoRenew,
        }).where(and(eq(members.id, id), eq(members.gymId, gym.id))).returning();

        if (!updated) return NextResponse.json({ error: "Miembro no encontrado" }, { status: 404 });
        return NextResponse.json({ member: updated });
    } catch {
        return NextResponse.json({ error: "Error al actualizar miembro" }, { status: 500 });
    }
}

// DELETE /api/members — delete a member
export async function DELETE(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const gym = await getUserGym(session.user.id);
        if (!gym) return NextResponse.json({ error: "No se encontró tu gimnasio" }, { status: 404 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Falta el ID" }, { status: 400 });

        await db.delete(members).where(and(eq(members.id, id), eq(members.gymId, gym.id)));
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Error al eliminar miembro" }, { status: 500 });
    }
}
