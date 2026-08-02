import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Altersvorsorgedepot from "@/components/calculators/Altersvorsorgedepot";

export const metadata: Metadata = {
  title: "Altersvorsorgedepot-Rechner – S² Finanz",
  description:
    "Berechnen Sie Ihre staatliche Zulage und Ihr voraussichtliches Endkapital im neuen Altersvorsorgedepot.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Altersvorsorgedepot-Rechner"
      intro="Das Altersvorsorgedepot ist die neue staatlich geförderte private Altersvorsorge und startet zum 1. Januar 2027. Berechnen Sie Ihre Zulage und Ihr voraussichtliches Endkapital."
      disclaimer="Basis: Gesetz zur Neuordnung der geförderten Altersvorsorge, vom Bundestag am 27.3.2026 beschlossen und vom Bundesrat am 8.5.2026 gebilligt. Grundzulage: 50 % der Beiträge bis 360 €/Jahr plus 25 % der Beiträge von 360,01 € bis 1.800 €/Jahr, gedeckelt bei 540 €/Jahr. Maximaler geförderter Jahresbeitrag: 6.840 €. Kapitalerträge sind in der Ansparphase steuerfrei, die Auszahlung erfolgt nachgelagert besteuert. Reguläre Auszahlung ab 65 (spätestens ab 70), bis zu 30 % als Einmalzahlung möglich, der Rest als Rente oder Auszahlungsplan bis mindestens 85. Entnahmen vor dem 62. Lebensjahr sind förderschädlich. Diese Berechnung ist eine vereinfachte Modellrechnung mit konstanter, angenommener Rendite p. a. und ersetzt keine individuelle Beratung – die konkrete Produktausgestaltung liegt bei den Anbietern."
    >
      <Altersvorsorgedepot />
    </CalculatorLayout>
  );
}
