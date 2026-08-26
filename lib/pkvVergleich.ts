import {
  GKV_ALLGEMEIN_PROZENT,
  PV_ALLGEMEIN_PROZENT,
  KRANKENKASSEN,
  berechneGkvBeitrag,
} from "@/lib/gkv";

// Alter, ab dem der gesetzliche 10 %-Zuschlag (§ 149 VAG) nicht mehr erhoben
// wird und stattdessen zur Beitragsminderung verwendet werden kann. Gesetzlich
// fest, unabhängig vom individuellen Renteneintrittsalter.
const ALTER_ZUSCHLAG_ENDE = 60;

export type Anstellung = "angestellt" | "selbststaendig";

export type PkvVergleichInput = {
  bezeichnung: string;
  aktuellesAlter: number;
  anstellung: Anstellung;
  renteneintrittsalter: number;
  grenzsteuersatz: number;

  bruttoMonatlich: number;
  krankenkasseName: string;
  hatKinder: boolean;
  gkvSteigerungProzent: number;

  pkvGesellschaft: string;
  pkvTarifbezeichnung: string;
  pkvHaupttarif: number;
  pkvKrankentagegeld: number;
  pkvSonstige: number;
  pkvPflege: number;
  pkvGesetzlicherZuschlag: number;
  pkvSteigerungProzent: number;

  beVorhanden: boolean;
  bePraemieHeute: number;
  beZielbetragHeute: number;
  beAuszahlungsalter: number;

  gesetzlicheRenteMonatlich: number;
  bavRenteMonatlich: number;

  reInvestSparbetrag: number;
  reInvestRenteMonatlich: number;
};

export const PKV_VERGLEICH_DEFAULT: PkvVergleichInput = {
  bezeichnung: "",
  aktuellesAlter: 36,
  anstellung: "angestellt",
  renteneintrittsalter: 67,
  grenzsteuersatz: 42,

  bruttoMonatlich: 5500,
  krankenkasseName: KRANKENKASSEN[0]?.name ?? "",
  hatKinder: false,
  gkvSteigerungProzent: 3.2,

  pkvGesellschaft: "",
  pkvTarifbezeichnung: "",
  pkvHaupttarif: 0,
  pkvKrankentagegeld: 0,
  pkvSonstige: 0,
  pkvPflege: 0,
  pkvGesetzlicherZuschlag: 0,
  pkvSteigerungProzent: 2.8,

  beVorhanden: false,
  bePraemieHeute: 0,
  beZielbetragHeute: 0,
  beAuszahlungsalter: 65,

  gesetzlicheRenteMonatlich: 0,
  bavRenteMonatlich: 0,

  reInvestSparbetrag: 0,
  reInvestRenteMonatlich: 0,
};

export type JahresDatenpunkt = {
  jahr: number;
  alter: number;
  gkvEigen: number;
  pkvEigen: number;
  ersparnisNetto: number;
};

export type PkvVergleichErgebnis = {
  heute: {
    gkvEigen: number;
    pkvEigenKv: number;
    pkvEigenPv: number;
    pkvEigenGesamt: number;
    gkvNetto: number;
    pkvNetto: number;
    ersparnisNetto: number;
  };
  verlauf: JahresDatenpunkt[];
  renteneintritt: {
    gkv: {
      beitragAufRente: number;
      beitragAufBav: number;
      pvAufRente: number;
      pvAufBav: number;
      gesamt: number;
    };
    pkv: {
      basisVoll: number;
      abzglZuschlag: number;
      abzglBe: number;
      abzglGrvZuschussKv: number;
      abzglGrvZuschussPv: number;
      abzglReInvestRente: number;
      pflegeVoll: number;
      gesamt: number;
    };
  };
};

// Beitragsentlastung wächst alle 5 Jahre um 10 %, danach jeweils auf die
// nächsten vollen 5 € aufgerundet. Kein Deckel -- läuft so lange weiter, wie
// Jahre bis zum Auszahlungsbeginn vergehen.
export function beitragsentlastungWert(
  basiswert: number,
  jahreBisAuszahlung: number,
): number {
  const schritte = Math.max(0, Math.floor(jahreBisAuszahlung / 5));
  let wert = basiswert;
  for (let i = 0; i < schritte; i++) {
    // Minimale Toleranz gegen Floating-Point-Rundungsrauschen (z. B. 495
    // statt exakt 495 durch 450*1.1), damit nicht unnötig auf den nächsten
    // 5-€-Schritt aufgerundet wird.
    wert = Math.ceil((wert * 1.1 - 1e-6) / 5) * 5;
  }
  return wert;
}

function eigenanteilFaktor(anstellung: Anstellung): number {
  return anstellung === "angestellt" ? 0.5 : 1;
}

// 80 % des PKV-Beitrags gelten als steuerlich absetzbar, 20 % nicht.
function pkvNettoFaktor(grenzsteuersatzProzent: number): number {
  return 1 - 0.8 * (grenzsteuersatzProzent / 100);
}

function gkvNettoFaktor(grenzsteuersatzProzent: number): number {
  return 1 - grenzsteuersatzProzent / 100;
}

export function berechnePkvVergleich(
  input: PkvVergleichInput,
): PkvVergleichErgebnis {
  const kasse = KRANKENKASSEN.find((k) => k.name === input.krankenkasseName);
  const zusatzbeitrag = kasse?.zusatzbeitrag ?? 0;
  const faktor = eigenanteilFaktor(input.anstellung);
  const steuersatz = input.grenzsteuersatz;

  // --- Heute ---
  const gkvHeute = berechneGkvBeitrag({
    brutto: input.bruttoMonatlich,
    alter: input.aktuellesAlter,
    zusatzbeitrag,
    hatKinder: input.hatKinder,
  });
  const gkvEigenHeute =
    input.anstellung === "angestellt" ? gkvHeute.anGesamt : gkvHeute.gesamt;

  const pkvKvBasisVollHeute =
    input.pkvHaupttarif +
    input.pkvKrankentagegeld +
    input.pkvSonstige +
    input.pkvGesetzlicherZuschlag +
    (input.beVorhanden ? input.bePraemieHeute : 0);
  const pkvKvEigenHeute = pkvKvBasisVollHeute * faktor;
  const pkvPvEigenHeute = input.pkvPflege * faktor;
  const pkvEigenGesamtHeute = pkvKvEigenHeute + pkvPvEigenHeute;

  const gkvNettoHeute = gkvEigenHeute * gkvNettoFaktor(steuersatz);
  const pkvNettoHeute = pkvEigenGesamtHeute * pkvNettoFaktor(steuersatz);

  // --- Jahr-für-Jahr-Verlauf bis Renteneintritt ---
  const jahreBisRente = Math.max(
    0,
    input.renteneintrittsalter - input.aktuellesAlter,
  );
  const heuteJahr = new Date().getFullYear();
  const verlauf: JahresDatenpunkt[] = [];

  for (let j = 0; j <= jahreBisRente; j++) {
    const gkvWachstum = Math.pow(1 + input.gkvSteigerungProzent / 100, j);
    const pkvWachstum = Math.pow(1 + input.pkvSteigerungProzent / 100, j);

    const gkvEigen = gkvEigenHeute * gkvWachstum;

    const pkvKvBasisVoll =
      (input.pkvHaupttarif +
        input.pkvKrankentagegeld +
        input.pkvSonstige +
        input.pkvGesetzlicherZuschlag) *
      pkvWachstum;
    const bePraemie = input.beVorhanden
      ? beitragsentlastungWert(
          input.bePraemieHeute,
          Math.min(j, input.beAuszahlungsalter - input.aktuellesAlter),
        )
      : 0;
    const pkvKvEigen = (pkvKvBasisVoll + bePraemie) * faktor;
    const pkvPvEigen = input.pkvPflege * pkvWachstum * faktor;
    const pkvEigen = pkvKvEigen + pkvPvEigen;

    verlauf.push({
      jahr: heuteJahr + j,
      alter: input.aktuellesAlter + j,
      gkvEigen,
      pkvEigen,
      ersparnisNetto:
        gkvEigen * gkvNettoFaktor(steuersatz) -
        pkvEigen * pkvNettoFaktor(steuersatz),
    });
  }

  // --- Beitrag zum Renteneintritt ---
  const kvSatzAnteil = (GKV_ALLGEMEIN_PROZENT + zusatzbeitrag) / 2 / 100;
  const kvSatzVoll = (GKV_ALLGEMEIN_PROZENT + zusatzbeitrag) / 100;
  const pvSatzAnteil = PV_ALLGEMEIN_PROZENT / 2 / 100;
  const pvSatzVoll = PV_ALLGEMEIN_PROZENT / 100;

  const beitragAufRente = input.gesetzlicheRenteMonatlich * kvSatzAnteil;
  const beitragAufBav = input.bavRenteMonatlich * kvSatzVoll;
  const pvAufRente = input.gesetzlicheRenteMonatlich * pvSatzAnteil;
  const pvAufBav = input.bavRenteMonatlich * pvSatzVoll;
  const gkvGesamtRente = beitragAufRente + beitragAufBav + pvAufRente + pvAufBav;

  const pkvWachstumBisRente = Math.pow(
    1 + input.pkvSteigerungProzent / 100,
    jahreBisRente,
  );
  const pkvBasisVollRente =
    (input.pkvHaupttarif + input.pkvKrankentagegeld + input.pkvSonstige) *
    pkvWachstumBisRente;
  const pflegeVollRente = input.pkvPflege * pkvWachstumBisRente;

  const jahreBis60 = Math.max(0, ALTER_ZUSCHLAG_ENDE - input.aktuellesAlter);
  const abzglZuschlag =
    input.pkvGesetzlicherZuschlag *
    Math.pow(1 + input.pkvSteigerungProzent / 100, jahreBis60);

  const jahreBisBeAuszahlung = Math.max(
    0,
    input.beAuszahlungsalter - input.aktuellesAlter,
  );
  const abzglBe = input.beVorhanden
    ? beitragsentlastungWert(input.beZielbetragHeute, jahreBisBeAuszahlung)
    : 0;

  const abzglGrvZuschussKv = beitragAufRente;
  const abzglGrvZuschussPv = pvAufRente;

  const pkvGesamtRente =
    pkvBasisVollRente +
    pflegeVollRente -
    abzglZuschlag -
    abzglBe -
    abzglGrvZuschussKv -
    abzglGrvZuschussPv -
    input.reInvestRenteMonatlich;

  return {
    heute: {
      gkvEigen: gkvEigenHeute,
      pkvEigenKv: pkvKvEigenHeute,
      pkvEigenPv: pkvPvEigenHeute,
      pkvEigenGesamt: pkvEigenGesamtHeute,
      gkvNetto: gkvNettoHeute,
      pkvNetto: pkvNettoHeute,
      ersparnisNetto: gkvNettoHeute - pkvNettoHeute,
    },
    verlauf,
    renteneintritt: {
      gkv: {
        beitragAufRente,
        beitragAufBav,
        pvAufRente,
        pvAufBav,
        gesamt: gkvGesamtRente,
      },
      pkv: {
        basisVoll: pkvBasisVollRente,
        abzglZuschlag,
        abzglBe,
        abzglGrvZuschussKv,
        abzglGrvZuschussPv,
        abzglReInvestRente: input.reInvestRenteMonatlich,
        pflegeVoll: pflegeVollRente,
        gesamt: pkvGesamtRente,
      },
    },
  };
}
