'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type Props = Omit<ImageProps, 'onLoad'> & { rounded?: string };

/* next/image wrapper with a warm skeleton + soft fade-in (no CLS). */
export default function SmartImage({ className, rounded = '', ...props }: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <span className={`absolute inset-0 block overflow-hidden ${rounded}`}>
      {!loaded && <span className={`skeleton absolute inset-0 ${rounded}`} aria-hidden />}
      <Image
        {...props}
        className={`${className ?? ''} transition-opacity duration-700 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
}
