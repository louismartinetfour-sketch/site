import type { ClientConfig } from "./client.schema";

/**
 * Configuration du client déployé sur cette instance.
 *
 * C'est le SEUL fichier à modifier pour décliner le socle vers un autre client.
 * Aucune donnée client ne doit apparaître ailleurs dans le code.
 *
 * Trois catégories de données, rappel :
 *  A. Identité et marque  -> ce fichier fait foi, modification par redéploiement.
 *  B. Catalogue et tarifs -> ce fichier sert de valeurs initiales, la base fera foi (partie 3).
 *  C. Contenu éditorial   -> idem, voir src/contenu/textes.ts.
 */
const config: ClientConfig = {
  entreprise: {
    nom: "Berthelin",
    raisonSociale: "Berthelin Technique du Bâtiment",
    formeJuridique: "SAS",
    capitalSocial: "80 000 €",
    siret: "48219073600024",
    rcs: "RCS Créteil 482 190 736",
    tvaIntracom: "FR 62 482190736",
    codeApe: "4322A",
    anneeCreation: 2005,
    effectif: "32 salariés",
    adresse: {
      voie: "14 rue des Ateliers",
      codePostal: "94100",
      ville: "Saint-Maur-des-Fossés",
      pays: "France",
    },
    telephone: "01 48 83 12 40",
    telephoneUrgence: "06 72 55 19 08",
    email: "contact@berthelin-btb.fr",
    directeurPublication: "Sophie Berthelin",
    assuranceDecennale: {
      assureur: "SMABTP",
      numeroPolice: "D-2019-447 218",
      couvertureGeographique: "France métropolitaine",
    },
    mediateurConsommation: {
      nom: "CNPM — Médiation de la consommation",
      adresse: "27 avenue de la Libération, 42400 Saint-Chamond",
      site: "https://www.cnpm-mediation-consommation.eu",
    },
    qualifications: [
      { libelle: "Qualibat 5312 — Installation thermique", numero: "5312" },
      { libelle: "Qualifelec Installations électriques", numero: "L3-E2" },
      { libelle: "RGE Reconnu Garant de l'Environnement" },
      { libelle: "Attestation de capacité fluides frigorigènes", numero: "Cat. I" },
    ],
    horaires: [
      { jours: "Lundi au vendredi", creneaux: "7h30 – 18h00" },
      { jours: "Samedi", creneaux: "8h00 – 12h00" },
      { jours: "Dimanche et jours fériés", creneaux: "Urgences uniquement" },
    ],
    reseaux: [],
  },

  marque: {
    logo: "/marque/logo.svg",
    favicon: "/marque/favicon.svg",
    couleurs: {
      encre: "#14202B",
      accent: "#F2C230",
      lien: "#1F6F7E",
      fond: "#FFFFFF",
      fondAlterne: "#EDEFEC",
      texte: "#1B2732",
      texteAttenue: "#55646F",
      bordure: "#D5DAD6",
    },
    polices: { titres: "Archivo", corps: "Archivo" },
    baseline: "Plomberie, chauffage et électricité dans le Val-de-Marne depuis 2005.",
  },

  seo: {
    urlCanonique: "https://www.berthelin-btb.fr",
    suffixeTitre: "Berthelin — Plomberie, chauffage, électricité (94)",
    descriptionParDefaut:
      "Entreprise multi-technique du Val-de-Marne : plomberie, chauffage, climatisation et électricité pour syndics, entreprises et particuliers. Devis sous 48 h.",
    typeLocalBusiness: "GeneralContractor",
    geo: { latitude: 48.7994, longitude: 2.4939 },
    imagePartage: "/marque/partage.png",
  },

  zoneIntervention: {
    departements: [
      { numero: "94", nom: "Val-de-Marne" },
      { numero: "75", nom: "Paris" },
      { numero: "93", nom: "Seine-Saint-Denis" },
      { numero: "77", nom: "Seine-et-Marne (ouest)" },
    ],
    villesPrincipales: [
      "Saint-Maur-des-Fossés",
      "Créteil",
      "Vincennes",
      "Nogent-sur-Marne",
      "Champigny-sur-Marne",
      "Charenton-le-Pont",
      "Ivry-sur-Seine",
      "Alfortville",
      "Maisons-Alfort",
      "Joinville-le-Pont",
    ],
    rayonKm: 35,
    villeCentre: "Saint-Maur-des-Fossés",
    delaiUrgence: "2 heures",
    coefDeplacementHorsZone: 150, // 1,50 € par km au-delà du rayon
  },

  catalogue: [
    {
      slug: "installation-chaudiere",
      libelle: "Installation de chaudière",
      metier: "Chauffage",
      resume: "Remplacement ou première installation, gaz, fioul ou pompe à chaleur.",
      description:
        "Dépose de l'ancien appareil, adaptation du réseau, pose, mise en service et réglage de la courbe de chauffe. Attestation de conformité et prise en charge du dossier d'aides.",
      points: [
        "Étude de dimensionnement avant devis",
        "Dépose et évacuation de l'ancien appareil incluses",
        "Mise en service et réglage par un technicien qualifié",
        "Dossier MaPrimeRénov' et CEE monté par nos soins",
      ],
      aPartirDe: 2400,
      tarif: {
        prixBase: 180000,
        coefficients: [
          { type: "multiplicateur_lineaire", question: "puissance_kw", parPoint: 1200 },
          {
            type: "table",
            question: "type_energie",
            valeurs: { Gaz: 1.0, Fioul: 1.15, "Pompe à chaleur": 1.6 },
          },
          { type: "palier", question: "etage", paliers: [{ seuil: 2, majoration: 8000 }] },
        ],
        plancher: 150000,
        plafond: 900000,
        amplitudeFourchette: 0.15,
      },
      questions: [
        { cle: "puissance_kw", libelle: "Puissance souhaitée", type: "nombre", unite: "kW", min: 8, max: 60, obligatoire: true },
        { cle: "type_energie", libelle: "Énergie", type: "liste", options: ["Gaz", "Fioul", "Pompe à chaleur"], obligatoire: true },
        { cle: "etage", libelle: "Étage de l'installation", type: "nombre", min: 0, max: 20, obligatoire: false },
      ],
      actif: true,
    },
    {
      slug: "renovation-salle-de-bain",
      libelle: "Rénovation de salle de bains",
      metier: "Plomberie",
      resume: "Reprise complète des réseaux, pose des équipements, finitions.",
      description:
        "Dépose, reprise de l'alimentation et de l'évacuation, pose des appareils sanitaires, raccordement électrique et ventilation. Coordination des corps d'état si carrelage et peinture sont inclus.",
      points: [
        "Un interlocuteur unique pour tous les corps d'état",
        "Réseaux repris aux normes NF DTU 60.1",
        "Chantier protégé et nettoyé chaque soir",
      ],
      aPartirDe: 4200,
      tarif: {
        prixBase: 320000,
        coefficients: [
          { type: "multiplicateur_lineaire", question: "surface_m2", parPoint: 9000 },
          { type: "multiplicateur_lineaire", question: "points_eau", parPoint: 45000 },
        ],
        plancher: 280000,
        plafond: 2500000,
        amplitudeFourchette: 0.2,
      },
      questions: [
        { cle: "surface_m2", libelle: "Surface de la pièce", type: "nombre", unite: "m²", min: 2, max: 40, obligatoire: true },
        { cle: "points_eau", libelle: "Nombre de points d'eau", type: "nombre", min: 1, max: 8, obligatoire: true },
        { cle: "carrelage_inclus", libelle: "Carrelage et finitions à notre charge ?", type: "booleen", obligatoire: true },
      ],
      actif: true,
    },
    {
      slug: "depannage-plomberie",
      libelle: "Dépannage plomberie",
      metier: "Plomberie",
      resume: "Fuite, engorgement, absence d'eau chaude : intervention sous 2 heures.",
      description:
        "Recherche de fuite non destructive, réparation de canalisation, débouchage, remplacement de groupe de sécurité ou de chauffe-eau. Devis annoncé avant toute intervention.",
      points: ["Intervention sous 2 h en urgence", "Tarif annoncé avant travaux", "Astreinte week-end et jours fériés"],
      aPartirDe: 120,
      tarif: {
        prixBase: 9000,
        coefficients: [{ type: "multiplicateur_lineaire", question: "duree_estimee_h", parPoint: 6500 }],
        plancher: 9000,
        plafond: 150000,
        amplitudeFourchette: 0.25,
      },
      questions: [
        { cle: "duree_estimee_h", libelle: "Durée d'intervention estimée", type: "nombre", unite: "h", min: 1, max: 8, obligatoire: true },
        { cle: "nature", libelle: "Nature du problème", type: "liste", options: ["Fuite", "Engorgement", "Eau chaude", "Autre"], obligatoire: true },
      ],
      actif: true,
    },
    {
      slug: "mise-aux-normes-electrique",
      libelle: "Mise aux normes électrique",
      metier: "Électricité",
      resume: "Tableau, différentiels, liaison à la terre : conformité NF C 15-100.",
      description:
        "Diagnostic de l'installation existante, remplacement du tableau, mise en place des dispositifs différentiels, reprise de la liaison équipotentielle et du circuit de terre. Attestation Consuel si nécessaire.",
      points: ["Diagnostic écrit remis avant travaux", "Conformité NF C 15-100", "Attestation Consuel prise en charge"],
      aPartirDe: 1350,
      tarif: {
        prixBase: 95000,
        coefficients: [
          { type: "multiplicateur_lineaire", question: "nb_circuits", parPoint: 7500 },
          { type: "table", question: "type_local", valeurs: { Logement: 1.0, Bureau: 1.2, "Local commercial": 1.35 } },
        ],
        plancher: 95000,
        plafond: 1200000,
        amplitudeFourchette: 0.18,
      },
      questions: [
        { cle: "nb_circuits", libelle: "Nombre de circuits à reprendre", type: "nombre", min: 2, max: 40, obligatoire: true },
        { cle: "type_local", libelle: "Type de local", type: "liste", options: ["Logement", "Bureau", "Local commercial"], obligatoire: true },
      ],
      actif: true,
    },
    {
      slug: "climatisation-reversible",
      libelle: "Climatisation réversible",
      metier: "Climatisation",
      resume: "Mono-split ou multi-split, dimensionnement et pose sous attestation fluides.",
      description:
        "Bilan thermique, choix des unités, percements, pose des liaisons frigorifiques, tirage au vide et mise en service. Contrat d'entretien annuel proposé séparément.",
      points: ["Bilan thermique pièce par pièce", "Techniciens titulaires de l'attestation fluides", "Contrat d'entretien optionnel"],
      aPartirDe: 1800,
      tarif: {
        prixBase: 140000,
        coefficients: [
          { type: "multiplicateur_lineaire", question: "nb_unites", parPoint: 68000 },
          { type: "palier", question: "etage", paliers: [{ seuil: 3, majoration: 12000 }] },
        ],
        plancher: 140000,
        plafond: 1400000,
        amplitudeFourchette: 0.18,
      },
      questions: [
        { cle: "nb_unites", libelle: "Nombre d'unités intérieures", type: "nombre", min: 1, max: 8, obligatoire: true },
        { cle: "etage", libelle: "Étage", type: "nombre", min: 0, max: 20, obligatoire: false },
      ],
      actif: true,
    },
    {
      slug: "contrat-entretien",
      libelle: "Contrat d'entretien",
      metier: "Multi-technique",
      resume: "Visite annuelle, dépannage prioritaire, pièces d'usure incluses.",
      description:
        "Entretien obligatoire des appareils de chauffage, contrôle des organes de sécurité, nettoyage, attestation d'entretien. Réservé aux syndics, bailleurs et gestionnaires de parc.",
      points: ["Visite annuelle planifiée", "Dépannage prioritaire sous 24 h", "Attestation d'entretien fournie"],
      aPartirDe: 180,
      tarif: {
        prixBase: 14000,
        coefficients: [{ type: "multiplicateur_lineaire", question: "nb_appareils", parPoint: 11000 }],
        plancher: 14000,
        plafond: 500000,
        amplitudeFourchette: 0.1,
      },
      questions: [
        { cle: "nb_appareils", libelle: "Nombre d'appareils à entretenir", type: "nombre", min: 1, max: 60, obligatoire: true },
      ],
      actif: true,
    },
  ],

  majorations: [
    { type: "pourcentage", code: "urgence", libelle: "Intervention en urgence", valeur: 25 },
    { type: "pourcentage", code: "weekend", libelle: "Samedi, dimanche et jours fériés", valeur: 30 },
    { type: "fixe", code: "hors_zone", libelle: "Déplacement hors zone", valeurCentimes: 4500 },
  ],

  rgpd: {
    responsableTraitement: "Berthelin Technique du Bâtiment (SAS)",
    contactDpo: "donnees@berthelin-btb.fr",
    dureeConservationProspects: "3 ans à compter du dernier contact",
    dureeConservationClients: "10 ans à compter de la fin du chantier (garantie décennale)",
    dureeConservationLogs: "6 mois",
    cookiesTiers: [], // aucun cookie non essentiel : pas de bandeau affiché
    hebergeur: {
      nom: "Clever Cloud SAS",
      adresse: "3 rue de l'Allier, 44000 Nantes",
      telephone: "02 85 52 07 69",
      pays: "France",
    },
  },

  integrations: {
    n8n: { urlWebhook: "env:N8N_WEBHOOK_URL", token: "env:N8N_WEBHOOK_TOKEN" },
  },
};

export default config;
