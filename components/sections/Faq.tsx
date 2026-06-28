'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { faqs } from '@/content/faq';

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="section bg-surface/40 py-24 lg:py-32">
      <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          eyebrow="Gut zu wissen"
          title="Noch *Fragen?*"
          intro="Deine Frage ist nicht dabei? Ruf uns einfach an oder schreib uns per WhatsApp unter 02251 7736339. Wir helfen dir gerne persönlich weiter."
        />

        <div>
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="relative border-b border-line">
                {/* gold accent bar that grows when open */}
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ scaleY: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-0 h-full w-[2px] origin-top bg-gold-deep"
                />
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center gap-4 py-5 pl-5 text-left sm:gap-5"
                >
                  <span
                    className={`font-display text-sm tabular-nums transition-colors duration-300 ${
                      isOpen ? 'text-gold-deep' : 'text-stone'
                    } group-hover:text-gold-deep`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-display text-lg text-ink transition-transform duration-300 ease-smooth group-hover:translate-x-1 sm:text-xl">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                      isOpen
                        ? 'border-gold-deep bg-gold/10 text-gold-deep'
                        : 'border-line text-ink-soft group-hover:border-gold-deep group-hover:text-gold-deep'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="lead max-w-prose2 pb-6 pl-5 pr-12 text-[0.96rem] sm:pl-12">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
