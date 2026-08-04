-- Kontaktformular
--
-- Diese Datei im Supabase SQL Editor ausführen (nach 0001_kunden_fragebogen.sql).
--
-- Sicherheitsmodell:
-- - Jeder (auch ohne Login) darf eine Kontaktanfrage einreichen (INSERT).
-- - Lesen/Bearbeiten/Löschen ist ausschließlich eingeloggten
--   @s2-finanz.de-Mitarbeitern vorbehalten (dieselbe ist_mitarbeiter()-
--   Funktion wie bei kunden/fragebogen).

create table if not exists public.kontaktanfragen (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  telefon text,
  thema text not null check (
    thema in ('pkv', 'arbeitskraftabsicherung', 'beamtenversorgung', 'altersvorsorge', 'allgemeine-analyse')
  ),
  nachricht text not null,
  erstellt_am timestamptz not null default now(),
  gelesen boolean not null default false
);

alter table public.kontaktanfragen enable row level security;

drop policy if exists "Jeder darf eine Kontaktanfrage einreichen" on public.kontaktanfragen;
create policy "Jeder darf eine Kontaktanfrage einreichen"
  on public.kontaktanfragen
  for insert
  to anon
  with check (true);

drop policy if exists "Mitarbeiter voller Zugriff auf Kontaktanfragen" on public.kontaktanfragen;
create policy "Mitarbeiter voller Zugriff auf Kontaktanfragen"
  on public.kontaktanfragen
  for all
  to authenticated
  using (public.ist_mitarbeiter())
  with check (public.ist_mitarbeiter());
