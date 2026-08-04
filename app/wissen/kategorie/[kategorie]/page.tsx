import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtikelKarte from "@/components/wissen/ArtikelKarte";
import { WISSEN_KATEGORIEN, artikelNachKategorie, kategorieLabel } from "@/lib/wissen";

export function generateStaticParams() {
  return WISSEN_KATEGORIEN.map((kategorie) => ({ kategorie: kategorie.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategorie: string }>;
}): Promise<Metadata> {
  const { kategorie } = await params;
  const label = kategorieLabel(kategorie);
  return {
    alternates: { canonical: `/wissen/kategorie/${kategorie}/` },
    title: `${label} – Wissen – S² Finanz`,
    description: `Beiträge aus dem Bereich ${label} von S² Finanz.`,
  };
}

export default async function WissenKategoriePage({
  params,
}: {
  params: Promise<{ kategorie: string }>;
}) {
  const { kategorie: kategorieSlug } = await params;
  const kategorie = WISSEN_KATEGORIEN.find((k) => k.slug === kategorieSlug);
  if (!kategorie) notFound();

  const artikel = artikelNachKategorie(kategorie.slug);

  return (
    <>
      <Header />
      <main>
        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 py-20">
            <p className="text-sm text-nebel">
              <Link href="/wissen/" className="hover:text-white">
                Wissen
              </Link>{" "}
              / {kategorie.label}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              {kategorie.label}
            </h1>
          </div>
        </section>

        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 pb-24">
            {artikel.length === 0 ? (
              <p className="text-nebel">
                In dieser Kategorie sind noch keine Beiträge veröffentlicht.
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
