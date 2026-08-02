"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";
import {
  einkommensteuer,
  soli,
  ertragsanteil,
  ABGELTUNGSTEUER,
  SPARERPAUSCHBETRAG,
} from "@/lib/steuer";

// Fördereckwerte des Altersvorsorgedepots (Gesetz 2026, Start 1.1.2027)
const ZULAGE_STUFE_1_GRENZE = 360; // 50 Cent je Euro
const ZULAGE_STUFE_1_SATZ = 0.5;
const ZULAGE_STUFE_2_GRENZE = 1800; // 25 Cent je Euro darüber
const ZULAGE_STUFE_2_SATZ = 0.25;
const KINDERZULAGE_MAX_PRO_KIND = 300; // 1 Euro je Euro Eigenbeitrag, bis 300 €/Kind
const STARTBONUS = 200; // einmalig bei Abschluss unter 25 Jahren
const STARTBONUS_ALTERSGRENZE = 25;
const SA_ABZUG_MAX = 1800; // Sonderausgabenabzug: Beiträge bis 1.800 €/Jahr
const MAX_EINZAHLUNG = 6840; // maximale Jahreseinzahlung ins Depot
const AUSZAHLPLAN_ENDALTER = 85; // Auszahlplan des AVD läuft bis 85

function grundzulage(jahresbeitrag: number): number {
  const stufe1 =
    Math.min(jahresbeitrag, ZULAGE_STUFE_1_GRENZE) * ZULAGE_STUFE_1_SATZ;
  const stufe2 =
    Math.max(
      Math.min(jahresbeitrag, ZULAGE_STUFE_2_GRENZE) - ZULAGE_STUFE_1_GRENZE,
      0,
    ) * ZULAGE_STUFE_2_SATZ;
  return stufe1 + stufe2;
}

function annuitaet(kapital: number, zins: number, jahre: number): number {
  if (jahre <= 0) return 0;
  if (zins === 0) return kapital / jahre;
  return (kapital * zins) / (1 - Math.pow(1 + zins, -jahre));
}

export default function Altersvorsorgedepot() {
  const [monatlich, setMonatlich] = useState(150);
  const [alter, setAlter] = useState(30);
  const [kinder, setKinder] = useState(0);
  const [kinderzulageJahre, setKinderzulageJahre] = useState(18);
  const [zvE, setZvE] = useState(45000);
  const [rendite, setRendite] = useState(6);
  const [jahre, setJahre] = useState(30);

  const [vergleichOffen, setVergleichOffen] = useState(false);
  const [auszahlAlter, setAuszahlAlter] = useState(67);
  const [gesRente, setGesRente] = useState(2000);
  const [bav, setBav] = useState(0);
  const [basisrente, setBasisrente] = useState(0);
  const [miete, setMiete] = useState(0);
  const [privRente, setPrivRente] = useState(0);
  const [kirchensteuer, setKirchensteuer] = useState(0);
  const [renditeAuszahlung, setRenditeAuszahlung] = useState(4);

  const result = useMemo(() => {
    const jahresbeitrag = Math.min(monatlich * 12, MAX_EINZAHLUNG);
    const zulageGrund = grundzulage(jahresbeitrag);
    const kinderzulage =
      kinder * Math.min(jahresbeitrag, KINDERZULAGE_MAX_PRO_KIND);
    const startbonus = alter < STARTBONUS_ALTERSGRENZE ? STARTBONUS : 0;

    // Günstigerprüfung: Steuerersparnis durch Sonderausgabenabzug vs. Zulagenanspruch
    const saAbzug = Math.min(jahresbeitrag, SA_ABZUG_MAX);
    const steuerersparnis =
      zvE > 0 ? einkommensteuer(zvE) - einkommensteuer(zvE - saAbzug) : 0;
    const zulagenProJahrVoll = zulageGrund + kinderzulage;
    const extraSteuervorteil = Math.max(
      steuerersparnis - zulagenProJahrVoll,
      0,
    );

    // Ansparphase: monatliche Simulation, Zulagen anteilig monatlich, Startbonus zu Beginn
    const i = rendite / 100 / 12;
    const kzJahre = Math.min(Math.max(kinderzulageJahre, 0), jahre);
    let kapitalAvd = startbonus;
    const eigenMonat = jahresbeitrag / 12;

    for (let m = 0; m < jahre * 12; m++) {
      const jahrIndex = Math.floor(m / 12);
      const zulageMonat =
        (zulageGrund + (jahrIndex < kzJahre ? kinderzulage : 0)) / 12;
      kapitalAvd = kapitalAvd * (1 + i) + eigenMonat + zulageMonat;
    }

    // Zusätzliche Steuererstattungen (Günstigerprüfung) fließen an die Person, nicht ins Depot
    const erstattungenGesamt = extraSteuervorteil * jahre;

    const eingezahlt = jahresbeitrag * jahre;
    const zulagenGesamt =
      zulageGrund * jahre + kinderzulage * kzJahre + startbonus;

    return {
      jahresbeitrag,
      zulageGrund,
      kinderzulage,
      startbonus,
      steuerersparnis,
      extraSteuervorteil,
      guenstiger:
        steuerersparnis > zulagenProJahrVoll
          ? ("abzug" as const)
          : ("zulage" as const),
      kapitalAvd,
      eingezahlt,
      zulagenGesamt,
      erstattungenGesamt,
      ertrag: kapitalAvd - eingezahlt - zulagenGesamt,
      foerderTopf: zulagenGesamt + erstattungenGesamt,
    };
  }, [monatlich, alter, kinder, kinderzulageJahre, zvE, rendite, jahre]);

  const vergleich = useMemo(() => {
    if (!vergleichOffen) return null;

    const startAlter = Math.min(Math.max(auszahlAlter, 55), 75);
    const n = AUSZAHLPLAN_ENDALTER - startAlter;
    const iA = renditeAuszahlung / 100;
    const w = annuitaet(result.kapitalAvd, iA, n); // Auszahlplan bis 85, beide Varianten gleiches Kapital

    // Sonstige steuerpflichtige Einkünfte im Ruhestand (jährlich)
    const ea = ertragsanteil(startAlter);
    const sonstVoll = 12 * (gesRente + bav + basisrente + miete);
    const sonstPrivRente = 12 * privRente * (ea / 100);
    const sonst = sonstVoll + sonstPrivRente;

    // Gesamtbelastung ESt + Soli + Kirchensteuer auf ein zu versteuerndes Einkommen
    const belastung = (basis: number): number => {
      const est = einkommensteuer(basis);
      return est + soli(est) + est * (kirchensteuer / 100);
    };

    // AVD: Auszahlung voll steuerpflichtig on top der übrigen Einkünfte (konstant je Jahr)
    const steuerAvdJahr = belastung(sonst + w) - belastung(sonst);
    const grenzbelastung = w > 0 ? (steuerAvdJahr / w) * 100 : 0;

    // ETF-Depot mit derselben Kapitalsumme: nur der Gewinnanteil der Entnahmen
    // ist steuerpflichtig (25 % KapSt + Soli), Kostenbasis = eigene Einzahlungen
    let kEtf = result.kapitalAvd;
    let basis = Math.min(result.eingezahlt, kEtf);
    let steuerEtfGesamt = 0;
    let steuerEtfJahr1 = 0;
    let kumMehrsteuer = 0;
    let breakEvenJahr: number | null = null;

    for (let jahr = 1; jahr <= n; jahr++) {
      const kVorher = kEtf * (1 + iA);
      const gewinnanteil = kVorher > 0 ? Math.max(1 - basis / kVorher, 0) : 0;
      const steuerpflichtig = Math.max(
        w * gewinnanteil - SPARERPAUSCHBETRAG,
        0,
      );
      const steuerEtf = steuerpflichtig * ABGELTUNGSTEUER;
      basis -= kVorher > 0 ? w * (basis / kVorher) : 0;
      kEtf = kVorher - w;

      if (jahr === 1) steuerEtfJahr1 = steuerEtf;
      steuerEtfGesamt += steuerEtf;

      kumMehrsteuer += steuerAvdJahr - steuerEtf;
      if (breakEvenJahr === null && kumMehrsteuer > result.foerderTopf) {
        breakEvenJahr = jahr;
      }
    }

    const steuerAvdGesamt = steuerAvdJahr * n;
    const mehrsteuerGesamt = steuerAvdGesamt - steuerEtfGesamt;

    return {
      n,
      startAlter,
      w,
      wMonat: w / 12,
      ea,
      sonst,
      steuerAvdJahr,
      steuerAvdGesamt,
      steuerEtfJahr1,
      steuerEtfGesamt,
      mehrsteuerGesamt,
      grenzbelastung,
      breakEvenJahr,
      restvorteil: result.foerderTopf - mehrsteuerGesamt,
    };
  }, [
    vergleichOffen,
    result,
    auszahlAlter,
    gesRente,
    bav,
    basisrente,
    miete,
    privRente,
    kirchensteuer,
    renditeAuszahlung,
  ]);

  return (
    <div className="flex flex-col gap-12">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <NumberField
            label="Monatlicher Eigenbeitrag"
            suffix="€"
            value={monatlich}
            onChange={setMonatlich}
            step={10}
            max={570}
          />
          <NumberField
            label="Alter bei Abschluss"
            suffix="Jahre"
            value={alter}
            onChange={setAlter}
            step={1}
            min={16}
            max={65}
          />
          <NumberField
            label="Kindergeldberechtigte Kinder"
            value={kinder}
            onChange={setKinder}
            step={1}
            max={10}
          />
          {kinder > 0 && (
            <NumberField
              label="Jahre mit Anspruch auf Kinderzulage"
              suffix="Jahre"
              value={kinderzulageJahre}
              onChange={setKinderzulageJahre}
              step={1}
              max={25}
            />
          )}
          <NumberField
            label="Zu versteuerndes Jahreseinkommen"
            suffix="€"
            value={zvE}
            onChange={setZvE}
            step={1000}
          />
          <NumberField
            label="Erwartete Rendite p. a."
            suffix="%"
            value={rendite}
            onChange={setRendite}
            step={0.5}
            max={15}
          />
          <NumberField
            label="Anlagedauer bis zur Auszahlung"
            suffix="Jahre"
            value={jahre}
            onChange={setJahre}
            step={1}
            max={50}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-sm bg-onyx p-8">
            <p className="mb-2 text-xs uppercase tracking-wide text-nebel/60">
              Ihre staatliche Förderung
            </p>
            <ResultRow
              label="Grundzulage pro Jahr"
              value={formatEUR(result.zulageGrund)}
            />
            {result.kinderzulage > 0 && (
              <ResultRow
                label={`Kinderzulage pro Jahr (${kinder} ${
                  kinder === 1 ? "Kind" : "Kinder"
                })`}
                value={formatEUR(result.kinderzulage)}
              />
            )}
            {result.startbonus > 0 && (
              <ResultRow
                label="Startbonus (einmalig, Abschluss unter 25)"
                value={formatEUR(result.startbonus)}
              />
            )}
            <ResultRow
              label="Förderung über die Laufzeit gesamt"
              value={formatEUR(result.zulagenGesamt)}
              emphasis
            />
          </div>

          <div className="rounded-sm bg-onyx p-8">
            <p className="mb-2 text-xs uppercase tracking-wide text-nebel/60">
              Günstigerprüfung (Sonderausgabenabzug)
            </p>
            <ResultRow
              label="Steuerersparnis durch Abzug pro Jahr"
              value={formatEUR(result.steuerersparnis)}
            />
            <ResultRow
              label="Zusätzlicher Vorteil über die Zulagen hinaus"
              value={formatEUR(result.extraSteuervorteil)}
            />
            <p className="mt-4 text-xs leading-relaxed text-nebel">
              {result.guenstiger === "abzug"
                ? "Der Sonderausgabenabzug ist für Sie günstiger als die Zulagen allein – die Differenz erstattet das Finanzamt mit dem Steuerbescheid."
                : "Die Zulagen sind für Sie günstiger als der Sonderausgabenabzug – ein zusätzlicher Steuervorteil ergibt sich nicht."}
            </p>
          </div>

          <div className="rounded-sm bg-onyx p-8">
            <p className="mb-2 text-xs uppercase tracking-wide text-nebel/60">
              Kapitalentwicklung
            </p>
            <ResultRow
              label="Voraussichtliches Endkapital"
              value={formatEUR(result.kapitalAvd)}
              emphasis
            />
            <ResultRow
              label="Eigene Einzahlungen gesamt"
              value={formatEUR(result.eingezahlt)}
            />
            <ResultRow label="Ertrag" value={formatEUR(result.ertrag)} />
            {result.erstattungenGesamt > 0 && (
              <ResultRow
                label="Steuererstattungen über die Laufzeit (zusätzlich)"
                value={formatEUR(result.erstattungenGesamt)}
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setVergleichOffen((v) => !v)}
          aria-expanded={vergleichOffen}
          className="rounded-sm border border-gold px-7 py-3.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
        >
          {vergleichOffen
            ? "Vergleich ausblenden"
            : "Steuervergleich in der Auszahlphase: AVD vs. ETF-Depot"}
        </button>

        {vergleichOffen && vergleich && (
          <div className="mt-8 flex flex-col gap-10">
            <p className="max-w-2xl text-sm text-nebel">
              Beide Varianten starten mit demselben Kapital (
              {formatEUR(result.kapitalAvd)}) und werden als Auszahlplan bis
              zum Alter {AUSZAHLPLAN_ENDALTER} vollständig entnommen. Der
              Unterschied liegt allein in der Besteuerung: Die Auszahlung des
              Altersvorsorgedepots ist voll einkommensteuerpflichtig – on top
              Ihrer übrigen Alterseinkünfte. Beim ETF-Depot werden nur die
              Erträge mit 25 % Kapitalertragsteuer plus Soli belastet.
            </p>

            <div className="grid gap-10 md:grid-cols-2">
              <div className="flex flex-col gap-8">
                <NumberField
                  label="Auszahlungsbeginn (Alter)"
                  suffix="Jahre"
                  value={auszahlAlter}
                  onChange={setAuszahlAlter}
                  step={1}
                  min={55}
                  max={75}
                />
                <NumberField
                  label="Gesetzliche Rente (voll steuerpflichtig)"
                  suffix="€/Monat"
                  value={gesRente}
                  onChange={setGesRente}
                  step={100}
                />
                <NumberField
                  label="Betriebliche Altersvorsorge"
                  suffix="€/Monat"
                  value={bav}
                  onChange={setBav}
                  step={100}
                />
                <NumberField
                  label="Basisrente (Rürup)"
                  suffix="€/Monat"
                  value={basisrente}
                  onChange={setBasisrente}
                  step={100}
                />
                <NumberField
                  label="Mieteinnahmen"
                  suffix="€/Monat"
                  value={miete}
                  onChange={setMiete}
                  step={100}
                />
                <NumberField
                  label={`Private Rentenversicherung (Ertragsanteil ${vergleich.ea} %)`}
                  suffix="€/Monat"
                  value={privRente}
                  onChange={setPrivRente}
                  step={100}
                />
                <NumberField
                  label="Kirchensteuer (0, 8 oder 9)"
                  suffix="%"
                  value={kirchensteuer}
                  onChange={setKirchensteuer}
                  step={1}
                  max={9}
                />
                <NumberField
                  label="Rendite in der Auszahlphase p. a."
                  suffix="%"
                  value={renditeAuszahlung}
                  onChange={setRenditeAuszahlung}
                  step={0.5}
                  max={10}
                />
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-sm bg-onyx p-8">
                  <p className="mb-2 text-xs uppercase tracking-wide text-nebel/60">
                    Ihr Auszahlplan bis {AUSZAHLPLAN_ENDALTER}
                  </p>
                  <ResultRow
                    label={`Dauer (Alter ${vergleich.startAlter} bis ${AUSZAHLPLAN_ENDALTER})`}
                    value={`${vergleich.n} Jahre`}
                  />
                  <ResultRow
                    label="Monatliche Brutto-Auszahlung"
                    value={formatEUR(vergleich.wMonat)}
                    emphasis
                  />
                  <ResultRow
                    label="Übrige steuerpflichtige Einkünfte pro Jahr"
                    value={formatEUR(vergleich.sonst)}
                  />
                </div>

                <div className="rounded-sm bg-onyx p-8">
                  <p className="mb-2 text-xs uppercase tracking-wide text-nebel/60">
                    Steuerbelastung der Auszahlungen
                  </p>
                  <ResultRow
                    label="Steuer auf AVD-Auszahlung pro Jahr"
                    value={formatEUR(vergleich.steuerAvdJahr)}
                  />
                  <ResultRow
                    label="Steuerbelastung der AVD-Auszahlung"
                    value={`${vergleich.grenzbelastung.toFixed(1)} %`}
                  />
                  <ResultRow
                    label="Steuer ETF-Depot im 1. Jahr"
                    value={formatEUR(vergleich.steuerEtfJahr1)}
                  />
                  <ResultRow
                    label={`Steuern gesamt über ${vergleich.n} Jahre: AVD / ETF`}
                    value={`${formatEUR(vergleich.steuerAvdGesamt)} / ${formatEUR(
                      vergleich.steuerEtfGesamt,
                    )}`}
                  />
                  <ResultRow
                    label="Mehrsteuer des AVD gesamt"
                    value={formatEUR(vergleich.mehrsteuerGesamt)}
                  />
                </div>

                <div className="rounded-sm bg-onyx p-8">
                  <p className="mb-2 text-xs uppercase tracking-wide text-nebel/60">
                    Fördertopf vs. Mehrsteuer
                  </p>
                  <ResultRow
                    label="Gesamte Förderung aus der Einzahlphase (Zulagen + Steuererstattungen)"
                    value={formatEUR(result.foerderTopf)}
                    emphasis
                  />
                </div>

                <div className="rounded-sm border border-gold/40 bg-onyx p-6">
                  <p className="text-sm leading-relaxed text-white">
                    {vergleich.breakEvenJahr === null
                      ? `Die Förderung wird nicht aufgebraucht: Auch nach ${vergleich.n} Jahren Auszahlplan liegt die Mehrsteuer des Altersvorsorgedepots (${formatEUR(
                          vergleich.mehrsteuerGesamt,
                        )}) unter der erhaltenen Förderung von ${formatEUR(
                          result.foerderTopf,
                        )}. Es verbleibt ein Vorteil von ${formatEUR(
                          vergleich.restvorteil,
                        )}.`
                      : `Nach ${vergleich.breakEvenJahr} ${
                          vergleich.breakEvenJahr === 1 ? "Jahr" : "Jahren"
                        } der Auszahlphase (Alter ${
                          vergleich.startAlter + vergleich.breakEvenJahr
                        }) ist die gesamte Förderung von ${formatEUR(
                          result.foerderTopf,
                        )} durch die höhere Steuerlast aufgebraucht. Ab dann zahlen Sie im Altersvorsorgedepot mehr Steuern, als Sie je an Zulagen und Steuerersparnis erhalten haben. Bis zum Alter ${AUSZAHLPLAN_ENDALTER} summiert sich die Mehrsteuer auf ${formatEUR(
                          vergleich.mehrsteuerGesamt,
                        )}.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
