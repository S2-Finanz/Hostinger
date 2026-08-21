"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  FRAGEN,
  funnelAbsenden,
  naechsteFrage,
  type FunnelAntworten,
} from "@/lib/funnel";

type Ansicht = "frage" | "kontakt" | "danke";

const eingabeKlasse =
  "mt-1.5 block w-full rounded-sm border border-white/15 bg-onyx px-4 py-2.5 text-sm text-white placeholder:text-nebel/50 focus:border-gold focus:outline-none";

function FunnelStepper({ ansicht }: { ansicht: Ansicht }) {
  const schritte = [
    { key: "frage", label: "Qualifizierung" },
    { key: "kontakt", label: "Deine Daten" },
    { key: "danke", label: "Zusammenfassung" },
  ] as const;
  const aktiverIndex = schritte.findIndex((s) => s.key === ansicht);

  return (
    <div className="mx-auto flex max-w-md items-center justify-center gap-3">
      {schritte.map((schritt, i) => (
        <div key={schritt.key} className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                i <= aktiverIndex
                  ? "bg-gold text-onyx"
                  : "border border-white/20 text-nebel"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-xs ${i <= aktiverIndex ? "text-white" : "text-nebel/60"}`}
            >
              {schritt.label}
            </span>
          </div>
          {i < schritte.length - 1 && (
            <div className="mb-5 h-px w-10 bg-white/15" aria-hidden />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Funnel() {
  const [antworten, setAntworten] = useState<FunnelAntworten>({});
  const [verlauf, setVerlauf] = useState<string[]>([]);
  const [ansicht, setAnsicht] = useState<Ansicht>("frage");

  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [datenschutz, setDatenschutz] = useState(false);
  const [wirdGesendet, setWirdGesendet] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);

  const aktuelleFrageId = naechsteFrage(antworten);
  const aktuelleFrage = aktuelleFrageId ? FRAGEN[aktuelleFrageId] : null;

  const [mehrfachauswahl, setMehrfachauswahl] = useState<string[]>([]);
  const [dropdownWert, setDropdownWert] = useState("");

  function frageBeantworten(frageId: string, wert: string | string[]) {
    setAntworten((vorherige) => {
      const neu = { ...vorherige, [frageId]: wert };
      setVerlauf((v) => [...v, frageId]);
      return neu;
    });
    setMehrfachauswahl([]);
    setDropdownWert("");
    if (naechsteFrage({ ...antworten, [frageId]: wert }) === null) {
      setAnsicht("kontakt");
    }
  }

  function zurueck() {
    if (ansicht === "kontakt") setAnsicht("frage");
    setVerlauf((v) => {
      const letzte = v[v.length - 1];
      if (!letzte) return v;
      setAntworten((vorherige) => {
        const neu = { ...vorherige };
        delete neu[letzte];
        return neu;
      });
      return v.slice(0, -1);
    });
  }

  const kannZurueck = ansicht === "kontakt" || verlauf.length > 0;

  async function kontaktAbsenden(e: FormEvent) {
    e.preventDefault();
    setFehler(null);
    setWirdGesendet(true);
    try {
      await funnelAbsenden({
        vorname,
        nachname,
        email,
        telefon,
        antworten,
        newsletterOptIn: newsletter,
        datenschutzAkzeptiert: datenschutz,
      });
      setAnsicht("danke");
    } catch (err) {
      setFehler(
        err instanceof Error ? err.message : "Anfrage konnte nicht gesendet werden.",
      );
    } finally {
      setWirdGesendet(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <p className="text-center text-sm text-nebel">
        <Link href="/" className="hover:text-white">
          Home
        </Link>{" "}
        <span className="mx-1">/</span>
        <span className="text-gold">Kennenlernen</span>
      </p>

      <h1 className="mt-4 text-center font-display text-3xl font-bold md:text-4xl">
        Lern uns kennen
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center text-nebel">
        Beantworte ein paar kurze Fragen, damit wir deine finanzielle
        Situation besser kennenlernen können.
      </p>

      <div className="mt-10">
        <FunnelStepper ansicht={ansicht} />
      </div>

      <div className="mt-10 rounded-sm border border-white/10 bg-graphit p-8">
        {ansicht === "frage" && aktuelleFrage && (
          <div>
            <h2 className="font-display text-lg font-semibold text-white md:text-xl">
              {aktuelleFrage.frage}
            </h2>

            {aktuelleFrage.typ === "single" && (
              <div className="mt-6 flex flex-col gap-3">
                {aktuelleFrage.optionen.map((option) => (
                  <button
                    key={option.wert}
                    type="button"
                    onClick={() => frageBeantworten(aktuelleFrage.id, option.wert)}
                    className="w-full rounded-sm border border-white/15 bg-onyx px-5 py-3.5 text-left text-sm text-white transition-colors hover:border-gold hover:bg-gold/10"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {aktuelleFrage.typ === "multi" && (
              <div className="mt-6">
                <div className="flex flex-col gap-3">
                  {aktuelleFrage.optionen.map((option) => {
                    const ausgewaehlt = mehrfachauswahl.includes(option.wert);
                    return (
                      <button
                        key={option.wert}
                        type="button"
                        onClick={() =>
                          setMehrfachauswahl((vorherige) =>
                            ausgewaehlt
                              ? vorherige.filter((w) => w !== option.wert)
                              : [...vorherige, option.wert],
                          )
                        }
                        className={`flex w-full items-center gap-3 rounded-sm border px-5 py-3.5 text-left text-sm transition-colors ${
                          ausgewaehlt
                            ? "border-gold bg-gold/10 text-white"
                            : "border-white/15 bg-onyx text-white hover:border-gold/60"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${
                            ausgewaehlt ? "border-gold bg-gold" : "border-white/30"
                          }`}
                        >
                          {ausgewaehlt && (
                            <svg
                              viewBox="0 0 12 12"
                              className="h-3 w-3 text-onyx"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 6l3 3 5-6" />
                            </svg>
                          )}
                        </span>
                        {option.label}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  disabled={mehrfachauswahl.length === 0}
                  onClick={() => frageBeantworten(aktuelleFrage.id, mehrfachauswahl)}
                  className="mt-6 rounded-sm bg-gold px-7 py-3 text-sm font-semibold text-onyx transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  Weiter
                </button>
              </div>
            )}

            {aktuelleFrage.typ === "dropdown" && (
              <div className="mt-6">
                <select
                  value={dropdownWert}
                  onChange={(e) => setDropdownWert(e.target.value)}
                  className={eingabeKlasse}
                >
                  <option value="" disabled>
                    Bitte wählen …
                  </option>
                  {aktuelleFrage.optionen.map((option) => (
                    <option key={option.wert} value={option.wert} className="bg-graphit">
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  disabled={!dropdownWert}
                  onClick={() => frageBeantworten(aktuelleFrage.id, dropdownWert)}
                  className="mt-6 rounded-sm bg-gold px-7 py-3 text-sm font-semibold text-onyx transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  Weiter
                </button>
              </div>
            )}
          </div>
        )}

        {ansicht === "kontakt" && (
          <form onSubmit={kontaktAbsenden} className="flex flex-col gap-5">
            <h2 className="font-display text-lg font-semibold text-white md:text-xl">
              Deine Kontaktdaten
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-nebel">Vorname</span>
                <input
                  required
                  value={vorname}
                  onChange={(e) => setVorname(e.target.value)}
                  className={eingabeKlasse}
                />
              </label>
              <label className="block">
                <span className="text-sm text-nebel">Nachname</span>
                <input
                  required
                  value={nachname}
                  onChange={(e) => setNachname(e.target.value)}
                  className={eingabeKlasse}
                />
              </label>
              <label className="block">
                <span className="text-sm text-nebel">E-Mail</span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={eingabeKlasse}
                />
              </label>
              <label className="block">
                <span className="text-sm text-nebel">Telefon</span>
                <input
                  required
                  type="tel"
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                  className={eingabeKlasse}
                />
              </label>
            </div>

            <label className="flex items-start gap-3 text-sm text-nebel">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-white/30 bg-onyx accent-gold"
              />
              Ich möchte den S² Finanz-Newsletter mit Tipps rund ums Geld erhalten.
            </label>

            <label className="flex items-start gap-3 text-sm text-nebel">
              <input
                required
                type="checkbox"
                checked={datenschutz}
                onChange={(e) => setDatenschutz(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-white/30 bg-onyx accent-gold"
              />
              Ich stimme der{" "}
              <Link href="/datenschutz/" target="_blank" className="text-gold hover:underline">
                Datenschutzerklärung
              </Link>{" "}
              zu. *
            </label>

            {fehler && (
              <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                {fehler}
              </p>
            )}

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={wirdGesendet}
                className="rounded-sm bg-gold px-7 py-3 text-sm font-semibold text-onyx transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {wirdGesendet ? "Wird gesendet …" : "Weiter"}
              </button>
            </div>
          </form>
        )}

        {ansicht === "danke" && (
          <div className="text-center">
            <h2 className="font-display text-xl font-bold text-white">
              Danke, {vorname}!
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-nebel">
              Deine Anfrage ist bei uns eingegangen. Du erhältst gleich eine
              Bestätigung per E-Mail – wir melden uns schnellstmöglich bei
              dir.
            </p>
          </div>
        )}
      </div>

      {ansicht !== "danke" && kannZurueck && (
        <button
          type="button"
          onClick={zurueck}
          className="mt-6 text-sm text-nebel hover:text-white"
        >
          ← Zurück
        </button>
      )}
    </div>
  );
}
