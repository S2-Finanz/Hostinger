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

        <div
          className="aspect-[4/5] w-full rounded-sm bg-onyx"
          role="img"
          aria-label="Portraitfoto Marcel Scheuermann und Marcel Schäfer"
        />
      </div>
    </section>
  );
}
