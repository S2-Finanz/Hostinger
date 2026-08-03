// Gesetzliche Rechengrößen Sozialversicherung 2026.
export const GKV_ALLGEMEIN_PROZENT = 14.6;
export const PV_ALLGEMEIN_PROZENT = 3.6;
export const PV_KINDERLOSENZUSCHLAG_PROZENT = 0.6;
export const KINDERLOSENZUSCHLAG_AB_ALTER = 23;
export const BBG_KV_MONATLICH = 5812.5; // Beitragsbemessungsgrenze KV/PV 2026
export const JAEG_JAHR = 77400; // allgemeine Jahresarbeitsentgeltgrenze (Versicherungspflichtgrenze) 2026

// Zusatzbeitragssätze 2026 der größten gesetzlichen Krankenkassen (Stand: Januar 2026,
// Quelle: jeweilige Kassen / GKV-Spitzenverband). Da sich Zusatzbeiträge unterjährig
// ändern können, bleibt das Feld nach der Auswahl weiterhin manuell editierbar –
// diese Liste ist eine Ausgangs-Schätzung, keine Live-Abfrage.
export const KRANKENKASSEN: { name: string; zusatzbeitrag: number }[] = [
  { name: "AOK Baden-Württemberg", zusatzbeitrag: 2.99 },
  { name: "AOK Bayern", zusatzbeitrag: 2.69 },
  { name: "AOK Nordost", zusatzbeitrag: 3.5 },
  { name: "AOK PLUS", zusatzbeitrag: 3.1 },
  { name: "AOK Rheinland/Hamburg", zusatzbeitrag: 3.29 },
  { name: "Barmer", zusatzbeitrag: 3.29 },
  { name: "BIG direkt gesund", zusatzbeitrag: 3.69 },
  { name: "DAK-Gesundheit", zusatzbeitrag: 3.2 },
  { name: "Debeka BKK", zusatzbeitrag: 3.25 },
  { name: "hkk", zusatzbeitrag: 2.59 },
  { name: "IKK classic", zusatzbeitrag: 3.85 },
  { name: "KKH", zusatzbeitrag: 3.78 },
  { name: "Knappschaft", zusatzbeitrag: 4.3 },
  { name: "SBK", zusatzbeitrag: 3.8 },
  { name: "Techniker Krankenkasse (TK)", zusatzbeitrag: 2.69 },
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
