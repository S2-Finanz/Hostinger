import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/datenschutz/" },
  title: "Datenschutzerklärung – S² Finanz",
  description: "Datenschutzerklärung von S² Finanz.",
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 py-20">
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              Datenschutzerklärung
            </h1>
            <p className="mt-4 max-w-xl text-sm text-nebel">
              {/* TODO: Vor Veröffentlichung von einer Rechtsberatung
              gegenprüfen lassen – insbesondere Abschnitt 9
              (Gesundheitsfragebogen, Art. 9 DSGVO). Platzhalter für
              Handelsregisternummer/Registergericht (Abschnitt 1) nach
              Eintragung der GmbH ergänzen. */}
              Diese Erklärung informiert über Art, Umfang und Zweck der
              Verarbeitung personenbezogener Daten auf dieser Website und im
              Rahmen unserer Beratungstätigkeit.
            </p>
          </div>
        </section>

        <section className="bg-graphit">
          <div className="mx-auto max-w-content px-6 py-16 text-sm leading-relaxed text-nebel">
            <div className="max-w-2xl space-y-8">
              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  1. Verantwortlicher
                </h2>
                <p className="mt-3">
                  S² Finanz GmbH
                  <br />
                  vertreten durch die Geschäftsführer Marcel Scheuermann und
                  Marcel Schäfer
                  <br />
                  Furtstr. 41/5
                  <br />
                  73770 Denkendorf
                  <br />
                  Telefon: 0174 1865960
                  <br />
                  E-Mail: info@s2-finanz.de
                </p>
                <p className="mt-3 text-xs text-nebel/70">
                  {/* TODO: Nach Eintragung ins Handelsregister ergänzen */}
                  Handelsregister: Eintragung in Vorbereitung. Registergericht
                  und Handelsregisternummer werden nach Abschluss der
                  Eintragung ergänzt.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  2. Datenschutzbeauftragter
                </h2>
                <p className="mt-3">
                  Ein Datenschutzbeauftragter ist derzeit nicht bestellt. Bei
                  Fragen zum Datenschutz wenden Sie sich bitte direkt an die
                  oben genannten Kontaktdaten.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  3. Allgemeines zur Datenverarbeitung
                </h2>
                <p className="mt-3">
                  Wir verarbeiten personenbezogene Daten unserer Website­
                  besucher und Mandanten nur, soweit dies zur Bereitstellung
                  einer funktionsfähigen Website und unserer Beratungs­
                  leistungen als Versicherungsmakler erforderlich ist oder Sie
                  hierin eingewilligt haben. Rechtsgrundlagen sind je nach
                  Verarbeitungszweck insbesondere Art. 6 Abs. 1 lit. a
                  (Einwilligung), lit. b (Vertragserfüllung bzw.
                  vorvertragliche Maßnahmen) und lit. f DSGVO (berechtigtes
                  Interesse an einem sicheren und funktionsfähigen Betrieb der
                  Website), für Gesundheitsdaten zusätzlich Art. 9 Abs. 2 lit.
                  a DSGVO (ausdrückliche Einwilligung).
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  4. Hosting
                </h2>
                <p className="mt-3">
                  Diese Website wird bei Hostinger gehostet. Beim Aufruf der
                  Website erhebt der Hosting-Anbieter automatisch technische
                  Zugriffsdaten (u. a. IP-Adresse, Datum und Uhrzeit des
                  Zugriffs, aufgerufene Seite, Browsertyp) in sogenannten
                  Server-Logfiles. Diese Verarbeitung erfolgt auf Grundlage
                  unseres berechtigten Interesses an einem technisch
                  fehlerfreien und sicheren Betrieb der Website (Art. 6 Abs.
                  1 lit. f DSGVO).
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  5. Datenbank und Backend (Supabase)
                </h2>
                <p className="mt-3">
                  Für die Speicherung und Verarbeitung von Anfragen,
                  Formulareingaben und den internen Mitarbeiterzugang nutzen
                  wir den Dienst Supabase. Der von uns genutzte
                  Datenbankserver befindet sich in Irland und damit innerhalb
                  der Europäischen Union; eine Übermittlung in Drittländer
                  außerhalb der EU/des EWR findet insoweit nicht statt. Welche
                  Daten im Einzelnen über Supabase gespeichert werden, ist in
                  den folgenden Abschnitten zu den jeweiligen Formularen
                  beschrieben.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  6. Schriftarten
                </h2>
                <p className="mt-3">
                  Diese Website nutzt die Schriftart „Inter“. Die Schriftdatei
                  wird beim Bau der Website lokal eingebunden und beim Aufruf
                  der Seite von unserem eigenen Server ausgeliefert. Es findet
                  keine Verbindung zu Google-Servern zum Laden von
                  Schriftarten statt.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  7. Terminbuchung über Cal.com
                </h2>
                <p className="mt-3">
                  Für die Vereinbarung von Beratungsterminen verlinken wir auf
                  das externe Buchungstool Cal.com, das in einem neuen
                  Browser-Tab geöffnet wird. Mit dem Anklicken des Buttons
                  „Termin vereinbaren“ verlassen Sie unsere Website; es gilt
                  dann die Datenschutzerklärung von Cal.com. Wir haben keinen
                  Einfluss auf Umfang und Verwendung der Daten, die beim
                  Aufruf von Cal.com erhoben werden.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  8. Kommunikation über WhatsApp
                </h2>
                <p className="mt-3">
                  {/* TODO: Absatz gegenprüfen, sobald geklärt ist, ob eine
                  private oder geschäftliche Nummer sowie die
                  WhatsApp-Business-App (manuell) oder die WhatsApp Business
                  Platform (API-Anbindung) genutzt wird. */}
                  Auf Wunsch kommunizieren wir mit Mandanten auch über den
                  Messenger-Dienst WhatsApp. WhatsApp wird von der WhatsApp
                  Ireland Limited bzw. der Meta Platforms Ireland Limited
                  betrieben; bei der Nutzung können Daten (u. a. Ihre
                  Telefonnummer sowie der Inhalt der Nachrichten) auch auf
                  Servern außerhalb der EU/des EWR verarbeitet werden. Die
                  Nutzung erfolgt freiwillig auf Ihre Initiative bzw. mit
                  Ihrer Einwilligung (Art. 6 Abs. 1 lit. a bzw. lit. b DSGVO).
                  Es gilt ergänzend die Datenschutzerklärung von WhatsApp/
                  Meta.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  9. Kontaktformular
                </h2>
                <p className="mt-3">
                  Wenn Sie uns über unser Kontaktformular eine Anfrage senden,
                  speichern wir die von Ihnen angegebenen Daten (Name,
                  E-Mail-Adresse, optional Telefonnummer, gewähltes Thema,
                  Nachrichtentext) zur Bearbeitung Ihrer Anfrage. Rechtsgrund­
                  lage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
                  Maßnahmen auf Ihre Anfrage hin) bzw. Art. 6 Abs. 1 lit. f
                  DSGVO (berechtigtes Interesse an der Bearbeitung von
                  Anfragen). Die Daten werden über unseren Datenbankdienst
                  Supabase gespeichert (siehe Abschnitt 5). Wir speichern
                  diese Angaben grundsätzlich für die Dauer von 5 Jahren,
                  sofern Sie nicht vorher eine Löschung wünschen.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  10. Kennenlern-Funnel (Qualifizierungsformular)
                </h2>
                <p className="mt-3">
                  Über unser mehrstufiges Formular unter „Jetzt kostenloses
                  Kennenlerngespräch vereinbaren“ erheben wir neben Ihren
                  Kontaktdaten (Vorname, Nachname, E-Mail-Adresse,
                  Telefonnummer) auch Angaben zu Ihrer beruflichen Situation
                  (z. B. Status als Student, Angestellter, Beamter oder
                  Selbstständiger), zu Ihrem Bundesland sowie – je nach
                  Auswahl – eine grobe Einkommensspanne und die
                  Themenbereiche, zu denen Sie sich beraten lassen möchten.
                  Diese Angaben dienen ausschließlich der Vorqualifizierung
                  vor einem Beratungsgespräch, damit wir uns gezielt
                  vorbereiten können. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
                  DSGVO (vorvertragliche Maßnahmen). Zusätzlich können Sie im
                  Formular optional in den Erhalt eines Newsletters
                  einwilligen (Art. 6 Abs. 1 lit. a DSGVO); aktuell versenden
                  wir noch keinen Newsletter, eine erteilte Einwilligung
                  speichern wir für eine spätere Nutzung, bis Sie diese
                  widerrufen. Die Daten werden über Supabase gespeichert und
                  grundsätzlich für 5 Jahre aufbewahrt, sofern Sie nicht
                  vorher eine Löschung wünschen.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  11. Gesundheitsfragebogen
                </h2>
                <p className="mt-3">
                  Im Rahmen der Vorbereitung eines Versicherungsantrags (z. B.
                  für private Krankenversicherung oder
                  Berufsunfähigkeitsversicherung) senden wir Ihnen auf
                  persönliche Absprache einen personalisierten Link zu einem
                  digitalen Gesundheitsfragebogen zu. Darin erheben wir
                  besondere Kategorien personenbezogener Daten im Sinne von
                  Art. 9 DSGVO, insbesondere Angaben zu Ihrem Gesundheits­
                  zustand, zu bestehenden oder früheren Erkrankungen,
                  Behandlungen, Medikamenteneinnahme, Größe und Gewicht sowie
                  zu bestimmten Risikofaktoren (u. a. berufliche und private
                  Risiken, Reisen). Zusätzlich erfassen wir Vorname, Nachname
                  und Geburtsdatum, eine handschriftliche Unterschrift
                  (digital erfasst als Bilddatei) sowie Ihre ausdrückliche
                  Einwilligung zur Verarbeitung dieser Angaben und Ihre
                  Bestätigung der Richtigkeit der gemachten Angaben.
                </p>
                <p className="mt-3">
                  Rechtsgrundlage für die Verarbeitung dieser besonderen
                  Kategorien personenbezogener Daten ist Ihre ausdrückliche
                  Einwilligung (Art. 9 Abs. 2 lit. a DSGVO), die Sie im
                  Rahmen des Ausfüllens des Fragebogens gesondert erteilen;
                  im Übrigen ist die Verarbeitung zur Vorbereitung eines von
                  Ihnen gewünschten Versicherungsvertrags erforderlich (Art. 6
                  Abs. 1 lit. b DSGVO).
                </p>
                <p className="mt-3">
                  <strong className="text-white">Zugriff:</strong> Auf die
                  Angaben aus dem Gesundheitsfragebogen haben ausschließlich
                  Marcel Scheuermann und Marcel Schäfer Zugriff.
                </p>
                <p className="mt-3">
                  <strong className="text-white">
                    Weitergabe an Versicherungsgesellschaften:
                  </strong>{" "}
                  Ihre Angaben werden nicht automatisch an eine
                  Versicherungsgesellschaft weitergeleitet. Zur Einschätzung
                  Ihrer Versicherbarkeit übermitteln wir im Rahmen einer
                  sogenannten Risikovoranfrage lediglich Ihr Geburtsdatum
                  sowie die gesundheitsbezogenen Angaben an die jeweilige
                  Versicherungsgesellschaft, jedoch ausdrücklich ohne Ihren
                  Namen und ohne Ihre Anschrift. Eine Zuordnung zu Ihrer
                  Person bleibt dabei intern bei uns weiterhin möglich; es
                  handelt sich damit rechtlich nicht um eine vollständig
                  anonyme, sondern um eine auf das erforderliche Maß
                  reduzierte Übermittlung. Erst wenn Sie sich für einen
                  Vertragsabschluss entscheiden, werden Ihre vollständigen
                  Angaben mit Ihrem Einverständnis im eigentlichen
                  Antragsverfahren an die Versicherungsgesellschaft
                  übermittelt.
                </p>
                <p className="mt-3">
                  <strong className="text-white">Speicherdauer:</strong> Wir
                  speichern die Angaben aus dem Gesundheitsfragebogen
                  grundsätzlich für einen Zeitraum von 5 Jahren, um unserer
                  Beratungsdokumentation als Versicherungsmakler nachkommen
                  zu können. Auf Ihren Wunsch löschen wir Ihre Daten auch
                  vorher; wenden Sie sich hierzu an die in Abschnitt 1
                  genannten Kontaktdaten.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  12. Interner Mitarbeiterbereich (Backoffice)
                </h2>
                <p className="mt-3">
                  Für unsere interne Verwaltung (u. a. Einsicht in
                  eingegangene Kontaktanfragen sowie interne
                  Provisionsübersichten) nutzen wir einen passwortgeschützten
                  Bereich, dessen Zugang auf E-Mail-Adressen unserer eigenen
                  Domain beschränkt ist. Der Login erfolgt über die
                  Authentifizierungsfunktion von Supabase. Es handelt sich
                  hierbei nicht um einen öffentlich zugänglichen
                  Kundenbereich.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  13. Cookies und Analyse-Tools
                </h2>
                <p className="mt-3">
                  {/* TODO: Absatz aktualisieren, sobald Analyse-,
                  Marketing- oder Tracking-Tools eingesetzt werden –
                  inklusive Rechtsgrundlage und ggf. Cookie-Consent-Banner. */}
                  Diese Website setzt derzeit keine Analyse-, Marketing- oder
                  Tracking-Cookies ein. Im passwortgeschützten
                  Mitarbeiterbereich (siehe Abschnitt 12) wird ein technisch
                  notwendiges Session-Cookie zur Aufrechterhaltung des Logins
                  gesetzt (Art. 6 Abs. 1 lit. f DSGVO).
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  14. Ihre Rechte als betroffene Person
                </h2>
                <p className="mt-3">Sie haben das Recht auf:</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5">
                  <li>Auskunft über die von uns verarbeiteten Daten (Art. 15 DSGVO)</li>
                  <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                  <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                  <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                  <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                  <li>
                    Widerruf einer erteilten Einwilligung mit Wirkung für die
                    Zukunft (Art. 7 Abs. 3 DSGVO), insbesondere für den
                    Gesundheitsfragebogen und den Newsletter
                  </li>
                </ul>
                <p className="mt-3">
                  Zur Ausübung dieser Rechte genügt eine formlose Mitteilung
                  an die in Abschnitt 1 genannten Kontaktdaten.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  15. Beschwerderecht bei einer Aufsichtsbehörde
                </h2>
                <p className="mt-3">
                  Sie haben das Recht, sich bei einer
                  Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist:
                  <br />
                  Der Landesbeauftragte für den Datenschutz und die
                  Informationsfreiheit Baden-Württemberg
                  <br />
                  Königstraße 10a, 70173 Stuttgart
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  16. Aktualität und Änderung dieser Datenschutzerklärung
                </h2>
                <p className="mt-3">
                  Diese Datenschutzerklärung ist aktuell gültig (Stand: August
                  2026). Durch die Weiterentwicklung unserer Website und
                  Angebote kann es erforderlich werden, diese
                  Datenschutzerklärung anzupassen.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
