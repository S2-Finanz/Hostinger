// Supabase Edge Function: notify-kontaktanfrage
//
// Wird NICHT vom Frontend aufgerufen, sondern von einem Supabase Database
// Webhook, sobald eine neue Zeile in "kontaktanfragen" eingefügt wird
// (Dashboard -> Database -> Webhooks). Verschickt eine Benachrichtigung
// per SMTP an info@s2-finanz.de mit Reply-To der anfragenden Person.
//
// Einrichtung:
// 1. Diese Function unter dem Namen "notify-kontaktanfrage" deployen.
// 2. Secrets setzen (eigene Namen, da Supabase-Secrets projektweit gelten
//    und sonst mit SMTP_USER/SMTP_PASSWORD von send-fragebogen kollidieren
//    würden):
//    - KONTAKT_SMTP_USER      z. B. hi@s2-finanz.de
//    - KONTAKT_SMTP_PASSWORD  Passwort des hi@s2-finanz.de-Postfachs
//    - CONTACT_WEBHOOK_SECRET beliebiger langer Zufallswert
// 3. Unter Database -> Webhooks einen neuen Webhook anlegen:
//    - Table: kontaktanfragen, Event: INSERT
//    - Type: Supabase Edge Function -> notify-kontaktanfrage
//    - HTTP Header hinzufügen: "x-webhook-secret" mit demselben Wert wie
//      CONTACT_WEBHOOK_SECRET

import nodemailer from "npm:nodemailer@6";

const SMTP_HOST = Deno.env.get("KONTAKT_SMTP_HOST") ?? "smtp.hostinger.com";
const SMTP_PORT = Number(Deno.env.get("KONTAKT_SMTP_PORT") ?? "465");
const SMTP_USER = Deno.env.get("KONTAKT_SMTP_USER")!;
const SMTP_PASSWORD = Deno.env.get("KONTAKT_SMTP_PASSWORD")!;

const CONTACT_WEBHOOK_SECRET = Deno.env.get("CONTACT_WEBHOOK_SECRET")!;
const BENACHRICHTIGUNGS_EMAIL = Deno.env.get("CONTACT_NOTIFICATION_EMAIL") ?? "hi@s2-finanz.de";

const THEMA_LABEL: Record<string, string> = {
  pkv: "Private Krankenversicherung",
  arbeitskraftabsicherung: "Arbeitskraftabsicherung",
  beamtenversorgung: "Beamtenversorgung",
  altersvorsorge: "Altersvorsorge",
  "allgemeine-analyse": "Allgemeine Versicherungsanalyse",
};

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

  if (req.headers.get("x-webhook-secret") !== CONTACT_WEBHOOK_SECRET) {
    return json({ error: "unauthorized" }, 401);
  }

  let payload: {
    record?: {
      name?: string;
      email?: string;
      telefon?: string | null;
      thema?: string;
      nachricht?: string;
    };
  };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "invalid_body" }, 400);
  }

  const anfrage = payload.record;
  if (!anfrage?.name || !anfrage.email || !anfrage.thema || !anfrage.nachricht) {
    return json({ error: "unvollstaendige_daten" }, 400);
  }

  const themaLabel = THEMA_LABEL[anfrage.thema] ?? anfrage.thema;

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

  try {
    await transport.sendMail({
      from: `S² Finanz Website <${SMTP_USER}>`,
      to: BENACHRICHTIGUNGS_EMAIL,
      replyTo: anfrage.email,
      subject: `Neue Kontaktanfrage: ${themaLabel}`,
      html: `
        <p><strong>Thema:</strong> ${themaLabel}</p>
        <p><strong>Name:</strong> ${anfrage.name}</p>
        <p><strong>E-Mail:</strong> ${anfrage.email}</p>
        <p><strong>Telefon:</strong> ${anfrage.telefon ?? "–"}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${anfrage.nachricht.replace(/\n/g, "<br>")}</p>
      `,
    });
  } catch {
    return json({ error: "versand_fehlgeschlagen" }, 502);
  }

  return json({ erfolg: true });
});
