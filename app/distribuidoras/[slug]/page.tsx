export const revalidate = 300; // 5 minutes

import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getFabricanteBySlug,
  getAllFabricanteSlugs,
  Fabricante,
} from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { renderOptions } from "@/lib/rich-text-renderers";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function DistributorPage({ params }: PageProps) {
  const distributor: Fabricante | null = await getFabricanteBySlug(params.slug);

  if (!distributor) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 min-h-[70vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={distributor.imagen_portada}
            alt={distributor.nombre}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Button
              asChild
              variant="ghost"
              className="mr-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Link href="/#distribuidoras" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Fabricantes
              </Link>
            </Button>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white">
              {distributor.nombre}
            </h1>
            <div className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {distributor.descripcion_corta}
            </div>
          </div>
        </div>

        {/* Logo Overlay - Bottom Right */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72">
            <Image
              src={distributor.logo}
              alt={distributor.nombre}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-slate max-w-none mx-auto">
              {documentToReactComponents(
                distributor.descripcion_larga,
                renderOptions
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {distributor.productos && distributor.productos.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                  Productos de {distributor.nombre}
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
                  Descubre nuestra amplia gama de productos de alta calidad
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {distributor.productos.map((producto) => (
                  <Card
                    key={producto.id}
                    className="bg-white/10 backdrop-blur-md border border-white/20 group overflow-hidden p-0"
                  >
                    {/* Product Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={producto.logo_portada}
                        alt={producto.nombre}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <CardHeader className="text-center pb-2 pt-4">
                      <CardTitle className="text-xl font-serif font-bold text-foreground mb-1">
                        {producto.nombre}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <p className="text-foreground/80 text-center leading-relaxed mb-4 text-base">
                        {producto.descripcion_corta}
                      </p>

                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 font-medium px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm"
                      >
                        <Link href={`/productos/${producto.id}`}>
                          Ver Detalles
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              ¿Interesado en {distributor.nombre}?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Contáctanos para obtener más información sobre nuestros productos
              y servicios
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              >
                <Link href="/#contacto">Contactar Ahora</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-3">
                <Link href="/#distribuidoras">Ver Otros Fabricantes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Generate static params for all distributors
export async function generateStaticParams() {
  const slugs = await getAllFabricanteSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}
