"use client";

import { useEffect, useId, useRef, useState } from "react";

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
  {
    name: "Dilara",
    rating: 5,
    text: "Dieses Jahr habe ich auf der Didacta Marcel Scheuermann kennengelernt und bin dort direkt in seine Beratung gekommen. Er hat mich auf der Messe sehr sympathisch, offen und kompetent beraten, sodass ich direkt ein gutes Gefühl hatte. Auch im weiteren Verlauf der Beratung im Lehrer-Beratungszentrum hat sich dieser Eindruck absolut bestätigt. Die Gespräche waren durchweg freundlich, verständlich und nie aufdringlich. Man nimmt sich Zeit für Fragen und erklärt alles so, dass man es wirklich gut nachvollziehen kann. Genau deshalb habe ich mich entschieden, meine Versicherungen dort abzuschließen.",
  },
  {
    name: "Jennifer Barroso Sobrado",
    rating: 5,
    text: "Mein Partner und ich fühlen uns sehr gut beraten. Der liebe Marcel ist sehr kompetent und freundlich! Alleine hätten wir uns nicht durch den ganzen Versicherungskram gequält. So war alles perfekt auf unsere Bedürfnisse und Anliegen abgestimmt und direkt eingegrenzt, ohne Druck und Stress. Vielen Dank dafür!",
  },
  {
    name: "Lea Geffers",
    rating: 5,
    text: "Ich wurde vor meinem Start ins Ref mit Empathie, Geduld und Zeit vom Mitarbeiter Marcel Schäfer beraten. Marcel schafft schon bei der ersten Kontaktaufnahme eine entspannte Atmosphäre, bleibt gleichzeitig aber immer professionell und kompetent. Ich habe mich in allen Belangen (bei mir besonders das Thema Versicherungen) exzellent beraten gefühlt und kann Marcel nur wärmstens empfehlen.",
  },
  {
    name: "Lea Gommel",
    rating: 5,
    text: "Ich bin momentan sehr zufrieden mit der Beratung durch Marcel Scheuermann. Gerade im Hinblick auf meinen Start ins Referendariat habe ich mich bestens informiert und unterstützt gefühlt. Ich kann die Beratung wirklich jedem empfehlen, der vor dem Referendariat steht oder Unterstützung bei Versicherungsfragen braucht.",
  },
  {
    name: "Lynn",
    rating: 5,
    text: "Das Beratungsgespräch bei Marcel Schäfer war wirklich super aufschlussreich. Er hat mir so viele offene Fragen beantwortet und ist auch wirklich transparent mit den ganzen Themen umgegangen und das Gespräch war super nett und kompetent. Auch, wenn ich schon fast am Ende des Refs bin, hat es mir nochmal sehr geholfen! Danke!",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-gold" : "text-onyx/15"}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  isExpanded,
  onToggle,
}: {
  review: Review;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const reactId = useId();
  const textId = `review-text-${reactId}`;

  useEffect(() => {
    // Nur im eingeklappten Zustand messen: mit entferntem line-clamp ist
    // scrollHeight === clientHeight, was den Button sonst fälschlich
    // verschwinden lassen würde, sobald aufgeklappt wurde.
    if (isExpanded) return;
    const el = textRef.current;
    if (!el) return;
    const check = () => setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [isExpanded, review.text]);

  return (
    <div
      className={`mx-3 flex w-80 shrink-0 flex-col gap-3 rounded-sm border border-stein/60 bg-testimonial-card p-6 ${
        isExpanded ? "h-auto" : "h-64"
      }`}
    >
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <span className="text-xs text-steingrau/70">Google</span>
      </div>

      <div className="relative">
        <p
          id={textId}
          ref={textRef}
          className={`text-sm leading-relaxed text-onyx ${
            isExpanded ? "" : "line-clamp-6"
          }`}
        >
          {review.text}
        </p>
        {!isExpanded && isTruncated && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-testimonial-card to-transparent"
            aria-hidden
          />
        )}
      </div>

      {isTruncated && (
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={textId}
          onClick={onToggle}
          className="text-left text-xs font-semibold text-gold hover:underline"
        >
          {isExpanded ? "Bewertung wieder einklappen" : "Bewertung vollständig anzeigen"}
        </button>
      )}

      <p className="mt-auto text-xs text-steingrau">— {review.name}</p>
    </div>
  );
}

export default function GoogleReviews() {
  const track = [...REVIEWS, ...REVIEWS, ...REVIEWS];
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="overflow-hidden py-2">
      <div
        className="flex w-max items-start animate-scroll-x hover:[animation-play-state:paused]"
        style={expandedIds.size > 0 ? { animationPlayState: "paused" } : undefined}
      >
        {track.map((review, i) => {
          const id = `${review.name}-${i}`;
          return (
            <ReviewCard
              key={id}
              review={review}
              isExpanded={expandedIds.has(id)}
              onToggle={() => toggle(id)}
            />
          );
        })}
      </div>
    </div>
  );
}
