import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Rentenluecke from "@/components/calculators/Rentenluecke";

export const metadata: Metadata = {
  title: "Rentenlückenrechner – S² Finanz",
  description:
    "Berechnen Sie die Differenz zwischen Wunsch-Einkommen im Ruhestand und Ihrer erwarteten Rente.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Rentenlückenrechner"
      intro="Vergleichen Sie Ihr gewünschtes Einkommen im Ruhestand mit Ihrer erwarteten gesetzlichen Rente und sonstiger Vorsorge."
      disclaimer="Einfache Differenzrechnung auf Basis Ihrer Angaben. Für Beamtinnen und Beamte nutzen Sie stattdessen den Pensionsrechner. Ersetzt keine individuelle Vorsorgeanalyse."
    >
      <Rentenluecke />
    </CalculatorLayout>
  );
}
