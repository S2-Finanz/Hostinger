import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";

export default function TestimonialCta() {
  return (
    <section className="bg-onyx">
      <div className="mx-auto grid max-w-content items-center gap-12 px-6 py-24 md:grid-cols-2">
        <blockquote>
          <p className="font-display text-2xl leading-snug md:text-3xl">
            „Kompetent, verständlich und immer in unserem Interesse. So
            sollte Beratung sein.&rdquo;
          </p>
          <footer className="mt-6 text-sm text-nebel">
            — Mandantin, Lehrerin
          </footer>
        </blockquote>

        <div className="rounded-sm border border-gold/40 bg-graphit p-10">
          <h3 className="font-display text-xl font-bold">
            Kostenloses Orientierungsgespräch
          </h3>
          <p className="mt-4 text-sm text-nebel">
            15 Minuten, die Klarheit schaffen. Wir zeigen Ihnen, wo Sie
            stehen – unverbindlich und auf den Punkt.
          </p>
          <Link
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
          >
            Jetzt Termin sichern
          </Link>
        </div>
      </div>
    </section>
  );
}
