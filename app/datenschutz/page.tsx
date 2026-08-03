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
              {/* TODO: Diesen Entwurf vor Veröffentlichung von einem
              Datenschutz-Generator (z. B. e-recht24, Trusted Shops) oder
              einer Rechtsberatung prüfen und um die noch fehlenden Angaben
              (Kontaktdaten, ggf. eingesetzte Analyse-/Marketing-Tools)
              ergänzen lassen. */}
              Diese Erklärung informiert über Art, Umfang und Zweck der
              Verarbeitung personenbezogener Daten auf dieser Website.
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
                  Marcel Scheuermann, Marcel Schäfer
                  <br />
                  handelnd unter „S² Finanz“
                  <br />
                  Furtstr. 41/5
                  <br />
                  73770 Denkendorf
                  <br />
                  Telefon: 0174 1865960
                  <br />
                  E-Mail: info@s2-finanz.de
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  2. Hosting
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
                  3. Schriftarten
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
                  4. Terminbuchung über Cal.com
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
                  5. Cookies und Analyse-Tools
                </h2>
                <p className="mt-3">
                  {/* TODO: Diesen Absatz aktualisieren, sobald Analyse-,
                  Marketing- oder Tracking-Tools (z. B. Google Analytics,
                  Meta-Pixel) eingesetzt werden – inklusive Rechtsgrundlage
                  und ggf. Cookie-Consent-Banner. */}
                  Diese Website setzt derzeit keine Analyse-, Marketing- oder
                  Tracking-Cookies ein.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  6. Ihre Rechte
                </h2>
                <p className="mt-3">
                  Sie haben das Recht auf Auskunft, Berichtigung, Löschung
                  oder Einschränkung der Verarbeitung Ihrer personenbezogenen
                  Daten sowie ein Recht auf Datenübertragbarkeit und
                  Widerspruch gegen die Verarbeitung. Zudem steht Ihnen ein
                  Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  7. Kontakt zu uns
                </h2>
                <p className="mt-3">
                  Wenn Sie uns über die auf dieser Website angegebenen Wege
                  kontaktieren, verarbeiten wir die von Ihnen mitgeteilten
                  Daten zur Bearbeitung Ihrer Anfrage auf Grundlage von Art. 6
                  Abs. 1 lit. b bzw. lit. f DSGVO.
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
