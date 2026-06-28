'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Phone, Instagram, Facebook } from 'lucide-react';
import { nav, site } from '@/content/site';
import { useBooking } from '@/components/BookingProvider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { open } = useBooking();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menu]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[900] transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled
            ? 'bg-canvas/80 shadow-[0_1px_0_0_rgb(var(--line))] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="wrap flex h-[var(--nav-h)] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" aria-label="Der Salon by Kristina – Startseite" className="relative z-10 flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Der Salon by Kristina"
              width={138}
              height={59}
              className="h-12 w-auto object-contain lg:h-14"
            />
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="link-gold text-[0.9rem] font-medium text-ink/80 hover:text-ink"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex items-center gap-1">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:text-gold-deep"
              >
                <Instagram className="h-[1.15rem] w-[1.15rem]" />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:text-gold-deep"
              >
                <Facebook className="h-[1.15rem] w-[1.15rem]" />
              </a>
            </div>
            <span className="h-5 w-px bg-line" />
            <a href={site.phoneHref} className="flex items-center gap-2 text-[0.9rem] text-ink-soft hover:text-ink">
              <Phone className="h-4 w-4 text-gold-deep" />
              {site.phone}
            </a>
            <button onClick={open} className="btn btn-primary px-6 py-3 text-[0.85rem]">
              <span>Termin buchen</span>
            </button>
          </div>

          <button
            onClick={() => setMenu(true)}
            aria-label="Menü öffnen"
            className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/60 backdrop-blur lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-[950] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-noir/40" onClick={() => setMenu(false)} />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 flex h-full w-[84%] max-w-sm flex-col bg-canvas px-7 pb-8 pt-6"
            >
              <div className="flex items-center justify-between">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="Der Salon by Kristina" className="h-10 w-auto" />
                <button
                  onClick={() => setMenu(false)}
                  aria-label="Menü schließen"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-1">
                {nav.map((n, i) => (
                  <motion.a
                    key={n.href}
                    href={n.href}
                    onClick={() => setMenu(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="border-b border-line/70 py-4 font-display text-2xl text-ink"
                  >
                    {n.label}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-gold-deep hover:text-gold-deep"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-gold-deep hover:text-gold-deep"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href={site.phoneHref} className="ml-1 flex items-center gap-2 text-ink-soft">
                    <Phone className="h-4 w-4 text-gold-deep" /> {site.phone}
                  </a>
                </div>
                <button
                  onClick={() => {
                    setMenu(false);
                    open();
                  }}
                  className="btn btn-primary w-full"
                >
                  <span>Termin buchen</span>
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
