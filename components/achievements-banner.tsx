import { Users, Award, Lightbulb, Globe } from "lucide-react";

export function AchievementsBanner() {
  const stats = [
    {
      icon: Users,
      value: "+15",
      label: "Granjas Confiaron",
      description: "Desde pequeños productores hasta grandes corporaciones",
    },
    {
      icon: Award,
      value: "+50",
      label: "Máquinas Instaladas",
      description: "Equipos de última generación funcionando óptimamente",
    },
    {
      icon: Lightbulb,
      value: "+100",
      label: "Soluciones Ejecutadas",
      description: "Proyectos completados exitosamente",
    },
    {
      icon: Globe,
      value: "8",
      label: "Países Atendidos",
      description: "Presencia consolidada en Latinoamérica",
    },
  ];

  return (
    <section
      id="logros"
      className="py-20 bg-gradient-to-br from-primary/5 to-primary/15 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0,29,81,0.1) 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, rgba(0,29,81,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary border border-primary/20 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Nuestros Logros
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Resultados que Hablan por Sí Solos
          </h2>
          <p className="text-lg text-primary/80 max-w-2xl mx-auto">
            Más de 15 años construyendo confianza y entregando resultados
            excepcionales
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="group text-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 transition-all duration-500 h-full flex flex-col">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-6 shadow-lg transition-all duration-300 mx-auto">
                  <stat.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <h3 className="font-semibold text-primary mb-2 text-lg">
                  {stat.label}
                </h3>
                <p className="text-sm text-primary/70 leading-relaxed flex-grow">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Milestones */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <h3 className="text-xl font-serif font-bold text-primary mb-3">
              Nacimos el día de la avicultura
            </h3>
            <ul className="list-disc list-inside text-primary/80 space-y-2">
              <li>
                En la avícola concretamos nuestra primer venta antes de pisar el
                stand
              </li>
              <li>Foto con Ordoñez (que sacó Nacho Ancilleta)</li>
            </ul>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <h3 className="text-xl font-serif font-bold text-primary mb-3">
              Expandimos al mercado LATAM
            </h3>
            <p className="text-primary/80">
              WEO - Centroamericano y ahora en LPN buscamos el mismo éxito
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
