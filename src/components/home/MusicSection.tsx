import React from "react";
import {
  FaPlay,
  FaStepBackward,
  FaStepForward,
  FaPlus,
  FaShareAlt,
} from "react-icons/fa";

const MusicSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#0f0f0c] border-y border-card-dark overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Vinilo Giratorio */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative size-72 md:size-96 rounded-full overflow-hidden border-4 border-card-dark shadow-2xl animate-[spin_10s_linear_infinite]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop')",
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-24 rounded-full bg-primary border-8 border-black flex items-center justify-center">
                <div className="size-3 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Info y Controles */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-sm font-bold text-accent-gold uppercase tracking-widest mb-2">
            Reproduciendo Ahora
          </h2>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2 text-white font-display">
            Entre cornisas y áticos
          </h3>
          <p className="text-lg text-gray-400 font-medium mb-8">
            Camel & DJ Juanpe • Álbum: Manos a la obra de arte (2025)
          </p>

          <div className="w-full max-w-md bg-card-dark p-6 rounded-xl shadow-lg border border-[#333]">
            {/* Barra de progreso */}
            <div className="w-full h-1 bg-gray-700 rounded-full mb-4 relative cursor-pointer group">
              <div className="absolute top-0 left-0 h-full w-[35%] bg-primary rounded-full group-hover:bg-accent-gold transition-colors"></div>
              <div className="absolute top-1/2 left-[35%] -translate-y-1/2 -translate-x-1/2 size-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="flex justify-between text-xs font-mono font-medium text-gray-500 mb-6">
              <span>1:17</span>
              <span>3:42</span>
            </div>

            {/* Botones */}
            <div className="flex items-center justify-center gap-8">
              <button className="text-gray-400 hover:text-white transition-colors">
                <FaStepBackward size={24} />
              </button>
              <button className="size-16 rounded-full bg-primary text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-primary/30">
                <FaPlay size={24} className="ml-1" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
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
