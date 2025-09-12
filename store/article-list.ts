import { create } from 'zustand';

export enum modifyMode {
  modify,
  null,
}

interface ArticleListState {
  modify: modifyMode;
  setModifyMode: (val: modifyMode) => void;
}

let timer: NodeJS.Timeout;

export const useArticleListStore = create<ArticleListState>()((set) => ({
  modify: modifyMode.null,
  setModifyMode: (val: modifyMode) => {
    set({ modify: val });
    clearTimeout(timer);

    if (val === modifyMode.modify) {
      timer = setTimeout(() => {
        set({ modify: modifyMode.null });
      }, 20_000);
    }
  },
}));
