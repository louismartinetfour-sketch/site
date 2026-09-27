import type { NextConfig } from "next";

/**
 * Configuration Next.js.
 * Les en-têtes de sécurité sont posés ici : ils s'appliquent à toutes les routes,
 * y compris aux pages statiques servies par le CDN.
 */
const enTetesSecurite = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // ne pas divulguer la stack
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:chemin*", headers: enTetesSecurite }];
  },
};

export default config;
