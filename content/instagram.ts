import { site } from './site';

/* ─────────────────────────────────────────────────────────────
   Instagram-Konfiguration & kuratierter Fallback

   Der Live-Feed läuft über die Instagram Graph API (siehe
   lib/instagram.ts). Solange kein Access-Token gesetzt ist –
   oder falls die API einmal nicht antwortet – rendert die
   Sektion diese kuratierte Auswahl. Die Seite ist damit NIE leer.

   Pflegehinweis (kuratierte Variante): einfach die Einträge unten
   austauschen. `permalink` ist der Link zum echten Post.
   ──────────────────────────────────────────────────────────── */

export const instagram = {
  handle: site.social.instagramHandle, // @dersalon_euskirchen
  profileUrl: site.social.instagram,
  /* Anzahl der Posts, die der Live-Feed maximal holt */
  limit: 6,
} as const;

export type CuratedPost = {
  id: string;
  /* lokales Bild im /public-Ordner */
  image: string;
  alt: string;
  /* Link zum Instagram-Post (oder Profil als Fallback) */
  permalink: string;
};

export const curatedPosts: CuratedPost[] = [
  { id: 'c1', image: '/laufleiste/work-1.jpg', alt: 'Balayage-Ergebnis aus dem Salon', permalink: site.social.instagram },
  { id: 'c2', image: '/laufleiste/work-2.jpg', alt: 'Blond-Transformation', permalink: site.social.instagram },
  { id: 'c3', image: '/laufleiste/work-3.jpg', alt: 'Farbveredelung & Glossing', permalink: site.social.instagram },
  { id: 'c4', image: '/laufleiste/work-5.jpg', alt: 'Airtouch-Strähnen', permalink: site.social.instagram },
  { id: 'c5', image: '/laufleiste/work-6.jpg', alt: 'Natürlicher Haarschnitt', permalink: site.social.instagram },
  { id: 'c6', image: '/laufleiste/work-8.jpg', alt: 'Styling-Inspiration aus dem Salon', permalink: site.social.instagram },
];
