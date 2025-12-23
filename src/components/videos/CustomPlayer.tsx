import React from "react";
// Importamos los componentes Core
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
// Importamos el Layout por defecto y sus iconos
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

// Importamos los estilos CSS obligatorios de Vidstack
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

interface Props {
  src: string;
  poster?: string;
  title: string;
}

const CustomPlayer: React.FC<Props> = ({ src, poster, title }) => {
  return (
    <div className="w-full h-full custom-player-wrapper group relative z-10">
      <MediaPlayer
        title={title}
        src={src}
        aspectRatio="16/9"
        load="eager"
        className="w-full h-full bg-black rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10"
      >
        <MediaProvider>
          {poster && (
            <Poster
              className="vds-poster w-full h-full object-cover transition-opacity duration-500 block"
              src={poster}
              alt={title}
            />
          )}
        </MediaProvider>

        {/* Layout oficial de Vidstack */}
        <DefaultVideoLayout icons={defaultLayoutIcons} colorScheme="dark" />
      </MediaPlayer>

      {/* Estilos para ponerlo ROJO y DORADO */}
      <style>{`
        .custom-player-wrapper {
          --media-brand: #8a1e1e; /* Color Rojo Principal */
          --media-focus-ring: #c7a14a; /* Dorado */
        }
        /* Ocultar poster al reproducir */
        media-player[data-playing] .vds-poster {
            opacity: 0;
            visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default CustomPlayer;
