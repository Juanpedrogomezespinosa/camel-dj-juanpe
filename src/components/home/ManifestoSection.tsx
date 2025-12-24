import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCompactDisc, FaPenNib } from "react-icons/fa";

const ManifestoSection: React.FC = () => {
  const cards = [
    {
      icon: <FaMapMarkerAlt className="text-2xl text-white" />,
      title: "DESDE EL SUR",
      text: "San Roque en el mapa. Lejos de los focos de la capital, creamos nuestra propia escena. Rap con salitre, identidad de barrio y códigos que no se compran ni se venden.",
    },
    {
      icon: <FaCompactDisc className="text-2xl text-white" />,
      title: "DIGGING & SCRATCH",
      text: "Juanpe al control. Respeto absoluto por el formato físico. Ritmos con grano, baterías sucias y técnica clásica. Aquí no se tocan botones, se acarician surcos.",
    },
    {
      icon: <FaPenNib className="text-2xl text-white" />,
      title: "BARRA A BARRA",
      text: "Camel en la escritura. Sin filtros ni autotune. Historias reales que pesan. No escribimos para los números, escribimos para que no se nos olvide quiénes somos.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-background-dark relative border-t border-[#2a2a2a]">
      <div className="max-w-[1080px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent-gold font-bold tracking-widest uppercase text-sm mb-2 block">
            Filosofía & Actitud
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white font-display">
            ESTRICTO UNDERGROUND
          </h2>

          {/* LÍNEA DECORATIVA (Diseño original) */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-[2px] w-12 bg-primary"></div>
            <div className="h-1.5 w-1.5 bg-[#c7a14a] rotate-45"></div>
            <div className="h-[2px] w-12 bg-primary"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-xl bg-card-dark border border-transparent hover:border-accent-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
            >
              <div className="size-14 rounded-full bg-background-dark flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary transition-colors duration-300">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold uppercase mb-3 text-white font-display tracking-tight">
                {card.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
