import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";
import { Suspense } from "react";
import { WhatsAppButton } from "@/components/whatsapp-button";

const lato = {
  variable: "--font-body",
  style: { fontFamily: "'Lato', Arial, sans-serif" },
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
  openGraph: {
    title: "EggPertise - Soluciones Integrales para Producción Avícola y Porcina",
    description:
      "Desde EggPertise acercamos la innovación tecnológica global a productores avícolas y porcinos de Latinoamérica, combinando asesoramiento personalizado y soluciones integrales.",
    url: "https://www.eggpertise.com",
    siteName: "EggPertise",
    images: [
      {
        url: "https://www.eggpertise.com/brand/og-image.jpg",
        width: 720,
        height: 1000,
        alt: "EggPertise - Soluciones para Producción Avícola y Porcina",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body
        className="font-body"
        style={{
          ...lato.style,
          [lato.variable]: lato.style.fontFamily,
        }}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LH9L77P6YJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LH9L77P6YJ');
          `}
        </Script>
        <Suspense>
          {children}
          <Analytics />
        </Suspense>
        <WhatsAppButton />
      </body>
    </html>
  );
}
