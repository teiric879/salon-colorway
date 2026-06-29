'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Instagram as InstagramIcon, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import type { InstaPost } from '@/lib/instagram';

/* Editorial Instagram-Grid — fügt sich in den Premium-Look ein
   (Gold-Akzente, weiche Schatten, Hover-Zoom). Kein Fremd-Widget. */
export default function InstagramGrid({
  posts,
  handle,
  profileUrl,
}: {
  posts: InstaPost[];
  handle: string;
  profileUrl: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
      {posts.map((post, i) => (
        <motion.a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram-Beitrag ansehen: ${post.alt}`}
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="group relative aspect-square overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_20px_45px_-30px_rgba(122,84,28,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <Image
            src={post.image}
            alt={post.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
            className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.07]"
            unoptimized={post.live}
          />

          {/* warmer Verlauf + Gold-Hover */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/45 via-transparent to-transparent transition-opacity duration-500 group-hover:from-noir/65" />

          {/* Hover-Akzent: Instagram-Glyph erscheint */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-canvas/90 text-gold-deep shadow-[0_8px_24px_-8px_rgba(122,84,28,0.7)] backdrop-blur-sm">
              <InstagramIcon className="h-5 w-5" strokeWidth={1.7} />
            </span>
          </div>
        </motion.a>
      ))}

      {/* CTA-Kachel: zum Profil */}
      <motion.a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram-Profil ${handle} öffnen`}
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, delay: posts.length * 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="group relative col-span-2 flex aspect-[2/1] flex-col items-center justify-center gap-2.5 rounded-[18px] border border-gold/30 bg-gradient-to-br from-surface to-canvas text-center shadow-[0_24px_55px_-30px_rgba(122,84,28,0.55)] transition-colors hover:border-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:col-span-1 sm:aspect-square"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-deep text-canvas shadow-[0_8px_18px_-8px_rgba(122,84,28,0.9)] transition-transform duration-500 group-hover:scale-105">
          <InstagramIcon className="h-[22px] w-[22px]" strokeWidth={1.7} />
        </span>
        <span className="flex items-center gap-1 font-display text-[1.05rem] text-ink">
          Folgen
          <ArrowUpRight className="h-4 w-4 text-gold-deep transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
        <span className="text-[0.78rem] tracking-wide text-ink-soft">{handle}</span>
      </motion.a>
    </div>
  );
}
