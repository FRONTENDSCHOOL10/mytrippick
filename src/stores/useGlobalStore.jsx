import { create } from 'zustand';

const useGlobalStore = create((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),

  scrollDirection: null,
  setScrollDirection: (direction) => set({ scrollDirection: direction }),

  isLoggedIn: false,
  profileImage: '',
  nickname: '',
  currentUserId: '',

  setIsLoggedIn: (isLoggedIn) => {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : '');
    set({ isLoggedIn });
  },
  setProfileImage: (profileImage) => set({ profileImage }),
  setNickname: (nickname) => set({ nickname }),
  setCurrentUserId: (currentUserId) => set({ currentUserId }),

  initializeUser: () => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const authData = JSON.parse(localStorage.getItem('pocketbase_auth'));
    if (loggedIn) {
      set({
        isLoggedIn: true,
        profileImage: './../../favicon.svg', //임시
        nickname: '닉네임',
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
      profileImage: '',
      nickname: '',
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
