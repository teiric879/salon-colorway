import type { Metadata } from 'next';
import LegalHeader from '@/components/LegalHeader';
import Footer from '@/components/sections/Footer';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Impressum',
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <LegalHeader />
      <main className="section py-16 lg:py-24">
        <div className="wrap max-w-3xl">
          <span className="eyebrow text-gold-deep">Rechtliches</span>
          <h1 className="display mt-3 text-[2.4rem] sm:text-[3rem]">Impressum</h1>

          <div className="legal mt-10 space-y-8">
            <section>
              <h2>Angaben gemäß § 5 DDG</h2>
              <p>
                {site.legalName}
                <br />
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
              </p>
            </section>

            <section>
              <h2>Vertreten durch</h2>
              <p>Kristina Breuer (Geschäftsführerin)</p>
            </section>

            <section>
              <h2>Kontakt</h2>
              <p>
                Telefon: {site.phone}
                <br />
                E-Mail: {site.email}
              </p>
            </section>

            <section>
              <h2>Registereintrag</h2>
              <p>
                Eintragung im Handelsregister
                <br />
                Registergericht: Amtsgericht Bonn
                <br />
                Registernummer: HRB 23151
              </p>
            </section>

            <section>
              <h2>Umsatzsteuer / Steuernummer</h2>
              <p>Steuernummer: 209/5703/4684</p>
            </section>

            <section>
              <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
              <p>
                Berufsbezeichnung: Friseurmeisterin (Meisterin im Friseurhandwerk)
                <br />
                Verliehen in: Deutschland
                <br />
                Zuständige Kammer: Handwerkskammer zu Köln
              </p>
            </section>

            <section>
              <h2>Berufshaftpflichtversicherung</h2>
              <p>
                AXA Versicherung AG
                <br />
                Geltungsbereich der Versicherung: Deutschland
              </p>
            </section>

            <section>
              <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen. Die Europäische Kommission stellt eine
                Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr/
                </a>
                .
              </p>
            </section>

            <p className="text-sm text-stone">
              Hinweis: Diese Angaben wurden von der bestehenden Website übernommen. Bitte vor
              Veröffentlichung rechtlich final prüfen lassen.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
