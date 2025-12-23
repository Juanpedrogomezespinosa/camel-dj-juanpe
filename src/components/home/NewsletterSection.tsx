import React from "react";

const NewsletterSection: React.FC = () => {
  return (
    <section className="py-20 px-6  border-t border-[#2a2a2a]">
      {/* Contenedor más ancho (max-w-6xl) para alinearse con las otras secciones anchas */}
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
          {/* LADO IZQUIERDO: Texto y Gancho */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="h-1 w-8 bg-[#c7a14a] rounded-full"></div>
              <span className="text-[#c7a14a] font-bold text-xs uppercase tracking-widest">
                El Backstage
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-[#f2f2f2] leading-none">
              Únete al <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8a1e1e] to-[#ff2f2f]">
                Movimiento
              </span>
            </h2>

            <p className="text-base md:text-lg text-[#b6a0a0] font-light max-w-md mx-auto lg:mx-0 leading-relaxed">
              Recibe novedades, fechas exclusivas y acceso anticipado al
              merchandising.
              <span className="block mt-2 font-medium text-[#f2f2f2]">
                Sin relleno, solo barras.
              </span>
            </p>
          </div>

          {/* LADO DERECHO: Formulario */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#0b0b0b] p-6 md:p-8 rounded-sm border border-[#2a2a2a] shadow-2xl shadow-black/50">
              <form
                className="flex flex-col gap-4 w-full"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label className="sr-only" htmlFor="email">
                    Tu Correo Electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="TU CORREO ELECTRÓNICO"
                    className="w-full h-14 px-6 rounded-sm bg-[#1a1a1a] border border-[#2a2a2a] text-[#f2f2f2] placeholder-[#666] focus:outline-none focus:border-[#c7a14a] focus:ring-1 focus:ring-[#c7a14a]/50 uppercase tracking-wider text-sm transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-14 bg-[#8a1e1e] text-[#f2f2f2] rounded-sm font-bold uppercase tracking-widest text-sm transition-all cursor-pointer hover:bg-red-700 hover:text-white shadow-lg shadow-[#8a1e1e]/10"
                >
                  Suscribirse
                </button>

                <p className="text-[10px] text-[#555] text-center uppercase tracking-wider mt-2">
                  Respetamos tu privacidad. Date de baja cuando quieras.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
