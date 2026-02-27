import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoJimbo — Software de Administración para Gimnasios",
  description:
    "Jimbo es la plataforma SaaS para gimnasios más moderna. Control de acceso biométrico, gestión de miembros, pagos con tarjeta, notificaciones y más.",
  keywords: [
    "software gimnasio",
    "administración gym",
    "control de acceso",
    "reconocimiento facial",
    "gestión de miembros",
    "SaaS gimnasio",
    "GoJimbo",
    "Jimbo",
  ],
  openGraph: {
    title: "GoJimbo — Software de Administración para Gimnasios",
    description:
      "La plataforma SaaS más moderna para administrar tu gimnasio. Control biométrico, pagos, notificaciones y más.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
