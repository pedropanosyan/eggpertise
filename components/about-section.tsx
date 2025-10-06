import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Eye,
  Heart,
  Users,
  Globe,
  TrendingUp,
  Shield,
  CheckCircle,
  MapPin,
  Calendar,
} from "lucide-react";

export function AboutSection() {
  return (
    <section id="quienes-somos" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Sobre Nosotros
          </Badge>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Transformando la Producción Avícola y Porcina
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Conectamos la innovación tecnológica global con productores
            latinoamericanos, ofreciendo soluciones integrales que maximizan la
            eficiencia y rentabilidad.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left side - Enhanced blue section */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-2xl p-8 md:p-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary rounded-full">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold">
                  Nuestra Historia
                </h3>
              </div>
              <div className="w-16 h-1 bg-primary"></div>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  <strong className="text-foreground">Nuestra Historia:</strong>{" "}
                  Eggpertise fue fundada por Ignacio Pernicone, el 2 de Julio de 2025, en el Día de la Avicultura, como resultado de una vida dedicada al sector. Vinculado a la industria desde los 14 años, y con más de 40 años en la industria, Ignacio continúa hoy un legado familiar, siendo la tercera generación dentro de la avicultura.
                </p>
                <p className="leading-relaxed">
                  Con una profunda pasión por la innovación y el compromiso con la excelencia, Eggpertise representa marcas líderes de calidad premium. Con un equipo humano de primer nivel, solido y dinamico, el foco está puesto en identificar y ofrecer las mejores soluciones, anticipándonos a las necesidades de la industria y promoviendo su desarrollo sostenible.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Enhanced content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                <strong className="text-primary font-semibold">
                  Misión:
                </strong>{" "}
                En EggPertise, nos dedicamos a ayudar a nuestros clientes a transformar proteína vegetal en proteína animal de manera eficiente y sustentable. Buscamos seleccionar las mejores innovaciones tecnológicas a nivel mundial para ofrecer soluciones personalizadas, rentables a largo plazo y de alta calidad en Latinoamérica.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                <strong className="text-primary font-semibold">
                  Visión:
                </strong>{" "}
                Nuestra visión es contribuir a un mundo más sustentable y saludable, donde la producción de alimentos sea respetuosa con el medio ambiente y permita garantizar la disponibilidad de alimento para las generaciones futuras.
              </p>

              {/* Key differentiators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">
                    Asesoramiento Personalizado
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Soporte Técnico 24/7</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Instalación Especializada</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Garantía Extendida</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Value proposition banner */}
        {/*
        <div className="mb-16">
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/abstract-agricultural-pattern.png')] opacity-10"></div>
            <div className="relative z-10">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                No hablamos de precios, hablamos de valor real.
              </h3>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Cada inversión en tecnología debe generar retornos medibles.
                Nuestro enfoque se centra en el ROI y la eficiencia operativa de
                tu producción.
              </p>
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
}
