import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Rechner – S² Finanz",
  description:
    "Schnellrechner für Vorsorge, Absicherung und Vermögensaufbau – von PKV bis Baufinanzierung.",
};

const VORSORGE = [
  {
    title: "PKV Schnellrechner",
    text: "Erste Einordnung zu Ihrer privaten Krankenversicherung.",
    href: "/rechner/pkv-rechner/",
  },
  {
    title: "Pensionsrechner",
    text: "Ruhegehaltssatz und voraussichtliche Pension als Beamter.",
    href: "/rechner/pensionsrechner/",
  },
  {
    title: "Rentenlückenrechner",
    text: "Wunsch-Einkommen im Ruhestand vs. erwartete Rente.",
    href: "/rechner/rentenluecke/",
  },
  {
    title: "Arbeitskraftrechner",
    text: "Empfohlene Höhe Ihrer Arbeitskraftabsicherung.",
    href: "/rechner/arbeitskraftrechner/",
  },
];

const VERMOEGEN = [
  {
    title: "Sparrechner",
    text: "Entwicklung von Startkapital und Sparrate über die Zeit.",
    href: "/rechner/sparrechner/",
  },
  {
    title: "ETF-Sparplanrechner",
    text: "Sparplan-Entwicklung inklusive laufender Kosten.",
    href: "/rechner/etf-sparplanrechner/",
  },
  {
    title: "Tagesgeldrechner",
    text: "Zinsertrag Ihres Tagesgeldkontos.",
    href: "/rechner/tagesgeldrechner/",
  },
  {
    title: "Entnahmerechner",
    text: "Wie lange reicht Ihr Kapital bei regelmäßiger Entnahme?",
    href: "/rechner/entnahmerechner/",
  },
  {
    title: "Inflationsrechner",
    text: "Kaufkraftverlust Ihres Vermögens durch Inflation.",
    href: "/rechner/inflationsrechner/",
  },
];

const FINANZIERUNG = [
  {
    title: "Kreditrechner",
    text: "Monatliche Rate und Zinskosten eines Kredits.",
    href: "/rechner/kreditrechner/",
  },
  {
    title: "Baufinanzierungsrechner",
    text: "Monatsrate und Restschuld Ihrer Immobilienfinanzierung.",
    href: "/rechner/baufinanzierungsrechner/",
  },
];

function CalculatorGrid({
  items,
}: {
  items: { title: string; text: string; href: string }[];
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2">
      {items.map((calc) => (
        <a
          key={calc.href}
          href={calc.href}
          className="flex flex-col bg-graphit p-8 transition-colors hover:bg-onyx"
        >
          <h3 className="font-display text-lg font-semibold">{calc.title}</h3>
          <p className="mt-3 flex-1 text-sm text-nebel">{calc.text}</p>
          <span className="mt-6 text-sm font-semibold text-gold">
            Rechner öffnen →
          </span>
        </a>
      ))}
    </div>
  );
}

export default function RechnerOverviewPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 py-20">
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              Rechner
            </h1>
            <p className="mt-4 max-w-xl text-nebel">
              Elf Schnellrechner für eine erste Einordnung. Für belastbare
              Zahlen rechnen wir im persönlichen Gespräch mit Ihren echten
              Daten.
            </p>
          </div>
        </section>

        <section className="bg-graphit">
          <div className="mx-auto max-w-content px-6 py-16">
            <h2 className="font-display text-xl font-bold">
              Vorsorge &amp; Absicherung
            </h2>
            <div className="mt-8">
              <CalculatorGrid items={VORSORGE} />
            </div>
          </div>
        </section>

        <section className="bg-onyx">
          <div className="mx-auto max-w-content px-6 py-16">
            <h2 className="font-display text-xl font-bold">
              Vermögen &amp; Sparen
            </h2>
            <div className="mt-8">
              <CalculatorGrid items={VERMOEGEN} />
            </div>
          </div>
        </section>

        <section className="bg-graphit">
          <div className="mx-auto max-w-content px-6 py-16">
            <h2 className="font-display text-xl font-bold">Finanzierung</h2>
            <div className="mt-8">
              <CalculatorGrid items={FINANZIERUNG} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
