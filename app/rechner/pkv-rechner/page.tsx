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
      disclaimer="Die GKV-Berechnung basiert auf den gesetzlichen Rechengrößen 2026 (allgemeiner Beitragssatz 14,6 %, Pflegeversicherungsbeitrag 3,6 % zzgl. Kinderlosenzuschlag, Beitragsbemessungsgrenze 5.812,50 €/Monat) und wird auf Basis Ihrer Angaben berechnet. Die vorausgefüllten Zusatzbeiträge aller gesetzlichen Krankenkassen sind Stand Januar 2026 und keine Live-Abfrage – das Feld bleibt manuell editierbar. Die PKV-Beitragsspannen basieren auf Marktrichtwerten für Angestellte 2026 (Eintrittsalter 18–50 Jahre) und sind rein altersabhängig modelliert. Der tatsächliche Beitrag hängt von Gesundheitsprüfung, Risikozuschlägen und gewünschtem Leistungsumfang ab und kann davon abweichen. Für mitversicherte Kinder rechnen wir pauschal mit 200 € Gesamtbeitrag pro Kind, ohne Arbeitgeberzuschuss. Der Arbeitgeberzuschuss zum eigenen PKV-Vertrag wird gesetzeskonform mit der Hälfte des Beitrags berechnet, gedeckelt auf den Betrag, den der Arbeitgeber maximal in die GKV einzahlen würde (§ 257 SGB V). Die Jahresarbeitsentgeltgrenze (77.400 €, 2026) entscheidet, ob ein Wechsel überhaupt möglich ist – liegt Ihr Gehalt darunter, dienen die angezeigten Zahlen nur der Orientierung. Nur eine individuelle Berechnung kann Sicherheit geben: In der PKV ist insbesondere Ihr Gesundheitszustand ausschlaggebend für den tatsächlichen Beitrag. Dieses Tool ersetzt keine individuelle Beratung."
    >
      <PkvCheck />
    </CalculatorLayout>
  );
}
