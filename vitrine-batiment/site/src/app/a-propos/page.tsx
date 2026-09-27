import { AppelAction } from "@/components/appel-action";
import { EntetePage } from "@/components/entete-page";
import { config } from "@/lib/config";
import { metadonnees } from "@/lib/seo";
import { textes } from "@/contenu/textes";

export const metadata = metadonnees({
  titre: "À propos",
  description:
    "Entreprise familiale créée en 2005 à Saint-Maur-des-Fossés, 32 salariés, quatre corps d'état internalisés. Qualifications, assurances et organisation.",
  chemin: "/a-propos",
});

export default function APropos() {
  const t = textes.aPropos;
  const e = config.entreprise;

  return (
    <>
      <EntetePage titre={t.titre} fil={[{ href: "/a-propos", libelle: "À propos" }]} />

      <div className="conteneur py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-[1fr_18rem]">
          <div className="space-y-6">
            {t.paragraphes.map((p, i) => (
              <p key={i} className="text-[1.05rem] leading-relaxed text-texte-attenue">
                {p}
              </p>
            ))}
          </div>

          <aside className="self-start">
            <h2 className="text-[1.1rem]">Qualifications et assurances</h2>
            <ul className="mt-5">
              {e.qualifications.map((q) => (
                <li key={q.libelle} className="border-b border-bordure py-3 text-[0.9rem] text-texte-attenue first:border-t">
                  {q.libelle}
                  {q.numero && <span className="block text-[0.8rem] text-texte-attenue/70">n° {q.numero}</span>}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.85rem] leading-relaxed text-texte-attenue">
              Assurance décennale souscrite auprès de {e.assuranceDecennale.assureur}, police n°{" "}
              {e.assuranceDecennale.numeroPolice}. Attestation transmise sur demande avec chaque devis.
            </p>
          </aside>
        </div>

        <section className="mt-20">
          <h2>L'équipe d'encadrement</h2>
          <ul className="mt-8 border-t border-bordure">
            {t.equipe.map((m) => (
              <li key={m.nom} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-bordure py-5">
                <span className="text-[1.1rem] font-semibold text-encre">{m.nom}</span>
                <span className="flex-1 text-[0.975rem] text-texte-attenue md:px-8">{m.role}</span>
                <span className="text-[0.85rem] text-texte-attenue">dans l'entreprise depuis {m.depuis}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <AppelAction />
    </>
  );
}
