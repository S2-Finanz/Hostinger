import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";

const STATS = [
  { value: "16+", label: "Jahre Praxiserfahrung" },
  { value: "2", label: "Spezialisten unter einem Dach" },
  { value: "100%", label: "unabhängige Beratung" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-onyx">
      <video
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
            "radial-gradient(circle at 80% 20%, rgba(200,162,101,0.12), transparent 45%), linear-gradient(90deg, #0E1211 0%, rgba(14,18,17,0.9) 32%, rgba(14,18,17,0.4) 100%), linear-gradient(180deg, #0E1211 0%, rgba(23,27,26,0.9) 60%, #0E1211 100%)",
          opacity: 0.85,
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-content px-6 py-28 md:py-36">
        <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Ihre Absicherung.
          <br />
          Unsere Verantwortung.
        </h1>

        <p className="mt-6 max-w-xl text-lg text-nebel">
          Unabhängige Beratung für private Krankenversicherung,
          Beamtenversorgung, Arbeitskraftabsicherung und Vermögensaufbau –
          für Beamte, Angestellte und Geschäftsführer.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-gold px-7 py-3.5 text-center text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
          >
            Termin vereinbaren
          </Link>
          <Link
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-gold px-7 py-3.5 text-center text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
          >
            Versorgungslücke im 15-Minuten-Check klären
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
