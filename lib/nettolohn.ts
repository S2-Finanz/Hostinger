import { einkommensteuer, soli } from "@/lib/steuer";
import { berechneGkvBeitrag } from "@/lib/gkv";

// Gesetzliche Rechengrößen Sozialversicherung 2026 (Renten-/Arbeitslosenversicherung).
// Quelle: Sozialversicherungsrechengrößen-Verordnung 2026 (BGBl. 11/2025).
export const RV_SATZ_PROZENT = 18.6; // paritätisch, je 9,3 % AN/AG
export const AV_SATZ_PROZENT = 2.6; // paritätisch, je 1,3 % AN/AG
export const BBG_RV_AV_MONATLICH = 8450; // bundeseinheitlich ab 2026

// Pauschbeträge 2026 (§ 9a, § 10c, § 24b EStG).
export const ARBEITNEHMER_PAUSCHBETRAG = 1230; // Werbungskosten-Pauschbetrag
export const SONDERAUSGABEN_PAUSCHBETRAG = 36; // Einzelveranlagung
export const ENTLASTUNGSBETRAG_ALLEINERZIEHEND = 4260; // 1. Kind
export const ENTLASTUNGSBETRAG_JE_WEITERES_KIND = 240;

// Steuerklasse V/VI benötigt eine eigene, vom Grundtarif/Splittingverfahren
// abweichende Tarifformel (§ 39b Abs. 2 Satz 7 EStG), die im amtlichen
// Programmablaufplan jährlich neu veröffentlicht wird. Ohne eine verifizierte
// Quelle dieser Formel bilden wir sie hier bewusst nicht nach, um keine
// falschen Beträge auszuweisen.
export type Steuerklasse = "1" | "2" | "3" | "4";

export type NettolohnInput = {
  bruttoMonatlich: number;
  steuerklasse: Steuerklasse;
  anzahlKinder: number;
  alter: number;
  kirchensteuerSatz: number; // 0, 8 oder 9
  gkvZusatzbeitrag: number;
};

export type NettolohnErgebnis = {
  bruttoMonatlich: number;
  bruttoJahr: number;
  rvAn: number;
  avAn: number;
  kvAn: number;
  pvAn: number;
  svAnGesamt: number;
  zvE: number;
  entlastungsbetrag: number;
  estJahr: number;
  estMonat: number;
  soliJahr: number;
  soliMonat: number;
  kirchensteuerJahr: number;
  kirchensteuerMonat: number;
  abzuegeGesamt: number;
  nettoMonatlich: number;
  nettoJahr: number;
  abgabenquote: number; // Anteil aller Abzüge am Brutto, in %
};

export function berechneNettolohn(input: NettolohnInput): NettolohnErgebnis {
  const {
    bruttoMonatlich,
    steuerklasse,
    anzahlKinder,
    alter,
    kirchensteuerSatz,
    gkvZusatzbeitrag,
  } = input;

  const bruttoJahr = bruttoMonatlich * 12;
  const hatKinder = anzahlKinder > 0;

  // Rentenversicherung und Arbeitslosenversicherung teilen sich eine
  // bundeseinheitliche Beitragsbemessungsgrenze.
  const rvAvBeitragspflichtig = Math.min(bruttoMonatlich, BBG_RV_AV_MONATLICH);
  const rvAn = rvAvBeitragspflichtig * (RV_SATZ_PROZENT / 2 / 100);
  const avAn = rvAvBeitragspflichtig * (AV_SATZ_PROZENT / 2 / 100);

  // Kranken- und Pflegeversicherung: dieselbe Berechnung wie im
  // GKV-PKV-Vergleichsrechner, inkl. eigener Beitragsbemessungsgrenze und
  // Kinderlosenzuschlag zur Pflegeversicherung.
  const gkv = berechneGkvBeitrag({
    brutto: bruttoMonatlich,
    alter,
    zusatzbeitrag: gkvZusatzbeitrag,
    hatKinder,
  });
  const kvAn = gkv.anGkv;
  const pvAn = gkv.anPv;

  const svAnGesamt = rvAn + avAn + kvAn + pvAn;

  // Vereinfachte Vorsorgepauschale: Die eigenen Sozialversicherungsbeiträge
  // mindern die Lohnsteuer-Bemessungsgrundlage in voller Höhe. Die tatsächliche
  // Mindestvorsorgepauschale nach § 39b Abs. 2 EStG weicht hiervon in
  // Detailfällen geringfügig ab.
  const vorsorgepauschaleJahr = svAnGesamt * 12;

  const entlastungsbetrag =
    steuerklasse === "2"
      ? ENTLASTUNGSBETRAG_ALLEINERZIEHEND +
        Math.max(anzahlKinder - 1, 0) * ENTLASTUNGSBETRAG_JE_WEITERES_KIND
      : 0;

  const zvE = Math.max(
    bruttoJahr -
      ARBEITNEHMER_PAUSCHBETRAG -
      SONDERAUSGABEN_PAUSCHBETRAG -
      vorsorgepauschaleJahr -
      entlastungsbetrag,
    0,
  );

  // Steuerklasse III: Splittingverfahren auf das eigene Einkommen angewendet
  // (so, als würde man sich die Grundtabelle mit einem Partner ohne eigenes
  // Einkommen teilen) – Steuerklassen I, II und IV nutzen den Grundtarif.
  const estJahr =
    steuerklasse === "3"
      ? 2 * einkommensteuer(zvE / 2)
      : einkommensteuer(zvE);

  const soliJahr = soli(estJahr);
  const kirchensteuerJahr = estJahr * (kirchensteuerSatz / 100);

  const estMonat = estJahr / 12;
  const soliMonat = soliJahr / 12;
  const kirchensteuerMonat = kirchensteuerJahr / 12;

  const abzuegeGesamt =
    svAnGesamt + estMonat + soliMonat + kirchensteuerMonat;
  const nettoMonatlich = bruttoMonatlich - abzuegeGesamt;

  return {
    bruttoMonatlich,
    bruttoJahr,
    rvAn,
    avAn,
    kvAn,
    pvAn,
    svAnGesamt,
    zvE,
    entlastungsbetrag,
    estJahr,
    estMonat,
    soliJahr,
    soliMonat,
    kirchensteuerJahr,
    kirchensteuerMonat,
    abzuegeGesamt,
    nettoMonatlich,
    nettoJahr: nettoMonatlich * 12,
    abgabenquote:
      bruttoMonatlich > 0 ? (abzuegeGesamt / bruttoMonatlich) * 100 : 0,
  };
}
