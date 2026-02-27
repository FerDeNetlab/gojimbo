"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    Users,
    ScanFace,
    Package,
    CreditCard,
    Bell,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    DoorOpen,
    LifeBuoy,
} from "lucide-react";
import { useState } from "react";

export default function GymLayout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const params = useParams();
    const slug = params.slug as string;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { icon: BarChart3, label: "Dashboard", href: `/${slug}` },
        { icon: Users, label: "Miembros", href: `/${slug}/members` },
        { icon: ScanFace, label: "Acceso", href: `/${slug}/access` },
        { icon: CreditCard, label: "Pagos", href: `/${slug}/payments` },
        { icon: Package, label: "Inventario", href: `/${slug}/inventory` },
        { icon: Bell, label: "Notificaciones", href: `/${slug}/notifications` },
        { icon: DoorOpen, label: "JimboKit", href: `/${slug}/jimbokit` },
        { icon: LifeBuoy, label: "Soporte", href: `/${slug}/support` },
        { icon: Settings, label: "Configuración", href: `/${slug}/settings` },
    ];

    return (
        <div className="min-h-screen bg-jimbo-black flex">
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-jimbo-dark border-r border-jimbo-border transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}>
                <div className="h-full flex flex-col">
                    <div className="h-16 flex items-center justify-between px-6 border-b border-jimbo-border">
                        <div className="flex items-center gap-2">
                            <Image src="/images/jimbo-logo-white.png" alt="Jimbo" width={100} height={32} className="h-7 w-auto" />
                            <span className="text-[10px] font-bold text-jimbo-accent bg-jimbo-accent/10 px-1.5 py-0.5 rounded">{slug}</span>
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
                            <div className="w-8 h-8 rounded-full bg-jimbo-accent/20 flex items-center justify-center text-jimbo-accent text-sm font-bold">
                                {session?.user?.name?.charAt(0)?.toUpperCase() || "J"}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-jimbo-white truncate">{session?.user?.name || "Usuario"}</p>
                                <p className="text-xs text-jimbo-muted truncate">{session?.user?.email}</p>
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
                    <div className="text-sm text-jimbo-muted">
                        {new Date().toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </div>
                </header>
                <main className="flex-1 p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
