import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Sparrechner from "@/components/calculators/Sparrechner";

export const metadata: Metadata = {
  title: "Sparrechner – S² Finanz",
  description:
    "Berechnen Sie, wie sich Startkapital und monatliche Sparrate über die Zeit entwickeln.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Sparrechner"
      intro="Sehen Sie in Sekunden, wie sich Startkapital und monatliche Sparrate über die Laufzeit entwickeln."
      disclaimer="Der Rechner arbeitet mit einer vereinfachten Zinseszins-Berechnung bei konstanter, angenommener Rendite p. a. Er berücksichtigt weder Steuern, Gebühren noch Schwankungen der tatsächlichen Wertentwicklung und ersetzt keine individuelle Anlageberatung."
    >
      <Sparrechner />
    </CalculatorLayout>
  );
}
