import Link from "next/link";
import { config, lienTelephone } from "@/lib/config";

/** Bandeau de rappel placé en bas des pages de contenu. */
export function AppelAction() {
  return (
    <section className="bg-encre text-white">
      <div className="conteneur flex flex-col gap-7 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-[1.6rem] leading-tight">Un chiffrage avant de vous engager</h2>
          <p className="mt-2 text-[0.975rem] text-white/65">
            Estimation en ligne en deux minutes, devis ferme après visite, sous 48 heures.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="bouton bouton-principal">
            Demander un devis
          </Link>
          <a href={lienTelephone(config.entreprise.telephone)} className="bouton bouton-sombre">
            {config.entreprise.telephone}
          </a>
        </div>
      </div>
    </section>
  );
}
