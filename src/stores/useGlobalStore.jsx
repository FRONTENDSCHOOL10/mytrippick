import { create } from 'zustand';
import pb from '@/api/pb';

const useGlobalStore = create((set) => ({
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),

  scrollDirection: null,
  setScrollDirection: (direction) => set({ scrollDirection: direction }),

  isLoggedIn: false,
  profileImage: '',
  nickname: '',

  setIsLoggedIn: (isLoggedIn) => {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : '');
    set({ isLoggedIn });
  },

  setProfileImage: (profileImage) => set({ profileImage }),
  setNickname: (nickname) => set({ nickname }),

  initializeUser: async () => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn && pb.authStore.isValid) {
      const user = pb.authStore.model;

      const profileImageUrl = user.profileImage
        ? `${pb.baseUrl}/api/files/${user.collectionId}/${user.id}/${user.profileImage}`
        : './../../favicon.svg';

      set({
        isLoggedIn: true,
        profileImage: profileImageUrl,
        nickname: user.nickName || '닉네임',
      });
    } else {
      set({
        isLoggedIn: false,
        profileImage: '',
        nickname: '',
      });
    }
  },

  logout: () => {
    localStorage.removeItem('isLoggedIn');
    pb.authStore.clear();
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

export default useGlobalStore;
