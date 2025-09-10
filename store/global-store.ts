import { create } from 'zustand';

interface GlobalState {
  fontReady: boolean;
  setFontReady: (val: boolean) => void;
  dark: boolean;
  toggleDarkMode: (val: boolean) => void;
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  fontReady: false,
  setFontReady: (val) => set({ fontReady: val }),
  dark: false,
  toggleDarkMode: (val) => ({ dark: val }),
}));
