import { CheckCircle } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="quienes-somos" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Transformando la Producción Avícola y Porcina
          </h2>
        </div>

        {/* Nuestra Historia - Image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
            <Image
              src="/landing/hero.jpg"
              alt="Nuestra Historia"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-serif font-bold">
              Nuestra historia
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                EggPertise fue fundada por Ignacio Pernicone, el 2 de Julio de
                2025, en el Día de la Avicultura, como resultado de una vida
                dedicada al sector. Vinculado a la industria desde los 14 años,
                y con más de 40 años en la industria, Ignacio continúa hoy un
                legado familiar, siendo la tercera generación dentro de la
                avicultura.
              </p>
              <p className="leading-relaxed">
                Con una profunda pasión por la innovación y el compromiso con la
                excelencia, EggPertise representa marcas líderes de calidad
                premium. Con un equipo humano de primer nivel, solido y
                dinamico, el foco está puesto en identificar y ofrecer las
                mejores soluciones, anticipándonos a las necesidades de la
                industria y promoviendo su desarrollo sostenible.
              </p>
            </div>
          </div>
        </div>

        {/* Nuestra Visión y Misión - Text left, cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-serif font-bold">
              Nuestra visión y misión
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              En EggPertise, nos dedicamos a ayudar a nuestros clientes a
              transformar proteína vegetal en proteína animal de manera
              eficiente y sustentable. Buscamos seleccionar las mejores
              innovaciones tecnológicas a nivel mundial para ofrecer soluciones
              personalizadas, rentables a largo plazo y de alta calidad en
              Latinoamérica.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Nuestra visión es contribuir a un mundo más sustentable y
              saludable, donde la producción de alimentos sea respetuosa con el
              medio ambiente y permita garantizar la disponibilidad de alimento
              para las generaciones futuras.
            </p>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="flex items-center gap-3 p-6 bg-secondary/50 rounded-lg min-h-[100px]">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="font-medium">Asesoramiento Personalizado</span>
            </div>
            <div className="flex items-center gap-3 p-6 bg-secondary/50 rounded-lg min-h-[100px]">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="font-medium">Soporte Técnico 24/7</span>
            </div>
            <div className="flex items-center gap-3 p-6 bg-secondary/50 rounded-lg min-h-[100px]">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="font-medium">Instalación Especializada</span>
            </div>
            <div className="flex items-center gap-3 p-6 bg-secondary/50 rounded-lg min-h-[100px]">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="font-medium">Garantía Extendida</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
