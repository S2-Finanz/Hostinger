"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";

function endkapitalBeiRendite(
  einmalbetrag: number,
  sparrate: number,
  renditeProzent: number,
  jahre: number,
): number {
  const r = renditeProzent / 100;
  const fvEinmalbetrag = einmalbetrag * Math.pow(1 + r, jahre);

  const monatsrendite = Math.pow(1 + r, 1 / 12) - 1;
  const monate = jahre * 12;
  const fvSparplan =
    Math.abs(monatsrendite) < 1e-9
      ? sparrate * monate
      : sparrate * ((Math.pow(1 + monatsrendite, monate) - 1) / monatsrendite);

  return fvEinmalbetrag + fvSparplan;
}

function renditeFuerZiel(
  einmalbetrag: number,
  sparrate: number,
  ziel: number,
  jahre: number,
): number {
  let low = -99;
  let high = 100;
  for (let i = 0; i < 100; i++) {
    const mitte = (low + high) / 2;
    const fv = endkapitalBeiRendite(einmalbetrag, sparrate, mitte, jahre);
    if (fv < ziel) low = mitte;
    else high = mitte;
  }
  return (low + high) / 2;
}

export default function Inflationsrechner() {
  const [einmalbetrag, setEinmalbetrag] = useState(0);
  const [sparrate, setSparrate] = useState(100);
  const [jahre, setJahre] = useState(35);
  const [inflation, setInflation] = useState(2.5);
  const [renditeEingabe, setRenditeEingabe] = useState<number | "">("");
  const [zielbetrag, setZielbetrag] = useState(60000);

  const result = useMemo(() => {
    const eingezahlt = einmalbetrag + sparrate * 12 * jahre;

    if (renditeEingabe === "") {
      if (eingezahlt <= 0) {
        return { fehler: "Bitte Einmalbetrag oder Sparrate angeben." as const };
      }
      if (zielbetrag <= 0) {
        return { fehler: "Bitte eine Ablaufleistung größer als 0 € angeben." as const };
      }

      const rendite = renditeFuerZiel(einmalbetrag, sparrate, zielbetrag, jahre);
      return berechneErgebnis(eingezahlt, zielbetrag, rendite, inflation, jahre);
    }

    const endkapital = endkapitalBeiRendite(einmalbetrag, sparrate, renditeEingabe, jahre);
    return berechneErgebnis(eingezahlt, endkapital, renditeEingabe, inflation, jahre);
  }, [einmalbetrag, sparrate, jahre, inflation, renditeEingabe, zielbetrag]);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-6">
          <NumberField
            label="Einmalbetrag"
            suffix="€"
            value={einmalbetrag}
            onChange={setEinmalbetrag}
            step={500}
          />
          <NumberField
            label="Monatliche Sparrate"
            suffix="€"
            value={sparrate}
            onChange={setSparrate}
            step={10}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <NumberField
            label="Laufzeit"
            suffix="Jahre"
            value={jahre}
            onChange={setJahre}
            step={1}
            min={1}
            max={60}
          />
          <NumberField
            label="Erwartete Inflation p. a."
            suffix="%"
            value={inflation}
            onChange={setInflation}
            step={0.1}
            max={15}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <label className="block">
            <span className="text-sm text-nebel">Rendite p. a. (leer = berechnen)</span>
            <div className="mt-2 flex items-center gap-2 border-b border-white/20 pb-2 focus-within:border-gold">
              <input
                type="number"
                inputMode="decimal"
                value={renditeEingabe}
                step={0.1}
                placeholder="wird berechnet"
                onChange={(e) =>
                  setRenditeEingabe(e.target.value === "" ? "" : e.target.valueAsNumber)
                }
                className="w-full bg-transparent text-lg text-white outline-none placeholder:text-sm placeholder:text-nebel/50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-sm text-nebel">%</span>
            </div>
          </label>

          <label className="block">
            <span className="text-sm text-nebel">
              {renditeEingabe === "" ? "Ablaufleistung (Ziel)" : "Ablaufleistung (berechnet)"}
            </span>
            <div
              className={`mt-2 flex items-center gap-2 border-b pb-2 ${
                renditeEingabe === ""
                  ? "border-white/20 focus-within:border-gold"
                  : "border-white/10"
              }`}
            >
              <input
                type="number"
                inputMode="decimal"
                value={
                  renditeEingabe === ""
                    ? zielbetrag
                    : Math.round("endkapital" in result ? result.endkapital : 0)
                }
                step={500}
                disabled={renditeEingabe !== ""}
                onChange={(e) => setZielbetrag(e.target.valueAsNumber || 0)}
                className={`w-full bg-transparent text-lg outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
                  renditeEingabe === "" ? "text-white" : "text-nebel"
                }`}
              />
              <span className="text-sm text-nebel">€</span>
            </div>
          </label>
        </div>
      </div>

      <div className="rounded-sm bg-onyx p-8">
        {"fehler" in result ? (
          <p className="text-sm text-nebel">{result.fehler}</p>
        ) : (
          <>
            <ResultRow label="Eingezahltes Kapital" value={formatEUR(result.eingezahlt)} />
            <ResultRow
              label={`Ablaufleistung nach ${jahre} Jahren`}
              value={formatEUR(result.endkapital)}
              emphasis
            />
            <ResultRow label="Ertrag (nominal)" value={formatEUR(result.ertrag)} />
            <ResultRow label="Nominale Rendite p. a." value={`${result.rendite.toFixed(2)} %`} />
            <ResultRow
              label="Reale Rendite p. a. nach Inflation"
              value={`${result.realeRendite.toFixed(2)} %`}
            />
            <ResultRow
              label="Kaufkraft der Ablaufleistung heute"
              value={formatEUR(result.kaufkraft)}
            />
            <ResultRow
              label="Kaufkraftverlust durch Inflation"
              value={`${result.kaufkraftverlust.toFixed(1)} %`}
            />
          </>
        )}
      </div>
    </div>
  );
}

function berechneErgebnis(
  eingezahlt: number,
  endkapital: number,
  rendite: number,
  inflation: number,
  jahre: number,
) {
  const ertrag = endkapital - eingezahlt;
  const realeRendite = ((1 + rendite / 100) / (1 + inflation / 100) - 1) * 100;
  const kaufkraft = endkapital / Math.pow(1 + inflation / 100, jahre);
  const kaufkraftverlust = endkapital > 0 ? 100 - (kaufkraft / endkapital) * 100 : 0;

  return { eingezahlt, endkapital, ertrag, rendite, realeRendite, kaufkraft, kaufkraftverlust };
}
