import type { Metadata } from "next";
import Image from "next/image";
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
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/images/logo.png" alt="S² Finanz" width={924} height={928} className="h-16 w-auto" />
          <p className="mt-2 text-sm text-nebel">Mitarbeiter-Backoffice</p>
        </div>
        <BackofficeApp />
      </div>
    </main>
  );
}
