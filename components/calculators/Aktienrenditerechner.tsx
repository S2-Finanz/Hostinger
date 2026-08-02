"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";

export default function Aktienrenditerechner() {
  const [start, setStart] = useState(10000);
  const [ende, setEnde] = useState(18000);
  const [jahre, setJahre] = useState(8);

  const result = useMemo(() => {
    const gesamtrendite = start > 0 ? (ende / start - 1) * 100 : 0;
    const cagr =
      start > 0 && jahre > 0
        ? (Math.pow(ende / start, 1 / jahre) - 1) * 100
        : 0;
    const gewinn = ende - start;

    return { gesamtrendite, cagr, gewinn };
  }, [start, ende, jahre]);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <NumberField
          label="Startwert des Investments"
          suffix="€"
          value={start}
          onChange={setStart}
          step={500}
        />
        <NumberField
          label="Endwert des Investments"
          suffix="€"
          value={ende}
          onChange={setEnde}
          step={500}
        />
        <NumberField
          label="Anlagezeitraum"
          suffix="Jahre"
          value={jahre}
          onChange={setJahre}
          step={1}
          max={50}
        />
      </div>

      <div className="rounded-sm bg-onyx p-8">
        <ResultRow
          label="Durchschnittliche Rendite p. a. (CAGR)"
          value={`${result.cagr.toFixed(2)} %`}
          emphasis
        />
        <ResultRow
          label="Gesamtrendite über den Zeitraum"
          value={`${result.gesamtrendite.toFixed(1)} %`}
        />
        <ResultRow label="Gewinn" value={formatEUR(result.gewinn)} />
      </div>
    </div>
  );
}
