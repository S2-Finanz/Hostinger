import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import PkvCheck from "@/components/calculators/PkvCheck";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/pkv-rechner/" },
  title: "GKV oder PKV? Vergleichsrechner für Angestellte – S² Finanz",
  description:
    "Vergleichen Sie Ihren GKV-Beitrag mit marktüblichen PKV-Richtwerten für Ihr Alter, inkl. Arbeitgeberzuschuss, Wechsel-Einschätzung und Jahresarbeitsentgeltgrenze.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="GKV oder PKV: Was lohnt sich für Sie?"
      intro="Geben Sie Ihre Daten ein und erhalten Sie einen direkten Vergleich Ihres GKV-Beitrags mit marktüblichen PKV-Richtwerten für Ihr Alter – als angestellte Person oberhalb der Jahresarbeitsentgeltgrenze."
      disclaimer="Die GKV-Berechnung basiert auf den gesetzlichen Rechengrößen 2026 (allgemeiner Beitragssatz 14,6 %, Pflegeversicherungsbeitrag 3,6 % zzgl. Kinderlosenzuschlag, Beitragsbemessungsgrenze 5.812,50 €/Monat) und wird exakt aus Ihren Angaben ermittelt. Die vorausgefüllten Zusatzbeiträge aller gesetzlichen Krankenkassen sind Stand Januar 2026 und keine Live-Abfrage – das Feld bleibt manuell editierbar. Die PKV-Beitragsspannen sind Marktrichtwerte für Angestellte im Standardtarif 2026 (Eintrittsalter 18–50 Jahre) und rein altersabhängig modelliert – der tatsächliche Beitrag hängt von Gesundheitsprüfung, Risikozuschlägen, Leistungsumfang und Versicherer ab. Der Arbeitgeberzuschuss zur PKV wird gesetzeskonform mit der Hälfte des Beitrags berechnet, gedeckelt auf den Betrag, den der Arbeitgeber maximal in die GKV einzahlen würde (§ 257 SGB V). Als Jahresgehalt wird das 12-fache des monatlichen Bruttogehalts angenommen; Sonderzahlungen sind nicht berücksichtigt. Die Jahresarbeitsentgeltgrenze (77.400 €, 2026) entscheidet nur formal über die Wechselmöglichkeit – eine pauschale Aussage allein über den Beitrag wäre nicht seriös. Dieses Tool ersetzt keine individuelle Beratung."
    >
      <PkvCheck />
    </CalculatorLayout>
  );
}
