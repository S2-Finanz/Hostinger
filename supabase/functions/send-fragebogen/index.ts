// Supabase Edge Function: send-fragebogen
//
// Wird vom Backoffice per supabase.functions.invoke("send-fragebogen", ...)
// aufgerufen. Verschickt den Formular-Link per SMTP über das Hostinger-
// Postfach und markiert den Fragebogen als "versendet".
//
// Benötigte Secrets (Supabase Dashboard -> Edge Functions -> Secrets):
//   SMTP_USER      z. B. formulare@s2-finanz.de
//   SMTP_PASSWORD  Passwort des Postfachs
// SUPABASE_URL, SUPABASE_ANON_KEY und SUPABASE_SERVICE_ROLE_KEY werden von
// Supabase automatisch bereitgestellt, dafür ist nichts einzurichten.

import { createClient } from "npm:@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer@6";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const SMTP_HOST = Deno.env.get("SMTP_HOST") ?? "smtp.hostinger.com";
const SMTP_PORT = Number(Deno.env.get("SMTP_PORT") ?? "465");
const SMTP_USER = Deno.env.get("SMTP_USER")!;
const SMTP_PASSWORD = Deno.env.get("SMTP_PASSWORD")!;

const SITE_URL = Deno.env.get("SITE_URL") ?? "https://www.s2-finanz.de";
const ERLAUBTE_DOMAIN = "s2-finanz.de";

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

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return json({ error: "unauthorized" }, 401);
  }

  const callerClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: userData, error: userError } = await callerClient.auth.getUser();
  const anfragendeEmail = userData?.user?.email ?? "";
  if (userError || !anfragendeEmail.toLowerCase().endsWith(`@${ERLAUBTE_DOMAIN}`)) {
    return json({ error: "unauthorized" }, 401);
  }

  let body: { fragebogenId?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_body" }, 400);
  }

  if (!body.fragebogenId) {
    return json({ error: "fragebogenId_fehlt" }, 400);
  }

  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data: fragebogen, error: fragebogenError } = await admin
    .from("fragebogen")
    .select("id, token, kunden ( vorname, nachname, email )")
    .eq("id", body.fragebogenId)
    .single();

  if (fragebogenError || !fragebogen) {
    return json({ error: "nicht_gefunden" }, 404);
  }

  const kunde = Array.isArray(fragebogen.kunden) ? fragebogen.kunden[0] : fragebogen.kunden;
  if (!kunde) {
    return json({ error: "kunde_nicht_gefunden" }, 404);
  }

  const link = `${SITE_URL}/formular/?t=${fragebogen.token}`;

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
      subject: "Ihr persönlicher Gesundheitsfragebogen – S² Finanz",
      html: `
        <p>Hallo ${kunde.vorname},</p>
        <p>bitte füllen Sie über den folgenden Link Ihren persönlichen Gesundheitsfragebogen aus:</p>
        <p><a href="${link}">${link}</a></p>
        <p>Der Link ist ausschließlich für Sie persönlich bestimmt. Bitte geben Sie ihn nicht weiter.</p>
        <p>Viele Grüße<br>Ihr S² Finanz Team</p>
      `,
    });
  } catch {
    return json({ error: "versand_fehlgeschlagen" }, 502);
  }

  const { error: updateError } = await admin
    .from("fragebogen")
    .update({ status: "versendet", versendet_am: new Date().toISOString() })
    .eq("id", body.fragebogenId);

  if (updateError) {
    return json({ error: "update_fehlgeschlagen" }, 500);
  }

  return json({ erfolg: true });
});
