// TODO: finalen Cal.com-Buchungslink eintragen (z. B. https://cal.com/s2-finanz/orientierungsgespraech)
export const CAL_LINK = "https://cal.com/s2-finanz/orientierungsgespraech";

// TODO: finale Produktivdomain eintragen, sobald bekannt (für sitemap.xml, robots.txt, OG-/Canonical-URLs)
export const SITE_URL = "https://www.s2-finanz.de";

// Solange die GbR-Gründung noch nicht final abgeschlossen ist, soll die Seite
// zwar über den direkten Link erreichbar, aber nicht über Google auffindbar
// sein. Auf true setzen, sobald die Seite wieder indexiert werden soll –
// robots.txt und die Meta-Robots-Tags reagieren automatisch darauf.
export const SITE_INDEXABLE = false;

export const NAV_LINKS = [
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Rechner", href: "/rechner/" },
  { label: "Über uns", href: "/ueber-uns/" },
  { label: "Wissen", href: "/#wissen" },
  { label: "Kontakt", href: "/#kontakt" },
];
