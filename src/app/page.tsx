"use client";

import {
  Users,
  ScanFace,
  CreditCard,
  Bell,
  BarChart3,
  Package,
  Shield,
  Smartphone,
  Mail,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Zap,
  DoorOpen,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ─── Simple fade-in on scroll hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

/* ─── Animated section wrapper ─── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Mini Demo Component ─── */
function MiniDemo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="demo-window">
      <div className="demo-titlebar">
        <span className="demo-dot demo-dot-red" />
        <span className="demo-dot demo-dot-yellow" />
        <span className="demo-dot demo-dot-green" />
        <span className="ml-3 text-xs text-jimbo-muted font-mono">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

/* ─── Demo: Members ─── */
function DemoMembers() {
  const members = [
    { name: "Carlos Mendoza", status: "Activo", plan: "Premium", expires: "15 Mar" },
    { name: "María García", status: "Activo", plan: "Básico", expires: "02 Abr" },
    { name: "Juan López", status: "Por vencer", plan: "Premium", expires: "28 Feb" },
    { name: "Ana Rodríguez", status: "Activo", plan: "Básico", expires: "10 Mar" },
  ];
  return (
    <MiniDemo title="miembros.jimbo">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-jimbo-muted text-left border-b border-jimbo-border">
            <th className="pb-2 font-medium">Nombre</th>
            <th className="pb-2 font-medium">Plan</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium">Vence</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, i) => (
            <tr key={i} className="border-b border-jimbo-border/50 hover:bg-jimbo-border/20 transition-colors">
              <td className="py-2.5 text-jimbo-white font-medium">{m.name}</td>
              <td className="py-2.5 text-jimbo-muted">{m.plan}</td>
              <td className="py-2.5">
                <span
                  className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${m.status === "Activo"
                    ? "bg-jimbo-accent/10 text-jimbo-accent"
                    : "bg-yellow-500/10 text-yellow-400"
                    }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${m.status === "Activo" ? "bg-jimbo-accent" : "bg-yellow-400"
                      }`}
                  />
                  {m.status}
                </span>
              </td>
              <td className="py-2.5 text-jimbo-muted">{m.expires}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MiniDemo>
  );
}

/* ─── Demo: Inventory ─── */
function DemoInventory() {
  const items = [
    { name: "Mancuernas 20kg", qty: 12, low: false },
    { name: "Bancas planas", qty: 6, low: false },
    { name: "Bandas elásticas", qty: 3, low: true },
    { name: "Colchonetas", qty: 15, low: false },
    { name: "Pesas rusas 16kg", qty: 2, low: true },
  ];
  return (
    <MiniDemo title="inventario.jimbo">
      <div className="space-y-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-jimbo-border/40">
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 text-jimbo-muted" />
              <span className="text-sm text-jimbo-white">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-jimbo-muted font-mono">{item.qty}</span>
              <span className={`w-2 h-2 rounded-full ${item.low ? "bg-yellow-400 pulse-glow" : "bg-jimbo-accent"}`} />
            </div>
          </div>
        ))}
      </div>
    </MiniDemo>
  );
}

/* ─── Demo: Payments ─── */
function DemoPayments() {
  return (
    <MiniDemo title="pagos.jimbo">
      <div className="space-y-3">
        {[
          { name: "Carlos Mendoza", plan: "Premium · ****4242", amount: "$599", note: "Autorenovación" },
          { name: "María García", plan: "Básico · ****8831", amount: "$399", note: "Renovado" },
        ].map((p, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-jimbo-dark border border-jimbo-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-jimbo-accent/10 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-jimbo-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-jimbo-white">{p.name}</p>
                <p className="text-xs text-jimbo-muted">{p.plan}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-jimbo-accent">{p.amount}</p>
              <p className="text-xs text-jimbo-muted">{p.note}</p>
            </div>
          </div>
        ))}
        <div className="grid grid-cols-3 gap-2 mt-2">
          <div className="text-center p-2 rounded-lg bg-jimbo-border/30">
            <p className="text-lg font-bold text-jimbo-white">$12.4k</p>
            <p className="text-[10px] text-jimbo-muted uppercase tracking-wider">Este mes</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-jimbo-border/30">
            <p className="text-lg font-bold text-jimbo-accent">94%</p>
            <p className="text-[10px] text-jimbo-muted uppercase tracking-wider">Renovación</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-jimbo-border/30">
            <p className="text-lg font-bold text-jimbo-white">156</p>
            <p className="text-[10px] text-jimbo-muted uppercase tracking-wider">Cobros</p>
          </div>
        </div>
      </div>
    </MiniDemo>
  );
}

/* ─── Demo: Notifications ─── */
function DemoNotifications() {
  const notifications = [
    { icon: MessageCircle, channel: "WhatsApp", msg: "Membresía por vencer en 3 días", user: "Juan López", color: "text-green-400" },
    { icon: Mail, channel: "Email", msg: "Gym cerrado por mantenimiento mañana", user: "Todos", color: "text-blue-400" },
    { icon: Smartphone, channel: "SMS", msg: "Tu membresía fue renovada exitosamente", user: "Ana Rodríguez", color: "text-purple-400" },
    { icon: Bell, channel: "Push", msg: "Falta de agua hoy — se cancela regadera", user: "Todos", color: "text-yellow-400" },
  ];
  return (
    <MiniDemo title="notificaciones.jimbo">
      <div className="space-y-1">
        {notifications.map((n, i) => (
          <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-jimbo-border/20 transition-colors">
            <div className={`mt-0.5 ${n.color}`}>
              <n.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-jimbo-white">{n.channel}</span>
                <span className="text-[10px] text-jimbo-muted">→ {n.user}</span>
              </div>
              <p className="text-xs text-jimbo-muted truncate">{n.msg}</p>
            </div>
          </div>
        ))}
      </div>
    </MiniDemo>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "¿Cuánto cuesta Jimbo?", a: "La suscripción a Jimbo es de $400 MXN/mes. Incluye todas las funcionalidades: gestión de miembros, control de acceso, pagos con tarjeta, notificaciones y más." },
    { q: "¿Qué es el JimboKit?", a: "El JimboKit es nuestro kit de puertas de cortesía con lector biométrico integrado. Se conecta directamente con tu cuenta de Jimbo por $12,000 MXN." },
    { q: "¿Necesito el JimboKit para usar Jimbo?", a: "No. Jimbo funciona perfectamente sin el JimboKit. Puedes usar el reconocimiento facial desde cualquier tablet o computadora." },
    { q: "¿Cómo funciona el reconocimiento facial?", a: "Usamos tecnología de detección facial en el navegador. Solo necesitas una cámara. Los rostros se registran al dar de alta a cada miembro." },
    { q: "¿Puedo enviar notificaciones a mis miembros?", a: "Sí. Jimbo te permite enviar avisos por WhatsApp, email y SMS. Membresías por vencer, avisos de cierre, y más. Todo automatizado." },
  ];
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-jimbo-border rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-jimbo-card/50 transition-colors cursor-pointer"
          >
            <span className="text-jimbo-white font-medium pr-4">{faq.q}</span>
            <ChevronDown className={`w-5 h-5 text-jimbo-muted transition-transform duration-300 flex-shrink-0 ${open === i ? "rotate-180" : ""}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
            <p className="px-5 pb-5 text-sm text-jimbo-muted leading-relaxed">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════ MAIN PAGE ═══════════════════════════ */
export default function LandingPage() {
  const [heroMounted, setHeroMounted] = useState(false);
  useEffect(() => { setHeroMounted(true); }, []);

  const features = [
    { icon: Users, title: "Gestión de Miembros", desc: "Alta, baja y control total de tus suscriptores. Cada miembro con su perfil, foto y datos." },
    { icon: ScanFace, title: "Reconocimiento Facial", desc: "Control de acceso biométrico. Sin tarjetas, sin llaves. Tu cara es tu credencial." },
    { icon: CreditCard, title: "Pagos con Tarjeta", desc: "Cobra membresías con Stripe. Autorenovación automática. Olvídate de perseguir pagos." },
    { icon: Bell, title: "Notificaciones", desc: "WhatsApp, Email y SMS. Avisa sobre cierres, membresías por vencer, y más." },
    { icon: Package, title: "Inventario de Equipo", desc: "Controla tus activos fijos. Mancuernas, máquinas, todo inventariado y rastreado." },
    { icon: BarChart3, title: "Métricas y Reportes", desc: "Dashboard con ingresos, asistencia, rotación y las métricas que importan." },
    { icon: DoorOpen, title: "Puertas de Cortesía", desc: "Conecta el JimboKit para un acceso automatizado con puertas de cortesía." },
    { icon: Shield, title: "Seguridad Total", desc: "Datos encriptados, acceso por roles, bitácora de acceso completa." },
  ];

  const pricingFeatures = [
    "Gestión ilimitada de miembros",
    "Reconocimiento facial",
    "Pagos con tarjeta (Stripe)",
    "Notificaciones WhatsApp, Email, SMS",
    "Inventario de equipo",
    "Control de acceso biométrico",
    "Dashboard y métricas",
    "Soporte prioritario",
    "Autorenovación de membresías",
  ];

  return (
    <div className="relative min-h-screen bg-jimbo-black text-jimbo-white">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 w-full z-50 border-b border-jimbo-border/50" style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Image src="/images/jimbo-logo-white.png" alt="Jimbo" width={110} height={36} className="h-8 w-auto" priority />
          <div className="hidden md:flex items-center gap-8 text-sm">
            {["Funciones", "Demos", "JimboKit", "Precios", "FAQ"].map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`} className="text-jimbo-muted hover:text-jimbo-white transition-colors duration-200">{label}</a>
            ))}
          </div>
          <a href="/register" className="bg-jimbo-white text-jimbo-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-jimbo-accent transition-all duration-300">
            Comenzar
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden grid-bg">
        {/* Glow behind hero */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)" }} />

        <div
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          style={{
            opacity: heroMounted ? 1 : 0,
            transform: heroMounted ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-jimbo-border mb-8" style={{ background: "rgba(26,26,26,0.5)" }}>
            <Zap className="w-4 h-4 text-jimbo-accent" />
            <span className="text-sm text-jimbo-muted">La nueva era de la administración de gimnasios</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6">
            Tu gym.
            <br />
            <span className="gradient-text">Tu control.</span>
          </h1>

          <p className="text-lg md:text-xl text-jimbo-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Jimbo es el software que tu gimnasio necesita. Control de acceso con reconocimiento facial,
            pagos automáticos, notificaciones y todo lo que necesitas para administrar como un pro.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/register?plan=subscription" className="group flex items-center gap-2 bg-jimbo-white text-jimbo-black px-8 py-4 rounded-full font-bold text-lg hover:bg-jimbo-accent transition-all duration-300 hover:scale-105">
              Empezar ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#demos" className="flex items-center gap-2 border border-jimbo-border text-jimbo-white px-8 py-4 rounded-full font-medium text-lg hover:border-jimbo-muted transition-all duration-300">
              Ver demos
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto">
            {[
              { val: "$400", label: "MXN / mes" },
              { val: "∞", label: "Miembros" },
              { val: "24/7", label: "Acceso" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-black text-jimbo-white">{s.val}</p>
                <p className="text-xs text-jimbo-muted mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-5 h-5 text-jimbo-muted" />
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="funciones" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-jimbo-accent text-sm font-semibold tracking-widest uppercase mb-3">Funcionalidades</p>
            <h2 className="text-4xl md:text-5xl font-black">Todo lo que necesitas</h2>
            <p className="text-jimbo-muted text-lg mt-4 max-w-lg mx-auto">Un solo sistema para controlar cada aspecto de tu gimnasio.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="group p-6 rounded-2xl border border-jimbo-border bg-jimbo-card/30 hover:bg-jimbo-card hover:border-jimbo-accent/30 transition-all duration-500 h-full">
                  <div className="w-12 h-12 rounded-xl bg-jimbo-accent/10 flex items-center justify-center mb-4 group-hover:bg-jimbo-accent/20 transition-colors">
                    <f.icon className="w-6 h-6 text-jimbo-accent" />
                  </div>
                  <h3 className="text-jimbo-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-jimbo-muted text-sm leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ASÍ DE FÁCIL ─── */}
      <section className="py-28 relative" style={{ background: "rgba(17,17,17,0.5)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-jimbo-accent text-sm font-semibold tracking-widest uppercase mb-3">Sin complicaciones</p>
            <h2 className="text-4xl md:text-5xl font-black">Así de fácil</h2>
            <p className="text-jimbo-muted text-lg mt-4 max-w-2xl mx-auto">
              No necesitas instalaciones, servidores, ni técnicos. Contratas, configuras tu gym en 2 minutos, y ya tienes tu software funcionando.
            </p>
          </Reveal>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: "01",
                title: "Contrata tu plan",
                desc: "Pagas $400 MXN/mes con tarjeta. Sin contratos, sin letras chiquitas. Cancela cuando quieras.",
                accent: true,
              },
              {
                step: "02",
                title: "Configura tu gym",
                desc: "Ponle nombre, sube tu logo y listo. Tu sistema queda en tugimnasio.gojimbo.mx en segundos.",
                accent: false,
              },
              {
                step: "03",
                title: "¡Listo! Ya eres pro",
                desc: "Empieza a dar de alta miembros, cobrar membresías y controlar accesos. Todo desde tu celular o compu.",
                accent: false,
              },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`relative p-8 rounded-2xl border ${s.accent ? "border-jimbo-accent/30 bg-jimbo-accent/5" : "border-jimbo-border bg-jimbo-card/30"} h-full`}>
                  <span className={`text-5xl font-black ${s.accent ? "text-jimbo-accent" : "text-jimbo-border"}`}>{s.step}</span>
                  <h3 className="text-xl font-bold text-jimbo-white mt-4 mb-2">{s.title}</h3>
                  <p className="text-jimbo-muted text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* What you get */}
          <Reveal>
            <div className="bg-jimbo-card/50 border border-jimbo-border rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-jimbo-white mb-6 text-center">¿Qué recibes por $400/mes?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Tu propio sistema en tugimnasio.gojimbo.mx",
                  "Panel de administración con tu logo",
                  "Alta ilimitada de miembros",
                  "Cobro de membresías con tarjeta",
                  "Control de acceso con reconocimiento facial",
                  "Notificaciones por WhatsApp, email y SMS",
                  "Inventario de equipo y activos",
                  "Reportes y métricas en tiempo real",
                  "Soporte técnico incluido",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-jimbo-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-jimbo-white">{item}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <a href="/register?plan=subscription" className="inline-flex items-center gap-2 bg-jimbo-white text-jimbo-black px-8 py-4 rounded-full font-bold text-lg hover:bg-jimbo-accent transition-all duration-300 hover:scale-105">
                  Quiero mi sistema <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── DEMOS ─── */}
      <section id="demos" className="py-28 relative" style={{ background: "rgba(17,17,17,0.5)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-jimbo-accent text-sm font-semibold tracking-widest uppercase mb-3">Así se ve</p>
            <h2 className="text-4xl md:text-5xl font-black">Mira Jimbo en acción</h2>
            <p className="text-jimbo-muted text-lg mt-4 max-w-lg mx-auto">Cada módulo está diseñado para ser intuitivo y poderoso.</p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Reveal>
              <p className="text-sm text-jimbo-accent font-semibold mb-3 flex items-center gap-2"><Users className="w-4 h-4" /> Suscriptores</p>
              <DemoMembers />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm text-jimbo-accent font-semibold mb-3 flex items-center gap-2"><Package className="w-4 h-4" /> Inventario</p>
              <DemoInventory />
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-sm text-jimbo-accent font-semibold mb-3 flex items-center gap-2"><CreditCard className="w-4 h-4" /> Pagos con Tarjeta</p>
              <DemoPayments />
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm text-jimbo-accent font-semibold mb-3 flex items-center gap-2"><Bell className="w-4 h-4" /> Notificaciones</p>
              <DemoNotifications />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── JIMBOKIT ─── */}
      <section id="jimbokit" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <p className="text-jimbo-accent text-sm font-semibold tracking-widest uppercase mb-3">Hardware</p>
              <h2 className="text-4xl md:text-5xl font-black mb-6">JimboKit</h2>
              <p className="text-jimbo-muted text-lg leading-relaxed mb-8">
                Puertas de cortesía profesionales con lector biométrico integrado.
                Conéctalas a tu cuenta de Jimbo y automatiza el acceso por completo.
                Tus miembros entran con su cara, sin contacto, sin filas.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  "Puertas de cortesía de acero inoxidable",
                  "Conexión directa con Jimbo",
                  "Lector de reconocimiento facial integrado",
                  "Apertura en menos de 0.5 segundos",
                  "Instalación profesional incluida",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-jimbo-muted">
                    <CheckCircle2 className="w-5 h-5 text-jimbo-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-black text-jimbo-white">$12,000</span>
                <span className="text-jimbo-muted text-lg mb-1">MXN</span>
              </div>
              <a href="#precios" className="inline-flex items-center gap-2 bg-jimbo-accent text-jimbo-black px-8 py-4 rounded-full font-bold text-lg hover:bg-jimbo-accent-dim transition-all duration-300 hover:scale-105">
                Comprar JimboKit <ArrowRight className="w-5 h-5" />
              </a>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)" }} />
                <div className="relative bg-white rounded-3xl border border-jimbo-border p-8">
                  <Image src="/images/jimbokit.png" alt="JimboKit — Puertas de cortesía" width={600} height={500} className="w-full h-auto object-contain" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="precios" className="py-28 relative" style={{ background: "rgba(17,17,17,0.5)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-jimbo-accent text-sm font-semibold tracking-widest uppercase mb-3">Precios</p>
            <h2 className="text-4xl md:text-5xl font-black">Un precio. Todo incluido.</h2>
            <p className="text-jimbo-muted text-lg mt-4 max-w-lg mx-auto">Sin costos ocultos, sin planes confusos. Un solo precio para todo.</p>
          </Reveal>

          <Reveal>
            <div className="max-w-md mx-auto relative rounded-3xl border border-jimbo-accent/30 bg-jimbo-card p-8 glow-accent">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-jimbo-accent text-jimbo-black text-xs font-bold px-4 py-1 rounded-full">
                LANZAMIENTO
              </div>
              <div className="text-center mb-8 pt-4">
                <p className="text-jimbo-muted text-sm mb-2">Suscripción mensual</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-6xl font-black text-jimbo-white">$400</span>
                  <span className="text-jimbo-muted text-lg mb-2">MXN/mes</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {pricingFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-jimbo-accent flex-shrink-0" />
                    <span className="text-jimbo-white">{f}</span>
                  </li>
                ))}
              </ul>
              <a href="/register?plan=subscription" className="block w-full bg-jimbo-white text-jimbo-black py-4 rounded-full font-bold text-lg hover:bg-jimbo-accent transition-all duration-300 hover:scale-[1.02] text-center">
                Comenzar ahora
              </a>
              <p className="text-center text-xs text-jimbo-muted mt-4">Cancela cuando quieras · Sin compromisos</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-28 relative">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <p className="text-jimbo-accent text-sm font-semibold tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-black">Preguntas frecuentes</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FAQ />
          </Reveal>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(0,255,136,0.04) 0%, transparent 70%)" }} />
        <Reveal className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Listo para el<br /><span className="gradient-text">siguiente nivel?</span>
          </h2>
          <p className="text-jimbo-muted text-lg mb-10 max-w-xl mx-auto">
            Únete a los gimnasios que ya administran todo con Jimbo. Empieza hoy, sin compromisos.
          </p>
          <a href="/register?plan=subscription" className="inline-flex items-center gap-2 bg-jimbo-white text-jimbo-black px-10 py-5 rounded-full font-bold text-xl hover:bg-jimbo-accent transition-all duration-300 hover:scale-105">
            Empezar con Jimbo <ArrowRight className="w-6 h-6" />
          </a>
        </Reveal>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-jimbo-border py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/images/jimbo-logo-white.png" alt="Jimbo" width={80} height={26} className="h-5 w-auto" />
            <span className="text-jimbo-muted text-sm">© {new Date().getFullYear()} Jimbo. Todos los derechos reservados.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-jimbo-muted">
            <a href="#" className="hover:text-jimbo-white transition-colors">Términos</a>
            <a href="#" className="hover:text-jimbo-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-jimbo-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
