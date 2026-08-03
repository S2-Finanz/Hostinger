// Gesetzliche Rechengrößen Sozialversicherung 2026.
export const GKV_ALLGEMEIN_PROZENT = 14.6;
export const PV_ALLGEMEIN_PROZENT = 3.6;
export const PV_KINDERLOSENZUSCHLAG_PROZENT = 0.6;
export const KINDERLOSENZUSCHLAG_AB_ALTER = 23;
export const BBG_KV_MONATLICH = 5812.5; // Beitragsbemessungsgrenze KV/PV 2026
export const JAEG_JAHR = 77400; // allgemeine Jahresarbeitsentgeltgrenze (Versicherungspflichtgrenze) 2026

// Zusatzbeitragssätze 2026 aller gesetzlichen Krankenkassen (Stand: Januar 2026),
// inkl. Direktlink zum Online-Antrag, Hinweis bei fehlendem Online-Abschluss und
// Link zum Highlightblatt der Kasse (Quelle: vom Mandanten bereitgestellte Übersicht,
// Antrags-/Highlightblatt-Links über den Maklerpool makleraktiv.de). Da sich
// Zusatzbeiträge unterjährig ändern können, bleibt das Feld nach der Auswahl
// weiterhin manuell editierbar.
export type Krankenkasse = {
  name: string;
  zusatzbeitrag: number;
  antragUrl?: string;
  antragHinweis?: string;
  highlightblattUrl?: string;
};

export const KRANKENKASSEN: Krankenkasse[] = [
  { name: "AOK Baden-Württemberg", zusatzbeitrag: 2.99, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiI3IiwidCI6ImUiLCJ1IjoiTUFLMjMxMDExIn0%3D" },
  { name: "AOK Bayern", zusatzbeitrag: 2.69, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiI4IiwidCI6ImUiLCJ1IjoiTUFLMjMxMDExIn0%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=008" },
  { name: "AOK Bremen/Bremerhaven", zusatzbeitrag: 3, antragUrl: "https://www.makleraktiv.de/redirects/antrag.php?kid=16&vid=2000007&legacypdf=1&untervermittler=MAK231011&personenkreis=angestellt", antragHinweis: "Kein Online Abschluss möglich" },
  { name: "AOK Hessen", zusatzbeitrag: 2.98, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiI0IiwidCI6ImUiLCJ1IjoiTUFLMjMxMDExIn0%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=004" },
  { name: "AOK Niedersachsen", zusatzbeitrag: 2.7, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiI0IiwidCI6ImUiLCJ1IjoiTUFLMjMxMDExIn0%3D" },
  { name: "AOK Nordost", zusatzbeitrag: 3.5, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxMSIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9" },
  { name: "AOK NordWest", zusatzbeitrag: 2.9, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxNCIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=014" },
  { name: "AOK PLUS", zusatzbeitrag: 3.1, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiI5IiwidCI6ImUiLCJ1IjoiTUFLMjMxMDExIn0%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=009" },
  { name: "AOK Rheinland-Pfalz/Saarland", zusatzbeitrag: 2.47, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiI1IiwidCI6ImUiLCJ1IjoiTUFLMjMxMDExIn0%3D" },
  { name: "AOK Rheinland/Hamburg", zusatzbeitrag: 3.29, antragUrl: "https://www.makleraktiv.de/redirects/antrag.php?kid=1&vid=2000007&legacypdf=1&untervermittler=MAK231011", antragHinweis: "Kein Online Abschluss möglich" },
  { name: "AOK Sachsen-Anhalt", zusatzbeitrag: 2.8, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxMCIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9" },
  { name: "Audi BKK", zusatzbeitrag: 2.6, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxODciLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=187" },
  { name: "Bahn BKK", zusatzbeitrag: 3.65, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxODgiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D" },
  { name: "Barmer", zusatzbeitrag: 3.29, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyMCIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9" },
  { name: "Bertelsmann BKK", zusatzbeitrag: 2.8 },
  { name: "BIG direkt gesund", zusatzbeitrag: 3.69, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyMTgiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=218" },
  { name: "BKK Akzo Nobel Bayern", zusatzbeitrag: 2.75 },
  { name: "BKK BPW Bergische Achsen", zusatzbeitrag: 2.75, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxNTQiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=154" },
  { name: "BKK Deutsche Bank", zusatzbeitrag: 2.85 },
  { name: "BKK Diakonie", zusatzbeitrag: 2.9, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyNTkiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D" },
  { name: "BKK Euregio", zusatzbeitrag: 3.39, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiI0NCIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=044" },
  { name: "BKK evm", zusatzbeitrag: 2.9 },
  { name: "BKK EWE", zusatzbeitrag: 2.8 },
  { name: "BKK exklusiv", zusatzbeitrag: 2.9 },
  { name: "BKK Faber-Castell & Partner", zusatzbeitrag: 2.7, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxODYiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D" },
  { name: "BKK firmus", zusatzbeitrag: 2.18, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIzNiIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=036" },
  { name: "BKK Freudenberg", zusatzbeitrag: 2.85, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiI2OCIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9" },
  { name: "BKK Gildemeister Seidensticker", zusatzbeitrag: 2.95, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxOTUiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=195" },
  { name: "BKK Groz-Beckert", zusatzbeitrag: 2.7 },
  { name: "BKK Herford Minden Ravensberg", zusatzbeitrag: 2.85 },
  { name: "BKK Herkules", zusatzbeitrag: 4.38, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyMTUiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D" },
  { name: "BKK Karl Mayer", zusatzbeitrag: 2.8 },
  { name: "BKK Linde", zusatzbeitrag: 2.9, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIzMzciLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D" },
  { name: "BKK MAHLE", zusatzbeitrag: 2.8 },
  { name: "BKK Melitta Plus", zusatzbeitrag: 2.75, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyMzYiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=236" },
  { name: "BKK MTU", zusatzbeitrag: 2.85 },
  { name: "BKK Pfalz", zusatzbeitrag: 3.1, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxOTciLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D" },
  { name: "BKK ProVita", zusatzbeitrag: 3.2, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIzMTgiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=318" },
  { name: "BKK Public", zusatzbeitrag: 2.9, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxMDMiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D" },
  { name: "BKK PwC", zusatzbeitrag: 2.85 },
  { name: "BKK Regional 91", zusatzbeitrag: 2.9 },
  { name: "BKK Regional 92", zusatzbeitrag: 2.9 },
  { name: "BKK Rieker Ricosta Weisser", zusatzbeitrag: 2.75 },
  { name: "BKK Salzgitter", zusatzbeitrag: 2.9 },
  { name: "BKK SBH", zusatzbeitrag: 2.85, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxMTQiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=114" },
  { name: "BKK Scheufelen", zusatzbeitrag: 2.9, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIzMjQiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D" },
  { name: "BKK Stadt Augsburg", zusatzbeitrag: 2.9 },
  { name: "BKK Technoform", zusatzbeitrag: 2.85, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxNTkiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D" },
  { name: "BKK Textilgruppe Hof", zusatzbeitrag: 2.8 },
  { name: "BKK V-A-V", zusatzbeitrag: 2.85 },
  { name: "BKK VDN", zusatzbeitrag: 2.95, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyNTQiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D" },
  { name: "BKK VerbundPlus", zusatzbeitrag: 2.85, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiI2MiIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9" },
  { name: "BKK Voralb Heller Index Leuze", zusatzbeitrag: 2.7 },
  { name: "BKK Werra-Meissner", zusatzbeitrag: 2.8, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIzMSIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=031" },
  { name: "BKK Wirtschaft & Finanzen", zusatzbeitrag: 2.9, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIzMzgiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=338" },
  { name: "BKK Würth", zusatzbeitrag: 2.75 },
  { name: "BKK ZF & Partner", zusatzbeitrag: 2.85, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIzMTUiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=315" },
  { name: "BKK24", zusatzbeitrag: 4.39, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiI3NSIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=075" },
  { name: "BMW BKK", zusatzbeitrag: 2.65 },
  { name: "Bosch BKK", zusatzbeitrag: 3.18, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiI1NCIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9" },
  { name: "Continentale BKK", zusatzbeitrag: 2.95, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIzMzAiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=330" },
  { name: "DAK-Gesundheit", zusatzbeitrag: 3.2, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyMSIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=021" },
  { name: "debeka BKK", zusatzbeitrag: 2.85 },
  { name: "energie BKK", zusatzbeitrag: 2.9, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIzMzIiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=332" },
  { name: "Ernst & Young BKK", zusatzbeitrag: 2.75 },
  { name: "Heimat Krankenkasse", zusatzbeitrag: 2.95, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyMDQiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=204" },
  { name: "HEK - Hanseatische Krankenkasse", zusatzbeitrag: 2.89, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyNSIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=025" },
  { name: "hkk Erste Gesundheit", zusatzbeitrag: 2.59, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyNiIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=026" },
  { name: "IKK - Die Innovationskasse", zusatzbeitrag: 2.95, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxNDEiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=141" },
  { name: "IKK Brandenburg und Berlin", zusatzbeitrag: 3.15, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxNDIiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=142" },
  { name: "IKK classic", zusatzbeitrag: 3.85, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyOTAiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=290" },
  { name: "IKK gesund plus", zusatzbeitrag: 2.95, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxNDAiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=140" },
  { name: "IKK Südwest", zusatzbeitrag: 3.05, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyNTIiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=252" },
  { name: "KKH Kaufmännische Krankenkasse", zusatzbeitrag: 3.4, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyMyIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=023" },
  { name: "KNAPPSCHAFT", zusatzbeitrag: 4.3, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIzMzYiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=336" },
  { name: "Koenig & Bauer BKK", zusatzbeitrag: 2.85 },
  { name: "Krones BKK", zusatzbeitrag: 2.7 },
  { name: "Mercedes-Benz BKK", zusatzbeitrag: 2.85 },
  { name: "mhplus BKK", zusatzbeitrag: 3, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxOTkiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=199" },
  { name: "mkk - meine krankenkasse", zusatzbeitrag: 3.15, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyMTEiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=211" },
  { name: "Mobil Krankenkasse", zusatzbeitrag: 2.95, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyMDEiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=201" },
  { name: "Novitas BKK", zusatzbeitrag: 3.1, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiI5NCIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9" },
  { name: "pronova BKK", zusatzbeitrag: 3.05, antragUrl: "https://www.makleraktiv.de/redirects/antrag.php?kid=219&vid=2000007&legacypdf=1&untervermittler=MAK231011", antragHinweis: "Kein Online Abschluss möglich", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=219" },
  { name: "R+V BKK", zusatzbeitrag: 2.85, antragUrl: "https://www.makleraktiv.de/redirects/antrag.php?kid=303&vid=2000007&legacypdf=1&untervermittler=MAK231011", antragHinweis: "Kein Online Abschluss möglich", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=303" },
  { name: "Salus BKK", zusatzbeitrag: 2.9, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiI3OCIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=078" },
  { name: "SBK Siemens-Betriebskrankenkasse", zusatzbeitrag: 2.8, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxMTEiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D" },
  { name: "securvita BKK", zusatzbeitrag: 3.1, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxMTYiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D" },
  { name: "SKD BKK", zusatzbeitrag: 2.9, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxMTkiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D" },
  { name: "SVLFG", zusatzbeitrag: 2.8 },
  { name: "Südzucker BKK", zusatzbeitrag: 2.85 },
  { name: "TK (Techniker Krankenkasse)", zusatzbeitrag: 2.69, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIyMiIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=022" },
  { name: "TUI BKK", zusatzbeitrag: 2.95, highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=271" },
  { name: "VIACTIV Krankenkasse", zusatzbeitrag: 3.2, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIzMiIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=032" },
  { name: "vivida bkk", zusatzbeitrag: 3, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIxMTUiLCJ0IjoiZSIsInUiOiJNQUsyMzEwMTEifQ%3D%3D", highlightblattUrl: "https://www.makleraktiv.de/?action=getHighlightPDF&kid=115" },
  { name: "WMF BKK", zusatzbeitrag: 2.8, antragUrl: "https://www.makleraktiv.de/ea/eyJ2IjoiMjAwMDAwNyIsImsiOiIzMCIsInQiOiJlIiwidSI6Ik1BSzIzMTAxMSJ9" },
];
export const ANDERE_KASSE = "Andere Krankenkasse";

export function formatProzent(value: number): string {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
}

export type GkvBeitrag = {
  beitragspflichtig: number;
  anGkv: number;
  agGkv: number;
  anPv: number;
  agPv: number;
  anGesamt: number;
  agGesamt: number;
  gesamt: number;
  anGkvSatz: number;
  anPvSatz: number;
  jahresgehalt: number;
  ueberJaeg: boolean;
  amBbgGedeckelt: boolean;
  kinderlosenzuschlagPflichtig: boolean;
};

export function berechneGkvBeitrag(params: {
  brutto: number;
  alter: number;
  zusatzbeitrag: number;
  hatKinder: boolean;
}): GkvBeitrag {
  const { brutto, alter, zusatzbeitrag, hatKinder } = params;

  const beitragspflichtig = Math.min(brutto, BBG_KV_MONATLICH);
  const anGkvSatz = (GKV_ALLGEMEIN_PROZENT + zusatzbeitrag) / 2;
  const agGkvSatz = (GKV_ALLGEMEIN_PROZENT + zusatzbeitrag) / 2;

  const kinderlosenzuschlagPflichtig =
    !hatKinder && alter >= KINDERLOSENZUSCHLAG_AB_ALTER;
  const anPvSatz =
    PV_ALLGEMEIN_PROZENT / 2 +
    (kinderlosenzuschlagPflichtig ? PV_KINDERLOSENZUSCHLAG_PROZENT : 0);
  const agPvSatz = PV_ALLGEMEIN_PROZENT / 2;

  const anGkv = beitragspflichtig * (anGkvSatz / 100);
  const agGkv = beitragspflichtig * (agGkvSatz / 100);
  const anPv = beitragspflichtig * (anPvSatz / 100);
  const agPv = beitragspflichtig * (agPvSatz / 100);

  const anGesamt = anGkv + anPv;
  const agGesamt = agGkv + agPv;
  const gesamt = anGesamt + agGesamt;

  const jahresgehalt = brutto * 12;
  const ueberJaeg = jahresgehalt > JAEG_JAHR;
  const amBbgGedeckelt = brutto > BBG_KV_MONATLICH;

  return {
    beitragspflichtig,
    anGkv,
    agGkv,
    anPv,
    agPv,
    anGesamt,
    agGesamt,
    gesamt,
    anGkvSatz,
    anPvSatz,
    jahresgehalt,
    ueberJaeg,
    amBbgGedeckelt,
    kinderlosenzuschlagPflichtig,
  };
}
