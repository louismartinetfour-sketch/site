import { z } from "zod";

/**
 * Schéma de validation de la configuration client.
 *
 * Ce fichier est LA référence unique : il valide `client.config.ts` au démarrage,
 * et il validera aussi (partie 3) les écritures du back-office. Un tarif saisi par
 * le responsable passe donc exactement les mêmes contrôles qu'un tarif écrit ici.
 */

const couleurHex = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "Couleur attendue au format hexadécimal, ex. #14202B");

/** Les secrets ne sont jamais écrits dans le fichier : on référence une variable d'environnement. */
const referenceSecret = z
  .string()
  .regex(/^env:[A-Z0-9_]+$/, 'Utiliser la notation "env:NOM_DE_LA_VARIABLE"');

// --- Identité de l'entreprise (catégorie A : modifiable uniquement par redéploiement) ---

const adresse = z.object({
  voie: z.string().min(1),
  complement: z.string().optional(),
  codePostal: z.string().regex(/^\d{5}$/),
  ville: z.string().min(1),
  pays: z.string().default("France"),
});

const entreprise = z.object({
  nom: z.string().min(1),
  raisonSociale: z.string().min(1),
  formeJuridique: z.string().min(1),
  capitalSocial: z.string().min(1),
  siret: z.string().regex(/^\d{14}$/, "SIRET : 14 chiffres"),
  rcs: z.string().min(1),
  tvaIntracom: z.string().min(1),
  codeApe: z.string().optional(),
  anneeCreation: z.number().int().min(1800).max(2100),
  effectif: z.string().optional(),
  adresse,
  telephone: z.string().min(1),
  telephoneUrgence: z.string().optional(),
  email: z.string().email(),
  directeurPublication: z.string().min(1),
  /** Obligatoire pour les métiers du bâtiment (art. L.241-1 du code des assurances). */
  assuranceDecennale: z.object({
    assureur: z.string().min(1),
    numeroPolice: z.string().min(1),
    couvertureGeographique: z.string().min(1),
  }),
  /** Médiateur de la consommation : obligatoire dès lors qu'on vend à des particuliers (art. L.612-1 code de la consommation). */
  mediateurConsommation: z.object({ nom: z.string(), adresse: z.string(), site: z.string().url() }).optional(),
  qualifications: z.array(z.object({ libelle: z.string(), numero: z.string().optional() })).default([]),
  horaires: z.array(z.object({ jours: z.string(), creneaux: z.string() })).default([]),
  reseaux: z.array(z.object({ reseau: z.string(), url: z.string().url() })).default([]),
});

// --- Marque ---

const marque = z.object({
  logo: z.string().min(1),
  favicon: z.string().min(1),
  couleurs: z.object({
    encre: couleurHex,
    accent: couleurHex,
    lien: couleurHex,
    fond: couleurHex,
    fondAlterne: couleurHex,
    texte: couleurHex,
    texteAttenue: couleurHex,
    bordure: couleurHex,
  }),
  /** Noms de familles Google Fonts. Voir src/lib/polices.ts pour les familles chargeables. */
  polices: z.object({ titres: z.string(), corps: z.string() }),
  baseline: z.string().min(1),
});

// --- Référencement ---

const seo = z.object({
  urlCanonique: z.string().url(),
  suffixeTitre: z.string().min(1),
  descriptionParDefaut: z.string().min(50).max(160),
  /** Type schema.org : Plumber, Electrician, HVACBusiness, GeneralContractor… */
  typeLocalBusiness: z.string().min(1),
  geo: z.object({ latitude: z.number(), longitude: z.number() }),
  imagePartage: z.string().min(1),
  verificationGoogle: z.string().optional(),
});

// --- Zone d'intervention ---

const zoneIntervention = z.object({
  departements: z.array(z.object({ numero: z.string(), nom: z.string() })).min(1),
  villesPrincipales: z.array(z.string()).min(1),
  rayonKm: z.number().int().positive(),
  villeCentre: z.string().min(1),
  delaiUrgence: z.string().min(1),
  /** Majoration kilométrique au-delà du rayon, en centimes par km (partie 2). */
  coefDeplacementHorsZone: z.number().int().nonnegative().default(0),
});

// --- Catalogue et tarification (consommé par le simulateur, partie 2) ---

const question = z.object({
  cle: z.string().regex(/^[a-z0-9_]+$/),
  libelle: z.string().min(1),
  aide: z.string().optional(),
  type: z.enum(["nombre", "liste", "booleen", "texte"]),
  options: z.array(z.string()).optional(),
  unite: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  obligatoire: z.boolean().default(true),
});

const coefficient = z.discriminatedUnion("type", [
  z.object({ type: z.literal("multiplicateur_lineaire"), question: z.string(), parPoint: z.number().int() }),
  z.object({ type: z.literal("table"), question: z.string(), valeurs: z.record(z.number()) }),
  z.object({
    type: z.literal("palier"),
    question: z.string(),
    paliers: z.array(z.object({ seuil: z.number(), majoration: z.number().int() })),
  }),
]);

const prestation = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  libelle: z.string().min(1),
  metier: z.string().min(1),
  resume: z.string().min(1),
  description: z.string().min(1),
  points: z.array(z.string()).default([]),
  /** Affiché sur le site vitrine, en euros TTC, à titre indicatif. */
  aPartirDe: z.number().int().positive().optional(),
  tarif: z.object({
    prixBase: z.number().int().positive(), // centimes
    coefficients: z.array(coefficient).default([]),
    plancher: z.number().int().positive(),
    plafond: z.number().int().positive(),
    amplitudeFourchette: z.number().min(0).max(0.5),
  }),
  questions: z.array(question).default([]),
  actif: z.boolean().default(true),
});

const majoration = z.discriminatedUnion("type", [
  z.object({ type: z.literal("pourcentage"), code: z.string(), libelle: z.string(), valeur: z.number() }),
  z.object({ type: z.literal("fixe"), code: z.string(), libelle: z.string(), valeurCentimes: z.number().int() }),
]);

// --- RGPD ---

const rgpd = z.object({
  responsableTraitement: z.string().min(1),
  contactDpo: z.string().email(),
  dureeConservationProspects: z.string().min(1),
  dureeConservationClients: z.string().min(1),
  dureeConservationLogs: z.string().min(1),
  /** Cookies non essentiels. Tableau vide = aucun bandeau à afficher (doctrine CNIL). */
  cookiesTiers: z
    .array(
      z.object({
        categorie: z.enum(["mesure_audience", "publicite", "reseaux_sociaux", "autre"]),
        nom: z.string(),
        editeur: z.string(),
        finalite: z.string(),
        duree: z.string(),
      }),
    )
    .default([]),
  hebergeur: z.object({ nom: z.string(), adresse: z.string(), telephone: z.string(), pays: z.string() }),
});

// --- Racine ---

export const clientSchema = z.object({
  entreprise,
  marque,
  seo,
  zoneIntervention,
  catalogue: z.array(prestation).min(1),
  majorations: z.array(majoration).default([]),
  rgpd,
  integrations: z.object({
    n8n: z.object({ urlWebhook: referenceSecret, token: referenceSecret }).optional(),
  }),
});

export type ClientConfig = z.infer<typeof clientSchema>;
export type Prestation = z.infer<typeof prestation>;
export type Question = z.infer<typeof question>;
