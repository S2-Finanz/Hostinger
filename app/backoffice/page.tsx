import type { Metadata } from "next";
import BackofficeApp from "@/components/backoffice/BackofficeApp";

export const metadata: Metadata = {
  title: "Mitarbeiter-Login – S² Finanz Backoffice",
  description: "Interner Mitarbeiterbereich von S² Finanz.",
  robots: { index: false, follow: false },
};

export default function BackofficePage() {
  return (
    <main className="min-h-screen bg-onyx px-6 py-16">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 text-center">
          <p className="font-display text-2xl font-bold text-white">S² FINANZ</p>
          <p className="mt-1 text-sm text-nebel">Mitarbeiter-Backoffice</p>
        </div>
        <BackofficeApp />
      </div>
    </main>
  );
}
