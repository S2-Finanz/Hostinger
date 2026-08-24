import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";

const SERVICES = [
  {
    title: "Private Krankenversicherung",
    text: "Premium-Gesundheitsversorgung ohne Tarif-Dschungel. Exakt kalkuliert, bedarfsgerecht und nachhaltig bezahlbar.",
    calculatorLabel: "GKV-PKV-Vergleichsrechner",
    calculatorHref: "/rechner/pkv-rechner/",
  },
  {
    title: "Beamtenversorgung",
    text: "Beihilfe. Pension. Dienstunfähigkeit. Perfekt aufeinander abgestimmt, maßgeschneiderter Schutz für Anwärter, Beamte auf Probe und Beamte auf Lebenszeit.",
    calculatorLabel: "Pensionsrechner",
    calculatorHref: "/rechner/pensionsrechner/",
  },
  {
    title: "Arbeitskraftabsicherung",
    text: "Dein Einkommen ist dein größter Hebel. Wir sichern deine finanzielle Existenz und deinen Lebensstandard langfristig.",
    calculatorLabel: "Arbeitskraftrechner",
    calculatorHref: "/rechner/arbeitskraftrechner/",
  },
  {
    title: "Altersvorsorge & Vermögensaufbau",
    text: "Planmäßiger Vermögensaufbau, klug strukturiert. Systematisch, ertragsstark auf deine Zukunft ausgelegt.",
    calculatorLabel: "Sparrechner",
    calculatorHref: "/rechner/sparrechner/",
  },
];

export default function ServicesGrid() {
  return (
    <section id="leistungen" className="bg-creme">
      <div className="mx-auto max-w-content px-6 py-24">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-bold text-onyx md:text-4xl">
            Unsere Leistungen
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-stein sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="flex flex-col bg-hellcreme p-8"
            >
              <h3 className="font-sans text-[20px] font-bold leading-[1.35] text-onyx">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-steingrau">
                {service.text}
              </p>
              <a
                href="#kontakt"
                className="mt-6 text-sm font-semibold text-onyx transition-colors hover:text-gold"
              >
                Mehr erfahren →
              </a>
              <Link
                href={service.calculatorHref}
                className="mt-2 text-sm font-semibold text-steingrau transition-colors hover:text-gold"
              >
                {service.calculatorLabel} →
              </Link>
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
