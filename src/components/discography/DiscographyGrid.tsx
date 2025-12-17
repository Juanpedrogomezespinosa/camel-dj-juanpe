import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaSearch, FaCompactDisc } from "react-icons/fa";
import { discography, type Album } from "../../data/discography";
import { usePlayerStore } from "../../store/playerStore";

type ReleaseType = "Todos" | "Álbumes" | "EPs" | "Singles";

const DiscographyGrid: React.FC = () => {
  const { playSong } = usePlayerStore();
  const [activeFilter, setActiveFilter] = useState<ReleaseType>("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  // --- LÓGICA DE FILTRADO ---
  const filteredAlbums = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return discography.filter((album) => {
      let type: ReleaseType = "Álbumes";
      if (album.songs.length <= 3) type = "Singles";
      else if (album.songs.length <= 7) type = "EPs";

      if (activeFilter !== "Todos" && type !== activeFilter) return false;
      if (!query) return true;

      const matchInfo =
        album.title.toLowerCase().includes(query) ||
        album.artist.toLowerCase().includes(query) ||
        album.year.includes(query);

      const matchSongs = album.songs.some((song) =>
        song.title.toLowerCase().includes(query)
      );

      return matchInfo || matchSongs;
    });
  }, [searchQuery, activeFilter]);

  const handlePlayAlbum = (album: Album) => {
    if (album.songs.length > 0) playSong(album.songs[0], album);
  };

  const getLabel = (count: number) => {
    if (count <= 3) return "Sencillo";
    if (count <= 7) return "EP";
    return "LP";
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-12 flex flex-col gap-12 min-h-screen">
      {/* --- CABECERA (IGUAL QUE ANTES) --- */}
      <div className="flex flex-col gap-8 border-b border-white/10 pb-8">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-accent-gold">
              Catálogo Oficial
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold uppercase leading-none tracking-tight text-white">
              Discografía
            </h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-4xl md:text-5xl font-display font-bold text-accent-red">
              {String(discography.length).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Proyectos Publicados
            </span>
          </div>
        </div>

        <p className="text-lg text-gray-400 font-light max-w-2xl leading-relaxed">
          Nuestra trayectoria musical, desde los orígenes en el asfalto hasta
          los escenarios. Un viaje de ritmo y poesía a través de más de una
          década.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {(["Todos", "Álbumes", "EPs", "Singles"] as ReleaseType[]).map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                    activeFilter === filter
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                      : "bg-transparent border-white/10 text-gray-400 hover:border-white hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>

          <div className="relative w-full md:w-[300px]">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent-gold transition-colors placeholder-gray-600 uppercase tracking-wide"
            />
          </div>
        </div>
      </div>

      {/* --- GRID OPTIMIZADO --- */}
      {filteredAlbums.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {/* Quitamos AnimatePresence global para evitar re-renderizados pesados al filtrar rápido */}
          {filteredAlbums.map((album) => (
            <motion.div
              key={album.id}
              layoutId={album.id} // LayoutId ayuda a framer a saber que es el mismo elemento
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              // ⚡️ LA CLAVE: viewport={{ once: true }} hace que no desaparezca al subir
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group flex flex-col cursor-pointer"
              onClick={() => handlePlayAlbum(album)}
            >
              {/* 1. IMAGEN (USANDO IMG REAL PARA MEJOR CACHÉ) */}
              <div className="relative w-full aspect-square overflow-hidden rounded-md bg-[#1a1a1a] shadow-2xl mb-5 border border-white/5">
                {/* Usamos <img> en lugar de background-image para evitar parpadeos */}
                <img
                  src={album.cover}
                  alt={album.title}
                  loading="lazy" // Carga diferida nativa
                  decoding="async" // No bloquea el hilo principal
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Capa oscura */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300"></div>

                {/* Icono Play */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="size-16 rounded-full bg-accent-red text-white flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform bg-opacity-90 backdrop-blur-sm">
                    <FaPlay className="ml-1 text-2xl" />
                  </div>
                </div>
              </div>

              {/* 2. TEXTO */}
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-display font-bold uppercase leading-none tracking-tight text-white group-hover:text-accent-gold transition-colors">
                  {album.title}
                </h3>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-accent-gold">
                    {album.year}
                  </span>
                  <span className="size-1 rounded-full bg-gray-600"></span>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    {getLabel(album.songs.length)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="w-full py-32 flex flex-col items-center justify-center text-center opacity-40">
          <FaCompactDisc className="text-7xl text-gray-600 mb-4" />
          <h3 className="text-2xl font-display font-bold uppercase text-white">
            Sin resultados
          </h3>
          <p className="text-gray-500">No encontramos nada con esa búsqueda.</p>
        </div>
      )}
    </section>
  );
};

export default DiscographyGrid;
