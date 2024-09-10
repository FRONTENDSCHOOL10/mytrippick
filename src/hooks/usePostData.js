import { useState, useEffect } from 'react';
import pb from '@/api/pb';

export function usePostData(postId) {
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        setLoading(true);
        const post = await pb.collection('posts').getOne(postId);
        setPostInfo(post);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError('게시글 정보 가져오기 실패');
      } finally {
        setLoading(false);
      }
    };

    fetchPostInfo();
  }, [postId]);

  return { postInfo, loading, error };
}
