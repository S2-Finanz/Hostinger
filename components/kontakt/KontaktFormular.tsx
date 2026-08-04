"use client";

import { useState, type FormEvent } from "react";
import { KONTAKT_THEMEN, sendeKontaktanfrage, type KontaktThema } from "@/lib/kontakt";

const eingabeKlasse =
  "mt-1.5 block w-full rounded-sm border border-white/15 bg-onyx px-4 py-2.5 text-sm text-white placeholder:text-nebel/50 focus:border-gold focus:outline-none";

export default function KontaktFormular() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [thema, setThema] = useState<KontaktThema>("allgemeine-analyse");
  const [nachricht, setNachricht] = useState("");
  const [webseite, setWebseite] = useState("");
  const [datenschutzAkzeptiert, setDatenschutzAkzeptiert] = useState(false);
  const [wirdGesendet, setWirdGesendet] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  const [gesendet, setGesendet] = useState(false);

  async function absenden(e: FormEvent) {
    e.preventDefault();
    setFehler(null);

    if (!datenschutzAkzeptiert) {
      setFehler("Bitte stimmen Sie der Verarbeitung Ihrer Daten zu.");
      return;
    }

    setWirdGesendet(true);
    try {
      await sendeKontaktanfrage({ name, email, telefon, thema, nachricht, webseite });
      setGesendet(true);
    } catch (e) {
      setFehler(
        e instanceof Error ? e.message : "Die Nachricht konnte nicht gesendet werden.",
      );
    } finally {
      setWirdGesendet(false);
    }
  }

  if (gesendet) {
    return (
      <div className="rounded-sm border border-gold/30 bg-graphit p-8 text-center">
        <h2 className="font-display text-xl font-bold text-white">Vielen Dank!</h2>
        <p className="mt-3 text-sm text-nebel">
          Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={absenden} className="flex flex-col gap-5 rounded-sm border border-white/10 bg-graphit p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-nebel">Name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={eingabeKlasse}
          />
        </label>
        <label className="block">
          <span className="text-sm text-nebel">E-Mail-Adresse</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={eingabeKlasse}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-nebel">Telefon (optional)</span>
          <input
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            className={eingabeKlasse}
          />
        </label>
        <label className="block">
          <span className="text-sm text-nebel">Worum geht es?</span>
          <select
            value={thema}
            onChange={(e) => setThema(e.target.value as KontaktThema)}
            className={eingabeKlasse}
          >
            {KONTAKT_THEMEN.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm text-nebel">Ihre Nachricht</span>
        <textarea
          required
          rows={5}
          value={nachricht}
          onChange={(e) => setNachricht(e.target.value)}
          className={eingabeKlasse}
        />
      </label>

      <label className="hidden" aria-hidden="true">
        Webseite
        <input
          tabIndex={-1}
          autoComplete="off"
          value={webseite}
          onChange={(e) => setWebseite(e.target.value)}
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-nebel">
        <input
          type="checkbox"
          checked={datenschutzAkzeptiert}
          onChange={(e) => setDatenschutzAkzeptiert(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-gold"
        />
        <span>
          Ich habe die{" "}
          <a href="/datenschutz/" className="text-gold underline-offset-2 hover:underline">
            Datenschutzerklärung
          </a>{" "}
          gelesen und bin mit der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage
          einverstanden.
        </span>
      </label>

      {fehler && (
        <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {fehler}
        </p>
      )}

      <button
        type="submit"
        disabled={wirdGesendet}
        className="self-start rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {wirdGesendet ? "Wird gesendet …" : "Nachricht senden"}
      </button>
    </form>
  );
}
