import React from "react";

const ContactSection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-black text-white relative overflow-hidden">
      {/* Overlay Gradiente */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1a1a1a] to-transparent opacity-50 pointer-events-none"></div>

      <div className="max-w-[800px] mx-auto relative z-10 text-center">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 font-display">
          Únete al Movimiento
        </h2>
        <p className="text-xl text-gray-400 font-light mb-10 max-w-2xl mx-auto">
          Sé el primero en saber sobre nuevos temas, fechas de conciertos y
          merchandising exclusivo. Sin spam, solo contenido puro.
        </p>

        <form
          className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto mb-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="TU EMAIL"
            className="flex-1 h-14 px-6 rounded-full bg-background-dark border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary uppercase tracking-wider text-sm"
          />
          <button
            type="submit"
            className="h-14 px-8 bg-primary hover:bg-red-800 text-white rounded-full font-bold uppercase tracking-widest transition-all cursor-pointer"
          >
            Suscribirse
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
