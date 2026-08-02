"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";

const MAX_JAHRESBEITRAG = 6840;
const ZULAGE_STUFE_1_GRENZE = 360;
const ZULAGE_STUFE_1_SATZ = 0.5;
const ZULAGE_STUFE_2_GRENZE = 1800;
const ZULAGE_STUFE_2_SATZ = 0.25;

function berechneZulage(jahresbeitrag: number): number {
  const stufe1 = Math.min(jahresbeitrag, ZULAGE_STUFE_1_GRENZE) * ZULAGE_STUFE_1_SATZ;
  const stufe2Basis = Math.max(
    Math.min(jahresbeitrag, ZULAGE_STUFE_2_GRENZE) - ZULAGE_STUFE_1_GRENZE,
    0,
  );
  const stufe2 = stufe2Basis * ZULAGE_STUFE_2_SATZ;
  return stufe1 + stufe2;
}

export default function Altersvorsorgedepot() {
  const [monatlich, setMonatlich] = useState(150);
  const [rendite, setRendite] = useState(6);
  const [jahre, setJahre] = useState(30);

  const result = useMemo(() => {
    const jahresbeitrag = Math.min(monatlich * 12, MAX_JAHRESBEITRAG);
    const zulage = berechneZulage(jahresbeitrag);
    const gesamtMonatlich = (jahresbeitrag + zulage) / 12;

    const i = rendite / 100 / 12;
    const n = jahre * 12;
    const endkapital =
      i === 0 ? gesamtMonatlich * n : gesamtMonatlich * ((Math.pow(1 + i, n) - 1) / i);

    const eingezahlt = jahresbeitrag * jahre;
    const zulagenGesamt = zulage * jahre;
    const ertrag = endkapital - eingezahlt - zulagenGesamt;

    return { zulage, endkapital, eingezahlt, zulagenGesamt, ertrag };
  }, [monatlich, rendite, jahre]);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <NumberField
          label="Monatlicher Eigenbeitrag"
          suffix="€"
          value={monatlich}
          onChange={setMonatlich}
          step={10}
          max={570}
        />
        <NumberField
          label="Erwartete Rendite p. a."
          suffix="%"
          value={rendite}
          onChange={setRendite}
          step={0.5}
          max={15}
        />
        <NumberField
          label="Anlagedauer bis zur Auszahlung"
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
          label="Eigene Einzahlungen gesamt"
          value={formatEUR(result.eingezahlt)}
        />
        <ResultRow
          label="Staatliche Zulage pro Jahr"
          value={formatEUR(result.zulage)}
        />
        <ResultRow
          label="Staatliche Zulagen gesamt"
          value={formatEUR(result.zulagenGesamt)}
        />
        <ResultRow label="Ertrag" value={formatEUR(result.ertrag)} />
      </div>
    </div>
  );
}
