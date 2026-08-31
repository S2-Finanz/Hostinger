"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { REVIEWS, type Review } from "@/lib/reviews";

// Volle Breite eines Bewertungssatzes wird in dieser Zeit durchlaufen (wie
// zuvor die 60s-CSS-Animation) – Basis für das automatische Weiterlaufen.
const AUTO_SCROLL_SECONDS_PER_SET = 60;
// Ab dieser Zeigerbewegung (px) gilt die Interaktion als Ziehen statt als
// Klick/Tap, damit "Bewertung anzeigen" weiterhin normal anklickbar bleibt.
const DRAG_THRESHOLD_PX = 4;

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

  const trackRef = useRef<HTMLDivElement>(null);
  // Aktuelle Verschiebung in px; treibende Referenz sowohl für den
  // Auto-Lauf als auch für manuelles Ziehen/Swipen, damit beides nahtlos
  // ineinander übergeht statt zu springen.
  const offsetRef = useRef(0);
  const oneSetWidthRef = useRef(0);
  // Maus-Hover pausiert unabhängig vom Auf-/Zugeklappt-Zustand einer Karte.
  const isHoveredRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const activePointerIdRef = useRef<number | null>(null);

  const normalizeOffset = (value: number) => {
    const setWidth = oneSetWidthRef.current;
    if (!setWidth) return value;
    let v = value % setWidth;
    if (v > 0) v -= setWidth;
    return v;
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      oneSetWidthRef.current = el.scrollWidth / 3;
    };
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);

    let rafId: number;
    let lastTime: number | null = null;

    const tick = (time: number) => {
      if (lastTime === null) lastTime = time;
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const setWidth = oneSetWidthRef.current;
      const isPaused = isHoveredRef.current || isPointerDownRef.current;
      if (!isPaused && setWidth > 0) {
        offsetRef.current = normalizeOffset(
          offsetRef.current - (setWidth / AUTO_SCROLL_SECONDS_PER_SET) * dt,
        );
      }
      el.style.transform = `translateX(${offsetRef.current}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  const handlePointerEnter = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") isHoveredRef.current = true;
  };

  const handlePointerLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") isHoveredRef.current = false;
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    activePointerIdRef.current = e.pointerId;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Manche Browser/Eingabegeräte lehnen das Capture in Randfällen ab –
      // Ziehen funktioniert dank pointermove/-up auf dem Element trotzdem.
    }
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || activePointerIdRef.current !== e.pointerId) return;
    const delta = e.clientX - dragStartXRef.current;
    if (Math.abs(delta) > DRAG_THRESHOLD_PX) hasDraggedRef.current = true;
    if (!hasDraggedRef.current) return;
    offsetRef.current = normalizeOffset(dragStartOffsetRef.current + delta);
  };

  const endPointerInteraction = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== e.pointerId) return;
    isPointerDownRef.current = false;
    activePointerIdRef.current = null;
  };

  // Verhindert, dass ein Ziehen am Ende versehentlich als Klick auf
  // "Bewertung anzeigen" gewertet wird.
  const handleClickCapture = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!hasDraggedRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    hasDraggedRef.current = false;
  };

  return (
    <div className="overflow-hidden py-2">
      <div
        ref={trackRef}
        className="flex w-max cursor-grab touch-pan-y items-start select-none active:cursor-grabbing"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPointerInteraction}
        onPointerCancel={endPointerInteraction}
        onClickCapture={handleClickCapture}
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
