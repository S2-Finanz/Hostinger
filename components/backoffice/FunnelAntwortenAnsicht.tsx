import { FRAGEN, type FunnelAntworten } from "@/lib/funnel";

function antwortLabel(frageId: string, wert: string): string {
  const option = FRAGEN[frageId]?.optionen.find((o) => o.wert === wert);
  return option?.label ?? wert;
}

export default function FunnelAntwortenAnsicht({
  antworten,
}: {
  antworten: FunnelAntworten;
}) {
  const eintraege = Object.entries(antworten).filter(([id]) => FRAGEN[id]);

  if (eintraege.length === 0) {
    return <p className="text-sm text-nebel">Keine Angaben.</p>;
  }

  return (
    <dl className="flex flex-col gap-3">
      {eintraege.map(([frageId, wert]) => (
        <div key={frageId}>
          <dt className="text-xs uppercase tracking-wide text-nebel/60">
            {FRAGEN[frageId].frage}
          </dt>
          <dd className="mt-1 text-sm text-white">
            {Array.isArray(wert)
              ? wert.map((w) => antwortLabel(frageId, w)).join(", ")
              : antwortLabel(frageId, wert)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
