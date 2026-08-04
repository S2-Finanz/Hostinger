import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mdxComponents } from "@/components/wissen/MdxComponents";
import { SITE_URL } from "@/lib/constants";
import { alleArtikel, artikelInhalt, kategorieLabel } from "@/lib/wissen";

export function generateStaticParams() {
  return alleArtikel().map((artikel) => ({ slug: artikel.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const eintrag = artikelInhalt(slug);
  if (!eintrag) return {};

  return {
    alternates: { canonical: `/wissen/${slug}/` },
    title: `${eintrag.meta.title} – S² Finanz`,
    description: eintrag.meta.description,
    openGraph: {
      title: eintrag.meta.title,
      description: eintrag.meta.description,
      type: "article",
      publishedTime: eintrag.meta.date,
    },
  };
}

export default async function WissenArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const eintrag = artikelInhalt(slug);
  if (!eintrag) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: eintrag.meta.title,
    description: eintrag.meta.description,
    datePublished: eintrag.meta.date,
    author: {
      "@type": "Organization",
      name: "S² Finanz",
    },
    publisher: {
      "@type": "Organization",
      name: "S² Finanz",
    },
    mainEntityOfPage: `${SITE_URL}/wissen/${slug}/`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <section className="bg-onyx">
          <div className="mx-auto max-w-2xl px-6 py-20">
            <p className="text-sm text-nebel">
              <Link href="/wissen/" className="hover:text-white">
                Wissen
              </Link>{" "}
              /{" "}
              <Link
                href={`/wissen/kategorie/${eintrag.meta.category}/`}
                className="hover:text-white"
              >
                {kategorieLabel(eintrag.meta.category)}
              </Link>
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              {eintrag.meta.title}
            </h1>
            <p className="mt-4 text-sm text-nebel">
              {new Date(eintrag.meta.date).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}{" "}
              · {eintrag.meta.lesezeitMinuten} Min. Lesezeit
            </p>
          </div>
        </section>

        <section className="bg-onyx">
          <div className="mx-auto max-w-2xl px-6 pb-24">
            <MDXRemote source={eintrag.content} components={mdxComponents} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
