export type CalculatorLink = {
  title: string;
  text: string;
  href: string;
};

export type CalculatorGroup = {
  title: string;
  items: CalculatorLink[];
};

export const CALCULATOR_GROUPS: CalculatorGroup[] = [
  {
    title: "Vorsorge & Absicherung",
    items: [
      {
        title: "Altersvorsorgedepot-Rechner",
        text: "Zulagen, Startbonus und Steuervorteil der neuen staatlichen Förderung ab 2027 – inkl. ETF-Vergleich.",
        href: "/rechner/altersvorsorgedepot/",
      },
      {
        title: "GKV-PKV-Vergleichsrechner",
        text: "GKV-Beitrag vs. marktübliche PKV-Richtwerte für Ihr Alter.",
        href: "/rechner/pkv-rechner/",
      },
      {
        title: "Krankenkassen-Vergleich",
        text: "Zwei gesetzliche Krankenkassen im direkten Beitragsvergleich.",
        href: "/rechner/krankenkassenvergleich/",
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
    ],
  },
  {
    title: "Vermögen & Sparen",
    items: [
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
        title: "ETF-Depot vs. Rentenversicherung",
        text: "Vergleich nach Kosten und Steuern – inkl. Rebalancing und Auszahlvarianten.",
        href: "/rechner/etf-vs-rentenversicherung/",
      },
      {
        title: "Aktienrenditerechner",
        text: "Durchschnittliche jährliche Rendite (CAGR) eines Investments.",
        href: "/rechner/aktienrenditerechner/",
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
      {
        title: "Was-wäre-wenn-Rechner",
        text: "Historische Index-Rendite: Was wäre aus einer Geldanlage seit Ihrer Geburt geworden?",
        href: "/rechner/was-waere-wenn-rechner/",
      },
      {
        title: "Wahrscheinlichkeitsrechner",
        text: "Historisches Verlustrisiko eines MSCI-World-Sparplans über Ihre Laufzeit.",
        href: "/rechner/wahrscheinlichkeitsrechner/",
      },
    ],
  },
  {
    title: "Finanzierung",
    items: [
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
    ],
  },
  {
    title: "Beamte",
    items: [
      {
        title: "Besoldungstabellen",
        text: "Besoldungstabellen für Bund und alle Bundesländer als PDF-Download.",
        href: "/rechner/besoldungstabellen/",
      },
    ],
  },
];
