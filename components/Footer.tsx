import { NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-onyx">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-16 text-sm text-nebel md:grid-cols-3">
        <div>
          <p className="font-display text-base font-bold text-white">
            S² FINANZ
          </p>
          <p className="mt-3">Furthstraße 41/5</p>
          <p>73770 Denkendorf</p>
          <p className="mt-4 text-xs uppercase tracking-wide text-nebel/70">
            Silent Branding. Klare Beratung.
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
          <a href="/impressum" className="hover:text-white">
            Impressum
          </a>
          <a href="/datenschutz" className="hover:text-white">
            Datenschutz
          </a>
        </nav>
      </div>
    </footer>
  );
}
