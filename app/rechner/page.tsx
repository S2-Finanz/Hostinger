import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CALCULATOR_GROUPS } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Rechner – S² Finanz",
  description:
    "Schnellrechner für Vorsorge, Absicherung und Vermögensaufbau – von PKV bis Baufinanzierung.",
};

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

        {CALCULATOR_GROUPS.map((group, i) => (
          <section key={group.title} className={i % 2 === 0 ? "bg-graphit" : "bg-onyx"}>
            <div className="mx-auto max-w-content px-6 py-16">
              <h2 className="font-display text-xl font-bold">
                {group.title}
              </h2>
              <div className="mt-8 grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2">
                {group.items.map((calc) => (
                  <a
                    key={calc.href}
                    href={calc.href}
                    className={`flex flex-col p-8 transition-colors hover:bg-onyx ${
                      i % 2 === 0 ? "bg-graphit" : "bg-onyx"
                    }`}
                  >
                    <h3 className="font-display text-lg font-semibold">
                      {calc.title}
                    </h3>
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
        ))}
      </main>
      <Footer />
    </>
  );
}
