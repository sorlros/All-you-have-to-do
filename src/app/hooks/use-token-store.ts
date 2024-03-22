import { create } from "zustand";

interface TokenStore {
  token: string;
  setToken: (param: string) => void;
  uid: string;
  setUid: (param: string) => void;
}

const useTokenStore = create<TokenStore>((set) => ({
  token: "",
  setToken: (param) => set({ token: param }),
  uid: "",
  setUid: (param) => set({ uid: param }),
}));

export default useTokenStore;
