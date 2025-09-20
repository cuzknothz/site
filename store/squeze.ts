import { create } from 'zustand';

type Trigger = Pick<SquezeState, 'title' | 'content' | 'onYes'>;

interface SquezeState {
  show: boolean;
  toogleShow: (val: boolean) => void;
  title: string;
  content: string;
  onYes: Function;
  close: () => void;
  trigger: (val: Trigger) => void;
}

const defaultParams = {
  title: '🐤 Wait a minutes',
  content: ' Who are you 🤡 :))',
};

export const useSquezeStore = create<SquezeState>()((set, get) => ({
  show: false,
  toogleShow: (val) => set({ show: val }),
  title: '',
  content: '',
  onYes: () => {},
  fn: { onYes: () => {} },
  close: () => set({ show: false }),

  trigger: (val) => {
    set({
      show: true,
      title: val.title || defaultParams.title,
      content: val.content || defaultParams.content,
      onYes: () => {
        val.onYes?.();
        set({ show: false });
      },
    });
  },
}));
