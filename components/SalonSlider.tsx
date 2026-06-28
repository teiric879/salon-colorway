'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';

type Slide = { src: string; alt: string };

/* Salon gallery: all frames stacked + preloaded. Crossfade (CSS opacity
   transition) and slow zoom-out (CSS @keyframes `kenburns`) both run on the
   compositor — buttery in every browser, incl. Firefox. Reduced-motion safe. */
export default function SalonSlider({
  images,
  interval = 5200,
}: {
  images: Slide[];
  interval?: number;
}) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || images.length < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [reduce, images.length, interval]);

  return (
    <div className="absolute inset-0">
      {images.map((img, idx) => {
        const active = idx === i;
        return (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
              active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className={`absolute inset-0 ${active && !reduce ? 'animate-kenburns' : ''}`}
              style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          </div>
        );
      })}

      {/* progress dots */}
      <div className="absolute bottom-4 left-4 z-10 flex gap-1.5">
        {images.map((img, d) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setI(d)}
            aria-label={`Foto ${d + 1} anzeigen`}
            className={`h-1.5 rounded-full transition-all duration-500 ease-smooth ${
              d === i ? 'w-5 bg-canvas' : 'w-1.5 bg-canvas/60 hover:bg-canvas/90'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
