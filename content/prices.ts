export type PriceItem = {
  title: string;
  includes?: string[];
  m: number;
  l: number;
};

export type PriceGroup = {
  group: string;
  items: PriceItem[];
};

/* Verbatim from the salon's January 2026 price list (preisliste_dersalon_jan26). */
export const priceGroups: PriceGroup[] = [
  {
    group: 'Schnitt & Styling',
    items: [
      { title: 'Waschen, Schnitt & Styling', m: 70, l: 80 },
      { title: 'Waschen & Styling', m: 40, l: 50 },
    ],
  },
  {
    group: 'Blond & Highlights',
    items: [
      { title: 'Balayage-Paket', includes: ['Pflege', 'Olaplex', 'Gloss', 'Schnitt & Styling'], m: 320, l: 350 },
      { title: 'Airtouch Strähnen-Paket', includes: ['Pflege', 'Olaplex', 'Gloss', 'Schnitt & Styling'], m: 320, l: 350 },
      { title: 'Airtouch Full Head-Paket', includes: ['Pflege', 'Olaplex', 'Gloss', 'Schnitt & Styling'], m: 400, l: 430 },
      { title: 'Strähnen-Paket', includes: ['Pflege', 'Gloss', 'Schnitt & Styling'], m: 230, l: 260 },
      { title: 'Auffrischungs-Paket', includes: ['Contouring', 'Gloss', 'Schnitt & Styling'], m: 180, l: 200 },
    ],
  },
  {
    group: 'Coloration',
    items: [
      { title: 'Ansatzfarbe-Paket', includes: ['Pflege', 'Schnitt & Styling'], m: 130, l: 145 },
      { title: 'Farbe komplett-Paket', includes: ['Pflege', 'Schnitt & Styling'], m: 165, l: 190 },
      { title: 'Glossing', includes: ['Pflege', 'Schnitt & Styling'], m: 125, l: 145 },
    ],
  },
  {
    group: 'Pflege & Treatments',
    items: [
      { title: 'Olaplex Treatment', includes: ['Styling'], m: 100, l: 120 },
    ],
  },
];

export const priceNotes = [
  'Jedes Haar ist so individuell wie die Person, zu der es gehört. Deshalb richtet sich der finale Endpreis nach Haarlänge, Haardichte und dem tatsächlichen Arbeitsaufwand.',
  'Alle Pakete sind selbstverständlich auch ohne Schnitt buchbar. Dabei reduziert sich der Paketpreis um 30 €.',
];

export const lengthLegend = {
  m: { label: 'M · Mittel', desc: 'bis etwa Schulterlänge' },
  l: { label: 'L · Lang', desc: 'über Schulterlänge' },
};
