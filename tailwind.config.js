/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        rap: {
          bg: "#0B0B0B", // Negro carbón (Fondo)
          text: "#F2F2F2", // Blanco roto (Texto)
          accent: "#8B1E1E", // Rojo burdeos (Acción/Hover)
          secondary: "#2A2A2A", // Gris cemento (Cards/Fondos alternativos)
          gold: "#C7A14A", // Dorado envejecido (Detalles finos)
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Texto cuerpo
        display: ["Oswald", "sans-serif"], // Títulos fuertes
      },
      backgroundImage: {
        "industrial-overlay":
          "linear-gradient(to bottom, rgba(11,11,11,0.3) 0%, #0B0B0B 100%)",
      },
    },
  },
  plugins: [],
};
