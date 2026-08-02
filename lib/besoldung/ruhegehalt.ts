import type { ElternzeitPhase, TeilzeitPhase } from "@/lib/besoldung/types";

export const STEIGERUNGSSATZ_PRO_JAHR = 1.79375; // % je ruhegehaltfähigem Dienstjahr
export const MAX_RUHEGEHALTSSATZ = 71.75; // % nach 40 Volldienstjahren
export const ELTERNZEIT_MAX_JAHRE_PRO_KIND = 3; // voll angerechnet (§ 6 BeamtVG i.d.F. 2019)

export function ruhegehaltssatz(ruhegehaltfaehigeDienstjahre: number): number {
  return Math.min(
    Math.max(ruhegehaltfaehigeDienstjahre, 0) * STEIGERUNGSSATZ_PRO_JAHR,
    MAX_RUHEGEHALTSSATZ,
  );
}

export function ruhegehaltfaehigeDienstzeit({
  gesamtDienstjahre,
  teilzeitPhasen,
  elternzeitPhasen,
}: {
  gesamtDienstjahre: number;
  teilzeitPhasen: TeilzeitPhase[];
  elternzeitPhasen: ElternzeitPhase[];
}): {
  vollzeitJahre: number;
  teilzeitAngerechnetJahre: number;
  teilzeitKuerzungJahre: number;
  elternzeitAngerechnetJahre: number;
  gesamt: number;
} {
  const teilzeitDauerSumme = teilzeitPhasen.reduce(
    (sum, p) => sum + Math.max(p.dauerJahre, 0),
    0,
  );
  const teilzeitAngerechnet = teilzeitPhasen.reduce(
    (sum, p) =>
      sum + Math.max(p.dauerJahre, 0) * (Math.min(p.quoteProzent, 100) / 100),
    0,
  );
  const teilzeitKuerzung = teilzeitDauerSumme - teilzeitAngerechnet;

  const elternzeitDauerSumme = elternzeitPhasen.reduce(
    (sum, p) => sum + Math.max(p.dauerJahre, 0),
    0,
  );
  const elternzeitAngerechnet = elternzeitPhasen.reduce(
    (sum, p) => sum + Math.min(Math.max(p.dauerJahre, 0), ELTERNZEIT_MAX_JAHRE_PRO_KIND),
    0,
  );

  const vollzeitJahre = Math.max(
    gesamtDienstjahre - teilzeitDauerSumme - elternzeitDauerSumme,
    0,
  );

  const gesamt = vollzeitJahre + teilzeitAngerechnet + elternzeitAngerechnet;

  return {
    vollzeitJahre,
    teilzeitAngerechnetJahre: teilzeitAngerechnet,
    teilzeitKuerzungJahre: teilzeitKuerzung,
    elternzeitAngerechnetJahre: elternzeitAngerechnet,
    gesamt,
  };
}
