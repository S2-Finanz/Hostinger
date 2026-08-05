"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR, formatPercent } from "@/components/calculators/ui";
import Jahrestabelle from "@/components/calculators/Jahrestabelle";
import PdfExportButton from "@/components/calculators/PdfExportButton";
import { berechneSparplan } from "@/lib/sparplan";
import { exportSparplanPdf } from "@/lib/sparplan-pdf";

export default function EtfSparplanrechner() {
  const [einmalbetrag, setEinmalbetrag] = useState(2000);
  const [sparrate, setSparrate] = useState(250);
  const [dynamik, setDynamik] = useState(0);
  const [rendite, setRendite] = useState(7);
  const [ausgabeaufschlag, setAusgabeaufschlag] = useState(0);
  const [kosten, setKosten] = useState(0.2);
  const [jahre, setJahre] = useState(20);

  const [vorabpauschaleAktiv, setVorabpauschaleAktiv] = useState(false);
  const [basiszins, setBasiszins] = useState(2.5);
  const [teilfreistellung, setTeilfreistellung] = useState(30);
  const [sparerpauschbetrag, setSparerpauschbetrag] = useState(1000);
  const [steuersatz, setSteuersatz] = useState(26.375);

  const eingabe = useMemo(
    () => ({
      einmalbetrag,
      sparrate,
      dynamik,
      kurszuwachs: rendite,
      ausgabeaufschlag,
      verwaltungsgebuehr: kosten,
      jahre,
      vorabpauschale: vorabpauschaleAktiv
        ? { basiszins, teilfreistellung, sparerpauschbetrag, steuersatz }
        : undefined,
    }),
    [
      einmalbetrag,
      sparrate,
      dynamik,
      rendite,
      ausgabeaufschlag,
      kosten,
      jahre,
      vorabpauschaleAktiv,
      basiszins,
      teilfreistellung,
      sparerpauschbetrag,
      steuersatz,
    ],
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
              value={rendite}
              onChange={setRendite}
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
              label="Laufende Kosten (TER) p. a."
              suffix="%"
              value={kosten}
              onChange={setKosten}
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

          <div className="border-t border-white/10 pt-6">
            <label className="flex items-center gap-3 text-sm text-white">
              <input
                type="checkbox"
                checked={vorabpauschaleAktiv}
                onChange={(e) => setVorabpauschaleAktiv(e.target.checked)}
                className="h-4 w-4 accent-gold"
              />
              Vorabpauschale berücksichtigen
            </label>

            {vorabpauschaleAktiv && (
              <div className="mt-6 flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <NumberField
                    label="Basiszins p. a."
                    suffix="%"
                    value={basiszins}
                    onChange={setBasiszins}
                    step={0.1}
                    max={10}
                  />
                  <NumberField
                    label="Teilfreistellung"
                    suffix="%"
                    value={teilfreistellung}
                    onChange={setTeilfreistellung}
                    step={5}
                    max={100}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <NumberField
                    label="Sparerpauschbetrag p. a."
                    suffix="€"
                    value={sparerpauschbetrag}
                    onChange={setSparerpauschbetrag}
                    step={100}
                    max={4000}
                  />
                  <NumberField
                    label="Steuersatz (inkl. Soli)"
                    suffix="%"
                    value={steuersatz}
                    onChange={setSteuersatz}
                    step={0.125}
                    max={50}
                  />
                </div>
                <p className="text-xs text-nebel">
                  Der Basiszins wird jährlich von der Bundesbank veröffentlicht und ändert sich –
                  bitte den aktuellen Wert prüfen. Teilfreistellung 30 % entspricht dem
                  Standardsatz für Aktienfonds. Der Sparerpauschbetrag wird hier für jedes Jahr in
                  voller Höhe angenommen, unabhängig von sonstigen Kapitalerträgen.
                </p>
              </div>
            )}
          </div>
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
          {vorabpauschaleAktiv && (
            <>
              <ResultRow
                label="Vorabpauschale-Steuer gesamt"
                value={`-${formatEUR(ergebnis.vorabpauschaleGesamt)}`}
              />
              <ResultRow
                label="Minderung durch Vorabpauschale"
                value={`-${formatEUR(ergebnis.minderungDurchVorabpauschale)}`}
              />
            </>
          )}

          <div className="mt-6">
            <PdfExportButton
              onClick={() => exportSparplanPdf("ETF-Sparplanrechner S² Finanz", eingabe, ergebnis)}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-white">
          Wertentwicklung (Jahressummen)
        </h3>
        <div className="mt-4">
          <Jahrestabelle
            jahreswerte={ergebnis.jahreswerte}
            zeigeVorabpauschale={vorabpauschaleAktiv}
          />
        </div>
      </div>
    </div>
  );
}
