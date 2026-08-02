import type { Metadata } from "next";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import { BESOLDUNGSTABELLEN } from "@/lib/besoldung/tabellen";

export const metadata: Metadata = {
  title: "Besoldungstabellen – S² Finanz",
  description:
    "Besoldungstabellen für Bund und alle 16 Bundesländer als kostenloser PDF-Download – im S² Finanz Design.",
};

function formatDatum(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export default function BesoldungstabellenPage() {
  const laender = BESOLDUNGSTABELLEN.filter((l) => l.verfuegbar);

  return (
    <CalculatorLayout
      title="Besoldungstabellen"
      intro="Alle Besoldungstabellen für Bund und die 16 Bundesländer als kostenloser PDF-Download – aufbereitet im S² Finanz Design."
      disclaimer="Datenquelle: dbb beamtenbund und tarifunion (www.dbb.de). Einzelne Tabellen sind noch nicht verkündete Referentenentwürfe bzw. Prognosen und können sich bis zum Inkrafttreten des jeweiligen Besoldungsgesetzes noch ändern – als „Entwurf / Prognose“ gekennzeichnet. Alle Angaben ohne Gewähr, Fehler und Irrtümer vorbehalten. Grundgehälter ohne Familienzuschlag, Amtszulagen und sonstige Zulagen. Keine Rechtsberatung – für eine verbindliche Einordnung Ihrer individuellen Besoldung sprechen Sie uns gerne an."
    >
      <div className="grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {laender.map((land) => (
          <a
            key={land.code}
            href={`/besoldungstabellen/besoldungstabelle-${land.code}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col bg-onyx p-8 transition-colors hover:bg-graphit"
          >
            <h3 className="font-display text-lg font-semibold text-white">
              {land.name}
            </h3>
            {land.gueltigAb && (
              <p className="mt-2 text-xs text-nebel">
                Stand: {formatDatum(land.gueltigAb)}
                {land.entwurf && (
                  <span className="ml-2 rounded-sm bg-gold/10 px-2 py-0.5 text-gold">
                    Entwurf / Prognose
                  </span>
                )}
              </p>
            )}
            <span className="mt-6 text-sm font-semibold text-gold">
              PDF herunterladen →
            </span>
          </a>
        ))}
      </div>
    </CalculatorLayout>
  );
}
