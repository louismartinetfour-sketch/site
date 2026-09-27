/**
 * Visuel de remplacement pour la galerie de réalisations.
 *
 * Tant que le client n'a pas fourni ses photos de chantier, on affiche un motif
 * dessiné en SVG plutôt qu'une image générique : rien à télécharger, aucun coût
 * de performance, et aucune photo de banque d'images qui décrédibiliserait la page.
 * Remplacer par <Image> dès que les visuels réels sont déposés dans /public/realisations.
 */
export function VisuelRealisation({ metier, index }: { metier: string; index: number }) {
  const pas = 14 + (index % 3) * 6;
  const id = `trame-${index}`;
  return (
    <div className="relative h-full w-full overflow-hidden bg-fond-alterne" aria-hidden="true">
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300">
        <defs>
          <pattern id={id} width={pas} height={pas} patternUnits="userSpaceOnUse">
            <path d={`M0 ${pas} L${pas} 0`} stroke="var(--c-bordure)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#${id})`} />
        <rect x="0" y="0" width="400" height="300" fill="var(--c-encre)" opacity="0.04" />
      </svg>
      <span className="absolute bottom-3 left-3 bg-encre px-2 py-1 text-[0.7rem] font-semibold text-white">
        {metier}
      </span>
    </div>
  );
}
