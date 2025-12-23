import React, { useState, useMemo, useRef } from "react"; // <--- 1. Importamos useRef
import { videos } from "../../data/videos";
import {
  FaPlay,
  FaClock,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import CustomPlayer from "./CustomPlayer";

const VideoGallery = () => {
  // Referencia para el scroll automático
  const playerRef = useRef<HTMLDivElement>(null); // <--- 2. Creamos la referencia

  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const sortedVideos = useMemo(() => {
    return [...videos].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [sortOrder]);

  const [currentVideo, setCurrentVideo] = useState(sortedVideos[0]);

  const handleSortChange = (order: "desc" | "asc") => {
    setSortOrder(order);
  };

  // Función para cambiar vídeo y hacer scroll inteligente
  const handleVideoSelect = (video: (typeof videos)[0]) => {
    setCurrentVideo(video);

    // Hacemos scroll suave hasta el reproductor
    if (playerRef.current) {
      // block: 'center' centra el reproductor en la pantalla
      // block: 'start' lo pone arriba (cuidado con el navbar fijo)
      playerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="w-full max-w-7xl px-6 pb-20 mx-auto">
      {/* --- REPRODUCTOR PRINCIPAL (HERO) --- */}
      {/* 3. Conectamos la referencia aquí */}
      <div
        ref={playerRef}
        className="mb-12 flex flex-col lg:flex-row bg-[#2A2A2A] rounded-xl overflow-hidden shadow-2xl border border-[#333] animate-fade-in scroll-mt-32"
      >
        <div className="w-full lg:w-2/3 aspect-video bg-black relative z-10">
          <CustomPlayer
            key={currentVideo.id}
            src={currentVideo.videoUrl}
            poster={currentVideo.posterUrl}
            title={currentVideo.title}
          />
        </div>

        <div className="w-full lg:w-1/3 p-6 md:p-8 flex flex-col justify-center gap-4 bg-[#1a1a1a]">
          <div>
            <p className="text-accent-gold text-xs font-bold tracking-widest uppercase mb-2">
              REPRODUCIENDO AHORA
            </p>
            <h3 className="text-3xl font-display font-black text-white leading-none tracking-tight mb-2 uppercase">
              {currentVideo.title}
            </h3>
            <p className="text-[#666] text-xs uppercase tracking-wider font-semibold">
              {currentVideo.year}{" "}
              {currentVideo.director && `• Dir. ${currentVideo.director}`}
            </p>
          </div>
          <div className="h-px w-12 bg-primary my-2"></div>
          <p className="text-text-muted font-light leading-relaxed text-sm">
            {currentVideo.description}
          </p>
        </div>
      </div>

      {/* --- BARRA DE FILTROS / ORDEN --- */}
      <div className="flex justify-between items-center mb-6 border-b border-[#333] pb-4">
        <h3 className="text-white font-display font-bold uppercase tracking-widest text-lg">
          Archivo Visual
        </h3>
        <div className="flex gap-4">
          <button
            onClick={() => handleSortChange("desc")}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded transition-colors ${
              sortOrder === "desc"
                ? "text-white bg-primary"
                : "text-[#666] hover:text-white"
            }`}
          >
            <FaSortAmountDown /> Más Recientes
          </button>
          <button
            onClick={() => handleSortChange("asc")}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded transition-colors ${
              sortOrder === "asc"
                ? "text-white bg-primary"
                : "text-[#666] hover:text-white"
            }`}
          >
            <FaSortAmountUp /> Más Antiguos
          </button>
        </div>
      </div>

      {/* --- GRID DE VIDEOS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => handleVideoSelect(video)} // <--- 4. Usamos la nueva función
            className={`group flex flex-col gap-4 cursor-pointer ${
              currentVideo.id === video.id
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
          >
            {/* ... resto del código igual ... */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#1a1a1a] border border-transparent group-hover:border-primary/50 transition-all">
              <img
                src={video.posterUrl}
                alt={video.title}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
              {video.duration && (
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                  <FaClock className="text-[10px]" /> {video.duration}
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <FaPlay className="text-white text-sm ml-1" />
                </div>
              </div>
              {currentVideo.id === video.id && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-accent-gold font-bold uppercase tracking-widest text-sm border border-accent-gold px-3 py-1 rounded">
                    Reproduciendo
                  </span>
                </div>
              )}
            </div>
            <div>
              <div className="flex justify-between items-start">
                <h4 className="text-white text-lg font-bold uppercase tracking-tight leading-none group-hover:text-primary transition-colors">
                  {video.title}
                </h4>
                <p className="text-[#666] text-xs font-mono pt-1">
                  {video.year}
                </p>
              </div>
              <p className="text-text-muted text-sm font-light mt-1 line-clamp-1">
                {video.tags ? video.tags[0] : "Videoclip"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
