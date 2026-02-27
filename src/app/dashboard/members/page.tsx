"use client";

import { useEffect, useState, useCallback } from "react";
import { UserPlus, Search, Edit3, Trash2, X, Users, Phone, Mail, CreditCard, RotateCcw } from "lucide-react";

type Member = {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    status: string;
    membershipType: string | null;
    membershipPrice: number | null;
    membershipStart: string | null;
    membershipEnd: string | null;
    autoRenew: boolean;
    createdAt: string;
};

const emptyForm = { name: "", email: "", phone: "", membershipType: "", membershipPrice: 0, membershipStart: "", membershipEnd: "", autoRenew: true };

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Member | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const fetchMembers = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/members");
        const data = await res.json();
        setMembers(data.members || []);
        setLoading(false);
    }, []);

    useEffect(() => { fetchMembers(); }, [fetchMembers]);

    const openNew = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
    const openEdit = (m: Member) => {
        setEditing(m);
        setForm({
            name: m.name,
            email: m.email || "",
            phone: m.phone || "",
            membershipType: m.membershipType || "",
            membershipPrice: m.membershipPrice || 0,
            membershipStart: m.membershipStart?.split("T")[0] || "",
            membershipEnd: m.membershipEnd?.split("T")[0] || "",
            autoRenew: m.autoRenew,
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        const method = editing ? "PUT" : "POST";
        const body = editing ? { id: editing.id, ...form } : form;
        await fetch("/api/members", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        setShowModal(false);
        setSaving(false);
        fetchMembers();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Eliminar este miembro?")) return;
        await fetch(`/api/members?id=${id}`, { method: "DELETE" });
        fetchMembers();
    };

    const filtered = members.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        (m.email && m.email.toLowerCase().includes(search.toLowerCase())) ||
        (m.phone && m.phone.includes(search))
    );

    const statusColor = (s: string) => {
        switch (s) {
            case "active": return "bg-jimbo-accent/10 text-jimbo-accent";
            case "expired": return "bg-jimbo-danger/10 text-jimbo-danger";
            case "suspended": return "bg-yellow-500/10 text-yellow-500";
            default: return "bg-jimbo-muted/10 text-jimbo-muted";
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-black text-jimbo-white">Miembros</h1>
                    <p className="text-jimbo-muted text-sm mt-1">{members.length} miembros registrados</p>
                </div>
                <button onClick={openNew} className="flex items-center gap-2 bg-jimbo-accent text-jimbo-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-jimbo-accent-dim transition-colors cursor-pointer">
                    <UserPlus className="w-4 h-4" /> Agregar miembro
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jimbo-muted" />
                <input
                    type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nombre, email o teléfono..."
                    className="w-full bg-jimbo-card border border-jimbo-border rounded-xl py-2.5 pl-10 pr-4 text-jimbo-white placeholder:text-jimbo-muted/50 focus:outline-none focus:border-jimbo-accent/50 transition-colors text-sm"
                />
            </div>

            {/* Table */}
            {loading ? (
                <div className="text-center py-12 text-jimbo-muted">Cargando...</div>
            ) : filtered.length === 0 ? (
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-12 text-center">
                    <Users className="w-12 h-12 text-jimbo-muted/30 mx-auto mb-3" />
                    <p className="text-jimbo-muted text-sm">No hay miembros registrados aún.</p>
                    <button onClick={openNew} className="mt-4 text-jimbo-accent text-sm font-medium hover:text-jimbo-accent-dim cursor-pointer">
                        Agregar el primero →
                    </button>
                </div>
            ) : (
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-jimbo-border text-jimbo-muted text-left">
                                    <th className="px-5 py-3 font-medium">Nombre</th>
                                    <th className="px-5 py-3 font-medium hidden md:table-cell">Contacto</th>
                                    <th className="px-5 py-3 font-medium hidden lg:table-cell">Membresía</th>
                                    <th className="px-5 py-3 font-medium">Estado</th>
                                    <th className="px-5 py-3 font-medium text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((m) => (
                                    <tr key={m.id} className="border-b border-jimbo-border/50 hover:bg-jimbo-dark/50 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-jimbo-accent/10 flex items-center justify-center text-jimbo-accent text-xs font-bold">
                                                    {m.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-jimbo-white font-medium">{m.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 hidden md:table-cell">
                                            <div className="space-y-0.5">
                                                {m.email && <div className="flex items-center gap-1.5 text-jimbo-muted text-xs"><Mail className="w-3 h-3" />{m.email}</div>}
                                                {m.phone && <div className="flex items-center gap-1.5 text-jimbo-muted text-xs"><Phone className="w-3 h-3" />{m.phone}</div>}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 hidden lg:table-cell">
                                            <div className="space-y-0.5">
                                                {m.membershipType && <div className="flex items-center gap-1.5 text-jimbo-muted text-xs"><CreditCard className="w-3 h-3" />{m.membershipType}</div>}
                                                {m.autoRenew && <div className="flex items-center gap-1.5 text-jimbo-accent text-xs"><RotateCcw className="w-3 h-3" />Auto-renovación</div>}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColor(m.status)}`}>
                                                {m.status === "active" ? "Activo" : m.status === "expired" ? "Expirado" : m.status === "suspended" ? "Suspendido" : "Inactivo"}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                            <div className="flex items-center gap-1 justify-end">
                                                <button onClick={() => openEdit(m)} className="p-2 rounded-lg text-jimbo-muted hover:text-jimbo-white hover:bg-jimbo-border/50 transition cursor-pointer">
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(m.id)} className="p-2 rounded-lg text-jimbo-muted hover:text-jimbo-danger hover:bg-jimbo-danger/10 transition cursor-pointer">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-jimbo-card border border-jimbo-border rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-jimbo-white">{editing ? "Editar miembro" : "Nuevo miembro"}</h2>
                            <button onClick={() => setShowModal(false)} className="text-jimbo-muted hover:text-jimbo-white cursor-pointer"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-jimbo-muted mb-1.5">Nombre *</label>
                                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-jimbo-muted mb-1.5">Email</label>
                                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50" />
                                </div>
                                <div>
                                    <label className="block text-xs text-jimbo-muted mb-1.5">Teléfono</label>
                                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-jimbo-muted mb-1.5">Tipo de membresía</label>
                                    <select value={form.membershipType} onChange={(e) => setForm({ ...form, membershipType: e.target.value })} className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50">
                                        <option value="">Seleccionar</option>
                                        <option value="mensual">Mensual</option>
                                        <option value="trimestral">Trimestral</option>
                                        <option value="semestral">Semestral</option>
                                        <option value="anual">Anual</option>
                                        <option value="dia">Pase de día</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-jimbo-muted mb-1.5">Precio (MXN)</label>
                                    <input type="number" value={form.membershipPrice} onChange={(e) => setForm({ ...form, membershipPrice: Number(e.target.value) })} className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-jimbo-muted mb-1.5">Inicio</label>
                                    <input type="date" value={form.membershipStart} onChange={(e) => setForm({ ...form, membershipStart: e.target.value })} className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50" />
                                </div>
                                <div>
                                    <label className="block text-xs text-jimbo-muted mb-1.5">Fin</label>
                                    <input type="date" value={form.membershipEnd} onChange={(e) => setForm({ ...form, membershipEnd: e.target.value })} className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50" />
                                </div>
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={form.autoRenew} onChange={(e) => setForm({ ...form, autoRenew: e.target.checked })} className="rounded accent-jimbo-accent" />
                                <span className="text-sm text-jimbo-muted">Auto-renovación</span>
                            </label>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="flex-1 border border-jimbo-border text-jimbo-white py-2.5 rounded-xl font-medium text-sm hover:bg-jimbo-dark transition cursor-pointer">
                                Cancelar
                            </button>
                            <button onClick={handleSave} disabled={saving || !form.name} className="flex-1 bg-jimbo-accent text-jimbo-black py-2.5 rounded-xl font-bold text-sm hover:bg-jimbo-accent-dim transition disabled:opacity-30 cursor-pointer">
                                {saving ? "Guardando..." : editing ? "Actualizar" : "Crear"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
