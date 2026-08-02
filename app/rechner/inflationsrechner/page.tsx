import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Inflationsrechner from "@/components/calculators/Inflationsrechner";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/inflationsrechner/" },
  title: "Inflationsrechner – S² Finanz",
  description:
    "Berechnen Sie den Kaufkraftverlust Ihres Vermögens durch Inflation.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Inflationsrechner"
      intro="Was ist Ihr Geld in einigen Jahren noch wert? Und wie viel bräuchten Sie nominal, um die gleiche Kaufkraft zu behalten?"
      disclaimer="Vereinfachte Berechnung mit konstanter, angenommener Inflationsrate p. a. Die tatsächliche Inflation schwankt von Jahr zu Jahr."
    >
      <Inflationsrechner />
    </CalculatorLayout>
  );
}
