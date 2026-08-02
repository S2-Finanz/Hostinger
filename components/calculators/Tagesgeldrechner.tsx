"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";

export default function Tagesgeldrechner() {
  const [betrag, setBetrag] = useState(15000);
  const [zins, setZins] = useState(2.5);
  const [monate, setMonate] = useState(24);

  const result = useMemo(() => {
    const i = zins / 100 / 12;
    const endkapital = betrag * Math.pow(1 + i, monate);
    return { endkapital, ertrag: endkapital - betrag };
  }, [betrag, zins, monate]);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <NumberField
          label="Anlagebetrag"
          suffix="€"
          value={betrag}
          onChange={setBetrag}
          step={500}
        />
        <NumberField
          label="Zinssatz p. a."
          suffix="%"
          value={zins}
          onChange={setZins}
          step={0.1}
          max={15}
        />
        <NumberField
          label="Anlagedauer"
          suffix="Monate"
          value={monate}
          onChange={setMonate}
          step={1}
          max={360}
        />
      </div>

      <div className="rounded-sm bg-onyx p-8">
        <ResultRow
          label="Endkapital"
          value={formatEUR(result.endkapital)}
          emphasis
        />
        <ResultRow label="Zinsertrag" value={formatEUR(result.ertrag)} />
      </div>
    </div>
  );
}
