"use client";

import { useActionState } from "react";
import { envoyerDemande, type EtatFormulaire } from "./actions";

type Option = { slug: string; libelle: string; metier: string };

const initial: EtatFormulaire = { statut: "initial" };

export function Formulaire({ prestations, dureeConservation }: { prestations: Option[]; dureeConservation: string }) {
  const [etat, action, enCours] = useActionState(envoyerDemande, initial);

  if (etat.statut === "succes") {
    return (
      <div role="status" className="border-l-4 border-accent bg-fond-alterne p-7">
        <h2 className="text-[1.25rem]">Demande reçue</h2>
        <p className="mt-3 leading-relaxed text-texte-attenue">
          Un accusé de réception vient de vous être envoyé par e-mail. Un chargé d'affaires vous rappelle sous 24 heures
          ouvrées pour convenir d'une visite. {etat.message}
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-7">
      {etat.statut === "erreur" && etat.message && (
        <p role="alert" className="border-l-4 border-[#B3261E] bg-[#B3261E]/5 px-5 py-4 text-[0.95rem] text-[#8C1D18]">
          {etat.message}
        </p>
      )}

      <div className="grid gap-7 sm:grid-cols-2">
        <Champ nom="nom" libelle="Nom et prénom" erreur={etat.erreurs?.nom} autoComplete="name" />
        <Champ nom="email" libelle="Adresse e-mail" type="email" erreur={etat.erreurs?.email} autoComplete="email" />
        <Champ nom="telephone" libelle="Téléphone" type="tel" erreur={etat.erreurs?.telephone} autoComplete="tel" />
        <Champ nom="codePostal" libelle="Code postal du chantier" erreur={etat.erreurs?.codePostal} autoComplete="postal-code" inputMode="numeric" />
      </div>

      <div>
        <label htmlFor="prestation" className="block text-[0.9rem] font-semibold text-encre">
          Prestation concernée
        </label>
        <select
          id="prestation"
          name="prestation"
          required
          defaultValue=""
          aria-describedby={etat.erreurs?.prestation ? "err-prestation" : undefined}
          className="mt-2 h-12 w-full border border-bordure bg-fond px-3 text-[0.975rem]"
        >
          <option value="" disabled>
            Choisissez une prestation
          </option>
          {prestations.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.metier} — {p.libelle}
            </option>
          ))}
        </select>
        {etat.erreurs?.prestation && (
          <p id="err-prestation" className="mt-1.5 text-[0.85rem] text-[#8C1D18]">
            {etat.erreurs.prestation}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="text-[0.9rem] font-semibold text-encre">S'agit-il d'une urgence&nbsp;?</legend>
        <div className="mt-3 flex gap-6">
          {[
            { valeur: "non", libelle: "Non, chantier programmé" },
            { valeur: "oui", libelle: "Oui, intervention rapide" },
          ].map((o) => (
            <label key={o.valeur} className="flex items-center gap-2.5 text-[0.95rem]">
              <input type="radio" name="urgence" value={o.valeur} defaultChecked={o.valeur === "non"} className="h-5 w-5 accent-[var(--c-accent)]" />
              {o.libelle}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="block text-[0.9rem] font-semibold text-encre">
          Votre besoin
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-describedby={etat.erreurs?.message ? "err-message" : "aide-message"}
          className="mt-2 w-full border border-bordure bg-fond p-3 text-[0.975rem]"
        />
        <p id="aide-message" className="mt-1.5 text-[0.85rem] text-texte-attenue">
          Type de bâtiment, surface, contraintes d'accès, échéance souhaitée.
        </p>
        {etat.erreurs?.message && (
          <p id="err-message" className="mt-1.5 text-[0.85rem] text-[#8C1D18]">
            {etat.erreurs.message}
          </p>
        )}
      </div>

      {/* Champ piège : masqué aux humains et aux lecteurs d'écran, rempli par les robots. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="site">Ne pas remplir</label>
        <input id="site" name="site" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="border-t border-bordure pt-6">
        <label className="flex items-start gap-3 text-[0.9rem] leading-relaxed text-texte-attenue">
          <input type="checkbox" name="consentement" required className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--c-accent)]" />
          <span>
            J'accepte que ces informations soient utilisées pour traiter ma demande et établir un devis. Elles sont
            conservées {dureeConservation} et ne sont jamais cédées à des tiers.
          </span>
        </label>
        {etat.erreurs?.consentement && (
          <p className="mt-1.5 text-[0.85rem] text-[#8C1D18]">{etat.erreurs.consentement}</p>
        )}
      </div>

      <button type="submit" disabled={enCours} className="bouton bouton-principal w-full disabled:opacity-60 sm:w-auto">
        {enCours ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}

function Champ({
  nom,
  libelle,
  type = "text",
  erreur,
  ...reste
}: {
  nom: string;
  libelle: string;
  type?: string;
  erreur?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={nom} className="block text-[0.9rem] font-semibold text-encre">
        {libelle}
      </label>
      <input
        id={nom}
        name={nom}
        type={type}
        required
        aria-invalid={erreur ? true : undefined}
        aria-describedby={erreur ? `err-${nom}` : undefined}
        className="mt-2 h-12 w-full border border-bordure bg-fond px-3 text-[0.975rem]"
        {...reste}
      />
      {erreur && (
        <p id={`err-${nom}`} className="mt-1.5 text-[0.85rem] text-[#8C1D18]">
          {erreur}
        </p>
      )}
    </div>
  );
}
