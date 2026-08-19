"use client";

import { useState } from "react";
import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";

const FAQ = [
  {
    frage: "Was kostet mich eine Beratung?",
    antwort:
      "Das erste Orientierungsgespräch ist für Sie kostenlos und unverbindlich. Wir lernen Ihre Situation kennen, klären Ihre Ziele und zeigen auf, wo aus unserer Sicht Handlungsbedarf besteht – ob und wie es danach weitergeht, entscheiden Sie in aller Ruhe.",
  },
  {
    frage: "Wie läuft ein Erstgespräch ab?",
    antwort:
      "Im rund 30-minütigen Gespräch – persönlich oder digital per Videocall – verschaffen wir uns gemeinsam einen Überblick über Ihre aktuelle Absicherung, Ihre Ziele und Ihre finanzielle Situation. Sie erhalten eine erste, ehrliche Einschätzung, wo Optimierungsbedarf besteht und wo nicht.",
  },
  {
    frage: "Wie geht es nach dem Erstgespräch weiter?",
    antwort:
      "Sehen wir konkreten Bedarf, erarbeiten wir für Sie einen individuellen Vorschlag mit einem Vergleich passender Anbieter und Tarife. Die Entscheidung liegt danach ganz bei Ihnen – ohne Zeitdruck und ohne Verpflichtung, einen der Vorschläge auch tatsächlich abzuschließen.",
  },
  {
    frage: "Sind Sie unabhängig?",
    antwort:
      "Ja. Wir sind an keinen einzelnen Versicherer gebunden und vergleichen den gesamten Markt, um für Sie die passende Lösung zu finden – nicht die, die uns die höchste Provision einbringt.",
  },
  {
    frage: "Wie schnell bekomme ich einen Termin?",
    antwort:
      "In der Regel können wir Ihnen innerhalb weniger Tage einen Termin anbieten. Bei einem dringenden Anliegen sprechen Sie uns gerne direkt an – dann finden wir meist noch schneller einen passenden Slot.",
  },
  {
    frage: "Für wen lohnt sich ein Termin mit uns?",
    antwort:
      "Für Beamte, Angestellte und Geschäftsführer, die ihre private Krankenversicherung, Beamtenversorgung, Arbeitskraftabsicherung oder Altersvorsorge einmal unabhängig prüfen lassen möchten – egal ob zum Berufseinstieg oder zur Standortbestimmung nach einigen Jahren.",
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
    <section id="faq" className="bg-graphit">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-content px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Häufige Fragen
          </h2>
          <p className="mt-4 text-nebel">
            Ein erster Überblick zu den Themen, mit denen wir uns täglich
            beschäftigen. Für die individuelle Einordnung sprechen Sie gerne
            direkt mit uns.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-4">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.frage}
                className="rounded-sm border border-white/10 bg-onyx"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-display text-base font-semibold text-white">
                    {item.frage}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-4 w-4 shrink-0 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    <path d="M5 7.5 10 12.5 15 7.5" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <p className="text-sm leading-relaxed text-nebel">
                      {item.antwort}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-12 max-w-md rounded-sm border border-gold/40 bg-onyx p-10 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-5 w-5 text-gold"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
              />
            </svg>
          </div>
          <h3 className="mt-5 font-display text-lg font-bold text-white">
            Noch Fragen?
          </h3>
          <p className="mx-auto mt-3 max-w-xs text-sm text-nebel">
            Wir helfen Ihnen gerne persönlich weiter – kostenlos und
            unverbindlich.
          </p>
          <Link
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
          >
            Termin vereinbaren
          </Link>
        </div>
      </div>
    </section>
  );
}
