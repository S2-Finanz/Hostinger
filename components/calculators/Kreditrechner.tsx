"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";

export default function Kreditrechner() {
  const [betrag, setBetrag] = useState(20000);
  const [zins, setZins] = useState(6);
  const [jahre, setJahre] = useState(5);

  const result = useMemo(() => {
    const i = zins / 100 / 12;
    const n = jahre * 12;
    const rate =
      i === 0 ? betrag / n : (betrag * i) / (1 - Math.pow(1 + i, -n));
    const gesamtkosten = rate * n;

    return { rate, gesamtkosten, zinskosten: gesamtkosten - betrag };
  }, [betrag, zins, jahre]);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <NumberField
          label="Kreditbetrag"
          suffix="€"
          value={betrag}
          onChange={setBetrag}
          step={500}
        />
        <NumberField
          label="Sollzins p. a."
          suffix="%"
          value={zins}
          onChange={setZins}
          step={0.1}
          max={20}
        />
        <NumberField
          label="Laufzeit"
          suffix="Jahre"
          value={jahre}
          onChange={setJahre}
          step={1}
          max={30}
        />
      </div>

      <div className="rounded-sm bg-onyx p-8">
        <ResultRow
          label="Monatliche Rate"
          value={formatEUR(result.rate)}
          emphasis
        />
        <ResultRow
          label="Gesamtkosten"
          value={formatEUR(result.gesamtkosten)}
        />
        <ResultRow label="Zinskosten" value={formatEUR(result.zinskosten)} />
      </div>
    </div>
  );
}
