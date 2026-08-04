import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import HistorischeRendite from "@/components/calculators/HistorischeRendite";

export const metadata: Metadata = {
  alternates: { canonical: "/rechner/was-waere-wenn-rechner/" },
  title: "Was-wäre-wenn-Rechner – historische Index-Rendite – S² Finanz",
  description:
    "Was wäre aus einer Geldanlage seit Ihrer Geburt geworden? Berechnen Sie mit echten Jahresrenditen von MSCI World, S&P 500, DAX und weiteren Indizes.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Was wäre aus meiner Geldanlage geworden?"
      intro="Geben Sie Ihr Geburtsjahr ein und sehen Sie, was aus einer Einmalanlage oder einem Sparplan bis zum 18. Geburtstag mit den echten historischen Jahresrenditen bekannter Indizes geworden wäre."
      disclaimer="Die Berechnung nutzt ausschließlich echte Kalenderjahres-Renditen (Indexstand 31.12. zu 31.12., Stand Datengrundlage: August 2026) – eine monatsgenaue Analyse ist auf dieser Basis nicht seriös möglich, der tatsächliche Geburtstag im Jahresverlauf wird nicht berücksichtigt. Beim Sparplan wird der Jahresbeitrag vereinfachend als zu Jahresbeginn eingezahlt behandelt. Nur S&P 500 und DAX sind gegen eine externe Quelle verifiziert, alle anderen Indizes sind ungeprüfte Näherungswerte und im Auswahlmenü entsprechend gekennzeichnet. Kursindizes bilden keine Dividenden ab, Performance- und Net-Total-Return-Indizes hingegen schon – ein direkter Vergleich zwischen den Indizes ist dadurch systematisch verzerrt. Wechselkurse, Kosten und Steuern sind nicht berücksichtigt. Vergangene Wertentwicklung ist kein Indikator für die zukünftige Entwicklung. Dieses Tool dient ausschließlich der ersten, unverbindlichen Orientierung und ersetzt keine individuelle Anlageberatung."
    >
      <HistorischeRendite />
    </CalculatorLayout>
  );
}
