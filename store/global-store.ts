import { isBoolean } from 'lodash';
import { create } from 'zustand';

export enum SECTION {
  HOME = 'Home',
  CRAFT = 'Craft',
  WORK = 'Work',
  ARTICLE = 'Note',
  CHAT = 'Chat',
  TOOL = 'App',
}

interface GlobalState {
  fontReady: boolean;
  setFontReady: (val: boolean) => void;
  dark: boolean;
  toggleDarkMode: (val: boolean) => void;
  showFullMenu: boolean;
  setShowFullMenu: (val: boolean) => void;
  select: SECTION;
  setSelect: (val: SECTION) => void;
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  fontReady: false,
  setFontReady: (val) => set({ fontReady: val }),
  dark: false,
  toggleDarkMode: (val) => set({ dark: val }),
  showFullMenu: true,
  setShowFullMenu: (val) => {
    set({ showFullMenu: val });
  },
  select: SECTION.HOME,
  setSelect: (val) => set({ select: val }),
}));
