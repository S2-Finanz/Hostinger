# S² Finanz Website – Hinweise für Claude Code

## Kundenstimmen / Google-Bewertungen

- Die Bewertungsdaten liegen in `lib/reviews.ts` (Feld `REVIEWS`), **nicht** mehr in
  `components/GoogleReviews.tsx` – das ist Absicht, weil `app/layout.tsx` (Server-Komponente,
  für das JSON-LD-SEO-Snippet) und `GoogleReviews.tsx` (Client-Komponente) dieselben Daten
  brauchen. Neue Bewertungen einfach als weiteres Objekt `{ name, rating, text }` in
  `lib/reviews.ts` ergänzen.
- Die Darstellung/Interaktion in `components/GoogleReviews.tsx` ist **generisch** und muss bei
  neuen Bewertungen **nicht** angepasst werden:
  - Karten sind standardmäßig auf 6 Zeilen begrenzt (`line-clamp-6`), kompakte, gleichmäßige
    Kartenhöhe (`h-64`, Breite `w-80`).
  - Ob ein Text zu lang ist, wird automatisch per echtem Höhenvergleich
    (`scrollHeight > clientHeight`) erkannt – kurze Bewertungen bekommen automatisch **keinen**
    "Bewertung vollständig anzeigen"-Button, lange automatisch schon.
  - Klick klappt nur die jeweils betroffene Karte auf (voller Text, keine Höhenbegrenzung mehr),
    Button-Text wechselt zu "Bewertung wieder einklappen"; erneuter Klick klappt wieder ein.
  - Das endlos scrollende Karussell (`animate-scroll-x`) pausiert automatisch, sobald irgendeine
    Karte aufgeklappt ist (nicht nur bei Hover, funktioniert auch auf Mobilgeräten ohne Hover).
  - Barrierearm umgesetzt: `<button type="button">`, `aria-expanded`, `aria-controls`.
- **Diese Umsetzung nicht verändern/vereinfachen**, außer der Nutzer bittet ausdrücklich darum.
  Beim Hinzufügen neuer Bewertungen reicht ein Eintrag in `lib/reviews.ts`.

## Deploy-Workflow (wichtig, sonst gehen Live-Änderungen verloren)

- Die Live-Seite **s2-finanz.de** wird von Hostinger aus dem Branch **`deploy`** ausgeliefert.
  Dieser Branch enthält **nur den statischen Build-Output** (`next build`, `output: "export"`),
  **keinen Quellcode**.
- Quellcode-Änderungen laufen auf Feature-Branches (`claude/...`). Auch der Geschäftspartner
  arbeitet parallel in eigenen Claude-Code-Sessions auf eigenen `claude/...`-Branches und deployt
  regelmäßig selbst nach `deploy`.
- **Vor jedem eigenen Deploy zwingend prüfen**, ob `deploy` und/oder der Partner-Branch
  (`claude/s2-finanz-hostinger-setup-qfh5xx` bzw. aktuell relevanter Branch) seit dem letzten
  eigenen Stand weitergezogen sind (`git fetch origin deploy <partner-branch>` +
  `git log --oneline HEAD..origin/<partner-branch>`). Falls ja: erst den Partner-Branch in den
  eigenen mergen, dann erst bauen/deployen – sonst werden seine Live-Änderungen überschrieben.
- Ablauf für ein Deploy: Quellcode ändern → committen/pushen auf den eigenen `claude/...`-Branch
  → `npm run build` (braucht `.env.local` mit `NEXT_PUBLIC_SUPABASE_URL` /
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`) → Build-Output (`out/`) in einen frischen Git-Worktree von
  `origin/deploy` kopieren (dabei `.htaccess`/`.gitignore` des deploy-Branches erhalten) →
  committen ("Deploy: ... (vX.XX)", Versionsnummer hochzählen) → nach `origin/deploy` pushen.
