import React from "react";
import { motion } from "framer-motion";
// Usamos iconos que representen: Ubicación, El DJ/Vinilo, y La Escritura
import { FaMapMarkerAlt, FaCompactDisc, FaPenNib } from "react-icons/fa";

const ManifestoSection: React.FC = () => {
  const cards = [
    {
      icon: <FaMapMarkerAlt className="text-2xl text-white" />,
      title: "DENOMINACIÓN DE ORIGEN",
      text: "Somos de San Roque, Campo de Gibraltar. Rap del sur con identidad propia. Lejos de modas pasajeras. Aquí se hace música por respeto, no por likes.",
    },
    {
      icon: <FaCompactDisc className="text-2xl text-white" />,
      title: "SONIDO ESTRICTO",
      text: "Juanpe en los aparatos. Boom Bap clásico, samplers con grano y scratches de verdad. Nada de pre-grabados: técnica, estructura y el sonido sucio de los 2000.",
    },
    {
      icon: <FaPenNib className="text-2xl text-white" />,
      title: "LÍRICA Y VERDAD",
      text: "Camel al micro. Introspección y crítica social. Escribimos lo que vivimos y lo que vemos. Sin relleno, solo barras que pesan y mensajes que quedan.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-background-dark relative">
      <div className="max-w-[1080px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent-gold font-bold tracking-widest uppercase text-sm mb-2 block">
            Pura Esencia
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white font-display">
            NUESTRO CÓDIGO
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
