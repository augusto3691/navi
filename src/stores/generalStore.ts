import { create } from "zustand";

interface GeneralStore {
  copied: boolean;
  triggerFlash: () => void;
}

const useGeneralStore = create<GeneralStore>((set) => ({
  copied: false,
  triggerFlash: () => {
    set({ copied: true });
    setTimeout(() => set({ copied: false }), 1000);
  },
}));

export default useGeneralStore;
