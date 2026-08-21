import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Funnel from "@/components/funnel/Funnel";

export const metadata: Metadata = {
  alternates: { canonical: "/kennenlernen/" },
  title: "Lern uns kennen – S² Finanz",
  description:
    "Beantworte ein paar kurze Fragen und wir melden uns schnellstmöglich für ein kostenloses, unverbindliches Kennenlerngespräch.",
};

export default function KennenlernenPage() {
  return (
    <>
      <Header />
      <main className="bg-onyx">
        <Funnel />
      </main>
      <Footer />
    </>
  );
}
