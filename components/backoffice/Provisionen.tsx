"use client";

import { useMemo, useState } from "react";
import { PROVISIONS_KATEGORIEN } from "@/lib/provisionen";
import Provisionsrechner from "@/components/backoffice/Provisionsrechner";

const HINWEIS_KUERZE = 90;

function HinweisZelle({ text }: { text: string }) {
  const [offen, setOffen] = useState(false);

  if (!text) return <span className="text-nebel/40">–</span>;
  if (text.length <= HINWEIS_KUERZE) {
    return <span className="whitespace-pre-line">{text}</span>;
  }

  return (
    <div>
      <span className="whitespace-pre-line">
        {offen ? text : `${text.slice(0, HINWEIS_KUERZE)}…`}
      </span>{" "}
      <button
        type="button"
        onClick={() => setOffen((v) => !v)}
        className="text-gold hover:underline"
      >
        {offen ? "weniger" : "mehr"}
      </button>
    </div>
  );
}

export default function Provisionen() {
  const [ansicht, setAnsicht] = useState<"uebersicht" | "rechner">("uebersicht");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-fit rounded-sm border border-white/10 p-1 text-sm">
        <button
          type="button"
          onClick={() => setAnsicht("uebersicht")}
          className={`rounded-sm px-5 py-2 font-semibold transition-colors ${
            ansicht === "uebersicht" ? "bg-gold text-onyx" : "text-nebel hover:text-white"
          }`}
        >
          Übersicht
        </button>
        <button
          type="button"
          onClick={() => setAnsicht("rechner")}
          className={`rounded-sm px-5 py-2 font-semibold transition-colors ${
            ansicht === "rechner" ? "bg-gold text-onyx" : "text-nebel hover:text-white"
          }`}
        >
          Rechner
        </button>
      </div>

      {ansicht === "uebersicht" ? <ProvisionsUebersicht /> : <Provisionsrechner />}
    </div>
  );
}

function ProvisionsUebersicht() {
  const [kategorieKey, setKategorieKey] = useState(PROVISIONS_KATEGORIEN[0].key);
  const [suche, setSuche] = useState("");

  const kategorie = PROVISIONS_KATEGORIEN.find((k) => k.key === kategorieKey)!;

  const gefilterteEintraege = useMemo(() => {
    const suchbegriff = suche.trim().toLowerCase();
    if (!suchbegriff) return kategorie.eintraege;
    return kategorie.eintraege.filter(
      (e) =>
        e.gesellschaft.toLowerCase().includes(suchbegriff) ||
        e.sparte.toLowerCase().includes(suchbegriff) ||
        e.tarif.toLowerCase().includes(suchbegriff),
    );
  }, [kategorie, suche]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 rounded-sm border border-white/10 bg-graphit p-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-nebel">Sparte</span>
          <select
            value={kategorieKey}
            onChange={(e) => {
              setKategorieKey(e.target.value);
              setSuche("");
            }}
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
          <span className="text-sm text-nebel">Gesellschaft suchen</span>
          <input
            value={suche}
            onChange={(e) => setSuche(e.target.value)}
            placeholder="z. B. Allianz"
            className="mt-1.5 block w-full rounded-sm border border-white/15 bg-onyx px-4 py-2.5 text-sm text-white placeholder:text-nebel/50 focus:border-gold focus:outline-none"
          />
        </label>
      </div>

      <p className="text-sm text-nebel">
        {gefilterteEintraege.length} von {kategorie.eintraege.length} Einträgen in „
        {kategorie.label}"
      </p>

      <div className="overflow-x-auto rounded-sm border border-white/10 bg-graphit">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-nebel/60">
            <tr>
              <th className="px-4 py-3 font-medium">Gesellschaft</th>
              <th className="px-4 py-3 font-medium">Sparte</th>
              <th className="px-4 py-3 font-medium">Tarif</th>
              <th className="px-4 py-3 font-medium">BP</th>
              <th className="px-4 py-3 font-medium">AP</th>
              <th className="px-4 py-3 font-medium">Dyn</th>
              <th className="px-4 py-3 font-medium">Storno­haftung</th>
              <th className="px-4 py-3 font-medium">Hinweis</th>
            </tr>
          </thead>
          <tbody>
            {gefilterteEintraege.map((e, i) => (
              <tr key={i} className="border-b border-white/5 align-top last:border-b-0">
                <td className="px-4 py-3 text-white">{e.gesellschaft}</td>
                <td className="px-4 py-3 text-nebel">{e.sparte}</td>
                <td className="px-4 py-3 text-nebel">{e.tarif || "–"}</td>
                <td className="px-4 py-3 text-white">{e.bp || "–"}</td>
                <td className="px-4 py-3 text-white">{e.ap || "–"}</td>
                <td className="px-4 py-3 text-white">{e.dyn || "–"}</td>
                <td className="px-4 py-3 text-nebel">{e.stornohaftung || "–"}</td>
                <td className="max-w-md px-4 py-3 text-nebel">
                  <HinweisZelle text={e.hinweis} />
                </td>
              </tr>
            ))}
            {gefilterteEintraege.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-nebel">
                  Keine Einträge gefunden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs leading-relaxed text-nebel/60">
        Datengrundlage: intern bereitgestellte Provisionsübersicht (Stand: August 2026).
        Sätze und Bedingungen können sich ändern – im Zweifel gelten die aktuellen
        Courtagebestimmungen der jeweiligen Gesellschaft.
      </p>
    </div>
  );
}
