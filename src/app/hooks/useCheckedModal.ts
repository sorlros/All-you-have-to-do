import { create } from "zustand";

interface CheckedModalStore {
  checkedItems: boolean[];
  setCheckedItems: (checkedItems: boolean[]) => void;
}

const useCheckedModal = create<CheckedModalStore>((set) => ({
  checkedItems: [],
  setCheckedItems: (checkedItems) => set({ checkedItems }),
}));

export default useCheckedModal;
