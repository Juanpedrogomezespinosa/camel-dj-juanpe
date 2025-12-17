import React from "react";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaDownload,
  FaShareAlt,
  FaHeart,
} from "react-icons/fa";
import { usePlayerStore } from "../../store/playerStore";
import type { Album, Song } from "../../data/discography";

interface Props {
  album: Album;
}

const AlbumDetailPlayer: React.FC<Props> = ({ album }) => {
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayerStore();

  // Función para descargar (simulada o real si el link es directo)
  const handleDownload = () => {
    // Aquí podrías abrir el link de Cloudflare en nueva pestaña
    window.open(album.cover, "_blank");
  };

  return (
    <div className="flex flex-col gap-8">
      {/* CABECERA DE ACCIONES */}
      <div className="flex flex-wrap gap-4 pt-2">
        <button
          onClick={() => alert("Función de descarga próximamente")}
          className="flex items-center justify-center gap-3 px-8 h-12 rounded-full bg-primary text-white font-bold text-sm tracking-wide hover:bg-red-700 transition-colors shadow-lg shadow-primary/20"
        >
          <FaDownload /> DESCARGAR ÁLBUM
        </button>

        <button
          onClick={() => playSong(album.songs[0], album)}
          className="flex items-center justify-center gap-3 px-8 h-12 rounded-full bg-card-light text-white font-bold text-sm tracking-wide hover:bg-white hover:text-black transition-colors shadow-sm"
        >
          <FaPlay /> ESCUCHAR AHORA
        </button>

        <div className="flex gap-2">
          <button className="flex items-center justify-center size-12 rounded-full border border-gray-700 bg-transparent text-white hover:bg-card-light transition-colors">
            <FaHeart />
          </button>
          <button className="flex items-center justify-center size-12 rounded-full border border-gray-700 bg-transparent text-white hover:bg-card-light transition-colors">
            <FaShareAlt />
          </button>
        </div>
      </div>

      {/* LISTA DE CANCIONES */}
      <div className="flex flex-col gap-1 mt-8">
        {/* Encabezado Tabla */}
        <div className="border-b border-gray-800 pb-4 mb-2 flex items-center justify-between text-xs font-bold text-accent-gold uppercase tracking-wider px-4">
          <div className="w-12">#</div>
          <div className="flex-1">Título</div>
          <div className="w-24 text-right">Duración</div>
        </div>

        {/* Canciones */}
        {album.songs.map((song, index) => {
          const isActive = currentSong?.id === song.id;

          return (
            <div
              key={song.id}
              onClick={() => {
                if (isActive) togglePlay();
                else playSong(song, album);
              }}
              className={`group flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer border border-transparent ${
                isActive
                  ? "bg-card-light border-primary/30"
                  : "hover:bg-card-light hover:border-gray-700"
              }`}
            >
              <div className="flex items-center flex-1 gap-4 overflow-hidden">
                {/* Número o Icono Play/Pause */}
                <div className="w-8 text-center">
                  {isActive && isPlaying ? (
                    <FaPause className="text-primary animate-pulse mx-auto" />
                  ) : isActive ? (
                    <FaPlay className="text-primary mx-auto" />
                  ) : (
                    <>
                      <span className="text-accent-gold font-medium text-sm group-hover:hidden">
                        {index + 1}
                      </span>
                      <FaPlay className="hidden group-hover:block text-white text-xs mx-auto" />
                    </>
                  )}
                </div>

                <div className="flex flex-col">
                  <span
                    className={`font-bold text-base truncate ${
                      isActive ? "text-primary" : "text-white"
                    }`}
                  >
                    {song.title}
                  </span>
                  {/* Si tuviéramos artista por canción, iría aquí. Usamos el del álbum por defecto */}
                  {/* <span className="text-gray-500 text-xs font-medium">{album.artist}</span> */}
                </div>
              </div>

              {/* Duración (Placeholder si no la tenemos en JSON) */}
              <div className="w-24 text-right text-sm font-medium text-gray-400">
                {song.duration || "--:--"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumDetailPlayer;
