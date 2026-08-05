import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { SparplanEingabe, SparplanErgebnis } from "@/lib/sparplan";

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

export function exportSparplanPdf(
  titel: string,
  eingabe: SparplanEingabe,
  ergebnis: SparplanErgebnis,
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
    styles: { fontSize: 9, cellPadding: 1.2 },
    tableWidth: 130,
    columnStyles: { 0: { cellWidth: 78 }, 1: { halign: "right" } },
    head: [["Kenndaten", ""]],
    body: [
      ["Einmalbetrag", euro(eingabe.einmalbetrag)],
      ["Monatliche Sparrate", euro(eingabe.sparrate)],
      ["Dynamik", `${prozent(eingabe.dynamik)} p. a.`],
      ["Erwarteter Kurszuwachs", `${prozent(eingabe.kurszuwachs)} p. a.`],
      ["Ausgabeaufschlag", prozent(eingabe.ausgabeaufschlag)],
      ["Verwaltungsgebühr", `${prozent(eingabe.verwaltungsgebuehr)} p. a.`],
      ["Laufzeit", `${eingabe.jahre} Jahre`],
      ...(eingabe.vorabpauschale
        ? [
            ["Basiszins (Vorabpauschale)", `${prozent(eingabe.vorabpauschale.basiszins)} p. a.`],
            ["Teilfreistellung", prozent(eingabe.vorabpauschale.teilfreistellung)],
            [
              "Sparerpauschbetrag",
              `${euro(eingabe.vorabpauschale.sparerpauschbetrag)} p. a.`,
            ],
            ["Steuersatz (inkl. Soli)", prozent(eingabe.vorabpauschale.steuersatz, 3)],
          ]
        : []),
    ],
  });

  const finalYKenndaten = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable
    .finalY;

  autoTable(doc, {
    startY: 34,
    theme: "plain",
    styles: { fontSize: 9, cellPadding: 1.2 },
    tableWidth: 130,
    margin: { left: 150 },
    columnStyles: { 0: { cellWidth: 78 }, 1: { halign: "right" } },
    head: [["Ergebnis", ""]],
    body: [
      ["Endwert", euro(ergebnis.endwert)],
      ["Gewinn nach Gebühren", euro(ergebnis.gewinnNachGebuehren)],
      ["Einzahlungen gesamt", euro(ergebnis.einzahlungenGesamt)],
      ["Ausgabeaufschlag gesamt", `-${euro(ergebnis.ausgabeaufschlagGesamt)}`],
      ["Verwaltungsgebühr gesamt", `-${euro(ergebnis.verwaltungsgebuehrGesamt)}`],
      ["Gebühren gesamt", `-${euro(ergebnis.gebuehrenGesamt)}`],
      ["Effektive Rendite (IRR)", `${prozent(ergebnis.effektiveRendite, 3)} p. a.`],
      ...(eingabe.vorabpauschale
        ? [
            ["Vorabpauschale-Steuer gesamt", `-${euro(ergebnis.vorabpauschaleGesamt)}`],
            [
              "Minderung durch Vorabpauschale",
              `-${euro(ergebnis.minderungDurchVorabpauschale)}`,
            ],
          ]
        : []),
    ],
  });

  const finalYErgebnis = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable
    .finalY;
  const nachErgebnis = Math.max(finalYKenndaten, finalYErgebnis);

  autoTable(doc, {
    startY: nachErgebnis + 8,
    styles: { fontSize: 8, cellPadding: 1.5 },
    headStyles: { fillColor: [200, 162, 101] },
    columnStyles: { 0: { halign: "center" } },
    head: [
      [
        "Jahr",
        "Wert Jahresanfang",
        "Einzahlung",
        "Ausgabeaufschlag",
        "Wertzuwachs",
        "Verw.-gebühr",
        ...(eingabe.vorabpauschale ? ["Vorabpauschale-Steuer"] : []),
        "Wert Jahresende",
        "Gewinn kumuliert",
      ],
    ],
    body: ergebnis.jahreswerte.map((zeile) => [
      String(zeile.jahr),
      euro(zeile.wertJahresanfang),
      euro(zeile.einzahlung),
      `-${euro(zeile.ausgabeaufschlag)}`,
      euro(zeile.wertzuwachs),
      `-${euro(zeile.verwaltungsgebuehr)}`,
      ...(eingabe.vorabpauschale ? [`-${euro(zeile.vorabpauschaleSteuer)}`] : []),
      euro(zeile.wertJahresende),
      euro(zeile.gewinnKumuliert),
    ]),
  });

  const heute = new Date().toLocaleDateString("de-DE");
  const seiten = doc.getNumberOfPages();
  for (let seite = 1; seite <= seiten; seite++) {
    doc.setPage(seite);
    doc.setFontSize(7);
    doc.setTextColor(140);
    doc.text(
      `Erstellt mit dem Rechner von s2-finanz.de am ${heute}. Alle Angaben und Berechnungen ohne Gewähr.`,
      14,
      doc.internal.pageSize.getHeight() - 8,
    );
  }

  doc.save(`${titel.replace(/\s+/g, "-").toLowerCase()}.pdf`);
}
