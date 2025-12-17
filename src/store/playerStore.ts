import { create } from "zustand";
import type { Song, Album } from "../data/discography";

interface PlayerState {
  isPlaying: boolean;
  currentSong: Song | null;
  currentAlbum: Album | null;
  volume: number;

  // Acciones
  playSong: (song: Song, album: Album) => void;
  togglePlay: () => void;
  setVolume: (vol: number) => void;
  nextSong: () => void;
  prevSong: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  isPlaying: false,
  currentSong: null,
  currentAlbum: null,
  volume: 1,

  playSong: (song, album) => {
    set({ currentSong: song, currentAlbum: album, isPlaying: true });
  },

  togglePlay: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  setVolume: (vol) => set({ volume: vol }),

  nextSong: () => {
    const { currentSong, currentAlbum } = get();
    if (!currentSong || !currentAlbum) return;

    const currentIndex = currentAlbum.songs.findIndex(
      (s) => s.id === currentSong.id
    );
    const nextIndex = currentIndex + 1;

    // Si hay siguiente canción, la ponemos
    if (nextIndex < currentAlbum.songs.length) {
      set({ currentSong: currentAlbum.songs[nextIndex], isPlaying: true });
    } else {
      // Si se acaba el disco, paramos (o podrías poner loop aquí)
      set({ isPlaying: false });
    }
  },

  prevSong: () => {
    const { currentSong, currentAlbum } = get();
    if (!currentSong || !currentAlbum) return;

    const currentIndex = currentAlbum.songs.findIndex(
      (s) => s.id === currentSong.id
    );
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      set({ currentSong: currentAlbum.songs[prevIndex], isPlaying: true });
    }
  },
}));
