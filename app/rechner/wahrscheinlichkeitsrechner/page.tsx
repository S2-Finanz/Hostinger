import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Wahrscheinlichkeitsrechner from "@/components/calculators/Wahrscheinlichkeitsrechner";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/wahrscheinlichkeitsrechner/" },
  title: "Wahrscheinlichkeitsrechner: Verlustrisiko ETF-Sparplan – S² Finanz",
  description:
    "Wie hoch war historisch die Wahrscheinlichkeit, mit einem MSCI-World-Sparplan über eine bestimmte Laufzeit einen Verlust zu erleiden? Rollierende Auswertung echter Jahresrenditen seit 1970.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Wie hoch ist die Verlustwahrscheinlichkeit?"
      intro="Rückblickend betrachtet: Wie oft hätte ein monatlicher Sparplan auf den MSCI World über die gewählte Laufzeit am Ende weniger Kapital gebracht, als eingezahlt wurde? Ausgewertet werden alle historisch möglichen Zeiträume seit 1970."
      disclaimer="Die Berechnung nutzt ausschließlich echte Kalenderjahres-Renditen des MSCI World (Net Total Return, USD, Stand Datengrundlage: August 2026) und untersucht rollierend jeden historisch möglichen Startjahrgang für die gewählte Laufzeit. Der Jahresbeitrag wird vereinfachend als zu Jahresbeginn eingezahlt behandelt. Der MSCI World ist in dieser Datengrundlage ein sorgfältiger, aber ungeprüfter Näherungswert, kein Kursindex, sondern eine Net-Total-Return-Reihe. Wechselkurse, Kosten und Steuern sind nicht berücksichtigt, ebenso wenig Inflation – die ausgewiesene Verlustwahrscheinlichkeit bezieht sich auf den nominalen Kapitalerhalt. Die eingeblendeten Vergleichswahrscheinlichkeiten (z. B. Krokodil, Blitzschlag) sind grobe, kursierende Schätzungen zur Veranschaulichung ohne wissenschaftlichen Anspruch. Wichtig: Vergangene Wertentwicklung ist kein Indikator für die zukünftige Entwicklung – dieses Tool dient ausschließlich der ersten, unverbindlichen Orientierung und ersetzt keine individuelle Anlageberatung."
    >
      <Wahrscheinlichkeitsrechner />
    </CalculatorLayout>
  );
}
