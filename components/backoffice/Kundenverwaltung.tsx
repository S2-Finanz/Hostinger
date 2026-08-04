"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  erstelleUndVersendeFragebogen,
  ladeFragebogenFuerKunde,
  ladeKunden,
  legeKundeAn,
  type FragebogenEintrag,
  type Kunde,
} from "@/lib/backoffice";
import FragebogenAnsicht from "@/components/backoffice/FragebogenAnsicht";

const eingabeKlasse =
  "mt-1.5 block w-full rounded-sm border border-white/15 bg-onyx px-4 py-2.5 text-sm text-white placeholder:text-nebel/50 focus:border-gold focus:outline-none";

const STATUS_LABEL: Record<FragebogenEintrag["status"], string> = {
  erstellt: "Erstellt",
  versendet: "Versendet",
  ausgefuellt: "Ausgefüllt",
};

const STATUS_FARBE: Record<FragebogenEintrag["status"], string> = {
  erstellt: "border-white/20 text-nebel",
  versendet: "border-gold/40 text-gold",
  ausgefuellt: "border-green-500/40 text-green-400",
};

function formatDatum(iso: string | null): string {
  if (!iso) return "–";
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Kundenverwaltung() {
  const [kunden, setKunden] = useState<Kunde[] | null>(null);
  const [fehler, setFehler] = useState<string | null>(null);

  async function neuLaden() {
    try {
      const daten = await ladeKunden();
      setKunden(daten);
    } catch (e) {
      setFehler(e instanceof Error ? e.message : "Kunden konnten nicht geladen werden.");
    }
  }

  useEffect(() => {
    ladeKunden()
      .then((daten) => setKunden(daten))
      .catch((e) => setFehler(e instanceof Error ? e.message : "Kunden konnten nicht geladen werden."));
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <KundeAnlegenFormular onAngelegt={neuLaden} />

      <div>
        <h2 className="font-display text-lg font-semibold text-white">Kunden</h2>
        {fehler && (
          <p className="mt-3 rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
            {fehler}
          </p>
        )}
        {kunden === null && !fehler && <p className="mt-3 text-sm text-nebel">Wird geladen …</p>}
        {kunden !== null && kunden.length === 0 && (
          <p className="mt-3 text-sm text-nebel">Noch keine Kunden angelegt.</p>
        )}
        <div className="mt-4 flex flex-col gap-3">
          {kunden?.map((kunde) => <KundeZeile key={kunde.id} kunde={kunde} />)}
        </div>
      </div>
    </div>
  );
}

function KundeAnlegenFormular({ onAngelegt }: { onAngelegt: () => void }) {
  const [offen, setOffen] = useState(false);
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [geburtsdatum, setGeburtsdatum] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [wirdGespeichert, setWirdGespeichert] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);

  async function absenden(e: FormEvent) {
    e.preventDefault();
    setFehler(null);
    setWirdGespeichert(true);
    try {
      await legeKundeAn({ vorname, nachname, geburtsdatum, email, telefon });
      setVorname("");
      setNachname("");
      setGeburtsdatum("");
      setEmail("");
      setTelefon("");
      setOffen(false);
      onAngelegt();
    } catch (e) {
      setFehler(e instanceof Error ? e.message : "Kunde konnte nicht angelegt werden.");
    } finally {
      setWirdGespeichert(false);
    }
  }

  if (!offen) {
    return (
      <button
        type="button"
        onClick={() => setOffen(true)}
        className="self-start rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
      >
        + Neuen Kunden anlegen
      </button>
    );
  }

  return (
    <form
      onSubmit={absenden}
      className="flex flex-col gap-4 rounded-sm border border-white/10 bg-graphit p-6"
    >
      <h2 className="font-display text-base font-semibold text-white">Neuen Kunden anlegen</h2>

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
          <span className="text-sm text-nebel">Geburtsdatum</span>
          <input
            required
            type="date"
            value={geburtsdatum}
            onChange={(e) => setGeburtsdatum(e.target.value)}
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
        <label className="block sm:col-span-2">
          <span className="text-sm text-nebel">Telefon (optional)</span>
          <input
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            className={eingabeKlasse}
          />
        </label>
      </div>

      {fehler && (
        <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {fehler}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={wirdGespeichert}
          className="rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-onyx transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {wirdGespeichert ? "Wird gespeichert …" : "Kunde anlegen"}
        </button>
        <button
          type="button"
          onClick={() => setOffen(false)}
          className="rounded-sm border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}

function KundeZeile({ kunde }: { kunde: Kunde }) {
  const [verlaufOffen, setVerlaufOffen] = useState(false);
  const [fragebogen, setFragebogen] = useState<FragebogenEintrag[] | null>(null);
  const [wirdVersendet, setWirdVersendet] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  const [erfolg, setErfolg] = useState<string | null>(null);
  const [angezeigterFragebogenId, setAngezeigterFragebogenId] = useState<string | null>(null);

  async function verlaufLaden() {
    try {
      const daten = await ladeFragebogenFuerKunde(kunde.id);
      setFragebogen(daten);
    } catch (e) {
      setFehler(e instanceof Error ? e.message : "Verlauf konnte nicht geladen werden.");
    }
  }

  async function toggleVerlauf() {
    const neuerZustand = !verlaufOffen;
    setVerlaufOffen(neuerZustand);
    if (neuerZustand && fragebogen === null) {
      await verlaufLaden();
    }
  }

  async function fragebogenSenden() {
    setFehler(null);
    setErfolg(null);
    setWirdVersendet(true);
    try {
      await erstelleUndVersendeFragebogen(kunde.id);
      setErfolg("Fragebogen wurde per E-Mail versendet.");
      if (verlaufOffen) await verlaufLaden();
    } catch (e) {
      setFehler(e instanceof Error ? e.message : "Fragebogen konnte nicht versendet werden.");
    } finally {
      setWirdVersendet(false);
    }
  }

  const letzterStatus = fragebogen?.[0]?.status;

  return (
    <div className="rounded-sm border border-white/10 bg-graphit p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-white">
            {kunde.vorname} {kunde.nachname}
          </p>
          <p className="mt-0.5 text-sm text-nebel">
            {new Date(kunde.geburtsdatum).toLocaleDateString("de-DE")} · {kunde.email}
            {kunde.telefon ? ` · ${kunde.telefon}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {letzterStatus && (
            <span
              className={`rounded-sm border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${STATUS_FARBE[letzterStatus]}`}
            >
              {STATUS_LABEL[letzterStatus]}
            </span>
          )}
          <button
            type="button"
            onClick={toggleVerlauf}
            className="text-sm text-nebel underline-offset-2 hover:text-white hover:underline"
          >
            {verlaufOffen ? "Verlauf ausblenden" : "Verlauf anzeigen"}
          </button>
          <button
            type="button"
            onClick={fragebogenSenden}
            disabled={wirdVersendet}
            className="rounded-sm bg-gold px-5 py-2.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {wirdVersendet ? "Wird versendet …" : "Fragebogen senden"}
          </button>
        </div>
      </div>

      {fehler && (
        <p className="mt-4 rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {fehler}
        </p>
      )}
      {erfolg && (
        <p className="mt-4 rounded-sm border border-gold/30 bg-gold/10 px-4 py-2.5 text-sm text-gold">
          {erfolg}
        </p>
      )}

      {verlaufOffen && (
        <div className="mt-4 border-t border-white/10 pt-4">
          {fragebogen === null && <p className="text-sm text-nebel">Wird geladen …</p>}
          {fragebogen?.length === 0 && (
            <p className="text-sm text-nebel">Noch kein Fragebogen versendet.</p>
          )}
          <ul className="flex flex-col gap-3">
            {fragebogen?.map((eintrag) => (
              <li key={eintrag.id}>
                <div className="flex flex-wrap items-center gap-3 text-sm text-nebel">
                  <span
                    className={`rounded-sm border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${STATUS_FARBE[eintrag.status]}`}
                  >
                    {STATUS_LABEL[eintrag.status]}
                  </span>
                  <span>Erstellt: {formatDatum(eintrag.erstellt_am)}</span>
                  <span>Versendet: {formatDatum(eintrag.versendet_am)}</span>
                  <span>Ausgefüllt: {formatDatum(eintrag.ausgefuellt_am)}</span>
                  {eintrag.status === "ausgefuellt" && (
                    <button
                      type="button"
                      onClick={() =>
                        setAngezeigterFragebogenId(
                          angezeigterFragebogenId === eintrag.id ? null : eintrag.id,
                        )
                      }
                      className="text-gold underline-offset-2 hover:underline"
                    >
                      {angezeigterFragebogenId === eintrag.id
                        ? "Antworten ausblenden"
                        : "Antworten ansehen"}
                    </button>
                  )}
                </div>
                {angezeigterFragebogenId === eintrag.id && (
                  <div className="mt-3 rounded-sm border border-white/10 bg-onyx p-4">
                    <FragebogenAnsicht fragebogenId={eintrag.id} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
