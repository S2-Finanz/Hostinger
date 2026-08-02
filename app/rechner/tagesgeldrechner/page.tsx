import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Tagesgeldrechner from "@/components/calculators/Tagesgeldrechner";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/tagesgeldrechner/" },
  title: "Tagesgeldrechner – S² Finanz",
  description: "Berechnen Sie den Zinsertrag Ihres Tagesgeldkontos.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Tagesgeldrechner"
      intro="Wie viel Zinsertrag bringt Ihr Tagesgeld bei gegebenem Zinssatz und Anlagedauer?"
      disclaimer="Vereinfachte Berechnung mit monatlicher Verzinsung bei konstantem Zinssatz. Tatsächliche Zinssätze können sich während der Anlagedauer ändern. Ohne Berücksichtigung der Abgeltungsteuer."
    >
      <Tagesgeldrechner />
    </CalculatorLayout>
  );
}
