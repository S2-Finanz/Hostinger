import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBlock from "@/components/TrustBlock";
import ServicesGrid from "@/components/ServicesGrid";
import AboutTeaser from "@/components/AboutTeaser";
import TestimonialCta from "@/components/TestimonialCta";
import WissenFaq from "@/components/WissenFaq";
import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBlock />
        <ServicesGrid />
        <AboutTeaser />
        <TestimonialCta />
        <WissenFaq />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
