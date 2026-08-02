const TEAM = [
  {
    name: "Marcel Scheuermann",
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
    facts: [
      "5 Jahre Berufserfahrung",
      "Versicherungsfachmann DVA",
      "Ex-Beamter",
      "Spezialist für Beamtenversorgung",
      "Experte für Arbeitskraftabsicherung und Altersvorsorge",
    ],
  },
];

export default function AboutTeaser() {
  return (
    <section id="ueber-uns" className="bg-graphit">
      <div className="mx-auto grid max-w-content items-center gap-12 px-6 py-24 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            16 Jahre Erfahrung. Zwei klare Spezialisierungen.
          </h2>
          <p className="mt-6 text-nebel">
            Marcel Scheuermann ist Experte für private Krankenversicherung
            und Beamtenversorgung. Marcel Schäfer ist spezialisiert auf
            Arbeitskraftabsicherung, Altersvorsorge, Geldanlage und
            Beamtenversorgung. Gemeinsam bringen sie die Tiefe, die komplexe
            Absicherungsfragen verdienen.
          </p>
          <a
            href="/ueber-uns/"
            className="mt-8 inline-block rounded-sm border border-gold px-7 py-3.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
          >
            Team kennenlernen
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TEAM.map((person) => (
            <div
              key={person.name}
              className="flex flex-col overflow-hidden rounded-sm bg-onyx"
            >
              {/* TODO: Portraitfoto ersetzen */}
              <div
                className="relative flex aspect-[3/4] w-full items-center justify-center border-b border-white/10 bg-graphit"
                role="img"
                aria-label={`Portraitfoto ${person.name}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-16 w-16 text-white/25"
                  aria-hidden
                >
                  <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5Zm0 2c-3.34 0-10 1.68-10 5v3h20v-3c0-3.32-6.66-5-10-5Z" />
                </svg>
              </div>

              <div className="flex flex-col gap-2 p-5">
                <p className="font-display text-sm font-semibold text-gold">
                  {person.name}
                </p>
                <ul className="space-y-1.5">
                  {person.facts.map((fact) => (
                    <li key={fact} className="text-xs leading-snug text-nebel">
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
