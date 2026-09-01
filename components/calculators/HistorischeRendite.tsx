"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";
import { NumberField, SliderField, formatEUR } from "@/components/calculators/ui";
import {
  INDIZES,
  LETZTES_VOLLSTAENDIGES_JAHR,
  berechneEinmalanlage,
  berechneSparplan,
  findIndex,
  type IndexId,
} from "@/lib/indexrendite";

const GEBURTSJAHR_MIN = 1928;

function formatMultiplikator(value: number): string {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export default function HistorischeRendite() {
  const [geburtsjahr, setGeburtsjahr] = useState(1990);
  const [indexId, setIndexId] = useState<IndexId>("sp500");
  const [einmalbetrag, setEinmalbetrag] = useState(10000);
  const [sparrate, setSparrate] = useState(50);

  const index = findIndex(indexId);
  const keineDaten = geburtsjahr < index.ersteJahr;

  const einmal = useMemo(
    () =>
      keineDaten
        ? null
        : berechneEinmalanlage(indexId, geburtsjahr, einmalbetrag),
    [keineDaten, indexId, geburtsjahr, einmalbetrag],
  );
  const sparplan = useMemo(
    () =>
      keineDaten ? null : berechneSparplan(indexId, geburtsjahr, sparrate),
    [keineDaten, indexId, geburtsjahr, sparrate],
  );

  const nochNicht18 = geburtsjahr + 17 > LETZTES_VOLLSTAENDIGES_JAHR;

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-6 rounded-sm bg-onyx p-8 md:grid-cols-2">
        <SliderField
          label="Geburtsjahr"
          value={geburtsjahr}
          onChange={setGeburtsjahr}
          min={GEBURTSJAHR_MIN}
          max={LETZTES_VOLLSTAENDIGES_JAHR}
        />

        <label className="block">
          <span className="text-sm text-nebel">Index</span>
          <select
            value={indexId}
            onChange={(e) => setIndexId(e.target.value as IndexId)}
            className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-lg text-white outline-none focus:border-gold"
          >
            {INDIZES.map((i) => (
              <option key={i.id} value={i.id} className="bg-graphit">
                {i.name} {i.verifiziert ? "· verifiziert" : "· Schätzwert"}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-nebel">
            {index.region} · {index.waehrung} · {index.typ} · Daten ab{" "}
            {index.ersteJahr}
            {!index.verifiziert &&
              " · Schätzwert, nicht gegen Primärquelle verifiziert"}
          </p>
        </label>

        <NumberField
          label="Einmalbetrag bei Geburt"
          suffix="€"
          value={einmalbetrag}
          onChange={setEinmalbetrag}
          step={500}
        />

        <NumberField
          label="Monatliche Sparrate (bis zum 18. Geburtstag)"
          suffix="€"
          value={sparrate}
          onChange={setSparrate}
          step={10}
        />
      </div>

      {keineDaten ? (
        <div className="rounded-sm border border-gold/40 bg-onyx p-8 text-center">
          <p className="font-display text-lg font-semibold text-white">
            Für {index.name} liegen erst ab Geburtsjahr {index.ersteJahr}{" "}
            Daten vor.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-nebel">
            Wählen Sie ein späteres Geburtsjahr oder einen Index mit längerer
            Historie, z. B. S&P 500 (ab 1928) oder DAX (ab 1959).
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-sm bg-graphit p-8">
            <p className="text-xs uppercase tracking-wide text-nebel/60">
              Einmalanlage bei Geburt
            </p>
            <p className="mt-2 text-sm text-nebel">
              {formatEUR(einmalbetrag)} einmalig investiert in {geburtsjahr}
            </p>
            <p className="mt-6 font-display text-3xl font-bold text-gold">
              {formatEUR(einmal!.endwert)}
            </p>
            <p className="mt-2 text-sm text-nebel">
              Stand Ende {LETZTES_VOLLSTAENDIGES_JAHR} · das{" "}
              {formatMultiplikator(einmal!.endwert / einmalbetrag)}-Fache des
              Einsatzes über {einmal!.jahre} Jahre
            </p>
          </div>

          <div className="rounded-sm bg-graphit p-8">
            <p className="text-xs uppercase tracking-wide text-nebel/60">
              Sparplan bis zum 18. Geburtstag
            </p>
            <p className="mt-2 text-sm text-nebel">
              {formatEUR(sparrate)}/Monat von {geburtsjahr} bis{" "}
              {geburtsjahr + 17}, danach keine weiteren Einzahlungen
            </p>
            <p className="mt-6 font-display text-3xl font-bold text-gold">
              {formatEUR(sparplan!.endwert)}
            </p>
            <p className="mt-2 text-sm text-nebel">
              Stand Ende {LETZTES_VOLLSTAENDIGES_JAHR} · eingezahlt:{" "}
              {formatEUR(sparplan!.eingezahlt)} · Wertzuwachs:{" "}
              {formatEUR(sparplan!.endwert - sparplan!.eingezahlt)}
            </p>
            {nochNicht18 && (
              <p className="mt-3 text-xs leading-relaxed text-nebel">
                Diese Person ist heute noch keine 18 Jahre alt – die
                Sparphase läuft in der Realität noch weiter. Der Endwert
                unterstellt durchgehende Einzahlung bis{" "}
                {Math.min(geburtsjahr + 17, LETZTES_VOLLSTAENDIGES_JAHR)}.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="rounded-sm bg-onyx p-8">
        <p className="text-xs uppercase tracking-wide text-nebel/60">
          Methodik &amp; wichtige Hinweise
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-nebel">
          <li>
            Die Berechnung nutzt ausschließlich echte Kalenderjahres-
            Renditen (Indexstand 31.12. zu 31.12.). Der tatsächliche
            Geburtstag oder Einzahlungszeitpunkt innerhalb eines Jahres wird
            nicht berücksichtigt – eine monatsgenaue Analyse ist auf Basis
            von Jahresdaten nicht seriös möglich.
          </li>
          <li>
            Beim Sparplan wird die Summe der zwölf Monatsraten eines Jahres
            vereinfachend als zu Jahresbeginn eingezahlt behandelt und
            erhält die volle Jahresrendite dieses Jahres.
          </li>
          <li>
            Nur S&P 500 und DAX sind Zelle für Zelle gegen eine externe
            Quelle verifiziert. Alle anderen Indizes sind sorgfältige, aber
            ungeprüfte Näherungswerte mit einer erwartbaren Abweichung von
            meist unter einem Prozentpunkt pro Jahr – einzelne Jahre können
            deutlicher abweichen.
          </li>
          <li>
            Kursindizes (u. a. S&P 500, Nikkei, CAC 40) bilden nur die
            Kursentwicklung ab, Dividenden fehlen. Performanceindizes (DAX,
            MDAX) und die MSCI-Net-Reihen enthalten Dividenden – ein
            direkter Vergleich zwischen beiden Indextypen ist dadurch
            systematisch verzerrt.
          </li>
          <li>
            Jede Reihe steht in ihrer Heimatwährung (MSCI-Reihen in USD).
            Wechselkurseffekte, Kosten (z. B. Ausgabeaufschläge, TER) und
            Steuern sind nicht berücksichtigt.
          </li>
          <li>
            Vergangene Wertentwicklung ist kein Indikator für die
            zukünftige Entwicklung.
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
