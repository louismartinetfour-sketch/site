"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Lien = { href: string; libelle: string };

/** En-tête principal : navigation, téléphone, accès au simulateur. */
export function EnTete({
  nom,
  baseline,
  telephone,
  lienTel,
  liens,
}: {
  nom: string;
  baseline: string;
  telephone: string;
  lienTel: string;
  liens: Lien[];
}) {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);

  // Le menu mobile se referme à chaque changement de page.
  useEffect(() => setOuvert(false), [chemin]);

  // Fermeture au clavier (RGAA : toute action souris doit avoir un équivalent clavier).
  useEffect(() => {
    if (!ouvert) return;
    const surTouche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", surTouche);
    return () => document.removeEventListener("keydown", surTouche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 border-b border-bordure bg-fond/95 backdrop-blur">
      <div className="conteneur flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-2.5" aria-label={`${nom} — retour à l'accueil`}>
          <span className="text-[1.35rem] font-bold tracking-[-0.04em] text-encre">{nom}</span>
          <span className="hidden text-[0.7rem] leading-tight text-texte-attenue lg:block">{baseline}</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
          {liens.map((l) => {
            const actif = chemin === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={actif ? "page" : undefined}
                className={`border-b-2 pb-0.5 text-[0.9rem] font-medium transition-colors ${
                  actif ? "border-accent text-encre" : "border-transparent text-texte-attenue hover:text-encre"
                }`}
              >
                {l.libelle}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href={lienTel} className="hidden text-[0.9rem] font-semibold text-encre md:block">
            {telephone}
          </a>
          <Link href="/contact" className="bouton bouton-principal hidden !min-h-[2.6rem] !px-5 !text-[0.875rem] sm:inline-flex">
            Demander un devis
          </Link>
          <button
            type="button"
            onClick={() => setOuvert((v) => !v)}
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            className="flex h-11 w-11 items-center justify-center border border-bordure lg:hidden"
          >
            <span className="sr-only">{ouvert ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <span aria-hidden="true" className="flex flex-col gap-[5px]">
              <span className={`block h-[2px] w-5 bg-encre transition-transform ${ouvert ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-[2px] w-5 bg-encre transition-opacity ${ouvert ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] w-5 bg-encre transition-transform ${ouvert ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {ouvert && (
        <nav id="menu-mobile" aria-label="Navigation principale (mobile)" className="border-t border-bordure bg-fond lg:hidden">
          <ul className="conteneur py-2">
            {liens.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={chemin === l.href ? "page" : undefined}
                  className="block border-b border-bordure py-4 text-[1.05rem] font-medium text-encre last:border-0"
                >
                  {l.libelle}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <a href={lienTel} className="bouton bouton-principal w-full">
                Appeler le {telephone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
