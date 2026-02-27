"use client";

import { useEffect, useState, useCallback } from "react";
import { Building2, Users, CreditCard, Search, ExternalLink } from "lucide-react";

type Client = {
    id: string;
    name: string;
    slug: string;
    approxMembers: number | null;
    hasJimboKit: boolean;
    createdAt: string;
    ownerName: string;
    ownerEmail: string;
    subscriptionStatus: string;
};

export default function SaaSClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchClients = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/admin/clients");
        const data = await res.json();
        setClients(data.clients || []);
        setLoading(false);
    }, []);

    useEffect(() => { fetchClients(); }, [fetchClients]);

    const filtered = clients.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.ownerEmail.toLowerCase().includes(search.toLowerCase())
    );

    const statusBadge = (s: string) => {
        switch (s) {
            case "active": return "bg-jimbo-accent/10 text-jimbo-accent";
            case "canceled": return "bg-jimbo-danger/10 text-jimbo-danger";
            case "past_due": return "bg-yellow-500/10 text-yellow-500";
            default: return "bg-jimbo-muted/10 text-jimbo-muted";
        }
    };
    const statusLabel = (s: string) => {
        switch (s) {
            case "active": return "Activa"; case "canceled": return "Cancelada";
            case "past_due": return "Atrasada"; default: return "Sin suscripción";
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-black text-jimbo-white">Clientes</h1>
                <p className="text-jimbo-muted text-sm mt-1">{clients.length} gimnasios registrados</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-jimbo-card border border-jimbo-border rounded-xl p-4 flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-jimbo-accent" />
                    <div><p className="text-xl font-black text-jimbo-white">{clients.length}</p><p className="text-xs text-jimbo-muted">Total gyms</p></div>
                </div>
                <div className="bg-jimbo-card border border-jimbo-border rounded-xl p-4 flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-jimbo-accent" />
                    <div><p className="text-xl font-black text-jimbo-white">{clients.filter(c => c.subscriptionStatus === "active").length}</p><p className="text-xs text-jimbo-muted">Activas</p></div>
                </div>
                <div className="bg-jimbo-card border border-jimbo-border rounded-xl p-4 flex items-center gap-3">
                    <Users className="w-8 h-8 text-jimbo-accent" />
                    <div><p className="text-xl font-black text-jimbo-white">{clients.filter(c => c.hasJimboKit).length}</p><p className="text-xs text-jimbo-muted">JimboKit</p></div>
                </div>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jimbo-muted" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre o email..."
                    className="w-full bg-jimbo-card border border-jimbo-border rounded-xl py-2.5 pl-10 pr-4 text-jimbo-white placeholder:text-jimbo-muted/50 focus:outline-none focus:border-jimbo-accent/50 text-sm" />
            </div>

            {loading ? (
                <div className="text-center py-12 text-jimbo-muted">Cargando...</div>
            ) : filtered.length === 0 ? (
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-12 text-center">
                    <Building2 className="w-12 h-12 text-jimbo-muted/30 mx-auto mb-3" />
                    <p className="text-jimbo-muted text-sm">No hay gimnasios registrados aún.</p>
                </div>
            ) : (
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-jimbo-border text-jimbo-muted text-left">
                                    <th className="px-5 py-3 font-medium">Gimnasio</th>
                                    <th className="px-5 py-3 font-medium hidden md:table-cell">Dueño</th>
                                    <th className="px-5 py-3 font-medium">Suscripción</th>
                                    <th className="px-5 py-3 font-medium hidden md:table-cell">JimboKit</th>
                                    <th className="px-5 py-3 font-medium text-right">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((c) => (
                                    <tr key={c.id} className="border-b border-jimbo-border/50 hover:bg-jimbo-dark/50 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-jimbo-accent/10 flex items-center justify-center text-jimbo-accent text-xs font-bold">{c.name.charAt(0)}</div>
                                                <div>
                                                    <p className="text-jimbo-white font-medium">{c.name}</p>
                                                    <p className="text-jimbo-muted text-xs flex items-center gap-1">{c.slug}.gojimbo.mx <ExternalLink className="w-3 h-3" /></p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 hidden md:table-cell">
                                            <p className="text-jimbo-white text-xs">{c.ownerName}</p>
                                            <p className="text-jimbo-muted text-xs">{c.ownerEmail}</p>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge(c.subscriptionStatus)}`}>{statusLabel(c.subscriptionStatus)}</span>
                                        </td>
                                        <td className="px-5 py-3 hidden md:table-cell">
                                            {c.hasJimboKit ? <span className="text-jimbo-accent text-xs font-medium">✓ Activo</span> : <span className="text-jimbo-muted text-xs">No</span>}
                                        </td>
                                        <td className="px-5 py-3 text-right text-jimbo-muted text-xs">{new Date(c.createdAt).toLocaleDateString("es-MX")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
