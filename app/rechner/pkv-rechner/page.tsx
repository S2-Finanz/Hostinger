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
      disclaimer="Die GKV-Berechnung basiert auf den gesetzlichen Rechengrößen 2026 (allgemeiner Beitragssatz 14,6 %, Pflegeversicherungsbeitrag 3,6 % zzgl. Kinderlosenzuschlag, Beitragsbemessungsgrenze 5.812,50 €/Monat) und wird exakt aus Ihren Angaben ermittelt. Die vorausgefüllten Zusatzbeiträge aller gesetzlichen Krankenkassen sind Stand Januar 2026 und keine Live-Abfrage – das Feld bleibt manuell editierbar. Die PKV-Beitragsspannen sind Marktrichtwerte für Angestellte im Standardtarif 2026 (Eintrittsalter 18–50 Jahre), rein altersabhängig modelliert und enthalten einen Aufschlag von insgesamt rund 44 % gegenüber den ursprünglichen Marktdaten (20 % für die gesetzlich vorgeschriebene private Pflegepflichtversicherung sowie eine zusätzliche Marktanpassung von 20 %). Für mitversicherte Kinder rechnen wir pauschal mit 200 € Gesamtbeitrag pro Kind, ohne Arbeitgeberzuschuss. Der Arbeitgeberzuschuss zum eigenen PKV-Vertrag wird gesetzeskonform mit der Hälfte des Beitrags berechnet, gedeckelt auf den Betrag, den der Arbeitgeber maximal in die GKV einzahlen würde (§ 257 SGB V). Als Jahresgehalt wird das 12-fache des monatlichen Bruttogehalts angenommen; Sonderzahlungen sind nicht berücksichtigt. Die Jahresarbeitsentgeltgrenze (77.400 €, 2026) entscheidet, ob ein Wechsel überhaupt möglich ist – liegt Ihr Gehalt darunter, dienen die angezeigten Zahlen nur der Orientierung. Nur eine individuelle Berechnung kann Sicherheit geben: In der PKV ist insbesondere Ihr Gesundheitszustand ausschlaggebend für den tatsächlichen Beitrag. Dieses Tool ersetzt keine individuelle Beratung."
    >
      <PkvCheck />
    </CalculatorLayout>
  );
}
