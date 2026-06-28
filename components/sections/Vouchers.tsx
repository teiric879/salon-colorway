'use client';

import { motion } from 'framer-motion';
import { Gift, Phone } from 'lucide-react';
import RevealText from '@/components/motion/RevealText';
import Reveal from '@/components/motion/Reveal';
import { site } from '@/content/site';

export default function Vouchers() {
  return (
    <section className="section py-20 lg:py-28">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-noir px-7 py-14 text-canvas sm:px-14 lg:py-20">
          <div aria-hidden className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold/20 blur-[110px]" />
          <div aria-hidden className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-gold/10 blur-[110px]" />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold">
                  <Gift className="h-5 w-5" />
                </span>
                <span className="eyebrow text-gold">Gutscheine</span>
              </div>
              <RevealText
                as="h2"
                text="Das schönste Geschenk? *Zeit* *für* *sich.*"
                className="display mt-5 text-[2rem] leading-[1.06] text-canvas [&_.accent-italic]:text-gold sm:text-[2.7rem]"
              />
              <Reveal delay={0.15}>
                <p className="mt-5 text-[1.02rem] leading-relaxed text-canvas/75">
                  Ob Wunschbetrag oder Lieblingsbehandlung. Mit einem Gutschein verschenkst du nicht
                  nur schönes Haar, sondern eine kleine Auszeit vom Alltag.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <motion.div
                initial={{ rotate: -3 }}
                whileHover={{ rotate: 0, y: -6 }}
                transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                className="relative w-[290px] overflow-hidden rounded-[22px] border border-gold/25 bg-gradient-to-br from-canvas/[0.1] to-canvas/[0.015] p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.75)] backdrop-blur"
              >
                {/* zarter Gold-Schimmer in der Ecke */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-gold/25 blur-2xl"
                />

                <div className="relative flex items-center justify-between">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.svg"
                    alt="Der Salon by Kristina"
                    className="h-7 w-auto"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                  <Gift className="h-5 w-5 text-gold/70" />
                </div>

                <div className="relative mt-9">
                  <p className="text-[0.66rem] uppercase tracking-[0.32em] text-canvas/45">Gutschein</p>
                  <p className="mt-1.5 font-display text-[2rem] leading-none text-canvas">Wunschbetrag</p>
                </div>

                {/* gestrichelte Trennung wie bei einer Gutscheinkarte */}
                <div aria-hidden className="relative mt-6 border-t border-dashed border-canvas/20" />

                <a
                  href={site.phoneHref}
                  className="relative mt-4 inline-flex items-center gap-2 text-[0.82rem] text-gold transition-colors hover:text-canvas"
                >
                  <Phone className="h-3.5 w-3.5" /> {site.phone}
                </a>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
