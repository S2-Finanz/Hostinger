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

export default function AboutTeaser() {
  return (
    <section id="ueber-uns" className="bg-creme">
      <div className="mx-auto grid max-w-content items-center gap-12 px-6 py-24 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold text-onyx md:text-4xl">
            19 Jahre Erfahrung. Zwei klare Spezialisierungen.
          </h2>
          <p className="mt-6 text-steingrau">
            Marcel Scheuermann ist Experte für private Krankenversicherung
            und Beamtenversorgung. Marcel Schäfer ist spezialisiert auf
            Arbeitskraftabsicherung, Altersvorsorge, Geldanlage und
            Beamtenversorgung. Gemeinsam bringen sie die Tiefe, die komplexe
            Absicherungsfragen verdienen.
          </p>
          <a
            href="/ueber-uns/"
            className="mt-8 inline-block rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
          >
            Team kennenlernen
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TEAM.map((person) => (
            <div
              key={person.name}
              className="flex flex-col overflow-hidden rounded-sm border border-stein/60 bg-hellcreme"
            >
              {person.photo ? (
                <div className="relative aspect-[3/4] w-full bg-stein/40">
                  <Image
                    src={person.photo}
                    alt={`Portraitfoto ${person.name}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                </div>
              ) : (
                <div
                  className="relative flex aspect-[3/4] w-full items-center justify-center bg-stein/40"
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

              <div className="flex flex-col gap-2 border-l-4 border-gold p-5">
                <p className="font-display text-sm font-semibold text-onyx">
                  {person.name}
                </p>
                <ul className="space-y-1.5">
                  {person.facts.map((fact) => (
                    <li
                      key={fact}
                      className="text-xs leading-snug text-steingrau"
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
  );
}
