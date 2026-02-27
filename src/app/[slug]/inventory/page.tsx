"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Search, Edit3, Trash2, X, Package, AlertTriangle } from "lucide-react";

type Item = {
    id: string;
    name: string;
    category: string | null;
    quantity: number;
    minQuantity: number | null;
    notes: string | null;
    createdAt: string;
};

const emptyForm = { name: "", category: "", quantity: 0, minQuantity: 0, notes: "" };

export default function InventoryPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Item | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/inventory");
        const data = await res.json();
        setItems(data.items || []);
        setLoading(false);
    }, []);

    useEffect(() => { fetchItems(); }, [fetchItems]);

    const openNew = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
    const openEdit = (item: Item) => {
        setEditing(item);
        setForm({ name: item.name, category: item.category || "", quantity: item.quantity, minQuantity: item.minQuantity || 0, notes: item.notes || "" });
        setShowModal(true);
    };

    const handleSave = async () => {
        setSaving(true);
        const method = editing ? "PUT" : "POST";
        const body = editing ? { id: editing.id, ...form } : form;
        await fetch("/api/inventory", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        setShowModal(false);
        setSaving(false);
        fetchItems();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Eliminar este artículo?")) return;
        await fetch(`/api/inventory?id=${id}`, { method: "DELETE" });
        fetchItems();
    };

    const filtered = items.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        (i.category && i.category.toLowerCase().includes(search.toLowerCase()))
    );

    const lowStock = items.filter((i) => i.minQuantity && i.quantity <= i.minQuantity);

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-black text-jimbo-white">Inventario</h1>
                    <p className="text-jimbo-muted text-sm mt-1">{items.length} artículos registrados</p>
                </div>
                <button onClick={openNew} className="flex items-center gap-2 bg-jimbo-accent text-jimbo-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-jimbo-accent-dim transition-colors cursor-pointer">
                    <Plus className="w-4 h-4" /> Agregar artículo
                </button>
            </div>

            {/* Low stock alert */}
            {lowStock.length > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                        <p className="text-yellow-500 text-sm font-medium">Stock bajo</p>
                        <p className="text-jimbo-muted text-xs mt-1">{lowStock.map(i => i.name).join(", ")}</p>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jimbo-muted" />
                <input
                    type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nombre o categoría..."
                    className="w-full bg-jimbo-card border border-jimbo-border rounded-xl py-2.5 pl-10 pr-4 text-jimbo-white placeholder:text-jimbo-muted/50 focus:outline-none focus:border-jimbo-accent/50 transition-colors text-sm"
                />
            </div>

            {/* Grid */}
            {loading ? (
                <div className="text-center py-12 text-jimbo-muted">Cargando...</div>
            ) : filtered.length === 0 ? (
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-12 text-center">
                    <Package className="w-12 h-12 text-jimbo-muted/30 mx-auto mb-3" />
                    <p className="text-jimbo-muted text-sm">No hay artículos en el inventario.</p>
                    <button onClick={openNew} className="mt-4 text-jimbo-accent text-sm font-medium hover:text-jimbo-accent-dim cursor-pointer">
                        Agregar el primero →
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((item) => (
                        <div key={item.id} className="bg-jimbo-card border border-jimbo-border rounded-xl p-5 hover:border-jimbo-accent/20 transition-all group">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-jimbo-white font-bold text-sm">{item.name}</h3>
                                    {item.category && <p className="text-jimbo-muted text-xs mt-0.5">{item.category}</p>}
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-jimbo-muted hover:text-jimbo-white hover:bg-jimbo-border/50 cursor-pointer"><Edit3 className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-jimbo-muted hover:text-jimbo-danger hover:bg-jimbo-danger/10 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                            </div>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-2xl font-black text-jimbo-white">{item.quantity}</p>
                                    <p className="text-jimbo-muted text-xs">en stock</p>
                                </div>
                                {item.minQuantity && item.quantity <= item.minQuantity && (
                                    <span className="text-yellow-500 text-xs font-medium bg-yellow-500/10 px-2 py-1 rounded-full">Stock bajo</span>
                                )}
                            </div>
                            {item.notes && <p className="text-jimbo-muted text-xs mt-3 border-t border-jimbo-border pt-3">{item.notes}</p>}
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-jimbo-card border border-jimbo-border rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-jimbo-white">{editing ? "Editar artículo" : "Nuevo artículo"}</h2>
                            <button onClick={() => setShowModal(false)} className="text-jimbo-muted hover:text-jimbo-white cursor-pointer"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-jimbo-muted mb-1.5">Nombre *</label>
                                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50" />
                            </div>
                            <div>
                                <label className="block text-xs text-jimbo-muted mb-1.5">Categoría</label>
                                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50">
                                    <option value="">Sin categoría</option>
                                    <option value="Máquinas">Máquinas</option>
                                    <option value="Pesas">Pesas</option>
                                    <option value="Cardio">Cardio</option>
                                    <option value="Accesorios">Accesorios</option>
                                    <option value="Limpieza">Limpieza</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-jimbo-muted mb-1.5">Cantidad</label>
                                    <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50" />
                                </div>
                                <div>
                                    <label className="block text-xs text-jimbo-muted mb-1.5">Stock mínimo</label>
                                    <input type="number" value={form.minQuantity} onChange={(e) => setForm({ ...form, minQuantity: Number(e.target.value) })} className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-jimbo-muted mb-1.5">Notas</label>
                                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50 resize-none" />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="flex-1 border border-jimbo-border text-jimbo-white py-2.5 rounded-xl font-medium text-sm hover:bg-jimbo-dark transition cursor-pointer">Cancelar</button>
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
