import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="bg-primary py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-8">
          Escribinos para llevar tu granja al
          <br />
          próximo nivel
        </h2>
        <Button
          asChild
          variant="outline"
          className="rounded-full px-10 py-5 text-base font-medium border-2 border-primary-foreground/50 text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary transition-colors duration-200"
        >
          <Link href="#contacto">Ver contacto</Link>
        </Button>
      </div>
    </section>
  );
}
