import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophoneAlt, FaBars, FaTimes, FaSpotify } from "react-icons/fa";
import { MdSmartDisplay } from "react-icons/md";

const links = [
  { name: "Inicio", href: "/" },
  { name: "Discografía", href: "/discografia" },
  { name: "Videoclips", href: "/videoclips" },
  { name: "Conciertos", href: "/conciertos" },
  { name: "Contacto", href: "/contacto" },
];

export interface NavbarProps {
  currentPath?: string;
}

export default function Navbar({ currentPath = "/" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(href);
  };

  return (
    <>
      <header className="w-full border-b border-[#2a2a2a] bg-[#0b0b0b]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* --- LOGO --- */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3 group">
              {/* MICROFONO: 
                  - Normal: Rojo (#8a1e1e)
                  - Hover: Blanco (#f2f2f2) 
              */}
              <div className="size-8 flex items-center justify-center text-2xl transition-colors duration-300 text-accent-gold ">
                <FaMicrophoneAlt />
              </div>

              <h1 className="text-xl font-display font-black tracking-tighter uppercase transition-colors duration-300">
                {/* CAMEL: 
                    - Normal: Blanco
                    - Hover: Rojo
                */}
                <span className="text-white group-hover:text-primary transition-colors duration-300">
                  CAMEL
                </span>

                {/* &: 
                    - Normal: Rojo
                    - Hover: Blanco
                */}
                <span className="text-primary group-hover:text-white transition-colors duration-300">
                  {" & "}
                </span>

                {/* DJ JUANPE: 
                    - Normal: Blanco
                    - Hover: Rojo
                */}
                <span className="text-white group-hover:text-primary transition-colors duration-300">
                  DJ JUANPE
                </span>
              </h1>
            </a>
          </div>

          {/* --- NAVEGACIÓN ESCRITORIO --- */}
          <nav className="hidden md:flex gap-8 items-center">
            {links.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium uppercase tracking-widest transition-all duration-300 relative ${
                    isActive
                      ? "text-[#8a1e1e] font-bold" // Texto Rojo si activo
                      : "text-[#b6a0a0] hover:text-[#f2f2f2]"
                  }`}
                >
                  {link.name}
                  {/* Línea inferior DORADA (#c7a14a) si activo */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* --- DERECHA (Iconos Escritorio + Botón Móvil) --- */}
          <div className="flex gap-4 items-center">
            {/* YouTube (Solo escritorio) */}
            <a
              href="https://www.youtube.com/@camelnosabakuydjjuanpe"
              target="_blank"
              rel="noreferrer"
              className="text-[#b6a0a0] hover:text-[#8a1e1e] transition-colors hidden sm:block"
              aria-label="YouTube"
            >
              <MdSmartDisplay size={24} />
            </a>

            {/* Spotify (Solo escritorio) */}
            <a
              href="https://open.spotify.com/intl-es/artist/0gl1J9No69gvi1mYghJXFY?si=DdYuEEj3QnixFrd2FReNkA"
              target="_blank"
              rel="noreferrer"
              className="text-[#b6a0a0] hover:text-[#8a1e1e] transition-colors hidden sm:block"
              aria-label="Spotify"
            >
              <FaSpotify size={24} />
            </a>

            {/* Botón Menú Móvil */}
            <button
              className="md:hidden text-[#f2f2f2] text-2xl focus:outline-none hover:text-[#8a1e1e] transition-colors relative z-50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MENÚ MÓVIL (Pantalla completa) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#0b0b0b] z-40 flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {/* Enlaces de navegación */}
            <div className="flex flex-col items-center gap-8">
              {links.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-3xl font-display font-black uppercase tracking-widest transition-colors ${
                      isActive
                        ? "text-[#8a1e1e]"
                        : "text-[#b6a0a0] hover:text-[#f2f2f2]"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* REDES SOCIALES MÓVIL (Añadido aquí) */}
            <div className="flex gap-8 mt-4 pt-8 border-t border-[#2a2a2a] w-1/2 justify-center">
              <a
                href="https://www.youtube.com/@camelnosabakuydjjuanpe"
                target="_blank"
                rel="noreferrer"
                className="text-[#b6a0a0] hover:text-[#8a1e1e] transition-colors"
                aria-label="YouTube"
              >
                <MdSmartDisplay size={32} />
              </a>
              <a
                href="https://open.spotify.com/intl-es/artist/0gl1J9No69gvi1mYghJXFY?si=DdYuEEj3QnixFrd2FReNkA"
                target="_blank"
                rel="noreferrer"
                className="text-[#b6a0a0] hover:text-[#8a1e1e] transition-colors"
                aria-label="Spotify"
              >
                <FaSpotify size={32} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
