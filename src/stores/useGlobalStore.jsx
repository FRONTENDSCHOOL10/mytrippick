import { create } from 'zustand';
import { getUserInfo } from '@/api/userApi'; // userApi 파일에서 사용자 정보를 가져오는 함수

const useGlobalStore = create((set) => ({
  // 상태 변수
  isMenuOpen: false,
  scrollDirection: null,
  isLoggedIn: false,
  userId: null,
  profileImage: '',
  nickname: '',
  username: '',
  bio: '',

  // 메뉴 상태 토글 함수
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),

  // 스크롤 방향 설정 함수
  setScrollDirection: (direction) => set({ scrollDirection: direction }),

  // 로그인 상태 설정 함수
  setIsLoggedIn: (isLoggedIn) => {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : ''); // 로컬스토리지에 로그인 상태 저장
    set({ isLoggedIn });
  },

  // 사용자 정보 업데이트 함수 (로그인 후 서버에서 사용자 정보 가져오기)
  setUserInfo: async (userId) => {
    try {
      const user = await getUserInfo(userId); // 서버에서 사용자 정보 가져오기
      set({
        userId: user.id,
        username: user.username,
        nickname: user.nickName,
        profileImage: user.userProfile,
        bio: user.bio,
        isLoggedIn: true,
      });
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
    }
  },

  // 프로필 이미지 설정 함수
  setProfileImage: (profileImage) => set({ profileImage }),

  // 닉네임 설정 함수
  setNickname: (nickname) => set({ nickname }),

  // 로그인 초기화 함수 (localStorage에서 로그인 상태 불러오기)
  initializeUser: () => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      set({ isLoggedIn: true });
    } else {
      set({ isLoggedIn: false });
    }
  },

  // 로그아웃 함수 (localStorage에서 로그인 정보 삭제)
  logout: () => {
    localStorage.removeItem('isLoggedIn');
    set({
      isLoggedIn: false,
      userId: null,
      username: '',
      nickname: '',
      profileImage: '',
      bio: '',
    });
  },

  // 좋아요 토글 관련 상태
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
