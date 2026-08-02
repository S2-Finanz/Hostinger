import Link from "next/link";
import { CAL_LINK, NAV_LINKS } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-onyx/95 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <span className="font-display text-lg font-bold tracking-wide">
          S² FINANZ
        </span>

        <nav className="hidden gap-8 text-sm text-nebel md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Link
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm bg-gold px-5 py-2.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
        >
          Termin vereinbaren
        </Link>
      </div>
    </header>
  );
}
