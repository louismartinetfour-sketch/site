"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type CookieTiers = {
  categorie: "mesure_audience" | "publicite" | "reseaux_sociaux" | "autre";
  nom: string;
  editeur: string;
  finalite: string;
  duree: string;
};

const CLE = "consentement-cookies";
/** Incrémenter à chaque ajout de traceur : le consentement précédent est alors redemandé. */
const VERSION = 1;
/** Durée de conservation du choix, recommandation CNIL : 6 mois. */
const DUREE_MOIS = 6;

const LIBELLES: Record<CookieTiers["categorie"], string> = {
  mesure_audience: "Mesure d'audience",
  publicite: "Publicité",
  reseaux_sociaux: "Réseaux sociaux",
  autre: "Autres traceurs",
};

type Choix = Record<string, boolean>;

/**
 * Bandeau de consentement.
 *
 * Il n'est monté par le layout que si la configuration déclare au moins un
 * traceur non essentiel : un site qui ne dépose que des cookies strictement
 * nécessaires n'a pas à demander de consentement, et afficher un bandeau
 * inutile est une mauvaise pratique autant qu'un frein à la conversion.
 *
 * Exigences respectées : refuser est aussi simple qu'accepter (même niveau,
 * même poids visuel), aucun traceur n'est déposé avant le choix, le choix est
 * conservé 6 mois et reste modifiable depuis la politique de confidentialité.
 */
export function BandeauCookies({ cookies }: { cookies: CookieTiers[] }) {
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState(false);
  const [choix, setChoix] = useState<Choix>({});
  const premierBouton = useRef<HTMLButtonElement>(null);

  const categories = [...new Set(cookies.map((c) => c.categorie))];

  useEffect(() => {
    try {
      const brut = localStorage.getItem(CLE);
      if (!brut) return setVisible(true);
      const enregistre = JSON.parse(brut) as { version: number; expire: number };
      if (enregistre.version !== VERSION || Date.now() > enregistre.expire) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible) premierBouton.current?.focus();
  }, [visible]);

  function enregistrer(valeurs: Choix) {
    const expire = Date.now() + DUREE_MOIS * 30 * 24 * 3600 * 1000;
    localStorage.setItem(CLE, JSON.stringify({ version: VERSION, choix: valeurs, expire, date: new Date().toISOString() }));
    // Point d'accroche pour le chargement conditionnel des scripts tiers.
    window.dispatchEvent(new CustomEvent("consentement", { detail: valeurs }));
    setVisible(false);
  }

  const toutes = (valeur: boolean) =>
    enregistrer(Object.fromEntries(categories.map((c) => [c, valeur])));

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="titre-cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-accent bg-encre text-white"
    >
      <div className="conteneur py-6">
        <h2 id="titre-cookies" className="text-lg font-semibold">
          Ce site utilise des traceurs
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/75">
          Les cookies nécessaires au fonctionnement du site sont toujours actifs. Les autres ne sont déposés
          qu'avec votre accord. Vous pouvez changer d'avis à tout moment depuis la{" "}
          <Link href="/politique-de-confidentialite" className="underline underline-offset-4 hover:text-accent">
            politique de confidentialité
          </Link>
          .
        </p>

        {detail && (
          <ul className="mt-5 divide-y divide-white/15 border-y border-white/15">
            {categories.map((cat) => (
              <li key={cat} className="flex items-start justify-between gap-6 py-4">
                <div>
                  <p className="text-sm font-semibold">{LIBELLES[cat]}</p>
                  <ul className="mt-1 space-y-0.5 text-xs text-white/60">
                    {cookies
                      .filter((c) => c.categorie === cat)
                      .map((c) => (
                        <li key={c.nom}>
                          {c.nom} ({c.editeur}) — {c.finalite}. Conservation : {c.duree}.
                        </li>
                      ))}
                  </ul>
                </div>
                <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={choix[cat] ?? false}
                    onChange={(e) => setChoix((v) => ({ ...v, [cat]: e.target.checked }))}
                    className="h-5 w-5 accent-[var(--c-accent)]"
                  />
                  Autoriser
                </label>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button ref={premierBouton} type="button" onClick={() => toutes(true)} className="bouton bouton-principal sm:flex-1">
            Tout accepter
          </button>
          {/* Même taille, même emplacement, même hiérarchie visuelle que « Tout accepter ». */}
          <button type="button" onClick={() => toutes(false)} className="bouton bouton-sombre sm:flex-1">
            Tout refuser
          </button>
          {detail ? (
            <button type="button" onClick={() => enregistrer(choix)} className="bouton bouton-sombre sm:flex-1">
              Enregistrer mes choix
            </button>
          ) : (
            <button type="button" onClick={() => setDetail(true)} className="bouton bouton-sombre sm:flex-1">
              Personnaliser
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
