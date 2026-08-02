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
    ],
  },
  {
    title: "Vermögen & Sparen",
    items: [
      {
        title: "Altersvorsorgedepot-Rechner",
        text: "Staatliche Zulage und Endkapital im neuen Altersvorsorgedepot (ab 2027).",
        href: "/rechner/altersvorsorgedepot/",
      },
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
];
