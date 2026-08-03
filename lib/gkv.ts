// Gesetzliche Rechengrößen Sozialversicherung 2026.
export const GKV_ALLGEMEIN_PROZENT = 14.6;
export const PV_ALLGEMEIN_PROZENT = 3.6;
export const PV_KINDERLOSENZUSCHLAG_PROZENT = 0.6;
export const KINDERLOSENZUSCHLAG_AB_ALTER = 23;
export const BBG_KV_MONATLICH = 5812.5; // Beitragsbemessungsgrenze KV/PV 2026
export const JAEG_JAHR = 77400; // allgemeine Jahresarbeitsentgeltgrenze (Versicherungspflichtgrenze) 2026

// Zusatzbeitragssätze 2026 aller gesetzlichen Krankenkassen (Stand: Januar 2026,
// Quelle: vom Mandanten bereitgestellte Übersicht auf Basis der Kassen-/
// GKV-Spitzenverband-Angaben). Da sich Zusatzbeiträge unterjährig ändern können,
// bleibt das Feld nach der Auswahl weiterhin manuell editierbar.
export const KRANKENKASSEN: { name: string; zusatzbeitrag: number }[] = [
  { name: "AOK Baden-Württemberg", zusatzbeitrag: 2.99 },
  { name: "AOK Bayern", zusatzbeitrag: 2.69 },
  { name: "AOK Bremen/Bremerhaven", zusatzbeitrag: 3 },
  { name: "AOK Hessen", zusatzbeitrag: 2.98 },
  { name: "AOK Niedersachsen", zusatzbeitrag: 2.7 },
  { name: "AOK Nordost", zusatzbeitrag: 3.5 },
  { name: "AOK NordWest", zusatzbeitrag: 2.9 },
  { name: "AOK PLUS", zusatzbeitrag: 3.1 },
  { name: "AOK Rheinland-Pfalz/Saarland", zusatzbeitrag: 2.47 },
  { name: "AOK Rheinland/Hamburg", zusatzbeitrag: 3.29 },
  { name: "AOK Sachsen-Anhalt", zusatzbeitrag: 2.8 },
  { name: "Audi BKK", zusatzbeitrag: 2.6 },
  { name: "Barmer", zusatzbeitrag: 3.29 },
  { name: "Bertelsmann BKK", zusatzbeitrag: 2.8 },
  { name: "BIG direkt gesund", zusatzbeitrag: 3.69 },
  { name: "BKK Akzo Nobel Bayern", zusatzbeitrag: 2.75 },
  { name: "BKK BPW Bergische Achsen", zusatzbeitrag: 2.75 },
  { name: "BKK Deutsche Bank", zusatzbeitrag: 2.85 },
  { name: "BKK Diakonie", zusatzbeitrag: 2.9 },
  { name: "BKK evm", zusatzbeitrag: 2.9 },
  { name: "BKK EWE", zusatzbeitrag: 2.8 },
  { name: "BKK exklusiv", zusatzbeitrag: 2.9 },
  { name: "BKK Faber-Castell & Partner", zusatzbeitrag: 2.7 },
  { name: "BKK firmus", zusatzbeitrag: 2.18 },
  { name: "BKK Freudenberg", zusatzbeitrag: 2.85 },
  { name: "BKK Gildemeister Seidensticker", zusatzbeitrag: 2.95 },
  { name: "BKK Groz-Beckert", zusatzbeitrag: 2.7 },
  { name: "BKK Herford Minden Ravensberg", zusatzbeitrag: 2.85 },
  { name: "BKK Karl Mayer", zusatzbeitrag: 2.8 },
  { name: "BKK Linde", zusatzbeitrag: 2.9 },
  { name: "BKK MAHLE", zusatzbeitrag: 2.8 },
  { name: "BKK Melitta Plus", zusatzbeitrag: 2.75 },
  { name: "BKK MTU", zusatzbeitrag: 2.85 },
  { name: "BKK Pfalz", zusatzbeitrag: 3.1 },
  { name: "BKK ProVita", zusatzbeitrag: 3.2 },
  { name: "BKK Public", zusatzbeitrag: 2.9 },
  { name: "BKK PwC", zusatzbeitrag: 2.85 },
  { name: "BKK Regional 91", zusatzbeitrag: 2.9 },
  { name: "BKK Regional 92", zusatzbeitrag: 2.9 },
  { name: "BKK Rieker Ricosta Weisser", zusatzbeitrag: 2.75 },
  { name: "BKK Salzgitter", zusatzbeitrag: 2.9 },
  { name: "BKK SBH", zusatzbeitrag: 2.85 },
  { name: "BKK Scheufelen", zusatzbeitrag: 2.9 },
  { name: "BKK Stadt Augsburg", zusatzbeitrag: 2.9 },
  { name: "BKK Technoform", zusatzbeitrag: 2.85 },
  { name: "BKK Textilgruppe Hof", zusatzbeitrag: 2.8 },
  { name: "BKK V-A-V", zusatzbeitrag: 2.85 },
  { name: "BKK VDN", zusatzbeitrag: 2.95 },
  { name: "BKK VerbundPlus", zusatzbeitrag: 2.85 },
  { name: "BKK Voralb Heller Index Leuze", zusatzbeitrag: 2.7 },
  { name: "BKK Werra-Meissner", zusatzbeitrag: 2.8 },
  { name: "BKK Wirtschaft & Finanzen", zusatzbeitrag: 2.9 },
  { name: "BKK Würth", zusatzbeitrag: 2.75 },
  { name: "BKK ZF & Partner", zusatzbeitrag: 2.85 },
  { name: "BKK24", zusatzbeitrag: 4.39 },
  { name: "BMW BKK", zusatzbeitrag: 2.65 },
  { name: "Bosch BKK", zusatzbeitrag: 3.18 },
  { name: "Continentale BKK", zusatzbeitrag: 2.95 },
  { name: "DAK-Gesundheit", zusatzbeitrag: 3.2 },
  { name: "debeka BKK", zusatzbeitrag: 2.85 },
  { name: "energie BKK", zusatzbeitrag: 2.9 },
  { name: "Ernst & Young BKK", zusatzbeitrag: 2.75 },
  { name: "Heimat Krankenkasse", zusatzbeitrag: 2.95 },
  { name: "HEK - Hanseatische Krankenkasse", zusatzbeitrag: 2.89 },
  { name: "hkk Erste Gesundheit", zusatzbeitrag: 2.59 },
  { name: "IKK - Die Innovationskasse", zusatzbeitrag: 2.95 },
  { name: "IKK Brandenburg und Berlin", zusatzbeitrag: 3.15 },
  { name: "IKK classic", zusatzbeitrag: 3.85 },
  { name: "IKK gesund plus", zusatzbeitrag: 2.95 },
  { name: "IKK Südwest", zusatzbeitrag: 3.05 },
  { name: "KKH Kaufmännische Krankenkasse", zusatzbeitrag: 3.4 },
  { name: "KNAPPSCHAFT", zusatzbeitrag: 4.3 },
  { name: "Koenig & Bauer BKK", zusatzbeitrag: 2.85 },
  { name: "Krones BKK", zusatzbeitrag: 2.7 },
  { name: "Mercedes-Benz BKK", zusatzbeitrag: 2.85 },
  { name: "mhplus BKK", zusatzbeitrag: 3 },
  { name: "mkk - meine krankenkasse", zusatzbeitrag: 3.15 },
  { name: "Mobil Krankenkasse", zusatzbeitrag: 2.95 },
  { name: "Novitas BKK", zusatzbeitrag: 3.1 },
  { name: "pronova BKK", zusatzbeitrag: 3.05 },
  { name: "R+V BKK", zusatzbeitrag: 2.85 },
  { name: "Salus BKK", zusatzbeitrag: 2.9 },
  { name: "SBK Siemens-Betriebskrankenkasse", zusatzbeitrag: 2.8 },
  { name: "securvita BKK", zusatzbeitrag: 3.1 },
  { name: "SKD BKK", zusatzbeitrag: 2.9 },
  { name: "SVLFG", zusatzbeitrag: 2.8 },
  { name: "Südzucker BKK", zusatzbeitrag: 2.85 },
  { name: "TK (Techniker Krankenkasse)", zusatzbeitrag: 2.69 },
  { name: "TUI BKK", zusatzbeitrag: 2.95 },
  { name: "VIACTIV Krankenkasse", zusatzbeitrag: 3.2 },
  { name: "vivida bkk", zusatzbeitrag: 3 },
  { name: "WMF BKK", zusatzbeitrag: 2.8 },
];
export const ANDERE_KASSE = "Andere Krankenkasse";

export function formatProzent(value: number): string {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
}

export type GkvBeitrag = {
  beitragspflichtig: number;
  anGkv: number;
  agGkv: number;
  anPv: number;
  agPv: number;
  anGesamt: number;
  agGesamt: number;
  gesamt: number;
  anGkvSatz: number;
  anPvSatz: number;
  jahresgehalt: number;
  ueberJaeg: boolean;
  amBbgGedeckelt: boolean;
  kinderlosenzuschlagPflichtig: boolean;
};

export function berechneGkvBeitrag(params: {
  brutto: number;
  alter: number;
  zusatzbeitrag: number;
  hatKinder: boolean;
}): GkvBeitrag {
  const { brutto, alter, zusatzbeitrag, hatKinder } = params;

  const beitragspflichtig = Math.min(brutto, BBG_KV_MONATLICH);
  const anGkvSatz = (GKV_ALLGEMEIN_PROZENT + zusatzbeitrag) / 2;
  const agGkvSatz = (GKV_ALLGEMEIN_PROZENT + zusatzbeitrag) / 2;

  const kinderlosenzuschlagPflichtig =
    !hatKinder && alter >= KINDERLOSENZUSCHLAG_AB_ALTER;
  const anPvSatz =
    PV_ALLGEMEIN_PROZENT / 2 +
    (kinderlosenzuschlagPflichtig ? PV_KINDERLOSENZUSCHLAG_PROZENT : 0);
  const agPvSatz = PV_ALLGEMEIN_PROZENT / 2;

  const anGkv = beitragspflichtig * (anGkvSatz / 100);
  const agGkv = beitragspflichtig * (agGkvSatz / 100);
  const anPv = beitragspflichtig * (anPvSatz / 100);
  const agPv = beitragspflichtig * (agPvSatz / 100);

  const anGesamt = anGkv + anPv;
  const agGesamt = agGkv + agPv;
  const gesamt = anGesamt + agGesamt;

  const jahresgehalt = brutto * 12;
  const ueberJaeg = jahresgehalt > JAEG_JAHR;
  const amBbgGedeckelt = brutto > BBG_KV_MONATLICH;

  return {
    beitragspflichtig,
    anGkv,
    agGkv,
    anPv,
    agPv,
    anGesamt,
    agGesamt,
    gesamt,
    anGkvSatz,
    anPvSatz,
    jahresgehalt,
    ueberJaeg,
    amBbgGedeckelt,
    kinderlosenzuschlagPflichtig,
  };
}
