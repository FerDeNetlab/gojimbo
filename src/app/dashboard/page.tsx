"use client";

import { Users, CreditCard, DoorOpen, BarChart3, TrendingUp, UserPlus } from "lucide-react";

function MetricCard({ icon: Icon, title, value, label, accent = false }: { icon: React.ComponentType<{ className?: string }>; title: string; value: string; label: string; accent?: boolean }) {
    return (
        <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-6 hover:border-jimbo-accent/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-jimbo-muted">{title}</span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent ? "bg-jimbo-accent/10" : "bg-jimbo-border/50"}`}>
                    <Icon className={`w-5 h-5 ${accent ? "text-jimbo-accent" : "text-jimbo-muted"}`} />
                </div>
            </div>
            <p className="text-3xl font-black text-jimbo-white">{value}</p>
            <p className="text-xs text-jimbo-muted mt-1">{label}</p>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-black text-jimbo-white">Dashboard</h1>
                <p className="text-jimbo-muted mt-1">Bienvenido a Jimbo. Aquí tienes un resumen de tu gimnasio.</p>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <MetricCard icon={Users} title="Miembros activos" value="0" label="Total registrados" accent />
                <MetricCard icon={CreditCard} title="Ingresos del mes" value="$0" label="MXN recaudados" />
                <MetricCard icon={DoorOpen} title="Accesos hoy" value="0" label="Entradas registradas" />
                <MetricCard icon={TrendingUp} title="Tasa de renovación" value="—" label="Aún sin datos" />
            </div>

            {/* Quick actions */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-jimbo-white mb-4">Acciones rápidas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button className="flex items-center gap-3 p-4 bg-jimbo-card border border-jimbo-border rounded-xl hover:border-jimbo-accent/30 transition-all cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl bg-jimbo-accent/10 flex items-center justify-center group-hover:bg-jimbo-accent/20 transition">
                            <UserPlus className="w-5 h-5 text-jimbo-accent" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-jimbo-white">Agregar miembro</p>
                            <p className="text-xs text-jimbo-muted">Registra un nuevo suscriptor</p>
                        </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-jimbo-card border border-jimbo-border rounded-xl hover:border-jimbo-accent/30 transition-all cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl bg-jimbo-accent/10 flex items-center justify-center group-hover:bg-jimbo-accent/20 transition">
                            <BarChart3 className="w-5 h-5 text-jimbo-accent" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-jimbo-white">Ver reportes</p>
                            <p className="text-xs text-jimbo-muted">Métricas e ingresos</p>
                        </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-jimbo-card border border-jimbo-border rounded-xl hover:border-jimbo-accent/30 transition-all cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl bg-jimbo-accent/10 flex items-center justify-center group-hover:bg-jimbo-accent/20 transition">
                            <DoorOpen className="w-5 h-5 text-jimbo-accent" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-jimbo-white">Control de acceso</p>
                            <p className="text-xs text-jimbo-muted">Abrir pantalla de acceso</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Recent activity placeholder */}
            <div>
                <h2 className="text-lg font-bold text-jimbo-white mb-4">Actividad reciente</h2>
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-8 text-center">
                    <p className="text-jimbo-muted text-sm">No hay actividad reciente aún.</p>
                    <p className="text-jimbo-muted/60 text-xs mt-2">Comienza agregando miembros a tu gimnasio.</p>
                </div>
            </div>
        </div>
    );
}
