'use client';

import { motion, useReducedMotion } from 'framer-motion';

/* Editorial length guide — the salon's own hand-drawn sketch.
   M = Schulterlänge, L = Brustlänge (labels are part of the artwork). */
export default function WomanLengthSketch() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="w-[360px] max-w-full shrink-0 sm:w-[410px] lg:w-[460px]"
      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        role="img"
        aria-label="Längen-Guide: M entspricht Schulterlänge, L entspricht Brustlänge"
        className="aspect-[3/2] w-full"
        style={{
          background:
            'linear-gradient(to bottom, rgb(var(--gold)) 0%, rgb(var(--gold)) 28%, rgb(var(--rose-deep)) 78%, rgb(var(--rose-deep)) 100%)',
          WebkitMaskImage: 'url(/images/skizze.png)',
          maskImage: 'url(/images/skizze.png)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }}
      />
    </motion.div>
  );
}
