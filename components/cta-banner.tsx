import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="bg-primary py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg p-3">
            <MessageCircle className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-8 whitespace-nowrap">
          Escribinos para llevar a tu granja al próximo nivel
        </h2>
        <Button
          asChild
          className="rounded-full px-14 py-6 text-lg font-medium bg-white text-primary hover:bg-white/90 transition-colors duration-200"
        >
          <Link href="#contacto">Ver contacto</Link>
        </Button>
      </div>
    </section>
  );
}
