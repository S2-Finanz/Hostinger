import Link from "next/link";
import { kategorieLabel, type WissenArtikelMeta } from "@/lib/wissen";

export default function ArtikelKarte({ artikel }: { artikel: WissenArtikelMeta }) {
  return (
    <Link
      href={`/wissen/${artikel.slug}/`}
      className="flex flex-col rounded-sm border border-white/10 bg-graphit p-6 transition-colors hover:border-gold/40"
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-gold">
        {kategorieLabel(artikel.category)}
      </span>
      <h3 className="mt-3 font-display text-lg font-semibold text-white">
        {artikel.title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-nebel">{artikel.description}</p>
      <p className="mt-4 text-xs text-nebel">
        {new Date(artikel.date).toLocaleDateString("de-DE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}{" "}
        · {artikel.lesezeitMinuten} Min. Lesezeit
      </p>
    </Link>
  );
}
