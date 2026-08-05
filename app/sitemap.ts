import type { MetadataRoute } from "next";
import { SITE_INDEXABLE, SITE_URL } from "@/lib/constants";
import { WISSEN_KATEGORIEN, alleArtikel } from "@/lib/wissen";

export const dynamic = "force-static";

const ROUTES = [
  "/",
  "/ueber-uns/",
  "/kontakt/",
  "/wissen/",
  "/rechner/",
  "/rechner/pensionsrechner/",
  "/rechner/besoldungstabellen/",
  "/rechner/altersvorsorgedepot/",
  "/rechner/pkv-rechner/",
  "/rechner/krankenkassenvergleich/",
  "/rechner/rentenluecke/",
  "/rechner/arbeitskraftrechner/",
  "/rechner/sparrechner/",
  "/rechner/etf-sparplanrechner/",
  "/rechner/etf-vs-rentenversicherung/",
  "/rechner/aktienrenditerechner/",
  "/rechner/tagesgeldrechner/",
  "/rechner/entnahmerechner/",
  "/rechner/inflationsrechner/",
  "/rechner/wahrscheinlichkeitsrechner/",
  "/rechner/was-waere-wenn-rechner/",
  "/rechner/kreditrechner/",
  "/rechner/baufinanzierungsrechner/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_INDEXABLE) return [];

  const statischeRouten = ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: (route === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "/" ? 1 : route === "/rechner/" ? 0.9 : 0.7,
  }));

  const kategorieRouten = WISSEN_KATEGORIEN.map((kategorie) => ({
    url: `${SITE_URL}/wissen/kategorie/${kategorie.slug}/`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const artikelRouten = alleArtikel().map((artikel) => ({
    url: `${SITE_URL}/wissen/${artikel.slug}/`,
    lastModified: new Date(artikel.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...statischeRouten, ...kategorieRouten, ...artikelRouten];
}
