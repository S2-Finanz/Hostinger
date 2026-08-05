// Lustige Vergleichswerte zur Einordnung von Wahrscheinlichkeiten – 100
// Todesursachen mit grober Lebenszeit-Wahrscheinlichkeit (Format "1 : X"),
// vom Mandanten als Tabelle bereitgestellt. Grobe, kursierende Schätzungen
// zur Veranschaulichung, keine wissenschaftlich geprüfte Quelle, keine
// Tatsachenbehauptung.

export type Todesursache = {
  platz: number;
  kategorie: string;
  name: string;
  nenner: number; // X in "1 : X"
};

export const TODESURSACHEN: Todesursache[] = [
  { platz: 1, kategorie: "Die alltäglichen Risiken", name: "Herzkreislauferkrankungen (z.B. Herzinfarkt)", nenner: 6 },
  { platz: 2, kategorie: "Die alltäglichen Risiken", name: "Krebserkrankungen", nenner: 7 },
  { platz: 3, kategorie: "Die alltäglichen Risiken", name: "Atemwegserkrankungen (z.B. COPD)", nenner: 15 },
  { platz: 4, kategorie: "Die alltäglichen Risiken", name: "Schlaganfall", nenner: 25 },
  { platz: 5, kategorie: "Die alltäglichen Risiken", name: "Alzheimer und Demenz", nenner: 30 },
  { platz: 6, kategorie: "Die alltäglichen Risiken", name: "Lungenentzündung", nenner: 45 },
  { platz: 7, kategorie: "Die alltäglichen Risiken", name: "Diabetes-Komplikationen", nenner: 55 },
  { platz: 8, kategorie: "Die alltäglichen Risiken", name: "Nierenversagen", nenner: 65 },
  { platz: 9, kategorie: "Die alltäglichen Risiken", name: "Lebererkrankungen", nenner: 80 },
  { platz: 10, kategorie: "Die alltäglichen Risiken", name: "Blutvergiftung (Sepsis)", nenner: 95 },
  { platz: 11, kategorie: "Häufige Unfälle und weitere Erkrankungen", name: "Tödlicher Sturz (insb. im Alter)", nenner: 110 },
  { platz: 12, kategorie: "Häufige Unfälle und weitere Erkrankungen", name: "Suizid", nenner: 120 },
  { platz: 13, kategorie: "Häufige Unfälle und weitere Erkrankungen", name: "Verkehrsunfall (Auto)", nenner: 250 },
  { platz: 14, kategorie: "Häufige Unfälle und weitere Erkrankungen", name: "Parkinson-Krankheit", nenner: 300 },
  { platz: 15, kategorie: "Häufige Unfälle und weitere Erkrankungen", name: "Unbeabsichtigte Vergiftung (Medikamente)", nenner: 400 },
  { platz: 16, kategorie: "Häufige Unfälle und weitere Erkrankungen", name: "Erstickung (an Nahrungsmitteln)", nenner: 600 },
  { platz: 17, kategorie: "Häufige Unfälle und weitere Erkrankungen", name: "Fußgänger im Straßenverkehr", nenner: 750 },
  { platz: 18, kategorie: "Häufige Unfälle und weitere Erkrankungen", name: "Motorradunfall", nenner: 800 },
  { platz: 19, kategorie: "Häufige Unfälle und weitere Erkrankungen", name: "Ertrinken", nenner: 1100 },
  { platz: 20, kategorie: "Häufige Unfälle und weitere Erkrankungen", name: "Fahrradunfall", nenner: 1300 },
  { platz: 21, kategorie: "Seltenere Vorfälle", name: "Brand oder Rauchvergiftung", nenner: 1500 },
  { platz: 22, kategorie: "Seltenere Vorfälle", name: "Hautkrebs (Melanom)", nenner: 1800 },
  { platz: 23, kategorie: "Seltenere Vorfälle", name: "Mord oder Totschlag", nenner: 2000 },
  { platz: 24, kategorie: "Seltenere Vorfälle", name: "Sturz von der Treppe", nenner: 2200 },
  { platz: 25, kategorie: "Seltenere Vorfälle", name: "Chirurgische Komplikation/Fehler", nenner: 2500 },
  { platz: 26, kategorie: "Seltenere Vorfälle", name: "Narkosekomplikation", nenner: 3000 },
  { platz: 27, kategorie: "Seltenere Vorfälle", name: "Erfrieren", nenner: 4000 },
  { platz: 28, kategorie: "Seltenere Vorfälle", name: "Hitzschlag", nenner: 5000 },
  { platz: 29, kategorie: "Seltenere Vorfälle", name: "Stromschlag (im Haushalt)", nenner: 6500 },
  { platz: 30, kategorie: "Seltenere Vorfälle", name: "Verkehrsunfall (LKW)", nenner: 7000 },
  { platz: 31, kategorie: "Spezifische und seltene Unfälle", name: "Arbeitsunfall (Industrie/Bau)", nenner: 8500 },
  { platz: 32, kategorie: "Spezifische und seltene Unfälle", name: "Vergiftung durch Haushaltschemikalien", nenner: 10000 },
  { platz: 33, kategorie: "Spezifische und seltene Unfälle", name: "Reitunfall", nenner: 12000 },
  { platz: 34, kategorie: "Spezifische und seltene Unfälle", name: "Traktor- oder Landwirtschaftsunfall", nenner: 15000 },
  { platz: 35, kategorie: "Spezifische und seltene Unfälle", name: "Zugunfall (als Passagier)", nenner: 20000 },
  { platz: 36, kategorie: "Spezifische und seltene Unfälle", name: "Verschlucken von Kleinteilen (Kinder)", nenner: 25000 },
  { platz: 37, kategorie: "Spezifische und seltene Unfälle", name: "Kohlenmonoxidvergiftung (Defekte Heizung)", nenner: 30000 },
  { platz: 38, kategorie: "Spezifische und seltene Unfälle", name: "Allergischer Schock (Insektenstich)", nenner: 45000 },
  { platz: 39, kategorie: "Spezifische und seltene Unfälle", name: "Schusswaffenunfall (Jagd/Sport)", nenner: 55000 },
  { platz: 40, kategorie: "Spezifische und seltene Unfälle", name: "Flugzeugabsturz (Privatflugzeug/Segelflieger)", nenner: 65000 },
  { platz: 41, kategorie: "Sehr seltene Unfälle", name: "Verbluten nach Schnittverletzung (Haushalt)", nenner: 75000 },
  { platz: 42, kategorie: "Sehr seltene Unfälle", name: "E-Scooter-Unfall", nenner: 85000 },
  { platz: 43, kategorie: "Sehr seltene Unfälle", name: "Biss oder Angriff eines Hundes", nenner: 100000 },
  { platz: 44, kategorie: "Sehr seltene Unfälle", name: "Lawinenabgang (im Skiurlaub)", nenner: 120000 },
  { platz: 45, kategorie: "Sehr seltene Unfälle", name: "Bootsunfall (Sportboot/Kanu)", nenner: 150000 },
  { platz: 46, kategorie: "Sehr seltene Unfälle", name: "Absturz beim Bergsteigen/Wandern", nenner: 180000 },
  { platz: 47, kategorie: "Sehr seltene Unfälle", name: "Vergiftung durch Pilze (selbst gesammelt)", nenner: 200000 },
  { platz: 48, kategorie: "Sehr seltene Unfälle", name: "Skiunfall (Kollision mit Baum/Fels)", nenner: 250000 },
  { platz: 49, kategorie: "Sehr seltene Unfälle", name: "Tod durch fallenden Baum (Sturm)", nenner: 300000 },
  { platz: 50, kategorie: "Sehr seltene Unfälle", name: "Tauchunfall", nenner: 350000 },
  { platz: 51, kategorie: "Statistische Ausreißer", name: "Plötzlicher Herztod beim Marathonlauf", nenner: 400000 },
  { platz: 52, kategorie: "Statistische Ausreißer", name: "Blitzschlag (im Freien)", nenner: 500000 },
  { platz: 53, kategorie: "Statistische Ausreißer", name: "Tod durch ein Wildschwein", nenner: 650000 },
  { platz: 54, kategorie: "Statistische Ausreißer", name: "Tod durch eine Kuh (Wanderung in den Alpen)", nenner: 800000 },
  { platz: 55, kategorie: "Statistische Ausreißer", name: "Fahrstuhlabsturz", nenner: 1000000 },
  { platz: 56, kategorie: "Statistische Ausreißer", name: "Ersticken an einem Luftballon (Kinder)", nenner: 1200000 },
  { platz: 57, kategorie: "Statistische Ausreißer", name: "Tetanus-Infektion (Wundstarrkrampf in DE)", nenner: 1500000 },
  { platz: 58, kategorie: "Statistische Ausreißer", name: "Tollwut (durch Fledermäuse in DE)", nenner: 1800000 },
  { platz: 59, kategorie: "Statistische Ausreißer", name: "Flugzeugabsturz (kommerzieller Linienflug)", nenner: 2000000 },
  { platz: 60, kategorie: "Statistische Ausreißer", name: "Tod im Solarium (Hitzeschock/Kreislauf)", nenner: 2500000 },
  { platz: 61, kategorie: "Extreme Seltenheiten", name: "Terroranschlag (in Deutschland)", nenner: 3000000 },
  { platz: 62, kategorie: "Extreme Seltenheiten", name: "Herabfallender Dachziegel", nenner: 3500000 },
  { platz: 63, kategorie: "Extreme Seltenheiten", name: "Herabfallender Eiszapfen", nenner: 4000000 },
  { platz: 64, kategorie: "Extreme Seltenheiten", name: "Schlangenbiss (Kreuzotter in DE)", nenner: 5000000 },
  { platz: 65, kategorie: "Extreme Seltenheiten", name: "Allergischer Schock durch Nüsse (unentdeckt)", nenner: 6000000 },
  { platz: 66, kategorie: "Extreme Seltenheiten", name: "Haiangriff (im Auslandssurlaub)", nenner: 7500000 },
  { platz: 67, kategorie: "Extreme Seltenheiten", name: "Tod durch eine herabfallende Kokosnuss (Urlaub)", nenner: 10000000 },
  { platz: 68, kategorie: "Extreme Seltenheiten", name: "Krokodilangriff (Urlaub)", nenner: 12000000 },
  { platz: 69, kategorie: "Extreme Seltenheiten", name: "Vergiftung durch giftige Zimmerpflanze", nenner: 15000000 },
  { platz: 70, kategorie: "Extreme Seltenheiten", name: "Von einem Golfball am Kopf getroffen werden", nenner: 18000000 },
  { platz: 71, kategorie: "Bizarre Unfälle", name: "Riesenrad- oder Achterbahn-Defekt", nenner: 20000000 },
  { platz: 72, kategorie: "Bizarre Unfälle", name: "Von einem Gabelstapler überfahren werden", nenner: 25000000 },
  { platz: 73, kategorie: "Bizarre Unfälle", name: "Tod durch explodierenden Reifen (LKW)", nenner: 30000000 },
  { platz: 74, kategorie: "Bizarre Unfälle", name: "Ersticken an einem Zahnstocher", nenner: 35000000 },
  { platz: 75, kategorie: "Bizarre Unfälle", name: "Tod in einer brennenden Sauna", nenner: 40000000 },
  { platz: 76, kategorie: "Bizarre Unfälle", name: "Tod durch eine umkippende Statue/Denkmal", nenner: 45000000 },
  { platz: 77, kategorie: "Bizarre Unfälle", name: "Tod durch explodierenden Akku (Smartphone/E-Zigarette)", nenner: 50000000 },
  { platz: 78, kategorie: "Bizarre Unfälle", name: "Von einem Aufsitzrasenmäher überrollt werden", nenner: 60000000 },
  { platz: 79, kategorie: "Bizarre Unfälle", name: "Tod durch einen herabfallenden Kronleuchter", nenner: 70000000 },
  { platz: 80, kategorie: "Bizarre Unfälle", name: "Bungee-Jumping-Unfall (gerissenes Seil)", nenner: 80000000 },
  { platz: 81, kategorie: "Nahezu unmögliche Szenarien", name: "Tod durch eine explodierende Kaffeemaschine", nenner: 100000000 },
  { platz: 82, kategorie: "Nahezu unmögliche Szenarien", name: "Ausbruch und Angriff eines Zirkuslöwen in DE", nenner: 120000000 },
  { platz: 83, kategorie: "Nahezu unmögliche Szenarien", name: "In Treibsand versinken", nenner: 150000000 },
  { platz: 84, kategorie: "Nahezu unmögliche Szenarien", name: "Von einem umkippenden Getränkeautomaten erschlagen werden", nenner: 200000000 },
  { platz: 85, kategorie: "Nahezu unmögliche Szenarien", name: "Tod durch einen fliegenden Champagnerkorken", nenner: 250000000 },
  { platz: 86, kategorie: "Nahezu unmögliche Szenarien", name: "Tod durch einen herabfallenden Fernseher", nenner: 300000000 },
  { platz: 87, kategorie: "Nahezu unmögliche Szenarien", name: "Von einer Bowlingkugel tödlich getroffen werden", nenner: 400000000 },
  { platz: 88, kategorie: "Nahezu unmögliche Szenarien", name: "Tod durch ein entgleistes Karussell (Kirmes)", nenner: 500000000 },
  { platz: 89, kategorie: "Nahezu unmögliche Szenarien", name: "Von einem Heißluftballonkorb erdrückt werden", nenner: 750000000 },
  { platz: 90, kategorie: "Nahezu unmögliche Szenarien", name: "Tod durch einen explodierenden Toaster", nenner: 1000000000 },
  { platz: 91, kategorie: "Die absoluten statistischen Anomalien", name: "In einem Weinfass/Bierkessel ertrinken", nenner: 1500000000 },
  { platz: 92, kategorie: "Die absoluten statistischen Anomalien", name: "Sturz aus einem Skilift wegen technischem Komplettversagen", nenner: 2000000000 },
  { platz: 93, kategorie: "Die absoluten statistischen Anomalien", name: "Tod durch Piranhas (im Amazonas-Urlaub)", nenner: 3000000000 },
  { platz: 94, kategorie: "Die absoluten statistischen Anomalien", name: "Von einem Hagelkorn erschlagen werden", nenner: 5000000000 },
  { platz: 95, kategorie: "Die absoluten statistischen Anomalien", name: "Von einem herabfallenden Satellitenteil getroffen werden", nenner: 8000000000 },
  { platz: 96, kategorie: "Die absoluten statistischen Anomalien", name: "Spontane menschliche Selbstentzündung (theoretisch)", nenner: 10000000000 },
  { platz: 97, kategorie: "Die absoluten statistischen Anomalien", name: "Tod durch einen Vulkanausbruch in Deutschland (Eifel)", nenner: 50000000000 },
  { platz: 98, kategorie: "Die absoluten statistischen Anomalien", name: "Von Weltraumschrott direkt am Kopf getroffen werden", nenner: 100000000000 },
  { platz: 99, kategorie: "Die absoluten statistischen Anomalien", name: "Tod durch ein schwarzes Loch / physikalische Anomalie auf der Erde", nenner: 1000000000000 },
  { platz: 100, kategorie: "Die absoluten statistischen Anomalien", name: "Von einem Meteoriten direkt getroffen und getötet werden", nenner: 1600000000000 },
];

const ANZAHL_KANDIDATEN = 5;

export function formatNenner(nenner: number): string {
  return `1 : ${nenner.toLocaleString("de-DE")}`;
}

// Sucht die Todesursachen, deren Wahrscheinlichkeit (auf einer
// logarithmischen Skala) am nächsten an der übergebenen Wahrscheinlichkeit
// liegt, und wählt zufällig eine davon aus – bei jeder Neuberechnung kann
// so ein anderer, aber immer größenordnungsmäßig passender Vergleich
// erscheinen.
export function findeVergleich(wahrscheinlichkeitProzent: number): Todesursache {
  const p = Math.max(wahrscheinlichkeitProzent / 100, 1e-15);
  const logP = Math.log10(p);

  const sortiert = [...TODESURSACHEN].sort((a, b) => {
    const da = Math.abs(-Math.log10(a.nenner) - logP);
    const db = Math.abs(-Math.log10(b.nenner) - logP);
    return da - db;
  });

  const kandidaten = sortiert.slice(0, ANZAHL_KANDIDATEN);
  return kandidaten[Math.floor(Math.random() * kandidaten.length)];
}
