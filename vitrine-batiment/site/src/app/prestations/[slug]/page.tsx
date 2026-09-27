import Link from "next/link";
import { notFound } from "next/navigation";
import { AppelAction } from "@/components/appel-action";
import { EntetePage } from "@/components/entete-page";
import { config, euros, prestationsActives, urlSite } from "@/lib/config";
import { metadonnees } from "@/lib/seo";

/** Génération statique d'une page par prestation : URL propre et indexable. */
export function generateStaticParams() {
  return prestationsActives.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = prestationsActives.find((x) => x.slug === slug);
  if (!p) return {};
  return metadonnees({
    titre: `${p.libelle} — ${config.entreprise.adresse.ville} et Val-de-Marne`,
    description: `${p.resume} ${config.entreprise.nom} intervient dans un rayon de ${config.zoneIntervention.rayonKm} km autour de ${config.zoneIntervention.villeCentre}.`,
    chemin: `/prestations/${p.slug}`,
  });
}

export default async function FichePrestation({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = prestationsActives.find((x) => x.slug === slug);
  if (!p) notFound();

  // Donnée structurée de la prestation, complémentaire du LocalBusiness du layout.
  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.libelle,
    serviceType: p.metier,
    description: p.description,
    provider: { "@id": `${urlSite}/#entreprise` },
    areaServed: config.zoneIntervention.villesPrincipales.map((v) => ({ "@type": "City", name: v })),
    ...(p.aPartirDe
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            priceSpecification: { "@type": "PriceSpecification", minPrice: p.aPartirDe, priceCurrency: "EUR" },
          },
        }
      : {}),
  };

  return (
    <>
      <EntetePage
        titre={p.libelle}
        chapo={p.resume}
        fil={[
          { href: "/prestations", libelle: "Nos prestations" },
          { href: `/prestations/${p.slug}`, libelle: p.libelle },
        ]}
      />

      <div className="conteneur grid gap-14 py-16 md:grid-cols-[1fr_20rem] md:py-24">
        <div>
          <p className="text-[1.05rem] leading-relaxed text-texte-attenue">{p.description}</p>

          {p.points.length > 0 && (
            <>
              <h2 className="mt-12 text-[1.4rem]">Compris dans la prestation</h2>
              <ul className="mt-5">
                {p.points.map((pt) => (
                  <li key={pt} className="border-b border-bordure py-3.5 text-[0.975rem] leading-relaxed text-texte-attenue first:border-t">
                    {pt}
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mt-12 text-[1.4rem]">Où nous intervenons</h2>
          <p className="mt-4 leading-relaxed text-texte-attenue">
            {config.zoneIntervention.villesPrincipales.join(", ")} et l'ensemble des communes situées à moins de{" "}
            {config.zoneIntervention.rayonKm} km de {config.zoneIntervention.villeCentre}.{" "}
            <Link href="/zone-intervention" className="lien-texte">
              Vérifier votre commune
            </Link>
            .
          </p>
        </div>

        <aside className="self-start border border-bordure p-7">
          {p.aPartirDe && (
            <>
              <p className="text-[0.85rem] text-texte-attenue">Prix de départ</p>
              <p className="mt-1 text-[2rem] font-semibold leading-none tracking-[-0.03em] text-encre">
                {euros(p.aPartirDe)}
              </p>
            </>
          )}
          <p className="mt-4 text-[0.85rem] leading-relaxed text-texte-attenue">
            Prix indicatif TTC, hors fournitures particulières. Le montant définitif dépend de la configuration du
            chantier et fait l'objet d'un devis écrit après visite.
          </p>
          <Link href="/contact" className="bouton bouton-principal mt-6 w-full">
            Demander un devis
          </Link>
        </aside>
      </div>

      <AppelAction />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }} />
    </>
  );
}
