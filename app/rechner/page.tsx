import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Rechner – S² Finanz",
  description:
    "Schnellrechner für private Krankenversicherung, Beamtenversorgung, Arbeitskraftabsicherung und Vermögensaufbau.",
};

const CALCULATORS = [
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
    title: "Arbeitskraftrechner",
    text: "Empfohlene Höhe Ihrer Arbeitskraftabsicherung.",
    href: "/rechner/arbeitskraftrechner/",
  },
  {
    title: "Sparrechner",
    text: "Entwicklung von Startkapital und Sparrate über die Zeit.",
    href: "/rechner/sparrechner/",
  },
];

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
              Vier Schnellrechner für eine erste Einordnung. Für belastbare
              Zahlen rechnen wir im persönlichen Gespräch mit Ihren echten
              Daten.
            </p>
          </div>
        </section>

        <section className="bg-graphit">
          <div className="mx-auto max-w-content px-6 py-16">
            <div className="grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2">
              {CALCULATORS.map((calc) => (
                <a
                  key={calc.href}
                  href={calc.href}
                  className="flex flex-col bg-graphit p-8 transition-colors hover:bg-onyx"
                >
                  <h2 className="font-display text-lg font-semibold">
                    {calc.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm text-nebel">
                    {calc.text}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-gold">
                    Rechner öffnen →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
