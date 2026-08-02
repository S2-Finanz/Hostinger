"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";

export default function Sparrechner() {
  const [start, setStart] = useState(5000);
  const [rate, setRate] = useState(200);
  const [zins, setZins] = useState(5);
  const [jahre, setJahre] = useState(20);

  const result = useMemo(() => {
    const i = zins / 100 / 12;
    const n = jahre * 12;

    const fvStart = start * Math.pow(1 + i, n);
    const fvRate =
      i === 0 ? rate * n : rate * ((Math.pow(1 + i, n) - 1) / i);

    const endkapital = fvStart + fvRate;
    const eingezahlt = start + rate * n;
    const ertrag = endkapital - eingezahlt;

    return { endkapital, eingezahlt, ertrag };
  }, [start, rate, zins, jahre]);

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
          value={zins}
          onChange={setZins}
          step={0.5}
          max={20}
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
          label="Voraussichtliches Endkapital"
          value={formatEUR(result.endkapital)}
          emphasis
        />
        <ResultRow
          label="Eingezahltes Kapital"
          value={formatEUR(result.eingezahlt)}
        />
        <ResultRow label="Ertrag" value={formatEUR(result.ertrag)} />
      </div>
    </div>
  );
}
