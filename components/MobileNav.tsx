"use client";

import { useState } from "react";
import Link from "next/link";
import { CAL_LINK, NAV_LINKS } from "@/lib/constants";
import { CALCULATOR_GROUPS } from "@/lib/calculators";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className={`shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
    >
      <path
        d="M5 2.5L9.5 7L5 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [rechnerOpen, setRechnerOpen] = useState(false);

  const close = () => {
    setOpen(false);
    setRechnerOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center text-white"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          aria-hidden
        >
          {open ? (
            <path
              d="M4 4L18 18M18 4L4 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ) : (
            <>
              <path
                d="M2 6H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M2 11H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M2 16H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100vh-64px)] overflow-y-auto border-b border-white/10 bg-onyx px-6 py-6">
          <nav className="flex flex-col gap-1 text-base text-nebel">
            {NAV_LINKS.map((link) =>
              link.label === "Rechner" ? (
                <div key={link.href} className="border-b border-white/5 py-3">
                  <button
                    type="button"
                    onClick={() => setRechnerOpen((v) => !v)}
                    aria-expanded={rechnerOpen}
                    className="flex w-full items-center justify-between text-left transition-colors hover:text-white"
                  >
                    Rechner
                    <ChevronIcon open={rechnerOpen} />
                  </button>

                  {rechnerOpen && (
                    <div className="mt-3 flex flex-col gap-4 border-l border-white/10 pl-4">
                      {CALCULATOR_GROUPS.map((group) => (
                        <div key={group.title}>
                          <p className="text-xs uppercase tracking-wide text-nebel/60">
                            {group.title}
                          </p>
                          <div className="mt-2 flex flex-col gap-2">
                            {group.items.map((calc) => (
                              <a
                                key={calc.href}
                                href={calc.href}
                                onClick={close}
                                className="text-sm text-nebel transition-colors hover:text-white"
                              >
                                {calc.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                      <a
                        href="/rechner/"
                        onClick={close}
                        className="text-sm font-semibold text-gold"
                      >
                        Alle Rechner ansehen →
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="border-b border-white/5 py-3 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>

          <Link
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="mt-6 block rounded-sm bg-gold px-5 py-3 text-center text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
          >
            Termin vereinbaren
          </Link>
        </div>
      )}
    </div>
  );
}
