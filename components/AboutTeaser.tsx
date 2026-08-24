import Image from "next/image";

const TEAM: {
  name: string;
  photo: string | null;
  facts: string[];
}[] = [
  {
    name: "Marcel Scheuermann",
    photo: "/images/team/marcel-scheuermann.jpg",
    facts: [
      "19 Jahre Berufserfahrung in der Finanzbranche",
      "Bankkaufmann IHK",
      "Kaufmann f. Versicherungen und Finanzen IHK",
      "Spezialist für private Krankenversicherung für Angestellte und Geschäftsführer",
      "Beamtenversorgung",
      "Experte für steueroptimierte Vorsorge",
    ],
  },
  {
    name: "Marcel Schäfer",
    photo: "/images/team/marcel-schaefer.jpg",
    facts: [
      "5 Jahre Berufserfahrung",
      "Versicherungsfachmann IHK",
      "Ex-Beamter",
      "Spezialist für Beamtenversorgung",
      "Spezialist für private Krankenversicherung",
      "Experte für Arbeitskraftabsicherung und Altersvorsorge",
    ],
  },
];

const SPECIALIZATION_LABEL =
  "PKV – Beamtenversorgung – Vorsorge – Arbeitskraft";

export default function AboutTeaser() {
  return (
    <section
      id="ueber-uns"
      className="bg-[#F1EADF] py-[104px] max-[899px]:py-16 max-[640px]:py-12"
    >
      <div className="mx-auto box-border max-w-[1180px] px-6 max-[640px]:px-5">
        <div className="grid grid-cols-[minmax(0,660px)_minmax(0,440px)] items-end gap-x-20 max-[899px]:grid-cols-1 max-[899px]:items-start max-[899px]:gap-y-6">
          <div className="min-w-0">
            <p className="mb-[18px] font-sans text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#C8A265]">
              Persönlich statt anonym
            </p>
            <h2
              className="font-sans font-bold text-[#171B1A]"
              style={{
                fontSize: "clamp(42px, 4vw, 51.32px)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
              }}
            >
              <span className="block whitespace-normal min-[1200px]:whitespace-nowrap">
                Kompetenz bekommt ein
              </span>
              <span className="block">Gesicht.</span>
            </h2>
          </div>

          <div className="min-w-0">
            <p className="max-w-[440px] font-sans text-base font-normal leading-[1.65] text-[#626B68]">
              Echte Berater, klare Spezialisierung und feste Ansprechpartner
              über die gesamte Zusammenarbeit.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-[22px] max-[899px]:grid-cols-1">
          {TEAM.map((person) => (
            <div
              key={person.name}
              className="box-border grid min-h-[410px] min-w-0 grid-cols-[minmax(0,41.85%)_minmax(0,58.15%)] border border-[rgba(23,27,26,0.14)] bg-[#FFFAF1] max-[640px]:grid-cols-1"
            >
              {person.photo ? (
                <div className="relative min-w-0 max-[640px]:aspect-[4/3]">
                  <Image
                    src={person.photo}
                    alt={`Portraitfoto ${person.name}`}
                    fill
                    className="block object-cover object-center"
                    sizes="(min-width: 640px) 25vw, 100vw"
                  />
                </div>
              ) : (
                <div
                  className="relative flex min-w-0 items-center justify-center bg-stein/40 max-[640px]:aspect-[4/3]"
                  role="img"
                  aria-label={`Portraitfoto ${person.name}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-16 w-16 text-onyx/20"
                    aria-hidden
                  >
                    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5Zm0 2c-3.34 0-10 1.68-10 5v3h20v-3c0-3.32-6.66-5-10-5Z" />
                  </svg>
                </div>
              )}

              <div className="box-border flex min-w-0 flex-col border-l-[8px] border-l-[#D2B37A] px-9 py-8 max-[640px]:border-l-0 max-[640px]:border-t-[8px] max-[640px]:border-t-[#D2B37A] max-[640px]:p-6">
                <p className="mb-5 font-sans text-[11px] font-extrabold uppercase leading-[1.45] tracking-[0.12em] text-[#886C3C]">
                  {SPECIALIZATION_LABEL}
                </p>
                <p
                  className="font-sans font-bold text-[#171B1A]"
                  style={{ fontSize: "28px", lineHeight: 1.12 }}
                >
                  {person.name}
                </p>
                <ul className="mt-4 space-y-2">
                  {person.facts.map((fact) => (
                    <li
                      key={fact}
                      className="flex gap-2 font-sans text-sm leading-[1.45] text-[#626B68]"
                    >
                      <span
                        className="mt-[5px] h-1.5 w-1.5 shrink-0 bg-[#C8A265]"
                        aria-hidden
                      />
                      <span className="min-w-0 break-words">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="/ueber-uns/"
            className="inline-block rounded-sm bg-[#C8A265] px-8 py-4 text-sm font-semibold text-[#171B1A] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171B1A]"
          >
            Team kennenlernen
          </a>
        </div>
      </div>
    </section>
  );
}
