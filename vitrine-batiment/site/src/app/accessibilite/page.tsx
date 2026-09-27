import { EntetePage } from "@/components/entete-page";
import { config } from "@/lib/config";
import { metadonnees } from "@/lib/seo";

export const metadata = metadonnees({
  titre: "Accessibilité",
  description: "Niveau de conformité du site au RGAA 4.1 et au WCAG 2.1 niveau AA, points connus et moyen de signaler une difficulté.",
  chemin: "/accessibilite",
  indexable: false,
});

export default function Accessibilite() {
  return (
    <>
      <EntetePage titre="Accessibilité" fil={[{ href: "/accessibilite", libelle: "Accessibilité" }]} />

      <div className="conteneur prose-legale max-w-lisible py-16 md:py-20">
        <h2>Engagement</h2>
        <p>
          {config.entreprise.raisonSociale} s'attache à rendre ce site utilisable par tous, y compris par les personnes
          en situation de handicap. Le site est conçu pour respecter le référentiel RGAA 4.1, qui transpose le niveau
          AA des WCAG 2.1.
        </p>

        <h2>Ce qui est mis en œuvre</h2>
        <ul>
          <li>Navigation complète au clavier, avec un lien d'évitement vers le contenu principal.</li>
          <li>Prise de focus toujours visible, sans suppression du contour par défaut.</li>
          <li>Contrastes de couleurs vérifiés à un rapport minimal de 4,5:1 pour le texte courant.</li>
          <li>Structure de titres hiérarchisée, un seul titre de niveau 1 par page.</li>
          <li>Formulaires à étiquettes explicites, erreurs annoncées aux technologies d'assistance.</li>
          <li>Animations réduites lorsque le système signale la préférence « mouvement réduit ».</li>
          <li>Aucune information portée par la couleur seule.</li>
        </ul>

        <h2>Points d'amélioration connus</h2>
        <p>
          La galerie de réalisations utilise des visuels de remplacement en attendant les photographies définitives ;
          leurs descriptions alternatives seront complétées à la mise en ligne des images réelles.
        </p>

        <h2>Signaler une difficulté</h2>
        <p>
          Si vous rencontrez un obstacle, écrivez-nous à{" "}
          <a href={`mailto:${config.entreprise.email}`} className="lien-texte">
            {config.entreprise.email}
          </a>{" "}
          ou appelez le {config.entreprise.telephone}. Nous vous répondrons et vous transmettrons l'information
          recherchée par un autre moyen.
        </p>
        <p>
          En cas d'absence de réponse satisfaisante, vous pouvez saisir le Défenseur des droits —{" "}
          <a href="https://formulaire.defenseurdesdroits.fr" className="lien-texte" rel="noopener">
            formulaire.defenseurdesdroits.fr
          </a>
          .
        </p>
      </div>
    </>
  );
}
