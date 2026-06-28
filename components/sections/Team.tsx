'use client';

import { motion } from 'framer-motion';
import SmartImage from '@/components/SmartImage';
import SectionHeading from '@/components/SectionHeading';
import { team } from '@/content/team';

export default function Team() {
  return (
    <section id="team" className="section py-24 lg:py-32">
      <div className="wrap">
        <SectionHeading
          align="center"
          eyebrow="Unser Team"
          title="Fünf Persönlichkeiten. *Eine* *Leidenschaft.*"
          intro="Fünf Expertinnen mit unterschiedlichen Stärken, einer gemeinsamen Leidenschaft und dem Anspruch, dass du unseren Salon mit einem Lächeln verlässt."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`group ${i === 0 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] border border-line">
                <SmartImage
                  src={m.img}
                  alt={`${m.name} – ${m.role}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  rounded="rounded-[18px]"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/75 via-transparent to-transparent" />
                {m.focus && (
                  <span className="absolute left-3 top-3 translate-y-1 rounded-full bg-canvas/85 px-2.5 py-1 text-[0.66rem] font-medium uppercase tracking-wide text-ink opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {m.focus}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-xl text-canvas">{m.name}</p>
                  <p className="text-[0.8rem] text-canvas/75">{m.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
