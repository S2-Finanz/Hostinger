import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_INDEXABLE, SITE_URL } from "@/lib/constants";
import { REVIEWS } from "@/components/GoogleReviews";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const TITLE =
  "S² Finanz – Beratung für PKV, Beamtenversorgung & Arbeitskraftabsicherung";
const DESCRIPTION =
  "Unabhängige Beratung für private Krankenversicherung, Beamtenversorgung, Arbeitskraftabsicherung und Vermögensaufbau – für Beamte, Angestellte und Geschäftsführer.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  robots: SITE_INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "S² Finanz",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "S² Finanz",
  legalName: "S² Finanz GbR i.Gr.",
  description: DESCRIPTION,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Furtstr. 41/5",
    postalCode: "73770",
    addressLocality: "Denkendorf",
    addressRegion: "Baden-Württemberg",
    addressCountry: "DE",
  },
  telephone: "+49 174 1865960",
  email: "info@s2-finanz.de",
  founder: [
    { "@type": "Person", name: "Marcel Scheuermann" },
    { "@type": "Person", name: "Marcel Schäfer" },
  ],
  areaServed: "DE",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: (
      REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
    ).toFixed(1),
    reviewCount: REVIEWS.length,
  },
  review: REVIEWS.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    reviewBody: r.text,
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
