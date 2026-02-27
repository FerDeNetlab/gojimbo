"use client";

import { ScanFace, DoorOpen, UserCheck, Clock } from "lucide-react";

export default function AccessPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-black text-jimbo-white">Control de Acceso</h1>
                <p className="text-jimbo-muted text-sm mt-1">Monitorea las entradas y salidas de tu gimnasio</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-jimbo-muted">Accesos hoy</span>
                        <DoorOpen className="w-5 h-5 text-jimbo-accent" />
                    </div>
                    <p className="text-2xl font-black text-jimbo-white">0</p>
                </div>
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-jimbo-muted">Dentro ahora</span>
                        <UserCheck className="w-5 h-5 text-jimbo-accent" />
                    </div>
                    <p className="text-2xl font-black text-jimbo-white">0</p>
                </div>
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-jimbo-muted">Acceso denegado</span>
                        <Clock className="w-5 h-5 text-jimbo-danger" />
                    </div>
                    <p className="text-2xl font-black text-jimbo-white">0</p>
                </div>
            </div>

            {/* Access methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-6 hover:border-jimbo-accent/30 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-jimbo-accent/10 flex items-center justify-center group-hover:bg-jimbo-accent/20 transition">
                            <ScanFace className="w-7 h-7 text-jimbo-accent" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-jimbo-white">Acceso Biométrico</h3>
                            <p className="text-jimbo-muted text-sm">Reconocimiento facial con face-api.js</p>
                        </div>
                    </div>
                    <p className="text-jimbo-muted text-xs">Abre la pantalla de acceso biométrico para escanear rostros y registrar entradas automáticamente.</p>
                    <div className="mt-4 bg-jimbo-dark rounded-xl p-3 text-center">
                        <p className="text-jimbo-accent text-sm font-medium">Requiere JimboKit activo</p>
                    </div>
                </div>

                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-6 hover:border-jimbo-accent/30 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-jimbo-accent/10 flex items-center justify-center group-hover:bg-jimbo-accent/20 transition">
                            <DoorOpen className="w-7 h-7 text-jimbo-accent" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-jimbo-white">Acceso Manual</h3>
                            <p className="text-jimbo-muted text-sm">Registra entradas manualmente</p>
                        </div>
                    </div>
                    <p className="text-jimbo-muted text-xs">Busca un miembro por nombre y registra su entrada manualmente desde aquí.</p>
                </div>
            </div>

            {/* Recent access log */}
            <div>
                <h2 className="text-lg font-bold text-jimbo-white mb-4">Log de accesos</h2>
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-8 text-center">
                    <DoorOpen className="w-12 h-12 text-jimbo-muted/30 mx-auto mb-3" />
                    <p className="text-jimbo-muted text-sm">No hay accesos registrados hoy.</p>
                    <p className="text-jimbo-muted/60 text-xs mt-2">Los accesos aparecerán aquí cuando los miembros entren al gimnasio.</p>
                </div>
            </div>
        </div>
    );
}
