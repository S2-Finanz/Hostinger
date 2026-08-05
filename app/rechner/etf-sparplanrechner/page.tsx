import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import EtfSparplanrechner from "@/components/calculators/EtfSparplanrechner";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/etf-sparplanrechner/" },
  title: "ETF-Sparplanrechner – S² Finanz",
  description:
    "Berechnen Sie die Entwicklung eines ETF-Sparplans inklusive Dynamik, laufender Kosten und Ausgabeaufschlag – mit Jahrestabelle und PDF-Export.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="ETF-Sparplanrechner"
      intro="Startkapital, Sparrate, Dynamik, erwartete Rendite, Ausgabeaufschlag und laufende Kosten – sehen Sie, was am Ende übrig bleibt, mit Jahrestabelle und PDF-Export."
      disclaimer="Monatliche Zinseszins-Berechnung bei konstanter, angenommener Rendite und Dynamik p. a. abzüglich laufender Kosten (TER) und ggf. Ausgabeaufschlag. Keine Berücksichtigung von Steuern oder tatsächlichen Kursschwankungen. Kein Angebot und keine Anlageberatung."
    >
      <EtfSparplanrechner />
    </CalculatorLayout>
  );
}
