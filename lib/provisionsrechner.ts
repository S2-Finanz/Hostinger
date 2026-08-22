import type { ProvisionsEintrag } from "@/lib/provisionen";

export type ApTyp =
  | { art: "mb_pflege"; kv: number; pflege: number }
  | { art: "mb"; faktor: number }
  | { art: "promille"; wert: number }
  | { art: "unbekannt" };

// Erkennt die Form des AP-Werts: "8.5 MB (Pflege 1 MB)", "11 MB" oder "52 ‰".
// Alles andere (leer, "-", Fußnoten wie "100 %*³") gilt als nicht automatisch
// berechenbar.
export function parseAp(ap: string): ApTyp {
  const wert = ap.trim();

  const mbPflege = wert.match(/^([\d.,]+)\s*MB\s*\(Pflege\s*([\d.,]+)\s*MB\)$/i);
  if (mbPflege) {
    return {
      art: "mb_pflege",
      kv: parseFloat(mbPflege[1].replace(",", ".")),
      pflege: parseFloat(mbPflege[2].replace(",", ".")),
    };
  }

  const mb = wert.match(/^([\d.,]+)\s*MB$/i);
  if (mb) {
    return { art: "mb", faktor: parseFloat(mb[1].replace(",", ".")) };
  }

  const promille = wert.match(/^([\d.,]+)\s*‰$/);
  if (promille) {
    return { art: "promille", wert: parseFloat(promille[1].replace(",", ".")) };
  }

  return { art: "unbekannt" };
}

// Liest "... umfasst maximal 40 Jahre ..." aus dem Hinweistext.
export function parseBewertungszeitraum(hinweis: string): number | null {
  const m = hinweis.match(/maximal\s+(\d+)\s*Jahre/i);
  return m ? parseInt(m[1], 10) : null;
}

// Liest "Bemessungsgrundlage: Nettobeitrag" bzw. "... Tarifbeitrag" aus.
export function parseBemessungsgrundlage(hinweis: string): string | null {
  const m = hinweis.match(/Bemessungsgrundlage:\s*(Nettobeitrag|Tarifbeitrag)/i);
  return m ? m[1] : null;
}

export const STANDARD_BEWERTUNGSZEITRAUM = 40;

export type BerechnungErgebnis =
  | {
      erfolg: true;
      betrag: number;
      details: string[];
    }
  | {
      erfolg: false;
      grund: string;
    };

export function berechneKrankenAp(
  eintrag: ProvisionsEintrag,
  beitragKv: number,
  beitragPflege: number,
): BerechnungErgebnis {
  const typ = parseAp(eintrag.ap);

  if (typ.art === "mb_pflege") {
    const anteilKv = typ.kv * beitragKv;
    const anteilPflege = typ.pflege * beitragPflege;
    return {
      erfolg: true,
      betrag: anteilKv + anteilPflege,
      details: [
        `Krankenversicherung: ${typ.kv} Monatsbeiträge × ${formatEUR(beitragKv)} = ${formatEUR(anteilKv)}`,
        `Pflegeversicherung: ${typ.pflege} Monatsbeiträge × ${formatEUR(beitragPflege)} = ${formatEUR(anteilPflege)}`,
      ],
    };
  }

  if (typ.art === "mb") {
    const betrag = typ.faktor * beitragKv;
    return {
      erfolg: true,
      betrag,
      details: [`${typ.faktor} Monatsbeiträge × ${formatEUR(beitragKv)} = ${formatEUR(betrag)}`],
    };
  }

  return {
    erfolg: false,
    grund:
      "Für diese Gesellschaft ist kein fester AP-Wert hinterlegt, der sich automatisch berechnen lässt (siehe Hinweistext).",
  };
}

export function berechneLaufzeitAp(
  eintrag: ProvisionsEintrag,
  monatsbeitrag: number,
  laufzeitJahre: number,
): BerechnungErgebnis {
  const typ = parseAp(eintrag.ap);

  if (typ.art !== "promille") {
    return {
      erfolg: false,
      grund:
        "Für diese Gesellschaft ist kein fester AP-Wert hinterlegt, der sich automatisch berechnen lässt (siehe Hinweistext).",
    };
  }

  const cap = parseBewertungszeitraum(eintrag.hinweis) ?? STANDARD_BEWERTUNGSZEITRAUM;
  const capGreift = laufzeitJahre > cap;
  const bewertungsjahre = Math.min(laufzeitJahre, cap);
  const jahresbeitrag = monatsbeitrag * 12;
  const bewertungssumme = jahresbeitrag * bewertungsjahre;
  const betrag = (typ.wert / 1000) * bewertungssumme;
  const grundlage = parseBemessungsgrundlage(eintrag.hinweis);

  return {
    erfolg: true,
    betrag,
    details: [
      `Jahresbeitrag: ${formatEUR(monatsbeitrag)} × 12 = ${formatEUR(jahresbeitrag)}`,
      capGreift
        ? `Bewertungssumme: ${formatEUR(jahresbeitrag)} × ${bewertungsjahre} Jahre (Laufzeit ${laufzeitJahre} Jahre, gedeckelt auf Bewertungszeitraum von ${cap} Jahren) = ${formatEUR(bewertungssumme)}`
        : `Bewertungssumme: ${formatEUR(jahresbeitrag)} × ${bewertungsjahre} Jahre = ${formatEUR(bewertungssumme)}`,
      `AP: ${typ.wert} ‰ × ${formatEUR(bewertungssumme)} = ${formatEUR(betrag)}`,
      grundlage
        ? `Bemessungsgrundlage laut Gesellschaft: ${grundlage} (hier vereinfacht gleich dem eingegebenen Monatsbeitrag gesetzt)`
        : `Bewertungszeitraum nicht im Hinweistext gefunden, Standardannahme ${STANDARD_BEWERTUNGSZEITRAUM} Jahre verwendet`,
    ],
  };
}

function formatEUR(value: number): string {
  return value.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}
