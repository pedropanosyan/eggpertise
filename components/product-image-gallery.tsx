"use client";

import * as React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageLightbox } from "@/components/ui/image-lightbox";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {images.map((imagen, index) => (
            <CarouselItem key={index} className="pl-2 basis-full">
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 group overflow-hidden p-0">
                <div
                  className="relative h-80 overflow-hidden cursor-zoom-in"
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={imagen}
                    alt={`${productName} - Imagen ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-primary/20 backdrop-blur-md hover:bg-primary/30 border-primary/30 text-primary-foreground h-10 w-10 z-10" />
        <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-primary/20 backdrop-blur-md hover:bg-primary/30 border-primary/30 text-primary-foreground h-10 w-10 z-10" />
      </Carousel>

      <ImageLightbox
        images={images}
        initialIndex={selectedIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        alt={productName}
      />
    </>
  );
}
