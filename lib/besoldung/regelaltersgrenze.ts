// Regelaltersgrenze für Beamtinnen und Beamte: schrittweise Anhebung von 65
// auf 67 Jahre, analog zur gesetzlichen Rentenversicherung (RV-Altersgrenzen-
// anpassungsgesetz 2007), von den meisten Landesbeamtenversorgungsgesetzen
// wortgleich übernommen. Für Geburtsjahrgänge 1947–1958 steigt die Grenze um
// 1 Monat pro Jahrgang, für 1959–1963 um 2 Monate pro Jahrgang, ab 1964
// gilt einheitlich 67 Jahre.
export function regelaltersgrenzeMonate(geburtsjahr: number): number {
  let monate = 65 * 12;
  if (geburtsjahr > 1946) {
    if (geburtsjahr <= 1958) {
      monate += Math.min(geburtsjahr - 1946, 12);
    } else {
      monate += 12 + Math.min((geburtsjahr - 1958) * 2, 12);
    }
  }
  return monate;
}

export function regelaltersgrenze(geburtsjahr: number): {
  jahre: number;
  monate: number;
} {
  const total = regelaltersgrenzeMonate(geburtsjahr);
  return { jahre: Math.floor(total / 12), monate: total % 12 };
}
