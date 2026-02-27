"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Suspense } from "react";

function RegisterForm() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const plan = searchParams.get("plan");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Error al registrarse");
                setLoading(false);
                return;
            }

            // Auto-login after registration
            const loginRes = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (loginRes?.error) {
                router.push("/login");
            } else {
                router.push("/onboarding");
            }
        } catch {
            setError("Error de conexión");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-jimbo-black flex items-center justify-center px-6">
            <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,255,136,0.03) 0%, transparent 60%)" }} />

            <div className="relative w-full max-w-md">
                <div className="text-center mb-10">
                    <Link href="/">
                        <Image src="/images/jimbo-logo-white.png" alt="Jimbo" width={140} height={46} className="h-10 w-auto mx-auto" />
                    </Link>
                    <p className="text-jimbo-muted text-sm mt-4">Crea tu cuenta y comienza a administrar tu gym</p>
                </div>

                <div className="bg-jimbo-card border border-jimbo-border rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm text-jimbo-muted mb-2">Nombre</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jimbo-muted" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Tu nombre"
                                    className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-3 pl-10 pr-4 text-jimbo-white placeholder:text-jimbo-muted/50 focus:outline-none focus:border-jimbo-accent/50 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-jimbo-muted mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jimbo-muted" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-3 pl-10 pr-4 text-jimbo-white placeholder:text-jimbo-muted/50 focus:outline-none focus:border-jimbo-accent/50 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-jimbo-muted mb-2">Contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jimbo-muted" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mínimo 6 caracteres"
                                    className="w-full bg-jimbo-dark border border-jimbo-border rounded-xl py-3 pl-10 pr-12 text-jimbo-white placeholder:text-jimbo-muted/50 focus:outline-none focus:border-jimbo-accent/50 transition-colors"
                                    required
                                    minLength={6}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-jimbo-muted hover:text-jimbo-white transition-colors">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-jimbo-danger/10 border border-jimbo-danger/20 rounded-xl p-3">
                                <p className="text-jimbo-danger text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-jimbo-accent text-jimbo-black py-3 rounded-xl font-bold text-base hover:bg-jimbo-accent-dim transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {loading ? "Creando cuenta..." : "Crear cuenta"}
                            {!loading && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-jimbo-border" />
                        <span className="text-xs text-jimbo-muted">o</span>
                        <div className="flex-1 h-px bg-jimbo-border" />
                    </div>

                    <button
                        onClick={() => signIn("google", { callbackUrl: plan === "subscription" ? "/onboarding" : "/admin" })}
                        className="w-full border border-jimbo-border rounded-xl py-3 text-jimbo-white font-medium hover:bg-jimbo-dark transition-colors flex items-center justify-center gap-3 cursor-pointer"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                        Continuar con Google
                    </button>
                </div>

                <p className="text-center text-jimbo-muted text-sm mt-6">
                    ¿Ya tienes cuenta?{" "}
                    <Link href="/login" className="text-jimbo-accent hover:text-jimbo-accent-dim transition-colors font-medium">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-jimbo-black" />}>
            <RegisterForm />
        </Suspense>
    );
}
