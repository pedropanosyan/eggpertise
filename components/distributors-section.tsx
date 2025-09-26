import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DistributorsSection() {
  const distributors = [
    {
      name: "TechFarm Solutions",
      description:
        "Líder en tecnología avícola con más de 20 años de experiencia en automatización de granjas.",
      image: "/modern-poultry-farm-equipment.jpg",
      slug: "techfarm-solutions",
    },
    {
      name: "PorcineMax",
      description:
        "Especialistas en soluciones integrales para la producción porcina moderna y eficiente.",
      image: "/pig-farm-technology-equipment.jpg",
      slug: "porcinemax",
    },
    {
      name: "AgroInnovate",
      description:
        "Innovación en sistemas de alimentación y control ambiental para granjas avícolas.",
      image: "/agricultural-innovation-technology.jpg",
      slug: "agroinnovate",
    },
    {
      name: "FarmTech Global",
      description:
        "Soluciones tecnológicas globales para optimizar la producción y el bienestar animal.",
      image: "/global-farm-technology-solutions.jpg",
      slug: "farmtech-global",
    },
    {
      name: "EcoFarm Systems",
      description:
        "Sistemas sustentables y eficientes para la producción avícola y porcina responsable.",
      image: "/sustainable-farm-systems.jpg",
      slug: "ecofarm-systems",
    },
    {
      name: "ProAnimal Tech",
      description:
        "Tecnología avanzada enfocada en el bienestar animal y la eficiencia productiva.",
      image: "/animal-welfare-technology.jpg",
      slug: "proanimal-tech",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Nuestras Distribuidoras
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trabajamos con las marcas más reconocidas del mercado internacional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {distributors.map((distributor, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 group overflow-hidden p-0"
            >
              {/* Distributor Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={distributor.image || "/placeholder.svg"}
                  alt={distributor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <CardHeader className="text-center pb-2 pt-4">
                <CardTitle className="text-xl font-serif font-bold text-foreground mb-1">
                  {distributor.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-foreground/80 text-center leading-relaxed mb-4 text-base">
                  {distributor.description}
                </p>

                <Button
                  asChild
                  variant="outline"
                  className="w-full border-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 font-medium px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm"
                >
                  <Link href={`/distribuidoras/${distributor.slug}`}>
                    Ver Marca
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
