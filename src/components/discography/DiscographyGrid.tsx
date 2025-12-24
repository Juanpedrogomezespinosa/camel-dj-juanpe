import React, { useState, useMemo, useEffect, useRef } from "react";
// Eliminamos FaPlay de las importaciones porque ya no se usa
import {
  FaSearch,
  FaCompactDisc,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { discography } from "../../data/discography";
import { usePlayerStore } from "../../store/playerStore";

type ReleaseType = "Todos" | "Álbumes" | "EPs" | "Singles";

const ITEMS_PER_PAGE = 9;

const DiscographyGrid: React.FC = () => {
  // Ya no necesitamos playSong aquí si quitamos el botón directo
  // const { playSong } = usePlayerStore();

  const [activeFilter, setActiveFilter] = useState<ReleaseType>("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const gridTopRef = useRef<HTMLDivElement>(null);

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

  // --- LÓGICA DE PAGINACIÓN ---
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentAlbums = filteredAlbums.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAlbums.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (gridTopRef.current) {
      const yOffset = -120;
      const y =
        gridTopRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const getLabel = (count: number) => {
    if (count <= 3) return "Sencillo";
    if (count <= 7) return "EP";
    return "LP";
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col gap-8 md:gap-12 min-h-screen">
      {/* --- CABECERA --- */}
      <div className="flex flex-col gap-6 md:gap-8 border-b border-white/10 pb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-accent-gold">
              Catálogo Oficial
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold uppercase leading-none tracking-tight text-white">
              Discografía
            </h1>
          </div>
          <div className="flex items-end gap-2 lg:flex-col lg:items-end lg:gap-0">
            <span className="text-3xl md:text-5xl font-display font-bold text-accent-red">
              {String(discography.length).padStart(2, "0")}
            </span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
              Proyectos
            </span>
          </div>
        </div>

        <p className="text-sm md:text-lg text-gray-400 font-light max-w-2xl leading-relaxed">
          Nuestra trayectoria musical, desde los orígenes en el asfalto hasta
          los escenarios. Un viaje de ritmo y poesía.
        </p>

        {/* BARRA DE HERRAMIENTAS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mt-2">
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start">
            {(["Todos", "Álbumes", "EPs", "Singles"] as ReleaseType[]).map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all border ${
                    activeFilter === filter
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
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
              placeholder="BUSCAR..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs md:text-sm text-white focus:outline-none focus:border-accent-gold transition-colors placeholder-gray-600 uppercase tracking-wide"
            />
          </div>
        </div>
      </div>

      <div ref={gridTopRef}></div>

      {/* --- GRID DE RESULTADOS --- */}
      {filteredAlbums.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-12">
            {currentAlbums.map((album) => (
              <div
                key={album.id}
                className="group flex flex-col cursor-pointer transform-gpu"
                onClick={() =>
                  (window.location.href = `/discografia/${album.id}`)
                }
              >
                {/* PORTADA (LIMPIA, SIN OVERLAYS) */}
                <div className="relative w-full aspect-square overflow-hidden rounded-md bg-[#1a1a1a] shadow-lg mb-3 md:mb-5 border border-white/5">
                  <img
                    src={album.cover}
                    alt={album.title}
                    loading="eager"
                    decoding="sync"
                    width="500"
                    height="500"
                    // Mantenemos solo el efecto de escala al hacer hover
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu"
                  />
                  {/* SE HAN ELIMINADO LOS DIVS DEL OVERLAY OSCURO Y EL BOTÓN PLAY */}
                </div>

                {/* INFO */}
                <div className="flex flex-col gap-0.5 md:gap-1 px-1">
                  <h3 className="text-xl md:text-2xl font-display font-bold uppercase leading-none tracking-tight text-white group-hover:text-accent-gold transition-colors line-clamp-2">
                    {album.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs md:text-sm font-bold text-accent-gold">
                      {album.year}
                    </span>
                    <span className="size-1 rounded-full bg-gray-500"></span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white">
                      {getLabel(album.songs.length)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- CONTROLES DE PAGINACIÓN --- */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mt-8 md:mt-12 w-full">
              {/* Botón Anterior */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full border text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${
                  currentPage === 1
                    ? "border-white/5 text-gray-600 cursor-not-allowed hidden md:flex"
                    : "border-white/10 text-white hover:border-accent-gold hover:text-accent-gold"
                }`}
              >
                <FaChevronLeft />{" "}
                <span className="hidden sm:inline">Anterior</span>
              </button>

              {/* Indicador de Páginas */}
              <div className="flex gap-1 md:gap-2 overflow-x-auto max-w-full px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold transition-all flex-shrink-0 ${
                        currentPage === number
                          ? "bg-primary text-white scale-110 shadow-lg"
                          : "bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}
              </div>

              {/* Botón Siguiente */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full border text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${
                  currentPage === totalPages
                    ? "border-white/5 text-gray-600 cursor-not-allowed hidden md:flex"
                    : "border-white/10 text-white hover:border-accent-gold hover:text-accent-gold"
                }`}
              >
                <span className="hidden sm:inline">Siguiente</span>{" "}
                <FaChevronRight />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="w-full py-20 flex flex-col items-center justify-center text-center opacity-40">
          <FaCompactDisc className="text-5xl md:text-7xl text-gray-600 mb-4" />
          <h3 className="text-xl md:text-2xl font-display font-bold uppercase text-white">
            Sin resultados
          </h3>
          <p className="text-sm md:text-base text-gray-500 mt-2">
            Intenta con otro término.
          </p>
        </div>
      )}
    </section>
  );
};

export default DiscographyGrid;
