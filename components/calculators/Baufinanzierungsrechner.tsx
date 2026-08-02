"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";

export default function Baufinanzierungsrechner() {
  const [darlehen, setDarlehen] = useState(350000);
  const [zins, setZins] = useState(3.8);
  const [tilgung, setTilgung] = useState(2);
  const [zinsbindung, setZinsbindung] = useState(10);

  const result = useMemo(() => {
    const monatsrate = (darlehen * (zins + tilgung)) / 100 / 12;
    const i = zins / 100 / 12;
    const n = zinsbindung * 12;
    const restschuld =
      i === 0
        ? Math.max(darlehen - monatsrate * n, 0)
        : Math.max(
            darlehen * Math.pow(1 + i, n) -
              monatsrate * ((Math.pow(1 + i, n) - 1) / i),
            0,
          );
    const zinskostenJahr1 = darlehen * (zins / 100);

    return { monatsrate, restschuld, zinskostenJahr1 };
  }, [darlehen, zins, tilgung, zinsbindung]);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <NumberField
          label="Darlehenssumme"
          suffix="€"
          value={darlehen}
          onChange={setDarlehen}
          step={5000}
        />
        <NumberField
          label="Sollzins p. a."
          suffix="%"
          value={zins}
          onChange={setZins}
          step={0.1}
          max={15}
        />
        <NumberField
          label="Anfängliche Tilgung p. a."
          suffix="%"
          value={tilgung}
          onChange={setTilgung}
          step={0.5}
          max={10}
        />
        <NumberField
          label="Zinsbindung"
          suffix="Jahre"
          value={zinsbindung}
          onChange={setZinsbindung}
          step={1}
          max={30}
        />
      </div>

      <div className="rounded-sm bg-onyx p-8">
        <ResultRow
          label="Monatliche Rate"
          value={formatEUR(result.monatsrate)}
          emphasis
        />
        <ResultRow
          label="Zinskosten im ersten Jahr"
          value={formatEUR(result.zinskostenJahr1)}
        />
        <ResultRow
          label={`Restschuld nach ${zinsbindung} Jahren`}
          value={formatEUR(result.restschuld)}
        />
      </div>
    </div>
  );
}
