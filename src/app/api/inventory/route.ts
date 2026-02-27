import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { inventory, gyms } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const inventorySchema = z.object({
    name: z.string().min(1),
    category: z.string().optional().or(z.literal("")),
    quantity: z.number().int().min(0),
    minQuantity: z.number().int().min(0).optional(),
    notes: z.string().optional().or(z.literal("")),
});

async function getUserGym(userId: string) {
    const [gym] = await db.select().from(gyms).where(eq(gyms.ownerId, userId)).limit(1);
    return gym;
}

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const gym = await getUserGym(session.user.id);
        if (!gym) return NextResponse.json({ error: "No se encontró tu gimnasio" }, { status: 404 });

        const items = await db.select().from(inventory).where(eq(inventory.gymId, gym.id)).orderBy(inventory.createdAt);
        return NextResponse.json({ items });
    } catch {
        return NextResponse.json({ error: "Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const gym = await getUserGym(session.user.id);
        if (!gym) return NextResponse.json({ error: "No se encontró tu gimnasio" }, { status: 404 });

        const body = await req.json();
        const parsed = inventorySchema.safeParse(body);
        if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

        const [item] = await db.insert(inventory).values({
            gymId: gym.id,
            name: parsed.data.name,
            category: parsed.data.category || null,
            quantity: parsed.data.quantity,
            minQuantity: parsed.data.minQuantity || 0,
            notes: parsed.data.notes || null,
        }).returning();

        return NextResponse.json({ item }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const gym = await getUserGym(session.user.id);
        if (!gym) return NextResponse.json({ error: "No se encontró tu gimnasio" }, { status: 404 });

        const body = await req.json();
        const { id, ...rest } = body;
        if (!id) return NextResponse.json({ error: "Falta el ID" }, { status: 400 });

        const parsed = inventorySchema.safeParse(rest);
        if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });

        const [updated] = await db.update(inventory).set({
            name: parsed.data.name,
            category: parsed.data.category || null,
            quantity: parsed.data.quantity,
            minQuantity: parsed.data.minQuantity || 0,
            notes: parsed.data.notes || null,
        }).where(and(eq(inventory.id, id), eq(inventory.gymId, gym.id))).returning();

        if (!updated) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
        return NextResponse.json({ item: updated });
    } catch {
        return NextResponse.json({ error: "Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

        const gym = await getUserGym(session.user.id);
        if (!gym) return NextResponse.json({ error: "No se encontró tu gimnasio" }, { status: 404 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Falta el ID" }, { status: 400 });

        await db.delete(inventory).where(and(eq(inventory.id, id), eq(inventory.gymId, gym.id)));
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Error" }, { status: 500 });
    }
}
