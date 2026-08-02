"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";

function endkapital(start: number, rate: number, jahresRendite: number, jahre: number) {
  const i = jahresRendite / 100 / 12;
  const n = jahre * 12;
  const fvStart = start * Math.pow(1 + i, n);
  const fvRate = i === 0 ? rate * n : rate * ((Math.pow(1 + i, n) - 1) / i);
  return fvStart + fvRate;
}

export default function EtfSparplanrechner() {
  const [start, setStart] = useState(2000);
  const [rate, setRate] = useState(250);
  const [rendite, setRendite] = useState(7);
  const [kosten, setKosten] = useState(0.2);
  const [jahre, setJahre] = useState(20);

  const result = useMemo(() => {
    const brutto = endkapital(start, rate, rendite, jahre);
    const netto = endkapital(start, rate, rendite - kosten, jahre);
    const eingezahlt = start + rate * jahre * 12;

    return {
      netto,
      eingezahlt,
      ertrag: netto - eingezahlt,
      kostenImpact: brutto - netto,
    };
  }, [start, rate, rendite, kosten, jahre]);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <NumberField
          label="Startkapital"
          suffix="€"
          value={start}
          onChange={setStart}
          step={500}
        />
        <NumberField
          label="Monatliche Sparrate"
          suffix="€"
          value={rate}
          onChange={setRate}
          step={25}
        />
        <NumberField
          label="Erwartete Rendite p. a."
          suffix="%"
          value={rendite}
          onChange={setRendite}
          step={0.5}
          max={20}
        />
        <NumberField
          label="Laufende Kosten (TER) p. a."
          suffix="%"
          value={kosten}
          onChange={setKosten}
          step={0.05}
          max={5}
        />
        <NumberField
          label="Laufzeit"
          suffix="Jahre"
          value={jahre}
          onChange={setJahre}
          step={1}
          max={50}
        />
      </div>

      <div className="rounded-sm bg-onyx p-8">
        <ResultRow
          label="Endkapital (nach Kosten)"
          value={formatEUR(result.netto)}
          emphasis
        />
        <ResultRow
          label="Eingezahltes Kapital"
          value={formatEUR(result.eingezahlt)}
        />
        <ResultRow label="Ertrag" value={formatEUR(result.ertrag)} />
        <ResultRow
          label="Kosten (TER) über die Laufzeit"
          value={formatEUR(result.kostenImpact)}
        />
      </div>
    </div>
  );
}
