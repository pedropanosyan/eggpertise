import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Distributor } from "@/lib/contentful";

interface DistributorsSectionProps {
  distributors: Distributor[];
}

export function DistributorsSection({
  distributors,
}: DistributorsSectionProps) {
  return (
    <section
      id="distribuidoras"
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
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Nuestras Distribuidoras
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trabajamos con las marcas más reconocidas del mercado internacional
          </p>
        </div>

        {distributors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {distributors.map((distributor) => (
              <Card
                key={distributor.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 group overflow-hidden p-0"
              >
                {/* Distributor Logo */}
                <div className="relative h-56 overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <Image
                    src={distributor.logo}
                    alt={distributor.nombre}
                    width={200}
                    height={200}
                    className="object-contain max-w-[80%] max-h-[80%]"
                  />
                </div>

                <CardHeader className="text-center pb-2 pt-4">
                  <CardTitle className="text-xl font-serif font-bold text-foreground mb-1">
                    {distributor.nombre}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-foreground/80 text-center leading-relaxed mb-4 text-base">
                    {distributor.descripcion_corta}
                  </p>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 font-medium px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm"
                  >
                    <Link href={`/distribuidoras/${distributor.id}`}>
                      Ver Marca
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No hay distribuidoras disponibles en este momento.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
