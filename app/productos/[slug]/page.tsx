export const revalidate = 0;

import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import {
  getProductoBySlug,
  getAllProductoSlugs,
  ProductoCompleto,
} from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { renderOptions } from "@/lib/rich-text-renderers";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const producto: ProductoCompleto | null = await getProductoBySlug(
    params.slug
  );

  if (!producto) {
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
            src={producto.imagen_portada}
            alt={producto.nombre}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {producto.fabricante && (
            <div className="flex items-center mb-8">
              <Button
                asChild
                variant="ghost"
                className="mr-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Link
                  href={`/distribuidoras/${producto.fabricante.id}`}
                  className="flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver a {producto.fabricante.nombre}
                </Link>
              </Button>
            </div>
          )}

          <div className="max-w-4xl">
            {producto.fabricante && (
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {producto.fabricante.nombre}
                </span>
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white">
              {producto.nombre}
            </h1>
            <div className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              {producto.descripcion_corta}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Sobre {producto.nombre}
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="prose prose-lg prose-slate max-w-none mx-auto">
              {/* Gallery Carousel - Floated Right */}
              {producto.imagenes && producto.imagenes.length > 0 && (
                <div className="relative float-right ml-8 mb-8 w-full sm:w-2/3 lg:w-1/2">
                  <Carousel
                    opts={{
                      align: "center",
                      loop: true,
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-2">
                      {producto.imagenes.map((imagen, index) => (
                        <CarouselItem key={index} className="pl-2 basis-full">
                          <Card className="bg-white/10 backdrop-blur-md border border-white/20 group overflow-hidden p-0">
                            <div className="relative h-80 overflow-hidden">
                              <Image
                                src={imagen}
                                alt={`${producto.nombre} - Imagen ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/20 backdrop-blur-md hover:bg-primary/30 border-primary/30 text-primary-foreground h-10 w-10" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/20 backdrop-blur-md hover:bg-primary/30 border-primary/30 text-primary-foreground h-10 w-10" />
                  </Carousel>

                  {/* Technical Data Sheet Download */}
                  {producto.ficha_tecnica && (
                    <div className="mt-4 flex justify-center">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full"
                      >
                        <a
                          href={producto.ficha_tecnica.url}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                          {producto.ficha_tecnica.title || "Ficha Técnica"}
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Text Content */}
              {documentToReactComponents(
                producto.descripcion_larga,
                renderOptions
              )}

              {/* Clear float to ensure subsequent content flows correctly */}
              <div className="clear-both"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              ¿Interesado en {producto.nombre}?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Contáctanos para obtener más información sobre este producto
              {producto.fabricante && ` y otros de ${producto.fabricante.nombre}`}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              >
                <Link href="/#contacto">Contactar Ahora</Link>
              </Button>
              {producto.fabricante && (
                <Button asChild variant="outline" size="lg" className="px-8 py-3">
                  <Link href={`/distribuidoras/${producto.fabricante.id}`}>
                    Ver Más de {producto.fabricante.nombre}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Generate static params for all products
export async function generateStaticParams() {
  const slugs = await getAllProductoSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}
