// Lustige Vergleichswerte zur Einordnung von Wahrscheinlichkeiten. Grobe,
// kursierende Schätzungen zur Veranschaulichung (u. a. NOAA-Blitzstatistik,
// offizielle Lottoquoten, verbreitete Angaben zu Hai-/Krokodilangriffen) –
// keine wissenschaftlich geprüfte Quelle, keine Tatsachenbehauptung.

export type Kuriositaet = {
  id: string;
  text: string;
  wahrscheinlichkeit: number; // als Anteil, z. B. 0.5 = 50 %
  anzeige: string; // z. B. "1 : 2"
};

export const KURIOSITAETEN: Kuriositaet[] = [
  {
    id: "muenzwurf",
    text: "bei einem Münzwurf „Kopf“ zu werfen",
    wahrscheinlichkeit: 1 / 2,
    anzeige: "1 : 2",
  },
  {
    id: "wuerfel",
    text: "beim Würfeln eine Sechs zu würfeln",
    wahrscheinlichkeit: 1 / 6,
    anzeige: "1 : 6",
  },
  {
    id: "linkshaender",
    text: "als Linkshänder geboren zu werden",
    wahrscheinlichkeit: 1 / 10,
    anzeige: "1 : 10",
  },
  {
    id: "zwillinge",
    text: "bei einer Schwangerschaft Zwillinge zu bekommen",
    wahrscheinlichkeit: 1 / 250,
    anzeige: "1 : 250",
  },
  {
    id: "vierling",
    text: "bei einer Schwangerschaft Vierlinge zu bekommen",
    wahrscheinlichkeit: 1 / 700000,
    anzeige: "1 : 700.000",
  },
  {
    id: "blitz",
    text: "in einem bestimmten Jahr vom Blitz getroffen zu werden",
    wahrscheinlichkeit: 1 / 1200000,
    anzeige: "1 : 1.200.000",
  },
  {
    id: "krokodil",
    text: "im Laufe des Lebens von einem Krokodil gefressen zu werden",
    wahrscheinlichkeit: 1 / 3000000,
    anzeige: "1 : 3.000.000",
  },
  {
    id: "hai",
    text: "im Laufe des Lebens von einem Hai angegriffen zu werden",
    wahrscheinlichkeit: 1 / 3700000,
    anzeige: "1 : 3.700.000",
  },
  {
    id: "flugzeugabsturz",
    text: "bei einem einzelnen Flug in einen tödlichen Flugzeugabsturz verwickelt zu sein",
    wahrscheinlichkeit: 1 / 11000000,
    anzeige: "1 : 11.000.000",
  },
  {
    id: "lottojackpot",
    text: "im Lotto „6 aus 49“ mit Superzahl den Jackpot zu knacken",
    wahrscheinlichkeit: 1 / 140000000,
    anzeige: "1 : 140.000.000",
  },
];

const KROKODIL = KURIOSITAETEN.find((k) => k.id === "krokodil")!;

export type WahrscheinlichkeitsVergleich = {
  passendste: Kuriositaet;
  krokodil: Kuriositaet;
  hoeherAlsPassendste: boolean;
};

// Sucht die Kuriosität, deren Wahrscheinlichkeit (auf einer logarithmischen
// Skala) am nächsten an der übergebenen Wahrscheinlichkeit liegt. Das
// Krokodil wird zusätzlich immer mitgeliefert, damit es als running gag
// unabhängig vom Ergebnis immer auftaucht.
export function findeVergleich(wahrscheinlichkeitProzent: number): WahrscheinlichkeitsVergleich {
  const p = Math.max(wahrscheinlichkeitProzent / 100, 1e-10);
  const logP = Math.log(p);

  let passendste = KURIOSITAETEN[0];
  let kleinsterAbstand = Infinity;
  for (const k of KURIOSITAETEN) {
    const abstand = Math.abs(Math.log(k.wahrscheinlichkeit) - logP);
    if (abstand < kleinsterAbstand) {
      kleinsterAbstand = abstand;
      passendste = k;
    }
  }

  return {
    passendste,
    krokodil: KROKODIL,
    hoeherAlsPassendste: p > passendste.wahrscheinlichkeit,
  };
}
