import type { MetadataRoute } from "next";
import { SITE_INDEXABLE, SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

const ROUTES = [
  "/",
  "/ueber-uns/",
  "/rechner/",
  "/rechner/pensionsrechner/",
  "/rechner/besoldungstabellen/",
  "/rechner/altersvorsorgedepot/",
  "/rechner/pkv-rechner/",
  "/rechner/rentenluecke/",
  "/rechner/arbeitskraftrechner/",
  "/rechner/sparrechner/",
  "/rechner/etf-sparplanrechner/",
  "/rechner/aktienrenditerechner/",
  "/rechner/tagesgeldrechner/",
  "/rechner/entnahmerechner/",
  "/rechner/inflationsrechner/",
  "/rechner/kreditrechner/",
  "/rechner/baufinanzierungsrechner/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_INDEXABLE) return [];

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/rechner/" ? 0.9 : 0.7,
  }));
}
