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
  - Das endlos scrollende Karussell läuft **nicht** mehr über eine CSS-Animation
    (`animate-scroll-x`), sondern per `requestAnimationFrame` (siehe `offsetRef`/`tick()` in
    `GoogleReviews.tsx`), damit Auto-Lauf, Pausieren und manuelles Ziehen denselben
    Verschiebungswert teilen und nahtlos ineinander übergehen. Pausiert wird **nur**, solange
    Maus/Finger tatsächlich auf dem Karussell ist (Hover bzw. Pointer-Down) – **nicht** mehr
    dauerhaft, solange eine Karte aufgeklappt ist; bewegt man die Maus weg bzw. hebt den Finger,
    läuft es weiter, auch wenn eine Karte noch aufgeklappt ist.
  - Das Karussell lässt sich per Maus (Klick + Ziehen) am Desktop bzw. per Finger (Swipe) auf
    Mobilgeräten manuell hin- und herschieben, unabhängig vom Auf-/Zugeklappt-Zustand einer
    Karte. Ein Ziehen wird über eine kleine Schwelle (`DRAG_THRESHOLD_PX`) vom normalen
    Klick/Tap auf den "Bewertung anzeigen"-Button unterschieden, damit beides zuverlässig
    nebeneinander funktioniert.
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
  `origin/deploy` kopieren (dabei `.htaccess`/`.htpasswd`/`.gitignore` des deploy-Branches
  erhalten) → committen ("Deploy: ... (vX.XX)", Versionsnummer hochzählen) → nach
  `origin/deploy` pushen.
- Die Live-Seite ist per HTTP-Basic-Auth geschützt (`.htaccess`/`.htpasswd` im `deploy`-Branch,
  nicht über die Hostinger-eigene "Passwortgeschützte Verzeichnisse"-Funktion – die würde bei
  jedem Deploy überschrieben). Diese beiden Dateien bei jedem Deploy unbedingt aus dem
  vorherigen `deploy`-Stand übernehmen, sonst ist die Seite danach ungeschützt live.
