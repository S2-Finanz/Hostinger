import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Altersvorsorgedepot from "@/components/calculators/Altersvorsorgedepot";

export const metadata: Metadata = {
  title: "Altersvorsorgedepot-Rechner – S² Finanz",
  description:
    "Zulagen, Kinderzulage, Startbonus und Steuervorteil des neuen Altersvorsorgedepots berechnen – inklusive Vergleich mit einem privaten ETF-Sparplan.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Altersvorsorgedepot-Rechner"
      intro="Das Altersvorsorgedepot ist die neue staatlich geförderte private Altersvorsorge ab 1. Januar 2027. Berechnen Sie Ihre komplette Förderung – Grundzulage, Kinderzulage, Startbonus und den möglichen Steuervorteil aus der Günstigerprüfung – und vergleichen Sie das Ergebnis auf Wunsch mit einem privaten ETF-Sparplan."
      disclaimer="Basis: Gesetz zur Neuordnung der geförderten Altersvorsorge (Bundestag 27.3.2026, Bundesrat 8.5.2026, Start 1.1.2027). Grundzulage: 50 % der Beiträge bis 360 €/Jahr plus 25 % von 360,01 € bis 1.800 €/Jahr (max. 540 €/Jahr). Kinderzulage: 1 € je Euro Eigenbeitrag bis 300 € pro Kind und Jahr, vereinfachend für die angegebene Anspruchsdauer angesetzt. Startbonus: einmalig 200 € bei Abschluss vor dem 25. Lebensjahr. Günstigerprüfung: Sonderausgabenabzug der Beiträge bis 1.800 €/Jahr nach dem Einkommensteuertarif 2026 (§ 32a EStG, Grundtarif, ohne Kirchensteuer und Solidaritätszuschlag); künftige Tarifänderungen sind nicht berücksichtigt. ETF-Vergleich: identische Beiträge und Renditen; besteuert wird nur der Gewinnanteil der Entnahmen mit Abgeltungsteuer (26,375 %), 30 % Teilfreistellung und 1.000 € Sparer-Pauschbetrag; Vorabpauschale und Produktkosten sind nicht berücksichtigt. Die Auszahlung des Altersvorsorgedepots ist als voll steuerpflichtiger Auszahlungsplan zum heutigen Tarif modelliert. Vereinfachte Modellrechnung mit konstanten Annahmen – sie ersetzt keine individuelle Beratung; die konkrete Produktausgestaltung liegt bei den Anbietern."
    >
      <Altersvorsorgedepot />
    </CalculatorLayout>
  );
}
