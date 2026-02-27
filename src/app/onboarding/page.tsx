"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Building2, ImagePlus, Users, Wrench, CheckCircle2 } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>(1);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        gymName: "",
        slug: "",
        approxMembers: "",
        wantsJimboKit: false,
    });

    const handleChange = (field: string, value: string | boolean) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (field === "gymName") {
            const slug = (value as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            setForm((prev) => ({ ...prev, slug }));
        }
    };

    const handleFinish = async () => {
        setLoading(true);
        try {
            await fetch("/api/onboarding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            router.push(`/${form.slug}`);
        } catch {
            setLoading(false);
        }
    };

    const steps = [
        { num: 1, icon: Building2, label: "Tu gimnasio" },
        { num: 2, icon: ImagePlus, label: "Personaliza" },
        { num: 3, icon: Users, label: "Tamaño" },
        { num: 4, icon: Wrench, label: "JimboKit" },
    ];

    return (
        <div className="min-h-screen bg-jimbo-black flex items-center justify-center px-6">
            <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,255,136,0.03) 0%, transparent 60%)" }} />

            <div className="relative w-full max-w-lg">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Image src="/images/jimbo-logo-white.png" alt="Jimbo" width={120} height={40} className="h-8 w-auto mx-auto" />
                    <h1 className="text-2xl font-black text-jimbo-white mt-6">Configura tu gimnasio</h1>
                    <p className="text-jimbo-muted text-sm mt-2">Solo toma un minuto. Podrás cambiarlo después.</p>
                </div>

                {/* Step indicator */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    {steps.map((s) => (
                        <div key={s.num} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s.num ? "bg-jimbo-accent text-jimbo-black" : "bg-jimbo-border text-jimbo-muted"
                                }`}>
                                {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                            </div>
                            {s.num < 4 && <div className={`w-8 h-0.5 ${step > s.num ? "bg-jimbo-accent" : "bg-jimbo-border"}`} />}
                        </div>
                    ))}
                </div>

                {/* Card */}
                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-8">
                    {/* Step 1: Gym Name */}
                    {step === 1 && (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm text-jimbo-muted mb-2">Nombre de tu gimnasio</label>
                                <input
                                    type="text"
                                    value={form.gymName}
                                    onChange={(e) => handleChange("gymName", e.target.value)}
                                    placeholder="Ej: Power Fitness"
                                    className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-3 px-4 text-jimbo-white placeholder:text-jimbo-muted/50 focus:outline-none focus:border-jimbo-accent/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-jimbo-muted mb-2">URL de tu gym (slug)</label>
                                <div className="flex items-center bg-jimbo-dark border border-jimbo-border rounded-xl overflow-hidden">
                                    <span className="text-jimbo-muted text-sm pl-4 pr-1">jimbo.app/</span>
                                    <input
                                        type="text"
                                        value={form.slug}
                                        onChange={(e) => handleChange("slug", e.target.value)}
                                        className="flex-1 bg-transparent py-3 pr-4 text-jimbo-accent focus:outline-none"
                                    />
                                </div>
                            </div>
                            <button onClick={() => setStep(2)} disabled={!form.gymName} className="w-full bg-jimbo-white text-jimbo-black py-3 rounded-xl font-bold hover:bg-jimbo-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer">
                                Siguiente <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Step 2: Logo placeholder */}
                    {step === 2 && (
                        <div className="space-y-5">
                            <div className="text-center">
                                <div className="w-24 h-24 mx-auto rounded-2xl border-2 border-dashed border-jimbo-border flex items-center justify-center hover:border-jimbo-accent/50 transition-colors cursor-pointer group">
                                    <ImagePlus className="w-8 h-8 text-jimbo-muted group-hover:text-jimbo-accent transition-colors" />
                                </div>
                                <p className="text-sm text-jimbo-muted mt-3">Sube el logo de tu gimnasio</p>
                                <p className="text-xs text-jimbo-muted/60 mt-1">Opcional — puedes hacerlo después</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setStep(1)} className="flex-1 border border-jimbo-border text-jimbo-white py-3 rounded-xl font-medium hover:bg-jimbo-dark transition-all cursor-pointer">
                                    Atrás
                                </button>
                                <button onClick={() => setStep(3)} className="flex-1 bg-jimbo-white text-jimbo-black py-3 rounded-xl font-bold hover:bg-jimbo-accent transition-all flex items-center justify-center gap-2 cursor-pointer">
                                    Siguiente <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Size */}
                    {step === 3 && (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm text-jimbo-muted mb-3">¿Cuántos miembros tiene tu gimnasio?</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {["1-50", "51-150", "151-300", "300+"].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => handleChange("approxMembers", opt)}
                                            className={`p-4 rounded-xl border text-center font-medium transition-all cursor-pointer ${form.approxMembers === opt
                                                ? "border-jimbo-accent bg-jimbo-accent/10 text-jimbo-accent"
                                                : "border-jimbo-border text-jimbo-muted hover:border-jimbo-muted"
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setStep(2)} className="flex-1 border border-jimbo-border text-jimbo-white py-3 rounded-xl font-medium hover:bg-jimbo-dark transition-all cursor-pointer">
                                    Atrás
                                </button>
                                <button onClick={() => setStep(4)} disabled={!form.approxMembers} className="flex-1 bg-jimbo-white text-jimbo-black py-3 rounded-xl font-bold hover:bg-jimbo-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer">
                                    Siguiente <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: JimboKit */}
                    {step === 4 && (
                        <div className="space-y-5">
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-jimbo-white mb-2">¿Quieres el JimboKit?</h3>
                                <p className="text-sm text-jimbo-muted">Puertas de cortesía con lector biométrico — $12,000 MXN</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleChange("wantsJimboKit", true)}
                                    className={`p-4 rounded-xl border text-center font-medium transition-all cursor-pointer ${form.wantsJimboKit
                                        ? "border-jimbo-accent bg-jimbo-accent/10 text-jimbo-accent"
                                        : "border-jimbo-border text-jimbo-muted hover:border-jimbo-muted"
                                        }`}
                                >
                                    Sí, lo quiero
                                </button>
                                <button
                                    onClick={() => handleChange("wantsJimboKit", false)}
                                    className={`p-4 rounded-xl border text-center font-medium transition-all cursor-pointer ${!form.wantsJimboKit
                                        ? "border-jimbo-accent bg-jimbo-accent/10 text-jimbo-accent"
                                        : "border-jimbo-border text-jimbo-muted hover:border-jimbo-muted"
                                        }`}
                                >
                                    Por ahora no
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setStep(3)} className="flex-1 border border-jimbo-border text-jimbo-white py-3 rounded-xl font-medium hover:bg-jimbo-dark transition-all cursor-pointer">
                                    Atrás
                                </button>
                                <button onClick={handleFinish} disabled={loading} className="flex-1 bg-jimbo-accent text-jimbo-black py-3 rounded-xl font-bold hover:bg-jimbo-accent-dim transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer">
                                    {loading ? "Creando..." : "Crear mi gym"}
                                    {!loading && <CheckCircle2 className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
