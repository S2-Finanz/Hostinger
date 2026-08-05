import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { EtfVsRenteEingabe, VergleichErgebnis } from "@/lib/etf-vs-rente";

function euro(wert: number): string {
  return wert.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  });
}

function prozent(wert: number, nachkommastellen = 2): string {
  return `${wert.toLocaleString("de-DE", {
    minimumFractionDigits: nachkommastellen,
    maximumFractionDigits: nachkommastellen,
  })} %`;
}

const MODUS_LABEL: Record<EtfVsRenteEingabe["auszahlModus"], string> = {
  einmalig: "Einmalauszahlung",
  entnahmeplan: "Entnahmeplan",
  rente: "Lebenslange Rente",
};

export function exportEtfVsRentePdf(
  titel: string,
  eingabe: EtfVsRenteEingabe,
  ergebnis: VergleichErgebnis,
) {
  const doc = new jsPDF({ orientation: "landscape" });

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("S² Finanz", 14, 18);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(titel, 14, 26);

  autoTable(doc, {
    startY: 34,
    theme: "plain",
    styles: { fontSize: 8.5, cellPadding: 1.1 },
    tableWidth: 85,
    columnStyles: { 0: { cellWidth: 55 }, 1: { halign: "right" } },
    head: [["Ansparphase (gemeinsam)", ""]],
    body: [
      ["Einmalbetrag", euro(eingabe.einmalbetrag)],
      ["Monatlicher Beitrag", euro(eingabe.sparrate)],
      ["Dynamik", `${prozent(eingabe.dynamik)} p. a.`],
      ["Rendite Ansparphase", `${prozent(eingabe.renditeAnsparphase)} p. a.`],
      ["Ansparphase", `${eingabe.ansparJahre} Jahre`],
      ["Auszahlmodus", MODUS_LABEL[eingabe.auszahlModus]],
    ],
  });
  const y1 = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;

  autoTable(doc, {
    startY: 34,
    theme: "plain",
    styles: { fontSize: 8.5, cellPadding: 1.1 },
    tableWidth: 90,
    margin: { left: 105 },
    columnStyles: { 0: { cellWidth: 58 }, 1: { halign: "right" } },
    head: [["ETF-Depot", ""]],
    body: [
      ["Ausgabeaufschlag", prozent(eingabe.depotAusgabeaufschlag)],
      ["Laufende Kosten (TER)", `${prozent(eingabe.depotVerwaltungsgebuehr)} p. a.`],
      ["Rebalancing", eingabe.depotRebalancingJahre > 0 ? `alle ${eingabe.depotRebalancingJahre} Jahre` : "aus"],
      ["Basiszins (Vorabpauschale)", `${prozent(eingabe.vorabpauschale.basiszins)} p. a.`],
      ["Teilfreistellung", prozent(eingabe.vorabpauschale.teilfreistellung)],
      ["Sparerpauschbetrag", `${euro(eingabe.vorabpauschale.sparerpauschbetrag)} p. a.`],
      ["Abgeltungsteuer", prozent(eingabe.vorabpauschale.steuersatz, 3)],
    ],
  });
  const y2 = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;

  autoTable(doc, {
    startY: 34,
    theme: "plain",
    styles: { fontSize: 8.5, cellPadding: 1.1 },
    tableWidth: 90,
    margin: { left: 200 },
    columnStyles: { 0: { cellWidth: 58 }, 1: { halign: "right" } },
    head: [["Rentenversicherung", ""]],
    body: [
      ["Abschlusskosten", `${prozent(eingabe.versicherungAbschlusskosten)} der Beitragssumme`],
      ["Verwaltungskosten", `${prozent(eingabe.versicherungVerwaltungskosten)} p. a.`],
      ["Rentenfaktor", `${eingabe.rentenfaktor} € / 10.000 €`],
      ["Rendite Auszahlphase", `${prozent(eingabe.renditeAuszahlphase)} p. a.`],
      ["Alter bei Rentenbeginn", `${eingabe.alterBeiRentenbeginn} Jahre`],
      ["Pers. Grenzsteuersatz", prozent(eingabe.persoenlicherSteuersatz)],
      [
        "Halbeinkünfteverfahren",
        ergebnis.halbeinkuenfteBedingungErfuellt ? "erfüllt" : "nicht erfüllt",
      ],
    ],
  });
  const y3 = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;

  const nachKenndaten = Math.max(y1, y2, y3);

  autoTable(doc, {
    startY: nachKenndaten + 6,
    theme: "plain",
    styles: { fontSize: 8.5, cellPadding: 1.1 },
    tableWidth: 130,
    columnStyles: { 0: { cellWidth: 65 }, 1: { halign: "right" } },
    head: [["Ergebnis ETF-Depot", ""]],
    body: [
      ["Kapital bei Rentenbeginn", euro(ergebnis.depot.kapitalBeiRentenbeginn)],
      ["Eingezahlt gesamt", euro(ergebnis.depot.eingezahltGesamt)],
      ["Kosten gesamt", `-${euro(ergebnis.depot.kostenGesamt)}`],
      ["Steuer Ansparphase", `-${euro(ergebnis.depot.steuerAnsparphaseGesamt)}`],
      [
        eingabe.auszahlModus === "einmalig" ? "Netto-Einmalauszahlung" : "Ø Netto/Monat",
        euro(ergebnis.depot.monatlicheAuszahlungNetto),
      ],
      ["Netto gesamt Auszahlphase", euro(ergebnis.depot.nettoGesamtAuszahlphase)],
      ["Steuer Auszahlphase", `-${euro(ergebnis.depot.steuerAuszahlphaseGesamt)}`],
    ],
  });
  const y4 = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;

  autoTable(doc, {
    startY: nachKenndaten + 6,
    theme: "plain",
    styles: { fontSize: 8.5, cellPadding: 1.1 },
    tableWidth: 130,
    margin: { left: 150 },
    columnStyles: { 0: { cellWidth: 65 }, 1: { halign: "right" } },
    head: [["Ergebnis Rentenversicherung", ""]],
    body: [
      ["Kapital bei Rentenbeginn", euro(ergebnis.versicherung.kapitalBeiRentenbeginn)],
      ["Eingezahlt gesamt", euro(ergebnis.versicherung.eingezahltGesamt)],
      ["Kosten gesamt", `-${euro(ergebnis.versicherung.kostenGesamt)}`],
      ["Steuer Ansparphase", euro(0)],
      [
        eingabe.auszahlModus === "einmalig"
          ? "Netto-Einmalauszahlung"
          : eingabe.auszahlModus === "rente"
            ? "Netto-Rente/Monat"
            : "Ø Netto/Monat",
        euro(ergebnis.versicherung.monatlicheAuszahlungNetto),
      ],
      ["Netto gesamt Auszahlphase", euro(ergebnis.versicherung.nettoGesamtAuszahlphase)],
      ["Steuer Auszahlphase", `-${euro(ergebnis.versicherung.steuerAuszahlphaseGesamt)}`],
    ],
  });
  const y5 = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;

  autoTable(doc, {
    startY: Math.max(y4, y5) + 8,
    styles: { fontSize: 8, cellPadding: 1.5 },
    headStyles: { fillColor: [200, 162, 101] },
    columnStyles: { 0: { halign: "center" } },
    head: [["Jahr", "Depot – Wert Jahresende", "Versicherung – Wert Jahresende"]],
    body: ergebnis.depot.ansparphase.map((zeile, index) => [
      String(zeile.jahr),
      euro(zeile.wertJahresende),
      euro(ergebnis.versicherung.ansparphase[index]?.wertJahresende ?? 0),
    ]),
  });

  const heute = new Date().toLocaleDateString("de-DE");
  const seiten = doc.getNumberOfPages();
  for (let seite = 1; seite <= seiten; seite++) {
    doc.setPage(seite);
    doc.setFontSize(7);
    doc.setTextColor(140);
    doc.text(
      `Erstellt mit dem Rechner von s2-finanz.de am ${heute}. Alle Angaben und Berechnungen ohne Gewähr, keine Anlage- oder Steuerberatung.`,
      14,
      doc.internal.pageSize.getHeight() - 8,
    );
  }

  doc.save(`${titel.replace(/\s+/g, "-").toLowerCase()}.pdf`);
}
