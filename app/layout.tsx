import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Suspense } from "react";
import { WhatsAppButton } from "@/components/whatsapp-button";

// Configure Big Caslon for headings (fallback to serif)
const bigCaslon = {
  variable: "--font-heading",
  style: { fontFamily: "'Big Caslon', 'Times New Roman', serif" },
};

// Configure Arial for body text
const arial = {
  variable: "--font-body",
  style: { fontFamily: "Arial, sans-serif" },
};

export const metadata: Metadata = {
  title: "EggPertise - Soluciones Integrales para Producción Avícola y Porcina",
  description:
    "Desde EggPertise acercamos la innovación tecnológica global a productores avícolas y porcinos de Latinoamérica, combinando asesoramiento personalizado y soluciones integrales.",
  generator: "v0.app",
  icons: {
    icon: "/brand/favicon.png",
    shortcut: "/brand/favicon.png",
    apple: "/brand/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className="font-body"
        style={{
          ...arial.style,
          [bigCaslon.variable]: bigCaslon.style.fontFamily,
          [arial.variable]: arial.style.fontFamily,
        }}
      >
        <Suspense>
          {children}
          <Analytics />
        </Suspense>
        <WhatsAppButton />
      </body>
    </html>
  );
}
