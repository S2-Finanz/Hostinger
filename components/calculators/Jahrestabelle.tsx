import { formatEUR } from "@/components/calculators/ui";
import type { SparplanJahr } from "@/lib/sparplan";

export default function Jahrestabelle({
  jahreswerte,
  zeigeVorabpauschale = false,
}: {
  jahreswerte: SparplanJahr[];
  zeigeVorabpauschale?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-sm border border-white/10">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-nebel">
            <th className="px-3 py-2.5">Jahr</th>
            <th className="px-3 py-2.5 text-right">Wert Jahresanfang</th>
            <th className="px-3 py-2.5 text-right">Einzahlung</th>
            <th className="px-3 py-2.5 text-right">Ausgabeaufschlag</th>
            <th className="px-3 py-2.5 text-right">Wertzuwachs</th>
            <th className="px-3 py-2.5 text-right">Verw.-gebühr</th>
            {zeigeVorabpauschale && (
              <th className="px-3 py-2.5 text-right">Vorabpauschale-Steuer</th>
            )}
            <th className="px-3 py-2.5 text-right">Wert Jahresende</th>
            <th className="px-3 py-2.5 text-right">Gewinn kumuliert</th>
          </tr>
        </thead>
        <tbody>
          {jahreswerte.map((zeile) => (
            <tr key={zeile.jahr} className="border-b border-white/5 text-nebel last:border-b-0">
              <td className="px-3 py-2 text-white">{zeile.jahr}</td>
              <td className="px-3 py-2 text-right">{formatEUR(zeile.wertJahresanfang)}</td>
              <td className="px-3 py-2 text-right">{formatEUR(zeile.einzahlung)}</td>
              <td className="px-3 py-2 text-right">-{formatEUR(zeile.ausgabeaufschlag)}</td>
              <td className="px-3 py-2 text-right">{formatEUR(zeile.wertzuwachs)}</td>
              <td className="px-3 py-2 text-right">-{formatEUR(zeile.verwaltungsgebuehr)}</td>
              {zeigeVorabpauschale && (
                <td className="px-3 py-2 text-right">
                  -{formatEUR(zeile.vorabpauschaleSteuer)}
                </td>
              )}
              <td className="px-3 py-2 text-right text-white">
                {formatEUR(zeile.wertJahresende)}
              </td>
              <td className="px-3 py-2 text-right text-gold">
                {formatEUR(zeile.gewinnKumuliert)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
