// Lustige Vergleichswerte zur Einordnung von Wahrscheinlichkeiten – bewusst
// alle aus der Kategorie „ungewöhnliche Todes-/Verletzungsursache im Laufe
// des Lebens“ (Blitzschlag, Krokodil, Ertrinken usw.), angelehnt an
// verbreitete Angaben (u. a. NOAA-Blitzstatistik, National-Safety-Council-
// artige „Lifetime odds“-Tabellen, verbreitete Angaben zu Hai-/
// Krokodilangriffen). Grobe, kursierende Schätzungen zur Veranschaulichung –
// keine wissenschaftlich geprüfte Quelle, keine Tatsachenbehauptung.

export type Kuriositaet = {
  id: string;
  text: string;
  wahrscheinlichkeit: number; // als Anteil, z. B. 0.01 = 1 %
  anzeige: string; // z. B. "1 : 100"
};

export const KURIOSITAETEN: Kuriositaet[] = [
  {
    id: "autounfall",
    text: "im Laufe des Lebens bei einem Autounfall zu sterben",
    wahrscheinlichkeit: 1 / 93,
    anzeige: "1 : 93",
  },
  {
    id: "sturz",
    text: "im Laufe des Lebens durch einen Sturz tödlich verunglückt zu sein",
    wahrscheinlichkeit: 1 / 106,
    anzeige: "1 : 106",
  },
  {
    id: "ertrinken",
    text: "im Laufe des Lebens zu ertrinken",
    wahrscheinlichkeit: 1 / 1101,
    anzeige: "1 : 1.101",
  },
  {
    id: "ersticken",
    text: "im Laufe des Lebens an Nahrung zu ersticken",
    wahrscheinlichkeit: 1 / 2745,
    anzeige: "1 : 2.745",
  },
  {
    id: "dusche",
    text: "im Laufe des Lebens beim Baden oder Duschen zu ertrinken",
    wahrscheinlichkeit: 1 / 11000,
    anzeige: "1 : 11.000",
  },
  {
    id: "blitz",
    text: "im Laufe des Lebens vom Blitz erschlagen zu werden",
    wahrscheinlichkeit: 1 / 15300,
    anzeige: "1 : 15.300",
  },
  {
    id: "bienenstich",
    text: "im Laufe des Lebens an einem Wespen- oder Bienenstich zu sterben",
    wahrscheinlichkeit: 1 / 57825,
    anzeige: "1 : 57.825",
  },
  {
    id: "feuerwerk",
    text: "im Laufe des Lebens durch einen Feuerwerkskörper tödlich verletzt zu werden",
    wahrscheinlichkeit: 1 / 340733,
    anzeige: "1 : 340.733",
  },
  {
    id: "krokodil",
    text: "im Laufe des Lebens von einem Krokodil gefressen zu werden",
    wahrscheinlichkeit: 1 / 3000000,
    anzeige: "1 : 3.000.000",
  },
  {
    id: "hai",
    text: "im Laufe des Lebens von einem Hai angegriffen und getötet zu werden",
    wahrscheinlichkeit: 1 / 3700000,
    anzeige: "1 : 3.700.000",
  },
  {
    id: "flugzeugabsturz",
    text: "im Laufe des Lebens bei einem Flugzeugabsturz zu sterben",
    wahrscheinlichkeit: 1 / 11000000,
    anzeige: "1 : 11.000.000",
  },
];

// Sucht die Kuriosität, deren Wahrscheinlichkeit (auf einer logarithmischen
// Skala) am nächsten an der übergebenen Wahrscheinlichkeit liegt. Keine der
// Kuriositäten wird fest erzwungen – welche angezeigt wird, hängt allein
// vom Rechenergebnis ab.
export function findeVergleich(wahrscheinlichkeitProzent: number): Kuriositaet {
  const p = Math.max(wahrscheinlichkeitProzent / 100, 1e-12);
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

  return passendste;
}
