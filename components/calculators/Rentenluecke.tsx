"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";

export default function Rentenluecke() {
  const [wunsch, setWunsch] = useState(2500);
  const [gesetzlich, setGesetzlich] = useState(1400);
  const [sonstige, setSonstige] = useState(200);

  const result = useMemo(() => {
    const luecke = wunsch - gesetzlich - sonstige;
    return { luecke: Math.max(luecke, 0), ueberschuss: Math.max(-luecke, 0) };
  }, [wunsch, gesetzlich, sonstige]);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <NumberField
          label="Gewünschtes Nettoeinkommen im Ruhestand"
          suffix="€/Monat"
          value={wunsch}
          onChange={setWunsch}
          step={100}
        />
        <NumberField
          label="Erwartete gesetzliche Rente (lt. Renteninformation)"
          suffix="€/Monat"
          value={gesetzlich}
          onChange={setGesetzlich}
          step={50}
        />
        <NumberField
          label="Betriebsrente & sonstige Vorsorge"
          suffix="€/Monat"
          value={sonstige}
          onChange={setSonstige}
          step={50}
        />
      </div>

      <div className="rounded-sm bg-onyx p-8">
        {result.luecke > 0 ? (
          <ResultRow
            label="Monatliche Versorgungslücke"
            value={formatEUR(result.luecke)}
            emphasis
          />
        ) : (
          <ResultRow
            label="Monatlicher Überschuss"
            value={formatEUR(result.ueberschuss)}
            emphasis
          />
        )}
        <p className="mt-4 text-xs leading-relaxed text-nebel">
          Die genaue Höhe Ihrer gesetzlichen Rente entnehmen Sie Ihrer
          jährlichen Renteninformation der Deutschen Rentenversicherung.
        </p>
      </div>
    </div>
  );
}
