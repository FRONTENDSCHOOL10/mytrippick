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
      const user = pb.authStore.model; // 현재 사용자 정보 가져오기

      const profileImageUrl = user.profileImage
        ? `${pb.baseUrl}/api/files/${user.collectionId}/${user.id}/${user.profileImage}`
        : './../../favicon.svg';

      set({
        isLoggedIn: true,
        profileImage: profileImageUrl,
        nickname: user.nickName || '닉네임',
      });
    } else {
      // 로그아웃 상태일 경우 초기화
      set({
        isLoggedIn: false,
        profileImage: '',
        nickname: '',
      });
    }
  },

  logout: () => {
    localStorage.removeItem('isLoggedIn');
    pb.authStore.clear(); // PocketBase에서 인증 정보 제거
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
