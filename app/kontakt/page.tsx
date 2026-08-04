import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KontaktFormular from "@/components/kontakt/KontaktFormular";

export const metadata: Metadata = {
  alternates: { canonical: "/kontakt/" },
  title: "Kontakt – S² Finanz",
  description:
    "Schreiben Sie uns zu privater Krankenversicherung, Arbeitskraftabsicherung, Beamtenversorgung, Altersvorsorge oder für eine allgemeine Versicherungsanalyse.",
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 py-20">
            <h1 className="font-display text-3xl font-bold md:text-4xl">Kontakt</h1>
            <p className="mt-4 max-w-xl text-nebel">
              Schreiben Sie uns – wir melden uns innerhalb von 24 Stunden bei Ihnen. Für ein
              persönliches Gespräch können Sie auch direkt einen Termin vereinbaren.
            </p>
          </div>
        </section>

        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 pb-24">
            <div className="max-w-2xl">
              <KontaktFormular />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
