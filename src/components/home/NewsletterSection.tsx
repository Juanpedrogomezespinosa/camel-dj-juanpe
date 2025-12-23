import React from "react";

const NewsletterSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[#0b0b0b]">
      <div className="max-w-[800px] mx-auto text-center">
        {/* Pequeña línea decorativa dorada */}
        <div className="flex justify-center mb-6">
          <div className="h-1 w-12 bg-[#c7a14a] rounded-full"></div>
        </div>

        <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4 md:mb-6 text-[#f2f2f2]">
          Suscríbete a la{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c7a14a] to-[#f2f2f2]">
            Newsletter
          </span>
        </h2>

        <p className="text-base md:text-xl text-[#b6a0a0] font-light mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
          Recibe cada semana novedades, fechas de conciertos, accesos
          anticipados a merchandising y contenido exclusivo.{" "}
          <br className="hidden md:block" />
          <span className="font-medium text-[#f2f2f2] mt-2 block md:inline">
            Sin relleno, solo barras.
          </span>
        </p>

        <form
          className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-lg mx-auto mb-8 w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="TU CORREO ELECTRÓNICO"
            className="w-full sm:flex-1 h-12 md:h-14 px-6 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#f2f2f2] placeholder-[#888] focus:outline-none focus:border-[#c7a14a] focus:ring-1 focus:ring-[#c7a14a]/50 uppercase tracking-wider text-xs md:text-sm transition-all appearance-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto h-12 md:h-14 px-8 bg-primary text-[#f2f2f2] rounded-full font-bold uppercase tracking-widest text-xs md:text-sm transition-all cursor-pointer hover:bg-red-700  shadow-lg shadow-[#8a1e1e]/20"
          >
            Unirme
          </button>
        </form>

        <p className="text-[10px] md:text-xs text-[#666] uppercase tracking-wider px-4">
          Respetamos tu privacidad. Date de baja cuando quieras.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
