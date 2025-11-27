'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export const Slide = ({ children }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: 'start',
  });

  return (
    <div className='embla overflow-hidden' ref={emblaRef}>
      <div className='embla__container flex'>{children}</div>
    </div>
  );
};
