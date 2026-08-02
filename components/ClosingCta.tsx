import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";

export default function ClosingCta() {
  return (
    <section id="kontakt" className="bg-graphit">
      <div className="mx-auto max-w-content px-6 py-24 text-center">
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          Ihre Absicherung verdient ein klares Gespräch.
        </h2>
        <p className="mt-4 text-nebel">
          Kostenlos, unverbindlich, in 15 Minuten auf den Punkt.
        </p>
        <Link
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-sm bg-gold px-9 py-4 text-base font-semibold text-onyx transition-opacity hover:opacity-90"
        >
          Termin vereinbaren
        </Link>
      </div>
    </section>
  );
}
