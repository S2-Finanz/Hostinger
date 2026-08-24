"use client";

import { useEffect, useId, useRef, useState } from "react";
import { REVIEWS, type Review } from "@/lib/reviews";

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
