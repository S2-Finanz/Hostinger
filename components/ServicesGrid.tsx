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
    <section id="leistungen" className="bg-[#F1EADF]">
      <div className="mx-auto max-w-[1180px] px-6 py-16 md:py-[104px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="block text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#C8A265]">
              Was wir für dich lösen
            </span>
            <h2 className="mt-2 font-sans text-[clamp(2rem,1.5rem+2.5vw,51px)] font-bold leading-[1.08] tracking-[-0.035em] text-[#171B1A]">
              Unsere Leistungen
            </h2>
          </div>
          <p className="max-w-[440px] text-base leading-[1.65] text-[#626B68]">
            Vier Themenfelder, eine klare Strategie. Ohne Tarif-Dschungel und
            ohne unnötige Komplexität.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className="box-border flex h-full min-h-[370px] min-w-0 flex-col rounded-sm border border-[rgba(23,27,26,0.14)] bg-[#FBF8F2] p-7"
            >
              <span className="text-[12px] font-bold tracking-[0.12em] text-[#C8A265]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 min-w-0 max-w-full text-[20px] font-bold leading-[1.25] text-[#171B1A] [overflow-wrap:anywhere] hyphens-auto">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-[1.65] text-[#626B68]">
                {service.text}
              </p>
              <div className="mt-auto flex flex-col gap-2 pt-6">
                <a
                  href="#kontakt"
                  className="min-w-0 max-w-full text-[13px] font-extrabold text-[#886C3C] [overflow-wrap:anywhere] transition-opacity hover:opacity-80"
                >
                  Mehr erfahren →
                </a>
                <Link
                  href={service.calculatorHref}
                  className="min-w-0 max-w-full text-[13px] font-extrabold text-[#886C3C] [overflow-wrap:anywhere] transition-opacity hover:opacity-80"
                >
                  {service.calculatorLabel} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:mt-14">
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
