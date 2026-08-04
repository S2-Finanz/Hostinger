import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Selbstregistrierung ist nur mit einer Firmen-E-Mail-Adresse möglich. Dies
// ist eine clientseitige Komfortprüfung, kein serverseitig erzwungener
// Schutz – ein technisch versierter Nutzer könnte die Supabase-API direkt
// mit einer anderen E-Mail-Adresse ansprechen.
export const ERLAUBTE_EMAIL_DOMAIN = "s2-finanz.de";

export function istErlaubteEmail(email: string): boolean {
  return email.trim().toLowerCase().endsWith(`@${ERLAUBTE_EMAIL_DOMAIN}`);
}
