"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
    Users,
    Building2,
    CreditCard,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    Shield,
} from "lucide-react";
import { useState } from "react";

const navItems = [
    { icon: BarChart3, label: "Resumen", href: "/admin" },
    { icon: Building2, label: "Gyms", href: "/admin/gyms" },
    { icon: Users, label: "Usuarios", href: "/admin/users" },
    { icon: CreditCard, label: "Pagos", href: "/admin/payments" },
    { icon: Settings, label: "Configuración", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-jimbo-black flex">
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-jimbo-dark border-r border-jimbo-border transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}>
                <div className="h-full flex flex-col">
                    <div className="h-16 flex items-center justify-between px-6 border-b border-jimbo-border">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-jimbo-accent" />
                            <span className="text-jimbo-white font-bold text-sm">Admin Panel</span>
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
                    </nav>
                    <div className="p-4 border-t border-jimbo-border">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-jimbo-danger/20 flex items-center justify-center text-jimbo-danger text-sm font-bold">A</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-jimbo-white truncate">{session?.user?.name || "Admin"}</p>
                                <p className="text-xs text-jimbo-danger">Administrador</p>
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
                    <Link href="/">
                        <Image src="/images/jimbo-logo-white.png" alt="Jimbo" width={80} height={26} className="h-5 w-auto opacity-40 hover:opacity-100 transition-opacity" />
                    </Link>
                </header>
                <main className="flex-1 p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
