import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CAL_LINK } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: { canonical: "/ueber-uns/" },
  title: "Über uns – Marcel Scheuermann & Marcel Schäfer | S² Finanz",
  description:
    "S² Finanz ist ein spezialisierter Digitalmakler für PKV, Beamtenversorgung, Arbeitskraftabsicherung und Altersvorsorge. Lernen Sie Marcel Scheuermann und Marcel Schäfer kennen.",
};

const TEAM: {
  name: string;
  rolle: string;
  photo: string | null;
  facts: string[];
}[] = [
  {
    name: "Marcel Scheuermann",
    rolle: "Gründer & Spezialist für PKV und Beamtenversorgung",
    photo: "/images/team/marcel-scheuermann.jpg",
    facts: [
      "19 Jahre Berufserfahrung in der Finanzbranche",
      "Bankkaufmann IHK",
      "Kaufmann für Versicherungen und Finanzen IHK",
      "Spezialist für private Krankenversicherung für Angestellte und Geschäftsführer",
      "Beamtenversorgung",
      "Experte für steueroptimierte Vorsorge",
    ],
  },
  {
    name: "Marcel Schäfer",
    rolle: "Gründer & Spezialist für Arbeitskraftabsicherung und Altersvorsorge",
    photo: "/images/team/marcel-schaefer.jpg",
    facts: [
      "5 Jahre Berufserfahrung",
      "Versicherungsfachmann DVA",
      "Ex-Beamter",
      "Spezialist für Beamtenversorgung",
      "Experte für Arbeitskraftabsicherung und Altersvorsorge",
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: TEAM.map((person) => ({
    "@type": "Person",
    name: person.name,
    jobTitle: person.rolle,
    worksFor: {
      "@type": "Organization",
      name: "S² Finanz",
    },
  })),
};

export default function UeberUnsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 py-20">
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              Über uns
            </h1>
            <p className="mt-4 max-w-xl text-nebel">
              16 Jahre Erfahrung, zwei klare Spezialisierungen. Wir sind S²
              Finanz – ein spezialisierter Digitalmakler für private
              Krankenversicherung, Beamtenversorgung, Arbeitskraftabsicherung
              und Altersvorsorge.
            </p>
          </div>
        </section>

        <section className="bg-creme">
          <div className="mx-auto max-w-content px-6 py-16">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              {TEAM.map((person) => (
                <div
                  key={person.name}
                  className="flex flex-col overflow-hidden rounded-sm bg-onyx"
                >
                  {person.photo ? (
                    <div className="relative aspect-[3/4] w-full border-b border-white/10 bg-graphit">
                      <Image
                        src={person.photo}
                        alt={`Portraitfoto ${person.name}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 640px) 50vw, 100vw"
                        priority
                      />
                    </div>
                  ) : (
                    <div
                      className="relative flex aspect-[3/4] w-full items-center justify-center border-b border-white/10 bg-graphit"
                      role="img"
                      aria-label={`Portraitfoto ${person.name}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-20 w-20 text-white/25"
                        aria-hidden
                      >
                        <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5Zm0 2c-3.34 0-10 1.68-10 5v3h20v-3c0-3.32-6.66-5-10-5Z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex flex-col gap-3 p-7">
                    <div>
                      <p className="font-display text-lg font-semibold text-white">
                        {person.name}
                      </p>
                      <p className="mt-1 text-sm text-gold">{person.rolle}</p>
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {person.facts.map((fact) => (
                        <li
                          key={fact}
                          className="text-sm leading-snug text-nebel"
                        >
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 py-16">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Warum S² Finanz?
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div>
                <p className="font-semibold text-white">
                  Unabhängige Beratung
                </p>
                <p className="mt-2 text-sm text-nebel">
                  Wir sind an keinen einzelnen Anbieter gebunden und wählen
                  für jede Situation die passende Lösung aus dem gesamten
                  Marktangebot.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">
                  Spezialisierte Tiefe statt Generalistentum
                </p>
                <p className="mt-2 text-sm text-nebel">
                  Zwei Experten, zwei klare Schwerpunkte – PKV &
                  Beamtenversorgung sowie Arbeitskraftabsicherung &
                  Altersvorsorge. Gemeinsam decken wir die Themen ab, die für
                  Beamte, Angestellte und Geschäftsführer wirklich zählen.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white">
                  Ein fester Ansprechpartner
                </p>
                <p className="mt-2 text-sm text-nebel">
                  Kein Callcenter, keine wechselnden Kontakte – Sie sprechen
                  von der ersten Analyse bis zur laufenden Betreuung mit
                  derselben Person.
                </p>
              </div>
            </div>

            <div className="mt-14 rounded-sm border border-gold/40 bg-graphit p-10 text-center">
              <h3 className="font-display text-xl font-bold">
                Lernen Sie uns im Gespräch kennen
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-nebel">
                Im 15-minütigen Erstgespräch finden wir gemeinsam heraus, ob
                wir zueinander passen – unverbindlich und auf den Punkt.
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
