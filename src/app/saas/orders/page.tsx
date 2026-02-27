"use client";

import { Package } from "lucide-react";

export default function SaaSOrdersPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-black text-jimbo-white">Pedidos JimboKit</h1>
                <p className="text-jimbo-muted text-sm mt-1">Historial de compras de hardware</p>
            </div>

            <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-8 text-center">
                <Package className="w-12 h-12 text-jimbo-muted/30 mx-auto mb-3" />
                <p className="text-jimbo-muted text-sm">No hay pedidos de JimboKit.</p>
                <p className="text-jimbo-muted/60 text-xs mt-2">Los pedidos aparecerán aquí cuando alguien compre el JimboKit ($12,000 MXN).</p>
            </div>
        </div>
    );
}
