import { create } from "zustand";

interface TokenWithUidStore {
  token: string;
  setToken: (param: string) => void;
  uid: string;
  setUid: (param: string) => void;
}

const useTokenWithUidStore = create<TokenWithUidStore>((set) => ({
  token: "",
  setToken: (param) => set({ token: param }),
  uid: "",
  setUid: (param) => set({ uid: param }),
}));

export default useTokenWithUidStore;
