import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophoneAlt, FaBars, FaTimes } from "react-icons/fa";
// Usamos iconos de Material Symbols equivalentes en React Icons
import { MdSmartDisplay, MdMusicNote } from "react-icons/md";

const links = [
  { name: "Home", href: "/" },
  { name: "Discography", href: "/discografia" },
  { name: "Videoclips", href: "/videoclips" }, // Este simulará ser el activo
  { name: "Tour", href: "/conciertos" },
  { name: "Contact", href: "/contacto" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Simulamos que la ruta actual es 'videoclips' para el efecto visual del diseño
  const currentPath = "/videoclips";

  return (
    <>
      {/* Estructura exacta del diseño Stitch:
        border-b border-[#2A2A2A] bg-[#0B0B0B]/95 backdrop-blur-sm sticky top-0 z-50 
      */}
      <header className="w-full border-b border-card-dark bg-background-dark/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* --- IZQUIERDA: LOGO --- */}
          <div className="flex items-center gap-3">
            <div className="size-8 text-white flex items-center justify-center">
              {/* Icono similar al mic_external_on */}
              <FaMicrophoneAlt className="text-2xl" />
            </div>
            {/* Oswald font para mantener tu marca, pero estructura Stitch */}
            <h1 className="text-white text-xl font-display font-black tracking-tighter uppercase">
              CAMEL & DJ JUANPE
            </h1>
          </div>

          {/* --- CENTRO: NAVEGACIÓN --- */}
          <nav className="hidden md:flex gap-8 items-center">
            {links.map((link) => {
              const isActive = link.href === currentPath;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium uppercase tracking-widest transition-colors ${
                    isActive
                      ? "text-primary border-b-2 border-primary pb-1 font-bold"
                      : "text-text-muted hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* --- DERECHA: ICONOS --- */}
          <div className="flex gap-4 items-center">
            {/* Iconos de la derecha del diseño original */}
            <a
              href="#"
              className="text-text-muted hover:text-white transition-colors hidden sm:block"
            >
              <MdSmartDisplay size={24} />
            </a>
            <a
              href="#"
              className="text-text-muted hover:text-white transition-colors hidden sm:block"
            >
              <MdMusicNote size={24} />
            </a>

            {/* Botón Móvil */}
            <button
              className="md:hidden text-white text-2xl focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MENÚ MÓVIL --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-background-dark z-40 flex flex-col items-center justify-center gap-8 md:hidden top-[73px]" // top ajustado a la altura del header
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-white text-2xl font-display font-bold uppercase tracking-widest transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
