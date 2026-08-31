export function NumberField({
  label,
  suffix,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
}: {
  label: string;
  suffix?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm text-nebel">{label}</span>
      <div className="mt-2 flex items-center gap-2 border-b border-white/20 pb-2 focus-within:border-gold">
        <input
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(e.target.valueAsNumber || 0)}
          className="w-full bg-transparent text-lg text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix && <span className="text-sm text-nebel">{suffix}</span>}
      </div>
    </label>
  );
}

export function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-nebel">{label}</span>
        <div className="flex items-baseline gap-1.5 border-b border-white/20 pb-0.5 focus-within:border-gold">
          <input
            type="number"
            inputMode="decimal"
            value={Number.isFinite(value) ? value : 0}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(e.target.valueAsNumber || 0)}
            className="w-20 bg-transparent text-right text-sm font-semibold text-gold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {suffix && <span className="text-sm text-nebel">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 block h-4 w-full cursor-pointer touch-none appearance-none rounded-full bg-transparent p-0
          [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none
          [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-gold
          [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-white/15
          [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-white/15
          [&::-webkit-slider-thumb]:mt-[-5px] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow"
      />
    </label>
  );
}

export function ResultRow({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between border-b border-white/10 py-3 last:border-b-0">
      <span className="text-sm text-nebel">{label}</span>
      <span
        className={
          emphasis
            ? "font-display text-2xl font-bold text-gold"
            : "text-base text-white"
        }
      >
        {value}
      </span>
    </div>
  );
}

export function formatEUR(value: number): string {
  if (!Number.isFinite(value)) return "–";
  return value.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

export function formatPercent(value: number, nachkommastellen = 2): string {
  if (!Number.isFinite(value)) return "–";
  return `${value.toLocaleString("de-DE", {
    minimumFractionDigits: nachkommastellen,
    maximumFractionDigits: nachkommastellen,
  })} %`;
}
