import { create } from "zustand";

interface SecretState {
  isShow: boolean;
  toggleShow: (val: boolean) => void;
}

export const useSecretStore = create<SecretState>()((set) => ({
  isShow: false,
  toggleShow: (val: boolean) => set({ isShow: val }),
}));
