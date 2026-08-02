import type { BesoldungstabelleLand } from "@/lib/besoldung/types";

// Erfahrungsstufen-Rhythmus: Jahre bis zum jeweils nächsten Stufenaufstieg
// (Stufe 1→2, 2→3, ..., 7→8). Nach § 27 BBesG üblicher Rhythmus, von den
// meisten Ländern übernommen; einzelne Länder weichen leicht ab.
export const STUFEN_RHYTHMUS_JAHRE = [1, 2, 2, 3, 3, 4, 4];

// TODO: Besoldungstabellen mit verifizierten Beträgen ergänzen. Amtliche
// Quellen (dbb.de, Gesetze-im-Internet, Landesbesoldungsgesetze) blockieren
// automatisierten Zugriff – Beträge müssen aus offiziellen PDFs/Tabellen
// übernommen werden, um keine falschen Zahlen zu zeigen.
export const BESOLDUNGSTABELLEN: BesoldungstabelleLand[] = [
  { code: "bund", name: "Bund", verfuegbar: false, gruppen: [] },
  { code: "bw", name: "Baden-Württemberg", verfuegbar: false, gruppen: [] },
  { code: "by", name: "Bayern", verfuegbar: false, gruppen: [] },
  { code: "be", name: "Berlin", verfuegbar: false, gruppen: [] },
  { code: "bb", name: "Brandenburg", verfuegbar: false, gruppen: [] },
  { code: "hb", name: "Bremen", verfuegbar: false, gruppen: [] },
  { code: "hh", name: "Hamburg", verfuegbar: false, gruppen: [] },
  { code: "he", name: "Hessen", verfuegbar: false, gruppen: [] },
  { code: "mv", name: "Mecklenburg-Vorpommern", verfuegbar: false, gruppen: [] },
  { code: "ni", name: "Niedersachsen", verfuegbar: false, gruppen: [] },
  { code: "nrw", name: "Nordrhein-Westfalen", verfuegbar: false, gruppen: [] },
  { code: "rp", name: "Rheinland-Pfalz", verfuegbar: false, gruppen: [] },
  { code: "sl", name: "Saarland", verfuegbar: false, gruppen: [] },
  { code: "sn", name: "Sachsen", verfuegbar: false, gruppen: [] },
  { code: "st", name: "Sachsen-Anhalt", verfuegbar: false, gruppen: [] },
  { code: "sh", name: "Schleswig-Holstein", verfuegbar: false, gruppen: [] },
  { code: "th", name: "Thüringen", verfuegbar: false, gruppen: [] },
];

export function findLand(code: string): BesoldungstabelleLand | undefined {
  return BESOLDUNGSTABELLEN.find((l) => l.code === code);
}

export function gehaltFuerStufe(
  land: BesoldungstabelleLand,
  gruppe: string,
  stufe: number,
): number | null {
  const g = land.gruppen.find((x) => x.gruppe === gruppe);
  if (!g) return null;
  const s = g.stufen.find((x) => x.stufe === stufe);
  return s ? s.betrag : null;
}
