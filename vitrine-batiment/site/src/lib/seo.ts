import type { Metadata } from "next";
import { adresseUneLigne, config, urlSite } from "./config";

type Options = {
  titre: string;
  description?: string;
  chemin: string;
  indexable?: boolean;
};

/** Construit les métadonnées d'une page à partir de la configuration client. */
export function metadonnees({ titre, description, chemin, indexable = true }: Options): Metadata {
  const desc = description ?? config.seo.descriptionParDefaut;
  const url = `${urlSite}${chemin}`;
  return {
    title: `${titre} | ${config.seo.suffixeTitre}`,
    description: desc,
    alternates: { canonical: url },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url,
      siteName: config.entreprise.nom,
      title: titre,
      description: desc,
      images: [{ url: `${urlSite}${config.seo.imagePartage}` }],
    },
  };
}

/**
 * Données structurées LocalBusiness.
 * Injectées une seule fois, dans le layout racine : Google n'en attend qu'une
 * occurrence par page, et la dupliquer dégrade l'éligibilité aux rich results.
 */
export function donneesStructurees() {
  const e = config.entreprise;
  const a = e.adresse;
  return {
    "@context": "https://schema.org",
    "@type": config.seo.typeLocalBusiness,
    "@id": `${urlSite}/#entreprise`,
    name: e.nom,
    legalName: e.raisonSociale,
    url: urlSite,
    telephone: e.telephone,
    email: e.email,
    foundingDate: String(e.anneeCreation),
    vatID: e.tvaIntracom,
    description: config.seo.descriptionParDefaut,
    image: `${urlSite}${config.seo.imagePartage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: [a.voie, a.complement].filter(Boolean).join(", "),
      postalCode: a.codePostal,
      addressLocality: a.ville,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.seo.geo.latitude,
      longitude: config.seo.geo.longitude,
    },
    areaServed: config.zoneIntervention.villesPrincipales.map((ville) => ({
      "@type": "City",
      name: ville,
    })),
    openingHoursSpecification: e.horaires.map((h) => ({
      "@type": "OpeningHoursSpecification",
      description: `${h.jours} : ${h.creneaux}`,
    })),
    makesOffer: config.catalogue
      .filter((p) => p.actif)
      .map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p.libelle, serviceType: p.metier },
        ...(p.aPartirDe
          ? { priceSpecification: { "@type": "PriceSpecification", minPrice: p.aPartirDe, priceCurrency: "EUR" } }
          : {}),
      })),
    hasCredential: e.qualifications.map((q) => q.libelle),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: e.telephone,
      areaServed: "FR",
      availableLanguage: "French",
    },
    location: { "@type": "Place", address: adresseUneLigne() },
  };
}
