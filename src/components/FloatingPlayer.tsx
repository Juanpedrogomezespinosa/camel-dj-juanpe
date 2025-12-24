import React, { useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaTimes,
} from "react-icons/fa";
import { usePlayerStore } from "../store/playerStore";
import vinylIcon from "../assets/images/vinyl.png";

const FloatingPlayer: React.FC = () => {
  const {
    currentSong,
    currentAlbum,
    isPlaying,
    volume,
    togglePlay,
    nextSong,
    prevSong,
    setCurrentTime,
    setDuration,
    currentTime,
    duration, // IMPORTANTE: Recuperamos la duración del store
    closePlayer,
  } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // --- EFECTOS ---
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((e) => console.log("Esperando interacción...", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // --- HANDLERS ---
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const width = progressBarRef.current.clientWidth;
      const clickX = e.nativeEvent.offsetX;
      const duration = audioRef.current.duration;
      const newTime = (clickX / width) * duration;

      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // --- FORMATO DE TIEMPO (mm:ss) ---
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Si no hay canción, no renderizamos
  if (!currentSong) return null;

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-[#0f0f0c] border-t border-white/10 shadow-2xl transition-transform duration-500 transform translate-y-0">
      {/* BARRA DE PROGRESO SUPERIOR */}
      <div
        className="w-full h-1 bg-gray-800 cursor-pointer group"
        onClick={handleSeek}
        ref={progressBarRef}
      >
        <div
          className="h-full bg-primary group-hover:bg-accent-gold transition-colors relative"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 size-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* IZQUIERDA: INFO (Cover + Títulos) */}
        <div className="flex items-center gap-4 flex-1 overflow-hidden">
          <div
            className={`relative size-12 shrink-0 rounded-full overflow-hidden border border-white/10 bg-black shadow-lg ${
              isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
            }`}
          >
            <img
              src={currentAlbum?.cover || vinylIcon.src}
              alt="Cover"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-2 bg-[#0f0f0c] rounded-full border border-gray-700" />
            </div>
          </div>

          <div className="flex flex-col overflow-hidden justify-center">
            <span className="text-white font-bold text-sm truncate leading-tight">
              {currentSong.title}
            </span>
            <span className="text-gray-400 text-xs truncate leading-tight mt-0.5">
              {currentAlbum?.artist || "Camel & DJ Juanpe"}
            </span>
          </div>
        </div>

        {/* CENTRO: CONTROLES */}
        <div className="flex items-center justify-center gap-6 text-white w-auto">
          <button
            onClick={prevSong}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:scale-110 active:scale-95"
          >
            <FaStepBackward size={18} />
          </button>

          <button
            onClick={togglePlay}
            className="size-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-white/10 active:scale-95"
          >
            {isPlaying ? (
              <FaPause size={14} />
            ) : (
              <FaPlay size={14} className="ml-1" />
            )}
          </button>

          <button
            onClick={nextSong}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:scale-110 active:scale-95"
          >
            <FaStepForward size={18} />
          </button>
        </div>

        {/* DERECHA: TIEMPO + CERRAR */}
        <div className="flex items-center justify-end gap-6 flex-1">
          {/* NUEVO: Contador de tiempo */}
          <div className="flex flex-col items-end sm:flex-row sm:items-center sm:gap-1 text-xs font-mono font-medium text-gray-400">
            <span className="text-white">{formatTime(currentTime)}</span>
            <span className="hidden sm:inline">/</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block"></div>

          {/* Botón Cerrar */}
          <button
            onClick={closePlayer}
            className="text-gray-500 hover:text-red-500 transition-colors p-2 hover:rotate-90 duration-300"
            title="Cerrar reproductor"
          >
            <FaTimes size={18} />
          </button>
        </div>
      </div>

      {/* MOTOR DE AUDIO */}
      <audio
        ref={audioRef}
        src={currentSong.fileUrl}
        onEnded={nextSong}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="auto"
        autoPlay
      />
    </div>
  );
};

export default FloatingPlayer;
