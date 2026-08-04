import { supabase } from "@/lib/supabase";

export type KontaktThema =
  | "pkv"
  | "arbeitskraftabsicherung"
  | "beamtenversorgung"
  | "altersvorsorge"
  | "allgemeine-analyse";

export const KONTAKT_THEMEN: { value: KontaktThema; label: string }[] = [
  { value: "pkv", label: "Private Krankenversicherung" },
  { value: "arbeitskraftabsicherung", label: "Arbeitskraftabsicherung" },
  { value: "beamtenversorgung", label: "Beamtenversorgung" },
  { value: "altersvorsorge", label: "Altersvorsorge" },
  { value: "allgemeine-analyse", label: "Allgemeine Versicherungsanalyse" },
];

export async function sendeKontaktanfrage(input: {
  name: string;
  email: string;
  telefon: string;
  thema: KontaktThema;
  nachricht: string;
  // Honeypot: bleibt bei echten Nutzern immer leer, einfache Bots füllen
  // jedes Feld aus. Wird still verworfen statt einen Fehler zu zeigen.
  webseite: string;
}): Promise<void> {
  if (input.webseite) return;

  const { error } = await supabase.from("kontaktanfragen").insert({
    name: input.name,
    email: input.email,
    telefon: input.telefon || null,
    thema: input.thema,
    nachricht: input.nachricht,
  });

  if (error) throw error;
}
