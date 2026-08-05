"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";
import { NumberField, SliderField, formatEUR, formatPercent } from "@/components/calculators/ui";
import {
  LETZTES_VOLLSTAENDIGES_JAHR,
  findIndex,
  rollierendeSparplanFenster,
} from "@/lib/indexrendite";
import { findeVergleich, formatNenner } from "@/lib/kuriositaeten";

const INDEX_ID = "msci-world" as const;
const LAUFZEIT_MIN = 5;

export default function Wahrscheinlichkeitsrechner() {
  const [laufzeit, setLaufzeit] = useState(40);
  const [sparrate, setSparrate] = useState(100);

  const index = findIndex(INDEX_ID);
  const laufzeitMax = LETZTES_VOLLSTAENDIGES_JAHR - index.ersteJahr + 1;

  const ergebnis = useMemo(
    () => rollierendeSparplanFenster(INDEX_ID, laufzeit, sparrate),
    [laufzeit, sparrate],
  );

  const vergleich = useMemo(
    () => findeVergleich(ergebnis.wahrscheinlichkeitVerlust),
    [ergebnis.wahrscheinlichkeitVerlust],
  );

  const ersterStartJahr = ergebnis.fenster[0]?.startJahr;
  const letzterStartJahr = ergebnis.fenster[ergebnis.fenster.length - 1]?.startJahr;

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-6 rounded-sm bg-onyx p-8 md:grid-cols-2">
        <SliderField
          label="Laufzeit"
          value={laufzeit}
          onChange={setLaufzeit}
          min={LAUFZEIT_MIN}
          max={laufzeitMax}
          formatValue={(v) => `${v} Jahre`}
        />

        <NumberField
          label="Monatliche Sparrate"
          suffix="€"
          value={sparrate}
          onChange={setSparrate}
          step={10}
        />

        <p className="text-xs leading-relaxed text-nebel md:col-span-2">
          Datenbasis: {index.name} ({index.typ}, {index.waehrung}), echte
          Kalenderjahres-Renditen {index.ersteJahr}–{LETZTES_VOLLSTAENDIGES_JAHR}
          {!index.verifiziert && " · Schätzwert, nicht gegen Primärquelle verifiziert"}.
        </p>
      </div>

      {ergebnis.anzahlFenster === 0 ? (
        <div className="rounded-sm border border-gold/40 bg-onyx p-8 text-center">
          <p className="font-display text-lg font-semibold text-white">
            Für eine Laufzeit von {laufzeit} Jahren liegt kein vollständiger
            historischer Zeitraum vor.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-nebel">
            Wählen Sie eine kürzere Laufzeit (maximal {laufzeitMax} Jahre).
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-sm bg-graphit p-8">
              <p className="font-display text-base font-bold uppercase tracking-wide text-white">
                Chance auf ein positives Ergebnis
              </p>
              <p className="mt-2 text-sm text-nebel">
                Endkapital lag über der eingezahlten Summe
              </p>
              <p className="mt-6 font-display text-4xl font-bold text-white">
                {formatPercent(100 - ergebnis.wahrscheinlichkeitVerlust, 10)}
              </p>
              {ergebnis.schlechtestesFenster && ergebnis.bestesFenster && (
                <p className="mt-2 text-sm text-nebel">
                  Schlechtester Zeitraum: {ergebnis.schlechtestesFenster.startJahr}–
                  {ergebnis.schlechtestesFenster.endJahr} (
                  {formatEUR(ergebnis.schlechtestesFenster.endwert)} aus{" "}
                  {formatEUR(ergebnis.schlechtestesFenster.eingezahlt)} eingezahlt)
                </p>
              )}
            </div>

            <div className="rounded-sm bg-graphit p-8">
              <p className="font-display text-base font-bold uppercase tracking-wide text-gold">
                Historische Verlustwahrscheinlichkeit
              </p>
              <p className="mt-2 text-sm text-nebel">
                {formatEUR(sparrate)}/Monat über {laufzeit} Jahre –
                Anteil der historischen Zeiträume mit weniger Endkapital als
                eingezahlt
              </p>
              <p className="mt-6 font-display text-4xl font-bold text-gold">
                {formatPercent(ergebnis.wahrscheinlichkeitVerlust, 10)}
              </p>
              <p className="mt-2 text-sm text-nebel">
                {ergebnis.anzahlVerlust} von {ergebnis.anzahlFenster}{" "}
                untersuchten Zeiträumen ({ersterStartJahr}–
                {ersterStartJahr !== undefined ? ersterStartJahr + laufzeit - 1 : ""}{" "}
                bis {letzterStartJahr}–{LETZTES_VOLLSTAENDIGES_JAHR})
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-gold/30 bg-gold/5 px-6 py-5">
            <p className="text-sm leading-relaxed text-nebel">
              Zum Vergleich: Das statistische Risiko „
              <span className="text-white">{vergleich.name}</span>" liegt bei
              etwa {formatNenner(vergleich.nenner)} – eine ähnliche
              Größenordnung wie Ihre historische Verlustwahrscheinlichkeit.
            </p>
            <p className="mt-3 text-xs text-nebel/60">
              Alle Vergleichswerte sind grobe, kursierende Schätzungen zur
              Veranschaulichung, keine wissenschaftlich geprüfte Statistik.
            </p>
          </div>

          <div className="rounded-sm bg-onyx p-8">
            <p className="text-xs uppercase tracking-wide text-nebel/60">
              Alle untersuchten Zeiträume
            </p>
            <div className="mt-4 max-h-96 overflow-y-auto overflow-x-auto">
              <table className="w-full min-w-[420px] text-sm">
                <thead className="sticky top-0 bg-onyx text-xs uppercase tracking-wide text-nebel/60">
                  <tr>
                    <th className="py-2 pr-4 text-left font-medium">Zeitraum</th>
                    <th className="py-2 pr-4 text-right font-medium">Eingezahlt</th>
                    <th className="py-2 pr-4 text-right font-medium">Endkapital</th>
                    <th className="py-2 text-right font-medium">Ergebnis</th>
                  </tr>
                </thead>
                <tbody>
                  {ergebnis.fenster.map((f) => (
                    <tr key={f.startJahr} className="border-t border-white/10">
                      <td className="py-2 pr-4 text-nebel">
                        {f.startJahr}–{f.endJahr}
                      </td>
                      <td className="py-2 pr-4 text-right text-nebel">
                        {formatEUR(f.eingezahlt)}
                      </td>
                      <td className="py-2 pr-4 text-right text-white">
                        {formatEUR(f.endwert)}
                      </td>
                      <td
                        className={`py-2 text-right font-medium ${
                          f.verlust ? "text-red-400" : "text-emerald-400"
                        }`}
                      >
                        {f.verlust ? "Verlust" : "Gewinn"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="rounded-sm bg-onyx p-8">
        <p className="text-xs uppercase tracking-wide text-nebel/60">
          Methodik &amp; wichtige Hinweise
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-nebel">
          <li>
            Für jeden historisch möglichen Startjahrgang wird ein Sparplan
            über die gewählte Laufzeit mit den echten Kalenderjahres-Renditen
            des {index.name} simuliert. Verglichen wird das Endkapital mit
            der Summe der Einzahlungen (nominal, ohne Inflation).
          </li>
          <li>
            Der Jahresbeitrag (12 Monatsraten) wird vereinfachend als zu
            Jahresbeginn eingezahlt behandelt und erhält die volle
            Jahresrendite dieses Jahres – eine monatsgenaue Analyse ist auf
            Basis von Jahresdaten nicht seriös möglich.
          </li>
          <li>
            {index.name} ist ein Net-Total-Return-Index in USD und keine
            Zelle-für-Zelle verifizierte Datenreihe, sondern ein sorgfältiger
            Näherungswert. Wechselkurseffekte, Kosten (z. B. TER,
            Ausgabeaufschläge) und Steuern sind nicht berücksichtigt.
          </li>
          <li>
            <span className="text-white">
              Vergangene Wertentwicklung ist kein Indikator für die
              zukünftige Entwicklung.
            </span>{" "}
            Die historische Verlustwahrscheinlichkeit ist keine Prognose und
            keine Garantie – zukünftige Marktphasen können deutlich
            ungünstiger oder günstiger verlaufen als jeder Zeitraum in den
            vorliegenden Daten.
          </li>
        </ul>
      </div>

      <Link
        href={CAL_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-sm bg-gold px-7 py-3.5 text-center text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
      >
        Persönliche Anlagestrategie besprechen
      </Link>
    </div>
  );
}
