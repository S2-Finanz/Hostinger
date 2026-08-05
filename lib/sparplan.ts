export type VorabpauschaleEingabe = {
  basiszins: number;
  teilfreistellung: number;
  sparerpauschbetrag: number;
  steuersatz: number;
};

export type SparplanEingabe = {
  einmalbetrag: number;
  sparrate: number;
  dynamik: number;
  kurszuwachs: number;
  ausgabeaufschlag: number;
  verwaltungsgebuehr: number;
  jahre: number;
  vorabpauschale?: VorabpauschaleEingabe;
};

export type SparplanJahr = {
  jahr: number;
  wertJahresanfang: number;
  einzahlung: number;
  ausgabeaufschlag: number;
  wertzuwachs: number;
  verwaltungsgebuehr: number;
  vorabpauschaleSteuer: number;
  wertJahresende: number;
  gewinnKumuliert: number;
};

export type SparplanErgebnis = {
  jahreswerte: SparplanJahr[];
  endwert: number;
  einzahlungenGesamt: number;
  ausgabeaufschlagGesamt: number;
  verwaltungsgebuehrGesamt: number;
  gebuehrenGesamt: number;
  gewinnNachGebuehren: number;
  effektiveRendite: number;
  vorabpauschaleGesamt: number;
  minderungDurchVorabpauschale: number;
};

function irr(cashflows: number[]): number {
  const npv = (rate: number) =>
    cashflows.reduce((summe, cf, index) => summe + cf / Math.pow(1 + rate, index), 0);

  let low = -0.5;
  let high = 0.5;
  for (let i = 0; i < 200; i++) {
    const mitte = (low + high) / 2;
    if (npv(mitte) > 0) low = mitte;
    else high = mitte;
  }
  return (low + high) / 2;
}

function simuliere(
  eingabe: SparplanEingabe,
  vorabpauschaleAnwenden: boolean,
): Omit<SparplanErgebnis, "minderungDurchVorabpauschale"> {
  const {
    einmalbetrag,
    sparrate,
    dynamik,
    kurszuwachs,
    ausgabeaufschlag,
    verwaltungsgebuehr,
    jahre,
    vorabpauschale,
  } = eingabe;

  const monatlicherKurszuwachs = Math.pow(1 + kurszuwachs / 100, 1 / 12) - 1;
  const monatlicheVerwaltungsgebuehr = Math.pow(1 + verwaltungsgebuehr / 100, 1 / 12) - 1;
  const aufschlagFaktor = 1 + ausgabeaufschlag / 100;
  const jahresfaktorBestand =
    Math.pow((1 + monatlicherKurszuwachs) * (1 - monatlicheVerwaltungsgebuehr), 12) - 1;

  let balance = 0;
  const monatlicheCashflows: number[] = [];

  if (einmalbetrag > 0) {
    const netto = einmalbetrag / aufschlagFaktor;
    balance += netto;
    monatlicheCashflows.push(-einmalbetrag);
  } else {
    monatlicheCashflows.push(0);
  }

  const jahreswerte: SparplanJahr[] = [];
  let einzahlungenGesamt = einmalbetrag;
  let ausgabeaufschlagGesamt = einmalbetrag - einmalbetrag / aufschlagFaktor;
  let verwaltungsgebuehrGesamt = 0;
  let vorabpauschaleGesamt = 0;
  let laufendEingezahlt = einmalbetrag;

  for (let jahr = 1; jahr <= jahre; jahr++) {
    const rateDiesesJahr = sparrate * Math.pow(1 + dynamik / 100, jahr - 1);
    const wertJahresanfang = balance;
    let jahrEinzahlung = 0;
    let jahrAufschlag = 0;
    let jahrWertzuwachs = 0;
    let jahrVerwaltungsgebuehr = 0;

    for (let monat = 0; monat < 12; monat++) {
      const netto = rateDiesesJahr / aufschlagFaktor;
      const aufschlagBetrag = rateDiesesJahr - netto;
      balance += netto;
      jahrEinzahlung += rateDiesesJahr;
      jahrAufschlag += aufschlagBetrag;

      const wertzuwachs = balance * monatlicherKurszuwachs;
      balance += wertzuwachs;
      jahrWertzuwachs += wertzuwachs;

      const gebuehr = balance * monatlicheVerwaltungsgebuehr;
      balance -= gebuehr;
      jahrVerwaltungsgebuehr += gebuehr;

      monatlicheCashflows.push(-rateDiesesJahr);
    }

    let jahrVorabpauschaleSteuer = 0;
    if (vorabpauschaleAnwenden && vorabpauschale) {
      const basisertrag = wertJahresanfang * (vorabpauschale.basiszins / 100) * 0.7;
      const wertsteigerungBestand = wertJahresanfang * jahresfaktorBestand;
      const bemessungsgrundlage = Math.max(0, Math.min(basisertrag, wertsteigerungBestand));
      const steuerpflichtigerAnteil =
        bemessungsgrundlage * (1 - vorabpauschale.teilfreistellung / 100);
      const nachFreibetrag = Math.max(
        0,
        steuerpflichtigerAnteil - vorabpauschale.sparerpauschbetrag,
      );
      jahrVorabpauschaleSteuer = nachFreibetrag * (vorabpauschale.steuersatz / 100);
      balance -= jahrVorabpauschaleSteuer;
    }

    einzahlungenGesamt += jahrEinzahlung;
    ausgabeaufschlagGesamt += jahrAufschlag;
    verwaltungsgebuehrGesamt += jahrVerwaltungsgebuehr;
    vorabpauschaleGesamt += jahrVorabpauschaleSteuer;
    laufendEingezahlt += jahrEinzahlung;

    jahreswerte.push({
      jahr,
      wertJahresanfang,
      einzahlung: jahrEinzahlung,
      ausgabeaufschlag: jahrAufschlag,
      wertzuwachs: jahrWertzuwachs,
      verwaltungsgebuehr: jahrVerwaltungsgebuehr,
      vorabpauschaleSteuer: jahrVorabpauschaleSteuer,
      wertJahresende: balance,
      gewinnKumuliert: balance - laufendEingezahlt,
    });
  }

  const endwert = balance;
  monatlicheCashflows[monatlicheCashflows.length - 1] += endwert;
  const monatlicheIrr = irr(monatlicheCashflows);
  const effektiveRendite = (Math.pow(1 + monatlicheIrr, 12) - 1) * 100;

  return {
    jahreswerte,
    endwert,
    einzahlungenGesamt,
    ausgabeaufschlagGesamt,
    verwaltungsgebuehrGesamt,
    gebuehrenGesamt: ausgabeaufschlagGesamt + verwaltungsgebuehrGesamt,
    gewinnNachGebuehren: endwert - einzahlungenGesamt,
    effektiveRendite,
    vorabpauschaleGesamt,
  };
}

export function berechneSparplan(eingabe: SparplanEingabe): SparplanErgebnis {
  const mitVorabpauschale = simuliere(eingabe, true);

  let minderungDurchVorabpauschale = 0;
  if (eingabe.vorabpauschale) {
    const ohneVorabpauschale = simuliere(eingabe, false);
    minderungDurchVorabpauschale = ohneVorabpauschale.endwert - mitVorabpauschale.endwert;
  }

  return { ...mitVorabpauschale, minderungDurchVorabpauschale };
}
