"use client";

import { Settings, Building2, Bell, CreditCard, Palette } from "lucide-react";

export default function SettingsPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-black text-jimbo-white">Configuración</h1>
                <p className="text-jimbo-muted text-sm mt-1">Personaliza tu gimnasio</p>
            </div>

            <div className="space-y-4 max-w-2xl">
                {/* Gym Info */}
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Building2 className="w-5 h-5 text-jimbo-accent" />
                        <h2 className="text-sm font-bold text-jimbo-white">Información del gimnasio</h2>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs text-jimbo-muted mb-1.5">Nombre</label>
                            <input type="text" placeholder="Tu gimnasio" className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50" />
                        </div>
                        <div>
                            <label className="block text-xs text-jimbo-muted mb-1.5">Dirección</label>
                            <input type="text" placeholder="Calle, colonia, ciudad" className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50" />
                        </div>
                        <div>
                            <label className="block text-xs text-jimbo-muted mb-1.5">Teléfono</label>
                            <input type="tel" placeholder="+52 xxx xxx xxxx" className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50" />
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Bell className="w-5 h-5 text-jimbo-accent" />
                        <h2 className="text-sm font-bold text-jimbo-white">Notificaciones automáticas</h2>
                    </div>
                    <div className="space-y-3">
                        <label className="flex items-center justify-between cursor-pointer">
                            <span className="text-sm text-jimbo-muted">Avisar membresía por vencer (7 días antes)</span>
                            <input type="checkbox" defaultChecked className="accent-jimbo-accent" />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                            <span className="text-sm text-jimbo-muted">Aviso de autorenovación</span>
                            <input type="checkbox" defaultChecked className="accent-jimbo-accent" />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                            <span className="text-sm text-jimbo-muted">Bienvenida a nuevos miembros</span>
                            <input type="checkbox" defaultChecked className="accent-jimbo-accent" />
                        </label>
                    </div>
                </div>

                {/* Payments */}
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <CreditCard className="w-5 h-5 text-jimbo-accent" />
                        <h2 className="text-sm font-bold text-jimbo-white">Pagos con tarjeta (Stripe)</h2>
                    </div>
                    <p className="text-jimbo-muted text-xs mb-3">Conecta tu cuenta de Stripe para cobrar membresías con tarjeta.</p>
                    <button className="px-5 py-2.5 bg-jimbo-accent text-jimbo-black rounded-xl text-sm font-bold hover:bg-jimbo-accent-dim transition cursor-pointer">
                        Configurar Stripe Connect
                    </button>
                </div>

                {/* Appearance */}
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Palette className="w-5 h-5 text-jimbo-accent" />
                        <h2 className="text-sm font-bold text-jimbo-white">Apariencia</h2>
                    </div>
                    <p className="text-jimbo-muted text-xs">Personalización de marca disponible próximamente.</p>
                </div>

                <button className="w-full bg-jimbo-white text-jimbo-black py-3 rounded-xl font-bold text-sm hover:bg-jimbo-accent transition cursor-pointer">
                    Guardar cambios
                </button>
            </div>
        </div>
    );
}
