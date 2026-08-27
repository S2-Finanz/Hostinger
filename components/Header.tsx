import Image from "next/image";
import Link from "next/link";
import { CAL_LINK, NAV_LINKS } from "@/lib/constants";
import { CALCULATOR_GROUPS } from "@/lib/calculators";
import MobileNav from "@/components/MobileNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-onyx/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-content items-center justify-between px-6 py-2">
        <div className="flex shrink-0 items-center gap-3">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="S² Finanz"
              width={924}
              height={928}
              priority
              className="h-20 w-auto"
            />
          </Link>
          <span className="hidden shrink-0 rounded-sm border border-red-500/40 bg-red-500/10 px-2 py-1 text-[11px] font-bold text-red-400 lg:inline-block">
            Homepage nicht Live!
          </span>
        </div>

        <nav className="hidden gap-8 text-sm text-nebel md:flex">
          {NAV_LINKS.map((link) =>
            link.label === "Rechner" ? (
              <div key={link.href} className="group relative">
                <a
                  href={link.href}
                  className="flex items-center gap-1 py-2 transition-colors hover:text-white"
                >
                  Rechner
                </a>

                <div className="invisible absolute left-1/2 top-full flex w-[780px] -translate-x-1/2 gap-8 rounded-sm border border-white/10 bg-graphit p-6 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {CALCULATOR_GROUPS.map((group) => (
                    <div key={group.title} className="min-w-[150px] flex-1">
                      <p className="text-xs uppercase tracking-wide text-nebel/60">
                        {group.title}
                      </p>
                      <div className="mt-3 flex flex-col gap-2">
                        {group.items.map((calc) => (
                          <a
                            key={calc.href}
                            href={calc.href}
                            className="text-sm text-nebel transition-colors hover:text-white"
                          >
                            {calc.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="py-2 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <MobileNav />

          <Link
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-gold px-5 py-2.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
          >
            Termin vereinbaren
          </Link>
        </div>
      </div>
    </header>
  );
}
