import Link from "next/link";

export default function Introuvable() {
  return (
    <div className="conteneur py-28 md:py-36">
      <p className="text-[0.85rem] font-semibold text-texte-attenue">Erreur 404</p>
      <h1 className="mt-4 max-w-[16ch] text-balance">Cette page n'existe pas ou a été déplacée</h1>
      <p className="mt-5 leading-relaxed text-texte-attenue">
        Reprenez depuis l'accueil, ou consultez directement la liste de nos prestations.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="bouton bouton-principal">
          Retour à l'accueil
        </Link>
        <Link href="/prestations" className="bouton bouton-secondaire">
          Voir les prestations
        </Link>
      </div>
    </div>
  );
}
