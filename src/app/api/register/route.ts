import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { eq } from "drizzle-orm";

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = registerSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
        }

        const { name, email, password } = parsed.data;

        // Check if user already exists
        const [existing] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existing) {
            return NextResponse.json({ error: "Este email ya está registrado" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const [newUser] = await db
            .insert(users)
            .values({ name, email, password: hashedPassword })
            .returning({ id: users.id, email: users.email });

        return NextResponse.json({ user: newUser }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
