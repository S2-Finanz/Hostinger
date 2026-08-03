import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CAL_LINK } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: { canonical: "/kunden-login/" },
  title: "Kunden Login – S² Finanz",
  description: "Der Kundenbereich von S² Finanz befindet sich im Aufbau.",
  robots: { index: false, follow: true },
};

export default function KundenLoginPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-onyx">
          <div className="mx-auto flex max-w-content flex-col items-center px-6 py-28 text-center">
            <span className="rounded-sm border border-gold/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold">
              In Vorbereitung
            </span>
            <h1 className="mt-6 font-display text-3xl font-bold md:text-4xl">
              Kunden Login
            </h1>
            <p className="mt-4 max-w-md text-nebel">
              Der Kundenbereich befindet sich aktuell im Aufbau. Hier werden
              Sie sich in Kürze einloggen und Zugriff auf Ihre persönlichen
              Unterlagen und Inhalte erhalten.
            </p>
            <p className="mt-8 text-sm text-nebel">
              Bis dahin erreichen Sie uns wie gewohnt persönlich:
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
        </section>
      </main>
      <Footer />
    </>
  );
}
