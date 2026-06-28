'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
};

export default function MagneticButton({
  children,
  className,
  strength = 0.32,
  onClick,
  as = 'button',
  href,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  function onMove(e: React.PointerEvent) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const inner = <span className="contents">{children}</span>;

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y, display: 'inline-flex' }}
    >
      {as === 'a' ? (
        <a href={href} className={className} onClick={onClick}>
          {inner}
        </a>
      ) : (
        <button type="button" className={className} onClick={onClick}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
