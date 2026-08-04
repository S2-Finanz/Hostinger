export type FragebogenFrage =
  | {
      id: string;
      typ: "zahl";
      frage: string;
      einheit?: string;
      min: number;
      max: number;
      zeigenWenn?: { frageId: string; wert: "ja" };
    }
  | { id: string; typ: "text"; frage: string; zeigenWenn?: { frageId: string; wert: "ja" } }
  | {
      id: string;
      typ: "jaNein";
      frage: string;
      zeigenWenn?: { frageId: string; wert: "ja" };
      beschreibung: { label: string; icdHinweis: boolean };
    };

export type FragebogenAbschnitt = {
  titel: string;
  fragen: FragebogenFrage[];
};

const STANDARD_BESCHREIBUNG = {
  label:
    "Bitte beschreiben Sie die Diagnose bzw. das Krankheitsbild, das ungefähre Datum und die Behandlung.",
  icdHinweis: true,
};

export const FRAGEBOGEN_ABSCHNITTE: FragebogenAbschnitt[] = [
  {
    titel: "Persönliche Angaben",
    fragen: [
      { id: "1", typ: "zahl", frage: "Gewicht in kg?", einheit: "kg", min: 20, max: 300 },
      { id: "2", typ: "zahl", frage: "Größe in cm?", einheit: "cm", min: 100, max: 250 },
      {
        id: "3",
        typ: "jaNein",
        frage: "Sind Sie Raucher/in?",
        beschreibung: { label: "Seit wann und ca. wie viel pro Tag?", icdHinweis: false },
      },
    ],
  },
  {
    titel: "Sucht, Psyche, weitere Angaben",
    fragen: [
      {
        id: "4",
        typ: "jaNein",
        frage:
          "Wurden Sie in den letzten 10 Jahren oder werden Sie wegen der Folgen des Konsums von Alkohol, Betäubungsmitteln oder Drogen beraten oder behandelt?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "5",
        typ: "jaNein",
        frage: "Nehmen oder nahmen Sie in den letzten 10 Jahren Drogen und/oder Betäubungsmittel ein?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "6",
        typ: "jaNein",
        frage:
          "Bestanden in den letzten 10 Jahren oder bestehen bei Ihnen Krankheiten, Störungen oder Beschwerden der Psyche? z.B. Depression, psychosomatische oder somatoforme Störung, Persönlichkeitsstörung, Essstörung, Neurosen, Burn-out-Syndrom, Erschöpfungszustände, Aufmerksamkeitsdefizit-Syndrom (ADS, ADHS)",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "7",
        typ: "jaNein",
        frage: "Haben Sie in den letzten 5 Jahren einen Selbsttötungsversuch unternommen?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "8",
        typ: "jaNein",
        frage: "Wurde bei Ihnen eine HIV-Infektion festgestellt?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
    ],
  },
  {
    titel: "Erkrankungen nach Organbereich",
    fragen: [
      {
        id: "9a",
        typ: "jaNein",
        frage:
          "der Wirbelsäule, des Rückens, des Nackens? z.B. Skoliose (Verkrümmung), Hexenschuss, Lumbalgie, Bandscheibenvorfall, Morbus Bechterew",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "9b",
        typ: "jaNein",
        frage:
          "der Knie-, Hüft-, Schulter-, Sprung- oder sonstiger Gelenke inkl. Sehnen oder Knochen oder Muskulatur? z.B. Fehlstellungen, Arthrose (Gelenkabnutzung), Bandverletzungen, Arthritis (Entzündung), Fibromyalgie, Sehnenscheiden- oder Schleimbeutelentzündungen, Rheuma, Meniskusverletzung",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "9c",
        typ: "jaNein",
        frage:
          "des Herzens, des Kreislaufs oder der Gefäße? z.B. Bluthochdruck, Herzmuskelverdickung, Herzinfarkt, Herzfehler, Durchblutungsstörungen, Thrombose",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "9d",
        typ: "jaNein",
        frage:
          "des Nervensystems, des Gehirns oder des Rückenmarks? z.B. Schlaganfall, Epilepsie (Krampfanfälle), Multiple Sklerose, Kopfschmerzen, Migräne, Schwindel, Nervenentzündung, chronische Schmerzen, Seh-, Sprach- oder Gefühlsstörungen",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "9e",
        typ: "jaNein",
        frage:
          "des Blutes, der blutbildenden Organe oder im Rahmen von Tumorerkrankungen? z.B. Anämie (Blutarmut), Gerinnungsstörung, Leukämie (Blutkrebs), Darmkrebs, Hautkrebs, geschlechtsspezifische Tumoren (Brust, Gebärmutter, Eierstöcke, Prostata), Hirntumor, Zysten, Polypen, Lymphknotenschwellung, Geschwülste",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "9f",
        typ: "jaNein",
        frage:
          "im Rahmen von Infektions- oder Autoimmunerkrankungen? z.B. Rheuma, Lupus erythematodes, Sklerodermie (Bindegewebsverhärtung), Tuberkulose, Borreliose",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "9g",
        typ: "jaNein",
        frage: "der Atemwege? z.B. Asthma, chronische oder obstruktive Bronchitis, Schlafapnoe, Emphysem",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "9h",
        typ: "jaNein",
        frage:
          "der Haut oder Allergien? z.B. auffällige Muttermale, Schuppenflechte, Neurodermitis, Ekzem, Urtikaria (Nesselsucht, Quincke-Ödem), Heuschnupfen",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "9i",
        typ: "jaNein",
        frage:
          "der Verdauungsorgane (Leber, Gallenblase/-wege, Bauchspeicheldrüse, Speiseröhre, Magen, Darm)? z.B. erhöhte Leberwerte, Hepatitis, Gastritis, chronische Darmerkrankung (Colitis Ulcerosa, Morbus Crohn), Refluxkrankheit",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "9j",
        typ: "jaNein",
        frage:
          "der Harn- und Geschlechtsorgane (z.B. Nieren, Blase, Gebärmutter, Eierstöcke, Brust, Prostata)? z.B. eingeschränkte Nierenfunktion, Zystennieren, Steinleiden, Auffälligkeiten im Urin (Blut, Eiweiß), auffälliger PAP-Abstrich, Knoten in der Brust, erhöhter PSA-Wert",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "9k",
        typ: "jaNein",
        frage:
          "des Stoffwechsels oder des Hormonhaushalts? z.B. Diabetes mellitus (Zuckerkrankheit), Gicht, Funktionsstörung der Schilddrüse, erhöhte Blutfettwerte (Cholesterin, Triglyzeride)",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "9l",
        typ: "jaNein",
        frage:
          "wegen Fehlsichtigkeit? z.B. Weit- oder Kurzsichtigkeit, Astigmatismus oder Verordnung von Sehhilfen, Augenlaserung (u.a. Lasik-Operation) etc.",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "9m",
        typ: "jaNein",
        frage: "der Augen? z.B. erhöhter Augendruck, Netzhauterkrankung, Entzündung des Sehnervs",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "9n",
        typ: "jaNein",
        frage:
          "des Halses, der Nase, der Ohren? z.B. chronische Heiserkeit, Schwerhörigkeit, Ohrgeräusche (Tinnitus), Gleichgewichtsstörungen",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "9o",
        typ: "jaNein",
        frage: "oder Störungen und Beschwerden infolge eines Unfalles, Verstrahlung oder Vergiftung?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
    ],
  },
  {
    titel: "Weitere Angaben",
    fragen: [
      {
        id: "10",
        typ: "jaNein",
        frage:
          "Hatten Sie in den letzten 6 Monaten vor Antragstellung Beschwerden in einem der oben erfragten Organbereiche, ohne einen Arzt oder Behandler aufzusuchen?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "11",
        typ: "jaNein",
        frage:
          "Besteht eine Sterilität, Infertilität oder wurden Beratungen, Untersuchungen aufgrund eines unerfüllten Kinderwunsches durchgeführt?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "12a",
        typ: "jaNein",
        frage:
          "Haben aus bisher nicht genannten Gründen Krankenhaus-, Rehabilitations-, Kuraufenthalte oder ambulante Operationen stattgefunden?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "12b",
        typ: "jaNein",
        frage: "Oder sind solche ärztlich empfohlen oder beabsichtigt?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "13",
        typ: "jaNein",
        frage:
          "Bestehen oder bestanden körperliche Gebrechen (z.B. Fehlen von Gliedmaßen, Teil-Verluste oder Teil-Entfernung von Gliedmaßen oder Organen), geistige Beeinträchtigungen, erworbene Organfehler (z.B. erworbene Herzfehler), angeborene Erkrankungen (z.B. angeborene Herzfehler, Einzelniere) oder Entwicklungsstörungen oder Krebserkrankungen?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "14",
        typ: "jaNein",
        frage:
          "Besteht ein Grad der Behinderung (GdB), eine Erwerbsminderung (MdE) oder eine Wehrdienstbeschädigung (WDB) oder beziehen bzw. bezogen Sie Renten aus gesundheitlichen Gründen oder ist eine solche beantragt?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "15",
        typ: "jaNein",
        frage:
          "Nahmen Sie in den letzten 5 Jahren oder nehmen Sie regelmäßig oder zusammenhängend über mehr als 4 Wochen Medikamente ein bzw. wurde Ihnen die Einnahme verordnet?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "16",
        typ: "jaNein",
        frage: "Waren Sie in den letzten 3 Jahren mehr als 10 Kalendertage ununterbrochen erkrankt/arbeitsunfähig?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "17",
        typ: "jaNein",
        frage:
          "Haben Sie einen Hausarzt bzw. einen Arzt oder Behandler (z.B. Arzt, Heilpraktiker, Physiotherapeut), der über Ihre Gesundheitsverhältnisse umfassend informiert ist?",
        beschreibung: { label: "Name und Adresse des Arztes/Behandlers", icdHinweis: false },
      },
      {
        id: "18",
        typ: "jaNein",
        frage:
          "Bestanden, auch wenn sie nicht behandelt wurden, über die getätigten Angaben hinaus in den letzten 3 Jahren oder bestehen zurzeit Krankheiten, chronische Leiden, Beschwerden, Unfallfolgen, Körperimplantate, Prothesen, Störungen organischer, körperlicher oder geistiger Art oder Pflegebedürftigkeit?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
    ],
  },
  {
    titel: "Zahngesundheit",
    fragen: [
      {
        id: "19",
        typ: "jaNein",
        frage: "Wird eine Zahnschiene oder ein Retainer getragen?",
        beschreibung: { label: "Bitte kurz beschreiben (Art, seit wann).", icdHinweis: false },
      },
      {
        id: "20",
        typ: "jaNein",
        frage: "Wurde eine CMD (Craniomandibuläre Dysfunktion) diagnostiziert?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "21",
        typ: "jaNein",
        frage: "Besteht eine Zahnbetterkrankung (Parodontitis)?",
        beschreibung: STANDARD_BESCHREIBUNG,
      },
      {
        id: "22",
        typ: "jaNein",
        frage: "Besteht eine Zahnfehlstellung oder Kieferanomalie?",
        beschreibung: { label: "Bitte kurz beschreiben, welche Fehlstellung/Anomalie.", icdHinweis: false },
      },
      {
        id: "22a",
        typ: "jaNein",
        frage: "Ist eine Behandlung laufend oder angeraten?",
        zeigenWenn: { frageId: "22", wert: "ja" },
        beschreibung: { label: "Bitte kurz beschreiben, welche Behandlung.", icdHinweis: false },
      },
      {
        id: "23",
        typ: "zahl",
        frage:
          "Wie viele Zähne außer fehlenden Weisheitszähnen und vollständigem Lückenschluss fehlen und sind noch nicht ersetzt worden?",
        min: 0,
        max: 32,
      },
      { id: "24", typ: "zahl", frage: "Wie viele Zähne wurden ersetzt bzw. überkront?", min: 0, max: 32 },
      {
        id: "25",
        typ: "zahl",
        frage: "Wie viele Zähne wurden mit herausnehmbarem Zahnersatz ersetzt?",
        min: 0,
        max: 32,
      },
      {
        id: "26",
        typ: "zahl",
        frage: "Wie alt ist der bestehende Zahnersatz bzw. die Überkronung(en)? In Jahren",
        einheit: "Jahre",
        min: 0,
        max: 80,
      },
      { id: "27", typ: "text", frage: "Wann fand die letzte zahnärztliche Untersuchung statt?" },
      {
        id: "28",
        typ: "jaNein",
        frage: "War diese Untersuchung mit Befund?",
        beschreibung: { label: "", icdHinweis: false },
      },
      {
        id: "28a",
        typ: "text",
        frage: "Welcher Befund wurde gestellt bzw. welche Maßnahmen sind angeraten oder beabsichtigt?",
        zeigenWenn: { frageId: "28", wert: "ja" },
      },
    ],
  },
  {
    titel: "Berufliche und private Risiken",
    fragen: [
      {
        id: "29",
        typ: "jaNein",
        frage:
          "Sind Sie Gefahren im Beruf (z.B. Flugrisiko, Chemikalien, radioaktive Stoffe/Strahlen, Aufenthalt in Krisengebieten) ausgesetzt?",
        beschreibung: { label: "", icdHinweis: false },
      },
      {
        id: "29a",
        typ: "text",
        frage:
          "Bitte teilen Sie uns weitere Details zu den Gefahren im Beruf mit (z.B. mit welchen Chemikalien bzw. radioaktiven Stoffen haben Sie Umgang, in welchen Krisengebieten werden Sie eingesetzt etc.), damit das Risiko besser eingeschätzt werden kann.",
        zeigenWenn: { frageId: "29", wert: "ja" },
      },
      {
        id: "30",
        typ: "jaNein",
        frage: "Besteht Fremdmaterial/Implantate im Körper?",
        beschreibung: { label: "", icdHinweis: false },
      },
      {
        id: "30a",
        typ: "text",
        frage:
          "Bitte machen Sie nähere sachdienliche Angaben zu Fremdmaterialien/Implantaten in Ihrem Körper (Art, seit wann, Entfernung geplant etc.).",
        zeigenWenn: { frageId: "30", wert: "ja" },
      },
      {
        id: "31",
        typ: "jaNein",
        frage:
          "Sind Sie Gefahren bei Sport oder Hobby (z.B. Flugrisiko/Drachenfliegen/Fallschirmspringen, Rennfahrten, Bergsteigen, Tauchen, Extremsportarten, Kampfsportarten oder Teilnahme an organisierten sportlichen Wettbewerben, Reiten, Fahren eines motorisierten Zweirades mit mehr als 50ccm, Quad oder Trike) ausgesetzt?",
        beschreibung: { label: "", icdHinweis: false },
      },
      {
        id: "31a",
        typ: "text",
        frage:
          "Bitte teilen Sie uns weitere Details zu den Gefahren bei Sport oder Hobby mit (z.B. welche Sportart, seit wann, Teilnahme an offiziellen Wettbewerben, wird der Sport mit Vollkörperkontakt ausgeführt etc.), damit das Risiko besser eingeschätzt werden kann.",
        zeigenWenn: { frageId: "31", wert: "ja" },
      },
      {
        id: "32",
        typ: "jaNein",
        frage:
          "Möchten Sie uns eventuell vorhandene Operations- oder Behandlungsberichte, Krankenhausentlassungsberichte, eventuelle Berichte über Nachsorgeuntersuchungen sowie optional bildgebendes Material (MRT, CT, Röntgen) zur Verfügung stellen?",
        beschreibung: {
          label: "Bitte kurz beschreiben, welche Unterlagen Sie zur Verfügung stellen möchten – Ihr Berater meldet sich wegen der Übermittlung bei Ihnen.",
          icdHinweis: false,
        },
      },
    ],
  },
  {
    titel: "Reisen",
    fragen: [
      {
        id: "33",
        typ: "jaNein",
        frage:
          "Beabsichtigen Sie, innerhalb der nächsten 12 Monate in Krisengebiete oder länger als 3 Monate in ein Land außerhalb der Europäischen Union zu reisen?",
        beschreibung: { label: "", icdHinweis: false },
      },
      {
        id: "33a",
        typ: "jaNein",
        frage:
          "Werden Sie sich ausschließlich in der Schweiz, Norwegen, Großbritannien (mit Nordirland), in Kanada oder den USA aufhalten?",
        zeigenWenn: { frageId: "33", wert: "ja" },
        beschreibung: { label: "", icdHinweis: false },
      },
    ],
  },
];

export const FRAGEBOGEN_HINWEIS_BEISPIELE = [
  {
    frage: "9h – Krankheiten der Haut oder Allergien",
    beispiel:
      "Heuschnupfen. Ohne Behandlung. Allergie gegen Gräser und Haselnuss. Bei Bedarf wird Cetirizin genommen.",
  },
  {
    frage: "9b – Erkrankungen der Gelenke",
    beispiel:
      "Bänderriss am linken Knie (Datum des Vorfalls). Sechs Wochen Tragen einer Bandage, zehnmal Physiotherapie, ausgeheilt seit (Datum).",
  },
];

export function alleFragenFlach(): FragebogenFrage[] {
  return FRAGEBOGEN_ABSCHNITTE.flatMap((abschnitt) => abschnitt.fragen);
}
