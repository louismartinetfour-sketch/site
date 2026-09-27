/**
 * Contenu éditorial par défaut (catégorie C).
 * Ces textes alimenteront la table `bloc_contenu` au premier démarrage ;
 * le responsable les modifiera ensuite depuis le back-office (partie 3).
 */
export const textes = {
  accueil: {
    titre: "Installer, dépanner, entretenir. Sans sous-traitance.",
    chapo:
      "Nos 32 techniciens salariés interviennent en plomberie, chauffage, climatisation et électricité pour les syndics, les entreprises et les particuliers du Val-de-Marne.",
    preuves: [
      { valeur: "2 h", legende: "Délai d'intervention en urgence" },
      { valeur: "32", legende: "Techniciens salariés, aucune sous-traitance" },
      { valeur: "48 h", legende: "Devis chiffré après visite" },
    ],
  },
  aPropos: {
    titre: "Une entreprise, quatre métiers, un seul interlocuteur",
    paragraphes: [
      "Berthelin a été créée en 2005 à Saint-Maur-des-Fossés autour d'une activité de plomberie. L'entreprise a progressivement intégré le chauffage, la climatisation puis l'électricité, pour répondre à une demande simple de ses clients gestionnaires : ne plus coordonner trois prestataires sur un même immeuble.",
      "Tous nos techniciens sont salariés. Nous ne sous-traitons pas : c'est ce qui nous permet de garantir un délai et une qualité d'exécution, et d'envoyer sur un chantier quelqu'un qui connaît déjà le bâtiment.",
      "La formation est continue — habilitations électriques, attestation fluides frigorigènes, évolutions de la NF C 15-100 et de la RE2020. Deux apprentis rejoignent l'entreprise chaque année.",
    ],
    equipe: [
      { nom: "Sophie Berthelin", role: "Direction", depuis: 2005 },
      { nom: "Karim Lahlou", role: "Conducteur de travaux — chauffage et climatisation", depuis: 2011 },
      { nom: "Marc Deville", role: "Conducteur de travaux — plomberie", depuis: 2008 },
      { nom: "Léa Rambaud", role: "Responsable électricité", depuis: 2017 },
      { nom: "Antoine Vasseur", role: "Chargé d'affaires syndics et bailleurs", depuis: 2019 },
    ],
  },
  realisations: [
    {
      titre: "Remplacement de 42 chaudières individuelles",
      client: "Syndic — résidence de 3 bâtiments",
      ville: "Créteil",
      annee: 2025,
      metier: "Chauffage",
      description:
        "Dépose et remplacement en site occupé, un logement par demi-journée, sans coupure de plus de quatre heures pour les résidents.",
      format: "large" as const,
    },
    {
      titre: "Rénovation complète des sanitaires",
      client: "Groupe scolaire",
      ville: "Champigny-sur-Marne",
      annee: 2025,
      metier: "Plomberie",
      description: "Reprise des réseaux, pose de robinetterie temporisée, chantier réalisé pendant les vacances d'été.",
      format: "standard" as const,
    },
    {
      titre: "Mise aux normes du tableau général",
      client: "Bureaux — 1 200 m²",
      ville: "Vincennes",
      annee: 2024,
      metier: "Électricité",
      description: "Remplacement du TGBT, reprise de 38 circuits, attestation Consuel obtenue du premier passage.",
      format: "standard" as const,
    },
    {
      titre: "Climatisation d'un plateau de bureaux",
      client: "Entreprise de services",
      ville: "Charenton-le-Pont",
      annee: 2024,
      metier: "Climatisation",
      description: "Multi-split 6 unités, liaisons frigorifiques en faux plafond, intervention hors heures ouvrées.",
      format: "standard" as const,
    },
    {
      titre: "Contrat d'entretien de 180 appareils",
      client: "Bailleur social",
      ville: "Ivry-sur-Seine",
      annee: 2023,
      metier: "Multi-technique",
      description: "Campagne annuelle de visites planifiée sur six semaines, taux de réalisation de 97 % au premier passage.",
      format: "large" as const,
    },
    {
      titre: "Recherche de fuite non destructive",
      client: "Copropriété",
      ville: "Nogent-sur-Marne",
      annee: 2023,
      metier: "Plomberie",
      description: "Localisation par caméra thermique et gaz traceur, réparation sans ouverture de dalle.",
      format: "standard" as const,
    },
  ],
  contact: {
    titre: "Parlons de votre chantier",
    chapo:
      "Décrivez votre besoin, nous revenons vers vous sous 24 heures ouvrées. Pour une urgence, l'appel reste le plus rapide.",
  },
};
