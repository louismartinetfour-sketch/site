import Link from "next/link";
import { EntetePage } from "@/components/entete-page";
import { adresseUneLigne, config, lienTelephone, prestationsActives } from "@/lib/config";
import { metadonnees } from "@/lib/seo";
import { textes } from "@/contenu/textes";
import { Formulaire } from "./formulaire";

export const metadata = metadonnees({
  titre: "Contact et demande de devis",
  description:
    "Décrivez votre chantier, nous revenons vers vous sous 24 heures ouvrées. Urgences : intervention sous 2 heures dans le Val-de-Marne.",
  chemin: "/contact",
});

export default function Contact() {
  const e = config.entreprise;
  const options = prestationsActives.map((p) => ({ slug: p.slug, libelle: p.libelle, metier: p.metier }));

  return (
    <>
      <EntetePage titre={textes.contact.titre} chapo={textes.contact.chapo} fil={[{ href: "/contact", libelle: "Contact" }]} />

      <div className="conteneur grid gap-14 py-16 md:grid-cols-[1fr_19rem] md:py-24">
        <Formulaire prestations={options} dureeConservation={config.rgpd.dureeConservationProspects} />

        <aside className="self-start space-y-8 text-[0.95rem]">
          <div>
            <h2 className="text-[1.05rem]">Urgence</h2>
            {e.telephoneUrgence && (
              <a href={lienTelephone(e.telephoneUrgence)} className="mt-2 block text-[1.5rem] font-semibold tracking-[-0.03em] text-encre">
                {e.telephoneUrgence}
              </a>
            )}
            <p className="mt-2 leading-relaxed text-texte-attenue">
              Fuite, panne de chauffage, coupure électrique : appelez plutôt que d'écrire. Intervention sous{" "}
              {config.zoneIntervention.delaiUrgence} dans la zone couverte.
            </p>
          </div>

          <div>
            <h2 className="text-[1.05rem]">Bureau</h2>
            <address className="mt-2 not-italic leading-relaxed text-texte-attenue">
              {adresseUneLigne()}
              <br />
              <a href={lienTelephone(e.telephone)} className="lien-texte">
                {e.telephone}
              </a>
              <br />
              <a href={`mailto:${e.email}`} className="lien-texte">
                {e.email}
              </a>
            </address>
          </div>

          <div>
            <h2 className="text-[1.05rem]">Horaires</h2>
            <dl className="mt-2 space-y-1.5 text-texte-attenue">
              {e.horaires.map((h) => (
                <div key={h.jours}>
                  <dt className="inline font-medium text-encre">{h.jours} : </dt>
                  <dd className="inline">{h.creneaux}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="border-t border-bordure pt-5 text-[0.85rem] leading-relaxed text-texte-attenue">
            Les informations transmises sont traitées par {config.rgpd.responsableTraitement} pour répondre à votre
            demande. Détail de vos droits dans la{" "}
            <Link href="/politique-de-confidentialite" className="lien-texte">
              politique de confidentialité
            </Link>
            .
          </p>
        </aside>
      </div>
    </>
  );
}
