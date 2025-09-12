import { create } from 'zustand';

type Trigger = Pick<SquezeState, 'title' | 'content'>;

interface SquezeState {
  show: boolean;
  toogleShow: (val: boolean) => void;
  title: string;
  content: string;
  close: () => void;
  trigger: (val: Trigger) => void;
}

const defaultParams = {
  title: '🐤 Wait a minutes',
  content: ' Who are you 🤡 :))',
};

export const useSquezeStore = create<SquezeState>()((set) => ({
  show: false,
  toogleShow: (val) => set({ show: val }),
  title: '',
  content: '',
  close: () => set({ show: false }),
  trigger: (val) => {
    set({
      show: true,
      title: val.title || defaultParams.title,
      content: val.content || defaultParams.content,
    });
  },
}));
