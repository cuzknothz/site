import { create } from 'zustand';

interface ChatState {
  list: any[];
  push: (val: any) => any;
  clearConversation: () => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  list: [],
  push: (val) => set((state) => ({ list: [...state.list, val] })),
  clearConversation: () => set({ list: [] }),
}));
