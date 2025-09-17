import { create } from 'zustand';

interface ChatState {
  fullScreen: boolean;
  setFullScreen: (val: boolean) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  fullScreen: false,
  setFullScreen: (val) => set({ fullScreen: val }),
}));
