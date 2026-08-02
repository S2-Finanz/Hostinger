import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import EtfSparplanrechner from "@/components/calculators/EtfSparplanrechner";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/etf-sparplanrechner/" },
  title: "ETF-Sparplanrechner – S² Finanz",
  description:
    "Berechnen Sie die Entwicklung eines ETF-Sparplans inklusive laufender Kosten.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="ETF-Sparplanrechner"
      intro="Startkapital, Sparrate, erwartete Rendite und laufende Kosten – sehen Sie, was am Ende übrig bleibt."
      disclaimer="Vereinfachte Zinseszins-Berechnung bei konstanter, angenommener Rendite p. a. abzüglich laufender Kosten (TER). Keine Berücksichtigung von Steuern, Kursschwankungen oder Ausgabeaufschlägen. Kein Angebot und keine Anlageberatung."
    >
      <EtfSparplanrechner />
    </CalculatorLayout>
  );
}
