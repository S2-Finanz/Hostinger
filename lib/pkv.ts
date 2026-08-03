// PKV-Richtwerte für Angestellte 2026 (Stand: vom Mandanten bereitgestellte
// Marktübersicht). Der Beitrag zum privaten Vertrag (Eigenanteil vor
// Arbeitgeberzuschuss) setzt sich aus zwei getrennten Tabellen zusammen:
// Kranken- und Pflegeversicherung. Beide sind als Bandbreite
// günstig/typisch/hoch abgebildet und rein altersabhängig modelliert. Der
// tatsächliche Beitrag hängt von Gesundheitsprüfung, Risikozuschlägen und
// gewünschtem Leistungsumfang ab.
export const PKV_ALTER_MIN = 18;
// Begrenzt durch die Krankenversicherungs-Tabelle (die Pflegeversicherungs-
// Tabelle deckt zusätzlich die Jahre 51 bis 55 ab).
export const PKV_ALTER_MAX = 50;

type PkvAltersband = {
  alterVon: number;
  alterBis: number;
  von: number;
  bis: number;
  schnitt: number;
};

// Beitrag zur privaten Krankenversicherung (ohne Pflegeversicherung).
const PKV_KRANKENVERSICHERUNG_BAENDER: PkvAltersband[] = [
  { alterVon: 18, alterBis: 24, von: 216, bis: 299, schnitt: 258 },
  { alterVon: 25, alterBis: 25, von: 288, bis: 338, schnitt: 313 },
  { alterVon: 26, alterBis: 26, von: 300, bis: 351, schnitt: 326 },
  { alterVon: 27, alterBis: 27, von: 312, bis: 364, schnitt: 338 },
  { alterVon: 28, alterBis: 28, von: 324, bis: 377, schnitt: 350 },
  { alterVon: 29, alterBis: 29, von: 336, bis: 390, schnitt: 363 },
  { alterVon: 30, alterBis: 30, von: 348, bis: 416, schnitt: 382 },
  { alterVon: 31, alterBis: 31, von: 360, bis: 429, schnitt: 394 },
  { alterVon: 32, alterBis: 32, von: 372, bis: 442, schnitt: 407 },
  { alterVon: 33, alterBis: 33, von: 396, bis: 468, schnitt: 432 },
  { alterVon: 34, alterBis: 34, von: 408, bis: 481, schnitt: 444 },
  { alterVon: 35, alterBis: 35, von: 420, bis: 507, schnitt: 464 },
  { alterVon: 36, alterBis: 36, von: 444, bis: 533, schnitt: 488 },
  { alterVon: 37, alterBis: 37, von: 468, bis: 559, schnitt: 514 },
  { alterVon: 38, alterBis: 38, von: 492, bis: 585, schnitt: 538 },
  { alterVon: 39, alterBis: 39, von: 516, bis: 611, schnitt: 564 },
  { alterVon: 40, alterBis: 40, von: 540, bis: 637, schnitt: 588 },
  { alterVon: 41, alterBis: 41, von: 564, bis: 663, schnitt: 614 },
  { alterVon: 42, alterBis: 42, von: 588, bis: 689, schnitt: 638 },
  { alterVon: 43, alterBis: 43, von: 624, bis: 728, schnitt: 676 },
  { alterVon: 44, alterBis: 44, von: 660, bis: 767, schnitt: 714 },
  { alterVon: 45, alterBis: 45, von: 696, bis: 819, schnitt: 758 },
  { alterVon: 46, alterBis: 46, von: 744, bis: 871, schnitt: 808 },
  { alterVon: 47, alterBis: 47, von: 792, bis: 936, schnitt: 864 },
  { alterVon: 48, alterBis: 48, von: 840, bis: 1001, schnitt: 920 },
  { alterVon: 49, alterBis: 49, von: 900, bis: 1079, schnitt: 990 },
  { alterVon: 50, alterBis: 50, von: 960, bis: 1170, schnitt: 1065 },
];

type PkvPflegeJahr = {
  alter: number;
  min: number;
  max: number;
  schnitt: number;
};

// Beitrag zur privaten Pflegepflichtversicherung (§ 23 SGB XI), separat je
// Eintrittsalter erfasst.
const PKV_PFLEGEVERSICHERUNG_JAHRE: PkvPflegeJahr[] = [
  { alter: 18, min: 20, max: 35, schnitt: 28 },
  { alter: 19, min: 22, max: 37, schnitt: 30 },
  { alter: 20, min: 23, max: 39, schnitt: 31 },
  { alter: 21, min: 25, max: 41, schnitt: 33 },
  { alter: 22, min: 27, max: 43, schnitt: 35 },
  { alter: 23, min: 28, max: 45, schnitt: 36 },
  { alter: 24, min: 30, max: 48, schnitt: 39 },
  { alter: 25, min: 32, max: 50, schnitt: 41 },
  { alter: 26, min: 33, max: 52, schnitt: 42 },
  { alter: 27, min: 35, max: 54, schnitt: 44 },
  { alter: 28, min: 37, max: 56, schnitt: 46 },
  { alter: 29, min: 38, max: 58, schnitt: 48 },
  { alter: 30, min: 40, max: 60, schnitt: 50 },
  { alter: 31, min: 42, max: 63, schnitt: 52 },
  { alter: 32, min: 44, max: 66, schnitt: 55 },
  { alter: 33, min: 46, max: 69, schnitt: 58 },
  { alter: 34, min: 48, max: 72, schnitt: 60 },
  { alter: 35, min: 50, max: 75, schnitt: 62 },
  { alter: 36, min: 52, max: 78, schnitt: 65 },
  { alter: 37, min: 54, max: 81, schnitt: 68 },
  { alter: 38, min: 56, max: 84, schnitt: 70 },
  { alter: 39, min: 58, max: 87, schnitt: 72 },
  { alter: 40, min: 60, max: 90, schnitt: 75 },
  { alter: 41, min: 63, max: 94, schnitt: 78 },
  { alter: 42, min: 66, max: 98, schnitt: 82 },
  { alter: 43, min: 69, max: 102, schnitt: 86 },
  { alter: 44, min: 72, max: 106, schnitt: 89 },
  { alter: 45, min: 75, max: 110, schnitt: 92 },
  { alter: 46, min: 78, max: 114, schnitt: 96 },
  { alter: 47, min: 81, max: 118, schnitt: 100 },
  { alter: 48, min: 84, max: 122, schnitt: 103 },
  { alter: 49, min: 87, max: 126, schnitt: 106 },
  { alter: 50, min: 90, max: 130, schnitt: 110 },
  { alter: 51, min: 95, max: 137, schnitt: 116 },
  { alter: 52, min: 100, max: 144, schnitt: 122 },
  { alter: 53, min: 105, max: 151, schnitt: 128 },
  { alter: 54, min: 110, max: 158, schnitt: 134 },
  { alter: 55, min: 115, max: 165, schnitt: 140 },
];

export type PkvEigenanteil = {
  von: number;
  bis: number;
  schnitt: number;
  ausserhalbDatengrundlage: boolean;
};

function findKrankenversicherungBand(alter: number): PkvAltersband {
  return (
    PKV_KRANKENVERSICHERUNG_BAENDER.find(
      (b) => alter >= b.alterVon && alter <= b.alterBis,
    ) ??
    PKV_KRANKENVERSICHERUNG_BAENDER[PKV_KRANKENVERSICHERUNG_BAENDER.length - 1]
  );
}

function findPflegeversicherungJahr(alter: number): PkvPflegeJahr {
  return (
    PKV_PFLEGEVERSICHERUNG_JAHRE.find((p) => p.alter === alter) ??
    PKV_PFLEGEVERSICHERUNG_JAHRE[PKV_PFLEGEVERSICHERUNG_JAHRE.length - 1]
  );
}

export function pkvEigenanteil(alter: number): PkvEigenanteil {
  const geklammert = Math.min(Math.max(alter, PKV_ALTER_MIN), PKV_ALTER_MAX);
  const kv = findKrankenversicherungBand(geklammert);
  const pflege = findPflegeversicherungJahr(geklammert);

  return {
    von: kv.von + pflege.min,
    bis: kv.bis + pflege.max,
    schnitt: kv.schnitt + pflege.schnitt,
    ausserhalbDatengrundlage: alter < PKV_ALTER_MIN || alter > PKV_ALTER_MAX,
  };
}

// Pauschaler Gesamtbeitrag pro mitversichertem Kind in der PKV (eigener
// Kindertarif, da es in der PKV – anders als in der GKV – keine beitragsfreie
// Familienversicherung gibt). Kein Arbeitgeberzuschuss, da sich dieser
// gesetzlich nur auf den Vertrag der angestellten Person selbst bezieht.
export const PKV_KIND_BEITRAG = 200;

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
