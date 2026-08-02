import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";

const SERVICES = [
  {
    title: "Private Krankenversicherung",
    text: "Optimaler Versicherungsschutz für Angestellte und Beamte – individuell kalkuliert, lebenslang tragfähig.",
  },
  {
    title: "Beamtenversorgung",
    text: "Pension, Beihilfe und Dienstunfähigkeit im Zusammenspiel – speziell für den öffentlichen Dienst.",
  },
  {
    title: "Arbeitskraftabsicherung",
    text: "Schutz Ihres Einkommens, wenn Sie es am dringendsten brauchen – für Angestellte und Geschäftsführer.",
  },
  {
    title: "Altersvorsorge & Geldanlage",
    text: "Vermögen strukturiert aufbauen und Ihre Zukunft finanziell absichern.",
  },
];

export default function ServicesGrid() {
  return (
    <section id="leistungen" className="bg-onyx">
      <div className="mx-auto max-w-content px-6 py-24">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Unsere Leistungen
          </h2>
          <p className="mt-4 text-nebel">
            Vier Themen. Eine Beratung, die zusammendenkt, was
            zusammengehört.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <div key={service.title} className="flex flex-col bg-onyx p-8">
              <h3 className="font-display text-lg font-semibold">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-nebel">
                {service.text}
              </p>
              <a
                href="#kontakt"
                className="mt-6 text-sm font-semibold text-gold hover:opacity-80"
              >
                Mehr erfahren →
              </a>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
          >
            Passende Lösung besprechen
          </Link>
        </div>
      </div>
    </section>
  );
}
