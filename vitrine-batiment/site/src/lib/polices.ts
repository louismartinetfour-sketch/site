import { Archivo, Public_Sans, Inter, Manrope } from "next/font/google";

/**
 * Familles chargeables. Ajouter une entrée ici pour rendre une nouvelle police
 * disponible dans `marque.polices` de la configuration client.
 * L'import doit rester statique : next/font optimise au build.
 */
const archivo = Archivo({ subsets: ["latin"], display: "swap", variable: "--police" });
const publicSans = Public_Sans({ subsets: ["latin"], display: "swap", variable: "--police" });
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--police" });
const manrope = Manrope({ subsets: ["latin"], display: "swap", variable: "--police" });

const familles: Record<string, { variable: string; className: string }> = {
  Archivo: archivo,
  "Public Sans": publicSans,
  Inter: inter,
  Manrope: manrope,
};

export function police(nom: string) {
  const f = familles[nom];
  if (!f) {
    throw new Error(
      `Police « ${nom} » non chargeable. Familles disponibles : ${Object.keys(familles).join(", ")}.`,
    );
  }
  return f;
}
