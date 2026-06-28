'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useBooking } from '@/components/BookingProvider';

export default function StickyBook() {
  const { open } = useBooking();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[800] p-3 lg:hidden"
          style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
        >
          <button
            onClick={open}
            className="btn btn-primary w-full shadow-[0_16px_40px_-12px_rgb(var(--ink)/0.6)]"
          >
            <Calendar className="h-4 w-4" />
            <span>Termin buchen</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
