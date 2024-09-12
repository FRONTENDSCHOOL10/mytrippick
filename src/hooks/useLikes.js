import { useEffect } from 'react';
import useLikeStore from '@/stores/useLikeStore';

export function useLikes(postId, userId, initialLikedNum = 0) {
  const { likes, userLikes, fetchLikes, fetchUserLike, addLike, removeLike } =
    useLikeStore((state) => ({
      likes: state.likes,
      userLikes: state.userLikes,
      fetchLikes: state.fetchLikes,
      fetchUserLike: state.fetchUserLike,
      addLike: state.addLike,
      removeLike: state.removeLike,
    }));

  // 좋아요 수와 사용자 좋아요 상태를 불러오기
  useEffect(() => {
    fetchLikes(postId); // 게시글의 좋아요 수 불러오기
    fetchUserLike(userId, postId); // 사용자의 좋아요 상태 불러오기
  }, [userId, postId, fetchLikes, fetchUserLike]);

  // 좋아요 상태를 토글하는 함수
  const handleToggleLike = async () => {
    const isLiked = userLikes[postId] || false;
    if (isLiked) {
      await removeLike(userId, postId); // 좋아요 취소
    } else {
      await addLike(userId, postId); // 좋아요 추가
    }
  };

  return {
    likeCount: likes[postId] || initialLikedNum, // 좋아요 수 반환
    isLiked: userLikes[postId] || false, // 사용자가 해당 게시글을 좋아요했는지 여부
    handleToggleLike, // 좋아요 상태를 토글하는 함수
  };
}
