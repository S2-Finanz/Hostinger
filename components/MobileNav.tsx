"use client";

import { useState } from "react";
import Link from "next/link";
import { CAL_LINK, NAV_LINKS } from "@/lib/constants";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

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
        <div className="absolute inset-x-0 top-full border-b border-white/10 bg-onyx px-6 py-6">
          <nav className="flex flex-col gap-5 text-base text-nebel">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
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
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-sm bg-gold px-5 py-3 text-center text-sm font-semibold text-onyx transition-opacity hover:opacity-90"
          >
            Termin vereinbaren
          </Link>
        </div>
      )}
    </div>
  );
}
