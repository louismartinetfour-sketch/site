import Link from "next/link";
import { adresseUneLigne, config, lienTelephone } from "@/lib/config";

/** Pied de page : coordonnées, métiers, obligations légales. */
export function PiedDePage({ liens }: { liens: { href: string; libelle: string }[] }) {
  const e = config.entreprise;
  const annee = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-encre text-white">
      <div className="conteneur grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xl font-bold tracking-[-0.04em]">{e.nom}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/60">{config.marque.baseline}</p>
          <address className="mt-5 not-italic text-sm leading-relaxed text-white/75">
            {adresseUneLigne()}
            <br />
            <a href={lienTelephone(e.telephone)} className="hover:text-accent">
              {e.telephone}
            </a>
            <br />
            <a href={`mailto:${e.email}`} className="hover:text-accent">
              {e.email}
            </a>
          </address>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Le site</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {liens.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent">
                  {l.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Horaires</h2>
          <dl className="mt-4 space-y-2.5 text-sm text-white/70">
            {e.horaires.map((h) => (
              <div key={h.jours}>
                <dt className="text-white/90">{h.jours}</dt>
                <dd>{h.creneaux}</dd>
              </div>
            ))}
          </dl>
          {e.telephoneUrgence && (
            <p className="mt-4 text-sm text-white/70">
              Urgences&nbsp;:{" "}
              <a href={lienTelephone(e.telephoneUrgence)} className="font-semibold text-accent">
                {e.telephoneUrgence}
              </a>
            </p>
          )}
        </div>

        <div>
          <h2 className="text-sm font-semibold">Qualifications</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {e.qualifications.map((q) => (
              <li key={q.libelle}>{q.libelle}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-white/50">
            Assurance décennale {e.assuranceDecennale.assureur}, police n° {e.assuranceDecennale.numeroPolice} —{" "}
            {e.assuranceDecennale.couvertureGeographique}.
          </p>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="conteneur flex flex-col gap-3 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {annee} {e.raisonSociale} — {e.rcs} — SIRET {e.siret}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/mentions-legales" className="hover:text-accent">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/politique-de-confidentialite" className="hover:text-accent">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/accessibilite" className="hover:text-accent">
                Accessibilité
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
