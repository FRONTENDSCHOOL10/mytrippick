import { create } from 'zustand';

const useGlobalStore = create((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),

  scrollDirection: null,
  setScrollDirection: (direction) => set({ scrollDirection: direction }),

  isLoggedIn: false,
  currentUserId: '',

  likedPostIds: [],
  setLikedPostIds: (likedPostIds) => set({ likedPostIds }),

  bookmarkedPostIds: null,
  setBookmarkedPostIds: (bookmarkedPostIds) => set({ bookmarkedPostIds }),

  setIsLoggedIn: (isLoggedIn) => {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : '');
    set({ isLoggedIn });
  },
  setCurrentUserId: (currentUserId) => set({ currentUserId }),

  initializeUser: () => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const authData = JSON.parse(localStorage.getItem('pocketbase_auth'));
    if (loggedIn) {
      set({
        isLoggedIn: true,
        currentUserId: authData.model.id,
      });
    } else {
      // 로그인 정보가 불완전하거나 없는 경우
      localStorage.removeItem('pocketbase_auth');
      set({ isLoggedIn: false, currentUserId: null });
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

// 스토어 생성 직후 initializeUser 호출
useGlobalStore.getState().initializeUser();

export default useGlobalStore;
