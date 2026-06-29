'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import TiltCard from '@/components/motion/TiltCard';
import { services, groups } from '@/content/services';
import { useBooking } from '@/components/BookingProvider';

export default function Services() {
  const [active, setActive] = useState<string>('Alle');
  const { open } = useBooking();
  const tabs = ['Alle', ...groups];
  const list = active === 'Alle' ? services : services.filter((s) => s.group === active);

  return (
    <section id="leistungen" className="section py-24 lg:py-32">
      <div className="wrap">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Leistungen"
            title="Handwerk, das man *sieht.*"
            intro="Wir haben uns bewusst auf Haare ab mittlerer Länge spezialisiert – mit Fokus auf Color, Blond und gesunde Pflege."
          />
          <Reveal>
            <div
              role="tablist"
              aria-label="Leistungen filtern"
              className="inline-flex flex-wrap items-center gap-1 rounded-full border border-line bg-surface/60 p-1.5 shadow-[inset_0_1px_2px_rgb(var(--ink)/0.05)] backdrop-blur-sm"
            >
              {tabs.map((t) => {
                const isActive = active === t;
                return (
                  <motion.button
                    key={t}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(t)}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="relative min-h-[44px] rounded-full px-5 py-2.5 text-[0.85rem] font-medium tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/60"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="filterPill"
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-ink shadow-[0_10px_24px_-10px_rgb(var(--ink)/0.55)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {/* feiner Rosé-Schimmer beim Aktivieren */}
                    {isActive && (
                      <motion.span
                        aria-hidden
                        initial={{ opacity: 0.55, scale: 0.6 }}
                        animate={{ opacity: 0, scale: 1.15 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full ring-1 ring-rose/60"
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive ? 'text-canvas' : 'text-ink-soft hover:text-ink'
                      }`}
                    >
                      {t}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((s, i) => (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="group h-full perspective">
                  <div className="card-surface preserve-3d flex h-full flex-col p-7">
                    <span className="eyebrow text-gold-deep">{s.group}</span>
                    <h3 className="display mt-3 text-2xl">{s.title}</h3>
                    <p className="lead mt-3 text-[0.94rem]">{s.desc}</p>

                    <div className="mt-auto">
                      {s.includes && (
                        <div className="pt-6">
                          <p className="text-[0.66rem] font-medium uppercase tracking-[0.18em] text-gold-deep">
                            Im Paket enthalten
                          </p>
                          <ul className="mt-2.5 flex min-h-[72px] flex-wrap content-start gap-2">
                            {s.includes.map((inc) => (
                              <li key={inc} className="chip text-[0.72rem]">
                                <Check className="h-3 w-3 text-gold-deep" />
                                {inc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
