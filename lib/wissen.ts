import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type WissenKategorieSlug =
  | "pkv"
  | "altersvorsorge"
  | "beamtenversorgung"
  | "versicherungen-allgemein"
  | "geldanlage"
  | "immobilien";

export const WISSEN_KATEGORIEN: { slug: WissenKategorieSlug; label: string }[] = [
  { slug: "pkv", label: "Private Krankenversicherung" },
  { slug: "altersvorsorge", label: "Altersvorsorge" },
  { slug: "beamtenversorgung", label: "Beamtenversorgung" },
  { slug: "versicherungen-allgemein", label: "Versicherungen Allgemein" },
  { slug: "geldanlage", label: "Geldanlage" },
  { slug: "immobilien", label: "Immobilien" },
];

export function kategorieLabel(slug: string): string {
  return WISSEN_KATEGORIEN.find((k) => k.slug === slug)?.label ?? slug;
}

export type WissenArtikelMeta = {
  slug: string;
  title: string;
  description: string;
  category: WissenKategorieSlug;
  date: string;
  lesezeitMinuten: number;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "wissen");

function alleDateinamen(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((datei) => datei.endsWith(".mdx"));
}

function metaAusDatei(slug: string, rohInhalt: string): WissenArtikelMeta {
  const { data, content } = matter(rohInhalt);
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    category: data.category as WissenKategorieSlug,
    date: data.date as string,
    lesezeitMinuten: Math.max(1, Math.ceil(readingTime(content).minutes)),
  };
}

export function alleArtikel(): WissenArtikelMeta[] {
  return alleDateinamen()
    .map((datei) => {
      const slug = datei.replace(/\.mdx$/, "");
      const rohInhalt = fs.readFileSync(path.join(CONTENT_DIR, datei), "utf8");
      return metaAusDatei(slug, rohInhalt);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function artikelNachKategorie(kategorie: string): WissenArtikelMeta[] {
  return alleArtikel().filter((artikel) => artikel.category === kategorie);
}

export function artikelInhalt(slug: string): { meta: WissenArtikelMeta; content: string } | null {
  const dateiPfad = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(dateiPfad)) return null;
  const rohInhalt = fs.readFileSync(dateiPfad, "utf8");
  const { content } = matter(rohInhalt);
  return { meta: metaAusDatei(slug, rohInhalt), content };
}
