import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";
import GoogleReviews from "@/components/GoogleReviews";

export default function TestimonialCta() {
  return (
    <section className="bg-onyx py-24">
      <div className="mx-auto max-w-content px-6">
        <h2 className="font-display text-2xl font-bold md:text-3xl">
          Was Mandanten sagen
        </h2>
      </div>

      <div className="mt-10">
        <GoogleReviews />
      </div>

      <div className="mx-auto mt-14 max-w-content px-6">
        <div className="mx-auto max-w-md rounded-sm border border-gold/40 bg-graphit p-10 text-center">
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
