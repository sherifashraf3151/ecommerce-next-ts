'use client';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

export default function ProductSlider({ images, altContent }: { images: string[]; altContent: string }) {
  return (
    <Carousel opts={{ loop: true, align: "start" }} plugins={[Autoplay({ delay: 2000 })]}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image className="mx-auto w-full object-fit-cover" src={image} alt={altContent} width={300} height={300} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
