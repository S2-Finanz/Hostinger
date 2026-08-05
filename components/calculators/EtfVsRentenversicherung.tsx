"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR, formatPercent } from "@/components/calculators/ui";
import PdfExportButton from "@/components/calculators/PdfExportButton";
import {
  berechneEtfVsRente,
  type AuszahlModus,
  type EtfVsRenteEingabe,
} from "@/lib/etf-vs-rente";
import { exportEtfVsRentePdf } from "@/lib/etf-vs-rente-pdf";

const MODUS_LABEL: Record<AuszahlModus, string> = {
  einmalig: "Einmalauszahlung",
  entnahmeplan: "Entnahmeplan",
  rente: "Lebenslange Rente",
};

export default function EtfVsRentenversicherung() {
  const [einmalbetrag, setEinmalbetrag] = useState(0);
  const [sparrate, setSparrate] = useState(300);
  const [dynamik, setDynamik] = useState(0);
  const [renditeAnsparphase, setRenditeAnsparphase] = useState(6);
  const [ansparJahre, setAnsparJahre] = useState(30);

  const [depotAusgabeaufschlag, setDepotAusgabeaufschlag] = useState(0);
  const [depotVerwaltungsgebuehr, setDepotVerwaltungsgebuehr] = useState(0.2);
  const [depotRebalancingJahre, setDepotRebalancingJahre] = useState(4);
  const [basiszins, setBasiszins] = useState(2.5);
  const [teilfreistellung, setTeilfreistellung] = useState(30);
  const [sparerpauschbetrag, setSparerpauschbetrag] = useState(1000);
  const [abgeltungsteuersatz, setAbgeltungsteuersatz] = useState(26.375);

  const [versicherungAbschlusskosten, setVersicherungAbschlusskosten] = useState(2.5);
  const [versicherungVerwaltungskosten, setVersicherungVerwaltungskosten] = useState(1);
  const [rentenfaktor, setRentenfaktor] = useState(25);

  const [auszahlModus, setAuszahlModus] = useState<AuszahlModus>("einmalig");
  const [renditeAuszahlphase, setRenditeAuszahlphase] = useState(3);
  const [alterBeiRentenbeginn, setAlterBeiRentenbeginn] = useState(67);
  const [persoenlicherSteuersatz, setPersoenlicherSteuersatz] = useState(30);
  const [ertragsanteil, setErtragsanteil] = useState(18);
  const [entnahmeplanJahre, setEntnahmeplanJahre] = useState(20);
  const [lebenserwartungJahre, setLebenserwartungJahre] = useState(20);

  const eingabe = useMemo<EtfVsRenteEingabe>(
    () => ({
      einmalbetrag,
      sparrate,
      dynamik,
      renditeAnsparphase,
      ansparJahre,
      depotAusgabeaufschlag,
      depotVerwaltungsgebuehr,
      depotRebalancingJahre,
      vorabpauschale: {
        basiszins,
        teilfreistellung,
        sparerpauschbetrag,
        steuersatz: abgeltungsteuersatz,
      },
      versicherungAbschlusskosten,
      versicherungVerwaltungskosten,
      rentenfaktor,
      auszahlModus,
      renditeAuszahlphase,
      alterBeiRentenbeginn,
      persoenlicherSteuersatz,
      ertragsanteil,
      entnahmeplanJahre,
      lebenserwartungJahre,
    }),
    [
      einmalbetrag,
      sparrate,
      dynamik,
      renditeAnsparphase,
      ansparJahre,
      depotAusgabeaufschlag,
      depotVerwaltungsgebuehr,
      depotRebalancingJahre,
      basiszins,
      teilfreistellung,
      sparerpauschbetrag,
      abgeltungsteuersatz,
      versicherungAbschlusskosten,
      versicherungVerwaltungskosten,
      rentenfaktor,
      auszahlModus,
      renditeAuszahlphase,
      alterBeiRentenbeginn,
      persoenlicherSteuersatz,
      ertragsanteil,
      entnahmeplanJahre,
      lebenserwartungJahre,
    ],
  );

  const ergebnis = useMemo(() => berechneEtfVsRente(eingabe), [eingabe]);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="font-display text-lg font-semibold text-white">
          Ansparphase (gemeinsam)
        </h3>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NumberField
            label="Einmalbetrag"
            suffix="€"
            value={einmalbetrag}
            onChange={setEinmalbetrag}
            step={500}
          />
          <NumberField
            label="Monatlicher Beitrag"
            suffix="€"
            value={sparrate}
            onChange={setSparrate}
            step={25}
          />
          <NumberField
            label="Dynamik p. a."
            suffix="%"
            value={dynamik}
            onChange={setDynamik}
            step={0.5}
            max={20}
          />
          <NumberField
            label="Rendite Ansparphase p. a."
            suffix="%"
            value={renditeAnsparphase}
            onChange={setRenditeAnsparphase}
            step={0.5}
            max={20}
          />
          <NumberField
            label="Ansparphase"
            suffix="Jahre"
            value={ansparJahre}
            onChange={setAnsparJahre}
            step={1}
            min={1}
            max={50}
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-sm border border-white/10 p-6">
          <h3 className="font-display text-base font-semibold text-white">ETF-Depot</h3>
          <div className="mt-5 flex flex-col gap-5">
            <NumberField
              label="Ausgabeaufschlag"
              suffix="%"
              value={depotAusgabeaufschlag}
              onChange={setDepotAusgabeaufschlag}
              step={0.25}
              max={10}
            />
            <NumberField
              label="Laufende Kosten (TER) p. a."
              suffix="%"
              value={depotVerwaltungsgebuehr}
              onChange={setDepotVerwaltungsgebuehr}
              step={0.05}
              max={5}
            />
            <NumberField
              label="Rebalancing alle"
              suffix="Jahre (0 = aus)"
              value={depotRebalancingJahre}
              onChange={setDepotRebalancingJahre}
              step={1}
              min={0}
              max={20}
            />
            <NumberField
              label="Basiszins (Vorabpauschale)"
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
            <NumberField
              label="Sparerpauschbetrag p. a."
              suffix="€"
              value={sparerpauschbetrag}
              onChange={setSparerpauschbetrag}
              step={100}
              max={4000}
            />
            <NumberField
              label="Abgeltungsteuer (inkl. Soli)"
              suffix="%"
              value={abgeltungsteuersatz}
              onChange={setAbgeltungsteuersatz}
              step={0.125}
              max={50}
            />
          </div>
        </div>

        <div className="rounded-sm border border-white/10 p-6">
          <h3 className="font-display text-base font-semibold text-white">
            Rentenversicherung (Bruttopolice)
          </h3>
          <div className="mt-5 flex flex-col gap-5">
            <NumberField
              label="Abschlusskosten"
              suffix="% der Beitragssumme"
              value={versicherungAbschlusskosten}
              onChange={setVersicherungAbschlusskosten}
              step={0.5}
              max={10}
            />
            <NumberField
              label="Verwaltungskosten p. a."
              suffix="%"
              value={versicherungVerwaltungskosten}
              onChange={setVersicherungVerwaltungskosten}
              step={0.1}
              max={5}
            />
            <NumberField
              label="Rentenfaktor"
              suffix="€ / 10.000 € Kapital"
              value={rentenfaktor}
              onChange={setRentenfaktor}
              step={1}
              max={60}
            />
            <p className="text-xs text-nebel">
              Abschlusskosten werden nach dem üblichen Zillmerungsverfahren gleichmäßig auf die
              ersten 5 Vertragsjahre (bzw. die gesamte Laufzeit, falls kürzer) verteilt. Während
              der Ansparphase fällt in der Versicherung keine laufende Steuer an – das ist ihr
              steuerlicher Vorteil gegenüber dem Depot.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-white">Auszahlung</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {(Object.keys(MODUS_LABEL) as AuszahlModus[]).map((modus) => (
            <button
              key={modus}
              type="button"
              onClick={() => setAuszahlModus(modus)}
              className={`rounded-sm border px-5 py-2.5 text-sm font-semibold transition-colors ${
                auszahlModus === modus
                  ? "border-gold bg-gold text-onyx"
                  : "border-white/15 text-nebel hover:text-white"
              }`}
            >
              {MODUS_LABEL[modus]}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NumberField
            label="Rendite in der Auszahlphase p. a."
            suffix="%"
            value={renditeAuszahlphase}
            onChange={setRenditeAuszahlphase}
            step={0.5}
            max={15}
          />
          <NumberField
            label="Alter bei Rentenbeginn"
            suffix="Jahre"
            value={alterBeiRentenbeginn}
            onChange={setAlterBeiRentenbeginn}
            step={1}
            min={18}
            max={90}
          />
          <NumberField
            label="Persönlicher Grenzsteuersatz"
            suffix="%"
            value={persoenlicherSteuersatz}
            onChange={setPersoenlicherSteuersatz}
            step={1}
            max={50}
          />
          {auszahlModus === "rente" && (
            <NumberField
              label="Ertragsanteil"
              suffix="%"
              value={ertragsanteil}
              onChange={setErtragsanteil}
              step={1}
              max={100}
            />
          )}
          {auszahlModus === "entnahmeplan" && (
            <NumberField
              label="Entnahmeplan über"
              suffix="Jahre"
              value={entnahmeplanJahre}
              onChange={setEntnahmeplanJahre}
              step={1}
              min={1}
              max={50}
            />
          )}
          {auszahlModus === "rente" && (
            <NumberField
              label="Angenommene Bezugsdauer"
              suffix="Jahre"
              value={lebenserwartungJahre}
              onChange={setLebenserwartungJahre}
              step={1}
              min={1}
              max={50}
            />
          )}
        </div>

        <p className="mt-4 text-xs text-nebel">
          Halbeinkünfteverfahren bei der Versicherung (Kapitalauszahlung nur zur Hälfte
          steuerpflichtig) gilt hier, wenn Rentenbeginn ab 62 Jahren und mindestens 12 Jahre
          Vertragsdauer erfüllt sind – aktuell:{" "}
          <span className={ergebnis.halbeinkuenfteBedingungErfuellt ? "text-gold" : "text-white"}>
            {ergebnis.halbeinkuenfteBedingungErfuellt ? "erfüllt" : "nicht erfüllt"}
          </span>
          .
        </p>

        {auszahlModus === "rente" && (
          <p className="mt-4 rounded-sm border border-gold/30 bg-gold/5 px-4 py-3 text-xs leading-relaxed text-nebel">
            Wichtiger Unterschied: Die Rentenversicherung zahlt garantiert lebenslang, unabhängig
            davon, wie alt Sie tatsächlich werden. Die „lebenslange Auszahlung&rdquo; aus dem Depot ist
            hier nur als Entnahme über die angenommene Bezugsdauer nachgebildet – reicht die
            Lebenszeit länger als angenommen, ist das Depot-Kapital aufgebraucht, während die
            Versicherung weiterzahlt. Dieses Langlebigkeitsrisiko ist in den Zahlen nicht
            abgebildet.
          </p>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-sm bg-onyx p-8">
          <h3 className="font-display text-base font-semibold text-white">ETF-Depot</h3>
          <div className="mt-2">
            <ResultRow
              label="Kapital bei Rentenbeginn"
              value={formatEUR(ergebnis.depot.kapitalBeiRentenbeginn)}
              emphasis
            />
            <ResultRow label="Eingezahlt gesamt" value={formatEUR(ergebnis.depot.eingezahltGesamt)} />
            <ResultRow label="Kosten gesamt" value={`-${formatEUR(ergebnis.depot.kostenGesamt)}`} />
            <ResultRow
              label="Steuer Ansparphase"
              value={`-${formatEUR(ergebnis.depot.steuerAnsparphaseGesamt)}`}
            />
            <ResultRow
              label={
                auszahlModus === "einmalig"
                  ? "Netto-Einmalauszahlung"
                  : "Ø Netto-Auszahlung / Monat"
              }
              value={formatEUR(ergebnis.depot.monatlicheAuszahlungNetto)}
              emphasis
            />
            {auszahlModus !== "einmalig" && (
              <ResultRow
                label="Netto gesamt (Auszahlphase)"
                value={formatEUR(ergebnis.depot.nettoGesamtAuszahlphase)}
              />
            )}
            <ResultRow
              label="Steuer Auszahlphase"
              value={`-${formatEUR(ergebnis.depot.steuerAuszahlphaseGesamt)}`}
            />
          </div>
        </div>

        <div className="rounded-sm bg-onyx p-8">
          <h3 className="font-display text-base font-semibold text-white">Rentenversicherung</h3>
          <div className="mt-2">
            <ResultRow
              label="Kapital bei Rentenbeginn"
              value={formatEUR(ergebnis.versicherung.kapitalBeiRentenbeginn)}
              emphasis
            />
            <ResultRow
              label="Eingezahlt gesamt"
              value={formatEUR(ergebnis.versicherung.eingezahltGesamt)}
            />
            <ResultRow
              label="Kosten gesamt"
              value={`-${formatEUR(ergebnis.versicherung.kostenGesamt)}`}
            />
            <ResultRow label="Steuer Ansparphase" value={formatEUR(0)} />
            <ResultRow
              label={
                auszahlModus === "einmalig"
                  ? "Netto-Einmalauszahlung"
                  : auszahlModus === "rente"
                    ? "Netto-Rente / Monat"
                    : "Ø Netto-Auszahlung / Monat"
              }
              value={formatEUR(ergebnis.versicherung.monatlicheAuszahlungNetto)}
              emphasis
            />
            {auszahlModus !== "einmalig" && (
              <ResultRow
                label={`Netto gesamt (${auszahlModus === "rente" ? `${lebenserwartungJahre} Jahre angenommen` : "Auszahlphase"})`}
                value={formatEUR(ergebnis.versicherung.nettoGesamtAuszahlphase)}
              />
            )}
            <ResultRow
              label="Steuer Auszahlphase"
              value={`-${formatEUR(ergebnis.versicherung.steuerAuszahlphaseGesamt)}`}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold text-white">
          Kapitalentwicklung in der Ansparphase
        </h3>
        <div className="mt-4 overflow-x-auto rounded-sm border border-white/10">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-nebel">
                <th className="px-3 py-2.5">Jahr</th>
                <th className="px-3 py-2.5 text-right">Depot</th>
                <th className="px-3 py-2.5 text-right">Versicherung</th>
              </tr>
            </thead>
            <tbody>
              {ergebnis.depot.ansparphase.map((zeile, index) => (
                <tr key={zeile.jahr} className="border-b border-white/5 text-nebel last:border-b-0">
                  <td className="px-3 py-2 text-white">{zeile.jahr}</td>
                  <td className="px-3 py-2 text-right">{formatEUR(zeile.wertJahresende)}</td>
                  <td className="px-3 py-2 text-right">
                    {formatEUR(ergebnis.versicherung.ansparphase[index]?.wertJahresende ?? 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <PdfExportButton
          onClick={() =>
            exportEtfVsRentePdf("ETF vs. Rentenversicherung S² Finanz", eingabe, ergebnis)
          }
        />
      </div>
    </div>
  );
}
