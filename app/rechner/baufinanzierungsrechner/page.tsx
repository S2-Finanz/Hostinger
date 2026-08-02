import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Baufinanzierungsrechner from "@/components/calculators/Baufinanzierungsrechner";

export const metadata: Metadata = {
  title: "Baufinanzierungsrechner – S² Finanz",
  description:
    "Berechnen Sie Monatsrate und Restschuld Ihrer Immobilienfinanzierung.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Baufinanzierungsrechner"
      intro="Darlehenssumme, Zins und Tilgung eingeben – monatliche Rate und Restschuld nach der Zinsbindung berechnen."
      disclaimer="Vereinfachte Annuitätendarlehen-Berechnung mit konstantem Sollzins während der Zinsbindung. Nebenkosten, Sondertilgungen und Zinsänderungsrisiko nach Ablauf der Zinsbindung werden nicht berücksichtigt. Kein Finanzierungsangebot."
    >
      <Baufinanzierungsrechner />
    </CalculatorLayout>
  );
}
