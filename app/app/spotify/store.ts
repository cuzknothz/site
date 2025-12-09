import { create } from 'zustand';

export const useSpotifyStore = create((set) => ({
  accessToken: '',
  setAccessToken: (token: string) => set({ accessToken: token }),
}));
