import Link from "next/link";
import { AppelAction } from "@/components/appel-action";
import { VisuelRealisation } from "@/components/visuel-realisation";
import { config, euros, lienTelephone, metiers, prestationsActives } from "@/lib/config";
import { metadonnees } from "@/lib/seo";
import { textes } from "@/contenu/textes";

export const metadata = metadonnees({
  titre: `Plomberie, chauffage et électricité à ${config.entreprise.adresse.ville}`,
  chemin: "/",
});

export default function Accueil() {
  const t = textes.accueil;
  const z = config.zoneIntervention;
  const vedettes = textes.realisations.slice(0, 3);

  return (
    <>
      {/* Hero — la promesse tient en une phrase, les preuves chiffrées la soutiennent. */}
      <section className="bg-encre text-white">
        <div className="conteneur pb-0 pt-16 md:pt-24">
          <ul className="entree flex flex-wrap gap-x-6 gap-y-2 text-[0.8rem] font-medium text-white/55">
            {metiers.map((m) => (
              <li key={m} className="border-l border-white/25 pl-3 first:border-0 first:pl-0">
                {m}
              </li>
            ))}
          </ul>

          <h1 className="entree mt-7 max-w-[19ch] text-balance" style={{ animationDelay: "60ms" }}>
            {t.titre}
          </h1>

          <p className="entree mt-7 text-[1.075rem] leading-relaxed text-white/70" style={{ animationDelay: "120ms" }}>
            {t.chapo}
          </p>

          <div className="entree mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "180ms" }}>
            <Link href="/contact" className="bouton bouton-principal">
              Estimer mon projet
            </Link>
            <a href={lienTelephone(config.entreprise.telephone)} className="bouton bouton-sombre">
              Appeler le {config.entreprise.telephone}
            </a>
          </div>

          <dl className="mt-16 grid grid-cols-1 border-t border-white/15 sm:grid-cols-3">
            {t.preuves.map((p) => (
              <div key={p.legende} className="border-b border-white/15 py-7 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-6">
                <dt className="text-[2.5rem] font-semibold leading-none tracking-[-0.04em] text-accent">{p.valeur}</dt>
                <dd className="mt-2 text-sm leading-snug text-white/65">{p.legende}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Prestations — présentées comme les lignes d'un devis, pas comme des cartes. */}
      <section className="conteneur py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[16ch] text-balance">Ce que nous faisons</h2>
          <Link href="/prestations" className="lien-texte text-[0.95rem]">
            Voir le détail des prestations
          </Link>
        </div>

        <ul className="mt-12 border-t border-bordure">
          {prestationsActives.map((p) => (
            <li key={p.slug} className="border-b border-bordure">
              <Link
                href={`/prestations/${p.slug}`}
                className="group grid gap-x-8 gap-y-2 py-7 md:grid-cols-[9rem_1fr_auto] md:items-baseline"
              >
                <span className="text-[0.8rem] font-semibold text-texte-attenue">{p.metier}</span>
                <span>
                  <span className="block text-[1.2rem] font-semibold tracking-[-0.02em] text-encre group-hover:text-lien">
                    {p.libelle}
                  </span>
                  <span className="mt-1 block text-[0.95rem] leading-relaxed text-texte-attenue">{p.resume}</span>
                </span>
                {p.aPartirDe && (
                  <span className="whitespace-nowrap text-[0.9rem] text-texte-attenue">
                    à partir de <strong className="font-semibold text-encre">{euros(p.aPartirDe)}</strong>
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Zone d'intervention */}
      <section className="bg-fond-alterne">
        <div className="conteneur grid gap-12 py-20 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="text-balance">Nous intervenons à {z.rayonKm} km autour de {z.villeCentre}</h2>
            <p className="mt-5 leading-relaxed text-texte-attenue">
              Nos équipes partent de {z.villeCentre} et couvrent {z.departements.map((d) => d.nom).join(", ")}. En
              dehors de cette zone, nous acceptons les chantiers programmés mais pas les urgences : un délai que nous
              ne pouvons pas tenir, nous ne le promettons pas.
            </p>
            <Link href="/zone-intervention" className="lien-texte mt-6 inline-block text-[0.95rem]">
              Vérifier si votre commune est couverte
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 self-start border-t border-bordure pt-6 text-[0.95rem] sm:grid-cols-3 md:grid-cols-2">
            {z.villesPrincipales.map((v) => (
              <li key={v} className="border-b border-bordure py-2.5 text-texte-attenue">
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Réalisations */}
      <section className="conteneur py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2>Chantiers récents</h2>
          <Link href="/realisations" className="lien-texte text-[0.95rem]">
            Toutes les réalisations
          </Link>
        </div>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {vedettes.map((r, i) => (
            <li key={r.titre}>
              <div className="aspect-[4/3]">
                <VisuelRealisation metier={r.metier} index={i} />
              </div>
              <div className="repere mt-5">
                <h3>{r.titre}</h3>
                <p className="mt-1.5 text-[0.9rem] text-texte-attenue">
                  {r.client} — {r.ville}, {r.annee}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <AppelAction />
    </>
  );
}
