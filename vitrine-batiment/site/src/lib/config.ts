import brut from "@config/client.config";
import { clientSchema, type ClientConfig } from "@config/client.schema";

/**
 * Charge et valide la configuration une seule fois, au démarrage du serveur.
 * Une configuration invalide fait échouer le build : on ne déploie jamais un
 * site dont les mentions légales seraient incomplètes.
 */
function charger(): ClientConfig {
  const resultat = clientSchema.safeParse(brut);
  if (!resultat.success) {
    const details = resultat.error.issues
      .map((i) => `  • ${i.path.join(".")} : ${i.message}`)
      .join("\n");
    throw new Error(`Configuration client invalide :\n${details}`);
  }
  return resultat.data;
}

export const config = charger();

/** Prestations actives, dans l'ordre du catalogue. */
export const prestationsActives = config.catalogue.filter((p) => p.actif);

/** Métiers distincts présents au catalogue, pour la navigation et les filtres. */
export const metiers = [...new Set(prestationsActives.map((p) => p.metier))];

/** Adresse postale sur une ligne. */
export function adresseUneLigne(): string {
  const a = config.entreprise.adresse;
  return [a.voie, a.complement, `${a.codePostal} ${a.ville}`].filter(Boolean).join(", ");
}

/** Numéro de téléphone au format tel: (E.164 France). */
export function lienTelephone(numero: string): string {
  return `tel:+33${numero.replace(/\D/g, "").replace(/^0/, "")}`;
}

/** Formate un montant en euros, sans centimes. */
export function euros(montant: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(montant);
}

export const urlSite = process.env.NEXT_PUBLIC_SITE_URL ?? config.seo.urlCanonique;
