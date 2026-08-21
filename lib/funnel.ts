import { supabase } from "@/lib/supabase";

export type BerufsstatusWert =
  | "student"
  | "berufseinsteiger"
  | "angestellt"
  | "beamter"
  | "selbststaendig"
  | "geschaeftsfuehrer";

export type FrageTyp = "single" | "multi" | "dropdown";

export type FunnelAntworten = Record<string, string | string[]>;

export type FunnelFrage = {
  id: string;
  frage: string;
  typ: FrageTyp;
  optionen: { wert: string; label: string }[];
};

export const BUNDESLAENDER: { wert: string; label: string }[] = [
  { wert: "baden-wuerttemberg", label: "Baden-Württemberg" },
  { wert: "bayern", label: "Bayern" },
  { wert: "berlin", label: "Berlin" },
  { wert: "brandenburg", label: "Brandenburg" },
  { wert: "bremen", label: "Bremen" },
  { wert: "hamburg", label: "Hamburg" },
  { wert: "hessen", label: "Hessen" },
  { wert: "mecklenburg-vorpommern", label: "Mecklenburg-Vorpommern" },
  { wert: "niedersachsen", label: "Niedersachsen" },
  { wert: "nordrhein-westfalen", label: "Nordrhein-Westfalen" },
  { wert: "rheinland-pfalz", label: "Rheinland-Pfalz" },
  { wert: "saarland", label: "Saarland" },
  { wert: "sachsen", label: "Sachsen" },
  { wert: "sachsen-anhalt", label: "Sachsen-Anhalt" },
  { wert: "schleswig-holstein", label: "Schleswig-Holstein" },
  { wert: "thueringen", label: "Thüringen" },
  { wert: "bund", label: "Bund" },
];

const JA_NEIN = [
  { wert: "ja", label: "Ja" },
  { wert: "nein", label: "Nein" },
];

export const FRAGEN: Record<string, FunnelFrage> = {
  q_beruf: {
    id: "q_beruf",
    frage: "Was beschreibt deine aktuelle berufliche Situation?",
    typ: "single",
    optionen: [
      { wert: "student", label: "Student/in" },
      { wert: "berufseinsteiger", label: "Berufseinsteiger/in" },
      { wert: "angestellt", label: "Angestellt" },
      { wert: "beamter", label: "Beamter/Beamtin" },
      { wert: "selbststaendig", label: "Selbstständig" },
      { wert: "geschaeftsfuehrer", label: "Geschäftsführer" },
    ],
  },
  q_laufbahn: {
    id: "q_laufbahn",
    frage:
      "Strebst du nach dem Studium eher eine Beamtenlaufbahn oder eine Laufbahn als Angestellte/r bzw. Selbstständige/r an?",
    typ: "single",
    optionen: [
      { wert: "beamtenlaufbahn", label: "Beamtenlaufbahn" },
      {
        wert: "angestellten_selbststaendigen_laufbahn",
        label: "Angestellten-/Selbstständigen-Laufbahn",
      },
    ],
  },
  q_themen: {
    id: "q_themen",
    frage: "In welchem Bereich dürfen wir dich unterstützen?",
    typ: "multi",
    optionen: [
      { wert: "arbeitskraftabsicherung", label: "Arbeitskraftabsicherung" },
      { wert: "vermoegensaufbau", label: "Vermögensaufbau" },
      { wert: "krankenversicherung", label: "Krankenversicherung" },
      { wert: "sonstige", label: "Sonstige Versicherungsfragen" },
    ],
  },
  q_einkommen: {
    id: "q_einkommen",
    frage: "Wie hoch ist dein monatliches Nettoeinkommen?",
    typ: "single",
    optionen: [
      { wert: "unter_1500", label: "Unter 1.500 €" },
      { wert: "1500_3000", label: "1.500 – 3.000 €" },
      { wert: "3000_5000", label: "3.000 – 5.000 €" },
      { wert: "ueber_5000", label: "Über 5.000 €" },
    ],
  },
  q_bereits_beschaeftigt: {
    id: "q_bereits_beschaeftigt",
    frage: "Hast du dich bereits mit dem Thema Versicherungen bzw. Vermögensaufbau beschäftigt?",
    typ: "single",
    optionen: JA_NEIN,
  },
  q_beamten_status: {
    id: "q_beamten_status",
    frage: "Bist du Beamtenanwärter/in oder bereits verbeamtet?",
    typ: "single",
    optionen: [
      { wert: "anwaerter", label: "Anwärter/in" },
      { wert: "auf_probe", label: "Verbeamtet auf Probe" },
      { wert: "auf_lebenszeit", label: "Verbeamtet auf Lebenszeit" },
    ],
  },
  q_bundesland: {
    id: "q_bundesland",
    frage: "In welchem Bundesland bist du tätig?",
    typ: "dropdown",
    optionen: BUNDESLAENDER,
  },
  q_beamten_thema: {
    id: "q_beamten_thema",
    frage: "Zu welchem Thema möchtest du dich informieren?",
    typ: "single",
    optionen: [
      { wert: "pkv", label: "Private Krankenversicherung" },
      { wert: "beamtenversorgung", label: "Beamtenversorgung" },
      { wert: "dienstunfaehigkeit", label: "Dienstunfähigkeit" },
      { wert: "allgemein", label: "Allgemeine Versicherungsthemen" },
    ],
  },
  q_versicherungsart: {
    id: "q_versicherungsart",
    frage: "Bist du aktuell privat oder gesetzlich versichert?",
    typ: "single",
    optionen: [
      { wert: "privat", label: "Privat versichert" },
      { wert: "gesetzlich", label: "Gesetzlich versichert" },
    ],
  },
  q_beamten_vorsorge: {
    id: "q_beamten_vorsorge",
    frage: "Besteht bereits eine Vorsorge zu diesem Thema?",
    typ: "single",
    optionen: JA_NEIN,
  },
  q_selbststaendig_thema: {
    id: "q_selbststaendig_thema",
    frage: "Um welches Thema geht es dir?",
    typ: "single",
    optionen: [
      { wert: "krankenversicherung", label: "Krankenversicherung" },
      { wert: "arbeitskraftabsicherung", label: "Arbeitskraftabsicherung" },
      { wert: "altersvorsorge", label: "Altersvorsorge" },
      { wert: "staatliche_foerderung", label: "Staatliche Förderung" },
      { wert: "mitarbeiterbenefits", label: "Mitarbeiterbenefits" },
      { wert: "gewerbliche_versicherungen", label: "Gewerbliche Versicherungen" },
    ],
  },
};

// Ermittelt die nächste zu stellende Frage anhand der bisherigen Antworten.
// Gibt null zurück, sobald die Qualifizierung abgeschlossen ist und das
// Kontaktformular an der Reihe ist.
export function naechsteFrage(antworten: FunnelAntworten): string | null {
  if (!antworten.q_beruf) return "q_beruf";
  const beruf = antworten.q_beruf as BerufsstatusWert;

  if (beruf === "student") {
    if (!antworten.q_laufbahn) return "q_laufbahn";
    if (!antworten.q_themen) return "q_themen";
    return null;
  }

  if (beruf === "berufseinsteiger" || beruf === "angestellt") {
    if (!antworten.q_themen) return "q_themen";
    const themen = (antworten.q_themen as string[]) ?? [];
    if (themen.includes("arbeitskraftabsicherung") && !antworten.q_einkommen) {
      return "q_einkommen";
    }
    if (!antworten.q_bereits_beschaeftigt) return "q_bereits_beschaeftigt";
    return null;
  }

  if (beruf === "beamter") {
    if (!antworten.q_beamten_status) return "q_beamten_status";
    if (!antworten.q_bundesland) return "q_bundesland";
    if (!antworten.q_beamten_thema) return "q_beamten_thema";
    if (antworten.q_beamten_thema === "pkv") {
      if (!antworten.q_versicherungsart) return "q_versicherungsart";
      return null;
    }
    if (!antworten.q_beamten_vorsorge) return "q_beamten_vorsorge";
    return null;
  }

  if (beruf === "selbststaendig" || beruf === "geschaeftsfuehrer") {
    if (!antworten.q_selbststaendig_thema) return "q_selbststaendig_thema";
    return null;
  }

  return null;
}

export async function funnelAbsenden(input: {
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  antworten: FunnelAntworten;
  newsletterOptIn: boolean;
  datenschutzAkzeptiert: boolean;
}): Promise<void> {
  const { data, error } = await supabase.rpc("funnel_absenden", {
    p_vorname: input.vorname,
    p_nachname: input.nachname,
    p_email: input.email,
    p_telefon: input.telefon,
    p_antworten: input.antworten,
    p_newsletter_opt_in: input.newsletterOptIn,
    p_datenschutz_akzeptiert: input.datenschutzAkzeptiert,
  });

  if (error) throw error;
  if (!data?.erfolg) {
    throw new Error(
      data?.grund === "datenschutz_nicht_akzeptiert"
        ? "Bitte stimme der Datenschutzerklärung zu."
        : "Anfrage konnte nicht gesendet werden. Bitte prüfe deine Angaben.",
    );
  }
}
