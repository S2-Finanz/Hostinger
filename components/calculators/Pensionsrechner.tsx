"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";

const SATZ_PRO_JAHR = 1.79375;
const MAX_SATZ = 71.75;

export default function Pensionsrechner() {
  const [gehalt, setGehalt] = useState(5500);
  const [dienstjahre, setDienstjahre] = useState(35);

  const result = useMemo(() => {
    const ruhegehaltssatz = Math.min(
      dienstjahre * SATZ_PRO_JAHR,
      MAX_SATZ,
    );
    const pension = gehalt * (ruhegehaltssatz / 100);
    const luecke = gehalt - pension;

    return { ruhegehaltssatz, pension, luecke };
  }, [gehalt, dienstjahre]);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <NumberField
          label="Ruhegehaltfähige Dienstbezüge (Endgehalt, brutto/Monat)"
          suffix="€"
          value={gehalt}
          onChange={setGehalt}
          step={100}
        />
        <NumberField
          label="Voraussichtliche ruhegehaltfähige Dienstjahre"
          suffix="Jahre"
          value={dienstjahre}
          onChange={setDienstjahre}
          step={1}
          max={45}
        />
      </div>

      <div className="rounded-sm bg-onyx p-8">
        <ResultRow
          label="Ruhegehaltssatz"
          value={`${result.ruhegehaltssatz.toFixed(2)} %`}
        />
        <ResultRow
          label="Voraussichtliche Pension (brutto/Monat)"
          value={formatEUR(result.pension)}
          emphasis
        />
        <ResultRow
          label="Versorgungslücke ggü. Endgehalt"
          value={formatEUR(result.luecke)}
        />
      </div>
    </div>
  );
}
