"use client";

import type { TeilzeitPhase } from "@/lib/besoldung/types";

let idCounter = 0;
function newId() {
  idCounter += 1;
  return `tz-${Date.now()}-${idCounter}`;
}

export function neueTeilzeitPhase(): TeilzeitPhase {
  return { id: newId(), dauerJahre: 3, quoteProzent: 50 };
}

export default function TeilzeitPhasenEditor({
  phasen,
  onChange,
}: {
  phasen: TeilzeitPhase[];
  onChange: (phasen: TeilzeitPhase[]) => void;
}) {
  const update = (id: string, patch: Partial<TeilzeitPhase>) => {
    onChange(phasen.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };
  const remove = (id: string) => {
    onChange(phasen.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm text-nebel">Teilzeit-Phasen</span>

      {phasen.length === 0 && (
        <p className="text-xs text-nebel/70">
          Keine Teilzeit-Phasen erfasst.
        </p>
      )}

      {phasen.map((phase, i) => (
        <div
          key={phase.id}
          className="flex items-end gap-4 border-b border-white/10 pb-4"
        >
          <div className="flex-1">
            <label className="block text-xs text-nebel/70">
              Phase {i + 1} – Dauer (Jahre)
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={phase.dauerJahre}
              min={0}
              max={40}
              step={0.5}
              onChange={(e) =>
                update(phase.id, { dauerJahre: e.target.valueAsNumber || 0 })
              }
              className="mt-1 w-full border-b border-white/20 bg-transparent py-1 text-white outline-none focus:border-gold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-nebel/70">Umfang (%)</label>
            <input
              type="number"
              inputMode="decimal"
              value={phase.quoteProzent}
              min={10}
              max={99}
              step={5}
              onChange={(e) =>
                update(phase.id, {
                  quoteProzent: e.target.valueAsNumber || 0,
                })
              }
              className="mt-1 w-full border-b border-white/20 bg-transparent py-1 text-white outline-none focus:border-gold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
          <button
            type="button"
            onClick={() => remove(phase.id)}
            aria-label="Phase entfernen"
            className="mb-1 h-8 w-8 shrink-0 text-nebel transition-colors hover:text-white"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...phasen, neueTeilzeitPhase()])}
        className="self-start text-sm font-semibold text-gold hover:opacity-80"
      >
        + Teilzeit-Phase hinzufügen
      </button>
    </div>
  );
}
