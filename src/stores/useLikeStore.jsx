import { create } from 'zustand';
import { fetchLikes, checkUserLike } from '@/api/likeApi.js';

const useLikeStore = create((set) => ({
  likes: {},
  userLikes: {}, // 사용자의 좋아요 상태를 저장

  // 좋아요 수 불러오기 (게시글 id 기준)
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

  // 좋아요 상태 불러오기 (userId와 postId 기준)
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
}));

export default useLikeStore;
