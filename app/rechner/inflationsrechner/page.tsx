import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Inflationsrechner from "@/components/calculators/Inflationsrechner";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/inflationsrechner/" },
  title: "Inflationsrechner – S² Finanz",
  description:
    "Berechnen Sie, wie sich Einmalbetrag und Sparplan über die Laufzeit entwickeln und was davon nach Abzug der Inflation real übrig bleibt.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Inflationsrechner"
      intro="Was ist Ihr Geld in einigen Jahren noch wert? Geben Sie Einmalbetrag und/oder monatliche Sparrate ein – entweder mit einer erwarteten Rendite, oder lassen Sie die Rendite leer und tragen stattdessen die bekannte Ablaufleistung ein, um die dafür nötige Rendite zu ermitteln."
      disclaimer="Vereinfachte Berechnung mit konstanter, angenommener Inflations- und Renditerate p. a. Monatliche Sparraten werden jeweils zum Monatsende angelegt. Die tatsächliche Inflations- und Renditeentwicklung schwankt von Jahr zu Jahr und lässt sich nicht exakt vorhersagen."
    >
      <Inflationsrechner />
    </CalculatorLayout>
  );
}
