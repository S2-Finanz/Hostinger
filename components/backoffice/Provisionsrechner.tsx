"use client";

import { useMemo, useState } from "react";
import { PROVISIONS_KATEGORIEN, type ProvisionsEintrag } from "@/lib/provisionen";
import {
  berechneKrankenAp,
  berechneLaufzeitAp,
  parseAp,
} from "@/lib/provisionsrechner";

type Eingabemodus = "kranken_mit_pflege" | "kranken_ohne_pflege" | "laufzeit";

const EINGABEMODUS_JE_SPARTE: Record<string, Eingabemodus> = {
  krankenvollversicherung: "kranken_mit_pflege",
  krankenzusatzversicherung: "kranken_ohne_pflege",
  berufsunfaehigkeit: "laufzeit",
  rentenversicherung: "laufzeit",
  risikolebensversicherung: "laufzeit",
};

const eingabeKlasse =
  "mt-1.5 block w-full rounded-sm border border-white/15 bg-onyx px-4 py-2.5 text-sm text-white placeholder:text-nebel/50 focus:border-gold focus:outline-none";

function formatEUR(value: number): string {
  return value.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

function eintragLabel(e: ProvisionsEintrag): string {
  return e.tarif && e.tarif !== "-" ? `${e.gesellschaft} – ${e.tarif}` : e.gesellschaft;
}

export default function Provisionsrechner() {
  const [kategorieKey, setKategorieKey] = useState(PROVISIONS_KATEGORIEN[0].key);
  const [auswahlIndex, setAuswahlIndex] = useState<number | null>(null);

  const [beitragKv, setBeitragKv] = useState(0);
  const [beitragPflege, setBeitragPflege] = useState(0);
  const [monatsbeitrag, setMonatsbeitrag] = useState(0);
  const [laufzeit, setLaufzeit] = useState(0);

  const kategorie = PROVISIONS_KATEGORIEN.find((k) => k.key === kategorieKey)!;
  const modus = EINGABEMODUS_JE_SPARTE[kategorieKey];

  const berechenbareEintraege = useMemo(
    () =>
      kategorie.eintraege
        .map((e, index) => ({ e, index }))
        .filter(({ e }) => parseAp(e.ap).art !== "unbekannt"),
    [kategorie],
  );

  const ausgewaehlterEintrag =
    auswahlIndex !== null ? kategorie.eintraege[auswahlIndex] : null;

  function kategorieWechseln(key: string) {
    setKategorieKey(key);
    setAuswahlIndex(null);
  }

  const ergebnis = useMemo(() => {
    if (!ausgewaehlterEintrag) return null;
    if (modus === "kranken_mit_pflege" || modus === "kranken_ohne_pflege") {
      return berechneKrankenAp(ausgewaehlterEintrag, beitragKv, beitragPflege);
    }
    return berechneLaufzeitAp(ausgewaehlterEintrag, monatsbeitrag, laufzeit);
  }, [ausgewaehlterEintrag, modus, beitragKv, beitragPflege, monatsbeitrag, laufzeit]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 rounded-sm border border-white/10 bg-graphit p-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-nebel">Sparte</span>
          <select
            value={kategorieKey}
            onChange={(e) => kategorieWechseln(e.target.value)}
            className="mt-1.5 block w-full rounded-sm border border-white/15 bg-onyx px-4 py-2.5 text-sm text-white focus:border-gold focus:outline-none"
          >
            {PROVISIONS_KATEGORIEN.map((k) => (
              <option key={k.key} value={k.key} className="bg-graphit">
                {k.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm text-nebel">Gesellschaft</span>
          <select
            value={auswahlIndex ?? ""}
            onChange={(e) => setAuswahlIndex(e.target.value === "" ? null : Number(e.target.value))}
            disabled={berechenbareEintraege.length === 0}
            className="mt-1.5 block w-full rounded-sm border border-white/15 bg-onyx px-4 py-2.5 text-sm text-white focus:border-gold focus:outline-none disabled:opacity-40"
          >
            <option value="" className="bg-graphit">
              Bitte wählen …
            </option>
            {berechenbareEintraege.map(({ e, index }) => (
              <option key={index} value={index} className="bg-graphit">
                {eintragLabel(e)} ({e.ap})
              </option>
            ))}
          </select>
        </label>
      </div>

      {berechenbareEintraege.length === 0 && (
        <p className="rounded-sm border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-nebel">
          Für „{kategorie.label}" sind aktuell keine automatisch berechenbaren AP-Werte
          hinterlegt.
        </p>
      )}

      {ausgewaehlterEintrag && (
        <div className="flex flex-col gap-6 rounded-sm border border-white/10 bg-graphit p-6">
          {(modus === "kranken_mit_pflege" || modus === "kranken_ohne_pflege") && (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-nebel">
                  Monatsbeitrag {modus === "kranken_mit_pflege" ? "Krankenversicherung" : ""}
                </span>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={beitragKv || ""}
                  onChange={(e) => setBeitragKv(e.target.valueAsNumber || 0)}
                  className={eingabeKlasse}
                />
              </label>
              {modus === "kranken_mit_pflege" && (
                <label className="block">
                  <span className="text-sm text-nebel">Monatsbeitrag Pflegeversicherung</span>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={beitragPflege || ""}
                    onChange={(e) => setBeitragPflege(e.target.valueAsNumber || 0)}
                    className={eingabeKlasse}
                  />
                </label>
              )}
            </div>
          )}

          {modus === "laufzeit" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-nebel">Monatsbeitrag</span>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={monatsbeitrag || ""}
                  onChange={(e) => setMonatsbeitrag(e.target.valueAsNumber || 0)}
                  className={eingabeKlasse}
                />
              </label>
              <label className="block">
                <span className="text-sm text-nebel">Laufzeit (Jahre)</span>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={laufzeit || ""}
                  onChange={(e) => setLaufzeit(e.target.valueAsNumber || 0)}
                  className={eingabeKlasse}
                />
              </label>
            </div>
          )}

          {ergebnis && (
            <div className="border-t border-white/10 pt-6">
              {ergebnis.erfolg ? (
                <>
                  <p className="text-xs uppercase tracking-wide text-nebel/60">
                    Abschlussprovision (einmalig)
                  </p>
                  <p className="mt-2 font-display text-3xl font-bold text-gold">
                    {formatEUR(ergebnis.betrag)}
                  </p>
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-nebel">
                    {ergebnis.details.map((zeile, i) => (
                      <li key={i}>{zeile}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                  {ergebnis.grund}
                </p>
              )}
            </div>
          )}

          {ausgewaehlterEintrag.hinweis && (
            <div className="border-t border-white/10 pt-4">
              <p className="text-xs uppercase tracking-wide text-nebel/60">
                Hinweistext der Gesellschaft (nicht automatisch berücksichtigt)
              </p>
              <p className="mt-2 whitespace-pre-line text-sm text-nebel">
                {ausgewaehlterEintrag.hinweis}
              </p>
            </div>
          )}
        </div>
      )}

      <p className="text-xs leading-relaxed text-nebel/60">
        Vereinfachte Berechnung der einmaligen Abschlussprovision (AP) auf Basis des
        angegebenen Beitrags bzw. der angegebenen Laufzeit. Individuelle Sonderregelungen
        aus dem Hinweistext der jeweiligen Gesellschaft (z. B. abweichende Faktoren für
        bestimmte Tarife oder Altersgrenzen) sind nicht automatisch eingerechnet – bitte
        vor Verwendung gegenprüfen. Laufende Bestandsprovision (BP) und Dynamik-Provision
        (Dyn) sind in diesem Rechner nicht enthalten.
      </p>
    </div>
  );
}
