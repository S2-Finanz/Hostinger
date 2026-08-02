type Review = {
  name: string;
  rating: number;
  text: string;
};

// TODO: weitere echte Google-Bewertungen ergänzen (Name, Sterne, Text)
const REVIEWS: Review[] = [
  {
    name: "Mandantin, Lehrerin",
    rating: 5,
    text: "Kompetent, verständlich und immer in unserem Interesse. So sollte Beratung sein.",
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
    <div className="mx-3 flex w-80 shrink-0 flex-col gap-3 rounded-sm border border-white/10 bg-graphit p-6">
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <span className="text-xs text-nebel/70">Google</span>
      </div>
      <p className="text-sm leading-relaxed text-white">{review.text}</p>
      <p className="text-xs text-nebel">— {review.name}</p>
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
