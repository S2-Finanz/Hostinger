import type { Metadata } from "next";
import Image from "next/image";
import FormularApp from "@/components/formular/FormularApp";

export const metadata: Metadata = {
  title: "Gesundheitsfragebogen – S² Finanz",
  description: "Persönlicher Gesundheitsfragebogen von S² Finanz.",
  robots: { index: false, follow: false },
};

export default function FormularPage() {
  return (
    <main className="min-h-screen bg-onyx px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex justify-center">
          <Image src="/images/logo.png" alt="S² Finanz" width={924} height={928} className="h-16 w-auto" />
        </div>
        <FormularApp />
      </div>
    </main>
  );
}
