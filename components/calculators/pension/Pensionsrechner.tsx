"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";
import TeilzeitPhasenEditor, {
  neueTeilzeitPhase,
} from "@/components/calculators/pension/TeilzeitPhasenEditor";
import ElternzeitPhasenEditor from "@/components/calculators/pension/ElternzeitPhasenEditor";
import type { ElternzeitPhase, TeilzeitPhase } from "@/lib/besoldung/types";
import { regelaltersgrenze } from "@/lib/besoldung/regelaltersgrenze";
import {
  ruhegehaltfaehigeDienstzeit,
  ruhegehaltssatz,
} from "@/lib/besoldung/ruhegehalt";
import {
  BESOLDUNGSTABELLEN,
  STUFEN_RHYTHMUS_JAHRE,
  findLand,
  gehaltFuerStufe,
  maxStufeFuerGruppe,
} from "@/lib/besoldung/tabellen";

const MONATE = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

function stufeNachJahren(dienstjahre: number, maxStufe: number): number {
  let stufe = 1;
  let kumuliert = 0;
  for (const jahreBisNaechste of STUFEN_RHYTHMUS_JAHRE) {
    if (stufe >= maxStufe) break;
    if (dienstjahre < kumuliert + jahreBisNaechste) break;
    kumuliert += jahreBisNaechste;
    stufe += 1;
  }
  return Math.min(stufe, maxStufe);
}

export default function Pensionsrechner() {
  const currentYear = new Date().getFullYear();

  const [geburtsjahr, setGeburtsjahr] = useState(1995);
  const [dienstMonat, setDienstMonat] = useState(9);
  const [dienstJahr, setDienstJahr] = useState(2022);
  const [landCode, setLandCode] = useState(BESOLDUNGSTABELLEN[0].code);
  const [gruppe, setGruppe] = useState("A13");
  const [besoldungserhoehung, setBesoldungserhoehung] = useState(2);

  const [teilzeitPhasen, setTeilzeitPhasen] = useState<TeilzeitPhase[]>([]);
  const [elternzeitPhasen, setElternzeitPhasen] = useState<ElternzeitPhase[]>(
    [],
  );

  const defaultRAG = regelaltersgrenze(geburtsjahr);
  const [pensionsalter, setPensionsalter] = useState(defaultRAG.jahre);

  const land = findLand(landCode) ?? BESOLDUNGSTABELLEN[0];
  const verfuegbareGruppen = land.gruppen.map((g) => g.gruppe);
  const aktuelleGruppe = verfuegbareGruppen.includes(gruppe)
    ? gruppe
    : (verfuegbareGruppen.find((g) => g === "A13") ?? verfuegbareGruppen[0]);
  const maxStufe = maxStufeFuerGruppe(land, aktuelleGruppe);

  const result = useMemo(() => {
    const dienstbeginnJahrDezimal = dienstJahr + (dienstMonat - 1) / 12;
    const geburtsjahrDezimal = geburtsjahr;
    const pensionierungJahrDezimal = geburtsjahrDezimal + pensionsalter;

    const gesamtDienstjahre = Math.max(
      pensionierungJahrDezimal - dienstbeginnJahrDezimal,
      0,
    );

    const dz = ruhegehaltfaehigeDienstzeit({
      gesamtDienstjahre,
      teilzeitPhasen,
      elternzeitPhasen,
    });

    const satz = ruhegehaltssatz(dz.gesamt);

    // Stufe bei Pensionierung anhand der KALENDARISCHEN Dienstjahre
    // (Erfahrungsstufen laufen unabhängig vom Beschäftigungsumfang weiter)
    const stufeBeiPension = stufeNachJahren(gesamtDienstjahre, maxStufe);
    const grundgehaltHeute = gehaltFuerStufe(land, aktuelleGruppe, stufeBeiPension);

    let endgehalt: number | null = null;
    if (grundgehaltHeute !== null) {
      const jahreBisPension = Math.max(
        pensionierungJahrDezimal - currentYear,
        0,
      );
      endgehalt =
        grundgehaltHeute *
        Math.pow(1 + besoldungserhoehung / 100, jahreBisPension);
    }

    const pensionMonatlich = endgehalt !== null ? endgehalt * (satz / 100) : null;

    // Verlaufstabelle: Stufenaufstieg über die Dienstzeit
    const verlauf: {
      stufe: number;
      abDienstjahr: number;
      kalenderjahr: number;
      betrag: number | null;
    }[] = [];
    let kumuliert = 0;
    for (let s = 1; s <= maxStufe; s++) {
      if (kumuliert > gesamtDienstjahre) break;
      const betragHeute = gehaltFuerStufe(land, aktuelleGruppe, s);
      const kalenderjahr = Math.round(dienstbeginnJahrDezimal + kumuliert);
      verlauf.push({
        stufe: s,
        abDienstjahr: kumuliert,
        kalenderjahr,
        betrag:
          betragHeute !== null
            ? betragHeute *
              Math.pow(
                1 + besoldungserhoehung / 100,
                Math.max(kalenderjahr - currentYear, 0),
              )
            : null,
      });
      if (s - 1 < STUFEN_RHYTHMUS_JAHRE.length) {
        kumuliert += STUFEN_RHYTHMUS_JAHRE[s - 1];
      } else {
        break;
      }
    }

    return {
      gesamtDienstjahre,
      dz,
      satz,
      stufeBeiPension,
      grundgehaltHeute,
      endgehalt,
      pensionMonatlich,
      verlauf,
      pensionierungKalenderjahr: Math.round(pensionierungJahrDezimal),
    };
  }, [
    geburtsjahr,
    dienstMonat,
    dienstJahr,
    pensionsalter,
    teilzeitPhasen,
    elternzeitPhasen,
    aktuelleGruppe,
    maxStufe,
    besoldungserhoehung,
    land,
    currentYear,
  ]);

  return (
    <div className="flex flex-col gap-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              label="Geburtsjahr"
              value={geburtsjahr}
              onChange={setGeburtsjahr}
              step={1}
              min={1950}
              max={currentYear}
            />
            <div>
              <span className="text-sm text-nebel">
                Regelaltersgrenze (Standard)
              </span>
              <p className="mt-2 border-b border-white/20 pb-2 text-lg text-white">
                {defaultRAG.jahre} Jahre {defaultRAG.monate} Monate
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-nebel">Dienstbeginn – Monat</span>
              <select
                value={dienstMonat}
                onChange={(e) => setDienstMonat(Number(e.target.value))}
                className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-white outline-none focus:border-gold"
              >
                {MONATE.map((m, i) => (
                  <option key={m} value={i + 1} className="bg-graphit">
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <NumberField
              label="Dienstbeginn – Jahr"
              value={dienstJahr}
              onChange={setDienstJahr}
              step={1}
              min={1980}
              max={currentYear + 10}
            />
          </div>

          <NumberField
            label="Voraussichtliches Pensionierungsalter"
            suffix="Jahre"
            value={pensionsalter}
            onChange={setPensionsalter}
            step={1}
            min={55}
            max={72}
          />

          <label className="block">
            <span className="text-sm text-nebel">Bundesland / Dienstherr</span>
            <select
              value={landCode}
              onChange={(e) => setLandCode(e.target.value)}
              className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-white outline-none focus:border-gold"
            >
              {BESOLDUNGSTABELLEN.map((l) => (
                <option key={l.code} value={l.code} className="bg-graphit">
                  {l.name}
                  {!l.verfuegbar ? " (Besoldungstabelle in Vorbereitung)" : ""}
                </option>
              ))}
            </select>
            {land.gueltigAb && (
              <span className="mt-2 block text-xs text-nebel/70">
                Stand: {land.gueltigAb}
                {land.entwurf ? " (Entwurf/Prognose, noch nicht verkündet)" : ""}
              </span>
            )}
          </label>

          <label className="block">
            <span className="text-sm text-nebel">Besoldungsgruppe</span>
            <select
              value={aktuelleGruppe}
              onChange={(e) => setGruppe(e.target.value)}
              className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-white outline-none focus:border-gold"
            >
              {land.gruppen.map((g) => (
                <option key={g.gruppe} value={g.gruppe} className="bg-graphit">
                  {g.label}
                </option>
              ))}
            </select>
          </label>

          <NumberField
            label="Angenommene jährliche Besoldungserhöhung"
            suffix="%"
            value={besoldungserhoehung}
            onChange={setBesoldungserhoehung}
            step={0.1}
            min={0}
            max={5}
          />

          <div className="border-t border-white/10 pt-8">
            <TeilzeitPhasenEditor
              phasen={teilzeitPhasen}
              onChange={setTeilzeitPhasen}
            />
          </div>

          <div className="border-t border-white/10 pt-8">
            <ElternzeitPhasenEditor
              phasen={elternzeitPhasen}
              onChange={setElternzeitPhasen}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {!land.verfuegbar && (
            <div className="rounded-sm border border-gold/40 bg-onyx p-6">
              <p className="text-sm text-white">
                Die Besoldungstabelle für {land.name} wird noch ergänzt.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-nebel">
                Ruhegehaltssatz und Dienstzeit-Aufschlüsselung sind bereits
                korrekt berechnet – für die Euro-Beträge fehlen uns noch
                verifizierte Gehaltsdaten für dieses Bundesland.
              </p>
            </div>
          )}

          <div className="rounded-sm bg-onyx p-8">
            <p className="mb-2 text-xs uppercase tracking-wide text-nebel/60">
              Ihre Pension
            </p>
            <ResultRow
              label="Ruhegehaltssatz"
              value={`${result.satz.toFixed(2)} %`}
              emphasis
            />
            {result.pensionMonatlich !== null ? (
              <>
                <ResultRow
                  label="Voraussichtliches Endgehalt (Grundgehalt)"
                  value={formatEUR(result.endgehalt as number)}
                />
                <ResultRow
                  label="Voraussichtliche Pension (brutto/Monat)"
                  value={formatEUR(result.pensionMonatlich)}
                  emphasis
                />
              </>
            ) : (
              <p className="mt-3 text-sm text-nebel">
                Betrag folgt, sobald die Besoldungstabelle für {land.name}{" "}
                hinterlegt ist.
              </p>
            )}
          </div>

          <div className="rounded-sm bg-onyx p-8">
            <p className="mb-2 text-xs uppercase tracking-wide text-nebel/60">
              Ruhegehaltfähige Dienstzeit
            </p>
            <ResultRow
              label="Gesamte Dienstzeit (kalendarisch)"
              value={`${result.gesamtDienstjahre.toFixed(1)} Jahre`}
            />
            <ResultRow
              label="Davon Vollzeit"
              value={`${result.dz.vollzeitJahre.toFixed(1)} Jahre`}
            />
            {teilzeitPhasen.length > 0 && (
              <>
                <ResultRow
                  label="Angerechnet aus Teilzeit"
                  value={`${result.dz.teilzeitAngerechnetJahre.toFixed(1)} Jahre`}
                />
                <ResultRow
                  label="Kürzung durch Teilzeit"
                  value={`− ${result.dz.teilzeitKuerzungJahre.toFixed(1)} Jahre`}
                />
              </>
            )}
            {elternzeitPhasen.length > 0 && (
              <ResultRow
                label="Angerechnet aus Elternzeit"
                value={`${result.dz.elternzeitAngerechnetJahre.toFixed(1)} Jahre`}
              />
            )}
            <ResultRow
              label="Ruhegehaltfähige Dienstzeit gesamt"
              value={`${result.dz.gesamt.toFixed(1)} Jahre`}
              emphasis
            />
          </div>

          <div className="rounded-sm bg-onyx p-8">
            <p className="mb-4 text-xs uppercase tracking-wide text-nebel/60">
              Karriereverlauf – Stufenaufstieg
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-nebel/60">
                    <th className="pb-2 pr-4">Stufe</th>
                    <th className="pb-2 pr-4">Ab Kalenderjahr</th>
                    <th className="pb-2">Grundgehalt (hochgerechnet)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.verlauf.map((v) => (
                    <tr
                      key={v.stufe}
                      className="border-b border-white/5 last:border-b-0"
                    >
                      <td className="py-2 pr-4 text-white">{v.stufe}</td>
                      <td className="py-2 pr-4 text-nebel">
                        {v.kalenderjahr}
                      </td>
                      <td className="py-2 text-white">
                        {v.betrag !== null ? formatEUR(v.betrag) : "–"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
