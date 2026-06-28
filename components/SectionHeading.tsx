'use client';

import RevealText from './motion/RevealText';
import Reveal from './motion/Reveal';

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeading({ eyebrow, title, intro, align = 'left', className }: Props) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className ?? ''}`}>
      {eyebrow && (
        <Reveal>
          <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
            <span className="h-[2px] w-9 rounded-full bg-gold" />
            <span className="eyebrow text-gold">{eyebrow}</span>
          </div>
        </Reveal>
      )}
      <RevealText
        as="h2"
        text={title}
        delay={0.05}
        className="display mt-4 text-[2rem] leading-[1.04] sm:text-[2.6rem] lg:text-[3.1rem]"
      />
      {intro && (
        <Reveal delay={0.15}>
          <p className={`lead mt-5 text-[1.05rem] ${center ? 'mx-auto' : ''} max-w-prose2`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
