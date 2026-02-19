import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import DressCard from './DressCard';
import type { Dress } from '../backend';

interface DressCarouselProps {
  dresses: Dress[];
}

export default function DressCarousel({ dresses }: DressCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {dresses.map((dress) => (
          <CarouselItem key={dress.id} className="md:basis-1/2 lg:basis-1/3">
            <DressCard dress={dress} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
