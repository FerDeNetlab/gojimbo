"use client";

import { CreditCard, TrendingUp, DollarSign } from "lucide-react";

export default function SaaSSubscriptionsPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-black text-jimbo-white">Suscripciones</h1>
                <p className="text-jimbo-muted text-sm mt-1">Todas las suscripciones de Stripe</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-jimbo-muted">MRR</span>
                        <DollarSign className="w-5 h-5 text-jimbo-accent" />
                    </div>
                    <p className="text-2xl font-black text-jimbo-white">$0 MXN</p>
                    <p className="text-xs text-jimbo-muted mt-1">Ingresos recurrentes mensuales</p>
                </div>
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-jimbo-muted">Activas</span>
                        <CreditCard className="w-5 h-5 text-jimbo-accent" />
                    </div>
                    <p className="text-2xl font-black text-jimbo-white">0</p>
                </div>
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-jimbo-muted">Churn rate</span>
                        <TrendingUp className="w-5 h-5 text-jimbo-accent" />
                    </div>
                    <p className="text-2xl font-black text-jimbo-white">0%</p>
                </div>
            </div>

            <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-8 text-center">
                <CreditCard className="w-12 h-12 text-jimbo-muted/30 mx-auto mb-3" />
                <p className="text-jimbo-muted text-sm">Las suscripciones aparecerán aquí cuando los clientes compren.</p>
            </div>
        </div>
    );
}
