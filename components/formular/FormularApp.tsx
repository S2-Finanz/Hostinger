"use client";

import { useEffect, useState } from "react";
import {
  FRAGEBOGEN_ABSCHNITTE,
  FRAGEBOGEN_HINWEIS_BEISPIELE,
  alleFragenFlach,
  type FragebogenFrage,
} from "@/lib/fragebogenFragen";
import {
  fragebogenAbrufen,
  fragebogenEinreichen,
  type FragebogenAntworten,
} from "@/lib/formular";
import Unterschriftsfeld from "@/components/formular/Unterschriftsfeld";

const RICHTIGKEIT_TEXT =
  "Ich bestätige, dass die vorstehenden Angaben vollständig und wahrheitsgemäß sind.";

const EINWILLIGUNG_TEXT =
  "Ich willige ausdrücklich ein, dass S² Finanz (Marcel Scheuermann, Marcel Schäfer) die von mir in diesem Gesundheitsfragebogen angegebenen Gesundheitsdaten zum Zweck der Versicherungsberatung und -vermittlung verarbeitet. Diese Einwilligung kann ich jederzeit mit Wirkung für die Zukunft widerrufen, ohne dass die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung berührt wird.";

const eingabeKlasse =
  "mt-1.5 block w-full rounded-sm border border-white/15 bg-onyx px-4 py-2.5 text-sm text-white placeholder:text-nebel/50 focus:border-gold focus:outline-none";

type Zustand =
  | { schritt: "laedt" }
  | { schritt: "kein_token" }
  | { schritt: "nicht_gefunden" }
  | { schritt: "bereits_ausgefuellt" }
  | { schritt: "hinweise"; kunde: { vorname: string; nachname: string; geburtsdatum: string } }
  | { schritt: "formular"; kunde: { vorname: string; nachname: string; geburtsdatum: string } }
  | { schritt: "eingereicht" };

function istBeantwortet(frage: FragebogenFrage, antworten: FragebogenAntworten): boolean {
  if (frage.typ === "zahl") return antworten[frage.id] !== undefined && antworten[frage.id] !== "";
  if (frage.typ === "text") {
    const wert = antworten[frage.id];
    return typeof wert === "string" && wert.trim().length > 0;
  }
  const wert = antworten[frage.id];
  if (wert !== "ja" && wert !== "nein") return false;
  if (wert === "ja") {
    const beschreibung = antworten[`${frage.id}_beschreibung`];
    if (frage.beschreibung.label && !beschreibung) return false;
  }
  return true;
}

function istSichtbar(frage: FragebogenFrage, antworten: FragebogenAntworten): boolean {
  if (!frage.zeigenWenn) return true;
  return antworten[frage.zeigenWenn.frageId] === frage.zeigenWenn.wert;
}

export default function FormularApp() {
  const [token, setToken] = useState<string | null>(null);
  const [zustand, setZustand] = useState<Zustand>({ schritt: "laedt" });
  const [fehler, setFehler] = useState<string | null>(null);
  const [antworten, setAntworten] = useState<FragebogenAntworten>({});
  const [hinweiseGelesen, setHinweiseGelesen] = useState(false);
  const [wirdEingereicht, setWirdEingereicht] = useState(false);
  const [validierungsfehler, setValidierungsfehler] = useState<string | null>(null);
  const [richtigkeitBestaetigt, setRichtigkeitBestaetigt] = useState(false);
  const [einwilligungErteilt, setEinwilligungErteilt] = useState(false);
  const [unterschrift, setUnterschrift] = useState<string | null>(null);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("t");
    if (!t) {
      // Muss synchron gesetzt werden: die URL ist erst nach dem Mount
      // (clientseitig) bekannt, ein Ladezustand wäre hier irreführend.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setZustand({ schritt: "kein_token" });
      return;
    }
    setToken(t);

    fragebogenAbrufen(t)
      .then((ergebnis) => {
        if (!ergebnis.gefunden) {
          setZustand({ schritt: "nicht_gefunden" });
          return;
        }
        if (ergebnis.status === "ausgefuellt") {
          setZustand({ schritt: "bereits_ausgefuellt" });
          return;
        }
        setZustand({
          schritt: "hinweise",
          kunde: {
            vorname: ergebnis.vorname,
            nachname: ergebnis.nachname,
            geburtsdatum: ergebnis.geburtsdatum,
          },
        });
      })
      .catch((e) => {
        setFehler(e instanceof Error ? e.message : "Der Fragebogen konnte nicht geladen werden.");
      });
  }, []);

  function setAntwort(id: string, wert: string | number) {
    setAntworten((vorherige) => ({ ...vorherige, [id]: wert }));
  }

  async function absenden() {
    setValidierungsfehler(null);

    const fehlend = alleFragenFlach().find(
      (frage) => istSichtbar(frage, antworten) && !istBeantwortet(frage, antworten),
    );
    if (fehlend) {
      setValidierungsfehler("Bitte beantworten Sie alle Fragen, bevor Sie fortfahren.");
      return;
    }
    if (!richtigkeitBestaetigt || !einwilligungErteilt) {
      setValidierungsfehler("Bitte bestätigen Sie beide Erklärungen am Ende des Formulars.");
      return;
    }
    if (!unterschrift) {
      setValidierungsfehler("Bitte unterschreiben Sie im Unterschriftsfeld.");
      return;
    }
    if (!token) return;

    setWirdEingereicht(true);
    try {
      const ergebnis = await fragebogenEinreichen({
        token,
        antworten,
        unterschriftBild: unterschrift,
        bestaetigungstext: RICHTIGKEIT_TEXT,
        einwilligungstext: EINWILLIGUNG_TEXT,
      });
      if (!ergebnis.erfolg) {
        setValidierungsfehler(
          ergebnis.grund === "bereits_ausgefuellt"
            ? "Dieser Fragebogen wurde bereits ausgefüllt."
            : "Der Link ist ungültig.",
        );
        return;
      }
      setZustand({ schritt: "eingereicht" });
    } catch (e) {
      setValidierungsfehler(
        e instanceof Error ? e.message : "Der Fragebogen konnte nicht übermittelt werden.",
      );
    } finally {
      setWirdEingereicht(false);
    }
  }

  if (fehler) {
    return <Hinweiskarte titel="Fehler">{fehler}</Hinweiskarte>;
  }

  if (zustand.schritt === "laedt") {
    return <Hinweiskarte titel="Wird geladen …">Bitte einen Moment Geduld.</Hinweiskarte>;
  }

  if (zustand.schritt === "kein_token") {
    return (
      <Hinweiskarte titel="Ungültiger Link">
        Dieser Link enthält keinen gültigen Zugangscode. Bitte nutzen Sie den vollständigen Link
        aus Ihrer E-Mail.
      </Hinweiskarte>
    );
  }

  if (zustand.schritt === "nicht_gefunden") {
    return (
      <Hinweiskarte titel="Link nicht gefunden">
        Dieser Link ist ungültig. Bitte wenden Sie sich an Ihren Ansprechpartner bei S² Finanz.
      </Hinweiskarte>
    );
  }

  if (zustand.schritt === "bereits_ausgefuellt") {
    return (
      <Hinweiskarte titel="Bereits ausgefüllt">
        Dieser Fragebogen wurde bereits übermittelt. Bei Fragen wenden Sie sich bitte an Ihren
        Ansprechpartner bei S² Finanz.
      </Hinweiskarte>
    );
  }

  if (zustand.schritt === "eingereicht") {
    return (
      <Hinweiskarte titel="Vielen Dank!">
        Ihre Angaben wurden erfolgreich und verschlüsselt übermittelt. Ihr Ansprechpartner bei S²
        Finanz meldet sich bei Ihnen.
      </Hinweiskarte>
    );
  }

  if (zustand.schritt === "hinweise") {
    return (
      <div className="rounded-sm border border-white/10 bg-graphit p-8">
        <h1 className="font-display text-xl font-bold text-white">
          Gesundheitscheck – {zustand.kunde.vorname} {zustand.kunde.nachname}
        </h1>
        <p className="mt-2 text-sm text-nebel">
          Geburtsdatum: {new Date(zustand.kunde.geburtsdatum).toLocaleDateString("de-DE")}
        </p>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-nebel">
          <p>
            Bei einigen Fragen können Sie mit „Ja&rdquo; antworten. In diesem Fall öffnet sich ein
            Textfeld, in dem Sie das Krankheitsbild bzw. den Sachverhalt beschreiben. Bitte machen
            Sie dabei möglichst genaue Angaben – wenn möglich mit ICD-10-Code der Diagnose.
          </p>
          <p>So könnten vollständige Angaben aussehen:</p>
          <ul className="space-y-3">
            {FRAGEBOGEN_HINWEIS_BEISPIELE.map((beispiel) => (
              <li key={beispiel.frage} className="rounded-sm border border-white/10 bg-onyx p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                  {beispiel.frage}
                </p>
                <p className="mt-1.5 text-nebel">{beispiel.beispiel}</p>
              </li>
            ))}
          </ul>
        </div>

        <label className="mt-6 flex items-start gap-3 text-sm text-nebel">
          <input
            type="checkbox"
            checked={hinweiseGelesen}
            onChange={(e) => setHinweiseGelesen(e.target.checked)}
            className="mt-1 h-4 w-4 accent-gold"
          />
          Ich habe die Hinweise gelesen und verstanden, wie Angaben zu machen sind.
        </label>

        <button
          type="button"
          disabled={!hinweiseGelesen}
          onClick={() => setZustand({ schritt: "formular", kunde: zustand.kunde })}
          className="mt-6 rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Weiter zum Fragebogen
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-sm border border-white/10 bg-graphit p-8">
        <h1 className="font-display text-xl font-bold text-white">
          Gesundheitscheck – {zustand.kunde.vorname} {zustand.kunde.nachname}
        </h1>
        <p className="mt-2 text-sm text-nebel">
          Geburtsdatum: {new Date(zustand.kunde.geburtsdatum).toLocaleDateString("de-DE")}
        </p>
      </div>

      {FRAGEBOGEN_ABSCHNITTE.map((abschnitt) => (
        <div key={abschnitt.titel} className="rounded-sm border border-white/10 bg-graphit p-8">
          <h2 className="font-display text-base font-semibold text-white">{abschnitt.titel}</h2>
          <div className="mt-6 flex flex-col gap-6">
            {abschnitt.fragen
              .filter((frage) => istSichtbar(frage, antworten))
              .map((frage) => (
                <FrageFeld
                  key={frage.id}
                  frage={frage}
                  wert={antworten[frage.id]}
                  beschreibung={antworten[`${frage.id}_beschreibung`]}
                  onWertGeaendert={(wert) => setAntwort(frage.id, wert)}
                  onBeschreibungGeaendert={(text) => setAntwort(`${frage.id}_beschreibung`, text)}
                />
              ))}
          </div>
        </div>
      ))}

      <div className="rounded-sm border border-white/10 bg-graphit p-8">
        <h2 className="font-display text-base font-semibold text-white">
          Bestätigung und Unterschrift
        </h2>

        <label className="mt-5 flex items-start gap-3 text-sm text-nebel">
          <input
            type="checkbox"
            checked={einwilligungErteilt}
            onChange={(e) => setEinwilligungErteilt(e.target.checked)}
            className="mt-1 h-4 w-4 accent-gold"
          />
          {EINWILLIGUNG_TEXT}
        </label>

        <label className="mt-4 flex items-start gap-3 text-sm text-nebel">
          <input
            type="checkbox"
            checked={richtigkeitBestaetigt}
            onChange={(e) => setRichtigkeitBestaetigt(e.target.checked)}
            className="mt-1 h-4 w-4 accent-gold"
          />
          {RICHTIGKEIT_TEXT}
        </label>

        <div className="mt-6">
          <span className="text-sm text-nebel">Unterschrift</span>
          <div className="mt-1.5">
            <Unterschriftsfeld onGeaendert={setUnterschrift} />
          </div>
        </div>

        {validierungsfehler && (
          <p className="mt-5 rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
            {validierungsfehler}
          </p>
        )}

        <button
          type="button"
          onClick={absenden}
          disabled={wirdEingereicht}
          className="mt-6 rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {wirdEingereicht ? "Wird übermittelt …" : "Fragebogen verbindlich absenden"}
        </button>
      </div>
    </div>
  );
}

function FrageFeld({
  frage,
  wert,
  beschreibung,
  onWertGeaendert,
  onBeschreibungGeaendert,
}: {
  frage: FragebogenFrage;
  wert: string | number | undefined;
  beschreibung: string | number | undefined;
  onWertGeaendert: (wert: string | number) => void;
  onBeschreibungGeaendert: (text: string) => void;
}) {
  if (frage.typ === "zahl") {
    return (
      <label className="block">
        <span className="text-sm text-nebel">{frage.frage}</span>
        <input
          type="number"
          min={frage.min}
          max={frage.max}
          value={wert ?? ""}
          onChange={(e) => onWertGeaendert(e.target.value === "" ? "" : Number(e.target.value))}
          className={eingabeKlasse}
        />
      </label>
    );
  }

  if (frage.typ === "text") {
    return (
      <label className="block">
        <span className="text-sm text-nebel">{frage.frage}</span>
        <textarea
          value={(wert as string) ?? ""}
          onChange={(e) => onWertGeaendert(e.target.value)}
          rows={3}
          className={eingabeKlasse}
        />
      </label>
    );
  }

  return (
    <div>
      <span className="text-sm text-nebel">{frage.frage}</span>
      <div className="mt-2 flex gap-3">
        {(["ja", "nein"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onWertGeaendert(option)}
            className={`rounded-sm border px-6 py-2 text-sm font-semibold transition-colors ${
              wert === option
                ? "border-gold bg-gold text-onyx"
                : "border-white/15 text-nebel hover:text-white"
            }`}
          >
            {option === "ja" ? "Ja" : "Nein"}
          </button>
        ))}
      </div>
      {wert === "ja" && frage.beschreibung.label && (
        <div className="mt-3">
          <textarea
            value={(beschreibung as string) ?? ""}
            onChange={(e) => onBeschreibungGeaendert(e.target.value)}
            rows={3}
            placeholder={frage.beschreibung.label}
            className={eingabeKlasse}
          />
          {frage.beschreibung.icdHinweis && (
            <p className="mt-1.5 text-xs text-nebel">
              Bitte möglichst genaue Angaben, wenn möglich mit ICD-10-Code.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Hinweiskarte({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-white/10 bg-graphit p-8 text-center">
      <h1 className="font-display text-lg font-bold text-white">{titel}</h1>
      <p className="mt-3 text-sm text-nebel">{children}</p>
    </div>
  );
}
