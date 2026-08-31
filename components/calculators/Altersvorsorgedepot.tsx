"use client";

import { useMemo, useState } from "react";
import {
  SliderField,
  ResultRow,
  formatEUR,
  formatPercent,
} from "@/components/calculators/ui";
import {
  einkommensteuer,
  soli,
  ertragsanteil,
  ABGELTUNGSTEUER,
  SPARERPAUSCHBETRAG,
  TEILFREISTELLUNG_AKTIENFONDS,
} from "@/lib/steuer";

// Faktor für den Basisertrag der Vorabpauschale nach § 18 InvStG: 70 % des
// Basiszinses auf den Fondswert zu Jahresbeginn. Vereinfachend (wie auch bei
// Finanzfluss) ohne Deckelung durch den tatsächlichen Wertzuwachs des Jahres.
const VORABPAUSCHALE_FAKTOR = 0.7;

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
const AUSZAHLPLAN_MINDESTALTER = 85; // gesetzliches Mindestalter für das Auszahlplan-Ende

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

function PayoutBar({
  label,
  brutto,
  steuer,
  maxBrutto,
}: {
  label: string;
  brutto: number;
  steuer: number;
  maxBrutto: number;
}) {
  const netto = brutto - steuer;
  const breite = maxBrutto > 0 ? (brutto / maxBrutto) * 100 : 0;
  const nettoAnteil = brutto > 0 ? (netto / brutto) * 100 : 0;

  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-nebel">{label}</span>
        <span className="text-white">
          <span className="font-semibold text-gold">{formatEUR(netto)}</span>
          <span className="text-nebel"> netto von {formatEUR(brutto)} brutto</span>
        </span>
      </div>
      <div
        className="mt-2 h-6 overflow-hidden rounded-sm bg-white/5"
        style={{ width: `${Math.max(breite, 4)}%` }}
      >
        <div className="flex h-full w-full">
          <div
            className="h-full bg-gold"
            style={{ width: `${nettoAnteil}%` }}
          />
          <div className="h-full flex-1 bg-white/20" />
        </div>
      </div>
    </div>
  );
}

function NettoAuszahlungVergleich({
  nettoAvd,
  nettoEtf,
}: {
  nettoAvd: number;
  nettoEtf: number;
}) {
  const max = Math.max(nettoAvd, nettoEtf, 1);

  return (
    <div className="rounded-sm bg-onyx p-8">
      <p className="text-xs uppercase tracking-wide text-nebel/60">
        Monatliche Auszahlung
      </p>
      <p className="mt-2 font-display text-4xl font-bold text-gold md:text-5xl">
        {formatEUR(nettoAvd)}
      </p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-nebel">
        So viel bleibt Ihnen im Ruhestand netto jeden Monat aus dem
        Altersvorsorgedepot übrig. Investieren Sie den gleichen Betrag
        stattdessen in ein normales ETF-Depot ohne Förderung, könnten Sie bei
        gleicher Entnahmestrategie monatlich {formatEUR(nettoEtf)} entnehmen.
      </p>
      <div className="mt-6 flex flex-col gap-4">
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-white">Altersvorsorgedepot</span>
            <span className="font-semibold text-gold">
              {formatEUR(nettoAvd)}
            </span>
          </div>
          <div className="mt-1.5 h-7 w-full overflow-hidden rounded-sm bg-white/5">
            <div
              className="h-full rounded-sm bg-gold"
              style={{ width: `${Math.max((nettoAvd / max) * 100, 4)}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-white">Normales ETF-Depot</span>
            <span className="font-semibold text-white">
              {formatEUR(nettoEtf)}
            </span>
          </div>
          <div className="mt-1.5 h-7 w-full overflow-hidden rounded-sm bg-white/5">
            <div
              className="h-full rounded-sm bg-white/40"
              style={{ width: `${Math.max((nettoEtf / max) * 100, 4)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Altersvorsorgedepot() {
  const [monatlich, setMonatlich] = useState(150);
  const [alter, setAlter] = useState(30);
  const [kinder, setKinder] = useState(0);
  const [kinderzulageJahre, setKinderzulageJahre] = useState(18);
  const [zvE, setZvE] = useState(45000);
  const [rendite, setRendite] = useState(6);
  const [jahre, setJahre] = useState(30);
  const [avdKosten, setAvdKosten] = useState(1);
  const [vorabBasiszins, setVorabBasiszins] = useState(0);
  const [riesterUebertrag, setRiesterUebertrag] = useState(0);

  const [vergleichOffen, setVergleichOffen] = useState(false);
  const [auszahlAlter, setAuszahlAlter] = useState(67);
  const [auszahlEndalter, setAuszahlEndalter] = useState(
    AUSZAHLPLAN_MINDESTALTER,
  );
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

    // Ansparphase: monatliche Simulation. Zusätzlich zum Depot wird parallel
    // ein reines ETF-Szenario mit identischem Eigenbeitrag und identischer
    // Rendite, aber OHNE jede staatliche Zulage durchgerechnet – das ist die
    // realistische Vergleichsbasis, denn ein privater ETF-Sparplan bekommt
    // keine Förderung. Das AVD trägt zusätzlich seine eigenen Depotkosten,
    // das Vergleichsdepot bleibt kostenfrei (wie bei einem gebührenfreien
    // ETF-Sparplan üblich).
    const iAvd = (rendite - avdKosten) / 100 / 12;
    const iEtf = rendite / 100 / 12;
    const basiszinsVorab = vorabBasiszins / 100;
    const kzJahre = Math.min(Math.max(kinderzulageJahre, 0), jahre);
    // Ein bestehender Riester-Vertrag kann als Startkapital ins AVD
    // übertragen werden.
    let kapitalAvd = startbonus + riesterUebertrag;
    let kapitalEtf = 0;
    const eigenMonat = jahresbeitrag / 12;

    for (let jahr = 0; jahr < jahre; jahr++) {
      // Vorabpauschale betrifft nur das ungeförderte Vergleichsdepot: Das
      // AVD ist als zertifiziertes Vorsorgeprodukt nachgelagert besteuert,
      // eine jährliche Vorab-Besteuerung nicht realisierter Gewinne entfällt
      // dort systembedingt.
      const kapitalEtfJahresstart = kapitalEtf;
      const zulageMonat =
        (zulageGrund + (jahr < kzJahre ? kinderzulage : 0)) / 12;

      for (let m = 0; m < 12; m++) {
        kapitalAvd = kapitalAvd * (1 + iAvd) + eigenMonat + zulageMonat;
        kapitalEtf = kapitalEtf * (1 + iEtf) + eigenMonat;
      }

      if (basiszinsVorab > 0) {
        const vorabpauschale =
          kapitalEtfJahresstart * basiszinsVorab * VORABPAUSCHALE_FAKTOR;
        const steuerVorab =
          vorabpauschale * (1 - TEILFREISTELLUNG_AKTIENFONDS) * ABGELTUNGSTEUER;
        kapitalEtf -= steuerVorab;
      }
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
      eingezahlt,
      zulagenGesamt,
      erstattungenGesamt,
      riesterUebertrag,
      ertrag: kapitalAvd - eingezahlt - zulagenGesamt - riesterUebertrag,
      foerderTopf: zulagenGesamt + erstattungenGesamt,
    };
  }, [
    monatlich,
    alter,
    kinder,
    kinderzulageJahre,
    zvE,
    rendite,
    jahre,
    avdKosten,
    vorabBasiszins,
    riesterUebertrag,
  ]);

  const vergleich = useMemo(() => {
    if (!vergleichOffen) return null;

    const startAlter = Math.min(Math.max(auszahlAlter, 55), 75);
    const endalter = Math.max(auszahlEndalter, AUSZAHLPLAN_MINDESTALTER);
    const n = endalter - startAlter;
    const iA = renditeAuszahlung / 100;

    // Unterschiedliches Kapital → unterschiedlich hohe Auszahlung: Das AVD
    // zahlt dank der Zulagen eine höhere Rente als das ETF-Depot mit
    // demselben Eigenbeitrag.
    const wAvd = annuitaet(result.kapitalAvd, iA, n);
    const wEtf = annuitaet(result.kapitalEtf, iA, n);

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

    const steuerSonst = belastung(sonst);

    // AVD: die (höhere) Auszahlung ist voll steuerpflichtig, addiert sich
    // also zu den übrigen Einkünften und wird gemeinsam progressiv versteuert
    const gesamtsteuerAvdJahr = belastung(sonst + wAvd);
    const steuerAvdJahr = gesamtsteuerAvdJahr - steuerSonst;
    const nettoAvdJahr = wAvd - steuerAvdJahr;
    const grenzbelastung = wAvd > 0 ? (steuerAvdJahr / wAvd) * 100 : 0;

    // ETF-Depot mit dem separat (ohne Zulage) angesparten, kleineren Kapital:
    // nur der Gewinnanteil der – ebenfalls kleineren – Entnahme ist mit
    // Abgeltungsteuer steuerpflichtig, unabhängig von den übrigen Einkünften
    let kEtf = result.kapitalEtf;
    let basis = Math.min(result.eingezahlt, kEtf);
    let steuerEtfGesamt = 0;
    let steuerEtfJahr1 = 0;
    let nettoEtfJahr1 = 0;
    // Bereits realisierter Vorteil aus der Ansparphase: nur die zusätzliche
    // Steuererstattung der Günstigerprüfung – der Zulagen-Effekt selbst
    // steckt schon im höheren AVD-Kapital und damit in nettoAvdJahr
    let kumVorteil = result.erstattungenGesamt;
    let breakEvenJahr: number | null = null;

    for (let jahr = 1; jahr <= n; jahr++) {
      const kVorher = kEtf * (1 + iA);
      const gewinnanteil = kVorher > 0 ? Math.max(1 - basis / kVorher, 0) : 0;
      // 30 % Teilfreistellung für Aktienfonds (§ 20 InvStG): nur 70 % des
      // Gewinnanteils sind überhaupt steuerpflichtig, bevor der
      // Sparerpauschbetrag greift.
      const steuerpflichtig = Math.max(
        wEtf * gewinnanteil * (1 - TEILFREISTELLUNG_AKTIENFONDS) -
          SPARERPAUSCHBETRAG,
        0,
      );
      const steuerEtf = steuerpflichtig * ABGELTUNGSTEUER;
      basis -= kVorher > 0 ? wEtf * (basis / kVorher) : 0;
      kEtf = kVorher - wEtf;
      const nettoEtf = wEtf - steuerEtf;

      if (jahr === 1) {
        steuerEtfJahr1 = steuerEtf;
        nettoEtfJahr1 = nettoEtf;
      }
      steuerEtfGesamt += steuerEtf;

      kumVorteil += nettoAvdJahr - nettoEtf;
      if (breakEvenJahr === null && kumVorteil < 0) {
        breakEvenJahr = jahr;
      }
    }

    const steuerAvdGesamt = steuerAvdJahr * n;
    const nettoAvdGesamt = nettoAvdJahr * n;
    const nettoDifferenzJahr1 = nettoAvdJahr - nettoEtfJahr1;

    return {
      n,
      startAlter,
      endalter,
      wAvd,
      wEtf,
      wAvdMonat: wAvd / 12,
      wEtfMonat: wEtf / 12,
      ea,
      sonst,
      steuerAvdJahr,
      steuerAvdGesamt,
      steuerEtfJahr1,
      steuerEtfGesamt,
      nettoAvdJahr,
      nettoEtfJahr1,
      nettoAvdGesamt,
      nettoDifferenzJahr1,
      grenzbelastung,
      breakEvenJahr,
      kumVorteilEnde: kumVorteil,
    };
  }, [
    vergleichOffen,
    result,
    auszahlAlter,
    auszahlEndalter,
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
          <SliderField
            label="Monatlicher Eigenbeitrag"
            value={monatlich}
            onChange={setMonatlich}
            min={0}
            max={570}
            step={10}
            formatValue={(v) => formatEUR(v)}
          />
          <SliderField
            label="Alter bei Abschluss"
            value={alter}
            onChange={setAlter}
            min={16}
            max={65}
            step={1}
            formatValue={(v) => `${v} Jahre`}
          />
          <SliderField
            label="Kindergeldberechtigte Kinder"
            value={kinder}
            onChange={setKinder}
            min={0}
            max={10}
            step={1}
            formatValue={(v) => `${v}`}
          />
          {kinder > 0 && (
            <SliderField
              label="Jahre mit Anspruch auf Kinderzulage"
              value={kinderzulageJahre}
              onChange={setKinderzulageJahre}
              min={0}
              max={25}
              step={1}
              formatValue={(v) => `${v} Jahre`}
            />
          )}
          <SliderField
            label="Zu versteuerndes Jahreseinkommen"
            value={zvE}
            onChange={setZvE}
            min={0}
            max={250000}
            step={1000}
            formatValue={(v) => formatEUR(v)}
          />
          <SliderField
            label="Erwartete Rendite p. a."
            value={rendite}
            onChange={setRendite}
            min={0}
            max={15}
            step={0.5}
            formatValue={(v) => formatPercent(v, 1)}
          />
          <SliderField
            label="Anlagedauer bis zur Auszahlung"
            value={jahre}
            onChange={setJahre}
            min={1}
            max={50}
            step={1}
            formatValue={(v) => `${v} Jahre`}
          />
          <SliderField
            label="Kosten für das Altersvorsorgedepot"
            value={avdKosten}
            onChange={setAvdKosten}
            min={0}
            max={1}
            step={0.1}
            formatValue={(v) => `${formatPercent(v, 1)} p. a.`}
          />
          <SliderField
            label="Vorhandenes Riester-Kapital (Übertrag)"
            value={riesterUebertrag}
            onChange={setRiesterUebertrag}
            min={0}
            max={50000}
            step={500}
            formatValue={(v) => formatEUR(v)}
          />
          <SliderField
            label="Basiszins für die Vorabpauschale (Vergleichsdepot)"
            value={vorabBasiszins}
            onChange={setVorabBasiszins}
            min={0}
            max={5}
            step={0.1}
            formatValue={(v) => formatPercent(v, 1)}
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
              Beide Varianten sparen denselben Eigenbeitrag zur selben
              Rendite an – das ETF-Depot aber ohne jede Zulage. Dadurch ist
              das AVD-Kapital ({formatEUR(result.kapitalAvd)}) größer als das
              ETF-Kapital ({formatEUR(result.kapitalEtf)}), und aus dem
              Auszahlplan bis Alter {vergleich.endalter} zahlt das AVD eine
              höhere Rente aus. Zugleich ist diese Auszahlung voll
              steuerpflichtig, während beim ETF-Depot nur die Erträge mit
              Abgeltungsteuer belastet werden – am Ende zählt, was nach
              Steuern netto übrig bleibt.
            </p>

            <div className="grid gap-10 md:grid-cols-2">
              <div className="flex flex-col gap-8">
                <SliderField
                  label="Auszahlungsbeginn (Alter)"
                  value={auszahlAlter}
                  onChange={setAuszahlAlter}
                  min={55}
                  max={75}
                  step={1}
                  formatValue={(v) => `${v} Jahre`}
                />
                <SliderField
                  label="Auszahlung bis (Alter)"
                  value={auszahlEndalter}
                  onChange={setAuszahlEndalter}
                  min={AUSZAHLPLAN_MINDESTALTER}
                  max={100}
                  step={1}
                  formatValue={(v) => `${v} Jahre`}
                />
                <SliderField
                  label="Gesetzliche Rente (voll steuerpflichtig)"
                  value={gesRente}
                  onChange={setGesRente}
                  min={0}
                  max={5000}
                  step={100}
                  formatValue={(v) => `${formatEUR(v)} / Monat`}
                />
                <SliderField
                  label="Betriebliche Altersvorsorge"
                  value={bav}
                  onChange={setBav}
                  min={0}
                  max={3000}
                  step={100}
                  formatValue={(v) => `${formatEUR(v)} / Monat`}
                />
                <SliderField
                  label="Basisrente (Rürup)"
                  value={basisrente}
                  onChange={setBasisrente}
                  min={0}
                  max={3000}
                  step={100}
                  formatValue={(v) => `${formatEUR(v)} / Monat`}
                />
                <SliderField
                  label="Mieteinnahmen"
                  value={miete}
                  onChange={setMiete}
                  min={0}
                  max={3000}
                  step={100}
                  formatValue={(v) => `${formatEUR(v)} / Monat`}
                />
                <SliderField
                  label={`Private Rentenversicherung (Ertragsanteil ${vergleich.ea} %)`}
                  value={privRente}
                  onChange={setPrivRente}
                  min={0}
                  max={3000}
                  step={100}
                  formatValue={(v) => `${formatEUR(v)} / Monat`}
                />
                <SliderField
                  label="Kirchensteuer (0, 8 oder 9)"
                  value={kirchensteuer}
                  onChange={setKirchensteuer}
                  min={0}
                  max={9}
                  step={1}
                  formatValue={(v) => formatPercent(v, 0)}
                />
                <SliderField
                  label="Rendite in der Auszahlphase p. a."
                  value={renditeAuszahlung}
                  onChange={setRenditeAuszahlung}
                  min={0}
                  max={10}
                  step={0.5}
                  formatValue={(v) => formatPercent(v, 1)}
                />
              </div>

              <div className="flex flex-col gap-6">
                <div className="rounded-sm bg-onyx p-8">
                  <p className="mb-4 text-xs uppercase tracking-wide text-nebel/60">
                    Auszahlung im 1. Jahr: brutto → netto
                  </p>
                  <div className="flex flex-col gap-6">
                    <PayoutBar
                      label="Altersvorsorgedepot"
                      brutto={vergleich.wAvd}
                      steuer={vergleich.steuerAvdJahr}
                      maxBrutto={vergleich.wAvd}
                    />
                    <PayoutBar
                      label="ETF-Depot (kein Zulagenkapital)"
                      brutto={vergleich.wEtf}
                      steuer={vergleich.steuerEtfJahr1}
                      maxBrutto={vergleich.wAvd}
                    />
                  </div>
                  <div className="mt-5 flex items-center gap-4 text-xs text-nebel">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-sm bg-gold" /> netto
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-sm bg-white/20" />{" "}
                      Steuer
                    </span>
                  </div>
                </div>

                <NettoAuszahlungVergleich
                  nettoAvd={vergleich.nettoAvdJahr / 12}
                  nettoEtf={vergleich.nettoEtfJahr1 / 12}
                />

                <div className="rounded-sm bg-onyx p-8">
                  <ResultRow
                    label="Netto-Mehrbetrag des AVD pro Monat"
                    value={formatEUR(vergleich.nettoDifferenzJahr1 / 12)}
                    emphasis
                  />
                  <p className="mt-4 text-xs leading-relaxed text-nebel">
                    Effektive Steuerbelastung der AVD-Auszahlung:{" "}
                    {vergleich.grenzbelastung.toFixed(1)} % – trotzdem bleibt
                    dank des höheren Kapitals mehr netto übrig als beim
                    kleineren, ungeförderten ETF-Depot (Jahr 1).
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-gold bg-graphit px-8 py-10 text-center">
              <p className="text-xs uppercase tracking-wide text-nebel/70">
                {vergleich.breakEvenJahr === null
                  ? "Das AVD bleibt netto im Vorteil bis Auszahlungsjahr"
                  : "Netto-Vorteil des AVD kippt ins Minus ab Auszahlungsjahr"}
              </p>
              <p className="mt-3 font-display text-6xl font-bold text-gold md:text-7xl">
                {vergleich.breakEvenJahr === null
                  ? `${vergleich.n}+`
                  : vergleich.breakEvenJahr}
              </p>
              <p className="mt-2 text-sm text-nebel">
                {vergleich.breakEvenJahr === null
                  ? `Jahre – auch am Ende des Auszahlplans (Alter ${vergleich.endalter}) liegt das AVD unter diesen Annahmen noch mit ${formatEUR(
                      vergleich.kumVorteilEnde,
                    )} kumuliert netto vorn (inklusive der zusätzlichen Steuererstattung aus der Ansparphase).`
                  : `${
                      vergleich.breakEvenJahr === 1 ? "Jahr" : "Jahre"
                    } nach Auszahlungsbeginn – ab Alter ${
                      vergleich.startAlter + vergleich.breakEvenJahr
                    } hat das monatlich höhere Netto des AVD den anfänglichen Vorteil aus Zulagen und Steuererstattung aufgezehrt. Ab dann steht das ETF-Depot kumuliert netto besser da.`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
