// PKV-Richtwerte für Angestellte im Standardtarif 2026 (Stand: vom Mandanten
// bereitgestellte Marktübersicht). Bildet den Eigenanteil (Beitrag zum privaten
// Vertrag vor Arbeitgeberzuschuss) als Bandbreite günstig/typisch/hoch ab und
// ist alters-, nicht gesundheits- oder tarifabhängig modelliert. Der tatsächliche
// Beitrag hängt von Gesundheitsprüfung, Risikozuschlägen und Leistungsumfang ab.
export const PKV_ALTER_MIN = 18;
export const PKV_ALTER_MAX = 50;

type PkvAltersband = {
  alterVon: number;
  alterBis: number;
  von: number;
  bis: number;
  schnitt: number;
  bewertung: string;
};

const PKV_ALTERSBAENDER: PkvAltersband[] = [
  { alterVon: 18, alterBis: 24, von: 180, bis: 230, schnitt: 205, bewertung: "Finanziell extrem lukrativ (Ausbildung/Berufsstart)" },
  { alterVon: 25, alterBis: 25, von: 240, bis: 260, schnitt: 250, bewertung: "Ideales Einstiegsalter nach Studium" },
  { alterVon: 26, alterBis: 26, von: 250, bis: 270, schnitt: 260, bewertung: "Sehr lukrativ" },
  { alterVon: 27, alterBis: 27, von: 260, bis: 280, schnitt: 270, bewertung: "Sehr lukrativ" },
  { alterVon: 28, alterBis: 28, von: 270, bis: 290, schnitt: 280, bewertung: "Sehr lukrativ" },
  { alterVon: 29, alterBis: 29, von: 280, bis: 300, schnitt: 290, bewertung: "Sehr lukrativ" },
  { alterVon: 30, alterBis: 30, von: 290, bis: 320, schnitt: 305, bewertung: "Enorme Ersparnis, bester Zeitpunkt" },
  { alterVon: 31, alterBis: 31, von: 300, bis: 330, schnitt: 315, bewertung: "Sehr guter Wechselzeitpunkt" },
  { alterVon: 32, alterBis: 32, von: 310, bis: 340, schnitt: 325, bewertung: "Sehr guter Wechselzeitpunkt" },
  { alterVon: 33, alterBis: 33, von: 330, bis: 360, schnitt: 345, bewertung: "Sehr guter Wechselzeitpunkt" },
  { alterVon: 34, alterBis: 34, von: 340, bis: 370, schnitt: 355, bewertung: "Sehr guter Wechselzeitpunkt" },
  { alterVon: 35, alterBis: 35, von: 350, bis: 390, schnitt: 370, bewertung: "Letztes Alter für absolut optimalen Einstieg" },
  { alterVon: 36, alterBis: 36, von: 370, bis: 410, schnitt: 390, bewertung: "Sinnvoll, Ersparnis schmilzt leicht" },
  { alterVon: 37, alterBis: 37, von: 390, bis: 430, schnitt: 410, bewertung: "Immer noch sinnvoll" },
  { alterVon: 38, alterBis: 38, von: 410, bis: 450, schnitt: 430, bewertung: "Immer noch sinnvoll" },
  { alterVon: 39, alterBis: 39, von: 430, bis: 470, schnitt: 450, bewertung: "Fenster für massiven Kostenvorteil schließt sich" },
  { alterVon: 40, alterBis: 40, von: 450, bis: 490, schnitt: 470, bewertung: "Fokus auf Leistung, kaum noch finanzielle Ersparnis" },
  { alterVon: 41, alterBis: 41, von: 470, bis: 510, schnitt: 490, bewertung: "Crossover-Punkt, Beiträge annähernd gleich" },
  { alterVon: 42, alterBis: 42, von: 490, bis: 530, schnitt: 510, bewertung: "Oft teurer als GKV" },
  { alterVon: 43, alterBis: 43, von: 520, bis: 560, schnitt: 540, bewertung: "Deutlich teurer als GKV" },
  { alterVon: 44, alterBis: 44, von: 550, bis: 590, schnitt: 570, bewertung: "Nur noch für absolute Leistungsliebhaber" },
  { alterVon: 45, alterBis: 45, von: 580, bis: 630, schnitt: 605, bewertung: "Kritisch, zu wenig Zeit für Altersrückstellungen" },
  { alterVon: 46, alterBis: 46, von: 620, bis: 670, schnitt: 645, bewertung: "Sehr teuer, wenig sinnvoll" },
  { alterVon: 47, alterBis: 47, von: 660, bis: 720, schnitt: 690, bewertung: "Sehr teuer, wenig sinnvoll" },
  { alterVon: 48, alterBis: 48, von: 700, bis: 770, schnitt: 735, bewertung: "Finanziell unvernünftig für die meisten" },
  { alterVon: 49, alterBis: 49, von: 750, bis: 830, schnitt: 790, bewertung: "Finanziell unvernünftig für die meisten" },
  { alterVon: 50, alterBis: 50, von: 800, bis: 900, schnitt: 850, bewertung: "Spätester Wechsel, Gefahr fürs Rentenalter" },
];

export type PkvEigenanteil = {
  von: number;
  bis: number;
  schnitt: number;
  bewertung: string;
  ausserhalbDatengrundlage: boolean;
};

// Die Rohdaten oben bilden ausschließlich den Beitrag zur privaten
// Krankenversicherung ab, nicht die zusätzlich gesetzlich vorgeschriebene
// private Pflegepflichtversicherung (§ 23 SGB XI). Da hierfür keine eigene
// Alterstabelle vorliegt, wird ein pauschaler Aufschlag angesetzt, der sich an
// marktüblichen Pflege-Beitragsanteilen orientiert.
export const PKV_PFLEGEVERSICHERUNG_AUFSCHLAG = 0.2;

// Zusätzliche Marktanpassung: Ein Abgleich mit realen Tarifbeispielen zeigte,
// dass die Rohdaten auch nach dem Pflegeversicherungs-Aufschlag noch spürbar
// unter marktüblichen Beiträgen lagen. Dieser Aufschlag gleicht das aus.
export const PKV_MARKTANPASSUNG_AUFSCHLAG = 0.2;

// Pauschaler Gesamtbeitrag pro mitversichertem Kind in der PKV (eigener
// Kindertarif, da es in der PKV – anders als in der GKV – keine beitragsfreie
// Familienversicherung gibt). Kein Arbeitgeberzuschuss, da sich dieser
// gesetzlich nur auf den Vertrag der angestellten Person selbst bezieht.
export const PKV_KIND_BEITRAG = 200;

export function pkvEigenanteil(alter: number): PkvEigenanteil {
  const geklammert = Math.min(Math.max(alter, PKV_ALTER_MIN), PKV_ALTER_MAX);
  const band =
    PKV_ALTERSBAENDER.find(
      (b) => geklammert >= b.alterVon && geklammert <= b.alterBis,
    ) ?? PKV_ALTERSBAENDER[PKV_ALTERSBAENDER.length - 1];

  const faktor =
    (1 + PKV_PFLEGEVERSICHERUNG_AUFSCHLAG) *
    (1 + PKV_MARKTANPASSUNG_AUFSCHLAG);

  return {
    von: Math.round(band.von * faktor),
    bis: Math.round(band.bis * faktor),
    schnitt: Math.round(band.schnitt * faktor),
    bewertung: band.bewertung,
    ausserhalbDatengrundlage: alter < PKV_ALTER_MIN || alter > PKV_ALTER_MAX,
  };
}

// Gesetzlicher Arbeitgeberzuschuss zur PKV (§ 257 SGB V): die Hälfte des
// PKV-Beitrags, gedeckelt auf den Betrag, den der Arbeitgeber maximal in die
// GKV einzahlen würde.
export const PKV_ARBEITGEBERZUSCHUSS_ANTEIL = 0.5;

export function berechnePkvArbeitgeberzuschuss(
  pkvBeitrag: number,
  gkvArbeitgeberanteilGesamt: number,
): number {
  return Math.min(
    pkvBeitrag * PKV_ARBEITGEBERZUSCHUSS_ANTEIL,
    gkvArbeitgeberanteilGesamt,
  );
}
