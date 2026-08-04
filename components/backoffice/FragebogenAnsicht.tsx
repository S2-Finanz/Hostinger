"use client";

import { useEffect, useState } from "react";
import { ladeFragebogenDetail, type FragebogenDetail } from "@/lib/backoffice";
import { FRAGEBOGEN_ABSCHNITTE } from "@/lib/fragebogenFragen";

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

export default function FragebogenAnsicht({ fragebogenId }: { fragebogenId: string }) {
  const [detail, setDetail] = useState<FragebogenDetail | null>(null);
  const [fehler, setFehler] = useState<string | null>(null);

  useEffect(() => {
    ladeFragebogenDetail(fragebogenId)
      .then((daten) => setDetail(daten))
      .catch((e) => setFehler(e instanceof Error ? e.message : "Antworten konnten nicht geladen werden."));
  }, [fragebogenId]);

  if (fehler) {
    return (
      <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
        {fehler}
      </p>
    );
  }

  if (!detail) {
    return <p className="text-sm text-nebel">Wird geladen …</p>;
  }

  const antworten = detail.antworten ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-2 text-sm text-nebel sm:grid-cols-2">
        <span>Ausgefüllt am: {formatDatum(detail.ausgefuellt_am)}</span>
        <span>IP-Adresse bei Unterschrift: {detail.unterschrift_ip ?? "–"}</span>
      </div>

      {FRAGEBOGEN_ABSCHNITTE.map((abschnitt) => {
        const beantworteteFragen = abschnitt.fragen.filter(
          (frage) => antworten[frage.id] !== undefined,
        );
        if (beantworteteFragen.length === 0) return null;

        return (
          <div key={abschnitt.titel}>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">
              {abschnitt.titel}
            </p>
            <dl className="mt-2 flex flex-col gap-3">
              {beantworteteFragen.map((frage) => {
                const wert = antworten[frage.id];
                const beschreibung = antworten[`${frage.id}_beschreibung`];
                return (
                  <div key={frage.id} className="rounded-sm border border-white/10 bg-onyx p-3">
                    <dt className="text-sm text-nebel">{frage.frage}</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">
                      {frage.typ === "jaNein" ? (wert === "ja" ? "Ja" : "Nein") : wert}
                      {frage.typ === "zahl" && frage.einheit ? ` ${frage.einheit}` : ""}
                    </dd>
                    {beschreibung && (
                      <dd className="mt-1.5 text-sm text-nebel">{beschreibung}</dd>
                    )}
                  </div>
                );
              })}
            </dl>
          </div>
        );
      })}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">
          Bestätigung und Einwilligung
        </p>
        <div className="mt-2 flex flex-col gap-3 text-sm text-nebel">
          {detail.einwilligungstext && (
            <p className="rounded-sm border border-white/10 bg-onyx p-3">
              {detail.einwilligungstext}
            </p>
          )}
          {detail.bestaetigungstext && (
            <p className="rounded-sm border border-white/10 bg-onyx p-3">
              {detail.bestaetigungstext}
            </p>
          )}
        </div>
      </div>

      {detail.unterschrift_bild && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">Unterschrift</p>
          {/* eslint-disable-next-line @next/next/no-img-element -- base64-Bild aus der Datenbank, kein statischer Asset-Pfad */}
          <img
            src={detail.unterschrift_bild}
            alt="Unterschrift des Kunden"
            className="mt-2 max-w-sm rounded-sm border border-white/15 bg-white p-2"
          />
        </div>
      )}
    </div>
  );
}
