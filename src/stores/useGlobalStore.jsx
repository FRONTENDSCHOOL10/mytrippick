import { create } from 'zustand';
import {
  fetchLikes,
  addLike,
  removeLike,
  checkUserLike,
} from '@/api/likeApi.js';

const useGlobalStore = create((set, get) => ({
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

  initializeUser: () => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) {
      set({
        isLoggedIn: true,
        profileImage: './../../favicon.svg', //임시
        nickname: '닉네임',
      });
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

  /* --------------- 좋아요 관련 --------------- */
  likes: {},
  userLikes: {}, // 사용자의 좋아요 상태를 저장

  // 좋아요 수 불러오기 (게시글 ID 기준)
  fetchLikes: async (postId) => {
    try {
      const likedNum = await fetchLikes(postId);
      set((state) => ({
        likes: {
          ...state.likes,
          [postId]: likedNum,
        },
      }));
    } catch (error) {
      console.error('좋아요 수 가져오기 실패:', error);
    }
  },

  // 사용자의 좋아요 상태 불러오기 (userId와 postId 기준)
  fetchUserLike: async (userId, postId) => {
    try {
      const userLiked = await checkUserLike(userId, postId);
      set((state) => ({
        userLikes: {
          ...state.userLikes,
          [postId]: userLiked,
        },
      }));
    } catch (error) {
      console.error('사용자 좋아요 상태 가져오기 실패:', error);
    }
  },

  // 좋아요 토글 (좋아요 추가/취소)
  toggleLike: async (userId, postId) => {
    const userLiked = get().userLikes[postId] || false; // 사용자의 좋아요 여부 확인

    if (userLiked) {
      // 좋아요 취소
      const newLikes = await removeLike(userId, postId);
      set((state) => ({
        likes: {
          ...state.likes,
          [postId]: newLikes,
        },
        userLikes: {
          ...state.userLikes,
          [postId]: false,
        },
      }));
    } else {
      // 좋아요 추가
      const newLikes = await addLike(userId, postId);
      set((state) => ({
        likes: {
          ...state.likes,
          [postId]: newLikes,
        },
        userLikes: {
          ...state.userLikes,
          [postId]: true,
        },
      }));
    }
  },
}));

export default useGlobalStore;
