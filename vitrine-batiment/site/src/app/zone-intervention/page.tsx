import { AppelAction } from "@/components/appel-action";
import { EntetePage } from "@/components/entete-page";
import { config } from "@/lib/config";
import { metadonnees } from "@/lib/seo";

const z = config.zoneIntervention;

export const metadata = metadonnees({
  titre: "Zone d'intervention",
  description: `Interventions à ${z.rayonKm} km autour de ${z.villeCentre} : ${z.villesPrincipales.slice(0, 5).join(", ")} et l'ensemble du Val-de-Marne.`,
  chemin: "/zone-intervention",
});

export default function ZoneIntervention() {
  return (
    <>
      <EntetePage
        titre={`Nos équipes partent de ${z.villeCentre}`}
        chapo={`Nous couvrons un rayon de ${z.rayonKm} km. Au-delà, nous acceptons les chantiers programmés mais pas les urgences : un délai que nous ne pouvons pas tenir, nous ne le promettons pas.`}
        fil={[{ href: "/zone-intervention", libelle: "Zone d'intervention" }]}
      />

      <div className="conteneur py-16 md:py-24">
        <dl className="grid gap-y-8 border-y border-bordure py-8 sm:grid-cols-3">
          <div>
            <dt className="text-[0.85rem] text-texte-attenue">Délai en urgence</dt>
            <dd className="mt-1 text-[1.75rem] font-semibold tracking-[-0.03em] text-encre">{z.delaiUrgence}</dd>
          </div>
          <div>
            <dt className="text-[0.85rem] text-texte-attenue">Rayon couvert</dt>
            <dd className="mt-1 text-[1.75rem] font-semibold tracking-[-0.03em] text-encre">{z.rayonKm} km</dd>
          </div>
          <div>
            <dt className="text-[0.85rem] text-texte-attenue">Départements</dt>
            <dd className="mt-1 text-[1.75rem] font-semibold tracking-[-0.03em] text-encre">
              {z.departements.map((d) => d.numero).join(", ")}
            </dd>
          </div>
        </dl>

        <section className="mt-16">
          <h2>Communes desservies sans majoration</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:grid-cols-4">
            {z.villesPrincipales.map((v) => (
              <li key={v} className="border-b border-bordure py-3 text-[0.975rem] text-texte-attenue">
                {v}
              </li>
            ))}
          </ul>
          <p className="mt-8 leading-relaxed text-texte-attenue">
            Cette liste n'est pas limitative : toute commune située à moins de {z.rayonKm} km de {z.villeCentre} est
            desservie aux mêmes conditions. Au-delà, un forfait de déplacement est ajouté au devis et vous est annoncé
            avant toute intervention.
          </p>
        </section>

        <section className="mt-16">
          <h2>Départements couverts</h2>
          <ul className="mt-8 border-t border-bordure">
            {z.departements.map((d) => (
              <li key={d.numero} className="flex items-baseline gap-5 border-b border-bordure py-4">
                <span className="w-10 text-[1.1rem] font-semibold text-encre">{d.numero}</span>
                <span className="text-[0.975rem] text-texte-attenue">{d.nom}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <AppelAction />
    </>
  );
}
