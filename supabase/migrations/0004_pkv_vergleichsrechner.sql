-- PKV-Vergleichsrechner (Backoffice)
--
-- Diese Datei im Supabase SQL Editor ausführen (nach 0001-0003).
--
-- Sicherheitsmodell:
-- - "pkv_berechnungen" ist wie "kunden"/"fragebogen" ausschließlich für
--   eingeloggte @s2-finanz.de-Mitarbeiter erreichbar (ist_mitarbeiter()).
-- - Es werden nur die Eingaben gespeichert (jsonb), nicht die berechneten
--   Ergebnisse -- die werden beim Laden aus den Eingaben neu berechnet,
--   damit eine spätere Korrektur der Rechenlogik nicht zu falschen,
--   veralteten gespeicherten Ergebnissen führt.

create table if not exists public.pkv_berechnungen (
  id uuid primary key default gen_random_uuid(),
  bezeichnung text not null,
  eingaben jsonb not null,
  erstellt_von uuid references auth.users (id),
  erstellt_am timestamptz not null default now(),
  aktualisiert_am timestamptz not null default now()
);

alter table public.pkv_berechnungen enable row level security;

drop policy if exists "Mitarbeiter voller Zugriff" on public.pkv_berechnungen;
create policy "Mitarbeiter voller Zugriff"
  on public.pkv_berechnungen
  for all
  to authenticated
  using (public.ist_mitarbeiter())
  with check (public.ist_mitarbeiter());
