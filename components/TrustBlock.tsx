const POINTS = [
  {
    title: "Spezialisierte Expertise",
    text: "PKV, Beamtenversorgung, Arbeitskraftabsicherung, Altersvorsorge",
  },
  {
    title: "Unabhängige Beratung",
    text: "ohne Bindung an einen einzelnen Anbieter",
  },
  {
    title: "Transparente Vergütung",
    text: "klar offengelegt, keine versteckten Kosten",
  },
  {
    title: "Persönliche Betreuung",
    text: "ein fester Ansprechpartner, kein Callcenter",
  },
];

export default function TrustBlock() {
  return (
    <section className="bg-graphit">
      <div className="mx-auto grid max-w-content gap-12 px-6 py-24 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Zwei Experten. Ein klarer Fokus.
          </h2>
          <p className="mt-6 text-nebel">
            S² Finanz ist ein hochspezialisiertes Maklerhaus für private
            Krankenversicherung, Beamtenversorgung und Absicherung der
            Arbeitskraft. Wir beraten unabhängig, transparent und auf
            Augenhöhe – für Menschen, die Verantwortung tragen: im
            öffentlichen Dienst, als Angestellte oder als Unternehmer.
          </p>
        </div>

        <ul className="flex flex-col gap-8">
          {POINTS.map((point) => (
            <li key={point.title} className="flex gap-4">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
              <div>
                <p className="font-semibold text-white">{point.title}</p>
                <p className="mt-1 text-sm text-nebel">{point.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
