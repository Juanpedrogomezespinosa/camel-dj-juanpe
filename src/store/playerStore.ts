import { create } from "zustand";
import type { Song, Album } from "../data/discography";

interface PlayerState {
  isPlaying: boolean;
  currentSong: Song | null;
  currentAlbum: Album | null;
  volume: number;

  currentTime: number;
  duration: number;

  // Acciones
  playSong: (song: Song, album: Album) => void;
  togglePlay: () => void;
  setVolume: (vol: number) => void;
  nextSong: () => void;
  prevSong: () => void;

  // Acciones de tiempo
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;

  // NUEVO: Acción para cerrar
  closePlayer: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  isPlaying: false,
  currentSong: null,
  currentAlbum: null,
  volume: 1,
  currentTime: 0,
  duration: 0,

  playSong: (song, album) => {
    set({
      currentSong: song,
      currentAlbum: album,
      isPlaying: true,
      currentTime: 0,
    });
  },

  togglePlay: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  setVolume: (vol) => set({ volume: vol }),

  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),

  // NUEVO: Cerrar el reproductor
  closePlayer: () => {
    set({
      isPlaying: false,
      currentSong: null,
      currentAlbum: null,
      currentTime: 0,
    });
  },

  nextSong: () => {
    const { currentSong, currentAlbum } = get();
    if (!currentSong || !currentAlbum) return;

    const currentIndex = currentAlbum.songs.findIndex(
      (s) => s.id === currentSong.id
    );
    const nextIndex = currentIndex + 1;

    if (nextIndex < currentAlbum.songs.length) {
      set({
        currentSong: currentAlbum.songs[nextIndex],
        isPlaying: true,
        currentTime: 0,
      });
    } else {
      set({ isPlaying: false, currentTime: 0 });
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
      set({
        currentSong: currentAlbum.songs[prevIndex],
        isPlaying: true,
        currentTime: 0,
      });
    } else {
      set({ currentTime: 0 });
    }
  },
}));
