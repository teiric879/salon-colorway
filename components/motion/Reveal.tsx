'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

export default function Reveal({ children, delay = 0, y = 28, className, once = true }: Props) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
    >
      {children}
    </motion.div>
  );
}
