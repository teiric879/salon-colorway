import type { Metadata } from 'next';
import LegalHeader from '@/components/LegalHeader';
import Footer from '@/components/sections/Footer';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <LegalHeader />
      <main className="section py-16 lg:py-24">
        <div className="wrap max-w-3xl">
          <span className="eyebrow text-gold-deep">Rechtliches</span>
          <h1 className="display mt-3 text-[2.4rem] sm:text-[3rem]">Datenschutzerklärung</h1>

          <div className="legal mt-10 space-y-8">
            <section>
              <h2>1. Verantwortlicher</h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                <br />
                Vorfreude Rheinbach GmbH
                <br />
                Münstereifeler Str. 21, 53359 Rheinbach
                <br />
                Vertreten durch: Kristina Breuer
                <br />
                E-Mail: {site.email}
              </p>
            </section>

            <section>
              <h2>2. Allgemeines zur Datenverarbeitung</h2>
              <p>
                Wir verarbeiten personenbezogene Daten (z. B. Kontakt-, Termin- und Nutzungsdaten) nur,
                soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Leistungen
                erforderlich ist. Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. a (Einwilligung),
                lit. b (Vertrag/vorvertragliche Maßnahmen), lit. c (rechtliche Verpflichtung) und lit. f
                (berechtigtes Interesse) DSGVO.
              </p>
            </section>

            <section>
              <h2>3. Hosting</h2>
              <p>
                Diese Website wird bei externen Dienstleistern gehostet (u. a. 1&amp;1 IONOS SE,
                Montabaur, Deutschland sowie Automattic Inc. / WordPress.com). Beim Aufruf werden
                technisch notwendige Server-Logdaten (z. B. IP-Adresse, Datum/Uhrzeit, abgerufene Seite)
                verarbeitet, um den Betrieb und die Sicherheit der Website zu gewährleisten.
              </p>
            </section>

            <section>
              <h2>4. Online-Terminbuchung (StudioBookr)</h2>
              <p>
                Für die Online-Terminbuchung nutzen wir den Dienst StudioBookr. Wenn du die Buchung
                startest, werden die von dir eingegebenen Daten an den Anbieter übermittelt und dort zur
                Terminverwaltung verarbeitet. Die Einbindung erfolgt erst nach deiner ausdrücklichen
                Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
              </p>
            </section>

            <section>
              <h2>5. Google Maps</h2>
              <p>
                Zur Anzeige unseres Standorts setzen wir Google Maps (Google Ireland Limited) ein. Die
                Karte wird erst nach deinem aktiven Klick geladen. Dabei können Daten (u. a. IP-Adresse)
                an Google übertragen werden. Rechtsgrundlage ist deine Einwilligung
                (Art. 6 Abs. 1 lit. a DSGVO).
              </p>
            </section>

            <section>
              <h2>6. Social Media</h2>
              <p>
                Auf unserer Website verlinken wir auf unsere Profile bei Instagram und Facebook (Meta
                Platforms Ireland Limited). Eine Datenübertragung an Meta erfolgt erst, wenn du den
                jeweiligen Link aktiv anklickst und die Plattform besuchst.
              </p>
            </section>

            <section>
              <h2>7. Cookies &amp; Reichweitenmessung</h2>
              <p>
                Wir verwenden technisch notwendige Cookies sowie – nach Einwilligung – Cookies zur
                Reichweitenmessung. Zum Einsatz können Dienste wie Google Analytics und WordPress/Jetpack
                Stats kommen. Die Datenübertragung erfolgt nur mit deiner Zustimmung; IP-Adressen werden
                dabei nach Möglichkeit gekürzt (IP-Masking). Du kannst deine Einwilligung jederzeit mit
                Wirkung für die Zukunft widerrufen.
              </p>
            </section>

            <section>
              <h2>8. Deine Rechte</h2>
              <p>
                Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
                Datenübertragbarkeit sowie Widerspruch. Erteilte Einwilligungen kannst du jederzeit
                widerrufen. Zudem steht dir ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu.
              </p>
            </section>

            <section>
              <h2>9. Speicherdauer</h2>
              <p>
                Wir speichern personenbezogene Daten nur so lange, wie es für die jeweiligen Zwecke
                erforderlich ist oder gesetzliche Aufbewahrungsfristen (i. d. R. 3–10 Jahre nach
                Handels- und Steuerrecht) dies vorschreiben.
              </p>
            </section>

            <p className="text-sm text-stone">
              Hinweis: Diese Datenschutzerklärung wurde auf Basis der bestehenden Website erstellt und
              sollte vor Veröffentlichung rechtlich final geprüft werden (z. B. durch einen
              Datenschutz-Generator oder eine Fachanwältin/einen Fachanwalt).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
