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
  formatValue,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  formatValue: (value: number) => string;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-nebel">{label}</span>
        <span className="text-sm font-semibold text-gold">
          {formatValue(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-gold"
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
