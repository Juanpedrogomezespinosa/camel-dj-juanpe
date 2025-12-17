import fs from "fs";
import path from "path";
import { parseFile } from "music-metadata";

// ✅ CONFIGURACIÓN
const RUTA_LOCAL =
  "/Users/juanpe/Desktop/proyectos/camel&DjJuanpe/assets/discografía/";
const OUTPUT_FILE = "./src/data/discography.ts";

// Función para convertir segundos a formato MM:SS
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

// Función para escapar caracteres para código (backticks)
const escapeForCode = (str) => {
  return str.replace(/`/g, "\\`").replace(/\$/g, "\\$");
};

// Función para limpiar título
const cleanTrackTitle = (filename) => {
  let title = filename;
  title = title.replace(/\.[^/.]+$/, ""); // Quitar extensión
  title = title.replace(/^\d+[.\s-]+\s*/, ""); // Quitar "01. "
  // Limpieza específica
  title = title.replace(/ - www\.hhgroups\.com.*$/i, "");
  title = title.replace(/ - www\.HHGroups\.com.*$/i, "");
  title = title.replace(/\s*\[Base Internet\]/i, "");
  title = title.replace(/\s*\[Producido por.*?\]/i, "");
  title = title.replace(/\s*\[Productor desconocido\]/i, "");
  return title.trim();
};

// Función para generar ID de canción (slug simple)
const generateSongId = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

// Mapeo de IDs de álbumes
const getAlbumId = (folderName) => {
  if (folderName.includes("Manos a la Obra")) return "manos-a-la-obra-de-arte";
  if (folderName.includes("Colaboraciones e Ineditos Vol.4"))
    return "colaboraciones-ineditos-vol-4";
  if (folderName.includes("Godhito Zezy")) return "godhito-zezy-como-biggie";
  if (folderName.includes("Acuestate y Suda")) return "acuestate-y-suda-vol-1";
  if (folderName.includes("Area90Studio")) return "area-90-studio";
  if (folderName.includes("Fobias")) return "fobias-y-filias";
  if (folderName.includes("Quimeras")) return "quimeras-y-utopias";
  if (folderName.includes("Comediantes")) return "comediantes-de-la-legua";
  if (folderName.includes("Cuerdas Vocales")) return "cuerdas-vocales";
  if (folderName.includes("Colabos 2016")) return "colabos-2016-2020";
  if (folderName.includes("GrafologíaObligada")) return "grafologia-obligada";
  if (folderName.includes("Colabos 2013")) return "colabos-2013-2015";
  if (folderName.includes("Rakuda")) return "rakuda";
  if (folderName.includes("A Cabezazos")) return "a-cabezazos";
  if (folderName.includes("Colabos 2009")) return "colabos-2009-2012";
  if (folderName.includes("Expontaneo")) return "expontaneo";
  if (folderName.includes("Blasfemia")) return "blasfemia";
  if (folderName.includes("La Gran Diferencia")) return "la-gran-diferencia";
  if (folderName.includes("Catástrofe")) return "catastrofe-enfermiza";

  return folderName
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const processDiscography = async () => {
  console.log(`📂 Leyendo archivos locales desde: ${RUTA_LOCAL}`);

  if (!fs.existsSync(RUTA_LOCAL)) {
    console.error("❌ ERROR: La ruta no existe.");
    return;
  }

  const albums = [];

  try {
    const items = fs.readdirSync(RUTA_LOCAL, { withFileTypes: true });

    // Orden inverso (más reciente primero)
    const albumFolders = items
      .filter((item) => item.isDirectory())
      .map((item) => item.name)
      .sort((a, b) => b.localeCompare(a));

    for (const folder of albumFolders) {
      console.log(`💿 Procesando álbum: ${folder}...`);

      const folderPath = path.join(RUTA_LOCAL, folder);
      const files = fs.readdirSync(folderPath);

      const audioFiles = files
        .filter((file) =>
          [".mp3", ".wav", ".m4a", ".aac", ".mpeg"].includes(
            path.extname(file).toLowerCase()
          )
        )
        .sort();

      const songs = [];

      for (const file of audioFiles) {
        const filePath = path.join(folderPath, file);

        try {
          const metadata = await parseFile(filePath);
          const duration = metadata.format.duration
            ? formatDuration(metadata.format.duration)
            : "0:00";

          const cleanTitle = cleanTrackTitle(file);
          const safeFolder = escapeForCode(folder);
          const safeFile = escapeForCode(file);

          songs.push({
            id: generateSongId(cleanTitle), // Generamos ID para la interfaz Song
            title: cleanTitle,
            duration: duration,
            folderRaw: safeFolder,
            fileRaw: safeFile,
          });
        } catch (err) {
          console.error(
            `   ⚠️ Error leyendo metadatos de ${file}: ${err.message}`
          );
          songs.push({
            id: generateSongId(file),
            title: cleanTrackTitle(file),
            duration: "0:00",
            folderRaw: escapeForCode(folder),
            fileRaw: escapeForCode(file),
          });
        }
      }

      if (songs.length > 0) {
        // Extracción de datos del nombre de carpeta
        // Formato esperado: "01. Artista - Album (Año)" o similar

        let year = "20xx";
        const yearMatch = folder.match(/\((\d{4})\)/);
        if (yearMatch) year = yearMatch[1];

        // Limpieza para título y artista
        const nameWithoutNumber = folder.replace(/^\d+\.\s*/, ""); // Quita "01. "
        const nameWithoutYear = nameWithoutNumber.replace(
          /\s*\(\d{4}[- \d]*\).*$/,
          ""
        ); // Quita año

        // Intentar separar Artista y Título por el guión "-"
        let artist = "Camel"; // Valor por defecto
        let title = nameWithoutYear.trim();

        if (nameWithoutYear.includes(" - ")) {
          const parts = nameWithoutYear.split(" - ");
          artist = parts[0].trim();
          title = parts.slice(1).join(" - ").trim();
        } else if (nameWithoutYear.includes(" & ")) {
          // Caso raro sin guión pero con "&" (ej: Camel & Buben King...)
          // Asumimos que todo es el artista si no hay guión claro separando título
          // Pero para tus carpetas, casi todas tienen guión o estructura clara.
          // Si no detecta guión, dejamos el título completo y artista Camel.
        }

        albums.push({
          id: getAlbumId(folder),
          title: title,
          year: year,
          artist: artist,
          cover: `/images/albums/${getAlbumId(folder)}.jpg`,
          songs: songs,
        });
      }
    }

    generateTsFile(albums);
  } catch (error) {
    console.error("❌ Error fatal procesando carpetas:", error);
  }
};

const generateTsFile = (albums) => {
  // AQUÍ ESTÁ EL CAMBIO CLAVE DE LA CABECERA
  let content = `export interface Song {
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

export const discography: Album[] = [
`;

  albums.forEach((album) => {
    // Escapar comillas en artista y título
    const safeArtist = album.artist.replace(/"/g, '\\"');
    const safeAlbumTitle = album.title.replace(/"/g, '\\"');

    content += `  {
    id: "${album.id}",
    title: "${safeAlbumTitle}",
    year: "${album.year}",
    artist: "${safeArtist}",
    cover: "${album.cover}",
    songs: [
`;
    album.songs.forEach((song) => {
      const safeTitle = song.title.replace(/"/g, '\\"');

      // Usamos la estructura songs: Song[]
      content += `      {
        id: "${song.id}",
        title: "${safeTitle}",
        duration: "${song.duration}",
        fileUrl: \`\${BASE_URL}/${song.folderRaw}/${song.fileRaw}\`,
      },
`;
    });

    content += `    ]
  },
`;
  });

  content += `];
`;

  fs.writeFileSync(OUTPUT_FILE, content);
  console.log(`\n✅ ¡GENERACIÓN COMPLETADA!`);
  console.log(`📄 Archivo guardado en: ${OUTPUT_FILE}`);
};

processDiscography();
