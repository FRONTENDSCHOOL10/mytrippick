import { create } from 'zustand';

const useGlobalStore = create((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),

  isFocusTrapped: false,
  setIsFocusTrapped: (isFocusTrapped) => set({ isFocusTrapped }),
}));

export default useGlobalStore;
