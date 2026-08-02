import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/impressum/", "/datenschutz/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
