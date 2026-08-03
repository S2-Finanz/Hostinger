import { NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-onyx">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-16 text-sm text-nebel md:grid-cols-3">
        <div>
          <p className="font-display text-base font-bold text-white">
            S² FINANZ
          </p>
          {/* TODO: Schreibweise "Furtstr." vs. "Furthstraße" mit dem Vermittlerregister-Eintrag abgleichen */}
          <p className="mt-3">Furtstr. 41/5</p>
          <p>73770 Denkendorf</p>
          <p className="mt-3">
            <a href="tel:+491741865960" className="hover:text-white">
              0174 1865960
            </a>
          </p>
          <p>
            <a href="mailto:info@s2-finanz.de" className="hover:text-white">
              info@s2-finanz.de
            </a>
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="flex flex-col gap-2">
          <a href="/impressum/" className="hover:text-white">
            Impressum
          </a>
          <a href="/datenschutz/" className="hover:text-white">
            Datenschutz
          </a>
        </nav>
      </div>
    </footer>
  );
}
