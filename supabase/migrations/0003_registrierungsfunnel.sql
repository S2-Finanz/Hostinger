-- Registrierungsfunnel (/kennenlernen/)
--
-- Diese Datei im Supabase SQL Editor ausführen (nach 0001 und 0002).
--
-- Sicherheitsmodell:
-- - "kunden" bleibt für anon weiterhin ohne direkten Tabellenzugriff.
--   Eine neue SECURITY DEFINER-Funktion "funnel_absenden" kapselt die
--   Anlage eines Kunden aus dem öffentlichen Funnel heraus, erzwingt die
--   Datenschutz-Zustimmung serverseitig und setzt quelle = 'funnel'.
-- - Manuell im Backoffice angelegte Kunden behalten quelle = 'manuell'
--   (Default) und lösen dadurch keine Funnel-E-Mails aus.

alter table public.kunden
  alter column geburtsdatum drop not null;

alter table public.kunden
  add column if not exists quelle text not null default 'manuell'
    check (quelle in ('manuell', 'funnel')),
  add column if not exists funnel_antworten jsonb,
  add column if not exists newsletter_opt_in boolean not null default false,
  add column if not exists datenschutz_akzeptiert_am timestamptz;

create or replace function public.funnel_absenden(
  p_vorname text,
  p_nachname text,
  p_email text,
  p_telefon text,
  p_antworten jsonb,
  p_newsletter_opt_in boolean,
  p_datenschutz_akzeptiert boolean
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_kunde_id uuid;
begin
  if not coalesce(p_datenschutz_akzeptiert, false) then
    return jsonb_build_object('erfolg', false, 'grund', 'datenschutz_nicht_akzeptiert');
  end if;

  if p_vorname is null or trim(p_vorname) = ''
    or p_nachname is null or trim(p_nachname) = ''
    or p_email is null or trim(p_email) = ''
    or p_telefon is null or trim(p_telefon) = '' then
    return jsonb_build_object('erfolg', false, 'grund', 'unvollstaendige_daten');
  end if;

  insert into public.kunden (
    vorname, nachname, email, telefon, quelle, funnel_antworten,
    newsletter_opt_in, datenschutz_akzeptiert_am
  )
  values (
    trim(p_vorname), trim(p_nachname), trim(p_email), trim(p_telefon), 'funnel', p_antworten,
    coalesce(p_newsletter_opt_in, false), now()
  )
  returning id into v_kunde_id;

  return jsonb_build_object('erfolg', true, 'kunde_id', v_kunde_id);
end;
$$;

grant execute on function public.funnel_absenden(text, text, text, text, jsonb, boolean, boolean)
  to anon, authenticated;

-- ---------------------------------------------------------------------
-- Nach dieser Migration im Supabase Dashboard einrichten:
--
-- 1. Edge Function "notify-funnel-anmeldung" deployen (siehe
--    supabase/functions/notify-funnel-anmeldung/index.ts).
-- 2. Secrets setzen (Projekt-Einstellungen -> Edge Functions -> Secrets):
--    - FUNNEL_WEBHOOK_SECRET   beliebiger langer Zufallswert
--    (KONTAKT_SMTP_USER/PASSWORD/HOST/PORT werden wiederverwendet, da
--    dieselbe hi@s2-finanz.de-Mailbox wie beim Kontaktformular genutzt
--    wird.)
-- 3. Unter Database -> Webhooks einen neuen Webhook anlegen:
--    - Table: kunden, Event: INSERT
--    - Type: Supabase Edge Function -> notify-funnel-anmeldung
--    - HTTP Header hinzufügen: "x-webhook-secret" mit demselben Wert wie
--      FUNNEL_WEBHOOK_SECRET
--    (Die Function selbst ignoriert Inserts mit quelle <> 'funnel', d. h.
--    manuell im Backoffice angelegte Kunden lösen keine E-Mail aus.)
