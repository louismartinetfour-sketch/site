import Link from "next/link";

/** Titre de page + fil d'Ariane, commun à toutes les pages intérieures. */
export function EntetePage({
  titre,
  chapo,
  fil,
}: {
  titre: string;
  chapo?: string;
  fil?: { href: string; libelle: string }[];
}) {
  return (
    <header className="border-b border-bordure bg-fond-alterne">
      <div className="conteneur py-14 md:py-20">
        {fil && (
          <nav aria-label="Fil d'Ariane">
            <ol className="flex flex-wrap items-center gap-2 text-[0.8rem] text-texte-attenue">
              <li>
                <Link href="/" className="hover:text-encre">
                  Accueil
                </Link>
              </li>
              {fil.map((f, i) => (
                <li key={f.href} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {i === fil.length - 1 ? (
                    <span aria-current="page" className="text-encre">
                      {f.libelle}
                    </span>
                  ) : (
                    <Link href={f.href} className="hover:text-encre">
                      {f.libelle}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="mt-5 max-w-[20ch] text-balance">{titre}</h1>
        {chapo && <p className="mt-5 text-[1.05rem] leading-relaxed text-texte-attenue">{chapo}</p>}
      </div>
    </header>
  );
}
