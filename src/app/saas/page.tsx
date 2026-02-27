"use client";

import { Building2, CreditCard, TrendingUp, Users, DollarSign, ArrowUpRight } from "lucide-react";
import Link from "next/link";

function SaaSMetric({ icon: Icon, title, value, label, href, trend }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string; value: string; label: string; href: string; trend?: string;
}) {
    return (
        <Link href={href} className="bg-jimbo-card border border-jimbo-border rounded-2xl p-6 hover:border-jimbo-accent/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-jimbo-muted">{title}</span>
                <div className="w-10 h-10 rounded-xl bg-jimbo-accent/10 flex items-center justify-center group-hover:bg-jimbo-accent/20 transition">
                    <Icon className="w-5 h-5 text-jimbo-accent" />
                </div>
            </div>
            <p className="text-3xl font-black text-jimbo-white">{value}</p>
            <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-jimbo-muted">{label}</p>
                {trend && <span className="text-xs text-jimbo-accent flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />{trend}</span>}
            </div>
        </Link>
    );
}

export default function SaaSDashboard() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-black text-jimbo-white">Panel SaaS</h1>
                <p className="text-jimbo-muted mt-1">Gestión interna de Jimbo como empresa</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <SaaSMetric icon={Building2} title="Gyms" value="0" label="Registrados" href="/saas/clients" />
                <SaaSMetric icon={CreditCard} title="Suscripciones" value="0" label="Activas" href="/saas/subscriptions" />
                <SaaSMetric icon={DollarSign} title="MRR" value="$0" label="Ingresos recurrentes" href="/saas/subscriptions" />
                <SaaSMetric icon={Users} title="Usuarios" value="1" label="Registrados" href="/saas/users" />
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Link href="/saas/clients" className="bg-jimbo-card border border-jimbo-border rounded-xl p-5 hover:border-jimbo-accent/30 transition-all group">
                    <Building2 className="w-6 h-6 text-jimbo-accent mb-3" />
                    <h3 className="text-sm font-bold text-jimbo-white mb-1">Clientes</h3>
                    <p className="text-xs text-jimbo-muted">Ver todos los gimnasios registrados, sus dueños y estado de suscripción.</p>
                </Link>
                <Link href="/saas/support" className="bg-jimbo-card border border-jimbo-border rounded-xl p-5 hover:border-jimbo-accent/30 transition-all group">
                    <TrendingUp className="w-6 h-6 text-jimbo-accent mb-3" />
                    <h3 className="text-sm font-bold text-jimbo-white mb-1">Tickets de soporte</h3>
                    <p className="text-xs text-jimbo-muted">Gestionar solicitudes de ayuda de los clientes.</p>
                </Link>
                <Link href="/admin" className="bg-jimbo-accent/10 border border-jimbo-accent/30 rounded-xl p-5 hover:bg-jimbo-accent/20 transition-all group">
                    <ArrowUpRight className="w-6 h-6 text-jimbo-accent mb-3" />
                    <h3 className="text-sm font-bold text-jimbo-accent mb-1">Ir al producto</h3>
                    <p className="text-xs text-jimbo-muted">Abrir el panel de administración de gym (entorno de pruebas).</p>
                </Link>
            </div>

            {/* Placeholder */}
            <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-8 text-center">
                <p className="text-jimbo-muted text-sm">Las métricas se llenarán conforme se registren clientes y suscripciones.</p>
            </div>
        </div>
    );
}
