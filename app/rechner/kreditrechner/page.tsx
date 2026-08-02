import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Kreditrechner from "@/components/calculators/Kreditrechner";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/kreditrechner/" },
  title: "Kreditrechner – S² Finanz",
  description: "Berechnen Sie die monatliche Rate und Zinskosten eines Kredits.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Kreditrechner"
      intro="Kreditbetrag, Zins und Laufzeit eingeben – monatliche Rate und Gesamtkosten in Sekunden sehen."
      disclaimer="Vereinfachte Annuitätenrechnung mit konstantem Sollzins über die gesamte Laufzeit. Individuelle Konditionen, Bearbeitungsgebühren oder Sondertilgungen werden nicht berücksichtigt. Kein Kreditangebot."
    >
      <Kreditrechner />
    </CalculatorLayout>
  );
}
