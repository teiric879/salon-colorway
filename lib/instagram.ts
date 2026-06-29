import { instagram, curatedPosts, type CuratedPost } from '@/content/instagram';

/* ─────────────────────────────────────────────────────────────
   Instagram-Datenzugriff (serverseitig)

   Sicherheit:   Der Access-Token wird AUSSCHLIESSLICH serverseitig
                 gelesen (process.env, kein NEXT_PUBLIC_-Prefix) und
                 gelangt niemals ins Client-Bundle.
   Caching:      fetch() mit { next: { revalidate } } → Next.js
                 cached die Antwort (Data Cache / ISR). Kein
                 API-Call pro Besucher, kein Rate-Limit-Risiko.
   Robustheit:   Bei fehlendem Token oder API-Fehler wird die
                 kuratierte Auswahl zurückgegeben – die Sektion
                 ist nie kaputt.

   Erforderliche ENV-Variablen (siehe .env.local.example):
     INSTAGRAM_TOKEN     – langlebiger Graph-API Access-Token
     INSTAGRAM_USER_ID   – die Instagram-Business-Account-ID
   ──────────────────────────────────────────────────────────── */

export type InstaPost = {
  id: string;
  image: string;
  alt: string;
  permalink: string;
  /* true = stammt aus dem Live-Feed, false = kuratierter Fallback */
  live: boolean;
};

/* Cache-Dauer in Sekunden (1 Stunde). */
const REVALIDATE = 3600;

/* Graph-API-Rohformat (nur die Felder, die wir nutzen). */
type GraphMedia = {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
};

function curatedToPosts(items: CuratedPost[]): InstaPost[] {
  return items.slice(0, instagram.limit).map((p) => ({
    id: p.id,
    image: p.image,
    alt: p.alt,
    permalink: p.permalink,
    live: false,
  }));
}

/* Kürzt eine Caption für das alt-Attribut sinnvoll ein. */
function captionToAlt(caption?: string): string {
  if (!caption) return 'Instagram-Beitrag von ' + instagram.handle;
  const firstLine = caption.split('\n')[0]!.trim();
  return firstLine.length > 120 ? firstLine.slice(0, 117) + '…' : firstLine;
}

export async function getInstagramPosts(): Promise<InstaPost[]> {
  const token = process.env.INSTAGRAM_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  // Kein Token konfiguriert → kuratierter Fallback (kein Fehler, by design).
  if (!token || !userId) {
    return curatedToPosts(curatedPosts);
  }

  try {
    const fields = 'id,media_type,media_url,thumbnail_url,permalink,caption';
    const url =
      `https://graph.instagram.com/${userId}/media` +
      `?fields=${fields}&limit=${instagram.limit}&access_token=${token}`;

    const res = await fetch(url, { next: { revalidate: REVALIDATE } });

    if (!res.ok) throw new Error(`Instagram API ${res.status}`);

    const json = (await res.json()) as { data?: GraphMedia[] };
    const media = json.data ?? [];

    const posts: InstaPost[] = media
      // Videos liefern thumbnail_url, Bilder media_url – beides abdecken.
      .filter((m) => !!(m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url))
      .map((m): InstaPost => ({
        id: m.id,
        image: (m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url) as string,
        alt: captionToAlt(m.caption),
        permalink: m.permalink,
        live: true,
      }))
      .slice(0, instagram.limit);

    // API antwortete, lieferte aber nichts Brauchbares → Fallback.
    return posts.length > 0 ? posts : curatedToPosts(curatedPosts);
  } catch (err) {
    // Niemals die Seite crashen lassen – sauber auf Fallback gehen.
    console.error('[instagram] Live-Feed nicht verfügbar, nutze Fallback:', err);
    return curatedToPosts(curatedPosts);
  }
}
