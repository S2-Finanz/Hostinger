"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";
import {
  ANDERE_KASSE,
  BBG_KV_MONATLICH,
  JAEG_JAHR,
  KINDERLOSENZUSCHLAG_AB_ALTER,
  KRANKENKASSEN,
  PV_KINDERLOSENZUSCHLAG_PROZENT,
  berechneGkvBeitrag,
  formatProzent,
} from "@/lib/gkv";

export default function PkvCheck() {
  const [brutto, setBrutto] = useState(3800);
  const [alter, setAlter] = useState(30);
  const [krankenkasse, setKrankenkasse] = useState("");
  const [zusatzbeitrag, setZusatzbeitrag] = useState(2.9);
  const [hatKinder, setHatKinder] = useState(true);

  const result = useMemo(
    () => berechneGkvBeitrag({ brutto, alter, zusatzbeitrag, hatKinder }),
    [brutto, alter, zusatzbeitrag, hatKinder],
  );

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-8">
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
          <p className="mt-2 text-xs text-nebel">
            Zusatzbeitrag wird automatisch befüllt (Stand: Januar 2026) –
            unten bei Bedarf anpassen.
          </p>
        </label>

        <NumberField
          label="Zusatzbeitrag Ihrer Krankenkasse"
          suffix="%"
          value={zusatzbeitrag}
          onChange={setZusatzbeitrag}
          step={0.1}
          max={5}
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
                className={`flex-1 rounded-sm border px-4 py-3 text-sm transition-colors ${
                  hatKinder === option.value
                    ? "border-gold bg-gold/10 text-white"
                    : "border-white/15 text-nebel hover:border-white/30"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-nebel">
            Ohne Kinder erhöht sich Ihr Anteil an der Pflegeversicherung ab{" "}
            {KINDERLOSENZUSCHLAG_AB_ALTER} Jahren um den Kinderlosenzuschlag.
          </p>
        </label>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-sm bg-onyx p-8">
          <p className="mb-2 text-xs uppercase tracking-wide text-nebel/60">
            Ihr GKV-Beitrag
            {krankenkasse && krankenkasse !== ANDERE_KASSE
              ? ` bei der ${krankenkasse}`
              : ""}
          </p>
          <ResultRow
            label="Monatlicher Beitrag (Ihr Anteil)"
            value={formatEUR(result.anGesamt)}
            emphasis
          />
          <ResultRow
            label="davon Krankenversicherung"
            value={formatEUR(result.anGkv)}
          />
          <ResultRow
            label="davon Pflegeversicherung"
            value={formatEUR(result.anPv)}
          />
          <ResultRow
            label="Arbeitgeberanteil (zusätzlich)"
            value={formatEUR(result.agGesamt)}
          />
          <ResultRow
            label="Gesamtbeitrag (AN + AG)"
            value={formatEUR(result.gesamt)}
          />

          {result.amBbgGedeckelt && (
            <p className="mt-4 text-xs leading-relaxed text-nebel">
              Ihr Gehalt liegt über der Beitragsbemessungsgrenze von{" "}
              {formatEUR(BBG_KV_MONATLICH)}/Monat – die Berechnung erfolgt
              daher auf Basis der Bemessungsgrenze, nicht Ihres vollen
              Gehalts.
            </p>
          )}
          {result.kinderlosenzuschlagPflichtig && (
            <p className="mt-2 text-xs leading-relaxed text-nebel">
              Enthalten: Kinderlosenzuschlag von{" "}
              {formatProzent(PV_KINDERLOSENZUSCHLAG_PROZENT)} % zur
              Pflegeversicherung.
            </p>
          )}
        </div>

        <div className="rounded-sm bg-onyx p-8">
          <p className="mb-3 text-xs uppercase tracking-wide text-nebel/60">
            Ist ein Wechsel in die PKV möglich?
          </p>

          {!result.ueberJaeg ? (
            <>
              <p className="font-display text-lg font-semibold text-white">
                Aktuell nicht.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-nebel">
                Ihr Jahresgehalt von {formatEUR(result.jahresgehalt)} liegt
                unter der Jahresarbeitsentgeltgrenze (Versicherungspflichtgrenze)
                von {formatEUR(JAEG_JAHR)} (2026). Als angestellte Person
                bleiben Sie bis zum Überschreiten dieser Grenze gesetzlich
                versicherungspflichtig.
              </p>
            </>
          ) : alter <= 48 ? (
            <>
              <p className="font-display text-lg font-semibold text-gold">
                Grundsätzlich möglich.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-nebel">
                Ihr Jahresgehalt liegt über der Versicherungspflichtgrenze –
                ein Wechsel in die PKV kann für Sie sinnvoll sein. Ob es sich
                tatsächlich lohnt, hängt von Gesundheitszustand, gewünschtem
                Leistungsumfang und Lebensplanung ab. Eine pauschale Aussage
                allein über den Beitrag wäre nicht seriös – das prüfen wir
                gerne konkret mit Ihnen.
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-lg font-semibold text-white">
                Grundsätzlich möglich – Prüfung besonders wichtig.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-nebel">
                Ihr Jahresgehalt liegt über der Versicherungspflichtgrenze,
                ein Wechsel wäre formal möglich. In Ihrem Alter steigt der
                PKV-Beitrag durch das höhere Eintrittsalter jedoch spürbar,
                und bereits investierte Zeit in die gesetzlichen
                Altersrückstellungen ginge verloren. Wir raten hier
                ausdrücklich von einer pauschalen Einschätzung ab und prüfen
                das nur individuell mit Ihnen.
              </p>
            </>
          )}
        </div>

        <Link
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-sm bg-gold px-7 py-3.5 text-center text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
        >
          Persönlichen Vergleich besprechen
        </Link>
      </div>
    </div>
  );
}
