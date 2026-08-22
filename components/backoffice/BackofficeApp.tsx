"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { ERLAUBTE_EMAIL_DOMAIN, istErlaubteEmail, supabase } from "@/lib/supabase";
import Kundenverwaltung from "@/components/backoffice/Kundenverwaltung";
import Kontaktanfragen from "@/components/backoffice/Kontaktanfragen";
import Provisionen from "@/components/backoffice/Provisionen";

type Modus = "login" | "signup";
type Bereich = "kunden" | "kontakt" | "provisionen";

const eingabeKlasse =
  "mt-1.5 block w-full rounded-sm border border-white/15 bg-onyx px-4 py-2.5 text-sm text-white placeholder:text-nebel/50 focus:border-gold focus:outline-none";

export default function BackofficeApp() {
  const [ladeStatus, setLadeStatus] = useState<"pruefe" | "bereit">("pruefe");
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLadeStatus("bereit");
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, neueSession) => {
      setSession(neueSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (ladeStatus === "pruefe") {
    return (
      <div className="mx-auto max-w-md rounded-sm border border-white/10 bg-graphit p-8 text-center text-sm text-nebel">
        Wird geladen …
      </div>
    );
  }

  if (session) {
    return <AuthenticatedView session={session} />;
  }

  return (
    <div className="mx-auto max-w-md">
      <AuthForm />
    </div>
  );
}

function AuthenticatedView({ session }: { session: Session }) {
  const [wirdAbgemeldet, setWirdAbgemeldet] = useState(false);
  const [bereich, setBereich] = useState<Bereich>("kunden");

  async function abmelden() {
    setWirdAbgemeldet(true);
    await supabase.auth.signOut();
    setWirdAbgemeldet(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-white/10 bg-graphit p-5">
        <p className="text-sm text-nebel">
          Angemeldet als <span className="font-semibold text-white">{session.user.email}</span>
        </p>
        <button
          type="button"
          onClick={abmelden}
          disabled={wirdAbgemeldet}
          className="rounded-sm border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {wirdAbgemeldet ? "Wird abgemeldet …" : "Abmelden"}
        </button>
      </div>

      <div className="flex w-fit rounded-sm border border-white/10 p-1 text-sm">
        <button
          type="button"
          onClick={() => setBereich("kunden")}
          className={`rounded-sm px-5 py-2 font-semibold transition-colors ${
            bereich === "kunden" ? "bg-gold text-onyx" : "text-nebel hover:text-white"
          }`}
        >
          Kunden
        </button>
        <button
          type="button"
          onClick={() => setBereich("kontakt")}
          className={`rounded-sm px-5 py-2 font-semibold transition-colors ${
            bereich === "kontakt" ? "bg-gold text-onyx" : "text-nebel hover:text-white"
          }`}
        >
          Kontaktanfragen
        </button>
        <button
          type="button"
          onClick={() => setBereich("provisionen")}
          className={`rounded-sm px-5 py-2 font-semibold transition-colors ${
            bereich === "provisionen" ? "bg-gold text-onyx" : "text-nebel hover:text-white"
          }`}
        >
          Provisionen
        </button>
      </div>

      {bereich === "kunden" && <Kundenverwaltung />}
      {bereich === "kontakt" && <Kontaktanfragen />}
      {bereich === "provisionen" && <Provisionen />}
    </div>
  );
}

function AuthForm() {
  const [modus, setModus] = useState<Modus>("login");
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [passwortWiederholen, setPasswortWiederholen] = useState("");
  const [wirdGesendet, setWirdGesendet] = useState(false);
  const [fehler, setFehler] = useState<string | null>(null);
  const [hinweis, setHinweis] = useState<string | null>(null);

  function wechsleModus(neuerModus: Modus) {
    setModus(neuerModus);
    setFehler(null);
    setHinweis(null);
    setPasswortWiederholen("");
  }

  async function absenden(e: FormEvent) {
    e.preventDefault();
    setFehler(null);
    setHinweis(null);

    if (modus === "signup") {
      if (!istErlaubteEmail(email)) {
        setFehler(
          `Die Registrierung ist nur mit einer @${ERLAUBTE_EMAIL_DOMAIN}-E-Mail-Adresse möglich.`,
        );
        return;
      }
      if (passwort.length < 6) {
        setFehler("Das Passwort muss mindestens 6 Zeichen lang sein.");
        return;
      }
      if (passwort !== passwortWiederholen) {
        setFehler("Die Passwörter stimmen nicht überein.");
        return;
      }

      setWirdGesendet(true);
      const { error } = await supabase.auth.signUp({ email, password: passwort });
      setWirdGesendet(false);

      if (error) {
        setFehler(error.message);
        return;
      }

      setHinweis(
        "Konto angelegt. Bitte bestätigen Sie Ihre E-Mail-Adresse über den Link, den wir Ihnen zugeschickt haben, bevor Sie sich anmelden.",
      );
      setPasswort("");
      setPasswortWiederholen("");
      return;
    }

    setWirdGesendet(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: passwort });
    setWirdGesendet(false);

    if (error) {
      setFehler(error.message);
    }
  }

  return (
    <div className="rounded-sm border border-white/10 bg-graphit p-8">
      <div className="mb-6 flex rounded-sm border border-white/10 p-1 text-sm">
        <button
          type="button"
          onClick={() => wechsleModus("login")}
          className={`flex-1 rounded-sm py-2 font-semibold transition-colors ${
            modus === "login" ? "bg-gold text-onyx" : "text-nebel hover:text-white"
          }`}
        >
          Anmelden
        </button>
        <button
          type="button"
          onClick={() => wechsleModus("signup")}
          className={`flex-1 rounded-sm py-2 font-semibold transition-colors ${
            modus === "signup" ? "bg-gold text-onyx" : "text-nebel hover:text-white"
          }`}
        >
          Konto anlegen
        </button>
      </div>

      <form onSubmit={absenden} className="flex flex-col gap-4">
        <label className="block">
          <span className="text-sm text-nebel">E-Mail-Adresse</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={`name@${ERLAUBTE_EMAIL_DOMAIN}`}
            className={eingabeKlasse}
          />
        </label>

        <label className="block">
          <span className="text-sm text-nebel">Passwort</span>
          <input
            type="password"
            required
            minLength={6}
            autoComplete={modus === "signup" ? "new-password" : "current-password"}
            value={passwort}
            onChange={(e) => setPasswort(e.target.value)}
            className={eingabeKlasse}
          />
        </label>

        {modus === "signup" && (
          <label className="block">
            <span className="text-sm text-nebel">Passwort wiederholen</span>
            <input
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={passwortWiederholen}
              onChange={(e) => setPasswortWiederholen(e.target.value)}
              className={eingabeKlasse}
            />
          </label>
        )}

        {modus === "signup" && (
          <p className="text-xs text-nebel">
            Die Registrierung ist ausschließlich mit einer @{ERLAUBTE_EMAIL_DOMAIN}
            -E-Mail-Adresse möglich.
          </p>
        )}

        {fehler && (
          <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
            {fehler}
          </p>
        )}
        {hinweis && (
          <p className="rounded-sm border border-gold/30 bg-gold/10 px-4 py-2.5 text-sm text-gold">
            {hinweis}
          </p>
        )}

        <button
          type="submit"
          disabled={wirdGesendet}
          className="mt-2 rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-onyx transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {wirdGesendet
            ? "Bitte warten …"
            : modus === "signup"
              ? "Konto anlegen"
              : "Anmelden"}
        </button>
      </form>
    </div>
  );
}
