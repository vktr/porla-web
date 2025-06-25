import { create } from "zustand";

type AppState = {
  accessToken: {
    loading: boolean;
    value: string | null;
  };
};

export const useAppState = create<AppState>()((set) => ({
  accessToken: {
    loading: true,
    value: null,
  },
}));
