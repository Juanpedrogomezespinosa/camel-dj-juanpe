import React, { useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaPlus,
  FaShareAlt,
} from "react-icons/fa";
import { usePlayerStore } from "../../store/playerStore";

import vinylRecord from "../../assets/images/vinyl.png";

const MusicSection: React.FC = () => {
  // 1. CONECTAMOS CON EL ESTADO GLOBAL
  const {
    isPlaying,
    currentSong,
    currentAlbum,
    togglePlay,
    nextSong,
    prevSong,
    currentTime, // Viene del store (actualizado por FloatingPlayer)
    duration, // Viene del store
  } = usePlayerStore();

  const progressBarRef = useRef<HTMLDivElement>(null);

  // 2. HELPER: Formatear tiempo
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // VARIABLES VISUALES
  const displayCover = currentAlbum?.cover || vinylRecord.src;
  const displayTitle = currentSong?.title || "Selecciona un tema";
  const displayArtist = currentAlbum?.artist || "Camel & DJ Juanpe";
  const displayAlbum = currentAlbum?.title
    ? `• Álbum: ${currentAlbum.title}`
    : "• Discografía Oficial";

  // Cálculo del porcentaje de la barra basado en el tiempo global
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <section className="py-20  border-y border-card-dark overflow-hidden">
      {/* ⚠️ NOTA: El <audio> ha sido movido a FloatingPlayer para persistencia */}

      <div className="max-w-[1280px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* --- VINILO GIRATORIO --- */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div
            className={`relative size-72 md:size-96 rounded-full overflow-hidden border-4 border-card-dark shadow-2xl transition-transform duration-1000 ${
              isPlaying ? "animate-[spin_10s_linear_infinite]" : ""
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{
                backgroundImage: `url('${displayCover}')`,
              }}
            ></div>
            {/* Centro del vinilo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-24 rounded-full bg-primary border-8 border-black flex items-center justify-center">
                <div className="size-3 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* --- INFO Y CONTROLES --- */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-sm font-bold text-accent-gold uppercase tracking-widest mb-2">
            {isPlaying ? "Reproduciendo Ahora" : "Listo para reproducir"}
          </h2>

          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2 text-white font-display min-h-[3rem] line-clamp-2">
            {displayTitle}
          </h3>

          <p className="text-lg text-gray-400 font-medium mb-8">
            {displayArtist} {displayAlbum}
          </p>

          <div className="w-full max-w-md bg-card-dark p-6 rounded-xl shadow-lg border border-[#333]">
            {/* --- BARRA DE PROGRESO (VISUAL) --- */}
            {/* Nota: El seeking principal se hace desde el player flotante para evitar conflictos complejos, 
                aquí mostramos el progreso visualmente */}
            <div
              ref={progressBarRef}
              className="w-full h-1 bg-gray-700 rounded-full mb-4 relative py-2 bg-clip-content"
            >
              {/* Barra de fondo */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-gray-700 rounded-full pointer-events-none"></div>

              {/* Barra de progreso coloreada */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-primary rounded-full transition-all duration-300 pointer-events-none"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* TIEMPOS */}
            <div className="flex justify-between text-xs font-mono font-medium text-gray-500 mb-6">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* BOTONES */}
            <div className="flex items-center justify-center gap-8">
              <button
                onClick={prevSong}
                className="text-gray-400 hover:text-white transition-colors hover:scale-110 active:scale-95"
              >
                <FaStepBackward size={24} />
              </button>

              <button
                onClick={togglePlay}
                className="size-16 rounded-full bg-primary text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-primary/30 active:scale-95"
              >
                {isPlaying ? (
                  <FaPause size={24} />
                ) : (
                  <FaPlay size={24} className="ml-1" />
                )}
              </button>

              <button
                onClick={nextSong}
                className="text-gray-400 hover:text-white transition-colors hover:scale-110 active:scale-95"
              >
                <FaStepForward size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
