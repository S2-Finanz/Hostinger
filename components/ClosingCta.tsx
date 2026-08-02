import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";

export default function ClosingCta() {
  return (
    <section id="kontakt" className="bg-graphit">
      <div className="mx-auto max-w-content px-6 py-24 text-center">
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          Gute Beratung ist keine Einbahnstraße.
        </h2>
        <p className="mt-4 text-nebel">
          Sie suchen den richtigen Experten, wir suchen Mandanten, denen wir
          echten Mehrwert bieten können. Im Erstgespräch finden wir heraus,
          ob die Voraussetzungen auf beiden Seiten stimmen.
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
