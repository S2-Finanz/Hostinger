"use client";

import { useMemo, useState } from "react";
import {
  NumberField,
  SliderField,
  ResultRow,
  formatEUR,
} from "@/components/calculators/ui";
import {
  ANDERE_KASSE,
  KINDERLOSENZUSCHLAG_AB_ALTER,
  KRANKENKASSEN,
  formatProzent,
} from "@/lib/gkv";
import {
  AV_SATZ_PROZENT,
  RV_SATZ_PROZENT,
  type Steuerklasse,
  berechneNettolohn,
} from "@/lib/nettolohn";

const STEUERKLASSEN: { wert: Steuerklasse; label: string }[] = [
  { wert: "1", label: "I" },
  { wert: "2", label: "II" },
  { wert: "3", label: "III" },
  { wert: "4", label: "IV" },
];

export default function Nettolohnrechner() {
  const [bruttoMonatlich, setBruttoMonatlich] = useState(3500);
  const [steuerklasse, setSteuerklasse] = useState<Steuerklasse>("1");
  const [anzahlKinder, setAnzahlKinder] = useState(0);
  const [alter, setAlter] = useState(35);
  const [krankenkasse, setKrankenkasse] = useState("");
  const [zusatzbeitrag, setZusatzbeitrag] = useState(2.9);
  const [kirchensteuer, setKirchensteuer] = useState(0);

  const ergebnis = useMemo(
    () =>
      berechneNettolohn({
        bruttoMonatlich,
        steuerklasse,
        anzahlKinder,
        alter,
        kirchensteuerSatz: kirchensteuer,
        gkvZusatzbeitrag: zusatzbeitrag,
      }),
    [bruttoMonatlich, steuerklasse, anzahlKinder, alter, kirchensteuer, zusatzbeitrag],
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,340px)_1fr]">
        <div className="flex flex-col gap-7 rounded-sm bg-onyx p-8">
          <h2 className="font-display text-lg font-semibold text-white">
            Ihre Angaben
          </h2>

          <SliderField
            label="Bruttogehalt"
            value={bruttoMonatlich}
            onChange={setBruttoMonatlich}
            min={0}
            max={10000}
            step={100}
            suffix="€ / Monat"
          />

          <div className="block">
            <span className="text-sm text-nebel">Steuerklasse</span>
            <div className="mt-2 flex gap-2">
              {STEUERKLASSEN.map((sk) => (
                <button
                  key={sk.wert}
                  type="button"
                  onClick={() => setSteuerklasse(sk.wert)}
                  aria-pressed={steuerklasse === sk.wert}
                  className={`flex-1 rounded-sm border px-3 py-2 text-sm font-semibold transition-colors ${
                    steuerklasse === sk.wert
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-white/20 text-nebel hover:border-white/40"
                  }`}
                >
                  {sk.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-nebel">
              Steuerklasse V/VI (für Ehepaare mit ungleichem Einkommen) folgt
              in einem späteren Update.
            </p>
          </div>

          <SliderField
            label="Kindergeldberechtigte Kinder"
            value={anzahlKinder}
            onChange={setAnzahlKinder}
            min={0}
            max={10}
            step={1}
          />

          <SliderField
            label="Alter"
            value={alter}
            onChange={setAlter}
            min={16}
            max={67}
            suffix="Jahre"
          />

          <label className="block">
            <span className="text-sm text-nebel">
              Gesetzliche Krankenversicherung
            </span>
            <select
              value={krankenkasse}
              onChange={(e) => {
                const name = e.target.value;
                setKrankenkasse(name);
                const kasse = KRANKENKASSEN.find((k) => k.name === name);
                if (kasse) setZusatzbeitrag(kasse.zusatzbeitrag);
              }}
              className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-base text-white outline-none focus:border-gold"
            >
              <option value="" className="bg-graphit">
                Bitte auswählen …
              </option>
              {KRANKENKASSEN.map((k) => (
                <option key={k.name} value={k.name} className="bg-graphit">
                  {k.name}
                </option>
              ))}
              <option value={ANDERE_KASSE} className="bg-graphit">
                {ANDERE_KASSE}
              </option>
            </select>
          </label>

          <NumberField
            label="Zusatzbeitragssatz der Krankenkasse"
            suffix="%"
            value={zusatzbeitrag}
            onChange={setZusatzbeitrag}
            step={0.1}
            max={5}
          />

          <div className="block">
            <span className="text-sm text-nebel">Kirchensteuer</span>
            <div className="mt-2 flex gap-2">
              {[0, 8, 9].map((satz) => (
                <button
                  key={satz}
                  type="button"
                  onClick={() => setKirchensteuer(satz)}
                  aria-pressed={kirchensteuer === satz}
                  className={`flex-1 rounded-sm border px-3 py-2 text-sm font-semibold transition-colors ${
                    kirchensteuer === satz
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-white/20 text-nebel hover:border-white/40"
                  }`}
                >
                  {satz === 0 ? "keine" : `${satz} %`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-sm bg-onyx p-8">
            <p className="text-xs uppercase tracking-wide text-nebel/60">
              Ihr Nettogehalt
            </p>
            <p className="mt-2 font-display text-4xl font-bold text-gold md:text-5xl">
              {formatEUR(ergebnis.nettoMonatlich)}
            </p>
            <p className="mt-3 text-sm text-nebel">
              pro Monat bei einem Bruttogehalt von{" "}
              {formatEUR(ergebnis.bruttoMonatlich)} – das entspricht{" "}
              {formatEUR(ergebnis.nettoJahr)} netto im Jahr. Steuern und
              Sozialabgaben machen zusammen{" "}
              {ergebnis.abgabenquote.toFixed(1)} % Ihres Bruttogehalts aus.
            </p>
          </div>

          <div className="overflow-x-auto rounded-sm bg-graphit p-6">
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-nebel/60">
                  <th className="py-3 pr-4 font-normal">Posten</th>
                  <th className="py-3 text-right font-normal">€ / Monat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="py-3 pr-4 text-white">Bruttogehalt</td>
                  <td className="py-3 text-right text-white">
                    {formatEUR(ergebnis.bruttoMonatlich)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-nebel">
                    ./. Rentenversicherung ({(RV_SATZ_PROZENT / 2).toFixed(1)} %)
                  </td>
                  <td className="py-3 text-right text-nebel">
                    – {formatEUR(ergebnis.rvAn)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-nebel">
                    ./. Arbeitslosenversicherung ({(AV_SATZ_PROZENT / 2).toFixed(1)} %)
                  </td>
                  <td className="py-3 text-right text-nebel">
                    – {formatEUR(ergebnis.avAn)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-nebel">
                    ./. Krankenversicherung
                  </td>
                  <td className="py-3 text-right text-nebel">
                    – {formatEUR(ergebnis.kvAn)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-nebel">
                    ./. Pflegeversicherung
                  </td>
                  <td className="py-3 text-right text-nebel">
                    – {formatEUR(ergebnis.pvAn)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-nebel">./. Lohnsteuer</td>
                  <td className="py-3 text-right text-nebel">
                    – {formatEUR(ergebnis.estMonat)}
                  </td>
                </tr>
                {ergebnis.soliMonat > 0 && (
                  <tr>
                    <td className="py-3 pr-4 text-nebel">
                      ./. Solidaritätszuschlag
                    </td>
                    <td className="py-3 text-right text-nebel">
                      – {formatEUR(ergebnis.soliMonat)}
                    </td>
                  </tr>
                )}
                {ergebnis.kirchensteuerMonat > 0 && (
                  <tr>
                    <td className="py-3 pr-4 text-nebel">
                      ./. Kirchensteuer
                    </td>
                    <td className="py-3 text-right text-nebel">
                      – {formatEUR(ergebnis.kirchensteuerMonat)}
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="py-3 pr-4 font-semibold text-white">
                    = Nettogehalt
                  </td>
                  <td className="py-3 text-right font-semibold text-gold">
                    {formatEUR(ergebnis.nettoMonatlich)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-sm bg-onyx p-8">
            <p className="mb-2 text-xs uppercase tracking-wide text-nebel/60">
              Rechengrundlagen
            </p>
            <ResultRow
              label="Zu versteuerndes Einkommen (Jahr)"
              value={formatEUR(ergebnis.zvE)}
            />
            <ResultRow
              label="Lohnsteuer (Jahr)"
              value={formatEUR(ergebnis.estJahr)}
            />
            {ergebnis.entlastungsbetrag > 0 && (
              <ResultRow
                label="Entlastungsbetrag für Alleinerziehende"
                value={formatEUR(ergebnis.entlastungsbetrag)}
              />
            )}
          </div>

          <p className="text-xs text-nebel">
            Ohne Kinder erhöht sich Ihr Anteil an der Pflegeversicherung ab{" "}
            {KINDERLOSENZUSCHLAG_AB_ALTER} Jahren um den Kinderlosenzuschlag –
            bereits oben berücksichtigt. Marktdurchschnitt Zusatzbeitrag zum
            01.01.2026:{" "}
            {formatProzent(
              KRANKENKASSEN.reduce((s, k) => s + k.zusatzbeitrag, 0) /
                KRANKENKASSEN.length,
            )}{" "}
            %.
          </p>
        </div>
      </div>
    </div>
  );
}
