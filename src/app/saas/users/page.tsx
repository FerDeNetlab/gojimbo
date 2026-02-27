"use client";

import { Users } from "lucide-react";

export default function SaaSUsersPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-black text-jimbo-white">Usuarios</h1>
                <p className="text-jimbo-muted text-sm mt-1">Todos los usuarios registrados en la plataforma</p>
            </div>

            <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-8 text-center">
                <Users className="w-12 h-12 text-jimbo-muted/30 mx-auto mb-3" />
                <p className="text-jimbo-muted text-sm">Lista de usuarios disponible próximamente.</p>
            </div>
        </div>
    );
}
