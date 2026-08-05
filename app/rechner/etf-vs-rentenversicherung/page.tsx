import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import EtfVsRentenversicherung from "@/components/calculators/EtfVsRentenversicherung";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/etf-vs-rentenversicherung/" },
  title: "ETF-Depot vs. Rentenversicherung – S² Finanz",
  description:
    "Vergleichen Sie einen ETF-Sparplan im Depot mit einer Rentenversicherung (Bruttopolice) – inklusive Rebalancing, Vorabpauschale, Abschlusskosten und allen Auszahlvarianten.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="ETF-Depot vs. Rentenversicherung"
      intro="Ein ETF-Sparplan im Depot hat meist niedrigere Kosten, eine Rentenversicherung dafür steuerliche Vorteile in der Ansparphase. Was sich am Ende wirklich lohnt, hängt stark von den gewählten Kosten, dem Rebalancing und vor allem der Auszahlform ab."
      disclaimer="Monatliche Zinseszins-Berechnung bei konstanten, angenommenen Renditen. Steuerliche Annahmen (Vorabpauschale, Abgeltungsteuer, Halbeinkünfteverfahren, Ertragsanteil) vereinfacht und ohne Berücksichtigung individueller Umstände wie Kirchensteuer, sonstiger Kapitalerträge oder künftiger Gesetzesänderungen. Bei der lebenslangen Rente trägt die Versicherung das Langlebigkeitsrisiko, das Depot-Äquivalent nicht – das ist in den reinen Zahlen nicht abgebildet. Kein Angebot, keine Steuer- oder Anlageberatung, ersetzt kein persönliches Beratungsgespräch."
    >
      <EtfVsRentenversicherung />
    </CalculatorLayout>
  );
}
