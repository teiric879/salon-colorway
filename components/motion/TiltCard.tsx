'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  max?: number; // max tilt degrees
  glare?: boolean;
};

/* Pseudo-3D pointer tilt with spring physics + optional sheen. */
export default function TiltCard({ children, className, max = 8, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 18 });
  const gx = useTransform(px, [0, 1], ['0%', '100%']);
  const gy = useTransform(py, [0, 1], ['0%', '100%']);
  const glareBg = useTransform(
    [gx, gy],
    ([x, y]: string[]) =>
      `radial-gradient(420px circle at ${x} ${y}, rgba(255,244,224,0.55), transparent 45%)`
  );

  function onMove(e: React.PointerEvent) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      className={'relative ' + (className ?? '')}
    >
      {children}
      {glare && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
