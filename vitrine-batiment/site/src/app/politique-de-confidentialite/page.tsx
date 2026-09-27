import { EntetePage } from "@/components/entete-page";
import { config } from "@/lib/config";
import { metadonnees } from "@/lib/seo";

export const metadata = metadonnees({
  titre: "Politique de confidentialité",
  description:
    "Quelles données sont collectées, pourquoi, combien de temps elles sont conservées et comment exercer vos droits d'accès, de rectification et d'effacement.",
  chemin: "/politique-de-confidentialite",
  indexable: false,
});

/**
 * Politique de confidentialité générée depuis la configuration (RGPD, art. 13).
 * Les finalités reflètent exactement les traitements réellement mis en œuvre :
 * formulaire de contact, simulateur de devis, suivi de chantier.
 */
export default function Confidentialite() {
  const r = config.rgpd;
  const e = config.entreprise;

  const traitements = [
    {
      finalite: "Répondre à une demande de contact ou de devis",
      donnees: "Nom, e-mail, téléphone, code postal du chantier, description du besoin",
      base: "Mesures précontractuelles prises à votre demande (art. 6.1.b)",
      duree: r.dureeConservationProspects,
    },
    {
      finalite: "Estimer un montant via le simulateur de devis",
      donnees: "Réponses au questionnaire (surface, puissance, nombre de points d'eau…), coordonnées",
      base: "Mesures précontractuelles prises à votre demande (art. 6.1.b)",
      duree: r.dureeConservationProspects,
    },
    {
      finalite: "Exécuter et suivre un chantier, établir la facturation",
      donnees: "Coordonnées, adresse du chantier, photos d'intervention, documents contractuels",
      base: "Exécution du contrat (art. 6.1.b) et obligation légale de conservation comptable (art. 6.1.c)",
      duree: r.dureeConservationClients,
    },
    {
      finalite: "Assurer la sécurité du site et prévenir les abus",
      donnees: "Journaux de connexion, empreinte technique de l'adresse IP",
      base: "Intérêt légitime à protéger le service (art. 6.1.f)",
      duree: r.dureeConservationLogs,
    },
  ];

  return (
    <>
      <EntetePage
        titre="Politique de confidentialité"
        fil={[{ href: "/politique-de-confidentialite", libelle: "Politique de confidentialité" }]}
      />

      <div className="conteneur prose-legale max-w-lisible py-16 md:py-20">
        <p className="text-[0.85rem] text-texte-attenue">
          Version 2026-01 — dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}.
        </p>

        <h2>Qui traite vos données</h2>
        <p>
          Le responsable de traitement est {r.responsableTraitement}, dont le siège est situé {e.adresse.voie},{" "}
          {e.adresse.codePostal} {e.adresse.ville}. Pour toute question relative à vos données, écrivez à{" "}
          <a href={`mailto:${r.contactDpo}`} className="lien-texte">
            {r.contactDpo}
          </a>
          .
        </p>

        <h2>Ce que nous collectons et pourquoi</h2>
        <p>
          Nous ne collectons que les données nécessaires au traitement de votre demande. Aucune donnée n'est vendue ni
          cédée à des fins publicitaires.
        </p>
        {traitements.map((t) => (
          <div key={t.finalite} className="repere my-7">
            <h3>{t.finalite}</h3>
            <dl>
              <dt>Données concernées</dt>
              <dd>{t.donnees}</dd>
              <dt>Base légale</dt>
              <dd>{t.base}</dd>
              <dt>Durée de conservation</dt>
              <dd>{t.duree}</dd>
            </dl>
          </div>
        ))}

        <h2>Qui y a accès</h2>
        <ul>
          <li>Les salariés de {e.nom} habilités : chargés d'affaires, conducteurs de travaux, techniciens affectés.</li>
          <li>
            Notre hébergeur {r.hebergeur.nom} ({r.hebergeur.pays}), en qualité de sous-traitant au sens de l'article 28
            du RGPD.
          </li>
          <li>Notre prestataire d'automatisation des notifications, hébergé dans l'Union européenne.</li>
          <li>Le cas échéant, notre expert-comptable et nos assureurs, dans le cadre de leurs obligations propres.</li>
        </ul>
        <p>
          Aucune donnée n'est transférée en dehors de l'Union européenne. L'ensemble de l'infrastructure est hébergé
          en {r.hebergeur.pays}.
        </p>

        <h2>Vos droits</h2>
        <p>
          Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, d'opposition
          et de portabilité de vos données. Vous pouvez également définir des directives relatives à leur sort après
          votre décès.
        </p>
        <p>
          Pour exercer ces droits, écrivez à{" "}
          <a href={`mailto:${r.contactDpo}`} className="lien-texte">
            {r.contactDpo}
          </a>{" "}
          en précisant votre demande. Nous répondons dans un délai d'un mois. Une pièce d'identité pourra vous être
          demandée en cas de doute raisonnable sur votre identité.
        </p>
        <p>
          Le droit à l'effacement connaît une limite : les documents liés à un chantier réalisé sont conservés pendant
          la durée de la garantie décennale, car nous avons l'obligation de pouvoir en justifier.
        </p>
        <p>
          Si vous estimez que le traitement n'est pas conforme, vous pouvez introduire une réclamation auprès de la
          CNIL — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 —{" "}
          <a href="https://www.cnil.fr" className="lien-texte" rel="noopener">
            cnil.fr
          </a>
          .
        </p>

        <h2>Cookies et traceurs</h2>
        {r.cookiesTiers.length === 0 ? (
          <p>
            Ce site ne dépose aucun cookie de mesure d'audience, de publicité ni de réseau social. Seuls des cookies
            strictement nécessaires à son fonctionnement et à sa sécurité peuvent être utilisés ; conformément à
            l'article 82 de la loi Informatique et Libertés, ils sont dispensés de consentement, ce qui explique
            l'absence de bandeau.
          </p>
        ) : (
          <>
            <p>
              Les cookies strictement nécessaires au fonctionnement du site sont dispensés de consentement. Les
              traceurs ci-dessous ne sont déposés qu'après votre accord, recueilli via le bandeau affiché à votre
              première visite et modifiable à tout moment.
            </p>
            <ul>
              {r.cookiesTiers.map((c) => (
                <li key={c.nom}>
                  <strong>{c.nom}</strong> ({c.editeur}) — {c.finalite}. Durée de conservation : {c.duree}.
                </li>
              ))}
            </ul>
          </>
        )}

        <h2>Sécurité</h2>
        <p>
          Les échanges avec ce site sont chiffrés (HTTPS). Les accès à l'espace professionnel sont protégés par mot de
          passe haché, limitation des tentatives de connexion et journalisation des accès. Les adresses IP ne sont
          jamais conservées en clair : seule une empreinte irréversible est stockée à titre de preuve de consentement.
        </p>
      </div>
    </>
  );
}
