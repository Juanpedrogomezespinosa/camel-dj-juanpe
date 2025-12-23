const mockEvents = [
  {
    id: 1,
    day: "12",
    month: "DIC",
    city: "Algeciras",
    venue: "Sala Zero",
    soldOut: true,
    link: "#",
  },
  {
    id: 2,
    day: "26",
    month: "AGO",
    city: "Málaga",
    venue: "Sala Marte",
    soldOut: true,
    link: "#",
  },
  {
    id: 3,
    day: "05",
    month: "ABR",
    city: "Sevilla",
    venue: "Sala X",
    soldOut: true,
    link: "#",
  },
  {
    id: 4,
    day: "12",
    month: "SEP",
    city: "La Línea",
    venue: "La Matrix",
    soldOut: true,
    link: "#",
  },
];

export const TourDates = () => {
  return (
    <section className="py-24 bg-[#0b0b0b] border-t border-[#2a2a2a]">
      {/* Aumentado a max-w-6xl para permitir el grid ancho */}
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#f2f2f2] mb-4 uppercase tracking-tight">
            Próximas Fechas
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[2px] w-12 bg-[#8a1e1e]"></div>
            <div className="h-1.5 w-1.5 bg-[#c7a14a] rotate-45"></div>
            <div className="h-[2px] w-12 bg-[#8a1e1e]"></div>
          </div>
        </div>

        {/* CAMBIO CLAVE: Grid de 1 columna en móvil, 2 columnas en escritorio grande */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockEvents.map((event) => (
            <div
              key={event.id}
              className="group relative flex flex-col sm:flex-row items-center bg-[#0b0b0b] border border-[#2a2a2a] hover:border-[#c7a14a]/50 rounded-sm p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(138,30,30,0.1)] hover:bg-[#0f0f0f]"
            >
              {/* Fecha */}
              <div className="flex flex-row sm:flex-col items-center justify-center min-w-[90px] gap-3 sm:gap-0 mb-4 sm:mb-0 sm:mr-6 sm:border-r sm:border-[#2a2a2a] sm:pr-6">
                <span className="text-4xl font-black text-[#f2f2f2] group-hover:text-[#c7a14a] transition-colors">
                  {event.day}
                </span>
                <span className="text-sm font-bold text-[#8a1e1e] uppercase tracking-widest">
                  {event.month}
                </span>
              </div>

              {/* Info Lugar */}
              <div className="flex-grow text-center sm:text-left mb-5 sm:mb-0 w-full sm:w-auto">
                <h3 className="text-2xl font-bold text-[#f2f2f2] mb-1 uppercase tracking-wide">
                  {event.city}
                </h3>
                <p className="text-[#b6a0a0] font-medium flex items-center justify-center sm:justify-start gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-[#c7a14a]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  {event.venue}
                </p>
              </div>

              {/* Botón */}
              <div className="w-full sm:w-auto sm:min-w-[140px] flex justify-center sm:justify-end mt-2 sm:mt-0">
                {event.soldOut ? (
                  <div className="w-full sm:w-auto text-center px-6 py-2 border border-[#2a2a2a] bg-[#1a1a1a] rounded-sm opacity-70 cursor-not-allowed">
                    <span className="text-xs font-bold text-[#b6a0a0] uppercase tracking-wider block">
                      Sold Out
                    </span>
                  </div>
                ) : (
                  <a
                    href={event.link}
                    className="w-full sm:w-auto text-center px-6 py-3 text-sm font-bold text-[#c7a14a] border border-[#c7a14a] rounded-sm hover:bg-[#c7a14a] hover:text-[#0b0b0b] transition-all duration-300 uppercase tracking-wider"
                  >
                    Entradas
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#b6a0a0] text-sm">
            ¿Quieres contratarnos?{" "}
            <a
              href="/contacto"
              className="text-[#c7a14a]  border-[#c7a14a] hover:border-b  transition-colors pb-0.5 font-bold ml-1"
            >
              Escríbenos aquí
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
