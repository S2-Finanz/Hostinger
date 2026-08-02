import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Aktienrenditerechner from "@/components/calculators/Aktienrenditerechner";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/aktienrenditerechner/" },
  title: "Aktienrenditerechner – S² Finanz",
  description:
    "Berechnen Sie die durchschnittliche jährliche Rendite (CAGR) eines Investments.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Aktienrenditerechner"
      intro="Start- und Endwert eingeben und die durchschnittliche jährliche Rendite (CAGR) Ihres Investments berechnen."
      disclaimer="Berechnung der durchschnittlichen jährlichen Wachstumsrate (CAGR) aus Start- und Endwert. Zwischenzeitliche Ein- oder Auszahlungen sowie Steuern werden nicht berücksichtigt."
    >
      <Aktienrenditerechner />
    </CalculatorLayout>
  );
}
