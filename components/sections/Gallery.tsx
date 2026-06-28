'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SmartImage from '@/components/SmartImage';
import SectionHeading from '@/components/SectionHeading';
import { gallery } from '@/content/gallery';

export default function Gallery() {
  const track = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: 'smooth' });
  };

  return (
    <section id="ergebnisse" className="py-24 lg:py-32">
      <div className="section">
        <div className="wrap flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Unsere Arbeiten"
            title="Ergebnisse, die für sich *sprechen.*"
            intro="Von feinen Farbnuancen bis zu echten Typveränderungen. Die Bilder zeigen keine Modelle, sondern echte Kundinnen und echte Ergebnisse aus unserem Salon."
          />
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Zurück"
              className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-ink hover:text-canvas"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Weiter"
              className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-ink hover:text-canvas"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-12 flex snap-x-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12"
      >
        {gallery.map((g, i) => (
          <motion.figure
            key={g.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative w-[78vw] shrink-0 snap-start sm:w-[42vw] lg:w-[30vw]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] border border-line">
              <SmartImage
                src={g.src}
                alt={g.label}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 30vw"
                rounded="rounded-[22px]"
                className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/70 via-noir/5 to-transparent opacity-90" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                <span className="font-display text-lg text-canvas">{g.label}</span>
                <span className="rounded-full bg-canvas/15 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-canvas backdrop-blur">
                  {g.tag}
                </span>
              </figcaption>
            </div>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
