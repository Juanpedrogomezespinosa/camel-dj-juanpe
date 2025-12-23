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
    <section className="py-20 bg-[#0b0b0b] border-t border-[#2a2a2a]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#f2f2f2] mb-4">
            Próximas Fechas
          </h2>
          {/* Línea decorativa roja */}
          <div className="h-1 w-20 bg-[#8a1e1e] mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col gap-4">
          {mockEvents.map((event) => (
            <div
              key={event.id}
              className="group relative flex flex-col md:flex-row items-center bg-[#0b0b0b] hover:bg-[#0f0f0f] border border-[#2a2a2a] hover:border-accent-gold/50 rounded-xl p-4 md:p-6 transition-all duration-300 shadow-sm hover:shadow-[#8a1e1e]/10"
            >
              {/* Fecha */}
              <div className="flex flex-row md:flex-col items-center justify-center min-w-[80px] gap-2 md:gap-0 mb-4 md:mb-0 md:mr-8 md:border-r md:border-[#2a2a2a] md:pr-8">
                <span className="text-3xl md:text-4xl font-black text-[#f2f2f2]">
                  {event.day}
                </span>
                <span className="text-sm font-bold text-[#8a1e1e] uppercase tracking-wider">
                  {event.month}
                </span>
              </div>

              {/* Info Lugar */}
              <div className="flex-grow text-center md:text-left mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-[#f2f2f2] mb-1">
                  {event.city}
                </h3>
                <p className="text-[#b6a0a0] font-medium flex items-center justify-center md:justify-start gap-2">
                  <svg
                    className="w-4 h-4"
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
              <div className="min-w-[140px] flex justify-center md:justify-end">
                {event.soldOut ? (
                  <span className="px-6 py-2 text-sm font-bold text-[#b6a0a0] bg-[#2a2a2a] rounded-full border border-[#2a2a2a] cursor-not-allowed">
                    SOLD OUT
                  </span>
                ) : (
                  <a
                    href={event.link}
                    className="px-6 py-3 text-sm font-bold text-white bg-primary rounded-full hover:bg-red-700 hover:scale-105 transition-colors duration-300 shadow-lg shadow-white/5 hover:shadow-[#c7a14a]/20"
                  >
                    Comprar Entradas
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-[#b6a0a0] text-sm">
            ¿Quieres contratarnos?{" "}
            <a
              href="/contacto"
              className="text-accent-gold hover:underline font-bold"
            >
              Escríbenos aquí.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
