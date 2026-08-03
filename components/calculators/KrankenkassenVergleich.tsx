"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";
import { NumberField, formatEUR } from "@/components/calculators/ui";
import {
  ANDERE_KASSE,
  BBG_KV_MONATLICH,
  KINDERLOSENZUSCHLAG_AB_ALTER,
  KRANKENKASSEN,
  berechneGkvBeitrag,
} from "@/lib/gkv";

function findKasse(name: string) {
  return KRANKENKASSEN.find((k) => k.name === name);
}

// Vereinfachte Annahme für die Hochrechnung "über das Berufsleben": feste
// Regelaltersgrenze von 67 Jahren, unabhängig vom Geburtsjahr. Für eine exakte,
// gestaffelte Regelaltersgrenze siehe Pensionsrechner.
const ANGENOMMENES_RENTENALTER = 67;

function KassenAuswahl({
  label,
  krankenkasse,
  onSelect,
  zusatzbeitrag,
  onZusatzbeitragChange,
}: {
  label: string;
  krankenkasse: string;
  onSelect: (name: string, zusatzbeitrag: number | null) => void;
  zusatzbeitrag: number;
  onZusatzbeitragChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <label className="block">
        <span className="text-sm text-nebel">{label}</span>
        <select
          value={krankenkasse}
          onChange={(e) => {
            const name = e.target.value;
            const kasse = KRANKENKASSEN.find((k) => k.name === name);
            onSelect(name, kasse ? kasse.zusatzbeitrag : null);
          }}
          className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-lg text-white outline-none focus:border-gold"
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
        label="Zusatzbeitrag"
        suffix="%"
        value={zusatzbeitrag}
        onChange={onZusatzbeitragChange}
        step={0.1}
        max={5}
      />
    </div>
  );
}

export default function KrankenkassenVergleich() {
  const [brutto, setBrutto] = useState(3800);
  const [alter, setAlter] = useState(30);
  const [hatKinder, setHatKinder] = useState(true);

  const [kasseA, setKasseA] = useState("");
  const [zusatzbeitragA, setZusatzbeitragA] = useState(2.9);
  const [kasseB, setKasseB] = useState("");
  const [zusatzbeitragB, setZusatzbeitragB] = useState(2.9);

  const resultA = useMemo(
    () =>
      berechneGkvBeitrag({
        brutto,
        alter,
        zusatzbeitrag: zusatzbeitragA,
        hatKinder,
      }),
    [brutto, alter, zusatzbeitragA, hatKinder],
  );
  const resultB = useMemo(
    () =>
      berechneGkvBeitrag({
        brutto,
        alter,
        zusatzbeitrag: zusatzbeitragB,
        hatKinder,
      }),
    [brutto, alter, zusatzbeitragB, hatKinder],
  );

  // Negativ: Alternativ-Krankenkasse ist günstiger. Positiv: sie ist teurer.
  const differenzSigniert = Math.round(resultB.anGesamt - resultA.anGesamt);
  const differenzMonatlich = Math.abs(differenzSigniert);
  const differenzJaehrlich = differenzMonatlich * 12;
  const jahreBisRente = Math.max(ANGENOMMENES_RENTENALTER - alter, 0);
  const differenzBerufsleben = differenzJaehrlich * jahreBisRente;
  const istGuenstiger = differenzSigniert < 0;

  const alternativKasse = findKasse(kasseB);
  const alternativKasseName = alternativKasse?.name ?? "die Alternativ-Krankenkasse";

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-6 rounded-sm bg-onyx p-8 sm:grid-cols-3">
        <NumberField
          label="Bruttogehalt (pro Monat)"
          suffix="€"
          value={brutto}
          onChange={setBrutto}
          step={100}
        />
        <NumberField
          label="Alter"
          suffix="Jahre"
          value={alter}
          onChange={setAlter}
          min={16}
          max={75}
        />
        <label className="block">
          <span className="text-sm text-nebel">
            Haben Sie (berücksichtigungsfähige) Kinder?
          </span>
          <div className="mt-3 flex gap-2">
            {[
              { label: "Ja", value: true },
              { label: "Nein", value: false },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setHatKinder(option.value)}
                className={`flex-1 rounded-sm border px-4 py-2.5 text-sm transition-colors ${
                  hatKinder === option.value
                    ? "border-gold bg-gold/10 text-white"
                    : "border-white/15 text-nebel hover:border-white/30"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </label>
      </div>
      <p className="-mt-6 text-xs text-nebel">
        Ohne Kinder erhöht sich der Pflegeversicherungsanteil ab{" "}
        {KINDERLOSENZUSCHLAG_AB_ALTER} Jahren um den Kinderlosenzuschlag – für
        beide Kassen gleichermaßen.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-sm bg-graphit p-8">
          <KassenAuswahl
            label="Aktuelle Krankenkasse"
            krankenkasse={kasseA}
            onSelect={(name, zb) => {
              setKasseA(name);
              if (zb !== null) setZusatzbeitragA(zb);
            }}
            zusatzbeitrag={zusatzbeitragA}
            onZusatzbeitragChange={setZusatzbeitragA}
          />
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-xs uppercase tracking-wide text-nebel/60">
              Monatlicher Beitrag (Ihr Anteil)
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-white">
              {formatEUR(resultA.anGesamt)}
            </p>
            <p className="mt-3 text-sm text-nebel">
              davon KV {formatEUR(resultA.anGkv)} · PV{" "}
              {formatEUR(resultA.anPv)}
            </p>
          </div>
        </div>

        <div className="rounded-sm bg-graphit p-8">
          <KassenAuswahl
            label="Alternativ Krankenkasse"
            krankenkasse={kasseB}
            onSelect={(name, zb) => {
              setKasseB(name);
              if (zb !== null) setZusatzbeitragB(zb);
            }}
            zusatzbeitrag={zusatzbeitragB}
            onZusatzbeitragChange={setZusatzbeitragB}
          />
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-xs uppercase tracking-wide text-nebel/60">
              Monatlicher Beitrag (Ihr Anteil)
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-white">
              {formatEUR(resultB.anGesamt)}
            </p>
            <p className="mt-3 text-sm text-nebel">
              davon KV {formatEUR(resultB.anGkv)} · PV{" "}
              {formatEUR(resultB.anPv)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-gold/40 bg-onyx p-8 text-center">
        <p className="text-xs uppercase tracking-wide text-nebel/60">
          Ergebnis
        </p>
        {differenzMonatlich === 0 ? (
          <p className="mt-3 font-display text-xl font-bold text-white">
            Beide Kassen kosten Sie monatlich gleich viel.
          </p>
        ) : istGuenstiger ? (
          <>
            <p className="mt-3 font-display text-xl font-bold text-gold">
              Mit einem Wechsel könnten Sie {formatEUR(differenzMonatlich)}{" "}
              monatlich sparen.
            </p>
            <p className="mt-3 text-nebel">
              Das sind {formatEUR(differenzJaehrlich)} pro Jahr
              {jahreBisRente > 0 && (
                <>
                  {" "}
                  oder {formatEUR(differenzBerufsleben)} über Ihr
                  Berufsleben (bis {ANGENOMMENES_RENTENALTER} Jahre)
                </>
              )}
              .
            </p>
          </>
        ) : (
          <>
            <p className="mt-3 font-display text-xl font-bold text-white">
              Der Beitrag bei {alternativKasseName} wäre{" "}
              {formatEUR(differenzMonatlich)} monatlich höher.
            </p>
            <p className="mt-3 text-nebel">
              Das sind {formatEUR(differenzJaehrlich)} pro Jahr mehr. Die
              Leistungen können dennoch interessant sein
              {alternativKasse?.highlightblattUrl
                ? " – werfen Sie einen Blick ins Highlightblatt weiter unten."
                : "."}
            </p>
          </>
        )}
        {(resultA.amBbgGedeckelt || resultB.amBbgGedeckelt) && (
          <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-nebel">
            Ihr Gehalt liegt über der Beitragsbemessungsgrenze von{" "}
            {formatEUR(BBG_KV_MONATLICH)}/Monat – beide Berechnungen erfolgen
            daher auf Basis der Bemessungsgrenze.
          </p>
        )}

        {resultA.ueberJaeg && (
          <div className="mx-auto mt-6 max-w-md rounded-sm border border-gold bg-gold/10 p-6">
            <p className="font-display text-lg font-bold text-white">
              {istGuenstiger && differenzMonatlich > 0
                ? `Sie sparen bereits ${formatEUR(differenzMonatlich)} monatlich – könnten aber voraussichtlich durch einen Wechsel in die private Krankenversicherung (PKV) noch mehr sparen.`
                : differenzMonatlich === 0
                  ? "Ein Kassenwechsel bringt hier keine Ersparnis – ein Wechsel in die private Krankenversicherung (PKV) könnte für Sie deutlich mehr sparen."
                  : "Auch wenn diese Kasse teurer wäre: Ein Wechsel in die private Krankenversicherung (PKV) könnte für Sie insgesamt die größere Ersparnis bringen."}
            </p>
            <Link
              href="/rechner/pkv-rechner/"
              className="mt-4 inline-block rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
            >
              Jetzt PKV-Ersparnis berechnen
            </Link>
          </div>
        )}

        {alternativKasse?.antragUrl ? (
          <>
            <Link
              href={alternativKasse.antragUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
            >
              Online-Antrag bei {alternativKasse.name} stellen
            </Link>
            {alternativKasse.antragHinweis && (
              <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-nebel">
                Hinweis: {alternativKasse.antragHinweis} – der Antrag muss
                ausgedruckt, unterschrieben und postalisch eingereicht werden.
              </p>
            )}
          </>
        ) : (
          <Link
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
          >
            {alternativKasse
              ? `Wechsel zu ${alternativKasse.name} besprechen`
              : "Kassenwechsel besprechen"}
          </Link>
        )}

        {alternativKasse?.highlightblattUrl && (
          <div>
            <a
              href={alternativKasse.highlightblattUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-gold underline underline-offset-4 hover:opacity-80"
            >
              Highlightblatt zu {alternativKasse.name} herunterladen
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
