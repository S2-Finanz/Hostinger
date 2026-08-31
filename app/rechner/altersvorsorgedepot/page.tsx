import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Altersvorsorgedepot from "@/components/calculators/Altersvorsorgedepot";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/altersvorsorgedepot/" },
  title: "Altersvorsorgedepot-Rechner – S² Finanz",
  description:
    "Zulagen, Kinderzulage, Startbonus und Steuervorteil des neuen Altersvorsorgedepots berechnen – inklusive Vergleich mit einem privaten ETF-Sparplan.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Altersvorsorgedepot-Rechner"
      intro="Das Altersvorsorgedepot ist die neue staatlich geförderte private Altersvorsorge ab 1. Januar 2027. Berechnen Sie Ihre komplette Förderung – Grundzulage, Kinderzulage, Startbonus und den möglichen Steuervorteil aus der Günstigerprüfung – und vergleichen Sie das Ergebnis auf Wunsch mit einem privaten ETF-Sparplan."
      disclaimer="Basis: Gesetz zur Neuordnung der geförderten Altersvorsorge (Bundestag 27.3.2026, Bundesrat 8.5.2026, Start 1.1.2027). Grundzulage: 50 % der Beiträge bis 360 €/Jahr plus 25 % von 360,01 € bis 1.800 €/Jahr (max. 540 €/Jahr). Kinderzulage: 1 € je Euro Eigenbeitrag bis 300 € pro Kind und Jahr, vereinfachend für die angegebene Anspruchsdauer angesetzt. Startbonus: einmalig 200 € bei Abschluss vor dem 25. Lebensjahr. Günstigerprüfung: Sonderausgabenabzug der Beiträge bis 1.800 €/Jahr nach dem Einkommensteuertarif 2026 (§ 32a EStG, Grundtarif); künftige Tarifänderungen sind nicht berücksichtigt. Steuervergleich in der Auszahlphase: beide Varianten mit identischem Kapital als Auszahlplan bis zum eingestellten Endalter (mindestens 85). Gesetzliche Rente, bAV, Basisrente und Mieteinnahmen werden vereinfachend als voll steuerpflichtig angesetzt (tatsächlich gelten je nach Renteneintrittsjahr Besteuerungsanteile unter 100 % sowie Werbungskosten/Freibeträge); die private Rentenversicherung wird mit dem Ertragsanteil nach § 22 EStG je nach Auszahlungsbeginn besteuert. Solidaritätszuschlag: 5,5 % oberhalb der Freigrenze von 20.350 € Einkommensteuer (Einzelveranlagung, Milderungszone vereinfachend nicht abgebildet); Kirchensteuer optional als Zuschlag auf die Einkommensteuer. ETF-Depot: besteuert wird nur der Gewinnanteil der Entnahmen mit 25 % Kapitalertragsteuer plus Soli (26,375 %) nach Abzug des Sparer-Pauschbetrags von 1.000 € sowie der Teilfreistellung von 30 % für Aktienfonds (§ 20 InvStG); während der Ansparphase kann optional eine Vorabpauschale (§ 18 InvStG) auf das ETF-Depot angesetzt werden, die beim Altersvorsorgedepot als zertifiziertem, nachgelagert besteuertem Produkt nicht anfällt. Produktkosten des Altersvorsorgedepots sind über einen editierbaren Kostensatz p. a. berücksichtigt (gesetzlich gedeckelt auf max. 1 % p. a.), Depotkosten des ETF-Vergleichsdepots werden nicht angesetzt. Vereinfachte Modellrechnung mit konstanten Annahmen und heutigem Steuerrecht – sie ersetzt keine individuelle steuerliche Beratung; die konkrete Produktausgestaltung liegt bei den Anbietern."
    >
      <Altersvorsorgedepot />
    </CalculatorLayout>
  );
}
