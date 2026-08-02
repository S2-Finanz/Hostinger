import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "S² Finanz – Beratung für PKV, Beamtenversorgung & Arbeitskraftabsicherung",
  description:
    "Unabhängige Beratung für private Krankenversicherung, Beamtenversorgung, Arbeitskraftabsicherung und Vermögensaufbau – für Beamte, Angestellte und Geschäftsführer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
