import React from "react";
import { motion } from "framer-motion";

// Importamos la imagen local.
import bannerBg from "../../assets/images/banner-1.jpeg";

const HeroSection: React.FC = () => {
  return (
    // CAMBIO 1: Quitamos h-[90vh] y ponemos h-auto para que la altura la decida la imagen
    <section className="relative w-full h-auto bg-background-dark">
      {/* --- FONDO --- */}
      {/* El div contenedor sigue el flujo normal */}
      <div className="w-full">
        <img
          src={bannerBg.src}
          alt="Camel & DJ Juanpe Banner"
          // CAMBIO 2: w-full y h-auto mantienen la proporción exacta (aspect ratio)
          // 'block' elimina el pequeño espacio blanco que a veces queda debajo de las imágenes
          className="w-full h-auto block"
        />
      </div>

      {/* --- CONTENIDO SUPERPUESTO (Botones) --- */}
      {/* Usamos absolute inset-0 para poner los botones encima de la imagen */}
      <div className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-end pb-8 md:pb-16 gap-8">
        {/* Títulos vacíos (ya que el texto está en la imagen) */}
        <motion.h1 className="hidden"></motion.h1>
        <motion.div className="hidden"></motion.div>

        {/* Botones de Acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="/discografia"
            className="flex min-w-[140px] h-10 md:h-12 items-center justify-center rounded-full bg-primary text-white text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-red-700 hover:scale-105 transition-all shadow-lg shadow-primary/20"
          >
            Discografía
          </a>
          <a
            href="/videoclips"
            className="flex min-w-[140px] h-10 md:h-12 items-center justify-center rounded-full border-2 border-white bg-black/40 backdrop-blur-sm text-white text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-black/60  transition-all"
          >
            videoclips
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
