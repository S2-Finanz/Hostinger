"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR, formatPercent } from "@/components/calculators/ui";
import Jahrestabelle from "@/components/calculators/Jahrestabelle";
import PdfExportButton from "@/components/calculators/PdfExportButton";
import { berechneSparplan } from "@/lib/sparplan";
import { exportSparplanPdf } from "@/lib/sparplan-pdf";

export default function Sparrechner() {
  const [einmalbetrag, setEinmalbetrag] = useState(5000);
  const [sparrate, setSparrate] = useState(200);
  const [dynamik, setDynamik] = useState(0);
  const [kurszuwachs, setKurszuwachs] = useState(5);
  const [ausgabeaufschlag, setAusgabeaufschlag] = useState(0);
  const [verwaltungsgebuehr, setVerwaltungsgebuehr] = useState(0);
  const [jahre, setJahre] = useState(20);

  const eingabe = useMemo(
    () => ({
      einmalbetrag,
      sparrate,
      dynamik,
      kurszuwachs,
      ausgabeaufschlag,
      verwaltungsgebuehr,
      jahre,
    }),
    [einmalbetrag, sparrate, dynamik, kurszuwachs, ausgabeaufschlag, verwaltungsgebuehr, jahre],
  );

  const ergebnis = useMemo(() => berechneSparplan(eingabe), [eingabe]);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-6">
            <NumberField
              label="Startkapital"
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
              step={25}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <NumberField
              label="Dynamik p. a."
              suffix="%"
              value={dynamik}
              onChange={setDynamik}
              step={0.5}
              max={20}
            />
            <NumberField
              label="Erwartete Rendite p. a."
              suffix="%"
              value={kurszuwachs}
              onChange={setKurszuwachs}
              step={0.5}
              max={20}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <NumberField
              label="Ausgabeaufschlag"
              suffix="%"
              value={ausgabeaufschlag}
              onChange={setAusgabeaufschlag}
              step={0.25}
              max={10}
            />
            <NumberField
              label="Verwaltungsgebühr p. a."
              suffix="%"
              value={verwaltungsgebuehr}
              onChange={setVerwaltungsgebuehr}
              step={0.05}
              max={5}
            />
          </div>

          <NumberField
            label="Laufzeit"
            suffix="Jahre"
            value={jahre}
            onChange={setJahre}
            step={1}
            min={1}
            max={50}
          />
        </div>

        <div className="rounded-sm bg-onyx p-8">
          <ResultRow label="Endwert" value={formatEUR(ergebnis.endwert)} emphasis />
          <ResultRow
            label="Eingezahltes Kapital"
            value={formatEUR(ergebnis.einzahlungenGesamt)}
          />
          <ResultRow label="Gewinn nach Gebühren" value={formatEUR(ergebnis.gewinnNachGebuehren)} />
          <ResultRow label="Gebühren gesamt" value={`-${formatEUR(ergebnis.gebuehrenGesamt)}`} />
          <ResultRow
            label="Effektive Rendite (IRR)"
            value={formatPercent(ergebnis.effektiveRendite)}
          />

          <div className="mt-6">
            <PdfExportButton
              onClick={() => exportSparplanPdf("Sparrechner S² Finanz", eingabe, ergebnis)}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-white">
          Wertentwicklung (Jahressummen)
        </h3>
        <div className="mt-4">
          <Jahrestabelle jahreswerte={ergebnis.jahreswerte} />
        </div>
      </div>
    </div>
  );
}
