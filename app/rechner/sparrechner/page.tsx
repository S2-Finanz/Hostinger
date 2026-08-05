import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Sparrechner from "@/components/calculators/Sparrechner";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/sparrechner/" },
  title: "Sparrechner – S² Finanz",
  description:
    "Berechnen Sie, wie sich Startkapital und Sparplan inklusive Dynamik, Ausgabeaufschlag und Verwaltungsgebühr über die Zeit entwickeln – mit Jahrestabelle und PDF-Export.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Sparrechner"
      intro="Sehen Sie, wie sich Startkapital und monatliche Sparrate über die Laufzeit entwickeln – inklusive Dynamik, Ausgabeaufschlag und Verwaltungsgebühr, mit Jahrestabelle und PDF-Export."
      disclaimer="Der Rechner arbeitet mit einer monatlichen Zinseszins-Berechnung bei konstanter, angenommener Rendite und Dynamik p. a. Er berücksichtigt keine Steuern und keine Schwankungen der tatsächlichen Wertentwicklung und ersetzt keine individuelle Anlageberatung."
    >
      <Sparrechner />
    </CalculatorLayout>
  );
}
