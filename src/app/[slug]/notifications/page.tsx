"use client";

import { Bell, MessageCircle, Mail, Smartphone, Send } from "lucide-react";
import { useState } from "react";

const channels = [
    { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, color: "text-green-400" },
    { id: "email", label: "Email", icon: Mail, color: "text-blue-400" },
    { id: "sms", label: "SMS", icon: Smartphone, color: "text-purple-400" },
];

export default function NotificationsPage() {
    const [channel, setChannel] = useState("whatsapp");
    const [target, setTarget] = useState("all");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        setSending(true);
        // TODO: integrate with notification API
        await new Promise((r) => setTimeout(r, 1000));
        setSending(false);
        setSubject("");
        setMessage("");
        alert("Notificación enviada (demo)");
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-black text-jimbo-white">Notificaciones</h1>
                <p className="text-jimbo-muted text-sm mt-1">Envía avisos a tus miembros por WhatsApp, email o SMS</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Compose */}
                <div className="lg:col-span-2">
                    <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-6">
                        <h2 className="text-lg font-bold text-jimbo-white mb-5">Nueva notificación</h2>

                        {/* Channel selector */}
                        <div className="mb-5">
                            <label className="block text-xs text-jimbo-muted mb-2">Canal</label>
                            <div className="flex gap-2">
                                {channels.map((ch) => (
                                    <button key={ch.id} onClick={() => setChannel(ch.id)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${channel === ch.id ? "bg-jimbo-accent/10 text-jimbo-accent border border-jimbo-accent/30" : "bg-jimbo-dark border border-jimbo-border text-jimbo-muted hover:text-jimbo-white"
                                            }`}>
                                        <ch.icon className="w-4 h-4" /> {ch.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Recipients */}
                        <div className="mb-5">
                            <label className="block text-xs text-jimbo-muted mb-2">Destinatarios</label>
                            <div className="flex gap-2">
                                <button onClick={() => setTarget("all")}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${target === "all" ? "bg-jimbo-accent/10 text-jimbo-accent border border-jimbo-accent/30" : "bg-jimbo-dark border border-jimbo-border text-jimbo-muted"}`}>
                                    Todos los miembros
                                </button>
                                <button onClick={() => setTarget("expiring")}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${target === "expiring" ? "bg-jimbo-accent/10 text-jimbo-accent border border-jimbo-accent/30" : "bg-jimbo-dark border border-jimbo-border text-jimbo-muted"}`}>
                                    Membresías por vencer
                                </button>
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="mb-4">
                            <label className="block text-xs text-jimbo-muted mb-1.5">Asunto</label>
                            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Ej: Aviso importante del gimnasio"
                                className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm placeholder:text-jimbo-muted/50 focus:outline-none focus:border-jimbo-accent/50" />
                        </div>

                        {/* Message */}
                        <div className="mb-5">
                            <label className="block text-xs text-jimbo-muted mb-1.5">Mensaje</label>
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Escribe tu mensaje aquí..."
                                className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-2.5 px-4 text-jimbo-white text-sm placeholder:text-jimbo-muted/50 focus:outline-none focus:border-jimbo-accent/50 resize-none" />
                        </div>

                        <button onClick={handleSend} disabled={sending || !message}
                            className="flex items-center gap-2 bg-jimbo-accent text-jimbo-black px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-jimbo-accent-dim transition disabled:opacity-30 cursor-pointer">
                            <Send className="w-4 h-4" /> {sending ? "Enviando..." : "Enviar notificación"}
                        </button>
                    </div>
                </div>

                {/* Quick templates */}
                <div>
                    <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-jimbo-white mb-4">Plantillas rápidas</h3>
                        <div className="space-y-2">
                            {[
                                { label: "Membresía por vencer", msg: "Hola, tu membresía está por vencer. Renueva para seguir entrenando sin interrupciones." },
                                { label: "Día cerrado", msg: "Aviso: el gimnasio estará cerrado el día de mañana por mantenimiento." },
                                { label: "Falta de agua", msg: "Hoy no contamos con servicio de agua potable. Trae tu propia botella." },
                                { label: "Promoción", msg: "¡Invita a un amigo y obtén un 20% de descuento en tu próxima mensualidad!" },
                                { label: "Horario especial", msg: "Este fin de semana el horario será de 8:00 a 14:00 hrs." },
                            ].map((t) => (
                                <button key={t.label} onClick={() => { setSubject(t.label); setMessage(t.msg); }}
                                    className="w-full text-left p-3 rounded-xl border border-jimbo-border hover:border-jimbo-accent/30 hover:bg-jimbo-dark/50 transition-all cursor-pointer">
                                    <p className="text-xs font-medium text-jimbo-white">{t.label}</p>
                                    <p className="text-xs text-jimbo-muted mt-0.5 line-clamp-1">{t.msg}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recent notifications */}
                    <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-6 mt-4">
                        <h3 className="text-sm font-bold text-jimbo-white mb-4">Historial reciente</h3>
                        <div className="text-center py-4">
                            <Bell className="w-8 h-8 text-jimbo-muted/30 mx-auto mb-2" />
                            <p className="text-jimbo-muted text-xs">Sin notificaciones enviadas</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
