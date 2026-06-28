'use client';

import Reveal from '@/components/motion/Reveal';

/* Official Maria Nila partner badge — uses the official "maria nila · Stockholm"
   wordmark (white keyed out to transparent ink). */
export default function MariaNila() {
  return (
    <section className="section border-y border-line bg-surface/40 py-14 lg:py-20">
      <Reveal>
        <div className="wrap flex flex-col items-center text-center">
          <span className="text-[0.8rem] font-medium uppercase tracking-[0.2em] text-gold-deep">
            Official
          </span>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/maria-nila.png"
            alt="Maria Nila Stockholm"
            className="mt-6 h-14 w-auto lg:h-[4.5rem]"
          />

          <div className="mt-7 flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[0.8rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
              Salon &amp; Educator
            </span>
            <span className="h-px w-10 bg-gold/60" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
