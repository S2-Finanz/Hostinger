"use client";

import { useState } from "react";
import Link from "next/link";
import { CAL_LINK } from "@/lib/constants";

const STATUS_OPTIONS = [
  "Angestellter",
  "Beamter / Beamtenanwärter",
  "Geschäftsführer",
] as const;

export default function PkvCheck() {
  const [status, setStatus] =
    useState<(typeof STATUS_OPTIONS)[number]>("Angestellter");
  const [alter, setAlter] = useState(30);

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <label className="block">
          <span className="text-sm text-nebel">Ich bin</span>
          <div className="mt-3 flex flex-col gap-2">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setStatus(option)}
                className={`rounded-sm border px-4 py-3 text-left text-sm transition-colors ${
                  status === option
                    ? "border-gold bg-gold/10 text-white"
                    : "border-white/15 text-nebel hover:border-white/30"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </label>

        <label className="block">
          <span className="text-sm text-nebel">Alter</span>
          <div className="mt-2 flex items-center gap-2 border-b border-white/20 pb-2 focus-within:border-gold">
            <input
              type="number"
              inputMode="numeric"
              value={alter}
              min={16}
              max={75}
              onChange={(e) => setAlter(e.target.valueAsNumber || 0)}
              className="w-full bg-transparent text-lg text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="text-sm text-nebel">Jahre</span>
          </div>
        </label>
      </div>

      <div className="flex flex-col justify-between rounded-sm bg-onyx p-8">
        <div>
          <p className="text-sm text-nebel">Ihre Einschätzung</p>
          <p className="mt-3 font-display text-xl font-bold text-white">
            Als {status.toLowerCase()} mit {alter} Jahren lohnt sich ein
            genauer Blick auf Ihre PKV-Optionen.
          </p>
          <p className="mt-4 text-sm text-nebel">
            Der tatsächliche Beitrag hängt von Tarif, Gesundheitsstand und
            gewünschtem Leistungsumfang ab – das lässt sich seriös nur im
            persönlichen Gespräch kalkulieren, nicht per Faustformel.
          </p>
        </div>

        <Link
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-sm bg-gold px-7 py-3.5 text-center text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
        >
          Persönlichen Beitrag berechnen lassen
        </Link>
      </div>
    </div>
  );
}
