import { supabase } from "@/lib/supabase";

export type Kunde = {
  id: string;
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  email: string;
  telefon: string | null;
  erstellt_am: string;
};

export type FragebogenStatus = "erstellt" | "versendet" | "ausgefuellt";

export type FragebogenEintrag = {
  id: string;
  kunde_id: string;
  token: string;
  status: FragebogenStatus;
  erstellt_am: string;
  versendet_am: string | null;
  ausgefuellt_am: string | null;
};

export async function ladeKunden(): Promise<Kunde[]> {
  const { data, error } = await supabase
    .from("kunden")
    .select("*")
    .order("erstellt_am", { ascending: false });

  if (error) throw error;
  return data as Kunde[];
}

export async function legeKundeAn(input: {
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  email: string;
  telefon: string;
}): Promise<Kunde> {
  const { data, error } = await supabase
    .from("kunden")
    .insert({
      vorname: input.vorname,
      nachname: input.nachname,
      geburtsdatum: input.geburtsdatum,
      email: input.email,
      telefon: input.telefon || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Kunde;
}

export async function ladeFragebogenFuerKunde(kundeId: string): Promise<FragebogenEintrag[]> {
  const { data, error } = await supabase
    .from("fragebogen")
    .select("id, kunde_id, token, status, erstellt_am, versendet_am, ausgefuellt_am")
    .eq("kunde_id", kundeId)
    .order("erstellt_am", { ascending: false });

  if (error) throw error;
  return data as FragebogenEintrag[];
}

export type FragebogenDetail = FragebogenEintrag & {
  antworten: Record<string, string | number> | null;
  unterschrift_bild: string | null;
  unterschrift_ip: string | null;
  bestaetigungstext: string | null;
  einwilligungstext: string | null;
};

export async function ladeFragebogenDetail(fragebogenId: string): Promise<FragebogenDetail> {
  const { data, error } = await supabase
    .from("fragebogen")
    .select(
      "id, kunde_id, token, status, erstellt_am, versendet_am, ausgefuellt_am, antworten, unterschrift_bild, unterschrift_ip, bestaetigungstext, einwilligungstext",
    )
    .eq("id", fragebogenId)
    .single();

  if (error) throw error;
  return data as FragebogenDetail;
}

export async function erstelleUndVersendeFragebogen(kundeId: string): Promise<void> {
  const { data: fragebogen, error: insertError } = await supabase
    .from("fragebogen")
    .insert({ kunde_id: kundeId })
    .select("id")
    .single();

  if (insertError) throw insertError;

  const { error: sendError } = await supabase.functions.invoke("send-fragebogen", {
    body: { fragebogenId: fragebogen.id },
  });

  if (sendError) throw sendError;
}
