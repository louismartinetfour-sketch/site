import type { Metadata, Viewport } from "next";
import { BandeauCookies } from "@/components/bandeau-cookies";
import { EnTete } from "@/components/en-tete";
import { PiedDePage } from "@/components/pied-de-page";
import { config, lienTelephone, urlSite } from "@/lib/config";
import { navigation } from "@/lib/navigation";
import { police } from "@/lib/polices";
import { donneesStructurees } from "@/lib/seo";
import "./globals.css";

const policeTitres = police(config.marque.polices.titres);

export const metadata: Metadata = {
  metadataBase: new URL(urlSite),
  title: { default: config.seo.suffixeTitre, template: `%s | ${config.seo.suffixeTitre}` },
  description: config.seo.descriptionParDefaut,
  icons: { icon: config.marque.favicon },
  ...(config.seo.verificationGoogle ? { verification: { google: config.seo.verificationGoogle } } : {}),
};

export const viewport: Viewport = {
  themeColor: config.marque.couleurs.encre,
  width: "device-width",
  initialScale: 1,
};

/** Couleurs de la configuration client → variables CSS consommées par Tailwind. */
function variablesCouleurs(): React.CSSProperties {
  const c = config.marque.couleurs;
  return {
    "--c-encre": c.encre,
    "--c-accent": c.accent,
    "--c-lien": c.lien,
    "--c-fond": c.fond,
    "--c-fond-alterne": c.fondAlterne,
    "--c-texte": c.texte,
    "--c-texte-attenue": c.texteAttenue,
    "--c-bordure": c.bordure,
  } as React.CSSProperties;
}

export default function LayoutRacine({ children }: { children: React.ReactNode }) {
  const liens = navigation.filter((l) => l.href !== "/");

  return (
    <html lang="fr" className={policeTitres.variable} style={variablesCouleurs()}>
      <body className="flex min-h-screen flex-col antialiased">
        <a href="#contenu" className="lien-evitement">
          Aller au contenu principal
        </a>

        <EnTete
          nom={config.entreprise.nom}
          baseline={config.marque.baseline}
          telephone={config.entreprise.telephone}
          lienTel={lienTelephone(config.entreprise.telephone)}
          liens={liens}
        />

        <main id="contenu" className="flex-1">
          {children}
        </main>

        <PiedDePage liens={liens} />

        {/* Bandeau affiché uniquement si la configuration déclare des traceurs non essentiels. */}
        {config.rgpd.cookiesTiers.length > 0 && <BandeauCookies cookies={config.rgpd.cookiesTiers} />}

        {/* Données structurées LocalBusiness, une seule occurrence pour tout le site. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(donneesStructurees()) }}
        />
      </body>
    </html>
  );
}
