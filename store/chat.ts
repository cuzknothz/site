import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
}

interface ChatStore {
  conversations: Record<string, ChatConversation>;
  currentId: string | null;
  justSentId: string | null;
  setCurrent: (id: string | null) => void;
  setJustSentId: (id: string | null) => void;

  addConversation: (title: string) => string;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, newTitle: string) => void;

  appendMessage: (convId: string, msg: ChatMessage) => void;
  updateMessage: (
    convId: string,
    msgId: string,
    patch: Partial<ChatMessage>,
  ) => void;

  ensureCurrent: () => string;
  thinking: boolean;
  setThinking: (val: boolean) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: {
    '1': {
      id: '1',
      title: 'Chat Conversation',
      messages: [
        { id: '123', role: 'user', content: 'b oi' },
        {
          id: '123f',
          role: 'model',
          content: 'Ơi gì bạn, tui đang nghe nè. Có gì hot kể nghe coi 🔥',
        },
      ],
    },
  },
  currentId: null,

  setCurrent: (id) => set({ currentId: id }),
  justSentId: null,
  setJustSentId: (id) => set({ justSentId: id }),

  addConversation: (title) => {
    const id = crypto.randomUUID();
    set((state) => ({
      conversations: {
        ...state.conversations,
        [id]: { id, title, messages: [] },
      },
      currentId: id,
    }));
    return id;
  },

  deleteConversation: (id) =>
    set((state) => {
      const copy = { ...state.conversations };
      delete copy[id];
      return {
        conversations: copy,
        currentId: state.currentId === id ? null : state.currentId,
      };
    }),

  renameConversation: (id, newTitle) =>
    set((state) => {
      const conv = state.conversations[id];
      if (!conv) return state;
      return {
        conversations: {
          ...state.conversations,
          [id]: { ...conv, title: newTitle },
        },
      };
    }),

  appendMessage: (convId, msg) =>
    set((state) => {
      const conv = state.conversations[convId];
      if (!conv) return state;
      return {
        conversations: {
          ...state.conversations,
          [convId]: { ...conv, messages: [...conv.messages, msg] },
        },
      };
    }),

  updateMessage: (convId, msgId, patch) =>
    set((state) => {
      const conv = state.conversations[convId];
      if (!conv) return state;
      const idx = conv.messages.findIndex((m) => m.id === msgId);
      if (idx < 0) return state;
      const nextMsgs = conv.messages.slice();
      nextMsgs[idx] = { ...nextMsgs[idx], ...patch };
      return {
        conversations: {
          ...state.conversations,
          [convId]: { ...conv, messages: nextMsgs },
        },
      };
    }),

  ensureCurrent: () => {
    const { currentId, addConversation } = get();
    if (currentId) return currentId;
    return addConversation('New conversation');
  },
  thinking: false,
  setThinking: (val) => set({ thinking: val }),
}));
