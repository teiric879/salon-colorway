'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Fragment } from 'react';

type Props = {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'p' | 'span';
};

/* Word-by-word mask reveal for editorial headlines.
   Supports *emphasis* → wrapped in accent-italic. */
export default function RevealText({ text, className, delay = 0, as = 'h2' }: Props) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: delay } } }}
      aria-label={text.replace(/\*/g, '')}
    >
      {words.map((word, i) => {
        const emph = word.startsWith('*') && word.endsWith('*');
        const clean = word.replace(/\*/g, '');
        return (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden align-bottom" aria-hidden>
              <motion.span
                className={'inline-block ' + (emph ? 'accent-italic' : '')}
                variants={{
                  hidden: { y: reduce ? 0 : '110%', opacity: reduce ? 0 : 1 },
                  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {clean}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        );
      })}
    </Tag>
  );
}
