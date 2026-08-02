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

// Teilfreistellung für Aktienfonds (30 % der Erträge steuerfrei)
export const TEILFREISTELLUNG_AKTIENFONDS = 0.3;

// Sparer-Pauschbetrag pro Person und Jahr
export const SPARERPAUSCHBETRAG = 1000;
