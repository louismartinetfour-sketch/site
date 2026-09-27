"use server";

import { headers } from "next/headers";
import { createHash, randomUUID } from "node:crypto";
import { z } from "zod";
import { config, prestationsActives } from "@/lib/config";

/** Toute entrée est validée côté serveur : la validation du navigateur n'est qu'un confort. */
const demandeSchema = z.object({
  nom: z.string().trim().min(2, "Indiquez votre nom.").max(80),
  email: z.string().trim().email("Adresse e-mail invalide."),
  telephone: z
    .string()
    .trim()
    .regex(/^(?:\+33|0)\s?[1-9](?:[\s.-]?\d{2}){4}$/, "Numéro de téléphone invalide."),
  codePostal: z.string().trim().regex(/^\d{5}$/, "Code postal à 5 chiffres."),
  prestation: z.string().refine((v) => prestationsActives.some((p) => p.slug === v), "Prestation inconnue."),
  urgence: z.enum(["non", "oui"]),
  message: z.string().trim().min(10, "Décrivez votre besoin en quelques mots.").max(2000),
  consentement: z.literal("on", { errorMap: () => ({ message: "Votre accord est nécessaire pour traiter la demande." }) }),
  // Champ piège invisible : rempli seulement par les robots.
  site: z.string().max(0).optional(),
});

export type EtatFormulaire = {
  statut: "initial" | "succes" | "erreur";
  message?: string;
  erreurs?: Record<string, string>;
};

/** Limitation de débit en mémoire. À remplacer par Redis dès qu'il y a plusieurs instances. */
const compteur = new Map<string, { nombre: number; debut: number }>();
const FENETRE_MS = 10 * 60 * 1000;
const MAX_PAR_FENETRE = 5;

function trop(ip: string): boolean {
  const maintenant = Date.now();
  const entree = compteur.get(ip);
  if (!entree || maintenant - entree.debut > FENETRE_MS) {
    compteur.set(ip, { nombre: 1, debut: maintenant });
    return false;
  }
  entree.nombre += 1;
  return entree.nombre > MAX_PAR_FENETRE;
}

/** L'IP n'est jamais stockée en clair : seule une empreinte salée sert de preuve de consentement. */
function empreinteIp(ip: string): string {
  const sel = process.env.SEL_EMPREINTE ?? "sel-par-defaut-a-changer";
  return createHash("sha256").update(`${ip}${sel}`).digest("hex").slice(0, 32);
}

export async function envoyerDemande(_precedent: EtatFormulaire, donnees: FormData): Promise<EtatFormulaire> {
  const entetes = await headers();
  const ip = entetes.get("x-forwarded-for")?.split(",")[0].trim() ?? "inconnue";

  if (trop(ip)) {
    return { statut: "erreur", message: "Trop de demandes envoyées depuis cet appareil. Réessayez dans quelques minutes." };
  }

  const resultat = demandeSchema.safeParse(Object.fromEntries(donnees));
  if (!resultat.success) {
    const erreurs: Record<string, string> = {};
    for (const probleme of resultat.error.issues) erreurs[String(probleme.path[0])] = probleme.message;
    return { statut: "erreur", message: "Le formulaire comporte des erreurs.", erreurs };
  }

  const { site, consentement, ...demande } = resultat.data;
  if (site) return { statut: "succes" }; // robot : on ne signale rien

  const charge = {
    reference: `DEM-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`,
    source: "formulaire_contact",
    client: config.entreprise.nom,
    recuLe: new Date().toISOString(),
    demande,
    consentement: {
      donne: consentement === "on",
      horodatage: new Date().toISOString(),
      empreinteIp: empreinteIp(ip),
      versionPolitique: "2026-01",
    },
  };

  // Transmission à n8n (partie 4). Si le webhook n'est pas configuré, la demande
  // n'est pas perdue : elle sera persistée en base dès la partie 3.
  const url = process.env.N8N_WEBHOOK_URL;
  const token = process.env.N8N_WEBHOOK_TOKEN;
  if (url && token) {
    try {
      const reponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Webhook-Token": token },
        body: JSON.stringify(charge),
        signal: AbortSignal.timeout(5000),
      });
      if (!reponse.ok) throw new Error(`n8n a répondu ${reponse.status}`);
    } catch (erreur) {
      console.error("[contact] transmission n8n échouée", charge.reference, erreur);
      return {
        statut: "erreur",
        message: `Votre demande n'a pas pu être transmise. Appelez-nous au ${config.entreprise.telephone}, nous la prenons directement.`,
      };
    }
  } else {
    console.info("[contact] webhook non configuré, demande journalisée", charge.reference);
  }

  return { statut: "succes", message: `Demande enregistrée sous la référence ${charge.reference}.` };
}
