import Link from "next/link";
import { AppelAction } from "@/components/appel-action";
import { EntetePage } from "@/components/entete-page";
import { euros, metiers, prestationsActives } from "@/lib/config";
import { metadonnees } from "@/lib/seo";

export const metadata = metadonnees({
  titre: "Nos prestations",
  description:
    "Plomberie, chauffage, climatisation, électricité et contrats d'entretien : le détail de nos interventions, les prix de départ et ce qui est compris.",
  chemin: "/prestations",
});

export default function Prestations() {
  return (
    <>
      <EntetePage
        titre="Nos prestations"
        chapo="Quatre corps d'état, une seule entreprise. Chaque fiche indique ce qui est compris dans le prix et ce qui ne l'est pas."
        fil={[{ href: "/prestations", libelle: "Nos prestations" }]}
      />

      <div className="conteneur py-16 md:py-24">
        {metiers.map((metier) => (
          <section key={metier} className="mb-16 last:mb-0">
            <h2 className="border-b border-bordure pb-4 text-[1.5rem]">{metier}</h2>
            <ul className="mt-2">
              {prestationsActives
                .filter((p) => p.metier === metier)
                .map((p) => (
                  <li key={p.slug} className="border-b border-bordure">
                    <Link href={`/prestations/${p.slug}`} className="group block py-7">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                        <h3 className="text-[1.25rem] text-encre group-hover:text-lien">{p.libelle}</h3>
                        {p.aPartirDe && (
                          <span className="text-[0.9rem] text-texte-attenue">
                            à partir de <strong className="font-semibold text-encre">{euros(p.aPartirDe)}</strong>
                          </span>
                        )}
                      </div>
                      <p className="mt-2 leading-relaxed text-texte-attenue">{p.resume}</p>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>

      <AppelAction />
    </>
  );
}
