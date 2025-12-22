import { discography } from "../../data/discography";

export const LatestRelease = () => {
  // Buscamos el disco específico por su ID
  const album = discography.find((album) => album.id === "19-manos-a-la-obra");

  if (!album) return null;

  return (
    <section className="relative w-full py-20 bg-[#0b0b0b] overflow-hidden">
      {/* Fondo decorativo sutil (Glow Rojo) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8a1e1e]/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* COLUMNA IMAGEN (Portada) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative group max-w-[350px] md:max-w-[450px]">
              {/* Sombra de la portada (Gradiente Rojo a Dorado) */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8a1e1e] to-[#c7a14a] rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

              <a href={`/discografia/${album.id}`}>
                <img
                  src={album.cover}
                  alt={`Portada de ${album.title}`}
                  className="relative rounded-lg shadow-2xl shadow-black/80 transform group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
              </a>
            </div>
          </div>

          {/* COLUMNA TEXTO */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            {/* Badge Dorado */}
            <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-[#c7a14a] uppercase bg-[#c7a14a]/10 rounded-full border border-[#c7a14a]/30">
              Último Lanzamiento
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-[#f2f2f2] mb-2 leading-tight tracking-tight">
              {album.title}
            </h2>

            <p className="text-xl text-[#b6a0a0] mb-6 font-medium">
              {album.artist} • {album.year}
            </p>

            <p className="text-[#b6a0a0] mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
              15 cortes de puro rap estricto. Desde "Damage" hasta "Entelequia",
              una obra tallada en el aire que define el sonido de una
              generación.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href={`/discografia/${album.id}`}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-primary rounded-full hover:bg-red-700 hover:scale-105 focus:outline-none"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Escuchar Álbum
              </a>
              <a
                href="/discografia"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-[#f2f2f2] transition-all duration-200 bg-transparent border border-[#2a2a2a] rounded-full hover:bg-[#2a2a2a] hover:border-[#b6a0a0] focus:outline-none"
              >
                Ver Discografía
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
