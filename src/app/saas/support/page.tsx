"use client";

import { LifeBuoy, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function SaaSSupportPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-black text-jimbo-white">Tickets de Soporte</h1>
                <p className="text-jimbo-muted text-sm mt-1">Gestiona las solicitudes de ayuda de los clientes</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-jimbo-muted">Abiertos</span>
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                    </div>
                    <p className="text-2xl font-black text-jimbo-white">0</p>
                </div>
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-jimbo-muted">En progreso</span>
                        <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-2xl font-black text-jimbo-white">0</p>
                </div>
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-jimbo-muted">Resueltos</span>
                        <CheckCircle2 className="w-5 h-5 text-jimbo-accent" />
                    </div>
                    <p className="text-2xl font-black text-jimbo-white">0</p>
                </div>
            </div>

            <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-8 text-center">
                <LifeBuoy className="w-12 h-12 text-jimbo-muted/30 mx-auto mb-3" />
                <p className="text-jimbo-muted text-sm">No hay tickets de soporte.</p>
                <p className="text-jimbo-muted/60 text-xs mt-2">Los clientes podrán crear tickets desde su panel de administración.</p>
            </div>
        </div>
    );
}
