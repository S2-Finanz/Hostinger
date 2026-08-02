"use client";

import type { ElternzeitPhase } from "@/lib/besoldung/types";
import { ELTERNZEIT_MAX_JAHRE_PRO_KIND } from "@/lib/besoldung/ruhegehalt";

let idCounter = 0;
function newId() {
  idCounter += 1;
  return `ez-${Date.now()}-${idCounter}`;
}

export default function ElternzeitPhasenEditor({
  phasen,
  onChange,
}: {
  phasen: ElternzeitPhase[];
  onChange: (phasen: ElternzeitPhase[]) => void;
}) {
  const update = (id: string, patch: Partial<ElternzeitPhase>) => {
    onChange(phasen.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };
  const remove = (id: string) => {
    onChange(
      phasen
        .filter((p) => p.id !== id)
        .map((p, i) => ({ ...p, kindNummer: i + 1 })),
    );
  };
  const add = () => {
    onChange([
      ...phasen,
      { id: newId(), kindNummer: phasen.length + 1, dauerJahre: 2 },
    ]);
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm text-nebel">
        Elternzeit-Phasen (bis {ELTERNZEIT_MAX_JAHRE_PRO_KIND} Jahre pro Kind
        voll angerechnet)
      </span>

      {phasen.length === 0 && (
        <p className="text-xs text-nebel/70">
          Keine Elternzeit-Phasen erfasst.
        </p>
      )}

      {phasen.map((phase) => (
        <div
          key={phase.id}
          className="flex items-end gap-4 border-b border-white/10 pb-4"
        >
          <div className="flex-1">
            <label className="block text-xs text-nebel/70">
              Kind {phase.kindNummer} – Elternzeit (Jahre)
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={phase.dauerJahre}
              min={0}
              max={10}
              step={0.5}
              onChange={(e) =>
                update(phase.id, { dauerJahre: e.target.valueAsNumber || 0 })
              }
              className="mt-1 w-full border-b border-white/20 bg-transparent py-1 text-white outline-none focus:border-gold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
          <button
            type="button"
            onClick={() => remove(phase.id)}
            aria-label="Kind entfernen"
            className="mb-1 h-8 w-8 shrink-0 text-nebel transition-colors hover:text-white"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="self-start text-sm font-semibold text-gold hover:opacity-80"
      >
        + Kind hinzufügen
      </button>
    </div>
  );
}
