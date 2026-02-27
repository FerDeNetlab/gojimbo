"use client";

import { Building2, Users, CreditCard, TrendingUp } from "lucide-react";

function AdminMetric({ icon: Icon, title, value, label }: { icon: React.ComponentType<{ className?: string }>; title: string; value: string; label: string }) {
    return (
        <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-jimbo-muted">{title}</span>
                <div className="w-10 h-10 rounded-xl bg-jimbo-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-jimbo-accent" />
                </div>
            </div>
            <p className="text-3xl font-black text-jimbo-white">{value}</p>
            <p className="text-xs text-jimbo-muted mt-1">{label}</p>
        </div>
    );
}

export default function AdminPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-black text-jimbo-white">Panel de Administración</h1>
                <p className="text-jimbo-muted mt-1">Gestiona todos los gimnasios registrados en Jimbo.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <AdminMetric icon={Building2} title="Gyms registrados" value="0" label="Total en plataforma" />
                <AdminMetric icon={Users} title="Usuarios" value="0" label="Cuentas creadas" />
                <AdminMetric icon={CreditCard} title="MRR" value="$0" label="Ingresos recurrentes/mes" />
                <AdminMetric icon={TrendingUp} title="Suscripciones activas" value="0" label="Planes activos" />
            </div>

            <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-8 text-center">
                <p className="text-jimbo-muted">Panel de administración listo. Conecta la base de datos para ver datos en vivo.</p>
            </div>
        </div>
    );
}
