import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Globe, Mail, Phone } from "lucide-react";

// Datos de las distribuidoras
const distributors = [
  {
    name: "TechFarm Solutions",
    description:
      "Líder en tecnología avícola con más de 20 años de experiencia en automatización de granjas.",
    image: "/modern-poultry-farm-equipment.jpg",
    slug: "techfarm-solutions",
    fullDescription:
      "TechFarm Solutions es una empresa líder en el desarrollo e implementación de tecnología avanzada para granjas avícolas. Con más de dos décadas de experiencia en el sector, nos especializamos en sistemas de automatización que optimizan la producción, mejoran el bienestar animal y reducen los costos operativos.",
    services: [
      "Sistemas de alimentación automática",
      "Control de clima inteligente",
      "Monitoreo de salud animal",
      "Automatización de recolección de huevos",
      "Sistemas de limpieza automatizada",
    ],
    contact: {
      website: "www.techfarm-solutions.com",
      email: "info@techfarm-solutions.com",
      phone: "+1 555 123 4567",
    },
    founded: "2003",
    location: "Estados Unidos",
    specialties: ["Tecnología Avícola", "Automatización", "IoT Agrícola"],
  },
  {
    name: "PorcineMax",
    description:
      "Especialistas en soluciones integrales para la producción porcina moderna y eficiente.",
    image: "/pig-farm-technology-equipment.jpg",
    slug: "porcinemax",
    fullDescription:
      "PorcineMax se dedica exclusivamente a revolucionar la industria porcina mediante tecnología de vanguardia. Nuestras soluciones integrales abarcan desde sistemas de alimentación precision hasta tecnologías de monitoreo de bienestar animal, garantizando máxima eficiencia y rentabilidad.",
    services: [
      "Sistemas de alimentación de precisión",
      "Control ambiental automatizado",
      "Monitoreo de bienestar porcino",
      "Gestión de datos productivos",
      "Sistemas de ventilación inteligente",
    ],
    contact: {
      website: "www.porcinemax.com",
      email: "contacto@porcinemax.com",
      phone: "+31 20 555 0123",
    },
    founded: "2010",
    location: "Países Bajos",
    specialties: [
      "Producción Porcina",
      "Bienestar Animal",
      "Eficiencia Productiva",
    ],
  },
  {
    name: "AgroInnovate",
    description:
      "Innovación en sistemas de alimentación y control ambiental para granjas avícolas.",
    image: "/agricultural-innovation-technology.jpg",
    slug: "agroinnovate",
    fullDescription:
      "AgroInnovate es sinónimo de innovación en el sector agropecuario. Desarrollamos tecnologías disruptivas que transforman las operaciones tradicionales en granjas inteligentes, con especial enfoque en sostenibilidad y eficiencia energética.",
    services: [
      "Sistemas de alimentación inteligente",
      "Control climático avanzado",
      "Energías renovables para granjas",
      "Análisis predictivo de producción",
      "Gestión integral de recursos",
    ],
    contact: {
      website: "www.agroinnovate.com",
      email: "hello@agroinnovate.com",
      phone: "+49 30 555 7890",
    },
    founded: "2015",
    location: "Alemania",
    specialties: [
      "Innovación Tecnológica",
      "Sostenibilidad",
      "Granjas Inteligentes",
    ],
  },
  {
    name: "FarmTech Global",
    description:
      "Soluciones tecnológicas globales para optimizar la producción y el bienestar animal.",
    image: "/global-farm-technology-solutions.jpg",
    slug: "farmtech-global",
    fullDescription:
      "FarmTech Global opera a escala mundial ofreciendo soluciones tecnológicas integrales para la industria agropecuaria. Nuestra experiencia multicultural y adaptabilidad a diferentes mercados nos permite ofrecer soluciones personalizadas que respetan las particularidades locales.",
    services: [
      "Consultoría tecnológica global",
      "Implementación de sistemas integrados",
      "Capacitación y soporte técnico",
      "Desarrollo de software personalizado",
      "Análisis de mercados internacionales",
    ],
    contact: {
      website: "www.farmtech-global.com",
      email: "global@farmtech-global.com",
      phone: "+44 20 7555 0100",
    },
    founded: "2008",
    location: "Reino Unido",
    specialties: [
      "Soluciones Globales",
      "Consultoría",
      "Integración Tecnológica",
    ],
  },
  {
    name: "EcoFarm Systems",
    description:
      "Sistemas sustentables y eficientes para la producción avícola y porcina responsable.",
    image: "/sustainable-farm-systems.jpg",
    slug: "ecofarm-systems",
    fullDescription:
      "EcoFarm Systems lidera la revolución hacia una agricultura sostenible y responsable. Desarrollamos tecnologías que no solo optimizan la producción, sino que también minimizan el impacto ambiental y promueven prácticas éticas en la industria agropecuaria.",
    services: [
      "Sistemas de producción sostenible",
      "Tecnologías de reciclaje de residuos",
      "Energía solar para granjas",
      "Certificaciones de sostenibilidad",
      "Programas de bienestar animal",
    ],
    contact: {
      website: "www.ecofarm-systems.com",
      email: "sustentable@ecofarm-systems.com",
      phone: "+45 33 555 2000",
    },
    founded: "2012",
    location: "Dinamarca",
    specialties: [
      "Sostenibilidad",
      "Tecnología Verde",
      "Producción Responsable",
    ],
  },
  {
    name: "ProAnimal Tech",
    description:
      "Tecnología avanzada enfocada en el bienestar animal y la eficiencia productiva.",
    image: "/animal-welfare-technology.jpg",
    slug: "proanimal-tech",
    fullDescription:
      "ProAnimal Tech se especializa en desarrollar tecnologías que priorizan el bienestar animal sin comprometer la eficiencia productiva. Nuestras soluciones innovadoras crean ambientes óptimos que permiten a los animales expresar comportamientos naturales mientras maximizan la producción.",
    services: [
      "Sistemas de monitoreo de bienestar",
      "Ambientes enriquecidos automatizados",
      "Tecnología de detección de estrés",
      "Sistemas de alimentación por comportamiento",
      "Certificación de bienestar animal",
    ],
    contact: {
      website: "www.proanimal-tech.com",
      email: "bienestar@proanimal-tech.com",
      phone: "+41 44 555 3000",
    },
    founded: "2018",
    location: "Suiza",
    specialties: [
      "Bienestar Animal",
      "Tecnología Conductual",
      "Producción Ética",
    ],
  },
];

interface PageProps {
  params: {
    slug: string;
  };
}

export default function DistributorPage({ params }: PageProps) {
  const distributor = distributors.find((d) => d.slug === params.slug);

  if (!distributor) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 to-primary/15">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Button asChild variant="ghost" className="mr-4">
              <Link href="/#distribuidoras" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Distribuidoras
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Fundada en {distributor.founded} • {distributor.location}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                {distributor.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {distributor.fullDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {distributor.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="relative">
              <Image
                src={distributor.image}
                alt={distributor.name}
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">
              Servicios y Soluciones
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {distributor.services.map((service, index) => (
                <Card
                  key={index}
                  className="border-2 border-primary/10 hover:border-primary/30 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      <p className="font-medium">{service}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-serif">
                  Información de Contacto
                </CardTitle>
                <p className="text-muted-foreground">
                  Conecta directamente con {distributor.name}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Globe className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Sitio Web</p>
                    <p className="text-muted-foreground">
                      {distributor.contact.website}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">
                      {distributor.contact.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-muted-foreground">
                      {distributor.contact.phone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Generate static params for all distributors
export async function generateStaticParams() {
  return distributors.map((distributor) => ({
    slug: distributor.slug,
  }));
}
