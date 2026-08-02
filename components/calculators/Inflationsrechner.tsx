"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";

export default function Inflationsrechner() {
  const [betrag, setBetrag] = useState(10000);
  const [inflation, setInflation] = useState(2.5);
  const [jahre, setJahre] = useState(15);

  const result = useMemo(() => {
    const kaufkraft = betrag / Math.pow(1 + inflation / 100, jahre);
    const nominalBedarf = betrag * Math.pow(1 + inflation / 100, jahre);
    const kaufkraftverlust = 100 - (kaufkraft / betrag) * 100;

    return { kaufkraft, nominalBedarf, kaufkraftverlust };
  }, [betrag, inflation, jahre]);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <NumberField
          label="Betrag heute"
          suffix="€"
          value={betrag}
          onChange={setBetrag}
          step={500}
        />
        <NumberField
          label="Erwartete Inflation p. a."
          suffix="%"
          value={inflation}
          onChange={setInflation}
          step={0.1}
          max={15}
        />
        <NumberField
          label="Zeitraum"
          suffix="Jahre"
          value={jahre}
          onChange={setJahre}
          step={1}
          max={50}
        />
      </div>

      <div className="rounded-sm bg-onyx p-8">
        <ResultRow
          label={`Kaufkraft von ${formatEUR(betrag)} in ${jahre} Jahren`}
          value={formatEUR(result.kaufkraft)}
          emphasis
        />
        <ResultRow
          label="Kaufkraftverlust"
          value={`${result.kaufkraftverlust.toFixed(1)} %`}
        />
        <ResultRow
          label="Nominal nötig für gleiche Kaufkraft"
          value={formatEUR(result.nominalBedarf)}
        />
      </div>
    </div>
  );
}
