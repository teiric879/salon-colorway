import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LegalHeader() {
  return (
    <header className="border-b border-line">
      <div className="wrap flex h-[var(--nav-h)] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Zur Startseite" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Der Salon by Kristina" className="h-11 w-auto object-contain" />
        </Link>
        <Link href="/" className="link-gold text-[0.9rem]">
          <ArrowLeft className="h-4 w-4" /> Zurück zur Startseite
        </Link>
      </div>
    </header>
  );
}
