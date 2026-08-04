import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtikelKarte from "@/components/wissen/ArtikelKarte";
import { WISSEN_KATEGORIEN, alleArtikel } from "@/lib/wissen";

export const metadata: Metadata = {
  alternates: { canonical: "/wissen/" },
  title: "Wissen – S² Finanz",
  description:
    "Beiträge zu privater Krankenversicherung, Altersvorsorge, Beamtenversorgung, Versicherungen allgemein, Geldanlage und Immobilien.",
};

export default function WissenPage() {
  const artikel = alleArtikel();

  return (
    <>
      <Header />
      <main>
        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 py-20">
            <h1 className="font-display text-3xl font-bold md:text-4xl">Wissen</h1>
            <p className="mt-4 max-w-xl text-nebel">
              Fundiertes Wissen zu privater Krankenversicherung, Altersvorsorge,
              Beamtenversorgung, Versicherungen allgemein, Geldanlage und Immobilien.
            </p>
          </div>
        </section>

        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 pb-16">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
              {WISSEN_KATEGORIEN.map((kategorie) => (
                <Link
                  key={kategorie.slug}
                  href={`/wissen/kategorie/${kategorie.slug}/`}
                  className="rounded-sm border border-white/10 bg-graphit p-4 text-center text-sm font-semibold text-white transition-colors hover:border-gold/40"
                >
                  {kategorie.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 pb-24">
            {artikel.length === 0 ? (
              <p className="text-nebel">
                Hier entstehen in Kürze die ersten Beiträge. Schauen Sie bald wieder
                vorbei.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {artikel.map((eintrag) => (
                  <ArtikelKarte key={eintrag.slug} artikel={eintrag} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
