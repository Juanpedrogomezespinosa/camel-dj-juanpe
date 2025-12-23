import React, { useState } from "react";
// Importamos iconos para feedback visual
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaPaperPlane,
} from "react-icons/fa";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("¡Bienvenido al movimiento!");
        setEmail(""); // Limpiar input
      } else {
        setStatus("error");
        setMessage("Algo falló. Inténtalo de nuevo.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Error de conexión.");
    }

    // Resetear mensaje después de 5 segundos si hubo error o éxito
    setTimeout(() => {
      if (status !== "loading") {
        setStatus("idle");
        setMessage("");
      }
    }, 5000);
  };

  return (
    <section className="py-20 px-6 border-t border-[#2a2a2a]">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
          {/* LADO IZQUIERDO: Texto */}
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

          {/* LADO DERECHO: Formulario Funcional */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#0b0b0b] p-6 md:p-8 rounded-sm border border-[#2a2a2a] shadow-2xl shadow-black/50 relative overflow-hidden">
              <form
                className="flex flex-col gap-4 w-full relative z-10"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="sr-only" htmlFor="email">
                    Tu Correo Electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="TU CORREO ELECTRÓNICO"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    className="w-full h-14 px-6 rounded-sm bg-[#1a1a1a] border border-[#2a2a2a] text-[#f2f2f2] placeholder-[#666] focus:outline-none focus:border-[#c7a14a] focus:ring-1 focus:ring-[#c7a14a]/50 uppercase tracking-wider text-sm transition-all disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`w-full h-14 rounded-sm font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2
                    ${
                      status === "success"
                        ? "bg-green-700 text-white cursor-default"
                        : "bg-[#8a1e1e] text-[#f2f2f2] hover:bg-red-700 cursor-pointer shadow-lg shadow-[#8a1e1e]/10"
                    } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {status === "loading" ? (
                    <span className="animate-pulse">Procesando...</span>
                  ) : status === "success" ? (
                    <>
                      <FaCheckCircle className="text-lg" /> Suscrito
                    </>
                  ) : (
                    <>
                      Suscribirse{" "}
                      <FaPaperPlane className="text-xs opacity-70" />
                    </>
                  )}
                </button>

                {/* Mensaje de estado inferior */}
                {status === "error" && (
                  <p className="text-red-400 text-xs text-center mt-2 flex items-center justify-center gap-1">
                    <FaExclamationCircle /> {message}
                  </p>
                )}

                {status === "idle" && (
                  <p className="text-[10px] text-[#555] text-center uppercase tracking-wider mt-2">
                    Respetamos tu privacidad. Date de baja cuando quieras.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
