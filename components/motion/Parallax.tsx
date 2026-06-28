'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  speed?: number; // negative = moves up faster
  className?: string;
};

export default function Parallax({ children, speed = -60, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, willChange: 'transform' }}>{children}</motion.div>
    </div>
  );
}
