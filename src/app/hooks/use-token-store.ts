import { create } from "zustand";

interface TokenStore {
  token: string;
  setToken: (param: string) => void;
}

const useTokenStore = create<TokenStore>((set) => ({
  token: "",
  setToken: (param) => set({ token: param }),
}));

export default useTokenStore;
