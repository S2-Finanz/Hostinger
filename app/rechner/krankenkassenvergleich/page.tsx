import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import KrankenkassenVergleich from "@/components/calculators/KrankenkassenVergleich";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/krankenkassenvergleich/" },
  title: "Krankenkassen-Vergleich – GKV-Beitragsvergleich – S² Finanz",
  description:
    "Vergleichen Sie den GKV-Beitrag zweier gesetzlicher Krankenkassen direkt nebeneinander und sehen Sie sofort, welche für Sie günstiger ist.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Krankenkassen-Vergleich"
      intro="Stellen Sie zwei gesetzliche Krankenkassen direkt gegenüber und sehen Sie auf einen Blick, wo Sie monatlich sparen."
      disclaimer="Die Berechnung basiert auf den gesetzlichen Rechengrößen 2026 (allgemeiner Beitragssatz 14,6 %, Pflegeversicherungsbeitrag 3,6 % zzgl. Kinderlosenzuschlag, Beitragsbemessungsgrenze 5.812,50 €/Monat). Zur Auswahl stehen alle gesetzlichen Krankenkassen; die vorausgefüllten Zusatzbeiträge sind Stand Januar 2026 und keine Live-Abfrage – Krankenkassen können ihren Zusatzbeitrag unterjährig ändern, die Felder bleiben daher manuell editierbar. Als Jahresgehalt wird das 12-fache des eingegebenen Monatsgehalts angenommen; Sonderzahlungen sind nicht berücksichtigt. Die Hochrechnung über das Berufsleben nimmt vereinfachend ein Renteneintrittsalter von 67 Jahren an, unabhängig vom Geburtsjahr, und setzt einen über die gesamte Zeit unveränderten Gehalts- und Beitragsunterschied voraus – die tatsächliche gestaffelte Regelaltersgrenze kann davon abweichen. Der Vergleich zeigt ausschließlich den gesetzlichen Pflichtbeitrag – Zusatzleistungen, Boni und Service der jeweiligen Kasse sind hierin nicht abgebildet. Sofern verfügbar, führt der Button unten direkt zum Online-Antrag der gewählten Alternativ-Krankenkasse bzw. zum Download des Highlightblatts; diese Links werden extern über unseren Maklerpool bereitgestellt und können sich ändern. Liegt Ihr Jahresgehalt über der Jahresarbeitsentgeltgrenze (77.400 €, 2026), weisen wir zusätzlich auf unseren GKV-PKV-Vergleichsrechner hin – eine pauschale Aussage allein über den GKV-Beitrag wäre nicht seriös."
    >
      <KrankenkassenVergleich />
    </CalculatorLayout>
  );
}
