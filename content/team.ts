export type Member = {
  name: string;
  role: string;
  img: string;
  focus?: string;
};

/* Names + portraits are real (from the salon). Roles are placeholders —
   please confirm exact titles/specialties with Kristina. */
export const team: Member[] = [
  { name: 'Kristina', role: 'Inhaberin & Friseurmeisterin', img: '/images/team/kristina.jpg', focus: 'Color & Balayage' },
  { name: 'Louisa', role: 'Salonleitung & Friseurmeisterin', img: '/images/team/louisa.jpg', focus: 'Blond-Spezialistin' },
  { name: 'Katharina', role: 'Stylistin & Gesellin', img: '/images/team/katharina.jpg', focus: 'Schnitt & Color' },
  { name: 'Nadia', role: 'Stylistin & Gesellin', img: '/images/team/nadia.jpg', focus: 'Airtouch & Highlights' },
  { name: 'Lilly', role: 'Stylistin & Friseurmeisterin', img: '/images/team/lilly.jpg', focus: 'Styling & Pflege' },
];
