export interface Video {
  id: string;
  title: string;
  year: string;
  date: string; // NUEVO CAMPO PARA ORDENAR
  director?: string;
  description: string;
  tags?: string[];
  duration?: string;
  videoUrl: string;
  posterUrl: string;
}

// LEER URL DESDE EL .ENV
const BASE_URL = import.meta.env.PUBLIC_VIDEOCLIPS_BASE_URL;

// CARPETA RAIZ
const VIDEO_PATH = "";
const IMG_PATH = "/portadas";

export const videos: Video[] = [
  {
    id: "fiesta-en-el-sur",
    title: "El Bezea, Kako M, Camel, Sr. Lilo - Fiesta en el sur",
    year: "2025",
    date: "2025-07-11",
    director: "Nowker Films",
    description:
      "Videoclip grabado y editado por Nowker Films. Producido por Hit Dabeat.",
    tags: ["Colaboración", "Verano"],
    duration: "3:50",
    videoUrl: `${BASE_URL}${VIDEO_PATH}/fiesta%20en%20el%20sur.mp4`,
    posterUrl: `${BASE_URL}${IMG_PATH}/fiesta-en-el-sur.png`,
  },
  {
    id: "el-juego-del-ego",
    title: "Camel No Sabaku & DJ Juanpe - El Juego del Ego",
    year: "2025",
    date: "2025-06-16",
    director: "Alejandro Calderón",
    description:
      "Tercer y último videoclip adelanto del próximo trabajo 'Manos a la Obra de Arte'.",
    tags: ["Adelanto", "Scratches"],
    duration: "3:30",
    videoUrl: `${BASE_URL}${VIDEO_PATH}/el%20juego%20del%20ego.mp4`,
    posterUrl: `${BASE_URL}${IMG_PATH}/el-juego-del-ego.png`,
  },
  {
    id: "entre-cornisas",
    title: "Camel No Sabaku & DJ Juanpe - Entre Cornisas y Áticos",
    year: "2025",
    date: "2025-05-09",
    director: "Nowker Films",
    description:
      "Segundo Videoclip adelanto de 'Manos a la Obra de Arte'. Instrumental por DJ Juanpe.",
    tags: ["Adelanto", "Sevilla"],
    duration: "4:00",
    videoUrl: `${BASE_URL}${VIDEO_PATH}/entre%20cornisas%20y%20áticos.mp4`,
    posterUrl: `${BASE_URL}${IMG_PATH}/cornisas-y-aticos.png`,
  },
  {
    id: "golden-boy",
    title: "Camel No Sabaku & DJ Juanpe - Golden Boy",
    year: "2025",
    date: "2025-04-04",
    director: "Eris Films",
    description: "Primer adelanto del próximo disco MANOS A LA OBRA DE ARTE.",
    tags: ["Adelanto", "Manos a la Obra de Arte"],
    duration: "3:45",
    videoUrl: `${BASE_URL}${VIDEO_PATH}/golden%20boy.mp4`,
    posterUrl: `${BASE_URL}${IMG_PATH}/golden%20boy.png`,
  },
  {
    id: "compadre",
    title: "Camel & DJ Juanpe - Compadre (con Pino y Bezea)",
    year: "2022",
    date: "2022-08-19",
    director: "Nowker Films",
    description:
      "Extraído del trabajo 'Quimeras & Utopias'. Grabado entre Sevilla y Murcia.",
    tags: ["Colaboración", "Quimeras & Utopias"],
    duration: "4:10",
    videoUrl: `${BASE_URL}${VIDEO_PATH}/compadre.mp4`,
    posterUrl: `${BASE_URL}${IMG_PATH}/compadre.png`,
  },
  {
    id: "gustos-obsesivos",
    title: "Camel - Gustos Obsesivos",
    year: "2019",
    date: "2019-06-01",
    director: "Alejandro Calderón",
    description:
      "Música de Baghira & Acción Sanchez. Grabada en MB Sound (Sevilla).",
    tags: ["Baghira", "Acción Sanchez"],
    duration: "3:20",
    videoUrl: `${BASE_URL}${VIDEO_PATH}/gustos%20obsesivos.mp4`,
    posterUrl: `${BASE_URL}${IMG_PATH}/gustos-obsesivos.png`,
  },
  {
    id: "sospechosos-habituales",
    title: "Sospechosos Habituales 5.03 - Juan Profundo y Camel",
    year: "2017",
    date: "2017-01-08",
    director: "Jorge Gascón",
    description:
      "Los Interrogatorios, con Juan Profundo (Barcelona) y Camel (Cádiz).",
    tags: ["Entrevista", "Freestyle"],
    duration: "5:00",
    videoUrl: `${BASE_URL}${VIDEO_PATH}/sospechosos%20habituales.mp4`,
    posterUrl: `${BASE_URL}${IMG_PATH}/sospechosos-habituales.png`,
  },
  {
    id: "brutal",
    title: "Camel & DJ Juanpe - Brutal",
    year: "2016",
    date: "2016-03-01",
    director: "Alejandro Calderon",
    description: "Segundo adelanto de 'RAKUDA'. Grabado en San Roque.",
    tags: ["Rakuda", "San Roque"],
    duration: "2:50",
    videoUrl: `${BASE_URL}${VIDEO_PATH}/brutal.mp4`,
    posterUrl: `${BASE_URL}${IMG_PATH}/brutal.png`,
  },
  {
    id: "disculpa",
    title: "Camel - Disculpa",
    year: "2015",
    date: "2015-04-28",
    director: "Javi Lupiañez",
    description:
      "Primer videoclip del MC gaditano Camel, presentación de su trabajo 'Rakuda'.",
    tags: ["Rakuda", "Debut"],
    duration: "3:15",
    videoUrl: `${BASE_URL}${VIDEO_PATH}/Disculpa.mp4`,
    posterUrl: `${BASE_URL}${IMG_PATH}/disculpa.png`,
  },
  {
    id: "asi-suena-algeciras",
    title: "Así suena Algeciras",
    year: "2013",
    date: "2013-12-21",
    director: "Minilandia Films",
    description:
      "Videoclip oficial extraído de la maqueta de Gigante 'Metamorfosis'.",
    tags: ["Algeciras", "Colaboración", "Old School"],
    duration: "6:05",
    videoUrl: `${BASE_URL}${VIDEO_PATH}/Así%20suena%20Algeciras.mp4`,
    posterUrl: `${BASE_URL}${IMG_PATH}/asi-suena-algeciras.png`,
  },
  {
    id: "algo-se-cuece",
    title: "AlgoSeCuece con Camel & DJ Juanpe",
    year: "2013",
    date: "2013-10-15",
    director: "MiniLanida Films",
    description:
      "#AlgoSeCuece vuelve de nuevo. Camel sobre una Prod. de Dj. Juanpe.",
    tags: ["Clásico", "MiniLanida"],
    duration: "3:40",
    videoUrl: `${BASE_URL}${VIDEO_PATH}/Algo%20se%20cuece%20con%20Camel.mp4`,
    posterUrl: `${BASE_URL}${IMG_PATH}/algo-se-cuece.png`,
  },
];
