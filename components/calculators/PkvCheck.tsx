"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";
import {
  NumberField,
  SliderField,
  formatEUR,
} from "@/components/calculators/ui";
import {
  ANDERE_KASSE,
  JAEG_JAHR,
  KINDERLOSENZUSCHLAG_AB_ALTER,
  KRANKENKASSEN,
  berechneGkvBeitrag,
  formatProzent,
} from "@/lib/gkv";
import {
  PKV_ALTER_MAX,
  PKV_ALTER_MIN,
  PKV_KIND_BEITRAG,
  berechnePkvArbeitgeberzuschuss,
  pkvEigenanteil,
} from "@/lib/pkv";

const MARKTDURCHSCHNITT_ZUSATZBEITRAG =
  KRANKENKASSEN.reduce((summe, k) => summe + k.zusatzbeitrag, 0) /
  KRANKENKASSEN.length;

export default function PkvCheck() {
  const [alter, setAlter] = useState(32);
  const [jahresgehalt, setJahresgehalt] = useState(80000);
  const [krankenkasse, setKrankenkasse] = useState("");
  const [zusatzbeitrag, setZusatzbeitrag] = useState(2.9);
  const [hatKinder, setHatKinder] = useState(true);
  const [anzahlKinder, setAnzahlKinder] = useState(1);

  const brutto = jahresgehalt / 12;

  const gkv = useMemo(
    () => berechneGkvBeitrag({ brutto, alter, zusatzbeitrag, hatKinder }),
    [brutto, alter, zusatzbeitrag, hatKinder],
  );
  const pkv = useMemo(() => pkvEigenanteil(alter), [alter]);

  const kinderAnzahl = hatKinder ? anzahlKinder : 0;
  const kinderKostenGesamt = kinderAnzahl * PKV_KIND_BEITRAG;
  const pkvGesamtVon = pkv.von + kinderKostenGesamt;
  const pkvGesamtBis = pkv.bis + kinderKostenGesamt;

  // Der Arbeitgeberzuschuss bezieht sich gesetzlich nur auf den eigenen
  // Vertrag der angestellten Person, nicht auf mitversicherte Kinder.
  const pkvAgZuschussVon = berechnePkvArbeitgeberzuschuss(
    pkv.von,
    gkv.agGesamt,
  );
  const pkvAgZuschussBis = berechnePkvArbeitgeberzuschuss(
    pkv.bis,
    gkv.agGesamt,
  );
  const pkvAnteilVon = pkvGesamtVon - pkvAgZuschussVon;
  const pkvAnteilBis = pkvGesamtBis - pkvAgZuschussBis;

  // Positiv = Ersparnis ggü. GKV, negativ = teurer als GKV.
  const sparenBeiGuenstigstemTarif = gkv.anGesamt - pkvAnteilVon;
  const sparenBeiTeuerstemTarif = gkv.anGesamt - pkvAnteilBis;
  const alleTarifeGuenstiger = sparenBeiTeuerstemTarif > 0;
  const alleTarifeTeurer = sparenBeiGuenstigstemTarif <= 0;

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr]">
        <div className="flex flex-col gap-7 rounded-sm bg-onyx p-8">
          <h2 className="font-display text-lg font-semibold text-white">
            Ihre Angaben
          </h2>

          <SliderField
            label="Alter"
            value={alter}
            onChange={setAlter}
            min={18}
            max={65}
            formatValue={(v) => `${v} Jahre`}
          />

          <SliderField
            label="Bruttojahreseinkommen"
            value={jahresgehalt}
            onChange={setJahresgehalt}
            min={20000}
            max={150000}
            step={1000}
            formatValue={(v) => formatEUR(v)}
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

          {hatKinder && (
            <NumberField
              label="Anzahl Kinder in der PKV"
              value={anzahlKinder}
              onChange={(v) => setAnzahlKinder(Math.max(1, Math.round(v)))}
              min={1}
              max={10}
              step={1}
            />
          )}

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
          <p className="-mt-4 text-xs text-nebel">
            Marktdurchschnitt zum 01.01.2026:{" "}
            {formatProzent(MARKTDURCHSCHNITT_ZUSATZBEITRAG)} %
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-sm bg-graphit p-6">
              <p className="text-xs uppercase tracking-wide text-nebel/60">
                GKV (Gesamtbeitrag)
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-white">
                {formatEUR(gkv.gesamt)}
              </p>
              <p className="mt-2 text-sm text-nebel">
                Ihr Anteil: {formatEUR(gkv.anGesamt)} / Monat
              </p>
            </div>
            <div className="rounded-sm border border-gold/40 bg-graphit p-6">
              <p className="text-xs uppercase tracking-wide text-nebel/60">
                PKV (Beitrag zum privaten Vertrag)
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-white">
                {formatEUR(pkvGesamtVon)} – {formatEUR(pkvGesamtBis)}
              </p>
              <p className="mt-2 text-sm text-nebel">
                Ihr Anteil nach Arbeitgeberzuschuss: {formatEUR(pkvAnteilVon)}{" "}
                – {formatEUR(pkvAnteilBis)} / Monat
              </p>
              {kinderAnzahl > 0 && (
                <p className="mt-2 text-xs text-nebel">
                  Enthält {kinderAnzahl} Kind
                  {kinderAnzahl > 1 ? "er" : ""} à{" "}
                  {formatEUR(PKV_KIND_BEITRAG)} ={" "}
                  {formatEUR(kinderKostenGesamt)}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-sm border border-gold/40 bg-onyx p-8 text-center">
            <p className="text-xs uppercase tracking-wide text-nebel/60">
              Ergebnis
            </p>
            {alleTarifeGuenstiger ? (
              <p className="mt-3 font-display text-xl font-bold text-gold">
                Mit einem Wechsel könnten Sie je nach Tarif zwischen{" "}
                {formatEUR(sparenBeiTeuerstemTarif)} und{" "}
                {formatEUR(sparenBeiGuenstigstemTarif)} monatlich sparen.
              </p>
            ) : alleTarifeTeurer ? (
              <p className="mt-3 font-display text-xl font-bold text-white">
                Der PKV-Beitrag läge in Ihrem Alter voraussichtlich über
                Ihrem GKV-Anteil – je nach Tarif zwischen{" "}
                {formatEUR(Math.abs(sparenBeiGuenstigstemTarif))} und{" "}
                {formatEUR(Math.abs(sparenBeiTeuerstemTarif))} mehr pro
                Monat. Die Leistungen können dennoch deutlich umfangreicher
                sein.
              </p>
            ) : (
              <p className="mt-3 font-display text-xl font-bold text-white">
                Je nach gewähltem Tarif könnten Sie bis zu{" "}
                {formatEUR(sparenBeiGuenstigstemTarif)} monatlich sparen –
                bei umfangreicheren Tarifen kann es aber auch teurer werden
                als in der GKV.
              </p>
            )}
            {!gkv.ueberJaeg && (
              <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-relaxed text-white">
                Hinweis: Bei diesem Gehalt liegt Ihr Einkommen unter der
                Jahresarbeitsentgeltgrenze – ein Wechsel in die PKV ist
                aktuell nicht möglich (siehe Wechsel-Einschätzung unten).
              </p>
            )}
            <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-nebel">
              Nur eine individuelle Berechnung kann Ihnen Sicherheit geben.
              In der PKV ist insbesondere Ihr Gesundheitszustand
              ausschlaggebend für den tatsächlichen Beitrag.
            </p>
            {pkv.ausserhalbDatengrundlage && (
              <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-nebel">
                Für Ihr Eintrittsalter liegen keine spezifischen
                PKV-Richtwerte vor – die Berechnung nutzt den Randwert für{" "}
                {alter < PKV_ALTER_MIN ? PKV_ALTER_MIN : PKV_ALTER_MAX} Jahre
                als Orientierung. Lassen Sie sich in diesem Fall unbedingt
                individuell beraten.
              </p>
            )}
          </div>

          <div className="overflow-x-auto rounded-sm bg-graphit p-6">
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-nebel/60">
                  <th className="py-3 pr-4 font-normal">Posten</th>
                  <th className="py-3 pr-4 text-right font-normal">GKV</th>
                  <th className="py-3 text-right font-normal">
                    PKV (Bandbreite)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="py-3 pr-4 text-nebel">
                    Beitrag insgesamt (Kranken- + Pflegeversicherung
                    {kinderAnzahl > 0 ? " + Kinder" : ""})
                  </td>
                  <td className="py-3 pr-4 text-right text-white">
                    {formatEUR(gkv.gesamt)}
                  </td>
                  <td className="py-3 text-right text-white">
                    {formatEUR(pkvGesamtVon)} – {formatEUR(pkvGesamtBis)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-nebel">
                    Arbeitgeberanteil
                  </td>
                  <td className="py-3 pr-4 text-right text-white">
                    – {formatEUR(gkv.agGesamt)}
                  </td>
                  <td className="py-3 text-right text-white">
                    – {formatEUR(pkvAgZuschussVon)} bis –{" "}
                    {formatEUR(pkvAgZuschussBis)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-white">
                    Ihr Anteil gesamt
                  </td>
                  <td className="py-3 pr-4 text-right font-semibold text-gold">
                    {formatEUR(gkv.anGesamt)}
                  </td>
                  <td className="py-3 text-right font-semibold text-gold">
                    {formatEUR(pkvAnteilVon)} – {formatEUR(pkvAnteilBis)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-sm bg-onyx p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-wide text-nebel/60">
                Wechsel-Einschätzung (2026)
              </p>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  !gkv.ueberJaeg
                    ? "border-white/20 text-nebel"
                    : "border-gold/40 bg-gold/10 text-gold"
                }`}
              >
                {!gkv.ueberJaeg
                  ? "Aktuell nicht möglich"
                  : "Wechsel grundsätzlich möglich"}
              </span>
            </div>

            {!gkv.ueberJaeg ? (
              <p className="mt-4 text-sm leading-relaxed text-nebel">
                Ihr Jahresgehalt von {formatEUR(gkv.jahresgehalt)} liegt
                unter der Jahresarbeitsentgeltgrenze (Versicherungspflicht-
                grenze) von {formatEUR(JAEG_JAHR)} (2026). Als angestellte
                Person bleiben Sie bis zum Überschreiten dieser Grenze
                gesetzlich versicherungspflichtig.
              </p>
            ) : (
              <>
                <p className="mt-4 text-sm leading-relaxed text-nebel">
                  Ihr Jahresgehalt liegt über der Versicherungspflichtgrenze
                  – ein Wechsel in die PKV kann für Sie daher grundsätzlich
                  infrage kommen
                  {alter >= 49
                    ? ", sollte mit steigendem Eintrittsalter aber besonders sorgfältig geprüft werden"
                    : ""}
                  . Ob es sich tatsächlich lohnt, hängt von Gesundheits-
                  zustand, gewünschtem Leistungsumfang und Lebensplanung ab –
                  eine pauschale Aussage allein über den Beitrag wäre nicht
                  seriös.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-nebel">
                  Wichtig: Bei Angestellten endet die Versicherungspflicht
                  regulär erst zum Jahresende, und auch nur, wenn das
                  Einkommen auch im Folgejahr über der dann geltenden Grenze
                  liegt.
                </p>
              </>
            )}
          </div>

          <div className="rounded-sm bg-onyx p-8">
            <p className="text-xs uppercase tracking-wide text-nebel/60">
              Verwendete Annahmen
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-nebel">
              <li>
                Die PKV-Beitragsspannen basieren auf Marktrichtwerten für
                Angestellte 2026 und sind rein altersabhängig modelliert.
              </li>
              <li>
                Der tatsächliche Beitrag hängt von Gesundheitsprüfung,
                Risikozuschlägen und gewünschtem Leistungsumfang ab und kann
                davon abweichen.
              </li>
              <li>
                Für mitversicherte Kinder rechnen wir pauschal mit{" "}
                {formatEUR(PKV_KIND_BEITRAG)} Gesamtbeitrag pro Kind (eigener
                Kindertarif in der PKV), ohne Arbeitgeberzuschuss – dieser
                bezieht sich gesetzlich nur auf den Vertrag der angestellten
                Person selbst.
              </li>
              <li>
                Der Arbeitgeberzuschuss zur PKV wird mit der Hälfte des
                eigenen Beitrags berechnet, gedeckelt auf den Betrag, den der
                Arbeitgeber maximal in die GKV einzahlen würde (§ 257 SGB V).
              </li>
              <li>
                Der GKV-Beitrag wird auf Basis Ihrer Angaben berechnet
                (Gehalt, Alter, Kinder, Zusatzbeitrag) inkl.
                Beitragsbemessungsgrenze.
              </li>
              <li>
                Ein Wechsel in die PKV ist nur oberhalb der
                Jahresarbeitsentgeltgrenze möglich. Liegt Ihr Gehalt darunter,
                dienen die angezeigten Zahlen nur der Orientierung für den
                Fall eines künftig höheren Einkommens.
              </li>
              <li>
                Richtwerte liegen nur für Eintrittsalter {PKV_ALTER_MIN} bis{" "}
                {PKV_ALTER_MAX} Jahre vor; außerhalb dieser Spanne ist eine
                individuelle Prüfung besonders wichtig.
              </li>
            </ul>
          </div>

          <Link
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-sm bg-gold px-7 py-3.5 text-center text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
          >
            Individuelle PKV-Analyse anfordern
          </Link>
        </div>
      </div>

      <p className="text-xs text-nebel">
        Ohne Kinder erhöht sich Ihr Anteil an der Pflegeversicherung ab{" "}
        {KINDERLOSENZUSCHLAG_AB_ALTER} Jahren um den Kinderlosenzuschlag –
        bereits in der GKV-Berechnung oben berücksichtigt.
      </p>
    </div>
  );
}
