"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";

export default function Arbeitskraftrechner() {
  const [netto, setNetto] = useState(3000);
  const [grad, setGrad] = useState(75);

  const result = useMemo(() => {
    const empfehlung = netto * (grad / 100);
    return { empfehlung };
  }, [netto, grad]);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <NumberField
          label="Monatliches Nettoeinkommen"
          suffix="€"
          value={netto}
          onChange={setNetto}
          step={100}
        />
        <NumberField
          label="Gewünschter Absicherungsgrad"
          suffix="%"
          value={grad}
          onChange={setGrad}
          step={5}
          max={100}
        />
      </div>

      <div className="rounded-sm bg-onyx p-8">
        <ResultRow
          label="Empfohlene monatliche Absicherungshöhe"
          value={formatEUR(result.empfehlung)}
          emphasis
        />
        <p className="mt-4 text-xs leading-relaxed text-nebel">
          Faustregel: 70–80 % des Nettoeinkommens, damit Ihr Lebensstandard
          auch bei Berufsunfähigkeit weitgehend erhalten bleibt.
        </p>
      </div>
    </div>
  );
}
