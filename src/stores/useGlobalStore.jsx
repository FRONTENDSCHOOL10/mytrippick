import { create } from 'zustand';
import { getUserInfo } from '@/api/getUserInfo';

const useGlobalStore = create((set, get) => ({
  // 상태 변수
  isMenuOpen: false,
  scrollDirection: null,
  isLoggedIn: false,
  userId: null,
  profileImage: '',
  nickname: '',
  username: '',
  bio: '',
  isLoading: false, // 로딩 상태 추가
  error: null, // 에러 상태 추가

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
      set({ isLoading: true, error: null }); // 로딩 상태 시작
      const user = await getUserInfo(userId); // 서버에서 사용자 정보 가져오기
      localStorage.setItem('userId', userId); // userId 로컬스토리지에 저장
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
      set({ error: '사용자 정보를 가져오는 중 문제가 발생했습니다.' }); // 에러 상태 업데이트
    } finally {
      set({ isLoading: false }); // 로딩 상태 종료
    }
  },

  // 프로필 이미지 설정 함수
  setProfileImage: (profileImage) => set({ profileImage }),

  // 닉네임 설정 함수
  setNickname: (nickname) => set({ nickname }),

  // 로그인 초기화 함수 (localStorage에서 로그인 상태 불러오기)
  initializeUser: async () => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUserId = localStorage.getItem('userId'); // userId 로컬스토리지에서 불러오기
    if (loggedIn && storedUserId) {
      await get().setUserInfo(storedUserId); // get()을 사용하여 setUserInfo 호출
    } else {
      set({ isLoggedIn: false, userId: null });
    }
  },

  // 로그아웃 함수 (localStorage에서 로그인 정보 삭제)
  logout: () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId'); // userId도 로컬스토리지에서 삭제
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
