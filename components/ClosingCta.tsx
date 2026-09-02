import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";

export default function ClosingCta() {
  return (
    <section id="kontakt" className="bg-onyx py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="rounded-sm border border-gold/40 bg-onyx p-8 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                Der nächste klare Schritt
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                Gute Beratung beginnt mit einem offenen Gespräch.
              </h2>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-5 md:items-end md:text-right">
              <p className="text-nebel">
                15 Minuten, die Klarheit schaffen.
                <br />
                Kostenlos und unverbindlich.
              </p>
              <Link
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block whitespace-nowrap rounded-sm bg-gold px-9 py-4 text-base font-semibold text-onyx transition-opacity hover:opacity-90"
              >
                Termin vereinbaren
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
