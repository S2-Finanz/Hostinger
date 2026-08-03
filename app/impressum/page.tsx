import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/impressum/" },
  title: "Impressum – S² Finanz",
  description: "Impressum und Anbieterkennzeichnung von S² Finanz.",
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 py-20">
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              Impressum
            </h1>
          </div>
        </section>

        <section className="bg-graphit">
          <div className="mx-auto max-w-content px-6 py-16 text-sm leading-relaxed text-nebel">
            <div className="max-w-2xl space-y-8">
              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Angaben gemäß § 5 TMG
                </h2>
                <p className="mt-3">
                  S² Finanz GbR
                  <br />
                  vertreten durch die Gesellschafter Marcel Scheuermann und
                  Marcel Schäfer
                  <br />
                  Furtstr. 41/5
                  <br />
                  73770 Denkendorf
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Kontakt
                </h2>
                <p className="mt-3">
                  Telefon: 0174 1865960
                  <br />
                  E-Mail: info@s2-finanz.de
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Registereintrag
                </h2>
                <p className="mt-3">
                  Gesellschaft bürgerlichen Rechts (GbR), nicht im
                  Handelsregister eingetragen.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Umsatzsteuer
                </h2>
                <p className="mt-3">
                  Umsatzsteuerbefreit gemäß § 4 Nr. 11 UStG (Vermittlung von
                  Versicherungsverträgen); daher keine
                  Umsatzsteuer-Identifikationsnummer.
                  <br />
                  Zuständiges Finanzamt: Finanzamt Esslingen,
                  Entengrabenstraße, Esslingen am Neckar.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Angaben nach § 11 VersVermV (Versicherungsvermittlung)
                </h2>
                <p className="mt-3">
                  Tätigkeitsart: Versicherungsmakler mit Erlaubnis nach § 34d
                  Abs. 1 GewO
                  <br />
                  Erlaubnisinhaber: Marcel Scheuermann
                  <br />
                  Registrierungsnummer: D-R9IE-52AR4-59
                  <br />
                  {/* TODO: Registrierungsnummer von Marcel Schäfer ergänzen, sobald im Vermittlerregister online sichtbar (Eintragung bei der IHK bereits erfolgt). */}
                  Erlaubnisinhaber: Marcel Schäfer (Eintragung bei der IHK
                  erfolgt, Registrierungsnummer im Online-Register noch nicht
                  sichtbar)
                  <br />
                  Registerprüfung:{" "}
                  <a
                    href="https://www.vermittlerregister.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:opacity-80"
                  >
                    www.vermittlerregister.info
                  </a>
                  <br />
                  <br />
                  Erlaubnis- und Registerbehörde:
                  <br />
                  Industrie- und Handelskammer Region Stuttgart
                  <br />
                  Jägerstraße 30, 70174 Stuttgart
                  <br />
                  Baden-Württemberg, Deutschland
                </p>
                <p className="mt-3">
                  Berufshaftpflichtversicherung (Vermögensschaden-Haftpflicht
                  für Versicherungsvermittlung gem. § 34d GewO):
                  <br />
                  Liberty Specialty Markets Europe S.à.r.l., Zweigniederlassung
                  Deutschland, namens und in Vollmacht für Liberty Mutual
                  Insurance Europe SE
                  <br />
                  Im Klapperhof 7-23, 50670 Köln
                  <br />
                  Versicherungssumme: 1.600.000 EUR
                  <br />
                  Geltungsbereich: Europäische Union
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
                </h2>
                <p className="mt-3">
                  Marcel Scheuermann, Marcel Schäfer
                  <br />
                  Furtstr. 41/5, 73770 Denkendorf
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  EU-Streitschlichtung
                </h2>
                <p className="mt-3">
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:opacity-80"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                  . Wir sind nicht verpflichtet und nicht bereit, an einem
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
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
