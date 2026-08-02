// Erzeugt aus den in lib/besoldung/tabellen.ts hinterlegten Daten je Bundesland
// ein eigenständiges, im Corporate Design gestaltetes PDF zum Download.
// Ausführen mit: npx tsx scripts/generate-besoldungstabellen-pdfs.ts
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { BESOLDUNGSTABELLEN } from "../lib/besoldung/tabellen";
import type { BesoldungstabelleLand } from "../lib/besoldung/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "besoldungstabellen");

const ONYX = rgb(0x0e / 255, 0x12 / 255, 0x11 / 255);
const GRAPHIT = rgb(0x23 / 255, 0x2a / 255, 0x29 / 255);
const GOLD = rgb(0xc8 / 255, 0xa2 / 255, 0x65 / 255);
const WHITE = rgb(1, 1, 1);
const NEBEL = rgb(0x8e / 255, 0x99 / 255, 0x97 / 255);
const BLACK = rgb(0.08, 0.08, 0.08);
const ROW_ALT = rgb(0.95, 0.95, 0.94);

const PAGE_W = 841.89; // A4 quer
const PAGE_H = 595.28;
const MARGIN = 36;

function formatEUR(value: number): string {
  return (
    value.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €"
  );
}

function formatDatum(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

async function buildPdf(land: BesoldungstabelleLand): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`Besoldungstabelle ${land.name} – S² Finanz`);
  doc.setAuthor("S² Finanz");
  doc.setSubject("Besoldungstabelle");
  doc.setProducer("S² Finanz");

  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const maxStufe = Math.max(...land.gruppen.map((g) => g.stufen.length));
  const gruppen = land.gruppen;

  const HEADER_H = 96;
  const FOOTER_H = 60;
  const ROW_H = 17;
  const TABLE_HEAD_H = 20;
  const STUFE_COL_W = (PAGE_W - MARGIN * 2 - 70) / maxStufe;
  const GRUPPE_COL_W = 70;

  const rowsPerPage = Math.floor(
    (PAGE_H - HEADER_H - FOOTER_H - TABLE_HEAD_H - 10) / ROW_H,
  );
  const pages: BesoldungstabelleLand["gruppen"][] = [];
  for (let i = 0; i < gruppen.length; i += rowsPerPage) {
    pages.push(gruppen.slice(i, i + rowsPerPage));
  }
  if (pages.length === 0) pages.push([]);

  const totalPages = pages.length;

  pages.forEach((gruppenAufSeite, pageIndex) => {
    const page = doc.addPage([PAGE_W, PAGE_H]);

    // --- Kopfbereich (Onyx) ---
    page.drawRectangle({
      x: 0,
      y: PAGE_H - HEADER_H,
      width: PAGE_W,
      height: HEADER_H,
      color: ONYX,
    });
    page.drawRectangle({
      x: 0,
      y: PAGE_H - HEADER_H,
      width: PAGE_W,
      height: 3,
      color: GOLD,
    });

    page.drawText("S² FINANZ", {
      x: MARGIN,
      y: PAGE_H - 34,
      size: 13,
      font: fontBold,
      color: GOLD,
    });
    page.drawText("Besoldungstabelle", {
      x: MARGIN,
      y: PAGE_H - 58,
      size: 20,
      font: fontBold,
      color: WHITE,
    });
    page.drawText(land.name, {
      x: MARGIN,
      y: PAGE_H - 80,
      size: 13,
      font: fontRegular,
      color: NEBEL,
    });

    const gueltigText = land.gueltigAb
      ? `Gültig ab ${formatDatum(land.gueltigAb)}${land.entwurf ? " – Entwurf / Prognose" : ""}`
      : "";
    if (gueltigText) {
      const w = fontRegular.widthOfTextAtSize(gueltigText, 10);
      page.drawText(gueltigText, {
        x: PAGE_W - MARGIN - w,
        y: PAGE_H - 58,
        size: 10,
        font: fontRegular,
        color: land.entwurf ? GOLD : NEBEL,
      });
    }
    if (totalPages > 1) {
      const pageText = `Seite ${pageIndex + 1} / ${totalPages}`;
      const w = fontRegular.widthOfTextAtSize(pageText, 9);
      page.drawText(pageText, {
        x: PAGE_W - MARGIN - w,
        y: PAGE_H - 78,
        size: 9,
        font: fontRegular,
        color: NEBEL,
      });
    }

    // --- Tabellenkopf (Graphit) ---
    let y = PAGE_H - HEADER_H - TABLE_HEAD_H;
    page.drawRectangle({
      x: MARGIN,
      y,
      width: PAGE_W - MARGIN * 2,
      height: TABLE_HEAD_H,
      color: GRAPHIT,
    });
    page.drawText("Bes.-Gr.", {
      x: MARGIN + 8,
      y: y + 6,
      size: 9,
      font: fontBold,
      color: WHITE,
    });
    for (let s = 1; s <= maxStufe; s++) {
      const colX = MARGIN + GRUPPE_COL_W + (s - 1) * STUFE_COL_W;
      const label = `Stufe ${s}`;
      const w = fontBold.widthOfTextAtSize(label, 8);
      page.drawText(label, {
        x: colX + STUFE_COL_W - w - 6,
        y: y + 6,
        size: 8,
        font: fontBold,
        color: WHITE,
      });
    }

    // --- Tabellenzeilen ---
    gruppenAufSeite.forEach((g, i) => {
      y -= ROW_H;
      if (i % 2 === 1) {
        page.drawRectangle({
          x: MARGIN,
          y,
          width: PAGE_W - MARGIN * 2,
          height: ROW_H,
          color: ROW_ALT,
        });
      }
      page.drawText(g.label, {
        x: MARGIN + 8,
        y: y + 5,
        size: 9,
        font: fontBold,
        color: BLACK,
      });
      for (let s = 1; s <= maxStufe; s++) {
        const betrag = g.stufen.find((st) => st.stufe === s)?.betrag;
        const colX = MARGIN + GRUPPE_COL_W + (s - 1) * STUFE_COL_W;
        const text = betrag !== undefined ? formatEUR(betrag) : "–";
        const w = fontRegular.widthOfTextAtSize(text, 8.5);
        page.drawText(text, {
          x: colX + STUFE_COL_W - w - 6,
          y: y + 5,
          size: 8.5,
          font: fontRegular,
          color: BLACK,
        });
      }
    });

    // untere Tabellenlinie
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: PAGE_W - MARGIN, y },
      thickness: 0.5,
      color: GRAPHIT,
    });

    // --- Fußbereich ---
    page.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_W,
      height: FOOTER_H,
      color: ONYX,
    });
    page.drawRectangle({
      x: 0,
      y: FOOTER_H - 2,
      width: PAGE_W,
      height: 2,
      color: GOLD,
    });

    const disclaimerLines = [
      "Datenquelle: dbb beamtenbund und tarifunion (www.dbb.de). Einzelne Tabellen sind noch nicht verkündete Referentenentwürfe bzw.",
      "Prognosen und können sich bis zum Inkrafttreten ändern. Angaben ohne Gewähr – Fehler und Irrtümer vorbehalten. Keine Rechtsberatung.",
    ];
    disclaimerLines.forEach((line, i) => {
      page.drawText(line, {
        x: MARGIN,
        y: FOOTER_H - 22 - i * 12,
        size: 7.5,
        font: fontRegular,
        color: NEBEL,
      });
    });

    const brand = "S² Finanz";
    const bw = fontBold.widthOfTextAtSize(brand, 9);
    page.drawText(brand, {
      x: PAGE_W - MARGIN - bw,
      y: FOOTER_H - 22,
      size: 9,
      font: fontBold,
      color: GOLD,
    });
  });

  return doc.save();
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  for (const land of BESOLDUNGSTABELLEN) {
    if (!land.verfuegbar || land.gruppen.length === 0) continue;
    const bytes = await buildPdf(land);
    const outPath = path.join(OUT_DIR, `besoldungstabelle-${land.code}.pdf`);
    writeFileSync(outPath, bytes);
    console.log(`✓ ${outPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
