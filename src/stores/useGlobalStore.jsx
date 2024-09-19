import { create } from 'zustand';

const useGlobalStore = create((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),

  scrollDirection: null,
  setScrollDirection: (direction) => set({ scrollDirection: direction }),

  isLoggedIn: false,
  likedPostIds: [],
  setLikedPostIds: (likedPostIds) => set({ likedPostIds }),

  bookmarkedPostIds: null,
  setBookmarkedPostIds: (bookmarkedPostIds) => set({ bookmarkedPostIds }),

  setIsLoggedIn: (isLoggedIn) => {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : '');
    set({ isLoggedIn });
  },

  initializeUser: () => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      set({
        isLoggedIn: true,
      });
    }
  },

  logout: () => {
    localStorage.removeItem('isLoggedIn');
    set({
      isLoggedIn: false,
    });
  },

  toggles: {},
  toggle: (id) =>
    set((state) => ({
      toggles: {
        ...state.toggles,
        [id]: !state.toggles[id],
      },
    })),
}));

export default useGlobalStore;
