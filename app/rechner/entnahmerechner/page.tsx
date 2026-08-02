import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Entnahmerechner from "@/components/calculators/Entnahmerechner";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/entnahmerechner/" },
  title: "Entnahmerechner – S² Finanz",
  description:
    "Berechnen Sie, wie lange Ihr Kapital bei einer regelmäßigen Entnahme reicht.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Entnahmerechner"
      intro="Wie lange reicht Ihr Kapital, wenn Sie regelmäßig einen festen Betrag entnehmen?"
      disclaimer="Vereinfachte Berechnung mit konstanter, angenommener Rendite p. a. und konstanter monatlicher Entnahme. Ohne Berücksichtigung von Inflation, Steuern oder Renditeschwankungen."
    >
      <Entnahmerechner />
    </CalculatorLayout>
  );
}
