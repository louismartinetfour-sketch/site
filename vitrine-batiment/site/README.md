# Socle « site vitrine + espace métier » — bâtiment

Base de code générique destinée aux entreprises du bâtiment de 10 à 50 salariés.
Une même application est déclinée pour plusieurs clients via un seul fichier de
configuration : aucune donnée client n'est écrite en dur.

**État d'avancement : partie 1 livrée** (site vitrine public, RGPD, mentions légales).
Parties 2 à 4 (simulateur de devis, espace authentifié, webhooks n8n) à venir.

---

## Stack

| Couche | Choix | Pourquoi |
|---|---|---|
| Framework | Next.js 15 (App Router) + TypeScript | Rendu statique → SEO local et Lighthouse élevé sans effort ; Server Actions → les traitements sensibles ne peuvent pas fuiter côté client |
| Styles | Tailwind 3 piloté par variables CSS | La palette vient de la configuration, pas du thème Tailwind |
| Validation | Zod | Un schéma unique valide le fichier de configuration et, plus tard, les écritures du back-office |
| Polices | `next/font` (Google Fonts auto-hébergées au build) | Aucune requête tierce à l'exécution, donc aucun cookie à déclarer |
| Hébergement | Clever Cloud / Scaleway (France) | Données en Union européenne |

Les pages sont générées statiquement : 20 routes prérendues, dont une fiche par
prestation du catalogue.

---

## Installation

```bash
git clone <dépôt> && cd vitrine-batiment
npm install
cp .env.example .env.local     # renseigner NEXT_PUBLIC_SITE_URL
npm run config:check           # valide la configuration client
npm run dev                    # http://localhost:3000
```

Le build échoue volontairement si la configuration est invalide : on ne déploie
jamais un site dont les mentions légales seraient incomplètes.

## Déploiement

```bash
npm run build
npm run start
```

Variables d'environnement en production :

| Variable | Rôle | Obligatoire |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonique, sitemap, schema.org | oui |
| `SEL_EMPREINTE` | Sel de hachage des adresses IP | oui |
| `N8N_WEBHOOK_URL` | Réception des demandes de contact | non (partie 4) |
| `N8N_WEBHOOK_TOKEN` | Authentification du webhook | non (partie 4) |

---

## Décliner pour un nouveau client

1. Dupliquer `config/client.config.ts` et le remplir.
2. Déposer `logo.svg`, `favicon.svg` et `partage.png` dans `public/marque/`.
3. Adapter `src/contenu/textes.ts` (textes éditoriaux et réalisations).
4. Déposer les photos de chantier dans `public/realisations/` et remplacer
   `VisuelRealisation` par `next/image`.
5. `npm run config:check`, puis `npm run build`.

Rien d'autre ne doit être modifié. Si un besoin client oblige à toucher au code
en dehors de ces cinq points, c'est que la configuration doit être étendue —
ajouter le champ au schéma Zod plutôt que coder un cas particulier.

### Trois catégories de données

| Catégorie | Source de vérité | Exemples |
|---|---|---|
| A. Identité et marque | le fichier de configuration | SIRET, assurance décennale, couleurs, durées de conservation |
| B. Catalogue et tarifs | le fichier initialise, la base fera foi (partie 3) | prestations, questions, coefficients |
| C. Contenu éditorial | le fichier initialise, la base fera foi (partie 3) | textes de pages, réalisations |

La catégorie A reste au build parce qu'elle engage juridiquement l'entreprise et
alimente les mentions légales : elle n'a pas à être modifiable depuis une
interface web.

---

## Conformité

### RGPD

- Aucun traceur non essentiel par défaut : `rgpd.cookiesTiers` est vide, donc
  **aucun bandeau n'est affiché**. C'est volontaire — un site qui ne dépose que
  des cookies strictement nécessaires n'a pas à demander de consentement
  (art. 82 de la loi Informatique et Libertés). Le bandeau est implémenté et
  s'active automatiquement dès qu'un traceur est déclaré dans la configuration.
- Quand il s'affiche, refuser est aussi simple qu'accepter : mêmes dimensions,
  même emplacement, même poids visuel. Choix conservé 6 mois, versionné,
  révocable depuis la politique de confidentialité.
- Les polices sont auto-hébergées au build : aucune requête vers Google à
  l'exécution, donc aucun transfert d'adresse IP hors UE.
- Les adresses IP ne sont jamais stockées en clair — seule une empreinte SHA-256
  salée sert de preuve de consentement.
- La politique de confidentialité liste finalités, bases légales, durées et
  destinataires, générés depuis la configuration.

### Mentions légales

Générées intégralement depuis la configuration : éditeur, immatriculation,
directeur de publication, hébergeur, **assurance décennale** (art. L.241-1 du
code des assurances) et **médiateur de la consommation** (art. L.612-1 du code
de la consommation, obligatoire dès lors qu'on vend à des particuliers).

### Accessibilité — RGAA 4.1 / WCAG 2.1 AA

Lien d'évitement, navigation clavier complète, focus toujours visible,
hiérarchie de titres respectée, étiquettes de formulaire explicites, erreurs
annoncées via `aria-describedby` et `role="alert"`, `prefers-reduced-motion`
respecté, aucune information portée par la couleur seule.

Contrôles restant à faire avant mise en ligne : audit axe-core ou Wave sur
chaque page, vérification des contrastes une fois la palette client définitive,
test au lecteur d'écran (NVDA ou VoiceOver).

### Sécurité du formulaire

Validation Zod côté serveur, champ piège anti-robots, limitation à 5 envois par
tranche de 10 minutes et par IP, en-têtes de sécurité posés dans `next.config.ts`
(HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).

> La limitation de débit est en mémoire : elle suffit pour une instance unique.
> Passer sur Redis dès qu'il y a plusieurs instances ou de l'autoscaling.

---

## Structure

```
config/
  client.schema.ts       schéma Zod — référence unique de validation
  client.config.ts       LE fichier à modifier par client
src/
  app/                   routes (vitrine, pages légales, sitemap, robots)
    contact/actions.ts   Server Action : validation, anti-spam, envoi n8n
  components/            en-tête, pied de page, bandeau cookies
  contenu/textes.ts      contenu éditorial par défaut (catégorie C)
  lib/
    config.ts            chargement et validation au démarrage
    seo.ts               métadonnées et données structurées LocalBusiness
    polices.ts           familles chargeables
scripts/verifier-config.ts
```

---

## Design

Palette et typographie sont configurables ; les valeurs par défaut viennent du
vocabulaire visuel du métier plutôt que d'un thème générique : bleu ardoise
`#14202B`, jaune de signalisation `#F2C230` utilisé avec parcimonie, filet
vertical « repère » qui marque le corps d'état concerné.

Les prestations sont présentées comme les lignes d'un devis — métier, intitulé,
prix de départ — et non comme une grille de cartes : c'est la forme sous
laquelle le public cible lit ce type d'information.

Une seule animation non déclenchée par l'utilisateur : l'entrée du titre
d'accueil, désactivée si le système demande un mouvement réduit.

---

## À faire avant mise en production

- [ ] Remplacer les visuels SVG de la galerie par les photos réelles (`next/image`)
- [ ] Fournir `public/marque/partage.png` (1200 × 630) pour les réseaux sociaux
- [ ] Vérifier le SIRET, le RCS et le numéro de police décennale auprès du client
- [ ] Définir `SEL_EMPREINTE` avec une valeur aléatoire propre à l'instance
- [ ] Audit Lighthouse et axe-core sur les six pages publiques
- [ ] Déclarer le site dans Google Search Console et y soumettre le sitemap
