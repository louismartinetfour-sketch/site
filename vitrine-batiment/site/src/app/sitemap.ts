import type { MetadataRoute } from "next";
import { prestationsActives, urlSite } from "@/lib/config";
import { navigation, pagesLegales } from "@/lib/navigation";

/** Sitemap généré à partir de la navigation et du catalogue : rien à maintenir à la main. */
export default function sitemap(): MetadataRoute.Sitemap {
  const maj = new Date();

  const pages = [...navigation, ...pagesLegales].map((p) => ({
    url: `${urlSite}${p.href}`,
    lastModified: maj,
    changeFrequency: "monthly" as const,
    priority: p.priorite,
  }));

  const fiches = prestationsActives.map((p) => ({
    url: `${urlSite}/prestations/${p.slug}`,
    lastModified: maj,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...pages, ...fiches];
}
