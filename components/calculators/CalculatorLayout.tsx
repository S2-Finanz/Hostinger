import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CalculatorLayout({
  title,
  intro,
  disclaimer,
  children,
}: {
  title: string;
  intro: string;
  disclaimer: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 py-20">
            <a
              href="/rechner/"
              className="text-sm text-nebel transition-colors hover:text-white"
            >
              ← Alle Rechner
            </a>
            <h1 className="mt-6 font-display text-3xl font-bold md:text-4xl">
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-nebel">{intro}</p>
          </div>
        </section>

        <section className="bg-graphit">
          <div className="mx-auto max-w-content px-6 py-16">{children}</div>
        </section>

        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 py-16">
            <p className="max-w-2xl text-xs leading-relaxed text-nebel/70">
              {disclaimer}
            </p>

            <div className="mt-10 rounded-sm border border-gold/40 bg-graphit p-10 text-center">
              <h2 className="font-display text-xl font-bold">
                Genaue Zahlen statt Schätzung?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-nebel">
                Im 15-Minuten-Gespräch rechnen wir mit Ihren echten Daten –
                unverbindlich und auf den Punkt.
              </p>
              <Link
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
              >
                Termin vereinbaren
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
