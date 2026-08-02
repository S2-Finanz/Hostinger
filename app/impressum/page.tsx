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
                  {/* TODO: Rechtsform und vollständigen Firmennamen eintragen, z. B. „S² Finanz GmbH“ oder „S² Finanz – Scheuermann & Schäfer GbR“ */}
                  S² Finanz
                  <br />
                  {/* TODO: vertretungsberechtigte Person(en) eintragen */}
                  Marcel Scheuermann, Marcel Schäfer
                  <br />
                  Furthstraße 41/5
                  <br />
                  73770 Denkendorf
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Kontakt
                </h2>
                <p className="mt-3">
                  {/* TODO: Telefonnummer eintragen */}
                  Telefon: [TODO]
                  <br />
                  {/* TODO: E-Mail-Adresse eintragen */}
                  E-Mail: [TODO]
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Registereintrag
                </h2>
                <p className="mt-3">
                  {/* TODO: Falls im Handelsregister eingetragen: Registergericht und Registernummer. Falls Einzelunternehmen/Gewerbe: zuständige Gewerbebehörde/IHK. */}
                  [TODO: Handelsregister / Gewerbeanmeldung]
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Umsatzsteuer-Identifikationsnummer
                </h2>
                <p className="mt-3">
                  {/* TODO: USt-IdNr. gemäß § 27 a Umsatzsteuergesetz eintragen, falls vorhanden */}
                  [TODO: USt-IdNr.]
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Angaben nach § 11 VersVermV (Versicherungsvermittlung)
                </h2>
                <p className="mt-3">
                  {/*
                    TODO: Als Versicherungsmakler gesetzlich verpflichtende Angaben ergänzen:
                    - Erlaubnis nach § 34d Abs. 1 GewO, erteilt durch die zuständige IHK
                    - Vermittlerregisternummer (Eintrag im Register unter www.vermittlerregister.info)
                    - Zuständige Register-/Aufsichtsbehörde (i. d. R. die zuständige IHK)
                    - Angaben zur Berufshaftpflichtversicherung (Versicherer, geografischer Geltungsbereich)
                  */}
                  [TODO: Erlaubnis nach § 34d Abs. 1 GewO, Vermittlerregisternummer,
                  zuständige IHK, Berufshaftpflichtversicherung]
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
                </h2>
                <p className="mt-3">
                  {/* TODO: Verantwortliche Person mit ladungsfähiger Anschrift eintragen */}
                  [TODO]
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
