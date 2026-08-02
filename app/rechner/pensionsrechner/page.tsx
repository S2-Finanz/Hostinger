import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import Pensionsrechner from "@/components/calculators/pension/Pensionsrechner";

export const metadata: Metadata = {
  title: "Pensionsrechner – S² Finanz",
  description:
    "Berechnen Sie Ihre voraussichtliche Pension als Beamter inklusive Teilzeit, Elternzeit und Karriereverlauf.",
};

export default function Page() {
  return (
    <CalculatorLayout
      title="Pensionsrechner"
      intro="Berechnen Sie Ihre voraussichtliche Pension anhand Ihres tatsächlichen Werdegangs – inklusive mehrerer Teilzeit- und Elternzeit-Phasen und Ihres Karriereverlaufs durch die Erfahrungsstufen."
      disclaimer="Regelaltersgrenze: schrittweise Anhebung auf 67 Jahre analog zur gesetzlichen Rentenversicherung. Ruhegehaltssatz: 1,79375 % je ruhegehaltfähigem Dienstjahr, gedeckelt bei 71,75 %. Teilzeit wird im Verhältnis von ermäßigter zu regelmäßiger Arbeitszeit angerechnet. Elternzeit wird bis zu 3 Jahre pro Kind voll als ruhegehaltfähige Dienstzeit angerechnet, darüber hinausgehende Zeiten nicht. Der Erfahrungsstufen-Rhythmus (1-2-2-3-3-4-4 Jahre) folgt dem in den meisten Bundesländern üblichen Schema und kann im Einzelfall abweichen; viele Länder setzen für höhere Besoldungsgruppen zudem eine höhere Mindest-Erfahrungsstufe an als Stufe 1, was der Rechner berücksichtigt. Die hinterlegten Besoldungstabellen basieren auf den Veröffentlichungen des dbb beamtenbund und tarifunion (www.dbb.de); einzelne Tabellen sind noch nicht verkündete Referentenentwürfe bzw. Prognosen und können sich bis zum Inkrafttreten ändern – Angaben ohne Gewähr, Fehler und Irrtümer vorbehalten. Mindestversorgung, Zurechnungszeiten bei Dienstunfähigkeit und länderspezifische Sonderregelungen werden nicht berücksichtigt. Keine verbindliche Versorgungsauskunft."
    >
      <Pensionsrechner />
    </CalculatorLayout>
  );
}
