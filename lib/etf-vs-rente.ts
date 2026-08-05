import type { VorabpauschaleEingabe } from "@/lib/sparplan";

export type AuszahlModus = "einmalig" | "entnahmeplan" | "rente";

export type EtfVsRenteEingabe = {
  einmalbetrag: number;
  sparrate: number;
  dynamik: number;
  renditeAnsparphase: number;
  ansparJahre: number;

  depotAusgabeaufschlag: number;
  depotVerwaltungsgebuehr: number;
  depotRebalancingJahre: number;
  vorabpauschale: VorabpauschaleEingabe;

  versicherungAbschlusskosten: number;
  versicherungVerwaltungskosten: number;
  rentenfaktor: number;

  auszahlModus: AuszahlModus;
  renditeAuszahlphase: number;
  alterBeiRentenbeginn: number;
  persoenlicherSteuersatz: number;
  ertragsanteil: number;
  entnahmeplanJahre: number;
  lebenserwartungJahre: number;
};

export type AnsparJahr = {
  jahr: number;
  einzahlung: number;
  kosten: number;
  steuer: number;
  wertJahresende: number;
};

export type AuszahlJahr = {
  jahr: number;
  wertJahresanfang: number;
  auszahlungBrutto: number;
  steuer: number;
  auszahlungNetto: number;
  wertJahresende: number;
};

export type ProduktErgebnis = {
  ansparphase: AnsparJahr[];
  kapitalBeiRentenbeginn: number;
  eingezahltGesamt: number;
  kostenGesamt: number;
  steuerAnsparphaseGesamt: number;
  auszahlphase: AuszahlJahr[];
  monatlicheAuszahlungNetto: number;
  nettoGesamtAuszahlphase: number;
  steuerAuszahlphaseGesamt: number;
};

export type VergleichErgebnis = {
  depot: ProduktErgebnis;
  versicherung: ProduktErgebnis;
  halbeinkuenfteBedingungErfuellt: boolean;
};

function jahresBeitrag(sparrate: number, dynamik: number, jahr: number): number {
  return sparrate * Math.pow(1 + dynamik / 100, jahr - 1);
}

function annuitaetenzahlung(kapital: number, jahresrendite: number, jahre: number): number {
  const r = jahresrendite / 100;
  if (Math.abs(r) < 1e-9) return kapital / jahre;
  return (kapital * r) / (1 - Math.pow(1 + r, -jahre));
}

function berechneDepotAnsparphase(eingabe: EtfVsRenteEingabe) {
  const {
    einmalbetrag,
    sparrate,
    dynamik,
    renditeAnsparphase,
    ansparJahre,
    depotAusgabeaufschlag,
    depotVerwaltungsgebuehr,
    depotRebalancingJahre,
    vorabpauschale,
  } = eingabe;

  const monatlicheRendite = Math.pow(1 + renditeAnsparphase / 100, 1 / 12) - 1;
  const monatlicheVerwaltung = Math.pow(1 + depotVerwaltungsgebuehr / 100, 1 / 12) - 1;
  const aufschlagFaktor = 1 + depotAusgabeaufschlag / 100;
  const jahresfaktorBestand =
    Math.pow((1 + monatlicheRendite) * (1 - monatlicheVerwaltung), 12) - 1;

  let balance = 0;
  let kostenbasis = 0;
  let eingezahltGesamt = 0;
  let kostenGesamt = 0;
  let steuerGesamt = 0;

  if (einmalbetrag > 0) {
    const netto = einmalbetrag / aufschlagFaktor;
    balance += netto;
    kostenbasis += netto;
    eingezahltGesamt += einmalbetrag;
    kostenGesamt += einmalbetrag - netto;
  }

  const jahreswerte: AnsparJahr[] = [];

  for (let jahr = 1; jahr <= ansparJahre; jahr++) {
    const rate = jahresBeitrag(sparrate, dynamik, jahr);
    const wertJahresanfang = balance;
    let jahrEinzahlung = 0;
    let jahrKosten = 0;

    for (let monat = 0; monat < 12; monat++) {
      const netto = rate / aufschlagFaktor;
      const aufschlag = rate - netto;
      balance += netto;
      kostenbasis += netto;
      jahrEinzahlung += rate;
      jahrKosten += aufschlag;

      balance += balance * monatlicheRendite;

      const gebuehr = balance * monatlicheVerwaltung;
      balance -= gebuehr;
      jahrKosten += gebuehr;
    }

    let jahrSteuer = 0;
    let verbleibenderFreibetrag = vorabpauschale.sparerpauschbetrag;

    // Vorabpauschale
    const basisertrag = wertJahresanfang * (vorabpauschale.basiszins / 100) * 0.7;
    const wertsteigerungBestand = wertJahresanfang * jahresfaktorBestand;
    const bemessungsgrundlage = Math.max(0, Math.min(basisertrag, wertsteigerungBestand));
    const steuerpflichtigVorab = bemessungsgrundlage * (1 - vorabpauschale.teilfreistellung / 100);
    const vorabNachFreibetrag = Math.max(0, steuerpflichtigVorab - verbleibenderFreibetrag);
    verbleibenderFreibetrag = Math.max(0, verbleibenderFreibetrag - steuerpflichtigVorab);
    const vorabSteuer = vorabNachFreibetrag * (vorabpauschale.steuersatz / 100);
    balance -= vorabSteuer;
    kostenbasis += bemessungsgrundlage;
    jahrSteuer += vorabSteuer;

    // Rebalancing
    if (depotRebalancingJahre > 0 && jahr % depotRebalancingJahre === 0) {
      const gewinn = Math.max(0, balance - kostenbasis);
      const steuerpflichtig = gewinn * (1 - vorabpauschale.teilfreistellung / 100);
      const nachFreibetrag = Math.max(0, steuerpflichtig - verbleibenderFreibetrag);
      const rebalancingSteuer = nachFreibetrag * (vorabpauschale.steuersatz / 100);
      balance -= rebalancingSteuer;
      kostenbasis = balance;
      jahrSteuer += rebalancingSteuer;
    }

    eingezahltGesamt += jahrEinzahlung;
    kostenGesamt += jahrKosten;
    steuerGesamt += jahrSteuer;

    jahreswerte.push({
      jahr,
      einzahlung: jahrEinzahlung,
      kosten: jahrKosten,
      steuer: jahrSteuer,
      wertJahresende: balance,
    });
  }

  return {
    jahreswerte,
    endkapital: balance,
    kostenbasis,
    eingezahltGesamt,
    kostenGesamt,
    steuerGesamt,
  };
}

function berechneVersicherungAnsparphase(eingabe: EtfVsRenteEingabe) {
  const {
    einmalbetrag,
    sparrate,
    dynamik,
    renditeAnsparphase,
    ansparJahre,
    versicherungAbschlusskosten,
    versicherungVerwaltungskosten,
  } = eingabe;

  const monatlicheRendite = Math.pow(1 + renditeAnsparphase / 100, 1 / 12) - 1;
  const monatlicheVerwaltung = Math.pow(1 + versicherungVerwaltungskosten / 100, 1 / 12) - 1;

  let geplanteBeitragssumme = einmalbetrag;
  for (let jahr = 1; jahr <= ansparJahre; jahr++) {
    geplanteBeitragssumme += jahresBeitrag(sparrate, dynamik, jahr);
  }
  const abschlusskostenGesamt = geplanteBeitragssumme * (versicherungAbschlusskosten / 100);
  const zillmerJahre = Math.min(5, ansparJahre);
  const zillmerMonate = zillmerJahre * 12;
  const abschlusskostenProMonat = zillmerMonate > 0 ? abschlusskostenGesamt / zillmerMonate : 0;

  let balance = 0;
  let eingezahltGesamt = 0;
  let kostenGesamt = 0;
  let monatsZaehler = 0;

  if (einmalbetrag > 0) {
    balance += einmalbetrag;
    eingezahltGesamt += einmalbetrag;
  }

  const jahreswerte: AnsparJahr[] = [];

  for (let jahr = 1; jahr <= ansparJahre; jahr++) {
    const rate = jahresBeitrag(sparrate, dynamik, jahr);
    let jahrEinzahlung = 0;
    let jahrKosten = 0;

    for (let monat = 0; monat < 12; monat++) {
      monatsZaehler++;
      const abschlusskostenAnteil = monatsZaehler <= zillmerMonate ? abschlusskostenProMonat : 0;
      const netto = Math.max(0, rate - abschlusskostenAnteil);
      balance += netto;
      jahrEinzahlung += rate;
      jahrKosten += abschlusskostenAnteil;

      balance += balance * monatlicheRendite;

      const gebuehr = balance * monatlicheVerwaltung;
      balance -= gebuehr;
      jahrKosten += gebuehr;
    }

    eingezahltGesamt += jahrEinzahlung;
    kostenGesamt += jahrKosten;

    jahreswerte.push({
      jahr,
      einzahlung: jahrEinzahlung,
      kosten: jahrKosten,
      steuer: 0,
      wertJahresende: balance,
    });
  }

  return { jahreswerte, endkapital: balance, eingezahltGesamt, kostenGesamt };
}

function berechneDepotAuszahlphase(
  eingabe: EtfVsRenteEingabe,
  kapital: number,
  kostenbasisStart: number,
): { jahreswerte: AuszahlJahr[]; monatlicheAuszahlung: number } {
  const { auszahlModus, renditeAuszahlphase, vorabpauschale } = eingabe;
  const monatlicheRendite = Math.pow(1 + renditeAuszahlphase / 100, 1 / 12) - 1;

  const gewinnAnteil = () => (balance > 0 ? Math.max(0, balance - kostenbasis) / balance : 0);

  let balance = kapital;
  let kostenbasis = kostenbasisStart;
  const jahreswerte: AuszahlJahr[] = [];

  if (auszahlModus === "einmalig") {
    const gewinn = Math.max(0, balance - kostenbasis);
    const steuerpflichtig = gewinn * (1 - vorabpauschale.teilfreistellung / 100);
    const nachFreibetrag = Math.max(0, steuerpflichtig - vorabpauschale.sparerpauschbetrag);
    const steuer = nachFreibetrag * (vorabpauschale.steuersatz / 100);
    const netto = balance - steuer;
    jahreswerte.push({
      jahr: 1,
      wertJahresanfang: balance,
      auszahlungBrutto: balance,
      steuer,
      auszahlungNetto: netto,
      wertJahresende: 0,
    });
    return { jahreswerte, monatlicheAuszahlung: netto };
  }

  const jahre = auszahlModus === "entnahmeplan" ? eingabe.entnahmeplanJahre : eingabe.lebenserwartungJahre;
  const jahresAuszahlung = annuitaetenzahlung(balance, renditeAuszahlphase, jahre);
  const monatsAuszahlung = jahresAuszahlung / 12;

  for (let jahr = 1; jahr <= jahre; jahr++) {
    const wertJahresanfang = balance;
    let jahrAuszahlungBrutto = 0;
    let jahrSteuer = 0;
    let verbleibenderFreibetrag = vorabpauschale.sparerpauschbetrag;

    for (let monat = 0; monat < 12; monat++) {
      balance += balance * monatlicheRendite;
      const auszahlung = Math.min(monatsAuszahlung, Math.max(0, balance));
      const anteilGewinn = gewinnAnteil();
      const gewinnDieserAuszahlung = auszahlung * anteilGewinn;
      const steuerpflichtig = gewinnDieserAuszahlung * (1 - vorabpauschale.teilfreistellung / 100);
      const nachFreibetrag = Math.max(0, steuerpflichtig - verbleibenderFreibetrag);
      verbleibenderFreibetrag = Math.max(0, verbleibenderFreibetrag - steuerpflichtig);
      const steuer = nachFreibetrag * (vorabpauschale.steuersatz / 100);

      kostenbasis -= auszahlung - gewinnDieserAuszahlung;
      balance -= auszahlung;

      jahrAuszahlungBrutto += auszahlung;
      jahrSteuer += steuer;
    }

    jahreswerte.push({
      jahr,
      wertJahresanfang,
      auszahlungBrutto: jahrAuszahlungBrutto,
      steuer: jahrSteuer,
      auszahlungNetto: jahrAuszahlungBrutto - jahrSteuer,
      wertJahresende: Math.max(0, balance),
    });
  }

  const nettoGesamt = jahreswerte.reduce((summe, z) => summe + z.auszahlungNetto, 0);
  const monatlicheAuszahlungNetto = nettoGesamt / (jahre * 12);

  return { jahreswerte, monatlicheAuszahlung: monatlicheAuszahlungNetto };
}

function berechneVersicherungAuszahlphase(
  eingabe: EtfVsRenteEingabe,
  kapital: number,
  eingezahltGesamt: number,
  halbeinkuenfteErfuellt: boolean,
): { jahreswerte: AuszahlJahr[]; monatlicheAuszahlung: number } {
  const { auszahlModus, renditeAuszahlphase, persoenlicherSteuersatz, ertragsanteil, rentenfaktor } =
    eingabe;

  const gesamtGewinn = Math.max(0, kapital - eingezahltGesamt);
  const gewinnquote = kapital > 0 ? gesamtGewinn / kapital : 0;

  if (auszahlModus === "einmalig") {
    const steuerpflichtig = halbeinkuenfteErfuellt ? gesamtGewinn * 0.5 : gesamtGewinn;
    const steuer = steuerpflichtig * (persoenlicherSteuersatz / 100);
    const netto = kapital - steuer;
    return {
      jahreswerte: [
        {
          jahr: 1,
          wertJahresanfang: kapital,
          auszahlungBrutto: kapital,
          steuer,
          auszahlungNetto: netto,
          wertJahresende: 0,
        },
      ],
      monatlicheAuszahlung: netto,
    };
  }

  if (auszahlModus === "rente") {
    const monatsRente = (kapital / 10000) * rentenfaktor;
    const steuerProMonat = monatsRente * (ertragsanteil / 100) * (persoenlicherSteuersatz / 100);
    const nettoProMonat = monatsRente - steuerProMonat;
    const jahreswerte: AuszahlJahr[] = [];
    for (let jahr = 1; jahr <= eingabe.lebenserwartungJahre; jahr++) {
      jahreswerte.push({
        jahr,
        wertJahresanfang: 0,
        auszahlungBrutto: monatsRente * 12,
        steuer: steuerProMonat * 12,
        auszahlungNetto: nettoProMonat * 12,
        wertJahresende: 0,
      });
    }
    return { jahreswerte, monatlicheAuszahlung: nettoProMonat };
  }

  // Entnahmeplan: fixe Restlaufzeit, Kapital wächst weiter, anteilige Besteuerung des Gewinnanteils
  const monatlicheRendite = Math.pow(1 + renditeAuszahlphase / 100, 1 / 12) - 1;
  let balance = kapital;
  const jahre = eingabe.entnahmeplanJahre;
  const jahresAuszahlung = annuitaetenzahlung(balance, renditeAuszahlphase, jahre);
  const monatsAuszahlung = jahresAuszahlung / 12;
  const jahreswerte: AuszahlJahr[] = [];

  for (let jahr = 1; jahr <= jahre; jahr++) {
    const wertJahresanfang = balance;
    let jahrAuszahlungBrutto = 0;
    let jahrSteuer = 0;

    for (let monat = 0; monat < 12; monat++) {
      balance += balance * monatlicheRendite;
      const auszahlung = Math.min(monatsAuszahlung, Math.max(0, balance));
      const gewinnDieserAuszahlung = auszahlung * gewinnquote;
      const steuerpflichtig = halbeinkuenfteErfuellt
        ? gewinnDieserAuszahlung * 0.5
        : gewinnDieserAuszahlung;
      const steuer = steuerpflichtig * (persoenlicherSteuersatz / 100);
      balance -= auszahlung;
      jahrAuszahlungBrutto += auszahlung;
      jahrSteuer += steuer;
    }

    jahreswerte.push({
      jahr,
      wertJahresanfang,
      auszahlungBrutto: jahrAuszahlungBrutto,
      steuer: jahrSteuer,
      auszahlungNetto: jahrAuszahlungBrutto - jahrSteuer,
      wertJahresende: Math.max(0, balance),
    });
  }

  const nettoGesamt = jahreswerte.reduce((summe, z) => summe + z.auszahlungNetto, 0);
  const monatlicheAuszahlungNetto = nettoGesamt / (jahre * 12);

  return { jahreswerte, monatlicheAuszahlung: monatlicheAuszahlungNetto };
}

export function berechneEtfVsRente(eingabe: EtfVsRenteEingabe): VergleichErgebnis {
  const halbeinkuenfteBedingungErfuellt =
    eingabe.alterBeiRentenbeginn >= 62 && eingabe.ansparJahre >= 12;

  const depotAnspar = berechneDepotAnsparphase(eingabe);
  const depotAuszahl = berechneDepotAuszahlphase(
    eingabe,
    depotAnspar.endkapital,
    depotAnspar.kostenbasis,
  );

  const versAnspar = berechneVersicherungAnsparphase(eingabe);
  const versAuszahl = berechneVersicherungAuszahlphase(
    eingabe,
    versAnspar.endkapital,
    versAnspar.eingezahltGesamt,
    halbeinkuenfteBedingungErfuellt,
  );

  const depot: ProduktErgebnis = {
    ansparphase: depotAnspar.jahreswerte,
    kapitalBeiRentenbeginn: depotAnspar.endkapital,
    eingezahltGesamt: depotAnspar.eingezahltGesamt,
    kostenGesamt: depotAnspar.kostenGesamt,
    steuerAnsparphaseGesamt: depotAnspar.steuerGesamt,
    auszahlphase: depotAuszahl.jahreswerte,
    monatlicheAuszahlungNetto: depotAuszahl.monatlicheAuszahlung,
    nettoGesamtAuszahlphase: depotAuszahl.jahreswerte.reduce(
      (summe, z) => summe + z.auszahlungNetto,
      0,
    ),
    steuerAuszahlphaseGesamt: depotAuszahl.jahreswerte.reduce((summe, z) => summe + z.steuer, 0),
  };

  const versicherung: ProduktErgebnis = {
    ansparphase: versAnspar.jahreswerte,
    kapitalBeiRentenbeginn: versAnspar.endkapital,
    eingezahltGesamt: versAnspar.eingezahltGesamt,
    kostenGesamt: versAnspar.kostenGesamt,
    steuerAnsparphaseGesamt: 0,
    auszahlphase: versAuszahl.jahreswerte,
    monatlicheAuszahlungNetto: versAuszahl.monatlicheAuszahlung,
    nettoGesamtAuszahlphase: versAuszahl.jahreswerte.reduce(
      (summe, z) => summe + z.auszahlungNetto,
      0,
    ),
    steuerAuszahlphaseGesamt: versAuszahl.jahreswerte.reduce((summe, z) => summe + z.steuer, 0),
  };

  return { depot, versicherung, halbeinkuenfteBedingungErfuellt };
}
