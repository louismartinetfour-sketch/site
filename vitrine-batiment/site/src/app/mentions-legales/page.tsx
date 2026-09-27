import { EntetePage } from "@/components/entete-page";
import { adresseUneLigne, config, urlSite } from "@/lib/config";
import { metadonnees } from "@/lib/seo";

export const metadata = metadonnees({
  titre: "Mentions légales",
  description:
    "Éditeur du site, directeur de la publication, hébergeur, assurance décennale, médiation de la consommation et propriété intellectuelle.",
  chemin: "/mentions-legales",
  indexable: false, // page obligatoire mais sans intérêt de référencement
});

/**
 * Mentions légales entièrement générées depuis la configuration.
 * Aucune donnée n'est écrite en dur : changer de client met la page à jour.
 * Base : art. 6-III de la LCEN, art. L.441-1 du code de la consommation,
 * art. L.241-1 du code des assurances pour la décennale.
 */
export default function MentionsLegales() {
  const e = config.entreprise;
  const h = config.rgpd.hebergeur;

  return (
    <>
      <EntetePage titre="Mentions légales" fil={[{ href: "/mentions-legales", libelle: "Mentions légales" }]} />

      <div className="conteneur prose-legale max-w-lisible py-16 md:py-20">
        <p className="text-[0.85rem] text-texte-attenue">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}.
        </p>

        <h2>Éditeur du site</h2>
        <dl>
          <dt>Raison sociale</dt>
          <dd>
            {e.raisonSociale} — {e.formeJuridique} au capital de {e.capitalSocial}
          </dd>
          <dt>Siège social</dt>
          <dd>{adresseUneLigne()}</dd>
          <dt>Immatriculation</dt>
          <dd>
            {e.rcs} — SIRET {e.siret}
            {e.codeApe && ` — code APE ${e.codeApe}`}
          </dd>
          <dt>Numéro de TVA intracommunautaire</dt>
          <dd>{e.tvaIntracom}</dd>
          <dt>Téléphone</dt>
          <dd>{e.telephone}</dd>
          <dt>Courriel</dt>
          <dd>
            <a href={`mailto:${e.email}`} className="lien-texte">
              {e.email}
            </a>
          </dd>
          <dt>Directeur de la publication</dt>
          <dd>{e.directeurPublication}</dd>
        </dl>

        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par {h.nom}, {h.adresse} ({h.pays}), téléphone {h.telephone}. Les données sont stockées
          sur des serveurs situés dans l'Union européenne.
        </p>

        <h2>Assurance professionnelle</h2>
        <p>
          {e.raisonSociale} a souscrit une assurance de responsabilité civile décennale auprès de{" "}
          {e.assuranceDecennale.assureur}, police n° {e.assuranceDecennale.numeroPolice}. Couverture géographique :{" "}
          {e.assuranceDecennale.couvertureGeographique}. L'attestation en cours de validité est jointe à chaque devis
          et communiquée sur simple demande.
        </p>

        <h2>Qualifications professionnelles</h2>
        <ul>
          {e.qualifications.map((q) => (
            <li key={q.libelle}>
              {q.libelle}
              {q.numero && ` — n° ${q.numero}`}
            </li>
          ))}
        </ul>

        {e.mediateurConsommation && (
          <>
            <h2>Médiation de la consommation</h2>
            <p>
              Conformément à l'article L.612-1 du code de la consommation, tout consommateur a le droit de recourir
              gratuitement à un médiateur en vue de la résolution amiable d'un litige, après avoir adressé une
              réclamation écrite restée sans réponse satisfaisante. Le médiateur désigné est{" "}
              {e.mediateurConsommation.nom}, {e.mediateurConsommation.adresse} —{" "}
              <a href={e.mediateurConsommation.site} className="lien-texte" rel="noopener">
                {e.mediateurConsommation.site.replace("https://", "")}
              </a>
              .
            </p>
          </>
        )}

        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur {urlSite.replace("https://", "")} — textes, photographies de chantiers,
          logotype, structure du site — est la propriété exclusive de {e.raisonSociale} ou fait l'objet d'une
          autorisation d'usage. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite
          préalable, est interdite et constitue une contrefaçon au sens des articles L.335-2 et suivants du code de la
          propriété intellectuelle.
        </p>

        <h2>Liens et responsabilité</h2>
        <p>
          Les informations publiées sur ce site sont fournies à titre indicatif. Les prix affichés sont des ordres de
          grandeur et ne constituent pas une offre contractuelle : seul un devis écrit, signé après visite technique,
          engage l'entreprise. {e.raisonSociale} ne saurait être tenue responsable du contenu des sites tiers vers
          lesquels des liens pourraient renvoyer.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Le traitement des données collectées sur ce site est décrit dans la{" "}
          <a href="/politique-de-confidentialite" className="lien-texte">
            politique de confidentialité
          </a>
          .
        </p>
      </div>
    </>
  );
}
