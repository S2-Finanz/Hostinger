type Review = {
  name: string;
  rating: number;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Mandantin, Lehrerin",
    rating: 5,
    text: "Kompetent, verständlich und immer in unserem Interesse. So sollte Beratung sein.",
  },
  {
    name: "Angela Schwarz",
    rating: 5,
    text: "Marcel Scheuermann ist ein äußerst kompetenter Versicherungsmakler, der mit Wissen, Innovation und Zuverlässigkeit überzeugt. Anliegen werden von ihm immer sehr zeitnah und abschließend bearbeitet. Er betreut uns mittlerweile so viele Jahre, wir möchten nicht mehr auf seine Kompetenz verzichten und genießen die Vorzüge der rundum Betreuung. Absolute Weiterempfehlung!",
  },
  {
    name: "Michael Jung",
    rating: 5,
    text: "Marcel ist ein Profi was das Thema Steuern zu Vermögen machen angeht. Durch seine Tipps konnte ich meine Steuerlast in Vermögen umwandeln. Er erklärt die Dinge so verständlich, dass auch ein absoluter Laie genau durchblickt warum was zu tun ist. Seine Beratung ist fair und transparent. Ich setze mich nach wie vor in regelmäßigen Abständen mit Marcel zusammen und kann ihn nur wärmstens empfehlen!",
  },
  {
    name: "J. S.",
    rating: 5,
    text: "Marcel berät engagiert, verständlich, ehrlich und kompetent. Auch als Laie kann man der Beratung folgen. Für jede Nachfrage gibt es die passende Antwort.",
  },
  {
    name: "Nils Spitlbauer",
    rating: 5,
    text: "Fantastische Beratung! Marcel Scheuermann betreut mich und meine Frau nun seit einigen Jahren. Egal um welches Thema es geht, er ist immer erreichbar. Die Beratungen sind immer ausführlich, ehrlich und der Lebenssituation angepasst. Als unser Sohn zur Welt kam, standen wir als Eltern vor einer großen Bürokratiehürde. Mit ihm haben wir es ohne Probleme geschafft auch alle Versicherungen, etc. für den kleinen Mann passend anzulegen. Selbst Fragen außerhalb seines Arbeitsgebietes sind für ihn kein Problem. Wir freuen uns so einen kompetenten und vertrauensvollen Berater an unserer Seite zu haben. 5 Sterne reichen hier bei weitem nicht aus!",
  },
  {
    name: "Se Yu",
    rating: 5,
    text: "Marcel arbeitet sehr strukturiert und übersichtlich für seine Kunden. Während unserer Beratung hat er Schritt für Schritt alles erklärt in einer Sprache, die jeder versteht. Ansonsten bekommt man von Finanzberater irgendwelche Fachbegriffe rumgeworfen. Er kennt sich mit den Gesetzen aus und ist immer up-to-date somit kann er auf jede Bedürfnisse eingehen und findet mehrere Optionen die er mit seinen Kunden bespricht und transparent macht. Der Kunde steht im Fokus und das spürt man! Er arbeitet mit Leidenschaft! Vielen Dank Marcel!",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-gold" : "text-white/15"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="mx-3 flex h-64 w-80 shrink-0 flex-col gap-3 rounded-sm border border-white/10 bg-graphit p-6">
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <span className="text-xs text-nebel/70">Google</span>
      </div>
      <p className="line-clamp-6 text-sm leading-relaxed text-white">
        {review.text}
      </p>
      <p className="mt-auto text-xs text-nebel">— {review.name}</p>
    </div>
  );
}

export default function GoogleReviews() {
  const track = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <div className="overflow-hidden py-2">
      <div className="flex w-max animate-scroll-x hover:[animation-play-state:paused]">
        {track.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}
