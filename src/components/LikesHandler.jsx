import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useGlobalStore from '@/stores/useGlobalStore';
import pb from '@/api/pb';

export default function LikesHandler() {
  const userId = useGlobalStore((state) => state.currentUserId);
  const likedPostIds = useGlobalStore((state) => state.likedPostIds);
  const setLikedPostIds = useGlobalStore((state) => state.setLikedPostIds);
  const [likesPbId, setLikesPbId] = useState(null);

  useQuery({
    queryKey: ['likes', userId],
    queryFn: async () => {
      if (!userId) return null; // userId가 없으면 쿼리 실행하지 않음

      const res = await pb.collection('likes').getList(1, 1, {
        filter: `userId="${userId}"`,
      });

      if (res.items && res.items.length > 0) {
        const likedItem = res.items[0];
        setLikedPostIds([likedItem.postId]); // 좋아요한 postId를 배열로 설정
        setLikesPbId(likedItem.id); // 좋아요 기록의 ID 저장
      }

      return res;
    },
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
  });

  useEffect(() => {
    if (!likesPbId || likedPostIds?.length <= 0) return;

    const updateLikes = async () => {
      try {
        await pb.collection('likes').update(likesPbId, {
          postId: likedPostIds, // 업데이트할 postId 보내기
        });
        console.log('좋아요 업데이트 성공');
      } catch (error) {
        console.error('좋아요 업데이트 실패:', error);
      }
    };

    updateLikes();
  }, [likedPostIds, likesPbId]);

  return null;
}
