// Einkommensteuertarif 2026 nach § 32a EStG (Grundtarif).
// Eckwerte: Grundfreibetrag 12.348 €, Progressionszonen bis 17.799 € / 69.878 €,
// Spitzensteuersatz 42 % bis 277.825 €, danach 45 %.
export function einkommensteuer(zvE: number): number {
  const x = Math.floor(Math.max(zvE, 0));

  if (x <= 12348) return 0;

  if (x <= 17799) {
    const y = (x - 12348) / 10000;
    return Math.floor((914.51 * y + 1400) * y);
  }

  if (x <= 69878) {
    const z = (x - 17799) / 10000;
    return Math.floor((173.1 * z + 2397) * z + 1034.87);
  }

  if (x <= 277825) {
    return Math.floor(0.42 * x - 11135.63);
  }

  return Math.floor(0.45 * x - 19470.38);
}

// Abgeltungsteuer inkl. Solidaritätszuschlag (25 % * 1,055)
export const ABGELTUNGSTEUER = 0.26375;

// Solidaritätszuschlag 2026: 5,5 % der ESt oberhalb der Freigrenze
// (20.350 € ESt bei Einzelveranlagung; Milderungszone vereinfachend nicht abgebildet)
export const SOLI_FREIGRENZE = 20350;
export const SOLI_SATZ = 0.055;

export function soli(einkommensteuerBetrag: number): number {
  return einkommensteuerBetrag > SOLI_FREIGRENZE
    ? einkommensteuerBetrag * SOLI_SATZ
    : 0;
}

// Ertragsanteil der privaten Rentenversicherung nach § 22 Nr. 1 S. 3 a) bb) EStG,
// abhängig vom Alter bei Rentenbeginn (Auszug 55–75 Jahre)
const ERTRAGSANTEIL: Record<number, number> = {
  55: 26, 56: 25, 57: 24, 58: 24, 59: 23,
  60: 22, 61: 22, 62: 21, 63: 20, 64: 19,
  65: 18, 66: 18, 67: 17, 68: 16, 69: 15,
  70: 15, 71: 14, 72: 13, 73: 13, 74: 12, 75: 11,
};

export function ertragsanteil(alterBeiRentenbeginn: number): number {
  const alter = Math.round(
    Math.min(Math.max(alterBeiRentenbeginn, 55), 75),
  );
  return ERTRAGSANTEIL[alter] ?? 17;
}

// Teilfreistellung für Aktienfonds (30 % der Erträge steuerfrei)
export const TEILFREISTELLUNG_AKTIENFONDS = 0.3;

// Sparer-Pauschbetrag pro Person und Jahr
export const SPARERPAUSCHBETRAG = 1000;
