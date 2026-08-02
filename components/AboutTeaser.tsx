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
            href="/ueber-uns"
            className="mt-8 inline-block rounded-sm border border-gold px-7 py-3.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
          >
            Team kennenlernen
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {TEAM.map((person) => (
            <div
              key={person.name}
              tabIndex={0}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-onyx outline-none"
            >
              {/* TODO: Portraitfoto ersetzen */}
              <div
                className="absolute inset-0 flex items-end p-4"
                role="img"
                aria-label={`Portraitfoto ${person.name}`}
              >
                <span className="font-display text-sm font-semibold text-white">
                  {person.name}
                </span>
              </div>

              <div className="absolute inset-0 flex flex-col justify-center gap-2 bg-onyx/95 p-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100">
                <p className="mb-1 font-display text-sm font-semibold text-gold">
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
