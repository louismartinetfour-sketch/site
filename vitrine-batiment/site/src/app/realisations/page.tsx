import { AppelAction } from "@/components/appel-action";
import { EntetePage } from "@/components/entete-page";
import { VisuelRealisation } from "@/components/visuel-realisation";
import { metadonnees } from "@/lib/seo";
import { textes } from "@/contenu/textes";

export const metadata = metadonnees({
  titre: "Réalisations",
  description:
    "Chantiers réalisés pour des syndics, des bailleurs, des entreprises et des particuliers du Val-de-Marne : chauffage, plomberie, électricité, climatisation.",
  chemin: "/realisations",
});

export default function Realisations() {
  return (
    <>
      <EntetePage
        titre="Réalisations"
        chapo="Une sélection de chantiers, avec ce qui a été fait et dans quelles conditions. Les noms des clients particuliers ne sont pas publiés."
        fil={[{ href: "/realisations", libelle: "Réalisations" }]}
      />

      <div className="conteneur py-16 md:py-24">
        <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {textes.realisations.map((r, i) => (
            <li key={r.titre} className={r.format === "large" ? "sm:col-span-2" : undefined}>
              <div className={r.format === "large" ? "aspect-[16/9]" : "aspect-[4/3]"}>
                <VisuelRealisation metier={r.metier} index={i} />
              </div>
              <div className="repere mt-6">
                <h2 className="text-[1.25rem]">{r.titre}</h2>
                <p className="mt-1.5 text-[0.875rem] text-texte-attenue">
                  {r.client} — {r.ville}, {r.annee}
                </p>
                <p className="mt-3 leading-relaxed text-texte-attenue">{r.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <AppelAction />
    </>
  );
}
