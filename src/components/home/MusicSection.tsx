import React, { useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaPlus,
  FaShareAlt,
} from "react-icons/fa";
import { usePlayerStore } from "../../store/playerStore";

// Imagen por defecto por si no hay nada seleccionado (Unsplash vinilo genérico)
const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop";

const MusicSection: React.FC = () => {
  // 1. CONECTAMOS CON EL ESTADO GLOBAL (STORE)
  const {
    isPlaying,
    currentSong,
    currentAlbum,
    togglePlay,
    nextSong,
    prevSong,
    volume,
  } = usePlayerStore();

  // 2. REFERENCIA AL ELEMENTO DE AUDIO HTML5 (INVISIBLE)
  const audioRef = useRef<HTMLAudioElement>(null);

  // 3. EFECTO: MANEJAR PLAY/PAUSE CUANDO CAMBIA EL ESTADO
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        // Manejo de errores de autoplay del navegador
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Error al reproducir:", error);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]); // Se ejecuta si cambia el estado de play o la canción

  // 4. EFECTO: CONTROLAR EL VOLUMEN
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // VARIABLES PARA LA INTERFAZ (Si no hay canción, muestra texto por defecto)
  const displayTitle = currentSong?.title || "Selecciona un tema";
  const displayArtist = currentAlbum?.artist || "Camel & DJ Juanpe";
  const displayAlbum = currentAlbum?.title
    ? `• Álbum: ${currentAlbum.title}`
    : "• Discografía Oficial";
  const displayCover = currentAlbum?.cover || DEFAULT_COVER;

  return (
    <section className="py-20 bg-[#0f0f0c] border-y border-card-dark overflow-hidden">
      {/* --- MOTOR DE AUDIO (INVISIBLE) --- */}
      <audio
        ref={audioRef}
        src={currentSong?.fileUrl}
        onEnded={nextSong} // Pasa automáticamente a la siguiente cuando acaba
        preload="auto"
      />

      <div className="max-w-[1280px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* --- VINILO GIRATORIO --- */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          {/* Añadimos la clase 'animate-[spin_10s_linear_infinite]' SOLO si isPlaying es true */}
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
            {/* Barra de progreso (Visual por ahora, funcional requeriría más lógica de tiempo) */}
            <div className="w-full h-1 bg-gray-700 rounded-full mb-4 relative cursor-pointer group">
              <div className="absolute top-0 left-0 h-full w-[0%] bg-primary rounded-full group-hover:bg-accent-gold transition-all duration-300 animate-pulse"></div>
              <div className="absolute top-1/2 left-[0%] -translate-y-1/2 -translate-x-1/2 size-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="flex justify-between text-xs font-mono font-medium text-gray-500 mb-6">
              <span>--:--</span>
              <span>--:--</span>
            </div>

            {/* Botones de Control */}
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
                {/* Cambia el icono según el estado */}
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

          <div className="mt-8 flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 hover:border-white text-white transition-colors text-xs font-bold uppercase tracking-widest">
              <FaPlus /> Biblioteca
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 hover:border-white text-white transition-colors text-xs font-bold uppercase tracking-widest">
              <FaShareAlt /> Compartir
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
