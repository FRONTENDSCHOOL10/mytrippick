import { create } from 'zustand';

const useGlobalStore = create((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),

  isFocusTrapped: false,
  setIsFocusTrapped: (isFocusTrapped) => set({ isFocusTrapped }),

  isToggled: false,
  setIsToggled: (isToggled) => set({ isToggled }),
}));

export default useGlobalStore;
