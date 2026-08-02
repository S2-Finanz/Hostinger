import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Pensionsrechner from "@/components/calculators/Pensionsrechner";

export const metadata: Metadata = {
  title: "Pensionsrechner – S² Finanz",
  description:
    "Schätzen Sie Ihren Ruhegehaltssatz und Ihre voraussichtliche Pension als Beamter.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Pensionsrechner"
      intro="Schätzen Sie Ihren Ruhegehaltssatz und Ihre voraussichtliche Pension anhand Ihrer ruhegehaltfähigen Dienstjahre."
      disclaimer="Vereinfachte Berechnung nach dem gesetzlichen Ruhegehaltssatz (1,79375 % je ruhegehaltfähigem Dienstjahr, gedeckelt bei 71,75 %). Individuelle Faktoren wie Mindestversorgung, Teilzeiten, Zurechnungszeiten oder länderspezifische Besonderheiten werden nicht berücksichtigt. Keine verbindliche Versorgungsauskunft."
    >
      <Pensionsrechner />
    </CalculatorLayout>
  );
}
