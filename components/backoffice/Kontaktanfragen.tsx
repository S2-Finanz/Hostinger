"use client";

import { useEffect, useState } from "react";
import {
  ladeKontaktanfragen,
  markiereKontaktanfrageGelesen,
  type Kontaktanfrage,
} from "@/lib/backoffice";
import { KONTAKT_THEMEN } from "@/lib/kontakt";

const THEMA_LABEL = Object.fromEntries(KONTAKT_THEMEN.map((t) => [t.value, t.label]));

function formatDatum(iso: string): string {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Kontaktanfragen() {
  const [anfragen, setAnfragen] = useState<Kontaktanfrage[] | null>(null);
  const [fehler, setFehler] = useState<string | null>(null);

  useEffect(() => {
    ladeKontaktanfragen()
      .then((daten) => setAnfragen(daten))
      .catch((e) => setFehler(e instanceof Error ? e.message : "Anfragen konnten nicht geladen werden."));
  }, []);

  async function toggleGelesen(anfrage: Kontaktanfrage) {
    const neuerStatus = !anfrage.gelesen;
    setAnfragen((vorherige) =>
      vorherige?.map((a) => (a.id === anfrage.id ? { ...a, gelesen: neuerStatus } : a)) ?? null,
    );
    try {
      await markiereKontaktanfrageGelesen(anfrage.id, neuerStatus);
    } catch (e) {
      setFehler(e instanceof Error ? e.message : "Status konnte nicht geändert werden.");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display text-lg font-semibold text-white">Kontaktanfragen</h2>

      {fehler && (
        <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {fehler}
        </p>
      )}
      {anfragen === null && !fehler && <p className="text-sm text-nebel">Wird geladen …</p>}
      {anfragen?.length === 0 && <p className="text-sm text-nebel">Noch keine Kontaktanfragen.</p>}

      <div className="flex flex-col gap-3">
        {anfragen?.map((anfrage) => (
          <div
            key={anfrage.id}
            className={`rounded-sm border p-5 ${
              anfrage.gelesen ? "border-white/10 bg-graphit" : "border-gold/40 bg-graphit"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-white">{anfrage.name}</p>
                <p className="mt-0.5 text-sm text-nebel">
                  {anfrage.email}
                  {anfrage.telefon ? ` · ${anfrage.telefon}` : ""}
                </p>
                <p className="mt-1 text-xs text-nebel">
                  {formatDatum(anfrage.erstellt_am)} · {THEMA_LABEL[anfrage.thema] ?? anfrage.thema}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleGelesen(anfrage)}
                className={`shrink-0 rounded-sm border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                  anfrage.gelesen
                    ? "border-white/20 text-nebel hover:text-white"
                    : "border-gold/40 text-gold"
                }`}
              >
                {anfrage.gelesen ? "Gelesen" : "Neu – als gelesen markieren"}
              </button>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-nebel">{anfrage.nachricht}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
