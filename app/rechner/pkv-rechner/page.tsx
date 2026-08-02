import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import PkvCheck from "@/components/calculators/PkvCheck";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/pkv-rechner/" },
  title: "PKV Schnellrechner – S² Finanz",
  description:
    "Erste Einschätzung zu Ihrer privaten Krankenversicherung – der genaue Beitrag entsteht im persönlichen Gespräch.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="PKV Schnellrechner"
      intro="Zwei Angaben genügen für eine erste Einordnung – Ihren tatsächlichen Beitrag ermitteln wir gemeinsam im Gespräch."
      disclaimer="Der Beitrag zur privaten Krankenversicherung hängt von Tarif, Gesundheitsstand, Leistungsumfang und Versicherer ab und lässt sich seriös nicht pauschal berechnen. Dieses Tool liefert keine Beitragsschätzung, sondern eine erste Einordnung."
    >
      <PkvCheck />
    </CalculatorLayout>
  );
}
