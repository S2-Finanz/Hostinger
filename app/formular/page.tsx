import type { Metadata } from "next";
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
        <div className="mb-8 text-center">
          <p className="font-display text-2xl font-bold text-white">S² FINANZ</p>
        </div>
        <FormularApp />
      </div>
    </main>
  );
}
