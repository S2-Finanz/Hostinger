-- PKV-Vergleichsrechner: Verknüpfung mit Kunden
--
-- Diese Datei im Supabase SQL Editor ausführen (nach 0001-0004).
--
-- Ergänzt eine optionale Verknüpfung zu "kunden", damit eine Berechnung
-- direkt einem angelegten Kunden zugeordnet werden kann. Bleibt nullable,
-- damit weiterhin auch freistehende Berechnungen ohne Kundenzuordnung
-- möglich sind (z. B. für ein schnelles Was-wäre-wenn ohne angelegten
-- Kunden). Beim Löschen eines Kunden bleibt die Berechnung erhalten, nur
-- die Zuordnung wird entfernt.

alter table public.pkv_berechnungen
  add column if not exists kunde_id uuid references public.kunden (id) on delete set null;

create index if not exists pkv_berechnungen_kunde_id_idx
  on public.pkv_berechnungen (kunde_id);
