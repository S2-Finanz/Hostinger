// Supabase Edge Function: notify-funnel-anmeldung
//
// Wird NICHT vom Frontend aufgerufen, sondern von einem Supabase Database
// Webhook, sobald eine neue Zeile in "kunden" eingefügt wird (Dashboard ->
// Database -> Webhooks). Ignoriert Inserts mit quelle <> 'funnel' (also
// manuell im Backoffice angelegte Kunden). Verschickt zwei E-Mails:
// eine Bestätigung an den Interessenten und eine interne Benachrichtigung
// an das Team, jeweils per SMTP über das hi@s2-finanz.de-Postfach.
//
// Einrichtung: siehe Kommentar am Ende von
// supabase/migrations/0003_registrierungsfunnel.sql

import nodemailer from "npm:nodemailer@6";

const SMTP_HOST = Deno.env.get("KONTAKT_SMTP_HOST") ?? "smtp.hostinger.com";
const SMTP_PORT = Number(Deno.env.get("KONTAKT_SMTP_PORT") ?? "465");
const SMTP_USER = Deno.env.get("KONTAKT_SMTP_USER")!;
const SMTP_PASSWORD = Deno.env.get("KONTAKT_SMTP_PASSWORD")!;

const FUNNEL_WEBHOOK_SECRET = Deno.env.get("FUNNEL_WEBHOOK_SECRET")!;
const BENACHRICHTIGUNGS_EMAIL = Deno.env.get("CONTACT_NOTIFICATION_EMAIL") ?? "hi@s2-finanz.de";

// Muss mit den Frage-/Options-Labels in lib/funnel.ts übereinstimmen.
const FRAGE_LABEL: Record<string, string> = {
  q_beruf: "Berufliche Situation",
  q_laufbahn: "Angestrebte Laufbahn",
  q_themen: "Interessensbereiche",
  q_einkommen: "Monatliches Nettoeinkommen",
  q_bereits_beschaeftigt: "Bereits mit dem Thema beschäftigt",
  q_beamten_status: "Beamtenstatus",
  q_bundesland: "Bundesland",
  q_beamten_thema: "Thema",
  q_versicherungsart: "Versicherungsart",
  q_beamten_vorsorge: "Vorsorge bereits vorhanden",
  q_selbststaendig_thema: "Thema",
};

const OPTION_LABEL: Record<string, string> = {
  student: "Student/in",
  berufseinsteiger: "Berufseinsteiger/in",
  angestellt: "Angestellt",
  beamter: "Beamter/Beamtin",
  selbststaendig: "Selbstständig",
  geschaeftsfuehrer: "Geschäftsführer",
  beamtenlaufbahn: "Beamtenlaufbahn",
  angestellten_selbststaendigen_laufbahn: "Angestellten-/Selbstständigen-Laufbahn",
  arbeitskraftabsicherung: "Arbeitskraftabsicherung",
  vermoegensaufbau: "Vermögensaufbau",
  krankenversicherung: "Krankenversicherung",
  sonstige: "Sonstige Versicherungsfragen",
  unter_1500: "Unter 1.500 €",
  "1500_3000": "1.500 – 3.000 €",
  "3000_5000": "3.000 – 5.000 €",
  ueber_5000: "Über 5.000 €",
  ja: "Ja",
  nein: "Nein",
  anwaerter: "Anwärter/in",
  auf_probe: "Verbeamtet auf Probe",
  auf_lebenszeit: "Verbeamtet auf Lebenszeit",
  pkv: "Private Krankenversicherung",
  beamtenversorgung: "Beamtenversorgung",
  dienstunfaehigkeit: "Dienstunfähigkeit",
  allgemein: "Allgemeine Versicherungsthemen",
  privat: "Privat versichert",
  gesetzlich: "Gesetzlich versichert",
  altersvorsorge: "Altersvorsorge",
  staatliche_foerderung: "Staatliche Förderung",
  mitarbeiterbenefits: "Mitarbeiterbenefits",
  gewerbliche_versicherungen: "Gewerbliche Versicherungen",
  "baden-wuerttemberg": "Baden-Württemberg",
  bayern: "Bayern",
  berlin: "Berlin",
  brandenburg: "Brandenburg",
  bremen: "Bremen",
  hamburg: "Hamburg",
  hessen: "Hessen",
  "mecklenburg-vorpommern": "Mecklenburg-Vorpommern",
  niedersachsen: "Niedersachsen",
  "nordrhein-westfalen": "Nordrhein-Westfalen",
  "rheinland-pfalz": "Rheinland-Pfalz",
  saarland: "Saarland",
  sachsen: "Sachsen",
  "sachsen-anhalt": "Sachsen-Anhalt",
  "schleswig-holstein": "Schleswig-Holstein",
  thueringen: "Thüringen",
  bund: "Bund",
};

function optionLabel(wert: string): string {
  return OPTION_LABEL[wert] ?? wert;
}

function antwortenAlsHtml(antworten: Record<string, unknown> | null): string {
  if (!antworten) return "<p>Keine Angaben.</p>";
  return Object.entries(antworten)
    .map(([frageId, wert]) => {
      const label = FRAGE_LABEL[frageId] ?? frageId;
      const wertText = Array.isArray(wert)
        ? wert.map((w) => optionLabel(String(w))).join(", ")
        : optionLabel(String(wert));
      return `<p><strong>${label}:</strong> ${wertText}</p>`;
    })
    .join("\n");
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  if (req.headers.get("x-webhook-secret") !== FUNNEL_WEBHOOK_SECRET) {
    return json({ error: "unauthorized" }, 401);
  }

  let payload: {
    record?: {
      vorname?: string;
      nachname?: string;
      email?: string;
      telefon?: string | null;
      quelle?: string;
      funnel_antworten?: Record<string, unknown> | null;
      newsletter_opt_in?: boolean;
    };
  };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "invalid_body" }, 400);
  }

  const kunde = payload.record;

  // Manuell im Backoffice angelegte Kunden lösen keine Funnel-Mails aus.
  if (!kunde || kunde.quelle !== "funnel") {
    return json({ erfolg: true, ignoriert: true });
  }

  if (!kunde.vorname || !kunde.nachname || !kunde.email) {
    return json({ error: "unvollstaendige_daten" }, 400);
  }

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

  try {
    await transport.sendMail({
      from: `S² Finanz <${SMTP_USER}>`,
      to: kunde.email,
      subject: "Deine Anfrage ist bei uns eingegangen",
      html: `
        <p>Hallo ${kunde.vorname},</p>
        <p>vielen Dank für dein Interesse an S² Finanz! Deine Anfrage ist bei uns eingegangen und wir melden uns schnellstmöglich bei dir für ein kostenloses, unverbindliches Kennenlerngespräch.</p>
        <p>Bis gleich,<br>dein S² Finanz Team</p>
      `,
    });

    await transport.sendMail({
      from: `S² Finanz Website <${SMTP_USER}>`,
      to: BENACHRICHTIGUNGS_EMAIL,
      replyTo: kunde.email,
      subject: `Neue Funnel-Anmeldung: ${kunde.vorname} ${kunde.nachname}`,
      html: `
        <p><strong>Name:</strong> ${kunde.vorname} ${kunde.nachname}</p>
        <p><strong>E-Mail:</strong> ${kunde.email}</p>
        <p><strong>Telefon:</strong> ${kunde.telefon ?? "–"}</p>
        <p><strong>Newsletter:</strong> ${kunde.newsletter_opt_in ? "Ja" : "Nein"}</p>
        <hr>
        ${antwortenAlsHtml(kunde.funnel_antworten ?? null)}
      `,
    });
  } catch {
    return json({ error: "versand_fehlgeschlagen" }, 502);
  }

  return json({ erfolg: true });
});
