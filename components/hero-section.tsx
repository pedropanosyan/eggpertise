import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "@/public/landing/hero.webp";

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center bg-white">
      <Image
        src={HeroImage}
        alt="Hero Image"
        className="absolute inset-0 w-full h-full object-cover opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-white/20"></div>

      <div className="relative container mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-tight tracking-tight">
              Soluciones Reales para tu Producción
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-4xl mx-auto">
              Desde EggPertise acercamos la innovación tecnológica global a
              productores avícolas y porcinos de Latinoamérica, combinando
              asesoramiento personalizado y soluciones integrales.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                asChild
                size="lg"
                className="px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <Link
                  href="/#distribuidoras"
                  className="flex items-center gap-2"
                >
                  Ver Fabricantes
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-[1.02]"
              >
                <Link href="#contacto" className="flex items-center gap-2">
                  Consultar Ahora
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
