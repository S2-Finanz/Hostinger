import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Nettolohnrechner from "@/components/calculators/Nettolohnrechner";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/nettolohnrechner/" },
  title: "Nettolohnrechner – Brutto-Netto-Rechner 2026 – S² Finanz",
  description:
    "Berechnen Sie Ihr Nettogehalt 2026 aus Bruttogehalt, Steuerklasse, Krankenkasse und Kirchensteuer – inklusive Aufschlüsselung aller Abzüge.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Nettolohnrechner"
      intro="Berechnen Sie Ihr Nettogehalt aus Bruttogehalt, Steuerklasse, Krankenkasse und Kirchensteuer – mit vollständiger Aufschlüsselung aller Sozialabgaben und Steuern."
      disclaimer="Rechtsstand 2026. Sozialversicherung: Rentenversicherung 18,6 % und Arbeitslosenversicherung 2,6 % (je hälftig Arbeitnehmer/Arbeitgeber, Beitragsbemessungsgrenze 8.450 €/Monat, bundeseinheitlich); Kranken- und Pflegeversicherung wie im GKV-PKV-Vergleichsrechner (allgemeiner Beitragssatz 14,6 % zzgl. kassenindividuellem Zusatzbeitrag, Pflegeversicherung 3,6 % zzgl. Kinderlosenzuschlag ab 23 Jahren, Beitragsbemessungsgrenze 5.812,50 €/Monat). Die vorausgefüllten Zusatzbeiträge sind Stand Januar 2026 und keine Live-Abfrage. Lohnsteuer: Grundtarif 2026 nach § 32a EStG für die Steuerklassen I, II und IV; Steuerklasse III nutzt das Splittingverfahren auf das eigene Einkommen. Die Lohnsteuer-Bemessungsgrundlage ergibt sich vereinfachend aus Bruttojahresgehalt abzüglich Arbeitnehmer-Pauschbetrag (1.230 €), Sonderausgaben-Pauschbetrag (36 €), der eigenen Sozialversicherungsbeiträge in voller Höhe als Vorsorgepauschale sowie – bei Steuerklasse II – des Entlastungsbetrags für Alleinerziehende; die amtliche Mindestvorsorgepauschale nach § 39b Abs. 2 EStG kann hiervon in Detailfällen geringfügig abweichen. Kinderfreibeträge mindern vereinfachend nicht die Bemessungsgrundlage für Solidaritätszuschlag und Kirchensteuer (nur bei Soli-pflichtigen Einkommen oberhalb der Freigrenze von 20.350 € Einkommensteuer relevant). Steuerklasse V und VI sind aktuell nicht verfügbar, da hierfür eine eigene amtliche Tarifformel gilt, die wir ohne verifizierte Quelle nicht nachbilden möchten. Nicht berücksichtigt: Kinderfreibetrag-Günstigerprüfung, Sachbezüge, vermögenswirksame Leistungen, betriebliche Altersvorsorge und die Pflegeversicherungs-Sonderregelung in Sachsen. Gilt nur für sozialversicherungspflichtige Angestellte in der gesetzlichen Krankenversicherung, nicht für Beamte, Selbstständige oder PKV-Versicherte. Vereinfachte Modellrechnung – sie ersetzt keine individuelle steuerliche Beratung."
    >
      <Nettolohnrechner />
    </CalculatorLayout>
  );
}
