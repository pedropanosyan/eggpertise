export const revalidate = 0;

import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductImageGallery } from "@/components/product-image-gallery";
import Link from "next/link";
import { ChevronRight, MessageCircle, Factory } from "lucide-react";
import { FichaTecnicaModal } from "@/components/ficha-tecnica-modal";
import {
  getProductoBySlug,
  getAllProductoSlugs,
  ProductoCompleto,
} from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { renderOptions } from "@/lib/rich-text-renderers";
import { Card } from "@/components/ui/card";

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

  const whatsappMessage = encodeURIComponent(
    `Hola EggPertise! Quiero información sobre: ${producto.nombre}`
  );
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=5491125155801&text=${whatsappMessage}&type=phone_number&app_absent=0`;

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
          <div className="max-w-4xl">
            {producto.fabricante && (
              <div className="mb-4">
                <Link
                  href={`/distribuidoras/${producto.fabricante.slug}`}
                  className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  {producto.fabricante.nombre}
                </Link>
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
      {/* Main Content - 2 Column Grid */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Left Column - Gallery + Actions + Manufacturer */}
              <div>
                <div className="lg:sticky lg:top-24 space-y-6">
                  {producto.imagenes && producto.imagenes.length > 0 && (
                    <ProductImageGallery
                      images={producto.imagenes}
                      productName={producto.nombre}
                    />
                  )}

                  {/* Technical Data Sheet */}
                  {producto.ficha_tecnica && (
                    <div className="flex justify-center">
                      <FichaTecnicaModal
                        productoNombre={producto.nombre}
                        fichaTecnicaUrl={producto.ficha_tecnica.url}
                        fichaTecnicaNombre={
                          producto.ficha_tecnica.title || "Ficha Técnica"
                        }
                      />
                    </div>
                  )}

                  {/* Manufacturer Card */}
                  {producto.fabricante && (
                    <Card className="p-5 border-border/50">
                      <Link
                        href={`/distribuidoras/${producto.fabricante.slug}`}
                        className="flex items-center gap-4 group"
                      >
                        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Factory className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                            Fabricado por
                          </p>
                          <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                            {producto.fabricante.nombre}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    </Card>
                  )}
                </div>
              </div>

              {/* Right Column - Description */}
              <div className="prose prose-lg prose-slate max-w-none">
                {documentToReactComponents(
                  producto.descripcion_larga,
                  renderOptions
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-t border-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              ¿Interesado en {producto.nombre}?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Contáctanos para obtener más información sobre este producto
              {producto.fabricante &&
                ` y otros de ${producto.fabricante.nombre}`}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-3 shadow-lg"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Consultar por WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              >
                <Link href="/#contacto">Contactar Ahora</Link>
              </Button>
              {producto.fabricante && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 py-3"
                >
                  <Link href={`/distribuidoras/${producto.fabricante.slug}`}>
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
