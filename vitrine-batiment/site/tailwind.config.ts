import type { Config } from "tailwindcss";

/**
 * Les couleurs pointent vers des variables CSS alimentées par la configuration
 * client : changer de client ne demande aucune modification de ce fichier.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        encre: "var(--c-encre)",
        accent: "var(--c-accent)",
        lien: "var(--c-lien)",
        fond: "var(--c-fond)",
        "fond-alterne": "var(--c-fond-alterne)",
        texte: "var(--c-texte)",
        "texte-attenue": "var(--c-texte-attenue)",
        bordure: "var(--c-bordure)",
      },
      fontFamily: {
        sans: ["var(--police)", "system-ui", "sans-serif"],
      },
      maxWidth: { lisible: "68ch" },
    },
  },
  plugins: [],
};

export default config;
