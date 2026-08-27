import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/erstinformation/" },
  title: "Erstinformation – S² Finanz",
  description:
    "Gesetzliche Erstinformation gemäß § 15 Versicherungsvermittlungsverordnung (VersVermV) von S² Finanz.",
  robots: { index: false, follow: true },
};

export default function ErstinformationPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 py-20">
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              Gesetzliche Kundeninformation &amp; Registrierung
            </h1>
            <p className="mt-4 max-w-xl text-sm text-nebel">
              Erstinformation nach § 15 Versicherungsvermittlungsverordnung
              (VersVermV)
            </p>
          </div>
        </section>

        <section className="bg-graphit">
          <div className="mx-auto max-w-content px-6 py-16 text-sm leading-relaxed text-nebel">
            <div className="max-w-2xl space-y-8">
              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  1. Informationspflichtiger
                </h2>
                <p className="mt-3">
                  {/* TODO: "(Gründung in Vorbereitung)" entfernen, sobald die GmbH ins Handelsregister eingetragen ist */}
                  S² Finanz GmbH (Gründung in Vorbereitung)
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
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  2. Status des Informationspflichtigen
                </h2>
                <p className="mt-3">
                  Der Informationspflichtige ist als Versicherungsmakler mit
                  einer Erlaubnis nach § 34d Abs. 1 der Gewerbeordnung bei der
                  zuständigen Behörde, der Industrie- und Handelskammer
                  Region Stuttgart, gemeldet und im Vermittlerregister
                  registriert.
                </p>
                <p className="mt-3">
                  Vermittlerregister-Nummern:
                  <br />
                  Marcel Scheuermann: D-R9IE-52AR4-59
                  <br />
                  {/* TODO: Registrierungsnummer von Marcel Schäfer ergänzen, sobald im Vermittlerregister online sichtbar */}
                  Marcel Schäfer: Eintragung bei der IHK erfolgt,
                  Registrierungsnummer im Online-Register noch nicht sichtbar
                </p>
                <p className="mt-3">
                  {/* TODO: Nach GmbH-Eintragung prüfen, ob zusätzlich eine
                  eigene Vermittlerregister-Nummer für die S² Finanz GmbH
                  selbst erforderlich ist, und hier ergänzen. */}
                  Registerprüfung:{" "}
                  <a
                    href="https://www.vermittlerregister.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:opacity-80"
                  >
                    www.vermittlerregister.info
                  </a>
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  3. Beratung und Vergütung
                </h2>
                <p className="mt-3">
                  Wir bieten im Zuge der Vermittlung eine Beratung gemäß den
                  gesetzlichen Vorgaben an und erhalten für unsere Tätigkeit
                  eine Courtage, die von den Versicherungsunternehmen gezahlt
                  wird und in der Versicherungsprämie bereits enthalten ist.
                  Darüber hinaus erhalten wir keine anderweitige Vergütung im
                  Zusammenhang mit der Vermittlung, es sei denn, dies wird im
                  Einzelfall ausdrücklich und schriftlich im Vorfeld mit dem
                  Kunden vereinbart.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  4. Gemeinsame Registerstelle
                </h2>
                <p className="mt-3">
                  DIHK | Deutscher Industrie- und Handelskammertag e.V.
                  <br />
                  Breite Straße 29, 10178 Berlin
                  <br />
                  (0 180) 60 05 85 0
                  <br />
                  <span className="text-xs text-nebel/70">
                    (Festnetzpreis 0,20 EUR / Anruf; Mobilfunkpreise maximal
                    0,60 EUR / Anruf)
                  </span>
                  <br />
                  vr@dihk.de
                  <br />
                  <a
                    href="https://www.vermittlerregister.info"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:opacity-80"
                  >
                    www.vermittlerregister.info
                  </a>
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  5. Beteiligungen
                </h2>
                <p className="mt-3">
                  Der Informationspflichtige hält keine unmittelbaren oder
                  mittelbaren Beteiligungen von mehr als 10 % der
                  Stimmrechte oder des Kapitals an einem
                  Versicherungsunternehmen. Kein Versicherungsunternehmen
                  oder Mutterunternehmen eines Versicherungsunternehmens
                  hält unmittelbare oder mittelbare Beteiligungen von mehr
                  als 10 % der Stimmrechte oder des Kapitals an dem
                  Informationspflichtigen.
                </p>
              </div>

              <div>
                <h2 className="font-display text-lg font-semibold text-white">
                  6. Schlichtungsstellen
                </h2>
                <p className="mt-3">
                  Zur außergerichtlichen Streitbeilegung können folgende
                  Schlichtungsstellen angerufen werden:
                </p>
                <p className="mt-3">
                  Versicherungsombudsmann e.V.
                  <br />
                  Postfach 08 06 32
                  <br />
                  10006 Berlin
                </p>
                <p className="mt-3">
                  Ombudsmann private Kranken- und Pflegeversicherung
                  <br />
                  Postfach 06 02 22
                  <br />
                  10052 Berlin
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
