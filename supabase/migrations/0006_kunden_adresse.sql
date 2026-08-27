-- Kundenverwaltung: Adressfelder ergänzen
--
-- Diese Datei im Supabase SQL Editor ausführen (nach 0001-0005).
--
-- Ergänzt Adressfelder an "kunden". Bleiben optional (nullable), da
-- bestehende Kunden (insb. aus dem Funnel) noch keine Adresse haben und
-- die Adresse oft erst im Laufe der Beratung nachgetragen wird.

alter table public.kunden
  add column if not exists strasse text,
  add column if not exists plz text,
  add column if not exists ort text;
