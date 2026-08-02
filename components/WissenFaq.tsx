"use client";

import { useState } from "react";
import Link from "next/link";

const FAQ = [
  {
    frage: "Private Krankenversicherung (PKV) oder gesetzliche Krankenversicherung (GKV)?",
    antwort:
      "Das hängt von Einkommen, Familienplanung, Gesundheitszustand und Berufsstatus ab. Für Beamte ist die PKV wegen der Beihilfe in aller Regel deutlich günstiger als die GKV. Für Angestellte und Geschäftsführer lohnt sich ein individueller Vergleich der laufenden Beiträge und Leistungen.",
    href: "/rechner/pkv-rechner/",
    hrefLabel: "PKV Schnellrechner öffnen",
  },
  {
    frage: "Wie wird meine Pension als Beamter berechnet?",
    antwort:
      "Ihre Pension ergibt sich aus dem Ruhegehaltssatz (1,79375 % je ruhegehaltfähigem Dienstjahr, gedeckelt bei 71,75 %) und Ihrem letzten Grundgehalt. Teilzeit, Elternzeit und der Erfahrungsstufen-Aufstieg wirken sich direkt auf die Höhe aus.",
    href: "/rechner/pensionsrechner/",
    hrefLabel: "Pensionsrechner öffnen",
  },
  {
    frage: "Brauche ich eine Arbeitskraftabsicherung, wenn ich verbeamtet bin?",
    antwort:
      "Ja – Dienstunfähigkeit ist bei Beamten anders abgesichert als Erwerbsminderung bei Angestellten, aber die Versorgung reicht oft nicht aus, um den gewohnten Lebensstandard zu halten, besonders in jungen Jahren mit kurzer Dienstzeit. Eine private Dienstunfähigkeitsversicherung schließt diese Lücke.",
    href: "/rechner/arbeitskraftrechner/",
    hrefLabel: "Arbeitskraftrechner öffnen",
  },
  {
    frage: "Was ist das neue Altersvorsorgedepot ab 2027?",
    antwort:
      "Das Altersvorsorgedepot ist Deutschlands neue, staatlich geförderte Form der privaten Altersvorsorge mit Zulagen, Startbonus und steueroptimierter Einzahlung. Im Gegensatz zu klassischen Riester-Produkten investiert das Kapital breit gestreut, etwa in ETFs.",
    href: "/rechner/altersvorsorgedepot/",
    hrefLabel: "Altersvorsorgedepot-Rechner öffnen",
  },
  {
    frage: "Wie groß ist meine Rentenlücke?",
    antwort:
      "Die Rentenlücke ist die Differenz zwischen Ihrem gewünschten Einkommen im Ruhestand und Ihrer voraussichtlichen gesetzlichen Rente bzw. Pension. Sie lässt sich mit wenigen Angaben zu Einkommen, Sparrate und Renteneintrittsalter überschlägig berechnen.",
    href: "/rechner/rentenluecke/",
    hrefLabel: "Rentenlückenrechner öffnen",
  },
  {
    frage: "Was kostet eine Beratung bei S² Finanz?",
    antwort:
      "Das erste Orientierungsgespräch ist für Sie kostenlos und unverbindlich. Dort klären wir gemeinsam Ihre Ausgangslage und ob eine weiterführende Beratung für Sie sinnvoll ist.",
    href: "/#kontakt",
    hrefLabel: "Termin vereinbaren",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.frage,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.antwort,
    },
  })),
};

export default function WissenFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="wissen" className="bg-graphit">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-content px-6 py-24">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Häufige Fragen
          </h2>
          <p className="mt-4 text-nebel">
            Ein erster Überblick zu den Themen, mit denen wir uns täglich
            beschäftigen. Für die individuelle Einordnung nutzen Sie gerne
            unsere Rechner oder sprechen direkt mit uns.
          </p>
        </div>

        <div className="mt-12 divide-y divide-white/10 border-t border-white/10">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.frage}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="font-display text-base font-semibold text-white md:text-lg">
                    {item.frage}
                  </span>
                  <span
                    className={`shrink-0 text-xl text-gold transition-transform ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6">
                    <p className="max-w-2xl text-sm leading-relaxed text-nebel">
                      {item.antwort}
                    </p>
                    <Link
                      href={item.href}
                      className="mt-4 inline-block text-sm font-semibold text-gold hover:opacity-80"
                    >
                      {item.hrefLabel} →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
