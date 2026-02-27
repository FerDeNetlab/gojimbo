"use client";

import { CreditCard, TrendingUp, DollarSign, CalendarDays } from "lucide-react";

export default function PaymentsPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-black text-jimbo-white">Pagos</h1>
                <p className="text-jimbo-muted text-sm mt-1">Historial de cobros y membresías</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-jimbo-muted">Ingresos del mes</span>
                        <DollarSign className="w-5 h-5 text-jimbo-accent" />
                    </div>
                    <p className="text-2xl font-black text-jimbo-white">$0 MXN</p>
                    <p className="text-xs text-jimbo-muted mt-1">Este mes</p>
                </div>
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-jimbo-muted">Membresías activas</span>
                        <CreditCard className="w-5 h-5 text-jimbo-accent" />
                    </div>
                    <p className="text-2xl font-black text-jimbo-white">0</p>
                    <p className="text-xs text-jimbo-muted mt-1">Con pago al día</p>
                </div>
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-jimbo-muted">Próximas a vencer</span>
                        <CalendarDays className="w-5 h-5 text-yellow-500" />
                    </div>
                    <p className="text-2xl font-black text-jimbo-white">0</p>
                    <p className="text-xs text-jimbo-muted mt-1">En los próximos 7 días</p>
                </div>
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-jimbo-muted">Tasa de renovación</span>
                        <TrendingUp className="w-5 h-5 text-jimbo-accent" />
                    </div>
                    <p className="text-2xl font-black text-jimbo-white">—</p>
                    <p className="text-xs text-jimbo-muted mt-1">Aún sin datos</p>
                </div>
            </div>

            {/* Transaction history placeholder */}
            <div>
                <h2 className="text-lg font-bold text-jimbo-white mb-4">Historial de transacciones</h2>
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-8 text-center">
                    <CreditCard className="w-12 h-12 text-jimbo-muted/30 mx-auto mb-3" />
                    <p className="text-jimbo-muted text-sm">No hay transacciones registradas aún.</p>
                    <p className="text-jimbo-muted/60 text-xs mt-2">Las transacciones de Stripe aparecerán aquí cuando tus miembros paguen.</p>
                </div>
            </div>
        </div>
    );
}
