"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
    Building2,
    Users,
    CreditCard,
    LifeBuoy,
    Package,
    BarChart3,
    LogOut,
    Menu,
    X,
    Gauge,
} from "lucide-react";
import { useState } from "react";

const navItems = [
    { icon: Gauge, label: "Resumen", href: "/saas" },
    { icon: Building2, label: "Clientes", href: "/saas/clients" },
    { icon: CreditCard, label: "Suscripciones", href: "/saas/subscriptions" },
    { icon: Package, label: "Pedidos JimboKit", href: "/saas/orders" },
    { icon: LifeBuoy, label: "Soporte", href: "/saas/support" },
    { icon: Users, label: "Usuarios", href: "/saas/users" },
];

export default function SaaSLayout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-jimbo-black flex">
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-jimbo-dark border-r border-jimbo-border transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}>
                <div className="h-full flex flex-col">
                    <div className="h-16 flex items-center justify-between px-6 border-b border-jimbo-border">
                        <div className="flex items-center gap-2">
                            <Image src="/images/jimbo-logo-white.png" alt="Jimbo" width={80} height={26} className="h-5 w-auto" />
                            <span className="text-[10px] font-bold text-jimbo-black bg-jimbo-accent px-1.5 py-0.5 rounded">SaaS</span>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-jimbo-muted hover:text-jimbo-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-jimbo-muted hover:text-jimbo-white hover:bg-jimbo-card transition-all duration-200 text-sm">
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        ))}

                        <div className="pt-4 mt-4 border-t border-jimbo-border">
                            <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-jimbo-accent hover:bg-jimbo-accent/10 transition-all duration-200 text-sm font-medium">
                                <BarChart3 className="w-5 h-5" />
                                <span>Ir al producto →</span>
                            </Link>
                        </div>
                    </nav>

                    <div className="p-4 border-t border-jimbo-border">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-jimbo-accent/20 flex items-center justify-center text-jimbo-accent text-sm font-bold">S</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-jimbo-white truncate">{session?.user?.name || "Superadmin"}</p>
                                <p className="text-xs text-jimbo-accent font-medium">Superadmin</p>
                            </div>
                        </div>
                        <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-jimbo-muted hover:text-jimbo-danger hover:bg-jimbo-danger/10 transition-all text-sm cursor-pointer">
                            <LogOut className="w-4 h-4" />
                            <span>Cerrar sesión</span>
                        </button>
                    </div>
                </div>
            </aside>

            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

            <div className="flex-1 flex flex-col min-h-screen">
                <header className="h-16 border-b border-jimbo-border flex items-center justify-between px-6">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-jimbo-muted hover:text-jimbo-white">
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="hidden lg:block" />
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="text-xs text-jimbo-accent border border-jimbo-accent/30 px-3 py-1.5 rounded-lg hover:bg-jimbo-accent/10 transition">
                            Panel Producto
                        </Link>
                    </div>
                </header>
                <main className="flex-1 p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
