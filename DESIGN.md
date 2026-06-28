# Design-Handbuch — „Der Salon by Kristina"

> **Verbindlich.** Dieses Dokument beschreibt den Look, das Gefühl und die Mechanik der Website.
> Jede neue Sektion, Komponente oder Unterseite **muss** sich exakt so anfühlen wie der aktuelle Stand.
> Im Zweifel: lieber bestehende Tokens, Klassen und Motion-Bausteine wiederverwenden als Neues erfinden.

---

## 0. Der Vibe (North Star)

**Editorial Luxury, warm & ruhig.** Wie ein hochwertiges Beauty-/Fashion-Magazin, kombiniert mit
Apple-artiger Zurückhaltung. Die Seite soll teuer, vertrauenswürdig und handgemacht wirken — nie
nach Template oder „AI-generiert".

Leitsätze, an denen wir jede Entscheidung messen:

1. **Ruhe vor Effekt.** Viel Weißraum, wenige Elemente pro Blick, klare Hierarchie. Animationen
   begleiten Inhalt, sie dominieren ihn nicht (max. 1–2 bewegte Schlüsselelemente pro Sektion).
2. **Warm, nicht kalt.** Stein-/Creme-Töne + Espresso + Champagner-Gold. Kein reines Schwarz, kein
   reines Weiß, keine kühlen Grautöne, keine grellen Farben.
3. **Serif erzählt, Sans erklärt.** Große Playfair-Headlines mit *einem* kursiven Gold-Akzentwort.
4. **Bewegung mit Bedeutung.** Alles gleitet mit derselben weichen Kurve, schneller raus als rein.
   Nichts blinkt, nichts ruckelt, nichts erscheint hart.
5. **Echt schlägt Deko.** Echte Fotos, echte Preise, echte Texte. Keine Stockbild-Ästhetik,
   keine Fake-Inhalte, keine Emoji als Icons.

---

## 1. Farben

Alle Farben leben als **RGB-Channel-CSS-Variablen** in `app/globals.css` (`:root`) und werden in
`tailwind.config.ts` als `rgb(var(--x) / <alpha-value>)` eingebunden. **Niemals rohe Hex-Werte in
Komponenten** — immer die semantischen Tailwind-Klassen nutzen.

| Token | RGB | Tailwind | Rolle |
|---|---|---|---|
| `--canvas` | `250 246 240` | `bg-canvas` / `text-canvas` | Warmer Seitenhintergrund (Porzellan) |
| `--surface` | `255 253 250` | `bg-surface` | Karten / erhöhte Flächen |
| `--ink` | `26 22 20` | `text-ink` / `bg-ink` | Haupttext (Espresso), dunkle Buttons |
| `--ink-soft` | `92 80 70` | `text-ink-soft` | Fließtext / sekundärer Text |
| `--stone` | `142 128 113` | `text-stone` | Eyebrows, Captions, Meta |
| `--line` | `228 218 203` | `border-line` | Haarlinien, Rahmen, Trenner |
| `--gold` | `176 132 70` | `text-gold` / `bg-gold` | **Dekoratives** Gold (Sterne, Glow, Akzentpunkte) |
| `--gold-deep` | `122 84 28` | `text-gold-deep` | **Text-sicheres** Gold (AA auf hell) — Links, Akzentwörter |
| `--noir` | `22 19 17` | `bg-noir` | Dunkle Kontrast-Sektionen |
| `--noir-soft` | `34 29 26` | — | Erhöhte Flächen auf Dunkel |

**Gold-Regel (wichtig):**
- Gold auf hellem Grund als **Text** → immer `text-gold-deep` (Kontrast ≥ 4.5:1).
- `gold` (heller) nur für Deko (Sternchen-Icons, Glows, 1px-Linien, Punkte) oder Text auf `noir`.
- Akzent-Verlaufstext nur sparsam: `.text-gold-grad` (z. B. große Zahlen).

**Kontrast-Paare, die wir verwenden:** `text-ink` auf `canvas`/`surface`, `text-canvas` auf `noir`,
`text-ink-soft` für Fließtext, `text-stone` nur für kleine Labels.

---

## 2. Typografie

Drei self-hosted Fonts (`next/font`, DSGVO-konform), als CSS-Variablen in `app/layout.tsx`:

| Familie | Variable / Klasse | Gewichte | Einsatz |
|---|---|---|---|
| **Playfair Display** | `--font-display` / `font-display` | 400–700 | Headlines, Zahlen, Karten-Titel |
| **Cormorant** *(italic)* | `--font-accent` / `font-accent` | 500/600 italic | **Akzentwort** in Headlines, Logo-Wortmarke |
| **Inter** | `--font-sans` / `font-sans` | 300–600 | Body, UI, Buttons, Eyebrows |

**Zwei feste Helfer-Klassen (globals.css) — immer benutzen:**

- `.eyebrow` → kleines, gesperrtes Sans-Label (uppercase, `tracking-widest2` = 0.28em, `text-stone`).
- `.accent-italic` → Cormorant italic in `gold-deep`. Wird in Headlines über `*Sternchen*` erzeugt.
- `.display` → Playfair, medium, `leading-[0.98]`, leichtes negatives Tracking.
- `.lead` → Inter, `text-ink-soft`, `leading-relaxed` (Fließtext).

**Die *Sternchen*-Konvention (Kern unseres Headline-Stils):**
Headlines bestehen aus normalem Text + **genau einem** kursiven Gold-Akzentwort.
Im Text markiert man das Akzentwort mit `*…*`. Beispiele aus der Seite:
„Wo Farbe zur ***Handschrift*** wird." · „Handwerk, das man ***sieht.***" · „Die Hände hinter deinem ***Look.***"
→ Realisiert über `<RevealText text="… *Wort* …" />` (siehe §7).

**Type-Scale (Richtwerte, responsiv):**

| Element | Mobile | Desktop |
|---|---|---|
| Hero-H1 | `text-[3.1rem]` | `lg:text-[4.7rem]` |
| Sektion-H2 | `text-[2rem]` | `lg:text-[3.1rem]` |
| Karten-Titel | `text-xl`–`text-2xl` | — |
| Body / Lead | `text-[1rem]`–`1.08rem` | bis `1.08rem` |
| Eyebrow / Meta | `0.72rem`–`0.8rem` | — |

Body nie unter 16px. Zeilenhöhe Fließtext 1.5–1.75. `tabular-nums` für Preise/Zahlen.

---

## 3. Layout & Spacing

- **Container:** `.wrap` = `mx-auto w-full max-w-content` (1280px). Seiten-Padding über `.section`
  = `px-5 sm:px-8 lg:px-12`.
- **Sektions-Rhythmus:** vertikal **`py-24 lg:py-32`** (Standard). Kompaktere Bänder `py-20 lg:py-28`.
- **Spacing-System:** 4/8-px-Raster (Tailwind-Default). Keine krummen Abstände.
- **Grids:** mobile-first, eine Spalte → `sm:` zwei → `lg:` drei. Gaps `gap-4`…`gap-6` (Karten),
  `gap-12 lg:gap-20` (große Zwei-Spalter).
- **Radius-Skala:** Buttons `rounded-full` · Karten `rounded-[20px]` (`.card-surface`) ·
  Bilder/Frames `rounded-[18px]`–`rounded-[28px]` (große Hero/Feature-Frames 24–28px).
- **Breakpoints:** 375 / 640(sm) / 768(md) / 1024(lg) / 1280. Immer auf 375px **und** Querformat
  prüfen. **Kein horizontaler Overflow** (aktueller Stand: 0px — so bleibt es).
- **Fixe Navbar:** Höhe via `--nav-h` (80px). Inhalte, die darunter scrollen, brauchen Puffer.

---

## 4. Effekte & Oberflächen

- **`.card-surface`** = Standardkarte: `rounded-[20px]`, `border-line`, `bg-surface`,
  weicher Doppel-Schatten (`0 1px 2px ink/3` + `0 24px 48px -32px ink/18`). **Immer diese Klasse**
  statt eigener Schatten.
- **Schatten-Disziplin:** weich, weit, sehr transparent, immer auf `ink`/Schwarz mit hohem
  negativem Spread. Keine harten/dunklen Boxshadows.
- **Papier-Korn:** dezentes `feTurbulence`-Overlay auf `body::before` (opacity ~0.035). Nicht
  entfernen — gibt die „Magazin"-Haptik.
- **Ambient-Glows:** große, stark geblurrte `bg-gold/10`-Kreise (`blur-[110px]`–`[120px]`) als
  Tiefe hinter Hero/dunklen Sektionen. Sparsam, immer `pointer-events-none` + `aria-hidden`.
- **`.hairline`** für 1px-Trenner. Linien immer `border-line` (hell) bzw. `border-canvas/10` (dunkel).
- **Glass nur als Funktion:** `backdrop-blur` für schwebende Cards / Navbar / Modal-Scrim — nicht
  als reine Deko.

---

## 5. Buttons & Links

Festes System in `globals.css` — **niemals** ad-hoc-Buttons bauen. Jede Sektion hat **eine**
primäre CTA; alles andere ist visuell untergeordnet.

| Klasse | Einsatz | Verhalten |
|---|---|---|
| `.btn .btn-primary` | Haupt-CTA („Termin buchen") | Espresso-Fläche, Champagner-**Shine-Sweep** + 2px Lift |
| `.btn .btn-outline` | sekundär | transparent, Espresso-**Fill-Sweep** von links beim Hover |
| `.btn .btn-light` | CTA auf dunklem Grund | helle Fläche, Lift |
| `.link-gold` | Textlink/Inline-CTA | `gold-deep` + **Unterstrich-Draw** beim Hover |
| `.chip` | Tags / Mini-Labels | Pille, `border-line`, `bg-surface/70`, blur |

**Verboten:** hartes Schwarz-Aufblitzen, abrupte Farbwechsel ohne Transition, Layout-Shift beim
Hover. Buttons min. 48px hoch, Touch-Ziele ≥ 44px. Magnetische CTAs über `<MagneticButton>` für
besonders hochwertige Momente (Hero).

---

## 6. Motion-System (Herzstück)

> Wenn ein einziger Wert die ganze Seite zusammenhält, ist es diese Easing-Kurve.

**Signature-Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` → in Tailwind `ease-smooth`,
in Framer Motion als Array `[0.22, 1, 0.36, 1]`. **Standard für so gut wie alles.**
Zweitkurve für symmetrische Zustände: `ease-in-out-soft` = `cubic-bezier(0.65, 0, 0.35, 1)`.

**Dauern (verbindlich):**

| Zweck | Dauer |
|---|---|
| Micro-Interaktion (Hover, Press, Farbe) | 150–300 ms |
| Standard-Reveal (Scroll-Einblendung) | ~0.7 s |
| Headline-/Clip-/Hero-Reveal | 0.85–1.1 s |
| Modal / Sheet | ~0.35 s |
| Zustandswechsel (Akkordeon, Tab) | 0.3–0.45 s |
| Verboten | > 0.5 s für UI-Micro, lineare Kurven |

**Regeln:**
- **Raus schneller als rein.** Exit-Animationen kürzer als Enter.
- Nur **`transform` & `opacity`** animieren (nie width/height/top/left). Kein Layout-Shift/CLS.
- **Stagger:** Listen/Grids gestaffelt — Wörter 0.045 s, Items 0.06–0.08 s.
- **Scroll-Reveals nur einmal** (`viewport={{ once: true, margin: '-12%' }}`).
- **Parallax dezent** (±8–12 %), nie desorientierend.
- **`prefers-reduced-motion` ist Pflicht.** Jede Motion-Komponente prüft `useReducedMotion()` und
  schaltet Bewegung ab; Inhalt bleibt sofort lesbar. Lenis startet bei reduced-motion gar nicht.
- **Smooth-Scroll** global über Lenis (`<SmoothScroll>` im Layout). Anker-Links scrollen weich
  mit `-88px` Offset.

---

## 7. Wiederverwendbare Motion-/UI-Bausteine

Diese Komponenten **immer wiederverwenden**, statt Bewegung neu zu schreiben:

| Komponente | Datei | Zweck |
|---|---|---|
| `SmoothScroll` | `components/motion/SmoothScroll.tsx` | Lenis-Wrapper + Anchor-Scroll (im Layout) |
| `Reveal` | `components/motion/Reveal.tsx` | Standard-Einblendung (opacity + y 28px), `delay`-Prop |
| `RevealText` | `components/motion/RevealText.tsx` | **Wort-für-Wort-Reveal** für Headlines; `*Wort*` → Akzent |
| `Parallax` | `components/motion/Parallax.tsx` | Scroll-Parallax (`speed`-Prop) |
| `TiltCard` | `components/motion/TiltCard.tsx` | Pointer-Tilt (Pseudo-3D) + Glare-Sheen, Spring-Physik |
| `MagneticButton` | `components/motion/MagneticButton.tsx` | magnetisch dem Cursor folgende CTA |
| `RotatingBadge` | `components/RotatingBadge.tsx` | rotierendes Siegel (Signature-Element) |
| `Counter` | `components/Counter.tsx` | hochzählende Zahl beim In-View |
| `SectionHeading` | `components/SectionHeading.tsx` | Eyebrow + RevealText-Titel + Lead (Standard-Kopf) |
| `SmartImage` | `components/SmartImage.tsx` | `next/image` + Skeleton-Shimmer + Fade-in |

**`SectionHeading` ist der Standard-Kopf jeder Sektion:**
```tsx
<SectionHeading
  eyebrow="Leistungen"
  title="Handwerk, das man *sieht.*"   // genau ein *Akzentwort*
  intro="Optionaler Lead-Satz …"
  align="left"                          // oder "center"
/>
```

---

## 8. Bauplan einer neuen Sektion

Jede neue Sektion folgt diesem Muster, damit sie sich „nach der Seite anfühlt":

1. `<section id="…" className="section py-24 lg:py-32">` mit innerem `<div className="wrap">`.
2. Kopf über **`SectionHeading`** (Eyebrow + Headline mit *einem* Akzentwort + optionaler Lead).
3. Inhalt mobile-first im Grid, Karten als `.card-surface`, Icons aus **lucide-react** (kein Emoji).
4. Einblendungen über `Reveal`/`RevealText`, gestaffelt; bewegte Elemente sparsam.
5. **Eine** primäre CTA (`.btn-primary` oder `MagneticButton`), Rest untergeordnet.
6. **Rhythmus hell/dunkel:** dunkle `bg-noir`-Sektionen (z. B. „Erlebnis", Gutschein, Footer-CTA)
   gezielt als Höhepunkt/Kontrast einsetzen — nicht zwei dunkle direkt hintereinander.
7. Bilder immer über `SmartImage` (siehe §9).

**Dunkle Sektion – Rezept:** `bg-noir text-canvas`, optional Parallax-Bild mit
`opacity-40` + Verlaufs-Overlay (`from-noir/85 …`) + ein Gold-Glow. Text `text-canvas/75`,
Akzent `text-gold`.

---

## 9. Bilder

- **Immer `SmartImage`** (= `next/image`, `fill`) mit Skeleton + Fade. Wrapper ist `absolute inset-0`
  → der **Eltern-Container muss `relative` + eine feste Größe/`aspect-[…]`** haben.
- **Pflicht-Props:** sinnvolles `alt`, `sizes` (echte Breite, nie 100vw, wenn nicht nötig),
  `priority` nur fürs Hero-Bild.
- **Maße reservieren** (`aspect-[4/5]` etc.) → kein Layout-Shift (CLS < 0.1).
- **Quellbilder optimieren:** vor dem Einchecken durch `scripts/optimize-images.mjs` jagen
  (max. 1800px lange Kante, q80, mozjpeg). Ziel: einzelne Fotos << 0.3 MB.
- `next.config.mjs` cappt `deviceSizes` bei 1600 — keine 3840-Varianten anfordern.
- Echte Salon-Fotos bevorzugen; Bild-Overlays warm halten (Verläufe aus `noir`, nicht reinem Schwarz).

---

## 10. Icons

- **Ausschließlich lucide-react** (eine Familie, Linien-Stil, konsistente Strichstärke).
- Größen als Tokens denken: `h-4 w-4` (klein), `h-5 w-5` (Standard), größer nur bewusst.
- Icon-Buttons brauchen `aria-label`. Akzent-Icons in `gold-deep`/`gold`.
- **Niemals Emoji als Icon.**

---

## 11. Recht & Datenschutz (gehört zum „Premium"-Eindruck)

- Externe Einbindungen (StudioBookr-Buchung, Google Maps) **nur nach Klick/Consent** laden
  (Pattern: `BookingProvider`-Consent-Gate, Klick-to-Load-Karte in `Contact`).
- Fonts self-hosted, kein Google-CDN-Call.
- Impressum/Datenschutz als eigene, `noindex`-Routen mit `.legal`-Typo.

---

## 12. Barrierefreiheit & Performance (Mindeststandard)

- Kontrast ≥ 4.5:1 (Text), sichtbare Fokus-Ringe (`gold-deep`, 2px, offset 3px — schon global).
- Touch-Ziele ≥ 44px, 8px Abstand.
- Semantische Überschriften-Hierarchie (ein `h1`, dann `h2` je Sektion).
- `prefers-reduced-motion` respektiert, Dynamic-Type-tauglich (rem-basiert).
- Nur `transform`/`opacity` animieren; Listen ≥ 50 Items virtualisieren (falls je nötig).
- `npm run build` muss grün bleiben.

---

## 13. Anti-Patterns (sofort vermeiden)

- ❌ Reines `#000`/`#fff`, kühle Grautöne, grelle/gesättigte Farben.
- ❌ Rohe Hex-Werte in Komponenten statt Tokens.
- ❌ Zweite Schriftfamilie/Icon-Set einführen.
- ❌ Emoji als Icons.
- ❌ Harte/abrupte Hover-States, Schwarz-Blitz, Layout-Shift beim Hover.
- ❌ Lineare oder > 0.5 s lange UI-Animationen; width/height animieren.
- ❌ Mehr als 1–2 bewegte Elemente pro Sektion; Deko-Animation ohne Bedeutung.
- ❌ Mehrere primäre CTAs in einer Sektion.
- ❌ Fake-Inhalte als „echt" ausgeben (z. B. erfundene Reviews als verifiziert).
- ❌ Externe iframes/Maps ohne Consent laden.
- ❌ Eigene Schatten/Buttons/Karten statt `.card-surface` / `.btn*`.

---

## 14. Schnell-Checkliste vor jedem Commit

- [ ] Tokens & vorhandene Klassen genutzt (keine rohen Hex/Custom-Schatten)?
- [ ] Headline = Playfair + **ein** `*Akzentwort*` (Cormorant/gold-deep)?
- [ ] Kopf über `SectionHeading`, Sektions-Padding `py-24 lg:py-32`?
- [ ] Bewegung über vorhandene Motion-Bausteine, Easing `[0.22,1,0.36,1]`, raus < rein?
- [ ] `prefers-reduced-motion` ok, nur transform/opacity animiert?
- [ ] Bilder via `SmartImage`, optimiert, `alt` + `sizes`, kein CLS?
- [ ] Genau eine primäre CTA, Touch-Ziele ≥ 44px, Fokus sichtbar?
- [ ] 375px + Querformat geprüft, **kein** horizontaler Overflow?
- [ ] Kontrast ≥ 4.5:1, lucide-Icons, keine Emoji?
- [ ] `npm run build` grün?

---

*Dieses Handbuch ist die verbindliche Referenz für „Der Salon by Kristina". Wenn etwas hier nicht
abgedeckt ist, orientiere dich am nächstliegenden bestehenden Beispiel im Code — und ergänze danach
dieses Dokument.*
