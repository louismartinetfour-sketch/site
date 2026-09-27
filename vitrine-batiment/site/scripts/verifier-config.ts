/**
 * Vérification de la configuration client hors build.
 * Usage : npm run config:check
 */
import config from "../config/client.config";
import { clientSchema } from "../config/client.schema";

const resultat = clientSchema.safeParse(config);

if (!resultat.success) {
  console.error("Configuration invalide :\n");
  for (const probleme of resultat.error.issues) {
    console.error(`  • ${probleme.path.join(".")} : ${probleme.message}`);
  }
  process.exit(1);
}

const c = resultat.data;
console.log(`Configuration valide — ${c.entreprise.nom}`);
console.log(`  ${c.catalogue.filter((p) => p.actif).length} prestations actives`);
console.log(`  ${c.zoneIntervention.villesPrincipales.length} communes déclarées`);
console.log(
  c.rgpd.cookiesTiers.length === 0
    ? "  Aucun traceur non essentiel : le bandeau cookies ne sera pas affiché."
    : `  ${c.rgpd.cookiesTiers.length} traceurs déclarés : le bandeau sera affiché.`,
);
