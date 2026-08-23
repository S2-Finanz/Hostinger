const POINTS = [
  {
    title: "Spezialisierte Expertise",
    text: "Fokus auf PKV, Beamtenversorgung, Arbeitskraftabsicherung & Vermögensaufbau. Individuell. Spezialisiert. Maßgeschneidert.",
  },
  {
    title: "Unabhängige Beratung",
    text: "Dem Kunden verpflichtet, nicht den Versicherern.",
  },
  {
    title: "Echter Ansprechpartner",
    text: "Feste Betreuung von Mensch zu Mensch.",
  },
];

export default function TrustBlock() {
  return (
    <section className="bg-creme">
      <div className="mx-auto grid max-w-content gap-12 px-6 py-24 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold text-onyx md:text-4xl">
            Zwei Experten.
            <br />
            Ein Fokus
          </h2>
          <p className="mt-6 text-steingrau">
            Wir machen komplexe Finanz- und Versicherungsthemen einfach. S²
            Finanz steht für die perfekte Kombination aus persönlicher
            Expertise und digitaler Abwicklung.
          </p>
          <p className="mt-4 text-steingrau">
            Unabhängig, transparent und ohne Umwege, entwickelt für Menschen,
            die Verantwortung tragen: im öffentlichen Dienst, als Angestellte
            oder als Unternehmer.
          </p>
        </div>

        <ul className="flex flex-col gap-8">
          {POINTS.map((point) => (
            <li key={point.title} className="flex gap-4">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
              <div>
                <p className="font-semibold text-onyx">{point.title}</p>
                <p className="mt-1 text-sm text-steingrau">{point.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
