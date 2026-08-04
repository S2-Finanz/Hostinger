-- Backoffice: Kundenverwaltung + Gesundheits-Fragebogen-Versand
--
-- Diese Datei im Supabase SQL Editor des Projekts ausführen
-- (Dashboard -> SQL Editor -> New query -> Inhalt einfügen -> Run).
--
-- Sicherheitsmodell:
-- - "kunden" und "fragebogen" sind per RLS ausschließlich für eingeloggte
--   Mitarbeiter mit @s2-finanz.de-Adresse erreichbar (serverseitig geprüft,
--   nicht nur im Frontend).
-- - Der Kunde selbst hat nie einen Login. Er greift über einen zufälligen
--   Token im Link auf genau seinen Fragebogen zu. Das läuft ausschließlich
--   über die beiden SECURITY DEFINER-Funktionen unten, die als einzige den
--   Zugriff über den Token kapseln – die Tabellen selbst bleiben für
--   anonyme Nutzer komplett unzugänglich.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- Tabellen
-- ---------------------------------------------------------------------

create table if not exists public.kunden (
  id uuid primary key default gen_random_uuid(),
  vorname text not null,
  nachname text not null,
  geburtsdatum date not null,
  email text not null,
  telefon text,
  erstellt_von uuid references auth.users (id),
  erstellt_am timestamptz not null default now()
);

create table if not exists public.fragebogen (
  id uuid primary key default gen_random_uuid(),
  kunde_id uuid not null references public.kunden (id) on delete cascade,
  token text not null unique default encode(gen_random_bytes(32), 'hex'),
  status text not null default 'erstellt'
    check (status in ('erstellt', 'versendet', 'ausgefuellt')),
  erstellt_von uuid references auth.users (id),
  erstellt_am timestamptz not null default now(),
  versendet_am timestamptz,
  ausgefuellt_am timestamptz,
  antworten jsonb,
  unterschrift_bild text,
  unterschrift_ip text,
  bestaetigungstext text,
  einwilligungstext text
);

create index if not exists fragebogen_kunde_id_idx on public.fragebogen (kunde_id);

alter table public.kunden enable row level security;
alter table public.fragebogen enable row level security;

-- ---------------------------------------------------------------------
-- Mitarbeiter-Check (serverseitig, nicht nur im Frontend)
-- ---------------------------------------------------------------------

create or replace function public.ist_mitarbeiter()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select auth.role() = 'authenticated'
    and lower(coalesce(auth.jwt() ->> 'email', '')) like '%@s2-finanz.de';
$$;

-- ---------------------------------------------------------------------
-- RLS-Policies: nur eingeloggte s2-finanz.de-Mitarbeiter, volle Rechte
-- ---------------------------------------------------------------------

drop policy if exists "Mitarbeiter voller Zugriff" on public.kunden;
create policy "Mitarbeiter voller Zugriff"
  on public.kunden
  for all
  to authenticated
  using (public.ist_mitarbeiter())
  with check (public.ist_mitarbeiter());

drop policy if exists "Mitarbeiter voller Zugriff" on public.fragebogen;
create policy "Mitarbeiter voller Zugriff"
  on public.fragebogen
  for all
  to authenticated
  using (public.ist_mitarbeiter())
  with check (public.ist_mitarbeiter());

-- Kein Zugriff für anon auf die Tabellen selbst -- der Kunde kommt
-- ausschließlich über die beiden Funktionen unten an seine Daten.
revoke all on public.kunden from anon;
revoke all on public.fragebogen from anon;

-- ---------------------------------------------------------------------
-- Öffentliche Funktionen für den Formular-Link (Token-Zugriff, kein Login)
-- ---------------------------------------------------------------------

create or replace function public.fragebogen_abrufen(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_fragebogen public.fragebogen%rowtype;
  v_kunde public.kunden%rowtype;
begin
  select * into v_fragebogen from public.fragebogen where token = p_token;

  if not found then
    return jsonb_build_object('gefunden', false);
  end if;

  if v_fragebogen.status = 'ausgefuellt' then
    return jsonb_build_object('gefunden', true, 'status', 'ausgefuellt');
  end if;

  select * into v_kunde from public.kunden where id = v_fragebogen.kunde_id;

  return jsonb_build_object(
    'gefunden', true,
    'status', v_fragebogen.status,
    'vorname', v_kunde.vorname,
    'nachname', v_kunde.nachname,
    'geburtsdatum', v_kunde.geburtsdatum
  );
end;
$$;

create or replace function public.fragebogen_einreichen(
  p_token text,
  p_antworten jsonb,
  p_unterschrift_bild text,
  p_bestaetigungstext text,
  p_einwilligungstext text
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_fragebogen public.fragebogen%rowtype;
  v_ip text;
begin
  select * into v_fragebogen from public.fragebogen where token = p_token;

  if not found then
    return jsonb_build_object('erfolg', false, 'grund', 'ungueltig');
  end if;

  if v_fragebogen.status = 'ausgefuellt' then
    return jsonb_build_object('erfolg', false, 'grund', 'bereits_ausgefuellt');
  end if;

  v_ip := split_part(
    coalesce(
      (current_setting('request.headers', true)::jsonb ->> 'x-forwarded-for'),
      'unbekannt'
    ),
    ',',
    1
  );

  update public.fragebogen
  set status = 'ausgefuellt',
      ausgefuellt_am = now(),
      antworten = p_antworten,
      unterschrift_bild = p_unterschrift_bild,
      unterschrift_ip = v_ip,
      bestaetigungstext = p_bestaetigungstext,
      einwilligungstext = p_einwilligungstext
  where token = p_token;

  return jsonb_build_object('erfolg', true);
end;
$$;

grant execute on function public.fragebogen_abrufen(text) to anon, authenticated;
grant execute on function public.fragebogen_einreichen(text, jsonb, text, text, text) to anon, authenticated;
