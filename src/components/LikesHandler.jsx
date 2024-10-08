import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useGlobalStore from '@/stores/useGlobalStore';

export default function LikesHandler() {
  const API_URL = import.meta.env.VITE_PB_URL;
  const currentUserId = useGlobalStore((state) => state.currentUserId);
  // const userId = useGlobalStore((state) => state.userId); 유저아이디 undefined
  const likedPostIds = useGlobalStore((state) => state.likedPostIds);
  const setLikedPostIds = useGlobalStore((state) => state.setLikedPostIds);
  const [likesPbId, setLikesPbId] = useState(null);
  // const userId = '3bvc1x2g5ij8asg';

  useQuery({
    queryKey: ['likes', currentUserId],
    queryFn: () =>
      axios
        .get(`${API_URL}/api/collections/likes/records`, {
          params: {
            filter: `(userId="${currentUserId}")`,
          },
        })
        .then((res) => {
          setLikedPostIds(res.data?.items[0].postId);
          setLikesPbId(res.data?.items[0].id);
          return res.data;
        }),
  });

  useEffect(() => {
    if (!likesPbId || likedPostIds?.length < 0) return;
    // console.log('Updating likes:', likedPostIds);

    const updateLikes = async () => {
      try {
        await axios.patch(
          `${API_URL}/api/collections/likes/records/${likesPbId}`,
          {
            postId: likedPostIds,
          }
        );
        // console.log('Likes updated successfully');
      } catch (error) {
        console.error('Error updating likes:', error);
      }
    };

    updateLikes();
  }, [likedPostIds, likesPbId, API_URL]);

  return null;
}
