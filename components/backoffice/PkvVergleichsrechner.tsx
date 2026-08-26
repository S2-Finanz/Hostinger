"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/lib/supabase";
import { KRANKENKASSEN } from "@/lib/gkv";
import {
  berechnePkvVergleich,
  PKV_VERGLEICH_DEFAULT,
  type PkvVergleichInput,
  type Anstellung,
} from "@/lib/pkvVergleich";

const eingabeKlasse =
  "mt-1.5 block w-full rounded-sm border border-white/15 bg-onyx px-4 py-2.5 text-sm text-white placeholder:text-nebel/50 focus:border-gold focus:outline-none";

function formatEUR(value: number): string {
  return value.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

type GespeicherteBerechnung = {
  id: string;
  bezeichnung: string;
  eingaben: PkvVergleichInput;
  erstellt_am: string;
};

function Feld({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm text-nebel">{label}</span>
      {children}
    </label>
  );
}

function ZahlFeld({
  label,
  value,
  onChange,
  suffix,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  step?: number;
}) {
  return (
    <Feld label={suffix ? `${label} (${suffix})` : label}>
      <input
        type="number"
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(e.target.valueAsNumber || 0)}
        className={eingabeKlasse}
      />
    </Feld>
  );
}

export default function PkvVergleichsrechner() {
  const [input, setInput] = useState<PkvVergleichInput>(PKV_VERGLEICH_DEFAULT);
  const [aktiveId, setAktiveId] = useState<string | null>(null);
  const [gespeicherte, setGespeicherte] = useState<GespeicherteBerechnung[]>([]);
  const [ladeListe, setLadeListe] = useState(true);
  const [speichertGerade, setSpeichertGerade] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    ladeGespeicherte();
  }, []);

  async function ladeGespeicherte() {
    setLadeListe(true);
    const { data, error } = await supabase
      .from("pkv_berechnungen")
      .select("id, bezeichnung, eingaben, erstellt_am")
      .order("erstellt_am", { ascending: false });
    if (!error && data) {
      setGespeicherte(data as GespeicherteBerechnung[]);
    }
    setLadeListe(false);
  }

  function feld<K extends keyof PkvVergleichInput>(
    key: K,
    value: PkvVergleichInput[K],
  ) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  function neueBerechnung() {
    setInput(PKV_VERGLEICH_DEFAULT);
    setAktiveId(null);
    setStatus(null);
  }

  function berechnungLaden(b: GespeicherteBerechnung) {
    setInput({ ...PKV_VERGLEICH_DEFAULT, ...b.eingaben });
    setAktiveId(b.id);
    setStatus(null);
  }

  async function speichern() {
    if (!input.bezeichnung.trim()) {
      setStatus("Bitte eine Bezeichnung (z. B. Kundenname) angeben.");
      return;
    }
    setSpeichertGerade(true);
    setStatus(null);

    if (aktiveId) {
      const { error } = await supabase
        .from("pkv_berechnungen")
        .update({
          bezeichnung: input.bezeichnung.trim(),
          eingaben: input,
          aktualisiert_am: new Date().toISOString(),
        })
        .eq("id", aktiveId);
      if (error) {
        setStatus("Speichern fehlgeschlagen: " + error.message);
      } else {
        setStatus("Aktualisiert.");
        ladeGespeicherte();
      }
    } else {
      const { data, error } = await supabase
        .from("pkv_berechnungen")
        .insert({ bezeichnung: input.bezeichnung.trim(), eingaben: input })
        .select("id")
        .single();
      if (error) {
        setStatus("Speichern fehlgeschlagen: " + error.message);
      } else {
        setStatus("Gespeichert.");
        setAktiveId(data.id);
        ladeGespeicherte();
      }
    }
    setSpeichertGerade(false);
  }

  async function loeschen(id: string) {
    if (!confirm("Diese Berechnung wirklich löschen?")) return;
    const { error } = await supabase.from("pkv_berechnungen").delete().eq("id", id);
    if (!error) {
      if (aktiveId === id) neueBerechnung();
      ladeGespeicherte();
    }
  }

  const ergebnis = useMemo(() => berechnePkvVergleich(input), [input]);

  return (
    <div className="flex flex-col gap-6">
      <div className="print:hidden flex flex-wrap items-center gap-3 rounded-sm border border-white/10 bg-graphit p-5">
        <span className="text-sm text-nebel">Gespeicherte Berechnungen:</span>
        <select
          value={aktiveId ?? ""}
          onChange={(e) => {
            const b = gespeicherte.find((g) => g.id === e.target.value);
            if (b) berechnungLaden(b);
          }}
          disabled={ladeListe || gespeicherte.length === 0}
          className="rounded-sm border border-white/15 bg-onyx px-3 py-2 text-sm text-white focus:border-gold focus:outline-none disabled:opacity-40"
        >
          <option value="" className="bg-graphit">
            {ladeListe
              ? "Wird geladen …"
              : gespeicherte.length === 0
                ? "Keine gespeicherten Berechnungen"
                : "Bitte wählen …"}
          </option>
          {gespeicherte.map((b) => (
            <option key={b.id} value={b.id} className="bg-graphit">
              {b.bezeichnung} ({new Date(b.erstellt_am).toLocaleDateString("de-DE")})
            </option>
          ))}
        </select>
        {aktiveId && (
          <button
            type="button"
            onClick={() => loeschen(aktiveId)}
            className="rounded-sm border border-red-500/30 px-4 py-2 text-sm text-red-300 transition-opacity hover:opacity-80"
          >
            Löschen
          </button>
        )}
        <button
          type="button"
          onClick={neueBerechnung}
          className="ml-auto rounded-sm border border-white/15 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
        >
          + Neue Berechnung
        </button>
      </div>

      <div className="print:hidden grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-sm border border-white/10 bg-graphit p-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold">
            Basis
          </h3>
          <Feld label="Bezeichnung (z. B. Kundenname)">
            <input
              type="text"
              value={input.bezeichnung}
              onChange={(e) => feld("bezeichnung", e.target.value)}
              placeholder="z. B. Max Mustermann"
              className={eingabeKlasse}
            />
          </Feld>
          <div className="grid grid-cols-2 gap-4">
            <ZahlFeld
              label="Aktuelles Alter"
              value={input.aktuellesAlter}
              onChange={(v) => feld("aktuellesAlter", v)}
            />
            <Feld label="Anstellungsverhältnis">
              <select
                value={input.anstellung}
                onChange={(e) => feld("anstellung", e.target.value as Anstellung)}
                className={eingabeKlasse}
              >
                <option value="angestellt" className="bg-graphit">
                  Angestellt (50 % AG-Zuschuss)
                </option>
                <option value="selbststaendig" className="bg-graphit">
                  Selbstständig (100 % eigener Beitrag)
                </option>
              </select>
            </Feld>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ZahlFeld
              label="Renteneintrittsalter"
              value={input.renteneintrittsalter}
              onChange={(v) => feld("renteneintrittsalter", v)}
            />
            <ZahlFeld
              label="Grenzsteuersatz"
              suffix="%, inkl. Soli/KiSt"
              value={input.grenzsteuersatz}
              onChange={(v) => feld("grenzsteuersatz", v)}
              step={0.5}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-sm border border-white/10 bg-graphit p-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold">
            Gesetzliche Krankenversicherung
          </h3>
          <ZahlFeld
            label="Bruttogehalt monatlich"
            suffix="€"
            value={input.bruttoMonatlich}
            onChange={(v) => feld("bruttoMonatlich", v)}
          />
          <Feld label="Krankenkasse">
            <select
              value={input.krankenkasseName}
              onChange={(e) => feld("krankenkasseName", e.target.value)}
              className={eingabeKlasse}
            >
              {KRANKENKASSEN.map((k) => (
                <option key={k.name} value={k.name} className="bg-graphit">
                  {k.name} ({k.zusatzbeitrag.toLocaleString("de-DE")} % Zusatzbeitrag)
                </option>
              ))}
            </select>
          </Feld>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 pt-6 text-sm text-nebel">
              <input
                type="checkbox"
                checked={input.hatKinder}
                onChange={(e) => feld("hatKinder", e.target.checked)}
                className="h-4 w-4 accent-gold"
              />
              Hat Kinder
            </label>
            <ZahlFeld
              label="Ø-Steigerung GKV"
              suffix="% p. a."
              value={input.gkvSteigerungProzent}
              onChange={(v) => feld("gkvSteigerungProzent", v)}
              step={0.1}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-sm border border-white/10 bg-graphit p-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold">
            Private Krankenversicherung – Beiträge heute
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Feld label="Gesellschaft">
              <input
                type="text"
                value={input.pkvGesellschaft}
                onChange={(e) => feld("pkvGesellschaft", e.target.value)}
                placeholder="z. B. Allianz, Signal Iduna, ..."
                className={eingabeKlasse}
              />
            </Feld>
            <Feld label="Tarifbezeichnung">
              <input
                type="text"
                value={input.pkvTarifbezeichnung}
                onChange={(e) => feld("pkvTarifbezeichnung", e.target.value)}
                placeholder="z. B. Komfort Plus"
                className={eingabeKlasse}
              />
            </Feld>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ZahlFeld
              label="Haupttarif"
              suffix="€"
              value={input.pkvHaupttarif}
              onChange={(v) => feld("pkvHaupttarif", v)}
              step={0.01}
            />
            <ZahlFeld
              label="Krankentagegeld"
              suffix="€"
              value={input.pkvKrankentagegeld}
              onChange={(v) => feld("pkvKrankentagegeld", v)}
              step={0.01}
            />
            <ZahlFeld
              label="Sonstige Zusatztarife"
              suffix="€"
              value={input.pkvSonstige}
              onChange={(v) => feld("pkvSonstige", v)}
              step={0.01}
            />
            <ZahlFeld
              label="Pflegepflichtversicherung"
              suffix="€"
              value={input.pkvPflege}
              onChange={(v) => feld("pkvPflege", v)}
              step={0.01}
            />
            <ZahlFeld
              label="Gesetzlicher Zuschlag"
              suffix="€"
              value={input.pkvGesetzlicherZuschlag}
              onChange={(v) => feld("pkvGesetzlicherZuschlag", v)}
              step={0.01}
            />
            <ZahlFeld
              label="Ø-Steigerung PKV"
              suffix="% p. a."
              value={input.pkvSteigerungProzent}
              onChange={(v) => feld("pkvSteigerungProzent", v)}
              step={0.1}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-sm border border-white/10 bg-graphit p-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold">
            Beitragsentlastungstarif
          </h3>
          <label className="flex items-center gap-2 text-sm text-nebel">
            <input
              type="checkbox"
              checked={input.beVorhanden}
              onChange={(e) => feld("beVorhanden", e.target.checked)}
              className="h-4 w-4 accent-gold"
            />
            Beitragsentlastungstarif vorhanden
          </label>
          {input.beVorhanden && (
            <div className="grid grid-cols-2 gap-4">
              <ZahlFeld
                label="Prämie heute"
                suffix="€"
                value={input.bePraemieHeute}
                onChange={(v) => feld("bePraemieHeute", v)}
                step={0.01}
              />
              <ZahlFeld
                label="Ziel-Entlastungsbetrag heute"
                suffix="€"
                value={input.beZielbetragHeute}
                onChange={(v) => feld("beZielbetragHeute", v)}
                step={5}
              />
              <ZahlFeld
                label="Auszahlungsalter"
                value={input.beAuszahlungsalter}
                onChange={(v) => feld("beAuszahlungsalter", v)}
              />
            </div>
          )}
          <p className="text-xs text-nebel/60">
            Wächst alle 5 Jahre um 10 %, danach aufgerundet auf die nächsten
            vollen 5 €, bis zum Auszahlungsalter.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-sm border border-white/10 bg-graphit p-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold">
            Rente
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <ZahlFeld
              label="Gesetzliche Rente"
              suffix="€ / Monat"
              value={input.gesetzlicheRenteMonatlich}
              onChange={(v) => feld("gesetzlicheRenteMonatlich", v)}
            />
            <ZahlFeld
              label="Betriebliche Altersvorsorge"
              suffix="€ / Monat"
              value={input.bavRenteMonatlich}
              onChange={(v) => feld("bavRenteMonatlich", v)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-sm border border-white/10 bg-graphit p-6">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold">
            Rücklage / Re-Invest
          </h3>
          <ZahlFeld
            label="Empfohlener monatlicher Rücklagebetrag"
            suffix="€, inkl. BU-Absicherung"
            value={input.reInvestSparbetrag}
            onChange={(v) => feld("reInvestSparbetrag", v)}
          />
          <ZahlFeld
            label="Erwartete monatliche Rente aus Rücklage"
            suffix="€, ab Renteneintritt"
            value={input.reInvestRenteMonatlich}
            onChange={(v) => feld("reInvestRenteMonatlich", v)}
          />
          <p className="text-xs text-nebel/60">
            Beide Werte werden nicht automatisch hochgerechnet, sondern frei
            eingegeben (z. B. anhand einer separaten Rentenversicherungs-
            Hochrechnung).
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <button
          type="button"
          onClick={speichern}
          disabled={speichertGerade}
          className="rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-onyx transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {speichertGerade ? "Wird gespeichert …" : aktiveId ? "Aktualisieren" : "Speichern"}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-sm border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
        >
          Als PDF exportieren / drucken
        </button>
        {status && <span className="text-sm text-nebel">{status}</span>}
      </div>

      <ErgebnisAnsicht input={input} ergebnis={ergebnis} />
    </div>
  );
}

function ErgebnisAnsicht({
  input,
  ergebnis,
}: {
  input: PkvVergleichInput;
  ergebnis: ReturnType<typeof berechnePkvVergleich>;
}) {
  const chartDaten = ergebnis.verlauf.map((v) => ({
    jahr: v.jahr,
    Alter: v.alter,
    GKV: Math.round(v.gkvEigen),
    PKV: Math.round(v.pkvEigen),
  }));

  const gkvKasse = KRANKENKASSEN.find((k) => k.name === input.krankenkasseName);

  const pkvTarifzeilen: { label: string; betrag: number }[] = [
    { label: "Haupttarif", betrag: input.pkvHaupttarif },
    { label: "Krankentagegeld", betrag: input.pkvKrankentagegeld },
    { label: "Pflegepflichtversicherung", betrag: input.pkvPflege },
    { label: "Gesetzlicher Zuschlag", betrag: input.pkvGesetzlicherZuschlag },
    { label: "Sonstige Zusatztarife", betrag: input.pkvSonstige },
    ...(input.beVorhanden
      ? [{ label: "Beitragsentlastung", betrag: input.bePraemieHeute }]
      : []),
  ].filter((z) => z.betrag > 0);

  return (
    <div className="flex flex-col gap-4 rounded-sm border border-gold/30 bg-onyx p-6 print:gap-3 print:border-black/20 print:bg-white print:p-4">
      {input.bezeichnung && (
        <h2 className="font-display text-xl font-bold text-white print:text-lg print:text-black">
          PKV-Vergleich: {input.bezeichnung}
        </h2>
      )}

      {(input.pkvGesellschaft || pkvTarifzeilen.length > 0) && (
        <div className="[break-inside:avoid] rounded-sm border border-white/10 p-4 print:border-black/20 print:p-3">
          <p className="font-semibold text-white print:text-black">
            Versicherungsschutz
          </p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div className="text-sm text-nebel print:text-black/70">
              <p>
                <span className="text-nebel/60 print:text-black/50">PKV-Gesellschaft: </span>
                <span className="font-semibold text-white print:text-black">
                  {input.pkvGesellschaft || "–"}
                </span>
              </p>
              {input.pkvTarifbezeichnung && (
                <p>
                  <span className="text-nebel/60 print:text-black/50">Tarif: </span>
                  <span className="font-semibold text-white print:text-black">
                    {input.pkvTarifbezeichnung}
                  </span>
                </p>
              )}
              <p>
                <span className="text-nebel/60 print:text-black/50">Vergleich mit: </span>
                {gkvKasse?.name ?? "–"}
              </p>
            </div>
            {pkvTarifzeilen.length > 0 && (
              <dl className="space-y-1 text-sm text-nebel print:text-black/70">
                {pkvTarifzeilen.map((z) => (
                  <div key={z.label} className="flex justify-between gap-4">
                    <dt>{z.label}</dt>
                    <dd>{formatEUR(z.betrag)}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      )}

      <div className="[break-inside:avoid] grid gap-4 sm:grid-cols-3">
        <div className="rounded-sm border border-white/10 p-4 print:border-black/20 print:p-3">
          <p className="text-xs uppercase tracking-wide text-nebel/60 print:text-black/60">
            GKV heute (netto)
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-white print:text-xl print:text-black">
            {formatEUR(ergebnis.heute.gkvNetto)}
          </p>
          <p className="mt-1 text-xs text-nebel/60 print:text-black/60">
            Eigenanteil brutto: {formatEUR(ergebnis.heute.gkvEigen)}
          </p>
        </div>
        <div className="rounded-sm border border-white/10 p-4 print:border-black/20 print:p-3">
          <p className="text-xs uppercase tracking-wide text-nebel/60 print:text-black/60">
            PKV heute (netto)
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-white print:text-xl print:text-black">
            {formatEUR(ergebnis.heute.pkvNetto)}
          </p>
          <p className="mt-1 text-xs text-nebel/60 print:text-black/60">
            Eigenanteil brutto: {formatEUR(ergebnis.heute.pkvEigenGesamt)}
          </p>
        </div>
        <div className="rounded-sm border border-gold/40 bg-gold/5 p-4 print:p-3">
          <p className="text-xs uppercase tracking-wide text-nebel/60 print:text-black/60">
            Netto-Ersparnis PKV
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-gold print:text-xl">
            {formatEUR(ergebnis.heute.ersparnisNetto)}
          </p>
          <p className="mt-1 text-xs text-nebel/60 print:text-black/60">
            Empfohlene Rücklage: {formatEUR(input.reInvestSparbetrag)} / Monat
          </p>
        </div>
      </div>

      <div className="[break-inside:avoid]">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold">
          Entwicklung bis zum Renteneintritt ({input.renteneintrittsalter})
        </h3>
        <div className="mt-3 h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartDaten} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="jahr" stroke="#8E9997" fontSize={11} />
              <YAxis stroke="#8E9997" fontSize={11} />
              <Tooltip
                contentStyle={{ background: "#171B1D", border: "1px solid rgba(255,255,255,0.15)" }}
                formatter={(value) => formatEUR(Number(value))}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="GKV" stroke="#8E9997" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="PKV" stroke="#C6A265" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="[break-inside:avoid]">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold">
          Beitrag zum Renteneintritt ({input.renteneintrittsalter})
        </h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 print:gap-3">
          <div className="rounded-sm border border-white/10 p-4 print:border-black/20 print:p-3">
            <p className="font-semibold text-white print:text-black">Gesetzliche Kranken-/Pflegeversicherung</p>
            <dl className="mt-2 space-y-1 text-sm text-nebel print:text-black/70">
              <div className="flex justify-between">
                <dt>KV auf gesetzliche Rente</dt>
                <dd>{formatEUR(ergebnis.renteneintritt.gkv.beitragAufRente)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>KV auf betriebliche Vorsorge</dt>
                <dd>{formatEUR(ergebnis.renteneintritt.gkv.beitragAufBav)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>PV auf gesetzliche Rente</dt>
                <dd>{formatEUR(ergebnis.renteneintritt.gkv.pvAufRente)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>PV auf betriebliche Vorsorge</dt>
                <dd>{formatEUR(ergebnis.renteneintritt.gkv.pvAufBav)}</dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-1.5 font-semibold text-white print:border-black/20 print:text-black">
                <dt>Gesamt</dt>
                <dd>{formatEUR(ergebnis.renteneintritt.gkv.gesamt)}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-sm border border-white/10 p-4 print:border-black/20 print:p-3">
            <p className="font-semibold text-white print:text-black">Private Kranken-/Pflegeversicherung</p>
            <dl className="mt-2 space-y-1 text-sm text-nebel print:text-black/70">
              <div className="flex justify-between">
                <dt>Hochgerechneter Beitrag (KV + PV)</dt>
                <dd>
                  {formatEUR(
                    ergebnis.renteneintritt.pkv.basisVoll + ergebnis.renteneintritt.pkv.pflegeVoll,
                  )}
                </dd>
              </div>
              <div className="flex justify-between text-red-300/90">
                <dt>abzgl. gesetzlicher Zuschlag</dt>
                <dd>− {formatEUR(ergebnis.renteneintritt.pkv.abzglZuschlag)}</dd>
              </div>
              {input.beVorhanden && (
                <div className="flex justify-between text-red-300/90">
                  <dt>abzgl. Beitragsentlastung</dt>
                  <dd>− {formatEUR(ergebnis.renteneintritt.pkv.abzglBe)}</dd>
                </div>
              )}
              <div className="flex justify-between text-red-300/90">
                <dt>abzgl. GRV-Zuschuss (KV)</dt>
                <dd>− {formatEUR(ergebnis.renteneintritt.pkv.abzglGrvZuschussKv)}</dd>
              </div>
              <div className="flex justify-between text-red-300/90">
                <dt>abzgl. GRV-Zuschuss (PV)</dt>
                <dd>− {formatEUR(ergebnis.renteneintritt.pkv.abzglGrvZuschussPv)}</dd>
              </div>
              <div className="flex justify-between text-red-300/90">
                <dt>abzgl. Rente aus Rücklage</dt>
                <dd>− {formatEUR(ergebnis.renteneintritt.pkv.abzglReInvestRente)}</dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-1.5 font-semibold text-white print:border-black/20 print:text-black">
                <dt>Gesamt</dt>
                <dd>{formatEUR(ergebnis.renteneintritt.pkv.gesamt)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <p className="[break-inside:avoid] text-xs leading-relaxed text-nebel/60 print:text-[10px] print:leading-snug print:text-black/60">
        Alle Werte sind Hochrechnungen auf Basis der eingegebenen Annahmen
        (Beitragssteigerungen, Steuersatz, Rentenhöhe) und können in der
        Realität abweichen. Krankentagegeld entfällt zum Renteneintritt
        vollständig und ist daher nicht in der Hochrechnung enthalten. Der
        gesetzliche 10 %-Zuschlag wird ab Alter 60 zur Beitragsminderung
        verwendet, unabhängig vom individuellen Renteneintrittsalter. Diese
        Berechnung ersetzt keine individuelle Steuer- oder Rentenberatung.
      </p>
    </div>
  );
}
