"use client";

import { LifeBuoy, Plus, X } from "lucide-react";
import { useState } from "react";

export default function AdminSupportPage() {
    const [showModal, setShowModal] = useState(false);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        // TODO: POST to /api/support
        alert("Ticket enviado (demo). Nos pondremos en contacto pronto.");
        setShowModal(false);
        setSubject("");
        setMessage("");
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-black text-jimbo-white">Soporte</h1>
                    <p className="text-jimbo-muted text-sm mt-1">¿Necesitas ayuda? Crea un ticket.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-jimbo-accent text-jimbo-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-jimbo-accent-dim transition-colors cursor-pointer">
                    <Plus className="w-4 h-4" /> Nuevo ticket
                </button>
            </div>

            <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-8 text-center">
                <LifeBuoy className="w-12 h-12 text-jimbo-muted/30 mx-auto mb-3" />
                <p className="text-jimbo-muted text-sm">No tienes tickets de soporte.</p>
                <button onClick={() => setShowModal(true)} className="mt-4 text-jimbo-accent text-sm font-medium hover:text-jimbo-accent-dim cursor-pointer">
                    Crear el primero →
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-jimbo-card border border-jimbo-border rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-jimbo-white">Nuevo ticket</h2>
                            <button onClick={() => setShowModal(false)} className="text-jimbo-muted hover:text-jimbo-white cursor-pointer"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-jimbo-muted mb-1.5">Asunto</label>
                                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="¿En qué podemos ayudarte?"
                                    className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50" />
                            </div>
                            <div>
                                <label className="block text-xs text-jimbo-muted mb-1.5">Descripción</label>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Describe tu problema..."
                                    className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm focus:outline-none focus:border-jimbo-accent/50 resize-none" />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="flex-1 border border-jimbo-border text-jimbo-white py-2.5 rounded-xl font-medium text-sm hover:bg-jimbo-dark transition cursor-pointer">Cancelar</button>
                            <button onClick={handleSubmit} disabled={!subject || !message} className="flex-1 bg-jimbo-accent text-jimbo-black py-2.5 rounded-xl font-bold text-sm hover:bg-jimbo-accent-dim transition disabled:opacity-30 cursor-pointer">
                                Enviar ticket
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
