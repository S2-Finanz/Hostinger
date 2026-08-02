"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow } from "@/components/calculators/ui";

export default function Entnahmerechner() {
  const [kapital, setKapital] = useState(400000);
  const [entnahme, setEntnahme] = useState(1500);
  const [rendite, setRendite] = useState(4);

  const result = useMemo(() => {
    const i = rendite / 100 / 12;

    if (entnahme <= kapital * i) {
      return { unbegrenzt: true, jahre: 0, monate: 0 };
    }

    const x = entnahme / (entnahme - kapital * i);
    const nMonate = Math.log(x) / Math.log(1 + i);

    return {
      unbegrenzt: false,
      jahre: Math.floor(nMonate / 12),
      monate: Math.round(nMonate % 12),
    };
  }, [kapital, entnahme, rendite]);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <NumberField
          label="Vorhandenes Kapital"
          suffix="€"
          value={kapital}
          onChange={setKapital}
          step={5000}
        />
        <NumberField
          label="Monatliche Entnahme"
          suffix="€"
          value={entnahme}
          onChange={setEntnahme}
          step={50}
        />
        <NumberField
          label="Erwartete Rendite p. a."
          suffix="%"
          value={rendite}
          onChange={setRendite}
          step={0.5}
          max={15}
        />
      </div>

      <div className="rounded-sm bg-onyx p-8">
        {result.unbegrenzt ? (
          <ResultRow
            label="Kapital reicht"
            value="Theoretisch unbegrenzt"
            emphasis
          />
        ) : (
          <ResultRow
            label="Kapital reicht für"
            value={`${result.jahre} Jahre, ${result.monate} Monate`}
            emphasis
          />
        )}
        <p className="mt-4 text-xs leading-relaxed text-nebel">
          {result.unbegrenzt
            ? "Ihre Entnahme liegt unter dem erwarteten Ertrag – das Kapital baut sich rechnerisch nicht ab."
            : "Angenommen: konstante Rendite und konstante monatliche Entnahme, ohne Inflation oder Steuern."}
        </p>
      </div>
    </div>
  );
}
