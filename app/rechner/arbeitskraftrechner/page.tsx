import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Arbeitskraftrechner from "@/components/calculators/Arbeitskraftrechner";

export const metadata: Metadata = {
  title: "Arbeitskraftrechner – S² Finanz",
  description:
    "Ermitteln Sie, wie hoch Ihre Arbeitskraftabsicherung sein sollte.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Arbeitskraftrechner"
      intro="Ermitteln Sie auf Basis einer gängigen Faustregel, wie hoch Ihre Arbeitskraftabsicherung sein sollte."
      disclaimer="Faustregel-Berechnung auf Basis Ihres Nettoeinkommens. Staatliche Leistungen, bestehende Verträge und individuelle Risikofaktoren werden nicht einbezogen. Keine Bedarfsanalyse im Sinne der Versicherungsvermittlung."
    >
      <Arbeitskraftrechner />
    </CalculatorLayout>
  );
}
