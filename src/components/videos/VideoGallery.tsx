import React, { useState } from "react";
import { videos } from "../../data/videos";
import { FaPlay, FaClock } from "react-icons/fa";
import CustomPlayer from "./CustomPlayer";

const VideoGallery = () => {
  // Estado para el video que se está reproduciendo actualmente
  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  return (
    <div className="w-full max-w-7xl px-6 pb-20 mx-auto">
      {/* --- REPRODUCTOR PRINCIPAL (HERO) --- */}
      <div className="mb-16 flex flex-col lg:flex-row bg-[#2A2A2A] rounded-xl overflow-hidden shadow-2xl border border-[#333] animate-fade-in">
        {/* Usamos CustomPlayer (R2) */}
        <div className="w-full lg:w-2/3 aspect-video bg-black relative z-10">
          {/* La key es IMPORTANTE: obliga a React a destruir y crear el player al cambiar de vídeo */}
          <CustomPlayer
            key={currentVideo.id}
            src={currentVideo.videoUrl}
            poster={currentVideo.posterUrl}
            title={currentVideo.title}
          />
        </div>

        {/* Info del Vídeo Actual */}
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

      {/* --- GRID DE VIDEOS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => {
              setCurrentVideo(video);
              // Scroll suave hacia arriba
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`group flex flex-col gap-4 cursor-pointer ${
              currentVideo.id === video.id
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
          >
            {/* Miniatura */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#1a1a1a] border border-transparent group-hover:border-primary/50 transition-all">
              <img
                src={video.posterUrl}
                alt={video.title}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>

              {/* Duración */}
              {video.duration && (
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                  <FaClock className="text-[10px]" /> {video.duration}
                </div>
              )}

              {/* Icono Play Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <FaPlay className="text-white text-sm ml-1" />
                </div>
              </div>

              {/* Etiqueta si está seleccionado */}
              {currentVideo.id === video.id && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-accent-gold font-bold uppercase tracking-widest text-sm border border-accent-gold px-3 py-1 rounded">
                    Reproduciendo
                  </span>
                </div>
              )}
            </div>

            {/* Textos Miniatura */}
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
