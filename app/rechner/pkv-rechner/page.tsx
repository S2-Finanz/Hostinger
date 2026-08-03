import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import PkvCheck from "@/components/calculators/PkvCheck";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/pkv-rechner/" },
  title: "PKV Schnellrechner – GKV-Beitrag berechnen – S² Finanz",
  description:
    "Berechnen Sie Ihren GKV-Beitrag inkl. Pflegeversicherung und prüfen Sie, ob Sie über der Jahresarbeitsentgeltgrenze liegen und in die PKV wechseln können.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="PKV Schnellrechner"
      intro="Berechnen Sie Ihren aktuellen GKV-Beitrag und erfahren Sie, ob ein Wechsel in die private Krankenversicherung für Sie überhaupt infrage kommt."
      disclaimer="Die GKV-Berechnung basiert auf den gesetzlichen Rechengrößen 2026 (allgemeiner Beitragssatz 14,6 %, Pflegeversicherungsbeitrag 3,6 % zzgl. Kinderlosenzuschlag, Beitragsbemessungsgrenze 5.812,50 €/Monat). Die vorausgefüllten Zusatzbeiträge aller gesetzlichen Krankenkassen sind Stand Januar 2026 und keine Live-Abfrage – Krankenkassen können ihren Zusatzbeitrag unterjährig ändern, das Feld bleibt daher manuell editierbar. Nicht gelistete Kassen können über „Andere Krankenkasse“ mit dem individuellen Zusatzbeitrag berechnet werden. Als Jahresgehalt wird das 12-fache des eingegebenen Monatsgehalts angenommen; Sonderzahlungen sind nicht berücksichtigt. Die Jahresarbeitsentgeltgrenze (77.400 €, 2026) entscheidet nur formal über die Wechselmöglichkeit – der tatsächliche PKV-Beitrag hängt von Tarif, Gesundheitsstand, Leistungsumfang und Versicherer ab und lässt sich seriös nicht pauschal berechnen. Dieses Tool liefert keine PKV-Beitragsschätzung, sondern eine erste Einordnung Ihrer GKV-Kosten und Wechseloption."
    >
      <PkvCheck />
    </CalculatorLayout>
  );
}
