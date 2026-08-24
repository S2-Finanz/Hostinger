"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const STATS = [
  { value: "19+", label: "Jahre Praxiserfahrung" },
  { value: "2", label: "Spezialisten unter einem Dach" },
  { value: "100%", label: "unabhängige Beratung" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Manche mobilen Browser (v. a. iOS Safari) übernehmen das "muted"-
    // Attribut nach der Hydration nicht zuverlässig genug für Autoplay –
    // Property explizit setzen und Wiedergabe aktiv anstoßen.
    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden bg-onyx">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-drone-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover object-right opacity-45"
        aria-hidden
      >
        <source src="/videos/hero-drone-loop.webm" type="video/webm" />
        <source src="/videos/hero-drone-loop.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(14,18,17,0.93) 0%, rgba(14,18,17,0.74) 50%, rgba(14,18,17,0.16) 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-content px-6 py-28 md:py-36">
        <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Deine Absicherung.
          <br />
          Unser Job.
        </h1>

        <p className="mt-6 max-w-xl text-lg text-nebel">
          19 Jahres Praxiserfahrung. Ein durchdachtes System.
          <br />
          Dein unabhängiger Partner für PKV, Beamtenversorgung,
          Einkommensschutz und Vermögensaufbau, maßgeschneidert für Beamte,
          Angestellte und Geschäftsführer.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/kennenlernen/"
            className="rounded-sm bg-gold px-7 py-3.5 text-center text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
          >
            Jetzt kostenloses Kennenlerngespräch vereinbaren
          </Link>
        </div>

        <dl className="mt-20 grid max-w-2xl grid-cols-3 gap-8 border-t border-white/10 pt-10">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold text-gold md:text-4xl">
                {stat.value}
              </dd>
              <dd className="mt-1 text-sm text-nebel">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
