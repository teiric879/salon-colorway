export type GalleryItem = {
  src: string;
  label: string;
  tag: 'Color' | 'Blond' | 'Salon';
};

/* Real photos from the salon. */
export const gallery: GalleryItem[] = [
  { src: '/images/results/result-5.jpg', label: 'Sonnengeküsste Balayage', tag: 'Blond' },
  { src: '/images/salon/img_2662.jpg', label: 'Unser Salon in Euskirchen', tag: 'Salon' },
  { src: '/images/results/result-1.jpg', label: 'Warmes, dimensionales Blond', tag: 'Color' },
  { src: '/images/results/result-3.jpg', label: 'Airtouch Highlights', tag: 'Blond' },
  { src: '/images/salon/img_2702.jpg', label: 'Waschplätze mit Massage-Sessel', tag: 'Salon' },
  { src: '/images/results/result-6.jpg', label: 'Natürlicher Farbverlauf', tag: 'Color' },
  { src: '/images/results/result-4.jpg', label: 'Glanz & Geschmeidigkeit', tag: 'Color' },
  { src: '/images/salon/img_2687.jpg', label: 'Wohlfühl-Ambiente', tag: 'Salon' },
  { src: '/images/results/result-2.jpg', label: 'Frisches Face-Framing', tag: 'Blond' },
];

/* Auto-Slider in der Salon-Sektion (links).
   ⚠ TEMPORÄR: 7 vorhandene Salonfotos als Platzhalter – werden durch die
   7 vom Kunden gelieferten Fotos ersetzt (Color-Regal, Boden-Lettering,
   Empfang, Waschplätze + 3 weitere). */
export const salonSlides = [
  { src: '/images/salon/img_2662.jpg', alt: 'Der Salon by Kristina – Maria Nila Wand' },
  { src: '/images/salon/img_2706.jpg', alt: 'Der Salon by Kristina – Innenansicht' },
  { src: '/images/salon/img_2773.jpg', alt: 'Der Salon by Kristina – Innenansicht' },
  { src: '/images/salon/img_2687.jpg', alt: 'Der Salon by Kristina – Innenansicht' },
  { src: '/images/salon/img_2678.jpg', alt: 'Der Salon by Kristina – Innenansicht' },
  { src: '/images/salon/img_2664.jpg', alt: 'Der Salon by Kristina – Innenansicht' },
  { src: '/images/salon/img_2621.jpg', alt: 'Der Salon by Kristina – Innenansicht' },
];

/* Before/After uses the salon's real "VORHER | NACHHER" combined frames. */
export const beforeAfter = [
  '/images/results/result-1.jpg',
  '/images/results/result-2.jpg',
  '/images/results/result-5.jpg',
];
