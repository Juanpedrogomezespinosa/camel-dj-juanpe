import { parseStream } from "music-metadata";
import fs from "fs";

// 👇 TU URL DE CLOUDFLARE
const BASE_URL = "https://pub-84177b94443940c686d06173a7c6f370.r2.dev";
const OUTPUT_FILE = "./src/data/discography.ts";

// TUS DATOS (Los mismos que antes)
const albumsData = [
  {
    id: "19-manos-a-la-obra",
    title: "Manos a la Obra de Arte",
    year: "2025",
    artist: "Camel No Sabaku & DJ Juanpe",
    cover: `/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/diseño.jpg`,
    songs: [
      {
        id: "19-01",
        title: "Damage",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/01. Damage.mp3",
      },
      {
        id: "19-02",
        title: "Entre Cornisas y Áticos",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/02. Entre Cornisas y Áticos.mp3",
      },
      {
        id: "19-03",
        title: "Me Nombra",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/03. Me Nombra.mp3",
      },
      {
        id: "19-04",
        title: "El Juego del Ego",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/04. El Juego del Ego.mp3",
      },
      {
        id: "19-05",
        title: "Golden Boy",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/05. Golden Boy.mp3",
      },
      {
        id: "19-06",
        title: "Abstracto",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/06. Abstracto.mp3",
      },
      {
        id: "19-07",
        title: "Me Tengo Miedo (Con Soriano)",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/07. Me Tengo Miedo (Con Soriano).mp3",
      },
      {
        id: "19-08",
        title: "Tallando el Aire",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/08. Tallando el Aire.mp3",
      },
      {
        id: "19-09",
        title: "Infusión y Valeriana",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/09. Infusión y Valeriana.mp3",
      },
      {
        id: "19-10",
        title: "Taima (Con Flameh y BubenKing)",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/10. Taima (Con Flameh y BubenKing).mp3",
      },
      {
        id: "19-11",
        title: "John Doe",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/11. John Doe.mp3",
      },
      {
        id: "19-12",
        title: "Cuando el Mármol se Convierte en Agua (Con Kattman)",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/12. Cuando el Marmol se Convierte en Agua (Con Kattman).mp3",
      },
      {
        id: "19-13",
        title: "El Bosque (Con Blanka Bernal)",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/13. El Bosque (Con Blanka Bernal).mp3",
      },
      {
        id: "19-14",
        title: "Manos a la Obra de Arte",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/14. Manos a la Obra de Arte.mp3",
      },
      {
        id: "19-15",
        title: "Entelequia",
        path: "/19. Camel No Sabaku & DJ Juanpe - Manos a la Obra de Arte (2025)/15. Entelequia.mp3",
      },
    ],
  },
  {
    id: "18-colabos-vol4",
    title: "Colaboraciones e Inéditos Vol.4",
    year: "2021-2025",
    artist: "Camel & DJ Juanpe",
    cover: `/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/diseño.png`,
    songs: [
      {
        id: "18-01",
        title: "Granadilla Company (Juanxo, Carlos, Zone y Camel)",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/01. Granadilla Company (Juanxo, Carlos, Zone y Camel).mp3",
      },
      {
        id: "18-02",
        title: "ParkFlow (Con Camel, Carlos y Juanxo)",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/02. Zone - ParkFlow (Con Camel, Carlos y Juanxo).mp3",
      },
      {
        id: "18-03",
        title:
          "Que Tiren (Con Flameh, Camel, Gigante y Un Chaval de Pescadoreh)",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/03. BubenKing - Que Tiren (Con Flameh, Camel, Gigante y Un Chaval de Pescadoreh).mp3",
      },
      {
        id: "18-04",
        title: "Me Llevan a Ti",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/04. Camel - Me Llevan a Ti.mp3",
      },
      {
        id: "18-05",
        title: "Tratamiento Resende",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/05. Camel & DJ Juanpe - Tratamiento Resende.mp3",
      },
      {
        id: "18-06",
        title: "Estamos Aquí",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/06. Cruz Campo G - Estamos Aquí.mp3",
      },
      {
        id: "18-07",
        title: "Sujetando el Cielo (Parte Camel)",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/07. Sujetando el Cielo (Parte Camel).mp3",
      },
      {
        id: "18-08",
        title: "Libre (Con Camel) [Duo Tik Tok]",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/08. Nach - Libre (Con Camel) [Duo Tik Tok].mp3",
      },
      {
        id: "18-09",
        title: "Yo Tengo el Rap (Con Camel & DJ Juanpe)",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/09. Gachet - Yo Tengo el Rap (Con Camel & DJ Juanpe).mp3",
      },
      {
        id: "18-10",
        title: "Perro (Remix Gachet Old School)",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/10. BubenKing, Camel y Pablosinaka - Perro (Remix Gachet Old School).aac",
      },
      {
        id: "18-11",
        title: "Frases de Resaca (Boujack Horseman)",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/11. Camel & DJ Juanpe - Frases de Resaca (Boujack Horseman).wav",
      },
      {
        id: "18-12",
        title: "Randon Bullshit Go (Con Camel)",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/12. GachetOldSchool - Randon Bullshit Go (Con Camel).wav",
      },
      {
        id: "18-13",
        title: "Da Sur Club",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/13. Camel y Twinkie - Da Sur Club.mpeg",
      },
      {
        id: "18-14",
        title: "ElBezea (Con Camel, Kako y Sr Lilo)",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/14. ElBezea (Con Camel, Kako y Sr Lilo).mpeg",
      },
      {
        id: "18-15",
        title: "Pa Mi Que No (Con Camel)",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/15. Gachet - Pa Mi Que No (Con Camel) (Prod.Gachet).mp3",
      },
      {
        id: "18-16",
        title: "Bassjuno",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/16. Camel & DJ Juanpe - Bassjuno.mp3",
      },
      {
        id: "18-17",
        title: "Ademán",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/17. Camel No Sabaku & DJ Juanpe - Ademan.mp3",
      },
      {
        id: "18-18",
        title: "Sangre de Cristo (Con Camel No Sabaku)",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/18. Blanka Bernal - Sangre de Cristo (Con Camel No Sabaku).mp3",
      },
      {
        id: "18-19",
        title: "Ok, Lets Go",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/19. Maskeh, Camel, Gachet I Ok, Lets Go.mp3",
      },
      {
        id: "18-20",
        title: "Backing Tha Beat (Con Pata, Camel No Sabaku y Drako)",
        path: "/18. Colaboraciones e Ineditos Vol.4 (2021 - 2025)/20. GachetOldSchool - Backing Tha Beat (Con Pata, Camel No Sabaku y Drako).wav",
      },
    ],
  },
  {
    id: "17-godhito-zezy",
    title: "Godhito Zezy como Biggie",
    year: "2020",
    artist: "Camel & DJ Juanpe",
    cover: `/17. Camel & DJ Juanpe - Godhito Zezy como Biggie (Mixtape 2020)/diseño.png`,
    songs: [
      {
        id: "17-01",
        title: "Mejor que rakuda",
        path: "/17. Camel & DJ Juanpe - Godhito Zezy como Biggie (Mixtape 2020)/01. Mejor que rakuda.mp3",
      },
      {
        id: "17-02",
        title: "Haz Astra per Aspera",
        path: "/17. Camel & DJ Juanpe - Godhito Zezy como Biggie (Mixtape 2020)/02. Haz Astra per Aspera.mp3",
      },
      {
        id: "17-03",
        title: "Yo Odio a James Wong (Old Version)",
        path: "/17. Camel & DJ Juanpe - Godhito Zezy como Biggie (Mixtape 2020)/03. Yo Odio a James Wong (Old Version).mp3",
      },
      {
        id: "17-04",
        title: "De la Cuna a la Cuneta",
        path: "/17. Camel & DJ Juanpe - Godhito Zezy como Biggie (Mixtape 2020)/04. De la Cuna a la Cuneta.mp3",
      },
      {
        id: "17-05",
        title: "Las Culpas van pa el Micro",
        path: "/17. Camel & DJ Juanpe - Godhito Zezy como Biggie (Mixtape 2020)/05. Las Culpas van pa el Micro.mp3",
      },
      {
        id: "17-06",
        title: "Te lo Prometo (Con Big Oli)",
        path: "/17. Camel & DJ Juanpe - Godhito Zezy como Biggie (Mixtape 2020)/06. Te lo Prometo (Con Big Oli).mp3",
      },
      {
        id: "17-07",
        title: "Frikis del Rap",
        path: "/17. Camel & DJ Juanpe - Godhito Zezy como Biggie (Mixtape 2020)/07. Frikis del Rap.mp3",
      },
      {
        id: "17-08",
        title: "Genio (Con Nano Little Bwoy)",
        path: "/17. Camel & DJ Juanpe - Godhito Zezy como Biggie (Mixtape 2020)/08. Genio (Con Nano Little Bwoy).mp3",
      },
      {
        id: "17-09",
        title: "Cigarro de la Suerte",
        path: "/17. Camel & DJ Juanpe - Godhito Zezy como Biggie (Mixtape 2020)/09. Cigarro de la Suerte.mp3",
      },
      {
        id: "17-10",
        title: "Creo",
        path: "/17. Camel & DJ Juanpe - Godhito Zezy como Biggie (Mixtape 2020)/10. Creo.mp3",
      },
    ],
  },
  {
    id: "16-acuestate-y-suda",
    title: "Acuéstate y Suda Vol.1",
    year: "2024",
    artist: "Camel & Toba",
    cover: `/16. Camel & Toba - Acuestate y Suda Vol.1 (2024)/diseño.jpeg`,
    songs: [
      {
        id: "16-01",
        title: "Venom",
        path: "/16. Camel & Toba - Acuestate y Suda Vol.1 (2024)/01. Camel & Toba - Venom [Prod. Nigma y Raias Beats].wav",
      },
      {
        id: "16-02",
        title: "Yo Odio a James Yong",
        path: "/16. Camel & Toba - Acuestate y Suda Vol.1 (2024)/02. Camel & Toba - Yo Odio a James Yong [Prod. DJ Juanpe].wav",
      },
      {
        id: "16-03",
        title: "Pintando las Paredes (Remix GachetOldSchool)",
        path: "/16. Camel & Toba - Acuestate y Suda Vol.1 (2024)/03. Camel & Toba - Pintando las Paredes (Remix GachetOldSchool).wav",
      },
      {
        id: "16-04",
        title: "Es lo que Hay (Con Buben King)",
        path: "/16. Camel & Toba - Acuestate y Suda Vol.1 (2024)/04. Camel & Toba - Es lo que Hay (Con Buben King) [Prod. DJ Juanpe].wav",
      },
    ],
  },
  {
    id: "15-area90studio",
    title: "Area90Studio",
    year: "2023-2024",
    artist: "BubenKing, Camel y PabloSinAka",
    cover: `/15. Area90Studio (BubenKing, Camel y PabloSinAka) (2023-2024)/diseño.jpg`,
    songs: [
      {
        id: "15-01",
        title: "Papela",
        path: "/15. Area90Studio (BubenKing, Camel y PabloSinAka) (2023-2024)/01. Papela.wav",
      },
      {
        id: "15-02",
        title: "OG",
        path: "/15. Area90Studio (BubenKing, Camel y PabloSinAka) (2023-2024)/02. OG.wav",
      },
      {
        id: "15-03",
        title: "Main",
        path: "/15. Area90Studio (BubenKing, Camel y PabloSinAka) (2023-2024)/03. Main.wav",
      },
      {
        id: "15-04",
        title: "Enemys",
        path: "/15. Area90Studio (BubenKing, Camel y PabloSinAka) (2023-2024)/04. Enemys.wav",
      },
      {
        id: "15-05",
        title: "Sin Compasión",
        path: "/15. Area90Studio (BubenKing, Camel y PabloSinAka) (2023-2024)/05. Sin Compasión.mp3",
      },
      {
        id: "15-06",
        title: "Smonkey",
        path: "/15. Area90Studio (BubenKing, Camel y PabloSinAka) (2023-2024)/06. Smonkey.mp3",
      },
      {
        id: "15-07",
        title: "Orio",
        path: "/15. Area90Studio (BubenKing, Camel y PabloSinAka) (2023-2024)/07. Orio.mp3",
      },
      {
        id: "15-08",
        title: "Perro",
        path: "/15. Area90Studio (BubenKing, Camel y PabloSinAka) (2023-2024)/08. Perro.mp3",
      },
      {
        id: "15-09",
        title: "Aprendí",
        path: "/15. Area90Studio (BubenKing, Camel y PabloSinAka) (2023-2024)/09. Aprendí.mp3",
      },
      {
        id: "15-10",
        title: "Photala",
        path: "/15. Area90Studio (BubenKing, Camel y PabloSinAka) (2023-2024)/10. Photala.mp3",
      },
    ],
  },
  {
    id: "14-fobias-y-filias",
    title: "Fobias & Filias",
    year: "2023",
    artist: "Camel",
    cover: `/14. Camel - Fobias & Filias (2023)/diseño.jpg`,
    songs: [
      {
        id: "14-01",
        title: "Gustos Obsesivos",
        path: "/14. Camel - Fobias & Filias (2023)/01. Gustos Obsesivos [Prod. Baghira & Acción Sanchez].wav",
      },
      {
        id: "14-02",
        title: "Triste y Aburrido",
        path: "/14. Camel - Fobias & Filias (2023)/02. Triste y Aburrido [Prod. Baghira & Dr Neo Cortex].wav",
      },
      {
        id: "14-03",
        title: "Donde Estoy",
        path: "/14. Camel - Fobias & Filias (2023)/03. Donde Estoy [Prod. Baghira & Hueco].wav",
      },
      {
        id: "14-04",
        title: "Coronel Cadalso",
        path: "/14. Camel - Fobias & Filias (2023)/04. Coronel Cadalso [Prod. Baghira & Dr Neo Cortex].wav",
      },
    ],
  },
  {
    id: "13-quimeras-y-utopias",
    title: "Quimeras & Utopías",
    year: "2022",
    artist: "Camel & DJ Juanpe",
    cover: `/13. Camel & DJ Juanpe - Quimeras & Utopias (2022)/diseño.jpg`,
    songs: [
      {
        id: "13-01",
        title: "Monte Paozu",
        path: "/13. Camel & DJ Juanpe - Quimeras & Utopias (2022)/01. Monte Paozu [Prod. DJ Juanpe].mp3",
      },
      {
        id: "13-02",
        title: "Si Tienes Tiempo",
        path: "/13. Camel & DJ Juanpe - Quimeras & Utopias (2022)/02. Si Tienes Tiempo [Prod. DJ Juanpe].mp3",
      },
      {
        id: "13-03",
        title: "Mi Corazón es una Aduana",
        path: "/13. Camel & DJ Juanpe - Quimeras & Utopias (2022)/03. Mi Corazón es una Aduana [Prod. DJ Juanpe].mp3",
      },
      {
        id: "13-04",
        title: "Eterno Sabado (Con Fran Collado)",
        path: "/13. Camel & DJ Juanpe - Quimeras & Utopias (2022)/04. Eterno Sabado (Con Fran Collado) [Prod. DJ Juanpe].mp3",
      },
      {
        id: "13-05",
        title: "No Tengo Vergüenza",
        path: "/13. Camel & DJ Juanpe - Quimeras & Utopias (2022)/05. No Tengo Vergüenza [Prod. DJ Juanpe].mp3",
      },
      {
        id: "13-06",
        title: "Gris",
        path: "/13. Camel & DJ Juanpe - Quimeras & Utopias (2022)/06. Gris [Prod. DJ Juanpe].mp3",
      },
      {
        id: "13-07",
        title: "Pintando las Paredes (Con Toba)",
        path: "/13. Camel & DJ Juanpe - Quimeras & Utopias (2022)/07. Pintando las Paredes (Con Toba) [Prod. DJ Juanpe].mp3",
      },
      {
        id: "13-08",
        title: "Volando Bajo",
        path: "/13. Camel & DJ Juanpe - Quimeras & Utopias (2022)/08. Volando Bajo [Prod. DJ Juanpe].mp3",
      },
      {
        id: "13-09",
        title: "Compadre (Con Pino y ElBezea)",
        path: "/13. Camel & DJ Juanpe - Quimeras & Utopias (2022)/09. Compadre (Con Pino y ElBezea) [Prod. DJ Juanpe].mp3",
      },
      {
        id: "13-10",
        title: "Quimeras & Utopias",
        path: "/13. Camel & DJ Juanpe - Quimeras & Utopias (2022)/10. Quimeras & Utopias [Prod. DJ Juanpe].mp3",
      },
      {
        id: "13-11",
        title: "Quemando mi Nombre",
        path: "/13. Camel & DJ Juanpe - Quimeras & Utopias (2022)/11. Quemando mi Nombre [Prod. DJ Juanpe].mp3",
      },
      {
        id: "13-12",
        title: "0,001% (Milagro)",
        path: "/13. Camel & DJ Juanpe - Quimeras & Utopias (2022)/12. 0,001% (Milagro) [Prod. DJ Juanpe].mp3",
      },
    ],
  },
  {
    id: "12-comediantes-de-la-legua",
    title: "Comediantes de la Legua",
    year: "2021",
    artist: "Camel & DJ Juanpe",
    cover: `/12. Camel & DJ Juanpe - Comediantes de la Legua (2021)/diseño.jpg`,
    songs: [
      {
        id: "12-01",
        title: "Monólogo",
        path: "/12. Camel & DJ Juanpe - Comediantes de la Legua (2021)/01. Monólogo [Prod. DJ Juanpe].mp3",
      },
      {
        id: "12-02",
        title: "Llorar sin Miedo",
        path: "/12. Camel & DJ Juanpe - Comediantes de la Legua (2021)/02. Llorar sin Miedo [Prod. DJ Juanpe].mp3",
      },
      {
        id: "12-03",
        title: "Ensoñación Excesiva",
        path: "/12. Camel & DJ Juanpe - Comediantes de la Legua (2021)/03. Ensoñación Excesiva (Con Isaac y Belen Alarcón) [Prod. DJ Juanpe].mp3",
      },
    ],
  },
  {
    id: "11-cuerdas-vocales",
    title: "Cuerdas Vocales",
    year: "2021",
    artist: "Camel & Fran Collado",
    cover: `/11. Camel & Fran Collado - Cuerdas Vocales (2021)/diseño.png`,
    songs: [
      {
        id: "11-01",
        title: "Hey!",
        path: "/11. Camel & Fran Collado - Cuerdas Vocales (2021)/01. Camel & Fran Collado - Hey!.wav",
      },
      {
        id: "11-02",
        title: "En Obras",
        path: "/11. Camel & Fran Collado - Cuerdas Vocales (2021)/02. Camel & Fran Collado - En Obras.wav",
      },
      {
        id: "11-03",
        title: "Toque de Atención",
        path: "/11. Camel & Fran Collado - Cuerdas Vocales (2021)/03. Camel & Fran Collado - Toque de Atención.wav",
      },
      {
        id: "11-04",
        title: "Baku-Shan",
        path: "/11. Camel & Fran Collado - Cuerdas Vocales (2021)/04. Camel & Fran Collado - Baku-Shan.mp3",
      },
      {
        id: "11-05",
        title: "Libre",
        path: "/11. Camel & Fran Collado - Cuerdas Vocales (2021)/05. Camel & Fran Collado - Libre.wav",
      },
      {
        id: "11-06",
        title: "Y Tu No (Version Caminito)",
        path: "/11. Camel & Fran Collado - Cuerdas Vocales (2021)/06. Camel & Fran Collado - Y Tu No (Version Caminito).mp3",
      },
    ],
  },
  {
    id: "10-colabos-2016-2020",
    title: "Colabos 2016 - 2020",
    year: "2021",
    artist: "Camel",
    cover: `/10. Camel - Colabos 2016 - 2020 (2021)/diseño.jpg`,
    songs: [
      {
        id: "10-01",
        title: "Unas OK (Con Camel)",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/01. Xuso - Unas OK (Con Camel) [Gama de Grises].mp3",
      },
      {
        id: "10-02",
        title: "Unlocked (Con Makro & Camel)",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/02. BubenKing - Unlocked (Con Makro & Camel) [Adamantiun].mp3",
      },
      {
        id: "10-03",
        title: "Visto lo Visto (Con Camel)",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/03. Jorge Gascon - Visto lo Visto (Con Camel) [Prod. Juan Profundo].mp3",
      },
      {
        id: "10-04",
        title: "Zzz (Con Camel)",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/04. Marguel - Zzz (Con Camel) [Prod. Sinarii].mp3",
      },
      {
        id: "10-05",
        title: "RapSot Camel & Dj Juanpe",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/05. Golden Road - RapSot Camel & Dj Juanpe [Prod. Hueco].mp3",
      },
      {
        id: "10-07",
        title: "29 Abril",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/07. Camel - 29 Abril [Prod. Dj Juanpe].mp3",
      },
      {
        id: "10-08",
        title: "Wana-Nana (Con Camel)",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/08. Zone - Wana-Nana (Con Camel).mp3",
      },
      {
        id: "10-09",
        title: "Catastrofe Enfermiza 18´",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/09. Ruinah Klan - Catastrofe Enfermiza 18´.mp3",
      },
      {
        id: "10-10",
        title: "Tráfico",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/10. Camel - Tráfico.mp3",
      },
      {
        id: "10-11",
        title: "Noble",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/11. Camel - Noble.mp3",
      },
      {
        id: "10-12",
        title: "Arsenico (Con Camel)",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/12. Banketa - Arsenico (Con Camel).m4a",
      },
      {
        id: "10-13",
        title: "Pienso (Con Camel)",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/13. Gachet - Pienso (Con Camel).mp3",
      },
      {
        id: "10-14",
        title: "GachetOldSchool",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/14. Camel -GachetOldSchool.mp3",
      },
      {
        id: "10-15",
        title: "A Mi No",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/15. Camel, Gachet, Crt y Jairo - A Mi No.mp3",
      },
      {
        id: "10-16",
        title: "Tu sabe",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/16. Camel & Flameh - Tu sabe.mp3",
      },
      {
        id: "10-17",
        title: "Cama",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/17. Camel - Cama.wav",
      },
      {
        id: "10-18",
        title: "Rewing",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/18. Rewing.mp3",
      },
      {
        id: "10-19",
        title: "Lo que no Conté",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/19. Lo que no Conté.mp3",
      },
      {
        id: "10-20",
        title: "ASÍ SUENA ALGECIRAS vol.2",
        path: "/10. Camel - Colabos 2016 - 2020 (2021)/20. ASÍ SUENA ALGECIRAS vol.2.mp3",
      },
    ],
  },
  {
    id: "09-grafologia-obligada",
    title: "#GrafologíaObligada",
    year: "2017",
    artist: "Camel & DJ Juanpe",
    cover: `/09. Camel & Dj Juanpe - %23GrafologíaObligada (2017)/diseño.jpg`,
    songs: [
      {
        id: "09-01",
        title: "Lo Mantengo",
        path: "/09. Camel & Dj Juanpe - %23GrafologíaObligada (2017)/01. Camel & Dj Juanpe - Lo Mantengo [Prod  Dj Juanpe] %23GrafologíaObligada.mp3",
      },
      {
        id: "09-02",
        title: "Escarnio",
        path: "/09. Camel & Dj Juanpe - %23GrafologíaObligada (2017)/02. Camel & DJ Juanpe - Escarnio.wav",
      },
      {
        id: "09-03",
        title: "Respect And Peace (con Khare)",
        path: "/09. Camel & Dj Juanpe - %23GrafologíaObligada (2017)/03. Camel & DJ Juanpe - Respect And Peace (con Khare).wav",
      },
      {
        id: "09-04",
        title: "Saludo Eskizo",
        path: "/09. Camel & Dj Juanpe - %23GrafologíaObligada (2017)/04. Camel & DJ Juanpe - Saludo Eskizo.wav",
      },
      {
        id: "09-05",
        title: "Poco pero mío",
        path: "/09. Camel & Dj Juanpe - %23GrafologíaObligada (2017)/05. Camel & DJ Juanpe - Poco pero mío.mp3",
      },
      {
        id: "09-06",
        title: "El Pacto de la Soga",
        path: "/09. Camel & Dj Juanpe - %23GrafologíaObligada (2017)/06. Camel & Dj Juanpe - El Pacto de la Soga [Prod. Dj Juanpe] %23GrafologíaObligada.mp3",
      },
      {
        id: "09-07",
        title: "Mi precio",
        path: "/09. Camel & Dj Juanpe - %23GrafologíaObligada (2017)/07. Camel & DJ Juanpe - Mi precio.wav",
      },
      {
        id: "09-08",
        title: "Vitafobia",
        path: "/09. Camel & Dj Juanpe - %23GrafologíaObligada (2017)/08. Camel & DJ Juanpe - Vitafobia.wav",
      },
      {
        id: "09-09",
        title: "Cuánto antes (Con Tarifa Ganja Crew)",
        path: "/09. Camel & Dj Juanpe - %23GrafologíaObligada (2017)/09. Camel & DJ Juanpe - Cuánto antes (Con Tarifa Ganja Crew).wav",
      },
      {
        id: "09-10",
        title: "Rodolfo Beckenbauer",
        path: "/09. Camel & Dj Juanpe - %23GrafologíaObligada (2017)/10. Camel & DJ Juanpe - Rodolfo Beckenbauer.wav",
      },
      {
        id: "09-11",
        title: "En blanco (con Makro)",
        path: "/09. Camel & Dj Juanpe - %23GrafologíaObligada (2017)/11. Camel & DJ Juanpe - En blanco (con Makro).wav",
      },
      {
        id: "09-12",
        title: "No necesito (Con Toba y Anchi)",
        path: "/09. Camel & Dj Juanpe - %23GrafologíaObligada (2017)/12. Camel & DJ Juanpe - No necesito (Con Toba y Anchi).mp3",
      },
      {
        id: "09-13",
        title: "Me suda la polla (Con Narksoul y Dykoh)",
        path: "/09. Camel & Dj Juanpe - %23GrafologíaObligada (2017)/13. Bonus Track Camel & DJ Juanpe - Me suda la polla (Con Narksoul y Dykoh).mp3",
      },
    ],
  },
  {
    id: "08-colabos-2013-2015",
    title: "Colabos 2013 - 2015",
    year: "2016",
    artist: "Camel",
    cover: `/08. Camel - Colabos 2013 - 2015 (2016)/diseño.jpg`,
    songs: [
      {
        id: "08-01",
        title: "Cadiz Rap",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/01.Cadiz Rap - Track 8 (Con Luisoen y Yegu) [Cadiz Rap].mp3",
      },
      {
        id: "08-02",
        title: "Ponganse a Cubierto",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/02.Gigante -  Ponganse a Cubierto (Con  BubenKing y Camel) [Metamorfosis].mp3",
      },
      {
        id: "08-03",
        title: "Son 3 (Con Ruinah Klan)",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/03.Makro - Son 3 (Con Ruinah Klan) [Alyazira].mp3",
      },
      {
        id: "08-04",
        title: "Los monstruos del bloque",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/04.Rebrof - Los monstruos del bloque (con Longerman, Sharly y Camel) [Sin Problemas].mp3",
      },
      {
        id: "08-05",
        title: "Reflexión (Con Camel)",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/05.Gigante - Reflexión (Con Camel) [Metamorfosis].mp3",
      },
      {
        id: "08-06",
        title: "No Puedorl",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/06.Rap Support - No Puedorl (Con Flameh y Camel) [Rap Support].mp3",
      },
      {
        id: "08-07",
        title: "Algo se cuece",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/07. Camel - Algo se cuece [#AlgoSeCuece].mp3",
      },
      {
        id: "08-08",
        title: "Fucking Nigga (Con Ruinah Klan)",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/08.Dj Borke - Fucking Nigga (Con Ruinah Klan).mp3",
      },
      {
        id: "08-09",
        title: "5 Balas",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/09.Camel - 5 Balas [Mixtape. One M1nuto. Bk Records].mp3",
      },
      {
        id: "08-10",
        title: "Pista desconocida (Con Ruinah Klan)",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/10. Jonathan - Pista desconocida (Con Ruinah Klan).mp3",
      },
      {
        id: "08-11",
        title: "Y Tu No (Con Camel)",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/11.Ez Click - Y Tu No (Con Camel) [Rap por Placer].mp3",
      },
      {
        id: "08-12",
        title: "Buscando La Luz",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/12.Camel & Flameh - Buscando La Luz.mp3",
      },
      {
        id: "08-13",
        title: "Funk Your Ass",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/13.Dj JZeta - Funk Your Ass (Con Camel Dj Juanpe).mp3",
      },
      {
        id: "08-14",
        title: "Se Llama Pasión (Con Camel)",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/14.BubenKing, Makro y DHasthBeats Se Llama Pasión (Con Camel ) [Don`t Worry].mp3",
      },
      {
        id: "08-15",
        title: "Grietas de Olvido (Con Camel)",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/15.Khare - Grietas de Olvido (Con Camel [Vuelvo].mp3",
      },
      {
        id: "08-16",
        title: "Relevo",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/16. Explicito - Relevo (Con Camel - Flameh y Dj Juanpe) [Prod. Dj Juanpe].mp3",
      },
      {
        id: "08-17",
        title: "Spiderman (Con Camel)",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/17. Toba - Spiderman (Con Camel) [Aracnophobia].mp3",
      },
      {
        id: "08-18",
        title: "10,000 Años (Con Camel y Toba)",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/18. Cxcx - 10,000 Años (Con Camel y Toba).mp3",
      },
      {
        id: "08-19",
        title: "Niebla Espesa (Con Camel)",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/19. Perdio - Niebla Espesa (Con Camel) [Area51].mp3",
      },
      {
        id: "08-20",
        title: "Resacon en sanroque",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/20. Bonus Track Resacon en sanroque (CAMEL, FLAMEH, BUBENKING, JUAN GAVIRA, GIGANTE, MINI y DJ Juanpe.mp3",
      },
      {
        id: "08-99-1",
        title: "Así Suena Algeciras",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/99.Así Suena Algeciras (Con Puro - Ct - Flameh - Ruinah Klan - DanyLi - Enano - Gigante - Kapo - Rebrof y GDP [Metamorfosis].mp3",
      },
      {
        id: "08-99-2",
        title: "Multicolabo",
        path: "/08. Camel - Colabos 2013 - 2015 (2016)/99.Multicolabo (Con Zahori, Soraya, Neret, Buben, Kafyz, Puter Tremendo, Aleksis, Cabrerizo, Staki, Melybi, Plata, Makro, Mc Diana y J. Cruces (Laefe)).mp3",
      },
    ],
  },
  {
    id: "07-rakuda",
    title: "Rakuda",
    year: "2016",
    artist: "Camel",
    cover: `/07. Camel - Rakuda (2016)/diseño.jpg`,
    songs: [
      {
        id: "07-01",
        title: "Shin",
        path: "/07. Camel - Rakuda (2016)/01 Shin.mp3",
      },
      {
        id: "07-02",
        title: "Mira Mis Poemas",
        path: "/07. Camel - Rakuda (2016)/02 Mira Mis Poemas.mp3",
      },
      {
        id: "07-03",
        title: "Competi y Amor",
        path: "/07. Camel - Rakuda (2016)/03 Competi y Amor.mp3",
      },
      {
        id: "07-04",
        title: "CamelHameHa!",
        path: "/07. Camel - Rakuda (2016)/04 CamelHameHa!.mp3",
      },
      {
        id: "07-05",
        title: "Suspiro",
        path: "/07. Camel - Rakuda (2016)/05 Suspiro.mp3",
      },
      {
        id: "07-06",
        title: "Paciencia & Ganas",
        path: "/07. Camel - Rakuda (2016)/06 Paciencia & Ganas.mp3",
      },
      {
        id: "07-07",
        title: "Fauna",
        path: "/07. Camel - Rakuda (2016)/07 Fauna.mp3",
      },
      {
        id: "07-08",
        title: "Entre Paredes (Con Dikeh)",
        path: "/07. Camel - Rakuda (2016)/08 Entre Paredes (Con Dikeh).mp3",
      },
      {
        id: "07-09",
        title: "Sombra",
        path: "/07. Camel - Rakuda (2016)/09 Sombra.mp3",
      },
      {
        id: "07-10",
        title: "Brutal",
        path: "/07. Camel - Rakuda (2016)/10 Brutal.mp3",
      },
      {
        id: "07-11",
        title: "Disculpa (Con Kako M)",
        path: "/07. Camel - Rakuda (2016)/11 Disculpa (Con Kako M).mp3",
      },
      {
        id: "07-12",
        title: "Días son Anuncios",
        path: "/07. Camel - Rakuda (2016)/12 Di¦üas son Anuncios.mp3",
      },
      {
        id: "07-13",
        title: "Bloques de Lava (Con El Bezea)",
        path: "/07. Camel - Rakuda (2016)/13 Bloques de Lava (Con El Bezea).mp3",
      },
      {
        id: "07-14",
        title: "Bar",
        path: "/07. Camel - Rakuda (2016)/14 Bar.mp3",
      },
      {
        id: "07-15",
        title: "Suena Estándar (Con Flameh)",
        path: "/07. Camel - Rakuda (2016)/15 Suena Esta¦ündar (Con Flameh).mp3",
      },
      {
        id: "07-16",
        title: "No Seré",
        path: "/07. Camel - Rakuda (2016)/16 No Sere¦ü.mp3",
      },
      {
        id: "07-17",
        title: "Humo",
        path: "/07. Camel - Rakuda (2016)/17 Humo.mp3",
      },
      {
        id: "07-18",
        title: "Nana",
        path: "/07. Camel - Rakuda (2016)/18 Nana.mp3",
      },
    ],
  },
  {
    id: "06-a-cabezazos",
    title: "A Cabezazos",
    year: "2014",
    artist: "Ruinah Klan",
    cover: `/06. Ruinah Klan - A Cabezazos (2014)/diseño.jpg`,
    songs: [
      {
        id: "06-01",
        title: "Intro",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/01. Ruinah klan - Intro [Producido por NMS Pro] - www.hhgroups.com hhh.mp3",
      },
      {
        id: "06-02",
        title: "Tras años después",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/02. Ruinah klan - Tras años después [Producido por Dj Juanpe] - www.hhgroups.com.mp3",
      },
      {
        id: "06-03",
        title: "Soltando mierda",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/03. Ruinah klan - Soltando mierda [Producido por Dj Juanpe] - www.hhgroups.com.mp3",
      },
      {
        id: "06-04",
        title: "Que te voy a contá",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/04. Ruinah klan - Que te voy a contá [Producido por BKBeats] - www.hhgroups.com.mp3",
      },
      {
        id: "06-05",
        title: "I need a dollar",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/05. Ruinah klan - I need a dollar [Producido por Dj Juanpe] - www.hhgroups.com.mp3",
      },
      {
        id: "06-06",
        title: "Klan",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/06. Ruinah klan - Klan [Producido por NMS Pro] - www.hhgroups.com.mp3",
      },
      {
        id: "06-07",
        title: "Después de tanto",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/07. Ruinah klan - Después de tanto [Producido por Dj Juanpe] - www.hhgroups.com.mp3",
      },
      {
        id: "06-08",
        title: "Con la vida en contra",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/08. Ruinah klan - Con la vida en contra [Producido por NMS Pro] - www.hhgroups.com.mp3",
      },
      {
        id: "06-09",
        title: "Interludio - Round one",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/09. Ruinah klan - Interludio - Round one [Producido por Dhasthbeats] - www.hhgroups.com.mp3",
      },
      {
        id: "06-10",
        title: "En pie",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/10. Ruinah klan - En pie [Producido por Dj Juanpe] - www.hhgroups.com.mp3",
      },
      {
        id: "06-11",
        title: "Todo cambia (con Pesto)",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/11. Ruinah klan - Todo cambia (con Pesto) [Producido por NMS Pro] - www.hhgroups.com.mp3",
      },
      {
        id: "06-12",
        title: "Warros",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/12. Ruinah klan - Warros [Producido por Dj Juanpe] - www.hhgroups.com.mp3",
      },
      {
        id: "06-13",
        title: "No es lo que pensáis (con Tarifa ganja crew)",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/13. Ruinah klan - No es lo que pensáis (con Tarifa ganja crew) [Producido por Dj Juanpe] - www.hhgroups.com.mp3",
      },
      {
        id: "06-14",
        title: "Happy day (con Juanxo)",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/14. Ruinah klan - Happy day (con Juanxo) [Producido por NMS Pro] - www.hhgroups.com.mp3",
      },
      {
        id: "06-15",
        title: "A cabezazos",
        path: "/06. Ruinah Klan - A Cabezazos (2014)/15. Ruinah klan - A cabezazos [Producido por NMS Pro] - www.hhgroups.com.mp3",
      },
    ],
  },
  {
    id: "05-colabos-2009-2012",
    title: "Colabos 2009 - 2012",
    year: "2013",
    artist: "Camel",
    cover: `/05. Camel - Colabos 2009 - 2012 (2013)/diseño.png`,
    songs: [
      {
        id: "05-01",
        title: "Encargo (Con M.Krodo)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/01.Encargo (Con M.Krodo) [Prod. Mr.Click] [Huella de Perro].mp3",
      },
      {
        id: "05-02",
        title: "Amigos en Soledad (Con Philosofic)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/02.Amigos en Soledad (Con Philosofic) [Inedito].mp3",
      },
      {
        id: "05-03",
        title: "El Ser estraño (Con M Krodo)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/03.El Ser estraño (Con M Krodo) [Inedito].mp3",
      },
      {
        id: "05-04",
        title: "No te creas",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/04.No te creas (Con Juanka - Buben - Makro - Tone y Flameh) [Prod. Nemesis] [Nunca es Tarde].mp3",
      },
      {
        id: "05-05",
        title: "En Nombre del Dolor (Con Septimo Cielo)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/05.En Nombre del Dolor (Con Septimo Cielo) [Base Internet] [Infames].mp3",
      },
      {
        id: "05-06",
        title: "Solo soy yo",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/06.Solo soy yo [Prod. Kare Producciones] [Mi Experiencia].mp3",
      },
      {
        id: "05-07",
        title: "Amistad (Con Zone)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/07.Amistad (Con Zone) [Base Internet] [Loading].mp3",
      },
      {
        id: "05-08",
        title: "Intermedio (Con Makro)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/08.Intermedio (Con Makro) [Base Internet] [Los tiempos cambian].mp3",
      },
      {
        id: "05-09",
        title: "Solo son cosas mias (Con Zone)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/09.Solo son cosas mias (Con Zone) [Base Internet] [Loading].mp3",
      },
      {
        id: "05-10",
        title: "Estoy Vivo (Con Flameh y Buben King)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/10.Estoy Vivo (Con Flameh y Buben King) [Base Internet] [Inedito].mp3",
      },
      {
        id: "05-11",
        title: "Diles algo (Con Buben King)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/11.Diles algo (Con Buben King) [Base Internet] [Inedito].mp3",
      },
      {
        id: "05-12",
        title: "Calles en Venecia",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/12.Calles en Venecia [Prod. Dj Borke] [Inedito].mp3",
      },
      {
        id: "05-13",
        title: "A Oscuras (Con Kako y Chaval MC)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/13.A Oscuras (Con Kako y Chaval MC) [Base Internet] [Inedito].mp3",
      },
      {
        id: "05-14",
        title: "Mi Carcel (Con Zone)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/14.Mi Carcel (Con Zone) [Base Internet] [Fuck You].mp3",
      },
      {
        id: "05-15",
        title: "El Baile del Alma",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/15.El Baile del Alma [Prod. BlackSawer] [Inedito].mp3",
      },
      {
        id: "05-16",
        title: "Terapia",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/16.Terapia (Con Buben King - Flameh y Fleki) [Prod.Dj JuaNpe] [El Detonador].mp3",
      },
      {
        id: "05-17",
        title: "La Voz de la enseñanza (Con Puro)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/17.La Voz de la enseñanza (Con Puro) [Base internet] [Inedito].mp3",
      },
      {
        id: "05-18",
        title: "Nada positivo (Con Zunk)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/18.Nada positivo (Con Zunk) [El Chico Indigo].mp3",
      },
      {
        id: "05-19",
        title: "Pilla Mi Bombo Clap",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/19. Pilla Mi Bombo Clap (Con  NrJazz y Buben King) [Prod.Dj Juanpe] [Mi musa y su Vacio].mp3",
      },
      {
        id: "05-20",
        title: "Mi Tierra (Con Buben King)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/20. Mi Tierra (Con Buben King) [Prod. Buben] [Jumanji].mp3",
      },
      {
        id: "05-21",
        title: "Masivo Parte 1",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/21. Masivo Parte 1 (Con Buben King - Nemesi s- NrJazz - Juank - Zunk) [Jumanji].mp3",
      },
      {
        id: "05-22",
        title: "Entre bombo y graves (Bonus)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/22. Bonus Track Camel, Randi y Fleki - Entre bombo y graves.mp3",
      },
      {
        id: "05-23",
        title: "RK y Viceversa (Bonus)",
        path: "/05. Camel - Colabos 2009 - 2012 (2013)/23. Bonus Track RK y Viceversa (Con Ruinah Klan y Many).mp3",
      },
    ],
  },
  {
    id: "04-expontaneo",
    title: "Expontáneo",
    year: "2012",
    artist: "Camel & Buben King (Ruinah Klan)",
    cover: `/04. Camel & Buben King (Ruinah Klan) - Expontaneo (2012)/diseño.jpg`,
    songs: [
      {
        id: "04-01",
        title: "Intro expontanea",
        path: "/04. Camel & Buben King (Ruinah Klan) - Expontaneo (2012)/01. Camel y Buben King - Intro expontanea [Productor desconocido] - www.hhgroups.com.mp3",
      },
      {
        id: "04-02",
        title: "Algo grave",
        path: "/04. Camel & Buben King (Ruinah Klan) - Expontaneo (2012)/02. Camel y Buben King - Algo grave [Productor desconocido] - www.hhgroups.com.mp3",
      },
      {
        id: "04-03",
        title: "Mi día",
        path: "/04. Camel & Buben King (Ruinah Klan) - Expontaneo (2012)/03. Camel y Buben King - Mi día [Productor desconocido] - www.hhgroups.com.mp3",
      },
      {
        id: "04-04",
        title: "Como es (con Purito)",
        path: "/04. Camel & Buben King (Ruinah Klan) - Expontaneo (2012)/04. Camel y Buben King - Como es (con Purito) [Productor desconocido] - www.hhgroups.com.mp3",
      },
      {
        id: "04-05",
        title: "Rechazo",
        path: "/04. Camel & Buben King (Ruinah Klan) - Expontaneo (2012)/05. Camel y Buben King - Rechazo [Productor desconocido] - www.hhgroups.com.mp3",
      },
      {
        id: "04-06",
        title: "Dejarlo claro",
        path: "/04. Camel & Buben King (Ruinah Klan) - Expontaneo (2012)/06. Camel y Buben King - Dejarlo claro [Productor desconocido] - www.hhgroups.com.mp3",
      },
      {
        id: "04-07",
        title: "Música",
        path: "/04. Camel & Buben King (Ruinah Klan) - Expontaneo (2012)/07. Camel y Buben King - Música [Productor desconocido] - www.hhgroups.com.mp3",
      },
      {
        id: "04-08",
        title: "Cenicero",
        path: "/04. Camel & Buben King (Ruinah Klan) - Expontaneo (2012)/08. Camel y Buben King - Cenicero [Productor desconocido] - www.hhgroups.com.mp3",
      },
    ],
  },
  {
    id: "03-blasfemia",
    title: "Blasfemia",
    year: "2012",
    artist: "Ruinah Klan",
    cover: `/03. Ruinah Klan - Blasfemia (2012)/diseño.jpg`,
    songs: [
      {
        id: "03-01",
        title: "Intro",
        path: "/03. Ruinah Klan - Blasfemia (2012)/01. Ruinah klan - Intro [Producido por Nms pro] - www.HHGroups.com.mp3",
      },
      {
        id: "03-02",
        title: "No saben hacer rap",
        path: "/03. Ruinah Klan - Blasfemia (2012)/02. Ruinah klan - No saben hacer rap [Producido por Nms pro] - www.HHGroups.com.mp3",
      },
      {
        id: "03-03",
        title: "Style",
        path: "/03. Ruinah Klan - Blasfemia (2012)/03. Ruinah klan - Style [Producido por Nms pro] - www.HHGroups.com.mp3",
      },
      {
        id: "03-04",
        title: "Humor negro (con Nemesis)",
        path: "/03. Ruinah Klan - Blasfemia (2012)/04. Ruinah klan - Humor negro (con Nemesis) [Producido por Nms pro] - www.HHGroups.com.mp3",
      },
      {
        id: "03-05",
        title: "Las cinco letras",
        path: "/03. Ruinah Klan - Blasfemia (2012)/05. Ruinah klan - Las cinco letras [Producido por Nms pro] - www.HHGroups.com.mp3",
      },
      {
        id: "03-06",
        title: "Fuerzas tetricas",
        path: "/03. Ruinah Klan - Blasfemia (2012)/06. Ruinah klan - Fuerzas tetricas [Producido por Nms pro] - www.HHGroups.com.mp3",
      },
      {
        id: "03-07",
        title: "La maquina del tiempo",
        path: "/03. Ruinah Klan - Blasfemia (2012)/07. Ruinah klan - La maquina del tiempo [Producido por Nms pro] - www.HHGroups.com.mp3",
      },
      {
        id: "03-08",
        title: "Hablando con... (con Flameh)",
        path: "/03. Ruinah Klan - Blasfemia (2012)/08. Ruinah klan - Hablando con... (con Flameh) [Producido por Nms pro] - www.HHGroups.com.mp3",
      },
      {
        id: "03-09",
        title: "Los tiempos cambian 2.0",
        path: "/03. Ruinah Klan - Blasfemia (2012)/09. Ruinah klan - Los tiempos cambian 2.0 [Producido por Nms pro] - www.HHGroups.com.mp3",
      },
      {
        id: "03-10",
        title: "Nos queda",
        path: "/03. Ruinah Klan - Blasfemia (2012)/10. Ruinah klan - Nos queda [Producido por Nms pro] - www.HHGroups.com.mp3",
      },
      {
        id: "03-11",
        title: "Paso a paso",
        path: "/03. Ruinah Klan - Blasfemia (2012)/11. Ruinah klan - Paso a paso [Producido por Nms pro] - www.HHGroups.com.mp3",
      },
    ],
  },
  {
    id: "02-la-gran-diferencia",
    title: "La Gran Diferencia",
    year: "2011",
    artist: "Camel",
    cover: `/02. Camel - La Gran Diferencia (2011)/diseño.png`,
    songs: [
      {
        id: "02-01",
        title: "La gran diferencia",
        path: "/02. Camel - La Gran Diferencia (2011)/01. Camel - La gran diferencia [Base Internet] - www.HHGroups.com.mp3",
      },
      {
        id: "02-02",
        title: "Sin esperanza",
        path: "/02. Camel - La Gran Diferencia (2011)/02. Camel - Sin esperanza [Base Internet] - www.HHGroups.com.mp3",
      },
      {
        id: "02-03",
        title: "Guerrero 1100 (con Union verbal y Buben king)",
        path: "/02. Camel - La Gran Diferencia (2011)/03. Camel - Guerrero 1100 (con Union verbal y Buben king) [Producido por Nemesis producciones] - www.HHGroups.com.mp3",
      },
      {
        id: "02-04",
        title: "Presente (con Zone)",
        path: "/02. Camel - La Gran Diferencia (2011)/04. Camel - Presente (con Zone) [Base Internet] - www.HHGroups.com.mp3",
      },
      {
        id: "02-05",
        title: "Tengan cuidado",
        path: "/02. Camel - La Gran Diferencia (2011)/05. Camel - Tengan cuidado [Base Internet] - www.HHGroups.com.mp3",
      },
      {
        id: "02-06",
        title: "Bailando con lobos (con Fleki)",
        path: "/02. Camel - La Gran Diferencia (2011)/06. Camel - Bailando con lobos (con Fleki) [Producido por Nemesis producciones] - www.HHGroups.com.mp3",
      },
      {
        id: "02-07",
        title: "Zancadas (con Longerman)",
        path: "/02. Camel - La Gran Diferencia (2011)/07. Camel - Zancadas (con Longerman) [Producido por Nemesis producciones] - www.HHGroups.com.mp3",
      },
      {
        id: "02-08",
        title: "Mil hojas",
        path: "/02. Camel - La Gran Diferencia (2011)/08. Camel - Mil hojas [Producido por Buben King] - www.HHGroups.com.mp3",
      },
      {
        id: "02-09",
        title: "Imperio",
        path: "/02. Camel - La Gran Diferencia (2011)/09. Camel - Imperio [Base Internet] - www.HHGroups.com.mp3",
      },
      {
        id: "02-10",
        title: "Noches alegres (con Buben King y Makro)",
        path: "/02. Camel - La Gran Diferencia (2011)/10. Camel - Noches alegres (con Buben King y Makro) [Producido por Nemesis producciones] - www.HHGroups.com.mp3",
      },
      {
        id: "02-11",
        title: "Poesia dia a dia",
        path: "/02. Camel - La Gran Diferencia (2011)/11. Camel - Poesia dia a dia [Producido por Mr. Click] - www.HHGroups.com.mp3",
      },
      {
        id: "02-12",
        title: "Yo puedo cambiarlo",
        path: "/02. Camel - La Gran Diferencia (2011)/12. Camel - Yo puedo cambiarlo [Producido por Soma] - www.HHGroups.com.mp3",
      },
      {
        id: "02-13",
        title: "La mierda de mi vida",
        path: "/02. Camel - La Gran Diferencia (2011)/13. Camel - La mierda de mi vida [Producido por Dj juanpe] - www.HHGroups.com.mp3",
      },
      {
        id: "02-14",
        title: "Se enfadan",
        path: "/02. Camel - La Gran Diferencia (2011)/14. Camel - Se enfadan [Producido por Zone] - www.HHGroups.com.mp3",
      },
      {
        id: "02-15",
        title: "Hoy estoy aqui",
        path: "/02. Camel - La Gran Diferencia (2011)/15. Camel - Hoy estoy aqui [Producido por Nemesis producciones] - www.HHGroups.com.mp3",
      },
    ],
  },
  {
    id: "01-catastrofe",
    title: "Catástrofe Enfermiza",
    year: "2011",
    artist: "Ruinah Klan",
    cover: `/01.Ruinah Klan - Catástrofe Enfermiza (2011)/diseño.jpg`,
    songs: [
      {
        id: "01-01",
        title: "Intro",
        path: "/01.Ruinah Klan - Catástrofe Enfermiza (2011)/01. Ruinah klan - Intro [Producido por Nemesis producciones] - www.HHGroups.com.mp3",
      },
      {
        id: "01-02",
        title: "Erreka",
        path: "/01.Ruinah Klan - Catástrofe Enfermiza (2011)/02. Ruinah klan - Erreka [Producido por Nemesis producciones] - www.HHGroups.com.mp3",
      },
      {
        id: "01-03",
        title: "Catástrofe Enfermiza",
        path: "/01.Ruinah Klan - Catástrofe Enfermiza (2011)/03. Ruinah klan - Catastrofe enfermiza [Producido por Nemesis producciones] - www.HHGroups.com.mp3",
      },
    ],
  },
];

const formatTime = (seconds) => {
  if (!seconds) return "";
  const minutes = Math.floor(seconds / 60);
  const seg = Math.floor(seconds % 60);
  return `${minutes}:${seg < 10 ? "0" : ""}${seg}`;
};

// ESTA ES LA FUNCIÓN CLAVE
const getCleanUrl = (path, base) => {
  // 1. Quitar la barra inicial si existe
  let cleanPath = path.startsWith("/") ? path.substring(1) : path;

  // 2. Decodificar la ruta por si ya traía %20 o %23
  cleanPath = decodeURIComponent(cleanPath);

  // 3. Separar por carpetas para no romper las barras /
  const parts = cleanPath.split("/");

  // 4. Volver a codificar cada trozo por separado
  // Esto convierte [ en %5B, ] en %5D y # en %23 correctamente
  const encodedPath = parts.map((part) => encodeURIComponent(part)).join("/");

  return base + "/" + encodedPath;
};

async function generate() {
  console.log("⏳ Conectando con Cloudflare y generando archivo...");
  console.log("📂 El archivo se sobrescribirá en: " + OUTPUT_FILE);

  const finalAlbums = [];
  const base = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;

  for (const album of albumsData) {
    process.stdout.write(`> Procesando ${album.title}... `);
    const processedSongs = [];

    for (const song of album.songs) {
      let duration = "";
      let fullUrl = "";

      try {
        // Usamos la nueva función mágica para limpiar la URL
        fullUrl = getCleanUrl(song.path, base);

        // Añadimos User-Agent para que Cloudflare no nos bloquee
        const response = await fetch(fullUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
        });

        if (response.ok) {
          const metadata = await parseStream(response.body, {
            mimeType: "audio/mpeg",
          });
          duration = formatTime(metadata.format.duration);
        } else {
          console.error(`\n   ❌ Falló (${response.status}): ${fullUrl}`);
        }
      } catch (e) {
        console.error(`\n   ❌ Error Red: ${e.message}`);
      }

      processedSongs.push({ ...song, duration });
    }
    process.stdout.write("✅ OK\n");
    finalAlbums.push({ ...album, songs: processedSongs });
  }

  // --- CONSTRUIR EL CONTENIDO DEL ARCHIVO ---
  let fileContent = `export interface Song {
  id: string;
  title: string;
  duration?: string;
  fileUrl: string;
}

export interface Album {
  id: string;
  title: string;
  year: string;
  artist: string;
  cover: string;
  songs: Song[];
}

const BASE_URL = import.meta.env.PUBLIC_MUSIC_BASE_URL;

export const discography: Album[] = [\n`;

  finalAlbums.forEach((album) => {
    fileContent += `  {\n`;
    fileContent += `    id: "${album.id}",\n`;
    fileContent += `    title: "${album.title}",\n`;
    fileContent += `    year: "${album.year}",\n`;
    fileContent += `    artist: "${album.artist}",\n`;
    fileContent += `    cover: \`\${BASE_URL}${album.cover}\`,\n`;
    fileContent += `    songs: [\n`;
    album.songs.forEach((song) => {
      fileContent += `      {\n`;
      fileContent += `        id: "${song.id}",\n`;
      fileContent += `        title: "${song.title.replace(/"/g, '\\"')}",\n`;
      if (song.duration)
        fileContent += `        duration: "${song.duration}",\n`;
      // Mantenemos la ruta original en el código final para que el navegador del usuario se apañe
      fileContent += `        fileUrl: \`\${BASE_URL}${song.path}\`,\n`;
      fileContent += `      },\n`;
    });
    fileContent += `    ],\n`;
    fileContent += `  },\n`;
  });

  fileContent += `];\n`;

  try {
    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`\n🎉 ¡EXITO! Archivo guardado correctamente.`);
  } catch (err) {
    console.error("\n❌ Error al escribir el archivo:", err.message);
  }
}

generate();
