'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* Hand-drawn length guide — a woman's head whose self-drawing line art
   illustrates hair length M (shoulder) and L (chest). Hovering a marker
   highlights that length in gold. */
const womanPaths = [
  'M 92 300 C 62 232 58 130 100 80 C 121 50 163 50 184 80 C 226 130 222 232 192 300',
  'M 107 112 C 107 82 177 82 177 112 C 177 146 159 174 142 174 C 125 174 107 146 107 112',
  'M 110 100 C 127 85 157 85 174 100',
  'M 142 62 L 142 87',
  'M 99 150 C 91 205 96 252 107 294',
  'M 185 150 C 193 205 188 252 177 294',
  'M 130 172 L 127 200',
  'M 154 172 L 157 200',
  'M 127 200 C 102 210 76 236 66 300',
  'M 157 200 C 182 210 208 236 218 300',
];

export default function WomanLengthSketch() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<null | 'm' | 'l'>(null);

  const draw = {
    hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.25 },
      },
    },
  };
  const fade = {
    hidden: { opacity: reduce ? 1 : 0 },
    show: { opacity: 1, transition: { duration: 0.4 } },
  };

  const lineCls = (k: 'm' | 'l') =>
    `transition-colors duration-300 ${active === k ? 'stroke-gold-deep' : 'stroke-ink'}`;
  const labelCls = (k: 'm' | 'l') =>
    `font-display transition-colors duration-300 ${active === k ? 'fill-gold-deep' : 'fill-ink'}`;

  return (
    <motion.svg
      viewBox="0 0 380 330"
      className="h-auto w-full max-w-[320px]"
      fill="none"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-15%' }}
      variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
      role="img"
      aria-label="Längen-Guide: M entspricht Schulterlänge, L entspricht Brustlänge"
    >
      {womanPaths.map((d, i) => (
        <motion.path key={i} d={d} variants={draw} className="stroke-ink" />
      ))}

      {/* M marker — shoulder */}
      <motion.path d="M 212 230 L 300 230" variants={draw} className={lineCls('m')} />
      <motion.circle cx={212} cy={230} r={3.2} stroke="none" variants={fade}
        className={`transition-colors duration-300 ${active === 'm' ? 'fill-gold-deep' : 'fill-ink'}`} />
      <motion.text x={314} y={238} stroke="none" variants={fade} className={`${labelCls('m')} text-[23px]`}>M</motion.text>
      <motion.text x={314} y={252} stroke="none" variants={fade} className="fill-stone text-[9px] tracking-[1.5px]">SCHULTER</motion.text>

      {/* L marker — chest */}
      <motion.path d="M 206 296 L 300 296" variants={draw} className={lineCls('l')} />
      <motion.circle cx={206} cy={296} r={3.2} stroke="none" variants={fade}
        className={`transition-colors duration-300 ${active === 'l' ? 'fill-gold-deep' : 'fill-ink'}`} />
      <motion.text x={314} y={304} stroke="none" variants={fade} className={`${labelCls('l')} text-[23px]`}>L</motion.text>
      <motion.text x={314} y={318} stroke="none" variants={fade} className="fill-stone text-[9px] tracking-[1.5px]">BRUST</motion.text>

      {/* hover hit areas */}
      <rect x={196} y={208} width={172} height={44} fill="transparent"
        onMouseEnter={() => setActive('m')} onMouseLeave={() => setActive(null)} />
      <rect x={196} y={274} width={172} height={48} fill="transparent"
        onMouseEnter={() => setActive('l')} onMouseLeave={() => setActive(null)} />
    </motion.svg>
  );
}
