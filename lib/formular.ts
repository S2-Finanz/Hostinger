import { supabase } from "@/lib/supabase";

export type FragebogenAbrufenErgebnis =
  | { gefunden: false }
  | { gefunden: true; status: "ausgefuellt" }
  | {
      gefunden: true;
      status: "erstellt" | "versendet";
      vorname: string;
      nachname: string;
      geburtsdatum: string;
    };

export async function fragebogenAbrufen(token: string): Promise<FragebogenAbrufenErgebnis> {
  const { data, error } = await supabase.rpc("fragebogen_abrufen", { p_token: token });
  if (error) throw error;
  return data as FragebogenAbrufenErgebnis;
}

export type FragebogenAntworten = Record<string, string | number>;

export async function fragebogenEinreichen(input: {
  token: string;
  antworten: FragebogenAntworten;
  unterschriftBild: string;
  bestaetigungstext: string;
  einwilligungstext: string;
}): Promise<{ erfolg: boolean; grund?: string }> {
  const { data, error } = await supabase.rpc("fragebogen_einreichen", {
    p_token: input.token,
    p_antworten: input.antworten,
    p_unterschrift_bild: input.unterschriftBild,
    p_bestaetigungstext: input.bestaetigungstext,
    p_einwilligungstext: input.einwilligungstext,
  });
  if (error) throw error;
  return data as { erfolg: boolean; grund?: string };
}
