import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaMicrophoneAlt, FaMusic } from "react-icons/fa";

const ManifestoSection: React.FC = () => {
  const cards = [
    {
      icon: <FaEdit className="text-2xl text-white" />,
      title: "Precisión Lírica",
      text: "Cada rima está calculada. Cada verso tiene peso. Quitamos el ruido para dejar que el mensaje respire.",
    },
    {
      icon: <FaMicrophoneAlt className="text-2xl text-white" />,
      title: "Identidad Clásica",
      text: "Arraigados en la vieja escuela, refinados para el oído moderno. Estilo atemporal que respeta los orígenes.",
    },
    {
      icon: <FaMusic className="text-2xl text-white" />,
      title: "Alma Underground",
      text: "Nacidos en la sombra, brillando en la luz. Auténticos, crudos y sin compromisos con las modas.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-background-dark relative">
      <div className="max-w-[1080px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent-gold font-bold tracking-widest uppercase text-sm mb-2 block">
            La Filosofía
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white font-display">
            El Manifiesto
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
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
              className="group p-8 rounded-xl bg-card-dark border border-transparent hover:border-accent-gold/50 transition-all duration-300"
            >
              <div className="size-12 rounded-full bg-background-dark flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary transition-colors">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold uppercase mb-3 text-white">
                {card.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
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
