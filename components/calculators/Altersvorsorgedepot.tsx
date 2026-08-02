"use client";

import { useMemo, useState } from "react";
import { NumberField, ResultRow, formatEUR } from "@/components/calculators/ui";
import {
  einkommensteuer,
  ABGELTUNGSTEUER,
  TEILFREISTELLUNG_AKTIENFONDS,
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
  const [ruhestandsEinkommen, setRuhestandsEinkommen] = useState(18000);
  const [auszahlJahre, setAuszahlJahre] = useState(20);
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
    let kapitalEtf = 0;
    let basisEtf = 0;
    const eigenMonat = jahresbeitrag / 12;

    for (let m = 0; m < jahre * 12; m++) {
      const jahrIndex = Math.floor(m / 12);
      const zulageMonat =
        (zulageGrund + (jahrIndex < kzJahre ? kinderzulage : 0)) / 12;
      kapitalAvd = kapitalAvd * (1 + i) + eigenMonat + zulageMonat;
      kapitalEtf = kapitalEtf * (1 + i) + eigenMonat;
      basisEtf += eigenMonat;
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
      kapitalEtf,
      basisEtf,
      eingezahlt,
      zulagenGesamt,
      erstattungenGesamt,
      ertrag: kapitalAvd - eingezahlt - zulagenGesamt,
    };
  }, [monatlich, alter, kinder, kinderzulageJahre, zvE, rendite, jahre]);

  const vergleich = useMemo(() => {
    if (!vergleichOffen) return null;

    const iA = renditeAuszahlung / 100;
    const n = Math.max(auszahlJahre, 1);
    const wAvd = annuitaet(result.kapitalAvd, iA, n);
    const wEtf = annuitaet(result.kapitalEtf, iA, n);

    let kEtf = result.kapitalEtf;
    let basis = result.basisEtf;
    let nettoAvdGesamt = 0;
    let nettoEtfGesamt = 0;
    let steuerAvdGesamt = 0;
    let steuerEtfGesamt = 0;
    // Bereits erhaltene Steuererstattungen zählen als Start-Vorsprung des AVD
    let kumDiff = result.erstattungenGesamt;
    let breakEvenJahr: number | null = null;

    for (let jahr = 1; jahr <= n; jahr++) {
      // Altersvorsorgedepot: Auszahlung voll steuerpflichtig (nachgelagerte Besteuerung)
      const steuerAvd =
        einkommensteuer(ruhestandsEinkommen + wAvd) -
        einkommensteuer(ruhestandsEinkommen);
      const nettoAvd = wAvd - steuerAvd;

      // ETF-Depot: nur der Gewinnanteil der Entnahme ist steuerpflichtig
      const kEtfVorher = kEtf * (1 + iA);
      const gewinnanteil =
        kEtfVorher > 0 ? Math.max(1 - basis / kEtfVorher, 0) : 0;
      const steuerpflichtig = Math.max(
        wEtf * gewinnanteil * (1 - TEILFREISTELLUNG_AKTIENFONDS) -
          SPARERPAUSCHBETRAG,
        0,
      );
      const steuerEtf = steuerpflichtig * ABGELTUNGSTEUER;
      const nettoEtf = wEtf - steuerEtf;
      basis -= kEtfVorher > 0 ? wEtf * (basis / kEtfVorher) : 0;
      kEtf = kEtfVorher - wEtf;

      nettoAvdGesamt += nettoAvd;
      nettoEtfGesamt += nettoEtf;
      steuerAvdGesamt += steuerAvd;
      steuerEtfGesamt += steuerEtf;

      kumDiff += nettoAvd - nettoEtf;
      if (breakEvenJahr === null && kumDiff < 0) breakEvenJahr = jahr;
    }

    const gesamtvorteil =
      nettoAvdGesamt + result.erstattungenGesamt - nettoEtfGesamt;

    return {
      wAvd,
      wEtf,
      nettoAvdGesamt,
      nettoEtfGesamt,
      steuerAvdGesamt,
      steuerEtfGesamt,
      gesamtvorteil,
      breakEvenJahr,
    };
  }, [
    vergleichOffen,
    result,
    ruhestandsEinkommen,
    auszahlJahre,
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
            : "Lohnt sich das? Vergleich mit privatem ETF-Sparplan berechnen"}
        </button>

        {vergleichOffen && vergleich && (
          <div className="mt-8 flex flex-col gap-10">
            <p className="max-w-2xl text-sm text-nebel">
              Der Vergleich übernimmt Ihre Eingaben von oben: identischer
              Eigenbeitrag und identische Rendite – einmal im
              Altersvorsorgedepot (mit Zulagen und steuerfreier Ansparphase,
              aber voll steuerpflichtiger Auszahlung) und einmal im privaten
              ETF-Depot (ohne Förderung, besteuert wird nur der Gewinnanteil
              der Entnahmen mit Abgeltungsteuer und 30 % Teilfreistellung).
            </p>

            <div className="grid gap-10 md:grid-cols-2">
              <div className="flex flex-col gap-8">
                <NumberField
                  label="Sonstiges zu versteuerndes Einkommen im Ruhestand (z. B. Rente)"
                  suffix="€/Jahr"
                  value={ruhestandsEinkommen}
                  onChange={setRuhestandsEinkommen}
                  step={1000}
                />
                <NumberField
                  label="Dauer des Auszahlplans"
                  suffix="Jahre"
                  value={auszahlJahre}
                  onChange={setAuszahlJahre}
                  step={1}
                  max={40}
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
                    Kapital zum Auszahlungsbeginn
                  </p>
                  <ResultRow
                    label="Altersvorsorgedepot"
                    value={formatEUR(result.kapitalAvd)}
                  />
                  <ResultRow
                    label="Privates ETF-Depot"
                    value={formatEUR(result.kapitalEtf)}
                  />
                  <ResultRow
                    label="Brutto-Jahresauszahlung AVD / ETF"
                    value={`${formatEUR(vergleich.wAvd)} / ${formatEUR(
                      vergleich.wEtf,
                    )}`}
                  />
                </div>

                <div className="rounded-sm bg-onyx p-8">
                  <p className="mb-2 text-xs uppercase tracking-wide text-nebel/60">
                    Steuern und Netto über die gesamte Auszahlphase
                  </p>
                  <ResultRow
                    label="Steuern Altersvorsorgedepot"
                    value={formatEUR(vergleich.steuerAvdGesamt)}
                  />
                  <ResultRow
                    label="Steuern ETF-Depot"
                    value={formatEUR(vergleich.steuerEtfGesamt)}
                  />
                  <ResultRow
                    label="Netto gesamt Altersvorsorgedepot"
                    value={formatEUR(vergleich.nettoAvdGesamt)}
                  />
                  <ResultRow
                    label="Netto gesamt ETF-Depot"
                    value={formatEUR(vergleich.nettoEtfGesamt)}
                  />
                  <ResultRow
                    label="Gesamtvorteil Altersvorsorgedepot"
                    value={formatEUR(vergleich.gesamtvorteil)}
                    emphasis
                  />
                </div>

                <div className="rounded-sm border border-gold/40 bg-onyx p-6">
                  <p className="text-sm leading-relaxed text-white">
                    {vergleich.breakEvenJahr === null
                      ? `Der Fördervorteil wird über die gesamte Auszahlphase nicht aufgebraucht: Das Altersvorsorgedepot bleibt unter diesen Annahmen um ${formatEUR(
                          vergleich.gesamtvorteil,
                        )} netto im Vorteil.`
                      : `Ab Jahr ${vergleich.breakEvenJahr} der Auszahlphase ist der staatliche Fördervorteil rechnerisch aufgebraucht – ab dann überwiegt die volle Steuerpflicht der Auszahlungen. Über die gesamte Auszahlphase ergibt sich ${formatEUR(
                          vergleich.gesamtvorteil,
                        )} gegenüber dem ETF-Depot.`}
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
